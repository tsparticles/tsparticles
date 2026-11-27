import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";
import { gunzipSync, gzipSync } from "node:zlib";
import puppeteer from "puppeteer";
const [bundlePath, output] = process.argv.slice(2),
  bytes = await readFile(bundlePath),
  source = (bundlePath.endsWith(".gz") ? gunzipSync(bytes) : bytes).toString();
const browser = await puppeteer.launch({
  executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  headless: true,
  pipe: true,
});
try {
  const page = await browser.newPage(),
    errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.setViewport({ width: 800, height: 600, deviceScaleFactor: 1 });
  await page.setContent('<div id="m8" style="width:800px;height:600px"></div>');
  await page.addScriptTag({ content: source });
  const attributes = await page.evaluate(async () => {
    const match = matchMedia.bind(globalThis);
    globalThis.matchMedia = (q) => {
      const m = match(q);
      if (["(color-gamut: p3)", "(dynamic-range: high)"].includes(q))
        Object.defineProperty(m, "matches", { value: true });
      return m;
    };
    const e = tsParticles.createEngine();
    await loadAll(e);
    let seed = 123456789;
    e.setRandom(() => (seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0) / 4294967296);
    globalThis.c = await e.load({
      id: "m8",
      options: {
        autoPlay: false,
        fullScreen: false,
        detectRetina: false,
        hdr: { enable: true },
        background: {
          draw: (ctx) => {
            ctx.fillStyle = "rgba(40,50,60,0.5)";
            ctx.fillRect(0, 0, 80, 60);
          },
        },
        backgroundMask: { enable: true, cover: { color: "#101020", opacity: 0.5 } },
        trail: { enable: true, length: 10, fill: { color: "#102030" } },
        particles: {
          number: { value: 1000, density: { enable: false } },
          shape: { type: "circle" },
          size: { value: 3 },
          paint: { fill: { color: { value: "#ff0000" } } },
          move: { enable: true, speed: 1 },
        },
      },
    });
    c.canvas.setZoom(1.5, { x: 400, y: 300 });
    globalThis.delta = { factor: 1, value: 1000 / 60 };
    for (let i = 0; i < 30; i++) c.canvas.render.drawParticles(delta);
    c.particles.update = () => undefined;
    return c.canvas.render.draw((ctx) => ctx.getContextAttributes());
  });
  const cdp = await page.createCDPSession();
  await cdp.send("Profiler.enable");
  await cdp.send("Profiler.setSamplingInterval", { interval: 100 });
  await cdp.send("Profiler.start");
  const submissionMs = await page.evaluate(() => {
    const start = performance.now();
    for (let i = 0; i < 120; i++) c.canvas.render.drawParticles(delta);
    return performance.now() - start;
  });
  const { profile } = await cdp.send("Profiler.stop");
  const operations = await page.evaluate(() => {
    const counts = {},
      descriptors = [];
    c.canvas.render.draw((ctx) => {
      for (const key of [
        "clearRect",
        "save",
        "restore",
        "setTransform",
        "resetTransform",
        "fillRect",
        "beginPath",
        "fill",
        "stroke",
        "drawImage",
        "translate",
        "scale",
      ]) {
        const original = ctx[key];
        ctx[key] = function (...args) {
          counts[key] = (counts[key] ?? 0) + 1;
          return original.apply(this, args);
        };
      }
      for (const key of ["fillStyle", "strokeStyle", "globalCompositeOperation", "globalAlpha", "lineWidth"]) {
        const descriptor = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(ctx), key);
        if (!descriptor?.set) throw new Error("missing descriptor " + key);
        descriptors.push(key);
        Object.defineProperty(ctx, key, {
          configurable: true,
          get() {
            return descriptor.get.call(this);
          },
          set(value) {
            counts[key] = (counts[key] ?? 0) + 1;
            descriptor.set.call(this, value);
          },
        });
      }
    });
    for (let i = 0; i < 60; i++) c.canvas.render.drawParticles(delta);
    return { frames: 60, particles: 1000, descriptors, counts };
  });
  const count = new Map();
  for (const id of profile.samples ?? []) count.set(id, (count.get(id) ?? 0) + 1);
  const lines = source.split("\n"),
    hot = profile.nodes
      .map((n) => ({
        functionName: n.callFrame.functionName,
        line: n.callFrame.lineNumber + 1,
        selfSamples: count.get(n.id) ?? 0,
        positionTicks: n.positionTicks?.map((t) => ({ ...t, source: lines[t.line - 1]?.trim().slice(0, 500) })),
      }))
      .sort((a, b) => b.selfSamples - a.selfSamples)
      .slice(0, 30);
  await page.evaluate(() => c.destroy());
  assert.deepEqual(errors, []);
  await writeFile(output + ".profile.json.gz", gzipSync(JSON.stringify(profile), { mtime: 0 }));
  await writeFile(
    output,
    JSON.stringify(
      {
        browser: await browser.version(),
        bundleSha256: createHash("sha256").update(source).digest("hex"),
        attributes,
        submissionMs,
        profileFrames: 120,
        operations,
        hot,
        errors,
        limitations: [
          "Instrumented M8 frozen-geometry CPU submission and operation counts; not runtime budget timing.",
          "Style/composite caches must invalidate across external callbacks; draw records are public and may escape.",
          "Source lines are diagnostic only; minified baseline positions have no useful source-line granularity.",
        ],
      },
      null,
      2,
    ) + "\n",
  );
} finally {
  await browser.close();
}
