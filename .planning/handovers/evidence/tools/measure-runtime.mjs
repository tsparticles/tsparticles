import puppeteer from "puppeteer";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { execFileSync } from "node:child_process";

const output = path.resolve(process.argv[2] ?? ".planning/handovers/evidence/e0");
await mkdir(output, { recursive: true });
const browser = await puppeteer.launch({
  executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  headless: true,
  pipe: true,
});
try {
  const page = await browser.newPage();
  await page.setViewport({ width: 800, height: 600, deviceScaleFactor: 1 });
  await page.setContent(
    '<html><body style="margin:0"><div id="v5-baseline" style="width:800px;height:600px"></div></body></html>',
  );
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.addScriptTag({ path: path.resolve("bundles/all/dist/tsparticles.all.bundle.min.js") });
  const results = await page.evaluate(async () => {
    await globalThis.loadAll(globalThis.tsParticles);
    const samples = [];
    const quantile = (v, q) => [...v].sort((a, b) => a - b)[Math.floor((v.length - 1) * q)];
    const summarize = (v) => ({
      samples: v.length,
      median: quantile(v, 0.5),
      p95: quantile(v, 0.95),
      min: Math.min(...v),
      max: Math.max(...v),
    });
    const variants = {
      M3: {},
      M4: { links: { enable: true, distance: 80 }, collisions: { enable: true, mode: "bounce" } },
      M5: { collisions: { enable: true, mode: "fluid" } },
      M6: { groups: { a: { number: { value: 0 } } } },
      M7: { zIndex: { value: { min: 0, max: 100 } } },
      M8: {},
    };
    for (const [scenario, variant] of Object.entries(variants)) {
      for (const count of [100, 500, 1000]) {
        for (let repetition = 0; repetition < 3; repetition++) {
          let seed = 123456789,
            randomCalls = 0;
          const rng = () => {
            randomCalls++;
            seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
            return seed / 4294967296;
          };
          globalThis.__tsParticlesInternals.engine.setRandom(rng);
          const options = {
            autoPlay: false,
            fullScreen: false,
            detectRetina: false,
            fpsLimit: 60,
            particles: {
              number: { value: count, density: { enable: false } },
              paint: { fill: { color: { value: "#ff0000" } } },
              shape: { type: "circle" },
              size: { value: 3 },
              opacity: { value: 1 },
              move: { enable: true, speed: 1 },
              ...variant,
            },
          };
          if (scenario === "M8") options.backgroundMask = { enable: true, cover: { color: "#101020", opacity: 1 } };
          const begin = performance.now();
          const container = await tsParticles.load({ id: "v5-baseline", options });
          if (!container) throw new Error("No baseline container");
          const initializationMs = performance.now() - begin;
          if (container.particles.count !== count)
            throw new Error(`Count mismatch: ${container.particles.count} != ${count}`);
          const delta = { value: 1000 / 60, factor: 1 },
            update = [],
            draw = [];
          const actualUpdate = container.particles.update.bind(container.particles);
          let lastUpdate = 0;
          container.particles.update = (d) => {
            const t = performance.now();
            actualUpdate(d);
            lastUpdate = performance.now() - t;
          };
          for (let tick = 0; tick < 90; tick++) {
            const t = performance.now();
            container.canvas.render.drawParticles(delta);
            const total = performance.now() - t;
            if (tick >= 30) {
              update.push(lastUpdate);
              draw.push(total - lastUpdate);
            }
          }
          let churnMs = null;
          if (scenario === "M6") {
            const t = performance.now();
            for (let i = 0; i < 10; i++) {
              container.particles.removeQuantity(10);
              container.particles.push(10);
            }
            churnMs = performance.now() - t;
          }
          const beforeDestroy = performance.now();
          container.destroy();
          samples.push({
            scenario,
            count,
            repetition,
            initializationMs,
            updateMs: summarize(update),
            renderExcludingUpdateMs: summarize(draw),
            churnMs,
            teardownMs: performance.now() - beforeDestroy,
            randomCalls,
            remainingContainers: tsParticles.items.length,
          });
        }
      }
    }
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d", { colorSpace: "display-p3", colorType: "float16" });
    return {
      samples,
      capabilities: {
        devicePixelRatio,
        contextAttributes: context?.getContextAttributes(),
        offscreenCanvas: typeof OffscreenCanvas !== "undefined",
      },
      limitations: [
        "M6 covers manual churn; emitter/absorber and retention profiling pending",
        "M8 covers background mask; HDR/layers/resize and visual reference fixtures pending",
        "M9 unavailable through public factory at baseline",
        "Headless timings are CPU submission timings, not GPU completion or visible-display parity",
        "GC, cold/warm network and heap retention not measured",
      ],
    };
  });
  await page.evaluate(async () => {
    const container = await tsParticles.load({
      id: "v5-baseline",
      options: {
        autoPlay: false,
        fullScreen: false,
        background: { color: "#101020" },
        particles: {
          number: { value: 100, density: { enable: false } },
          paint: { fill: { color: { value: ["#ff0000", "#00ff00", "#0000ff", "hsl(60, 100%, 50%)"] } } },
          shape: { type: "circle" },
          size: { value: 5 },
          move: { enable: false },
        },
      },
    });
    container.canvas.render.drawParticles({ value: 1000 / 60, factor: 1 });
  });
  await page.screenshot({ path: path.join(output, "color-reference.png") });
  await writeFile(
    path.join(output, "runtime.json"),
    JSON.stringify(
      {
        revision: execFileSync("git", ["rev-parse", "HEAD"], { encoding: "utf8" }).trim(),
        browser: await browser.version(),
        viewport: { width: 800, height: 600, devicePixelRatio: 1 },
        seed: 123456789,
        warmupTicks: 30,
        measuredTicks: 60,
        repetitions: 3,
        errors,
        ...results,
      },
      null,
      2,
    ) + "\n",
  );
  console.log(JSON.stringify({ runs: results.samples.length, errors, capabilities: results.capabilities }));
} finally {
  await browser.close();
}
