import assert from "node:assert/strict";
import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import path from "node:path";
import puppeteer from "puppeteer";

const root = process.cwd(),
  dist = path.join(root, "demo/react/dist"),
  outputPath = path.join(root, ".planning/handovers/evidence/e10/react-demo.json"),
  server = createServer(async (request, response) => {
    const pathname = decodeURIComponent(new URL(request.url ?? "/", "http://localhost").pathname),
      filePath = path.resolve(dist, `.${pathname === "/" ? "/index.html" : pathname}`);

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
            ".ico": "image/x-icon",
            ".js": "text/javascript",
            ".json": "application/json",
            ".png": "image/png",
            ".svg": "image/svg+xml",
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

const browserVersion = await browser.version(),
  pageErrors = [],
  consoleErrors = [];

try {
  const page = await browser.newPage();

  page.on("pageerror", (error) => pageErrors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") consoleErrors.push(message.text());
  });
  await page.goto(`http://127.0.0.1:${address.port}/`, { waitUntil: "networkidle0" });
  await page.waitForFunction(() => document.querySelectorAll("#tsparticles canvas").length === 1, {
    timeout: 15_000,
  });
} finally {
  await browser.close();
  await new Promise((resolve, reject) => server.close((error) => (error ? reject(error) : resolve())));
}

assert.deepEqual(pageErrors, []);
assert.deepEqual(consoleErrors, []);

const result = {
  demo: "@tsparticles/react-demo",
  artifact: "demo/react/dist",
  browser: browserVersion,
  canvasCount: 1,
  pageErrors,
  consoleErrors,
};

await (await import("node:fs/promises")).writeFile(outputPath, `${JSON.stringify(result, null, 2)}\n`);
console.log(JSON.stringify(result, null, 2));
