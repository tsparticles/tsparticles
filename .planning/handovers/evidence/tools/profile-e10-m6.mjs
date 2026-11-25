import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { gzipSync } from "node:zlib";
import puppeteer from "puppeteer";

const bundlePath =
    process.argv.find((arg) => arg.startsWith("--bundle="))?.slice("--bundle=".length) ??
    "bundles/all/dist/tsparticles.all.bundle.js",
  bundle = (await readFile(bundlePath)).toString(),
  outputPath = ".planning/handovers/evidence/e10/m6-cpu-profile.json",
  browser = await puppeteer.launch({
    executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    headless: true,
    pipe: true,
  });

try {
  const page = await browser.newPage(),
    errors = [];

  page.on("pageerror", (error) => errors.push(error.message));
  await page.setViewport({ width: 800, height: 600, deviceScaleFactor: 1 });
  await page.setContent('<body style="margin:0"><div id="m6" style="width:800px;height:600px"></div></body>');
  await page.addScriptTag({ content: bundle });
  const contextAttributes = await page.evaluate(async () => {
    const engine = tsParticles.createEngine();

    await loadAll(engine);
    let seed = 123456789;
    engine.setRandom(() => (seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0) / 4294967296);

    const container = await engine.load({
      id: "m6",
      options: {
        autoPlay: false,
        fullScreen: false,
        detectRetina: false,
        particles: {
          number: { value: 500, density: { enable: false } },
          shape: { type: "circle" },
          size: { value: 3 },
          paint: { fill: { color: { value: "#ff0000" } } },
          move: { enable: true, speed: 1 },
          groups: { a: { number: { value: 0 } } },
        },
        emitters: {
          name: "m6-emitter",
          startCount: 0,
          position: { x: 10, y: 10 },
          rate: { delay: 0.1, quantity: 1 },
        },
        absorbers: {
          name: "m6-absorber",
          position: { x: 80, y: 80 },
          size: { value: 5 },
          destroy: false,
        },
      },
    });

    if (container.particles.count !== 500) throw new Error("Initial count mismatch");
    container.getEmitter("m6-emitter")?.play();

    globalThis.m6Container = container;
    globalThis.m6Delta = { factor: 1, value: 1000 / 60 };
    globalThis.m6PluginCounts = {
      containerPlugins: container.plugins.length,
      drawParticleTransformPlugins: container.plugins.filter((plugin) => plugin.drawParticleTransform).length,
    };

    for (let i = 0; i < 30; i++) container.canvas.render.drawParticles(m6Delta);

    return container.canvas.render.draw((context) => context.getContextAttributes());
  });

  const cdp = await page.createCDPSession();

  await cdp.send("Profiler.enable");
  await cdp.send("Profiler.setSamplingInterval", { interval: 100 });
  await cdp.send("Profiler.start");
  const elapsedMs = await page.evaluate(() => {
    const start = performance.now();

    for (let i = 0; i < 120; i++) m6Container.canvas.render.drawParticles(m6Delta);

    return performance.now() - start;
  });
  const { profile } = await cdp.send("Profiler.stop"),
    samples = new Map();

  for (const id of profile.samples ?? []) samples.set(id, (samples.get(id) ?? 0) + 1);

  const sourceLines = bundle.split("\n"),
    hot = profile.nodes
      .map((node) => ({
        functionName: node.callFrame.functionName,
        line: node.callFrame.lineNumber + 1,
        selfSamples: samples.get(node.id) ?? 0,
        positionTicks: node.positionTicks?.map((tick) => ({
          line: tick.line,
          ticks: tick.ticks,
          source: sourceLines[tick.line - 1]?.trim().slice(0, 300),
        })),
      }))
      .sort((a, b) => b.selfSamples - a.selfSamples)
      .slice(0, 30);

  await page.evaluate(() => m6Container.destroy());
  assert.deepEqual(errors, []);

  const result = {
    browser: await browser.version(),
    bundlePath,
    bundleSha256: createHash("sha256").update(bundle).digest("hex"),
    scenario: "M6-extensions",
    particles: 500,
    pluginCounts: await page.evaluate(() => m6PluginCounts),
    measuredFrames: 120,
    elapsedMs,
    contextAttributes,
    hot,
    errors,
    limitations: [
      "Instrumented CPU profile identifies candidate hotspots; elapsed time is not a budget measurement.",
      "Profile sampling and unminified code may change absolute timings; confirm any change with the fixed runtime harness.",
    ],
  };

  await writeFile(outputPath, `${JSON.stringify(result, null, 2)}\n`);
  await writeFile(`${outputPath}.profile.json.gz`, gzipSync(JSON.stringify(profile), { mtime: 0 }));
  console.log(JSON.stringify(result, null, 2));
} finally {
  await browser.close();
}
