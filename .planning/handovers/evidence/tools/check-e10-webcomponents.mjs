import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { createServer } from "node:net";
import { readFile } from "node:fs/promises";
import path from "node:path";
import puppeteer from "puppeteer";

const root = process.cwd(),
  demoRoot = path.join(root, "demo/webcomponents"),
  outputPath = path.join(root, ".planning/handovers/evidence/e10/webcomponents-demo.json"),
  portServer = createServer();

await new Promise((resolve, reject) => {
  portServer.once("error", reject);
  portServer.listen(0, "127.0.0.1", resolve);
});

const address = portServer.address();

assert(address && typeof address === "object");

const port = address.port;

await new Promise((resolve, reject) => portServer.close((error) => (error ? reject(error) : resolve())));

const server = spawn("node", ["app.js"], {
  cwd: demoRoot,
  env: { ...process.env, PORT: String(port) },
  stdio: ["ignore", "pipe", "pipe"],
});

let serverOutput = "";

server.stdout.on("data", (chunk) => (serverOutput += chunk));
server.stderr.on("data", (chunk) => (serverOutput += chunk));

const browser = await puppeteer.launch({
  executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  headless: true,
  pipe: true,
});

try {
  const browserVersion = await browser.version(),
    page = await browser.newPage(),
    pageErrors = [],
    consoleErrors = [],
    externalRequests = [];

  page.on("pageerror", (error) => pageErrors.push(error.message));
  page.on("response", (response) => {
    if (response.status() >= 400) consoleErrors.push(`${response.status()} ${response.url()}`);
  });
  page.on("console", (message) => {
    if (message.type() === "error") consoleErrors.push(message.text());
  });
  await page.setRequestInterception(true);
  page.on("request", (request) => {
    const url = new URL(request.url());

    if (url.pathname === "/favicon.ico") {
      void request.respond({ status: 204 });
      return;
    }

    if (url.origin === `http://127.0.0.1:${port}`) {
      void request.continue();
      return;
    }

    const localPath =
      url.hostname === "unpkg.com" &&
      url.pathname === "/@webcomponents/webcomponentsjs@2.8.0/custom-elements-es5-adapter.js"
        ? "/webcomponentsjs/custom-elements-es5-adapter.js"
        : url.hostname === "unpkg.com" &&
            url.pathname === "/@webcomponents/webcomponentsjs@2.8.0/webcomponents-loader.js"
          ? "/webcomponentsjs/webcomponents-loader.js"
          : undefined;

    if (localPath) {
      const fileName = path.basename(localPath),
        filePath = path.join(
          root,
          "node_modules/.pnpm/@webcomponents+webcomponentsjs@2.8.0/node_modules/@webcomponents/webcomponentsjs",
          fileName,
        );

      void readFile(filePath).then((body) =>
        request.respond({ body, contentType: "application/javascript", status: 200 }),
      );
      return;
    }

    externalRequests.push(request.url());
    void request.abort();
  });

  let ready = false;

  for (let attempt = 0; attempt < 50; attempt++) {
    try {
      const response = await fetch(`http://127.0.0.1:${port}/`);

      ready = response.ok;
      if (ready) break;
    } catch {
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
  }

  assert(ready, `demo server failed to start: ${serverOutput}`);
  await page.goto(`http://127.0.0.1:${port}/`, { waitUntil: "networkidle0" });
  await page.waitForFunction(() => document.querySelectorAll("web-particles canvas").length === 1, {
    timeout: 20_000,
  });

  const elementState = await page.$eval("web-particles", (element) => ({
    connected: element.isConnected,
    engineAssigned: Boolean(element.engine),
    canvasCount: element.querySelectorAll("canvas").length,
  }));

  assert.equal(elementState.connected, true);
  assert.equal(elementState.engineAssigned, true);
  assert.equal(elementState.canvasCount, 1);
  assert.deepEqual(pageErrors, []);
  assert.deepEqual(consoleErrors, []);
  assert.deepEqual(externalRequests, []);

  const result = {
    demo: "@tsparticles/webcomponents-demo",
    browser: browserVersion,
    engineAssigned: elementState.engineAssigned,
    canvasCount: elementState.canvasCount,
    externalRequests,
    pageErrors,
    consoleErrors,
  };

  await (await import("node:fs/promises")).writeFile(outputPath, `${JSON.stringify(result, null, 2)}\n`);
  console.log(JSON.stringify(result, null, 2));
} finally {
  await browser.close();
  server.kill("SIGTERM");
  await new Promise((resolve) => server.once("exit", resolve));
}
