import assert from "node:assert/strict";
import puppeteer from "puppeteer";
import { writeFile } from "node:fs/promises";
import path from "node:path";
import { execFileSync } from "node:child_process";
const forceHdr = process.argv.includes("--force-hdr");
const output = path.resolve(".planning/handovers/evidence/e1");
const browser = await puppeteer.launch({
  executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  headless: true,
  pipe: true,
});
try {
  const page = await browser.newPage();
  await page.setViewport({ width: 800, height: 600, deviceScaleFactor: 1 });
  await page.setContent('<body style="margin:0"><div id="v5-baseline" style="width:800px;height:600px"></div></body>');
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.addScriptTag({ path: path.resolve("bundles/all/dist/tsparticles.all.bundle.min.js") });
  await page.evaluate(async forceHdr => {
    globalThis.sceneEngine = globalThis.tsParticles.createEngine();
    if (forceHdr) {
      const match = window.matchMedia.bind(window);
      window.matchMedia = query => {
        const result = match(query);
        if (["(color-gamut: p3)", "(dynamic-range: high)"].includes(query)) {
          Object.defineProperty(result, "matches", { value: true });
        }
        return result;
      };
    }
    globalThis.mediaListeners = {};
    const add = MediaQueryList.prototype.addEventListener;
    const remove = MediaQueryList.prototype.removeEventListener;
    MediaQueryList.prototype.addEventListener = function (...args) {
      mediaListeners[this.media] = (mediaListeners[this.media] ?? 0) + 1;
      return add.apply(this, args);
    };
    MediaQueryList.prototype.removeEventListener = function (...args) {
      mediaListeners[this.media] = (mediaListeners[this.media] ?? 0) - 1;
      return remove.apply(this, args);
    };
    await loadAll(sceneEngine);
    globalThis.runExtended = async (scenario, count, cycle) => {
      let seed = 123456789,
        calls = 0,
        backgroundDraws = 0;
      __tsParticlesInternals.engine.setRandom(() => {
        calls++;
        seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
        return seed / 4294967296;
      });
      const host = document.getElementById("v5-baseline");
      host.style.width = "800px";
      host.style.height = "600px";
      const options = {
        autoPlay: false,
        fullScreen: false,
        detectRetina: false,
        particles: {
          number: { value: count, density: { enable: false } },
          shape: { type: "circle" },
          size: { value: 3 },
          paint: { fill: { color: { value: "#ff0000" } } },
          move: { enable: true, speed: 1 },
        },
      };
      if (scenario === "M6-extensions") {
        options.particles.groups = { a: { number: { value: 0 } } };
        options.emitters = {
          name: "baseline-emitter",
          startCount: 0,
          position: { x: 10, y: 10 },
          rate: { delay: 0.1, quantity: 1 },
        };
        options.absorbers = {
          name: "baseline-absorber",
          position: { x: 80, y: 80 },
          size: { value: 5 },
          destroy: false,
        };
      } else {
        options.hdr = { enable: true, mode: "standard", peakNits: 400 };
        options.background = {
          color: "#102030",
          draw: (ctx) => {
            backgroundDraws++;
            ctx.fillStyle = "rgba(255,255,255,0.2)";
            ctx.fillRect(0, 0, 20, 20);
          },
        };
        options.backgroundMask = { enable: true, cover: { color: "#101020", opacity: 0.5 } };
      }
      const start = performance.now(),
        container = await sceneEngine.load({ id: "v5-baseline", options }),
        initMs = performance.now() - start;
      if (container.particles.count !== count) throw new Error("Initial count mismatch");
      if (scenario === "M6-extensions") {
        if (!container.getEmitter("baseline-emitter") || !container.getAbsorber("baseline-absorber"))
          throw new Error("Missing extension instance");
        container.getEmitter("baseline-emitter").play();
      }
      const updates = [],
        renders = [],
        frames = [],
        delta = { value: 1000 / 60, factor: 1 };
      let updateMs = 0;
      const update = container.particles.update.bind(container.particles);
      container.particles.update = (d) => {
        const t = performance.now();
        update(d);
        updateMs = performance.now() - t;
      };
      for (let tick = 0; tick < 90; tick++) {
        const t = performance.now();
        container.canvas.render.drawParticles(delta);
        const elapsed = performance.now() - t;
        if (tick >= 30) {
          updates.push(updateMs);
          renders.push(elapsed - updateMs);
          frames.push(elapsed);
        }
      }
      const countAfterTicks = container.particles.count;
      let resizeMs = null,
        resized = null,
        contextAttributes;
      container.canvas.render.draw((ctx) => {
        contextAttributes = ctx.getContextAttributes();
      });
      if (scenario === "M6-extensions") {
        for (let i = 0; i < 10; i++) {
          container.particles.push(10, undefined, undefined, "a");
          container.particles.removeQuantity(10, "a");
        }
      } else {
        host.style.width = "640px";
        host.style.height = "480px";
        const t = performance.now();
        container.canvas.resize();
        container.canvas.render.drawParticles(delta);
        resizeMs = performance.now() - t;
        resized = { ...container.canvas.size };
        if (resized.width !== 640 || resized.height !== 480) throw new Error("Resize did not update dimensions");
        if (backgroundDraws < 90) throw new Error("Background layer was not rendered");
      }
      const finalCount = container.particles.count,
        t = performance.now();
      container.destroy();
      const stats = (xs) => {
        const v = [...xs].sort((a, b) => a - b);
        return {
          median: v[Math.floor(v.length * 0.5)],
          p95: v[Math.floor((v.length - 1) * 0.95)],
          min: v[0],
          max: v.at(-1),
        };
      };
      return {
        scenario,
        count,
        cycle,
        initMs,
        update: stats(updates),
        render: stats(renders),
        frame: stats(frames),
        longFrames: frames.filter((x) => x > 16.667).length,
        measuredTicks: frames.length,
        resizeMs,
        resized,
        contextAttributes,
        countAfterTicks,
        finalCount,
        backgroundDraws,
        randomCalls: calls,
        teardownMs: performance.now() - t,
        remainingContainers: sceneEngine.items.length,
      };
    };
  }, forceHdr);
  const cdp = await page.createCDPSession();
  await cdp.send("HeapProfiler.enable");
  const memory = async () => {
    await cdp.send("HeapProfiler.collectGarbage");
    return {
      heap: await cdp.send("Runtime.getHeapUsage"),
      dom: await cdp.send("Memory.getDOMCounters"),
      mediaListeners: await page.evaluate(() => ({ ...mediaListeners })),
    };
  };
  // Warm all extension paths before the retention series to separate initialization from retained growth.
  for (const s of ["M6-extensions", "M8-hdr-layers-resize"]) await page.evaluate((s) => runExtended(s, 100, -1), s);
  const before = await memory(),
    samples = [];
  for (const scenario of ["M6-extensions", "M8-hdr-layers-resize"])
    for (const count of [100, 500, 1000])
      for (let i = 0; i < 3; i++)
        samples.push(
          await page.evaluate(({ scenario, count, i }) => runExtended(scenario, count, i), { scenario, count, i }),
        );
  const after = await memory(),
    retention = [];
  for (let batch = 0; batch < 3; batch++) {
    for (let cycle = 0; cycle < 10; cycle++)
      await page.evaluate((cycle) => runExtended("M6-extensions", 100, cycle), cycle);
    retention.push(await memory());
  }
  assert.equal(errors.length, 0);
  if (forceHdr) assert(samples.filter(x => x.scenario === "M8-hdr-layers-resize").every(x => x.contextAttributes.colorSpace === "display-p3" && x.contextAttributes.colorType === "float16"));
  assert(samples.every((x) => x.remainingContainers === 0));
  for (const scenario of ["M6-extensions", "M8-hdr-layers-resize"])
    for (const count of [100, 500, 1000])
      assert.equal(
        new Set(samples.filter((x) => x.scenario === scenario && x.count === count).map((x) => x.randomCalls)).size,
        1,
      );
  await writeFile(
    path.join(output, forceHdr ? "runtime-extended-hdr.json" : "runtime-extended.json"),
    JSON.stringify(
      {
        workingTree: true,
        measuredAt: new Date().toISOString(),
        revision: execFileSync("git", ["rev-parse", "HEAD"], { encoding: "utf8" }).trim(),
        forceHdr,
        browser: await browser.version(),
        samples,
        before,
        after,
        retention,
        errors,
        limitations: [
          "CPU submission times; physical HDR luminance is not observable headlessly",
          "Forced-GC retained heap is not allocation volume or proof of absence of leaks",
          "Retention runs use one warmed page; DOM/heap drift must be compared to repeated same-toolchain runs",
          "Frame budget counts use explicit synchronous ticks, not presented frames",
        ],
      },
      null,
      2,
    ) + "\n",
  );
  console.log(JSON.stringify({ runs: samples.length, before, after, retention, errors }));
} finally {
  await browser.close();
}
