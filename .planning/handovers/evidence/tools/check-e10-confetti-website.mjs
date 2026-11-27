import assert from "node:assert/strict";
import { createServer } from "node:http";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import puppeteer from "puppeteer";

const root = process.cwd(),
  dist = path.join(root, "websites/confetti/dist"),
  outputPath = path.join(root, ".planning/handovers/evidence/e10/confetti-website.json"),
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
            ".woff": "font/woff",
            ".woff2": "font/woff2",
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
  }),
  browserVersion = await browser.version(),
  pageErrors = [],
  consoleErrors = [],
  blockedRequestConsoleErrors = [],
  blockedExternalOrigins = new Set();

try {
  const page = await browser.newPage();

  await page.setRequestInterception(true);
  page.on("request", (request) => {
    const url = new URL(request.url());

    if (url.protocol === "http:" && url.hostname === "127.0.0.1") {
      void request.continue();
    } else if (url.protocol === "data:" || url.protocol === "blob:" || url.protocol === "about:") {
      void request.continue();
    } else {
      blockedExternalOrigins.add(url.origin);
      void request.abort("blockedbyclient");
    }
  });
  page.on("pageerror", (error) => pageErrors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") {
      const text = message.text();

      if (text.includes("ERR_BLOCKED_BY_CLIENT")) {
        blockedRequestConsoleErrors.push(text);
      } else {
        consoleErrors.push(text);
      }
    }
  });

  await page.goto(`http://127.0.0.1:${address.port}/`, { waitUntil: "networkidle0" });
  await page.waitForSelector('.group[data-name="cannon"] .run', { timeout: 15_000 });

  const canvasesByMode = {};

  for (const mode of ["cannon", "fireworks", "snow", "continuous"]) {
    await page.locator(`.group[data-name="${mode}"] .run`).click();
    await page.waitForFunction(() => document.querySelectorAll("canvas").length > 0, {
      timeout: 10_000,
    });
    canvasesByMode[mode] = await page.evaluate(() => document.querySelectorAll("canvas").length);
    await new Promise((resolve) => setTimeout(resolve, 350));
  }

  assert.deepEqual(pageErrors, []);
  assert.deepEqual(consoleErrors, []);
  assert.deepEqual(Object.keys(canvasesByMode), ["cannon", "fireworks", "snow", "continuous"]);

  const result = {
    demo: "@tsparticles/confetti-website",
    artifact: "websites/confetti/dist",
    browser: browserVersion,
    networkPolicy: "Only 127.0.0.1 HTTP allowed; every external request aborted before dispatch",
    blockedExternalOrigins: [...blockedExternalOrigins].sort(),
    blockedRequestConsoleErrors,
    modesRun: Object.keys(canvasesByMode),
    canvasesByMode,
    pageErrors,
    consoleErrors,
  };

  await writeFile(outputPath, `${JSON.stringify(result, null, 2)}\n`);
  console.log(JSON.stringify(result, null, 2));
} finally {
  await browser.close();
  await new Promise((resolve, reject) => server.close((error) => (error ? reject(error) : resolve())));
}
