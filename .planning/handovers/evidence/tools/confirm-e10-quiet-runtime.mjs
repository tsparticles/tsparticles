import assert from "node:assert/strict";
import { readFile, writeFile } from "node:fs/promises";
import { gunzipSync } from "node:zlib";
import { createHash } from "node:crypto";
import puppeteer from "puppeteer";
const root = ".planning/handovers/evidence/e10/",
  hash = (value) => createHash("sha256").update(value).digest("hex"),
  median = (values) => [...values].sort((a, b) => a - b)[Math.floor(values.length / 2)];
const cases = [["M4", 500]],
  repetitions = 9,
  e0RuntimeBudget = JSON.parse(
    await readFile(".planning/handovers/evidence/e0/runtime-budgets.json", "utf8"),
  ).scenarios.find((row) => row.scenario === "M4" && row.count === 500);
const browser = await puppeteer.launch({
    executablePath: process.env.E10_CHROME_EXECUTABLE ?? "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    headless: true,
    pipe: true,
  }),
  realms = {},
  samples = [],
  errors = [];
try {
  for (const [name, file] of [
    ["baseline", ".planning/handovers/evidence/e6/draw-all.bundle.min.js.gz"],
    ["candidate", "bundles/all/dist/tsparticles.all.bundle.min.js"],
  ]) {
    const artifact = await readFile(file),
      source = file.endsWith(".gz") ? gunzipSync(artifact) : artifact,
      page = await browser.newPage();
    page.on("pageerror", (error) => errors.push(error.message));
    await page.setViewport({ width: 800, height: 600, deviceScaleFactor: 1 });
    await page.setContent('<body style="margin:0"><div id="profile" style="width:800px;height:600px"></div></body>');
    await page.addScriptTag({ content: source.toString() });
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
    realms[name] = { page, cdp, bundleSha256: hash(source) };
  }
  for (let repetition = 0; repetition < repetitions; repetition++)
    for (const [scenario, count] of cases)
      for (const name of repetition % 2 ? ["candidate", "baseline"] : ["baseline", "candidate"]) {
        const { page, cdp } = realms[name],
          snap = async () => {
            const s = await page.evaluate(() => snapshotScene());
            return {
              sha256: hash(JSON.stringify(s.particles)),
              randomCalls: s.randomCalls,
              links: s.particles.reduce((n, p) => n + p[5], 0),
            };
          };
        await page.evaluate((s) => prepare(s, 0), scenario);
        await cdp.send("HeapProfiler.collectGarbage");
        await page.evaluate(() => destroyScene());
        await page.evaluate(({ scenario, count }) => prepare(scenario, count), { scenario, count });
        const initialScene = await snap();
        await page.evaluate(() => {
          for (let i = 0; i < 30; i++) tick("frame");
        });
        const warmScene = await snap();
        await cdp.send("HeapProfiler.collectGarbage");
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
        const measuredScene = await snap();
        await page.evaluate(() => destroyScene());
        samples.push({ name, scenario, count, repetition, initialScene, warmScene, measuredScene, ...timing });
        console.log(name, scenario, count, repetition);
      }
  assert.deepEqual(errors, []);
  const summary = [];
  for (const [scenario, count] of cases) {
    const pair = ["baseline", "candidate"].map((name) =>
      samples.filter((s) => s.name === name && s.scenario === scenario && s.count === count),
    );
    for (let i = 0; i < repetitions; i++)
      for (const phase of ["initialScene", "warmScene", "measuredScene"])
        assert.deepEqual(pair[0][i][phase], pair[1][i][phase]);
    const metrics = {};
    for (const [name, key, stat] of [
      ["updateMedianMs", "updateMs", "median"],
      ["drawMedianMs", "drawExcludingUpdateMs", "median"],
      ["frameP95Ms", "frameMs", "p95"],
    ]) {
      const [b, c] = pair.map((group) => median(group.map((s) => s[key][stat])));
      metrics[name] = {
        baseline: b,
        candidate: c,
        allowanceMs: Math.max(b * 1.1, b + 0.1),
        pass: c <= Math.max(b * 1.1, b + 0.1) + 1e-6,
      };

      if (name === "updateMedianMs" || name === "drawMedianMs") {
        const e0Ceiling =
          name === "updateMedianMs" ? e0RuntimeBudget.updateMedianCeilingMs : e0RuntimeBudget.renderMedianCeilingMs;

        metrics[name].e0Ceiling = e0Ceiling;
        metrics[name].passesE0 = c <= e0Ceiling + 1e-6;
      }
    }
    metrics.frameP95Ms.e4QuietReference = 6.5;
    metrics.frameP95Ms.e5ScreenReference = 7.15;
    metrics.frameP95Ms.candidatePassesReferences = metrics.frameP95Ms.candidate <= 6.5 + 1e-6;
    summary.push({ scenario, count, metrics });
  }
  await writeFile(
    process.env.E10_CONFIRM_OUTPUT ?? root + "runtime-quiet-confirmation.json",
    JSON.stringify(
      {
        browser: await browser.version(),
        repetitions,
        warmupTicks: 30,
        measuredTicks: 60,
        sceneSnapshotsCompared: cases.length * repetitions * 3,
        bundleSha256: Object.fromEntries(Object.entries(realms).map(([name, r]) => [name, r.bundleSha256])),
        samples,
        summary,
        errors,
        limitations: [
          "Alternating matched timing-only confirmation; intentionally omits allocation sampling after measuredScene.",
          "Same prepare/tick/snapshot code and 30/60 warm/measured ticks as the full matrix; empty scenes and forced GC precede timing.",
          "Original E0 ceilings remain unchanged; Chrome 158 matched E6 controls distinguish environment shifts from E10 changes.",
        ],
      },
      null,
      2,
    ) + "\n",
  );
  console.log(JSON.stringify(summary, null, 2));
} finally {
  await browser.close();
}
