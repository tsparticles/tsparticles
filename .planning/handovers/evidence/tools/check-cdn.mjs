import puppeteer from "puppeteer";
import { createServer } from "node:http";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
const destination = path.resolve(".planning/handovers/evidence/e0");
const candidate = JSON.parse(await readFile(path.join(destination, "cdn-candidate.json"), "utf8"));
const allowed = new Set(candidate.files.map((x) => "/" + x.file));
const server = createServer(async (req, res) => {
  if (req.url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.end('<div id="v5-baseline" style="width:800px;height:600px"></div>');
    return;
  }
  if (!allowed.has(req.url)) {
    res.writeHead(404);
    res.end();
    return;
  }
  try {
    res.setHeader("Content-Type", "application/javascript");
    res.setHeader("Cache-Control", "public, max-age=3600");
    res.end(await readFile(path.resolve("." + req.url)));
  } catch (error) {
    res.writeHead(500);
    res.end(String(error));
  }
});
await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
let browser;
try {
  browser = await puppeteer.launch({
    executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    headless: true,
    pipe: true,
  });
  const page = await browser.newPage(),
    errors = [],
    requests = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("response", (response) => {
    if (response.url().endsWith(".js"))
      requests.push({
        url: new URL(response.url()).pathname,
        status: response.status(),
        fromCache: response.fromCache(),
      });
  });
  const base = `http://127.0.0.1:${server.address().port}`;
  const options = JSON.parse(await readFile(path.join(destination, "bundle-sizes.json"), "utf8")).options;
  const runs = [];
  for (const cache of ["cold", "warm"]) {
    await page.goto(base);
    for (const file of candidate.files) await page.addScriptTag({ url: base + "/" + file.file });
    runs.push(
      await page.evaluate(
        async ({ options, cache }) => {
          await Promise.all(
            [
              loadCircleShape,
              loadMovePlugin,
              loadHexColorPlugin,
              loadPaintUpdater,
              loadSizeUpdater,
              loadOpacityUpdater,
              loadOutModesUpdater,
            ].map((load) => load(tsParticles)),
          );
          const scene = await tsParticles.load({ id: "v5-baseline", options });
          const count = scene.particles.count;
          scene.canvas.render.drawParticles({ value: 1000 / 60, factor: 1 });
          scene.destroy();
          if (count !== 100) throw new Error("Invalid minimal scene count: " + count);
          return { cache, count, remainingContainers: tsParticles.items.length };
        },
        { options, cache },
      ),
    );
  }
  await writeFile(
    path.join(destination, "cdn-browser.json"),
    JSON.stringify(
      {
        browser: await browser.version(),
        runs,
        requests,
        errors,
        compression: "See cdn-candidate.json; HTTP test serves uncompressed bytes",
        limits: "No lazy/CDN dynamic chunks or module-script variant in this smoke test",
      },
      null,
      2,
    ) + "\n",
  );
  if (errors.length) throw new Error(errors.join("\n"));
  console.log(JSON.stringify({ runs, requests: requests.length, errors }));
} finally {
  await browser?.close();
  await new Promise((resolve) => server.close(resolve));
}
