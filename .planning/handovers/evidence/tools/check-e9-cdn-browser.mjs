import puppeteer from "puppeteer";
import { createServer } from "node:http";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
const source = path.resolve(".planning/handovers/evidence/e1");
const destination = path.resolve(".planning/handovers/evidence/e9");
const candidate = JSON.parse(await readFile(path.join(source, "cdn-candidate.json"), "utf8"));
const remoteCdnScripts = [
  "https://cdn.jsdelivr.net/npm/@tsparticles/engine@4.6.0/tsparticles.engine.min.js",
  "https://cdn.jsdelivr.net/npm/@tsparticles/basic@4.6.0/tsparticles.basic.bundle.min.js",
];
const remoteEsmModules = [
  "https://cdn.jsdelivr.net/npm/@tsparticles/engine@4.6.0/+esm",
  "https://cdn.jsdelivr.net/npm/@tsparticles/basic@4.6.0/+esm",
];
const basicBundle = "/bundles/basic/dist/tsparticles.basic.bundle.min.js";
const webpackBundle = "/bundles/basic/dist/tsparticles.tsparticles.basic.bundle.min.js";
const webpackMinChunks = ["117.min.js", "717.min.js", "79.min.js"].map((name) => "/bundles/basic/dist/" + name);
const webpackUnminBundle = "/bundles/basic/dist/tsparticles.tsparticles.basic.bundle.js";
const webpackUnminChunks = [
  "engine_dist_esm_Core_Container_Container_js.js",
  "plugins_blend_dist_esm_BlendPluginInstance_js.js",
  "plugins_move_dist_esm_MovePluginInstance_js.js",
].map((name) => "/bundles/basic/dist/" + name);
const externalWebpackLoader = "/bundles/basic/dist/tsparticles.tsparticles.basic.min.js";
const externalFeatureFiles = [
  "plugins/blend/dist/tsparticles.plugin.blend.min.js",
  "plugins/colors/hsl/dist/tsparticles.plugin.hslColor.min.js",
  "plugins/colors/rgb/dist/tsparticles.plugin.rgbColor.min.js",
].map((file) => "/" + file);
const allowed = new Set([
  ...candidate.files.map((x) => "/" + x.file),
  basicBundle,
  webpackBundle,
  ...webpackMinChunks,
  webpackUnminBundle,
  ...webpackUnminChunks,
  externalWebpackLoader,
  ...externalFeatureFiles,
]);
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
    if (response.url().endsWith(".js") || response.url().includes("cdn.jsdelivr.net/"))
      requests.push({
        origin: new URL(response.url()).origin,
        url: new URL(response.url()).pathname,
        status: response.status(),
        fromCache: response.fromCache(),
      });
  });
  const base = `http://127.0.0.1:${server.address().port}`;
  const options = JSON.parse(await readFile(path.join(source, "bundle-sizes.json"), "utf8")).options;
  const runs = [];
  for (const cache of ["cold", "warm"]) {
    await page.goto(base);
    for (const file of candidate.files) await page.addScriptTag({ url: base + "/" + file.file });
    const availableLoaders = await page.evaluate(() =>
      [
        "loadCircleShape",
        "loadMovePlugin",
        "loadHexColorPlugin",
        "loadPaintUpdater",
        "loadSizeUpdater",
        "loadOpacityUpdater",
        "loadOutModesUpdater",
      ].map((name) => [name, typeof tsParticles[name]]),
    );
    console.log(JSON.stringify({ cache, availableLoaders, errors }));
    runs.push(
      await page.evaluate(
        async ({ options, cache }) => {
          const startedAt = performance.now();
          const engine = tsParticles.createEngine();
          const engineCreatedAt = performance.now();
          const loaderNames = [
              "loadCircleShape",
              "loadMovePlugin",
              "loadHexColorPlugin",
              "loadPaintUpdater",
              "loadSizeUpdater",
              "loadOpacityUpdater",
              "loadOutModesUpdater",
            ],
            loaders = loaderNames.map((name) => tsParticles[name]),
            missingLoaders = loaderNames.filter((_, index) => typeof loaders[index] !== "function");

          if (missingLoaders.length) throw new Error("Missing browser loaders: " + missingLoaders.join(", "));

          await Promise.all(loaders.map((load) => load(engine)));
          const loadersReadyAt = performance.now();
          const scene = await engine.load({ id: "v5-baseline", options });
          const sceneReadyAt = performance.now();
          const count = scene.particles.count;
          scene.canvas.render.drawParticles({ value: 1000 / 60, factor: 1 });
          scene.destroy();
          const completedAt = performance.now();
          if (count !== 100) throw new Error("Invalid minimal scene count: " + count);
          return {
            cache,
            count,
            remainingContainers: engine.items.length,
            timingsMs: {
              engineCreate: engineCreatedAt - startedAt,
              featureRegistration: loadersReadyAt - engineCreatedAt,
              sceneLoad: sceneReadyAt - loadersReadyAt,
              totalThroughCleanup: completedAt - startedAt,
            },
          };
        },
        { options, cache },
      ),
    );
  }
  const basicRuns = [];
  for (const cache of ["cold", "warm"]) {
    await page.goto(base);
    await page.addScriptTag({ url: base + basicBundle });
    basicRuns.push(
      await page.evaluate(
        async ({ options, cache }) => {
          const startedAt = performance.now();
          const engine = tsParticles.createEngine();
          const engineCreatedAt = performance.now();
          await tsParticles.loadBasic(engine);
          const featuresReadyAt = performance.now();
          const scene = await engine.load({ id: "v5-baseline", options });
          const sceneReadyAt = performance.now();
          const count = scene.particles.count;
          scene.canvas.render.drawParticles({ value: 1000 / 60, factor: 1 });
          scene.destroy();
          const completedAt = performance.now();
          if (count !== 100) throw new Error("Invalid Basic scene count: " + count);
          return {
            cache,
            count,
            remainingContainers: engine.items.length,
            timingsMs: {
              engineCreate: engineCreatedAt - startedAt,
              featureRegistration: featuresReadyAt - engineCreatedAt,
              sceneLoad: sceneReadyAt - featuresReadyAt,
              totalThroughCleanup: completedAt - startedAt,
            },
          };
        },
        { options, cache },
      ),
    );
  }
  await page.goto(base);
  for (const url of remoteCdnScripts) await page.addScriptTag({ url });
  const remoteExports = await page.evaluate(() => Object.keys(globalThis.tsParticles ?? {}));
  const remoteCdnCompatible = await page.evaluate(() => typeof tsParticles?.createEngine === "function");
  const remoteCdnRun = remoteCdnCompatible
    ? await page.evaluate(async (options) => {
        const engine = tsParticles.createEngine();
        await tsParticles.loadBasic(engine);
        const scene = await engine.load({ id: "v5-baseline", options });
        const count = scene.particles.count;
        scene.canvas.render.drawParticles({ value: 1000 / 60, factor: 1 });
        scene.destroy();
        if (count !== 100) throw new Error("Invalid remote CDN scene count: " + count);
        return { count, remainingContainers: engine.items.length };
      }, options)
    : {
        exposedExports: remoteExports,
        finding:
          "The published engine URL does not expose the explicit createEngine bootstrap used by the checked-in v5 browser contract.",
      };
  const remoteCdnResponses = requests.filter((request) => request.origin === "https://cdn.jsdelivr.net");

  if (
    remoteCdnResponses.length !== remoteCdnScripts.length ||
    remoteCdnResponses.some((request) => request.status !== 200)
  ) {
    throw new Error("Remote CDN scripts did not all return HTTP 200");
  }
  await page.goto(base);
  const remoteEsmRun = await page.evaluate(
    async ({ moduleUrls, options }) => {
      const globalsBefore = Object.keys(globalThis.tsParticles ?? {});
      try {
        const [engineModule, basicModule] = await Promise.all(moduleUrls.map((url) => import(url)));
        const createEngine = engineModule.createEngine;
        const loadBasic = basicModule.loadBasic;

        if (typeof createEngine !== "function" || typeof loadBasic !== "function") {
          const globalsAfter = Object.keys(globalThis.tsParticles ?? {});
          return {
            compatible: false,
            engineExports: Object.keys(engineModule),
            basicExports: Object.keys(basicModule),
            globalsBefore,
            globalsAfter,
            globalsChanged: JSON.stringify(globalsBefore) !== JSON.stringify(globalsAfter),
          };
        }

        const engine = createEngine();
        await loadBasic(engine);
        const scene = await engine.load({ id: "v5-baseline", options });
        const count = scene.particles.count;
        scene.destroy();
        const globalsAfter = Object.keys(globalThis.tsParticles ?? {});
        const remainingContainers = engine.items.length;

        if (
          count !== 100 ||
          remainingContainers !== 0 ||
          JSON.stringify(globalsBefore) !== JSON.stringify(globalsAfter)
        ) {
          throw new Error("Remote ESM scene, cleanup, or global-purity check failed");
        }

        return {
          compatible: true,
          count,
          remainingContainers,
          globalsBefore,
          globalsAfter,
          globalsChanged: false,
        };
      } catch (error) {
        return {
          compatible: false,
          error: String(error),
          globalsBefore,
          globalsAfter: Object.keys(globalThis.tsParticles ?? {}),
        };
      }
    },
    { moduleUrls: remoteEsmModules, options },
  );
  const remoteEsmResponses = requests.filter(
    (request) =>
      request.origin === "https://cdn.jsdelivr.net" &&
      remoteEsmModules.some((url) => new URL(url).pathname === request.url),
  );
  await page.goto(base);
  await page.addScriptTag({ type: "module", url: base + basicBundle });
  const moduleScriptRun = await page.evaluate(async (options) => {
    const hasFactory = typeof tsParticles.createEngine === "function";
    if (!hasFactory) throw new Error("Module-script bundle did not expose createEngine");
    const engine = tsParticles.createEngine();
    await tsParticles.loadBasic(engine);
    const scene = await engine.load({ id: "v5-baseline", options });
    const count = scene.particles.count;
    scene.destroy();
    return { hasFactory, count, remainingContainers: engine.items.length };
  }, options);
  await page.goto(base);
  const webpackRequestStart = requests.length;
  await page.addScriptTag({ url: base + webpackBundle });
  const webpackMinRun = await page.evaluate(async (options) => {
    const startedAt = performance.now();
    const hasFactory = typeof tsParticles.createEngine === "function";
    if (!hasFactory) throw new Error("Webpack minified bundle did not expose createEngine");
    const hasBasicLoader = typeof globalThis.loadBasic === "function";
    if (!hasBasicLoader) throw new Error("Webpack minified bundle did not expose loadBasic");
    const engine = tsParticles.createEngine();
    const engineCreatedAt = performance.now();
    await globalThis.loadBasic(engine);
    const featuresReadyAt = performance.now();
    const scene = await engine.load({ id: "v5-baseline", options });
    const sceneReadyAt = performance.now();
    const count = scene.particles.count;
    scene.destroy();
    const completedAt = performance.now();
    return {
      hasFactory,
      hasBasicLoader,
      count,
      remainingContainers: engine.items.length,
      timingsMs: {
        engineCreate: engineCreatedAt - startedAt,
        featureRegistration: featuresReadyAt - engineCreatedAt,
        sceneLoad: sceneReadyAt - featuresReadyAt,
        totalThroughCleanup: completedAt - startedAt,
      },
    };
  }, options);
  const webpackRequests = requests.slice(webpackRequestStart);
  const loadedWebpackChunks = webpackRequests.filter((request) =>
    webpackMinChunks.some((chunk) => request.url.endsWith(chunk)),
  );

  if (loadedWebpackChunks.length === 0 || loadedWebpackChunks.some((request) => request.status !== 200)) {
    throw new Error("Webpack minified bundle did not load its emitted chunks successfully");
  }
  await page.goto(base);
  const webpackUnminRequestStart = requests.length;
  await page.addScriptTag({ url: base + webpackUnminBundle });
  const webpackUnminRun = await page.evaluate(async (options) => {
    const startedAt = performance.now();
    const hasFactory = typeof tsParticles.createEngine === "function";
    const hasBasicLoader = typeof globalThis.loadBasic === "function";
    if (!hasFactory || !hasBasicLoader) throw new Error("Webpack unminified bundle is missing its factory or loader");
    const engine = tsParticles.createEngine();
    const engineCreatedAt = performance.now();
    await globalThis.loadBasic(engine);
    const featuresReadyAt = performance.now();
    const scene = await engine.load({ id: "v5-baseline", options });
    const sceneReadyAt = performance.now();
    const count = scene.particles.count;
    scene.destroy();
    const completedAt = performance.now();
    return {
      hasFactory,
      hasBasicLoader,
      count,
      remainingContainers: engine.items.length,
      timingsMs: {
        engineCreate: engineCreatedAt - startedAt,
        featureRegistration: featuresReadyAt - engineCreatedAt,
        sceneLoad: sceneReadyAt - featuresReadyAt,
        totalThroughCleanup: completedAt - startedAt,
      },
    };
  }, options);
  const webpackUnminRequests = requests.slice(webpackUnminRequestStart);
  const loadedWebpackUnminChunks = webpackUnminRequests.filter((request) =>
    webpackUnminChunks.some((chunk) => request.url.endsWith(chunk)),
  );

  if (loadedWebpackUnminChunks.length === 0 || loadedWebpackUnminChunks.some((request) => request.status !== 200)) {
    throw new Error("Webpack unminified bundle did not load its emitted chunks successfully");
  }
  await page.goto(base);
  const externalRequestStart = requests.length;
  for (const file of candidate.files) await page.addScriptTag({ url: base + "/" + file.file });
  for (const file of externalFeatureFiles) await page.addScriptTag({ url: base + file });
  await page.addScriptTag({ url: base + externalWebpackLoader });
  const webpackExternalRun = await page.evaluate(async (options) => {
    const startedAt = performance.now();
    const hasFactory = typeof tsParticles.createEngine === "function";
    const hasBasicLoader = typeof globalThis.loadBasic === "function";
    if (!hasFactory || !hasBasicLoader)
      throw new Error("Webpack external composition is missing its factory or loader");
    const engine = tsParticles.createEngine();
    const engineCreatedAt = performance.now();
    await globalThis.loadBasic(engine);
    const featuresReadyAt = performance.now();
    const scene = await engine.load({ id: "v5-baseline", options });
    const sceneReadyAt = performance.now();
    const count = scene.particles.count;
    scene.destroy();
    const completedAt = performance.now();
    return {
      hasFactory,
      hasBasicLoader,
      count,
      remainingContainers: engine.items.length,
      timingsMs: {
        engineCreate: engineCreatedAt - startedAt,
        featureRegistration: featuresReadyAt - engineCreatedAt,
        sceneLoad: sceneReadyAt - featuresReadyAt,
        totalThroughCleanup: completedAt - startedAt,
      },
    };
  }, options);
  const webpackExternalRequests = requests.slice(externalRequestStart);

  if (
    webpackExternalRequests.length !== candidate.files.length + externalFeatureFiles.length + 1 ||
    webpackExternalRequests.some((request) => request.status !== 200)
  ) {
    throw new Error("Webpack external composition did not load every script successfully");
  }
  await writeFile(
    path.join(destination, "cdn-browser.json"),
    JSON.stringify(
      {
        browser: await browser.version(),
        runs,
        basicRuns,
        remoteCdn: {
          scripts: remoteCdnScripts,
          responses: remoteCdnResponses,
          compatible: remoteCdnCompatible,
          result: remoteCdnRun,
        },
        remoteEsm: {
          modules: remoteEsmModules,
          responses: remoteEsmResponses,
          result: remoteEsmRun,
        },
        moduleScript: moduleScriptRun,
        webpackMinified: { result: webpackMinRun, requests: webpackRequests, emittedChunks: webpackMinChunks },
        webpackUnminified: {
          result: webpackUnminRun,
          requests: webpackUnminRequests,
          emittedChunks: webpackUnminChunks,
        },
        webpackExternal: { result: webpackExternalRun, requests: webpackExternalRequests },
        requests,
        errors,
        compression: "See cdn-candidate.json; HTTP test serves uncompressed bytes",
        limits:
          "Remote CDN checks cover engine + Basic classic scripts and jsDelivr +esm module entrypoints; CDN cache/version behavior and other lazy chunks are not tested. Local Webpack checks cover minified/unminified standalone and external compositions.",
      },
      null,
      2,
    ) + "\n",
  );
  if (errors.length) throw new Error(errors.join("\n"));
  if (!remoteCdnCompatible) throw new Error("Published remote CDN package does not expose the v5 engine factory");
  console.log(JSON.stringify({ runs, requests: requests.length, errors, remoteCdnCompatible }));
} finally {
  await browser?.close();
  await new Promise((resolve) => server.close(resolve));
}
