import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { readFile, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import path from "node:path";
import puppeteer from "puppeteer";
import { gunzipSync } from "node:zlib";

const output = path.resolve(process.argv[2] ?? ".planning/handovers/evidence/e5/browser-profile.json");
const bundlePath = process.argv[3] ?? "bundles/all/dist/tsparticles.all.bundle.min.js",
  bundleBytes = await readFile(bundlePath),
  bundleSource = bundlePath.endsWith(".gz") ? gunzipSync(bundleBytes) : bundleBytes;
const hash = (value) => createHash("sha256").update(value).digest("hex");
const browser = await puppeteer.launch({
  executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  headless: true,
  pipe: true,
});
const samples = [],
  errors = [],
  counts = process.env.E5_PROFILE_COUNTS?.split(",").map(Number) ?? [100, 500, 1000],
  scenarios = process.env.E5_PROFILE_SCENARIOS?.split(",") ?? ["M3", "M4", "M5", "M7", "M8"],
  repetitions = Number(process.env.E5_PROFILE_REPETITIONS ?? 3);
assert.ok(counts.every((count) => [100, 500, 1000].includes(count)));
assert.ok(scenarios.every((scenario) => ["M3", "M4", "M5", "M7", "M8"].includes(scenario)));
assert.ok(Number.isSafeInteger(repetitions) && repetitions > 0 && repetitions % 2 === 1);
const median = (values) => [...values].sort((a, b) => a - b)[Math.floor(values.length / 2)];
try {
  const page = await browser.newPage();
  await page.setViewport({ width: 800, height: 600, deviceScaleFactor: 1 });
  page.on("pageerror", (error) => errors.push(error.message));
  await page.setContent('<body style="margin:0"><div id="profile" style="width:800px;height:600px"></div></body>');
  await page.addScriptTag({ content: bundleSource.toString("utf8") });
  await page.evaluate(async () => {
    globalThis.sceneEngine = tsParticles.createEngine();
    await loadAll(sceneEngine);
    globalThis.prepare = async (scenario, count) => {
      let seed = 123456789;
      globalThis.randomCalls = 0;
      sceneEngine.setRandom(() => {
        randomCalls++;
        seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
        return seed / 4294967296;
      });
      const variants = {
        M3: {},
        M4: { links: { enable: true, distance: 80 }, collisions: { enable: true, mode: "bounce" } },
        M5: { collisions: { enable: true, mode: "fluid" } },
        M7: { zIndex: { value: { min: 0, max: 100 } } },
        M8: {},
      };
      const start = performance.now();
      globalThis.container = await sceneEngine.load({
        id: "profile",
        options: {
          autoPlay: false,
          fullScreen: false,
          detectRetina: false,
          fpsLimit: 60,
          ...(scenario === "M8" ? { backgroundMask: { enable: true, cover: { color: "#101020", opacity: 1 } } } : {}),
          particles: {
            number: { value: count, density: { enable: false } },
            paint: { fill: { color: { value: "#ff0000" } } },
            shape: { type: "circle" },
            size: { value: 3 },
            opacity: { value: 1 },
            move: { enable: true, speed: 1 },
            ...variants[scenario],
          },
        },
      });
      if (container.particles.count !== count) throw new Error("Particle count mismatch");
      return performance.now() - start;
    };
    globalThis.tick = (phase) => {
      const delta = { value: 1000 / 60, factor: 1 };
      if (phase === "update") container.particles.update(delta);
      else container.canvas.render.drawParticles(delta);
    };
    globalThis.snapshotScene = () => ({
      randomCalls,
      particles: Array.from({ length: container.particles.count }, (_, index) => {
        const particle = container.particles.get(index),
          position = particle.getPosition();
        return [
          position.x,
          position.y,
          particle.velocity.x,
          particle.velocity.y,
          particle.getRadius(),
          particle.links?.length ?? 0,
        ];
      }),
    });
    globalThis.destroyScene = () => {
      container.destroy();
      globalThis.container = undefined;
      if (sceneEngine.items.length) throw new Error("Container retained");
    };
  });
  const cdp = await page.createCDPSession();
  await cdp.send("HeapProfiler.enable");
  const heap = async () => {
    await cdp.send("HeapProfiler.collectGarbage");
    return (await cdp.send("Runtime.getHeapUsage")).usedSize;
  };
  const snapshot = async () => {
    const scene = await page.evaluate(() => snapshotScene());
    return {
      sha256: hash(JSON.stringify(scene.particles)),
      randomCalls: scene.randomCalls,
      links: scene.particles.reduce((sum, particle) => sum + particle[5], 0),
    };
  };
  for (const scenario of scenarios) {
    for (const count of counts) {
      for (let repetition = 0; repetition < repetitions; repetition++) {
        await page.evaluate((s) => prepare(s, 0), scenario);
        const emptyHeap = await heap();
        await page.evaluate(() => destroyScene());
        const initializationMs = await page.evaluate(({ scenario, count }) => prepare(scenario, count), {
          scenario,
          count,
        });
        const initialScene = await snapshot();
        await page.evaluate(() => {
          for (let i = 0; i < 30; i++) tick("frame");
        });
        const warmScene = await snapshot();
        const retainedHeap = await heap();
        const timing = await page.evaluate(() => {
          const updates = [],
            draws = [],
            frames = [],
            update = container.particles.update.bind(container.particles);
          let updateMs = 0;
          container.particles.update = (delta) => {
            const start = performance.now();
            update(delta);
            updateMs = performance.now() - start;
          };
          try {
            for (let i = 0; i < 60; i++) {
              const start = performance.now();
              tick("frame");
              const frame = performance.now() - start;
              updates.push(updateMs);
              draws.push(Math.max(0, frame - updateMs));
              frames.push(frame);
            }
          } finally {
            container.particles.update = update;
          }
          const summarize = (values) => {
            const sorted = [...values].sort((a, b) => a - b);
            return { median: sorted[29], p95: sorted[56], max: sorted[59] };
          };
          return { updateMs: summarize(updates), drawExcludingUpdateMs: summarize(draws), frameMs: summarize(frames) };
        });
        const measuredScene = await snapshot();
        const allocations = {};
        for (const phase of ["update", "frame"]) {
          await cdp.send("HeapProfiler.collectGarbage");
          await cdp.send("HeapProfiler.startSampling", {
            samplingInterval: 512,
            includeObjectsCollectedByMajorGC: true,
            includeObjectsCollectedByMinorGC: true,
          });
          await page.evaluate((phase) => {
            for (let i = 0; i < 60; i++) tick(phase);
          }, phase);
          const { profile } = await cdp.send("HeapProfiler.stopSampling");
          const sampledBytes = profile.samples.reduce((sum, sample) => sum + sample.size, 0);
          const sites = [];
          const visit = (node) => {
            if (node.selfSize) sites.push({ ...node.callFrame, sampledBytes: node.selfSize });
            for (const child of node.children) visit(child);
          };
          visit(profile.head);
          allocations[phase] = {
            sampledBytesPerTick: sampledBytes / 60,
            sampleRecords: profile.samples.length,
            largestSites: sites.sort((a, b) => b.sampledBytes - a.sampledBytes).slice(0, 10),
          };
        }
        const randomCalls = await page.evaluate(() => globalThis.randomCalls);
        await page.evaluate(() => destroyScene());
        samples.push({
          scenario,
          count,
          repetition,
          initializationMs,
          retainedHeapDeltaBytes: retainedHeap - emptyHeap,
          retainedBytesPerParticle: (retainedHeap - emptyHeap) / count,
          randomCalls,
          initialScene,
          warmScene,
          measuredScene,
          ...timing,
          allocations,
        });
        console.log(`${scenario}/${count}/${repetition} measured`);
      }
    }
  }
  const summary = scenarios.flatMap((scenario) =>
    counts.map((count) => {
      const group = samples.filter((sample) => sample.scenario === scenario && sample.count === count);
      assert.equal(new Set(group.map((sample) => sample.randomCalls)).size, 1, `${scenario}/${count} RNG mismatch`);
      return {
        scenario,
        count,
        initializationMs: median(group.map((s) => s.initializationMs)),
        retainedBytesPerParticle: median(group.map((s) => s.retainedBytesPerParticle)),
        updateMedianMs: median(group.map((s) => s.updateMs.median)),
        drawMedianMs: median(group.map((s) => s.drawExcludingUpdateMs.median)),
        frameP95Ms: median(group.map((s) => s.frameMs.p95)),
        updateSampledBytesPerTick: median(group.map((s) => s.allocations.update.sampledBytesPerTick)),
        frameSampledBytesPerTick: median(group.map((s) => s.allocations.frame.sampledBytesPerTick)),
      };
    }),
  );
  assert.deepEqual(errors, []);
  const report = {
    measuredAt: new Date().toISOString(),
    revision: execFileSync("git", ["rev-parse", "HEAD"], { encoding: "utf8" }).trim(),
    workingTree: true,
    bundlePath,
    bundleSha256: hash(bundleSource),
    browser: await browser.version(),
    seed: 123456789,
    repetitions,
    warmupTicks: 30,
    measuredTicks: 60,
    samplingIntervalBytes: 512,
    errors,
    samples,
    summary,
    limitations: [
      "Headless CPU submission timings exclude GPU completion and physical display appearance.",
      "Allocation sampling includes collected objects but estimates JS bytes; native canvas/GPU memory is excluded.",
      "Frame allocation includes update; it must not be described as isolated draw allocation.",
      "Retained heap subtracts an empty container in the same scenario after forced GC; realm caches and renderer overhead remain included.",
      "Compare versions only when browser, workload parameters and scene snapshots agree. The original E0 matrix used an older Chrome patch.",
      "Profiling phase order advances state; timings are captured before allocation sampling.",
      "M8 here covers background mask only; HDR/layers/resize use the separate extended harness.",
    ],
  };
  await writeFile(output, JSON.stringify(report, null, 2) + "\n");
  console.log(JSON.stringify(summary, null, 2));
} finally {
  await browser.close();
}
