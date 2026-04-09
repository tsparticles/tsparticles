import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import { mkdir, readdir } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import process from "node:process";
import { setTimeout as delay } from "node:timers/promises";
import { fileURLToPath } from "node:url";

import puppeteer from "puppeteer";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const workspaceRoot = resolve(__dirname, "..");
const catalogRoot = resolve(workspaceRoot, "presets");
const demoRoot = resolve(workspaceRoot, "apps", "demo");
const demoPort = 3415;
const liveReloadPort = 3715;
const pnpmCommand = process.platform === "win32" ? "pnpm.cmd" : "pnpm";

const toKebabCase = value =>
  value
    .replaceAll(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replaceAll(/([A-Z]+)([A-Z][a-z0-9]+)/g, "$1-$2")
    .toLowerCase();

const parseIds = value => {
  if (!value) {
    return [];
  }

  return value.flatMap(entry => String(entry).split(",")).map(entry => entry.trim()).filter(Boolean);
};

const discoverPresets = async root => {
  const entries = await readdir(root, { withFileTypes: true });

  return entries
    .filter(entry => entry.isDirectory() && !entry.name.startsWith("."))
    .map(entry => ({
      fullPath: join(root, entry.name),
      id: entry.name,
      outputPath: join(root, entry.name, "images", "sample.png"),
      route: `/presets/${entry.name}`,
      slug: toKebabCase(entry.name),
    }))
    .sort((first, second) => first.slug.localeCompare(second.slug));
};

const isReachable = async baseUrl => {
  try {
    const response = await fetch(baseUrl, { method: "GET" });

    return response.ok;
  } catch {
    return false;
  }
};

const waitForServer = async (baseUrl, timeout, child, output) => {
  const startTime = Date.now();

  while (Date.now() - startTime < timeout) {
    if (await isReachable(baseUrl)) {
      return;
    }

    if (child?.exitCode != null) {
      throw new Error(`The demo server exited before becoming ready.\n${output.join("")}`.trim());
    }

    await delay(250);
  }

  throw new Error(`Timed out waiting for ${baseUrl}.\n${output.join("")}`.trim());
};

const stopServer = async child => {
  if (!child || child.exitCode != null) {
    return;
  }

  child.kill("SIGTERM");

  for (let index = 0; index < 20; index++) {
    if (child.exitCode != null) {
      return;
    }

    await delay(250);
  }

  child.kill("SIGKILL");
};

const startDemoServer = async ({ baseUrl, port, timeout, verbose }) => {
  const output = [];
  const child = spawn(pnpmCommand, ["start"], {
    cwd: demoRoot,
    env: {
      ...process.env,
      FORCE_COLOR: "0",
      LIVE_RELOAD_PORT: String(liveReloadPort),
      PORT: String(port),
    },
    stdio: ["ignore", "pipe", "pipe"],
  });
  const appendOutput = chunk => {
    const message = chunk.toString();

    output.push(message);

    if (output.length > 50) {
      output.shift();
    }

    if (verbose) {
      process.stdout.write(message);
    }
  };

  child.stdout.on("data", appendOutput);
  child.stderr.on("data", appendOutput);

  await waitForServer(baseUrl, timeout, child, output);

  console.log(`[samples] Demo server started on ${baseUrl}`);

  return {
    stop: async () => stopServer(child),
  };
};

const getBrowserCandidates = () => {
  switch (process.platform) {
    case "darwin":
      return [
        "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
        "/Applications/Google Chrome Canary.app/Contents/MacOS/Google Chrome Canary",
        "/Applications/Chromium.app/Contents/MacOS/Chromium",
        "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge",
      ];
    case "win32":
      return [
        String.raw`C:\Program Files\Google\Chrome\Application\chrome.exe`,
        String.raw`C:\Program Files (x86)\Google\Chrome\Application\chrome.exe`,
        String.raw`C:\Program Files\Microsoft\Edge\Application\msedge.exe`,
        String.raw`C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe`,
      ];
    default:
      return [
        "/usr/bin/google-chrome-stable",
        "/usr/bin/google-chrome",
        "/usr/bin/chromium-browser",
        "/usr/bin/chromium",
        "/snap/bin/chromium",
        "/usr/bin/microsoft-edge",
      ];
  }
};

const resolveExecutablePath = cliPath => {
  // 1. Explicit CLI override always wins
  if (cliPath) {
    return cliPath;
  }

  // 2. Prefer well-known system browsers (Chrome > Chromium > Edge)
  //    so a global PUPPETEER_EXECUTABLE_PATH pointing to a broken Homebrew
  //    Chromium does not accidentally override a working Chrome install.
  const detectedBrowser = getBrowserCandidates().find(candidate => existsSync(candidate));

  if (detectedBrowser) {
    return detectedBrowser;
  }

  // 3. Respect PUPPETEER_EXECUTABLE_PATH only when no known browser is found
  if (process.env.PUPPETEER_EXECUTABLE_PATH) {
    return process.env.PUPPETEER_EXECUTABLE_PATH;
  }

  // 4. Last resort: bundled Puppeteer browser (requires pnpm approve-builds)
  try {
    const bundledPath = puppeteer.executablePath();

    if (bundledPath && existsSync(bundledPath)) {
      return bundledPath;
    }
  } catch {
    // ignore bundled path lookup failures
  }
};

const hideOverlay = async page => {
  await page.evaluate(() => {
    document.getElementById("stats")?.remove();
  });
};

const captureItem = async (browser, item, options) => {
  const page = await browser.newPage();

  try {
    await page.setViewport({
      deviceScaleFactor: 1,
      height: options.height,
      width: options.width,
    });
    await page.goto(`${options.baseUrl}${item.route}?capture=1`, {
      timeout: options.timeout,
      waitUntil: "domcontentloaded",
    });
    await page.waitForSelector("#tsparticles canvas", {
      timeout: options.timeout,
    });
    await page.waitForFunction(
      () => {
        const canvas = document.querySelector("#tsparticles canvas");

        return !!canvas && canvas.clientWidth > 0 && canvas.clientHeight > 0;
      },
      { timeout: options.timeout },
    );
    await hideOverlay(page);
    await delay(options.delay);
    await page.evaluate(
      () =>
        new Promise(resolve => {
          requestAnimationFrame(() => {
            requestAnimationFrame(resolve);
          });
        }),
    );
    await mkdir(dirname(item.outputPath), { recursive: true });
    await page.screenshot({
      captureBeyondViewport: false,
      path: item.outputPath,
      type: "png",
    });
  } finally {
    await page.close();
  }
};

const argv = await yargs(hideBin(process.argv))
  .scriptName("generate-samples")
  .option("base-url", {
    describe: "Use an already running demo server instead of starting apps/demo automatically.",
    type: "string",
  })
  .option("delay", {
    default: 1500,
    describe: "Milliseconds to wait after the canvas is ready before taking the screenshot.",
    type: "number",
  })
  .option("dry-run", {
    default: false,
    describe: "Print the matched presets without taking screenshots.",
    type: "boolean",
  })
  .option("executable-path", {
    describe: "Override the browser executable used by Puppeteer.",
    type: "string",
  })
  .option("headful", {
    default: false,
    describe: "Show the browser while capturing screenshots.",
    type: "boolean",
  })
  .option("height", {
    default: 1080,
    describe: "Viewport height in pixels.",
    type: "number",
  })
  .option("id", {
    describe: "Capture only specific preset ids/slugs. Accepts repeated flags or comma separated values.",
    type: "array",
  })
  .option("list", {
    default: false,
    describe: "List the discovered presets and exit.",
    type: "boolean",
  })
  .option("port", {
    default: demoPort,
    describe: "Port used for the temporary demo server started by the script.",
    type: "number",
  })
  .option("skip-existing", {
    default: false,
    describe: "Skip presets that already have images/sample.png.",
    type: "boolean",
  })
  .option("timeout", {
    default: 30000,
    describe: "Timeout in milliseconds for page load and demo server startup.",
    type: "number",
  })
  .option("verbose", {
    default: false,
    describe: "Print demo server output while running.",
    type: "boolean",
  })
  .option("width", {
    default: 1920,
    describe: "Viewport width in pixels.",
    type: "number",
  })
  .coerce("id", parseIds)
  .strict()
  .help()
  .parse();

const allItems = await discoverPresets(catalogRoot);
const filters = new Set((argv.id ?? []).map(value => value.toLowerCase()));
const matchedItems = allItems.filter(item => {
  if (filters.size === 0) {
    return true;
  }

  return filters.has(item.id.toLowerCase()) || filters.has(item.slug.toLowerCase());
});
const items = argv["skip-existing"] ? matchedItems.filter(item => !existsSync(item.outputPath)) : matchedItems;

if (argv.list || argv["dry-run"]) {
  for (const item of items) {
    console.log(`${item.id}\t${item.slug}\t${item.outputPath}`);
  }

  process.exit(0);
}

if (matchedItems.length === 0) {
  throw new Error("No presets matched the provided filters.");
}

if (items.length === 0) {
  console.log("[samples] Nothing to do, every selected preset already has a sample image.");
  process.exit(0);
}

const baseUrl = argv["base-url"] ?? `http://127.0.0.1:${argv.port}`;
const executablePath = resolveExecutablePath(argv["executable-path"]);
const server = argv["base-url"]
  ? { stop: async () => undefined }
  : await startDemoServer({
      baseUrl,
      port: argv.port,
      timeout: argv.timeout,
      verbose: argv.verbose,
    });
let browser;

try {
  try {
    browser = await puppeteer.launch({
      args: ["--disable-dev-shm-usage"],
      defaultViewport: null,
      executablePath,
      headless: !argv.headful,
    });
  } catch (error) {
    const browserMessage = executablePath
      ? `Unable to launch the browser at ${executablePath}.`
      : "Unable to find a Chrome/Chromium executable for Puppeteer.";

    throw new Error(
      `${browserMessage} Pass --executable-path, set PUPPETEER_EXECUTABLE_PATH, or approve Puppeteer's browser download with pnpm approve-builds.\n${error.message}`,
      { cause: error },
    );
  }

  const failures = [];

  for (const [index, item] of items.entries()) {
    console.log(`[samples] (${index + 1}/${items.length}) Capturing ${item.id}...`);

    try {
      await captureItem(browser, item, {
        baseUrl,
        delay: argv.delay,
        height: argv.height,
        timeout: argv.timeout,
        width: argv.width,
      });
      console.log(`[samples] Saved ${item.outputPath}`);
    } catch (error) {
      failures.push({
        error,
        item,
      });
      console.error(`[samples] Failed ${item.id}: ${error.message}`);
    }
  }

  if (failures.length > 0) {
    const failureList = failures.map(({ error, item }) => `- ${item.id}: ${error.message}`).join("\n");

    throw new Error(`Failed to capture ${failures.length} preset sample(s):\n${failureList}`);
  }

  console.log(`[samples] Captured ${items.length} preset sample image(s).`);
} finally {
  await browser?.close();
  await server.stop();
}

