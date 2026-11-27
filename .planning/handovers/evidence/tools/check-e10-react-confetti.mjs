import assert from "node:assert/strict";
import { createServer as createHttpServer } from "node:http";
import { createRequire } from "node:module";
import { mkdtemp, mkdir, realpath, readdir, rm, symlink, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { pathToFileURL } from "node:url";
import puppeteer from "puppeteer";

const root = process.cwd(),
  temporary = await mkdtemp(path.join(tmpdir(), "v5-e10-react-confetti-")),
  outputPath = path.join(root, ".planning/handovers/evidence/e10/react-confetti.json"),
  reactRequire = createRequire(path.join(root, "demo/react/package.json")),
  vite = await import(pathToFileURL(reactRequire.resolve("vite"))),
  reactPluginModule = reactRequire("@vitejs/plugin-react"),
  reactPlugin = reactPluginModule.default ?? reactPluginModule,
  packageLinks = path.join(temporary, "node_modules", "@tsparticles"),
  workspacePackages = path.join(root, "demo/react/node_modules/@tsparticles");

await mkdir(packageLinks, { recursive: true });
await writeFile(path.join(temporary, "package.json"), '{"private":true,"type":"module"}\n');
await writeFile(
  path.join(temporary, "index.html"),
  '<link rel="icon" href="data:,"><div id="root"></div><script type="module" src="/src.jsx"></script>',
);
await writeFile(
  path.join(temporary, "src.jsx"),
  `import React from "react";
import { createRoot } from "react-dom/client";
import { createEngine } from "@tsparticles/engine";
import { loadConfettiPreset } from "@tsparticles/preset-confetti";
import Particles, { ParticlesProvider } from "@tsparticles/react";

const particlesEngine = createEngine();
const options = { preset: "confetti", fullScreen: { enable: true, zIndex: -1 } };

function Confetti() {
  return <ParticlesProvider engine={particlesEngine} init={loadConfettiPreset}>
    <Particles id="confetti" options={options} particlesLoaded={container => {
      globalThis.__e10ConfettiLoaded = true;
      globalThis.__e10ConfettiContainer = container;
    }} />
  </ParticlesProvider>;
}

createRoot(document.getElementById("root")).render(<Confetti />);\n`,
);

for (const entry of await readdir(workspacePackages, { withFileTypes: true })) {
  if (entry.isSymbolicLink()) {
    await symlink(await realpath(path.join(workspacePackages, entry.name)), path.join(packageLinks, entry.name));
  }
}

await symlink(path.join(root, "presets/confetti/dist"), path.join(packageLinks, "preset-confetti"));

for (const packageName of ["react", "react-dom"]) {
  await symlink(reactRequire.resolve(`${packageName}/package.json`).replace(/\/package\.json$/, ""), path.join(temporary, "node_modules", packageName));
}

const server = await vite.createServer({
  configFile: false,
  root: temporary,
  plugins: [reactPlugin()],
  server: { host: "127.0.0.1", port: 0, strictPort: false },
});

let browser;
const pageErrors = [],
  consoleErrors = [],
  failedRequests = [],
  badResponses = [],
  requests = [];

try {
  await server.listen();
  const address = server.httpServer.address();

  assert(address && typeof address === "object");
  browser = await puppeteer.launch({
    executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    headless: true,
    pipe: true,
  });
  const browserVersion = await browser.version(),
    page = await browser.newPage();

  page.on("pageerror", (error) => pageErrors.push(error.message));
  page.on("request", (request) => requests.push(request.url()));
  page.on("requestfailed", (request) => failedRequests.push({ url: request.url(), error: request.failure()?.errorText }));
  page.on("response", (response) => {
    if (response.status() >= 400) badResponses.push({ status: response.status(), url: response.url() });
  });
  page.on("console", (message) => {
    if (message.type() === "error") consoleErrors.push({ text: message.text(), location: message.location() });
  });
  await page.setViewport({ width: 1280, height: 800 });
  await page.goto(`http://127.0.0.1:${address.port}/`, { waitUntil: "networkidle0" });
  try {
    await page.waitForFunction(
      () => globalThis.__e10ConfettiLoaded && globalThis.__e10ConfettiContainer?.particles.count > 0 && document.querySelector("canvas"),
      { timeout: 20_000 },
    );
  } catch (error) {
    console.error(JSON.stringify({ pageErrors, consoleErrors, failedRequests, badResponses, requests, html: await page.$eval("body", (body) => body.innerHTML) }));
    throw error;
  }

  const result = {
    example: "React guide: Confetti Effect",
    browser: browserVersion,
    canvasCount: await page.$$eval("canvas", (canvases) => canvases.length),
    particleCountAfterEmitterStart: await page.evaluate(() => globalThis.__e10ConfettiContainer.particles.count),
    pageErrors,
    consoleErrors,
  };

  assert.equal(result.canvasCount, 1);
  assert.ok(result.particleCountAfterEmitterStart > 0);
  assert.deepEqual(pageErrors, []);
  assert.deepEqual(consoleErrors, []);
  await writeFile(outputPath, `${JSON.stringify(result, null, 2)}\n`);
  console.log(JSON.stringify(result, null, 2));
} finally {
  if (browser) await browser.close();
  await server.close();
  await rm(temporary, { recursive: true, force: true });
}
