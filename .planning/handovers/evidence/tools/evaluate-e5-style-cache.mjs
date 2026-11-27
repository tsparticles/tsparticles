import assert from "node:assert/strict";
import { readFile, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import puppeteer from "puppeteer";

const original = await readFile("bundles/all/dist/tsparticles.all.bundle.js", "utf8");
let source = original;
const start = source.indexOf("function getStyleFromOklch("),
  end = source.indexOf("function colorMixOklch(", start);
assert.ok(start > 0 && end > start);
let formatter = source.slice(start, end);
const generatorStart = formatter.indexOf("() => {") + "() => {".length;
assert.ok(generatorStart > 30);
const generatorBody = formatter.slice(generatorStart).split(/\n\s*\}\);/u)[0];
assert.ok(generatorBody.includes("mapOklchToDisplayP3"));
formatter = formatter
  .replace("const alpha =", "e5CacheProbe.calls++;\n        const alpha =")
  .replace("return last.style;", "e5CacheProbe.lastHits++; return last.style;");
source = source.slice(0, start) + formatter + source.slice(end);
source = source.replace(
  "function getCachedStyle(key, generator) {",
  `const e5CacheProbe = { calls: 0, lastHits: 0, mapHits: 0, misses: 0, clears: 0, maxEntries: 0 };
    function getCachedStyle(key, generator) {`,
);
source = source.replace(
  "exports.getStyleFromOklch = getStyleFromOklch;",
  `exports.getStyleFromOklch = getStyleFromOklch;
    const e5Get = styleCache.get.bind(styleCache), e5Set = styleCache.set.bind(styleCache), e5Clear = styleCache.clear.bind(styleCache);
    styleCache.get = key => { const value = e5Get(key); if (value) e5CacheProbe.mapHits++; else e5CacheProbe.misses++; return value; };
    styleCache.set = (key, value) => { e5Set(key, value); e5CacheProbe.maxEntries = Math.max(e5CacheProbe.maxEntries, styleCache.size); return styleCache; };
    styleCache.clear = () => { e5CacheProbe.clears++; e5Clear(); };
    exports.__e5CacheProbe = {
      reset(clear) { for (const key of Object.keys(e5CacheProbe)) e5CacheProbe[key] = 0;
        if (clear) { styleCache.clear(); lastOklchStyle = undefined; hdrCacheMisses = 0; hdrCacheCooldown = 0; }
        e5CacheProbe.maxEntries = styleCache.size;
      },
      stats() { return { ...e5CacheProbe, bypasses: e5CacheProbe.calls - e5CacheProbe.lastHits - e5CacheProbe.mapHits - e5CacheProbe.misses, entries: styleCache.size }; },
      raw(color, hdr, opacity, peakNits, mode, outputColorSpace = "srgb") {
        const alpha = (opacity ?? 1) * ("a" in color ? color.a : 1);
        if (hdr) return getHdrStyleFromRgb(oklchToDisplayP3Float(color), alpha, peakNits, mode);
        ${generatorBody}
      }
    };`,
);
const browser = await puppeteer.launch({
  executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  headless: true,
  pipe: true,
});
try {
  const page = await browser.newPage();
  await page.addScriptTag({ content: source });
  const results = await page.evaluate(() => {
    const api = __tsParticlesInternals.bundles.all,
      probe = api.__e5CacheProbe;
    const cases = [
      { name: "static-srgb", size: 1, hdr: false, space: "srgb" },
      { name: "static-p3", size: 1, hdr: false, space: "display-p3" },
      { name: "static-hdr", size: 1, hdr: true, space: "display-p3" },
      { name: "palette-hdr", size: 32, hdr: true, space: "display-p3" },
      { name: "animated-srgb", size: 8192, hdr: false, space: "srgb" },
      { name: "animated-p3", size: 8192, hdr: false, space: "display-p3" },
      { name: "animated-hdr", size: 8192, hdr: true, space: "display-p3" },
      { name: "changing-hdr-output", size: 1, hdr: true, space: "display-p3", varyOutput: true },
    ];
    return cases.map((test) => {
      const colors = Array.from({ length: test.size }, (_, index) =>
        Object.freeze({ l: 70, c: 0.3, h: test.size === 1 ? 60 : (index * 360) / test.size, a: 0.8 }),
      );
      const args = (index) => [
        colors[index % colors.length],
        test.hdr,
        0.5,
        test.varyOutput && index % 2 ? 1000 : 400,
        test.varyOutput && index % 4 > 1 ? "vivid" : "natural",
        test.space,
      ];
      let mismatches = 0;
      for (let i = 0; i < Math.max(colors.length, 16); i++)
        if (api.getStyleFromOklch(...args(i)) !== probe.raw(...args(i))) mismatches++;
      const measurements = [];
      for (const cached of [false, true])
        for (let repetition = 0; repetition < 3; repetition++) {
          const format = cached ? api.getStyleFromOklch : probe.raw;
          probe.reset(true);
          for (let i = 0; i < 1000; i++) format(...args(i));
          probe.reset(false);
          let checksum = 0;
          const start = performance.now();
          for (let i = 0; i < 16384; i++) {
            const style = format(...args(i));
            checksum += style.length;
          }
          measurements.push({ cached, repetition, ms: performance.now() - start, checksum, stats: probe.stats() });
        }
      return { name: test.name, distinctColors: colors.length, mismatches, measurements };
    });
  });
  for (const result of results) {
    assert.equal(result.mismatches, 0, result.name);
    assert.equal(new Set(result.measurements.map((s) => s.checksum)).size, 1, `${result.name} output parity`);
    for (const sample of result.measurements.filter((s) => s.cached)) {
      assert.equal(sample.stats.calls, 16384);
      assert.equal(
        sample.stats.calls,
        sample.stats.lastHits + sample.stats.mapHits + sample.stats.misses + sample.stats.bypasses,
      );
      assert.ok(sample.stats.maxEntries <= 2000);
    }
  }
  await writeFile(
    ".planning/handovers/evidence/e5/closure/style-cache-evaluation.json",
    JSON.stringify(
      {
        browser: await browser.version(),
        measuredAt: new Date().toISOString(),
        bundleSha256: createHash("sha256").update(original).digest("hex"),
        results,
        limitations: [
          "Instrumented unminified diagnostic; Map/counter wrappers affect timing and favor the uncached reference. It is not the runtime budget benchmark.",
          "Uncached reference executes the exact production generator body without Map/key/last-value machinery.",
          "Cases include frozen shared sources, alpha, P3, 8192 animated colors and changing HDR peak/mode; no new quantization is used.",
        ],
      },
      null,
      2,
    ) + "\n",
  );
  console.log(
    JSON.stringify(
      results.map((result) => ({
        name: result.name,
        rawMs: result.measurements.filter((s) => !s.cached).map((s) => s.ms),
        cachedMs: result.measurements.filter((s) => s.cached).map((s) => s.ms),
        stats: result.measurements.find((s) => s.cached).stats,
      })),
      null,
      2,
    ),
  );
} finally {
  await browser.close();
}
