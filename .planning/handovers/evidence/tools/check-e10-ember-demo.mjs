import assert from "node:assert/strict";
import { createServer } from "node:http";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import puppeteer from "puppeteer";

const root = process.cwd(),
  dist = path.join(root, "demo/ember/dist"),
  outputPath = path.join(root, ".planning/handovers/evidence/e10/ember-demo.json"),
  server = createServer(async (request, response) => {
    const pathname = decodeURIComponent(new URL(request.url ?? "/", "http://localhost").pathname),
      filePath = path.resolve(dist, `.${pathname === "/" ? "/index.html" : pathname}`);

    if (pathname === "/favicon.ico") {
      response.writeHead(204).end();
      return;
    }

    if (!filePath.startsWith(`${dist}${path.sep}`)) {
      response.writeHead(403).end();
      return;
    }

    try {
      const body = await readFile(filePath),
        contentType =
          {
            ".css": "text/css",
            ".html": "text/html",
            ".js": "application/javascript",
            ".json": "application/json",
          }[path.extname(filePath)] ?? "application/octet-stream";

      response.writeHead(200, { "content-type": contentType }).end(body);
    } catch {
      response.writeHead(404).end();
    }
  });

await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
const address = server.address();

assert(address && typeof address === "object");

const browser = await puppeteer.launch({
  executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  headless: true,
  pipe: true,
});

const pageErrors = [],
  consoleErrors = [];

try {
  const browserVersion = await browser.version(),
    page = await browser.newPage();

  page.on("pageerror", (error) => pageErrors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") consoleErrors.push(message.text());
  });
  await page.goto(`http://127.0.0.1:${address.port}/`, { waitUntil: "networkidle0" });
  await page.waitForFunction(() => document.querySelectorAll("canvas[data-generated=true]").length === 2, {
    timeout: 20_000,
  });

  const buttons = await page.$$("button");

  assert.equal(buttons.length, 3);
  await buttons[0].click();
  await buttons[1].click();
  await buttons[2].click();
  await page.waitForFunction(() => document.querySelectorAll("canvas[data-generated=true]").length === 3, {
    timeout: 15_000,
  });

  const result = {
    demo: "@tsparticles/ember-demo",
    browser: browserVersion,
    initialCanvases: 2,
    canvasesAfterConfettiToggle: 3,
    exercised: ["switch config", "switch theme", "show confetti"],
    pageErrors,
    consoleErrors,
  };

  assert.deepEqual(pageErrors, []);
  assert.deepEqual(consoleErrors, []);
  await writeFile(outputPath, `${JSON.stringify(result, null, 2)}\n`);
  console.log(JSON.stringify(result, null, 2));
} finally {
  await browser.close();
  await new Promise((resolve, reject) => server.close((error) => (error ? reject(error) : resolve())));
}
