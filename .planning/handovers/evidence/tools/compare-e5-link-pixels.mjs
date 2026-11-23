import assert from "node:assert/strict";
import { readFile, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import { gunzipSync } from "node:zlib";
import puppeteer from "puppeteer";

const sources = [
  {
    name: "before",
    bytes: gunzipSync(await readFile(".planning/handovers/evidence/e5/matched-baseline/e5-final-all.bundle.min.js.gz")),
  },
  {
    name: "after",
    bytes: await readFile(process.env.E5_LINK_AFTER_BUNDLE ?? "bundles/all/dist/tsparticles.all.bundle.min.js"),
  },
];
const browser = await puppeteer.launch({
  executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  headless: true,
  pipe: true,
});
const results = [];
try {
  for (const scenario of ["white-links", "mixed-alpha", "p3-hdr-triangles", "p3-hdr-strokes"]) {
    const runs = [],
      images = [];
    for (const source of sources) {
      const page = await browser.newPage();
      await page.setViewport({ width: 400, height: 300, deviceScaleFactor: 1 });
      await page.setContent('<div id="pixels" style="width:320px;height:240px"></div>');
      await page.addScriptTag({ content: source.bytes.toString("utf8") });
      const result = await page.evaluate(async (scenario) => {
        const engine = tsParticles.createEngine();
        await loadAll(engine);
        let seed = 123456789,
          randomCalls = 0;
        engine.setRandom(() => {
          randomCalls++;
          return (seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0) / 4294967296;
        });
        const hdr = scenario.startsWith("p3-hdr");
        if (hdr) {
          const nativeMatch = matchMedia.bind(window);
          window.matchMedia = (query) => {
            const result = nativeMatch(query);
            if (["(color-gamut: p3)", "(dynamic-range: high)"].includes(query))
              Object.defineProperty(result, "matches", { value: true });
            return result;
          };
        }
        const stats = { strokeStyle: 0, lineWidth: 0, globalAlpha: 0 };
        const prototypes = [
          globalThis.CanvasRenderingContext2D?.prototype,
          globalThis.OffscreenCanvasRenderingContext2D?.prototype,
        ].filter(Boolean);
        for (const prototype of new Set(prototypes))
          for (const property of Object.keys(stats)) {
            const descriptor = Object.getOwnPropertyDescriptor(prototype, property);
            if (!descriptor?.set) continue;
            Object.defineProperty(prototype, property, {
              ...descriptor,
              set(value) {
                stats[property]++;
                Reflect.apply(descriptor.set, this, [value]);
              },
            });
          }
        const container = await engine.load({
          id: "pixels",
          options: {
            autoPlay: false,
            fullScreen: false,
            detectRetina: false,
            hdr: { enable: hdr, mode: "natural", peakNits: 1000 },
            particles: {
              number: { value: 160, density: { enable: false } },
              size: { value: 3 },
              paint: {
                fill: {
                  color: {
                    value:
                      scenario === "white-links"
                        ? "#f00"
                        : [
                            { l: 60, c: 0.18, h: 30, a: 0.5 },
                            { l: 70, c: 0.12, h: 240, a: 0.8 },
                          ],
                  },
                },
              },
              shape: { type: "circle" },
              move: { enable: true, speed: 1 },
              links: {
                enable: true,
                distance: 60,
                color: { value: scenario === "white-links" ? "#fff" : "mid" },
                triangles: { enable: scenario === "p3-hdr-triangles", frequency: 1, opacity: 0.25 },
              },
            },
          },
        });
        const tick = () => container.canvas.render.drawParticles({ value: 1000 / 60, factor: 1 });
        for (let i = 0; i < 30; i++) tick();
        for (const key of Object.keys(stats)) stats[key] = 0;
        for (let i = 0; i < 60; i++) tick();
        let attributes, image;
        container.canvas.render.draw((ctx) => {
          attributes = ctx.getContextAttributes();
          image = ctx.getImageData(0, 0, 320, 240, {
            colorSpace: attributes.colorSpace,
            pixelFormat: attributes.colorType === "float16" ? "rgba-float16" : "rgba-unorm8",
          });
        });
        const bytes = new Uint8Array(image.data.buffer, image.data.byteOffset, image.data.byteLength),
          chunks = [];
        for (let i = 0; i < bytes.length; i += 8192) chunks.push(String.fromCharCode(...bytes.subarray(i, i + 8192)));
        const geometry = Array.from({ length: container.particles.count }, (_, i) => {
          const p = container.particles.get(i);
          return [p.position.x, p.position.y, p.velocity.x, p.velocity.y, p.links?.length ?? 0];
        });
        container.destroy();
        return {
          stats,
          attributes,
          randomCalls,
          geometry,
          base64: btoa(chunks.join("")),
          remaining: engine.items.length,
        };
      }, scenario);
      const bytes = Buffer.from(result.base64, "base64");
      delete result.base64;
      images.push(bytes);
      runs.push({
        name: source.name,
        bundleSha256: createHash("sha256").update(source.bytes).digest("hex"),
        pixelSha256: createHash("sha256").update(bytes).digest("hex"),
        geometrySha256: createHash("sha256").update(JSON.stringify(result.geometry)).digest("hex"),
        stats: result.stats,
        attributes: result.attributes,
        randomCalls: result.randomCalls,
        remaining: result.remaining,
      });
      await page.close();
    }
    const arrays = runs.map((run, index) =>
      run.attributes.colorType === "float16"
        ? new Float16Array(images[index].buffer, images[index].byteOffset, images[index].byteLength / 2)
        : images[index],
    );
    const maxDifference = [0, 0, 0, 0],
      maxPremultipliedDifference = [0, 0, 0],
      maxVisibleDifference = [0, 0, 0];
    const alphaScale = runs[0].attributes.colorType === "float16" ? 1 : 255;
    let changedChannels = 0,
      changedPixels = 0;
    for (let i = 0; i < arrays[0].length; i += 4) {
      let changed = false;
      for (let c = 0; c < 4; c++) {
        const difference = Math.abs(arrays[0][i + c] - arrays[1][i + c]);
        maxDifference[c] = Math.max(maxDifference[c], difference);
        if (c < 3) {
          maxPremultipliedDifference[c] = Math.max(
            maxPremultipliedDifference[c],
            Math.abs(
              (arrays[0][i + c] * arrays[0][i + 3]) / alphaScale - (arrays[1][i + c] * arrays[1][i + 3]) / alphaScale,
            ),
          );
          if (Math.min(arrays[0][i + 3], arrays[1][i + 3]) / alphaScale >= 0.25)
            maxVisibleDifference[c] = Math.max(maxVisibleDifference[c], difference);
        }
        if (difference) {
          changedChannels++;
          changed = true;
        }
      }
      if (changed) changedPixels++;
    }
    results.push({
      scenario,
      runs,
      pixelDifference: {
        maxDifference,
        maxPremultipliedDifference,
        maxVisibleDifference,
        changedChannels,
        changedPixels,
        totalPixels: arrays[0].length / 4,
        units: runs[0].attributes.colorType === "float16" ? "normalized float" : "unorm8 channel steps",
      },
    });
  }
  await writeFile(
    process.env.E5_LINK_OUTPUT ?? ".planning/handovers/evidence/e5/closure/link-pixels.json",
    JSON.stringify(
      { browser: await browser.version(), reportOnly: !!process.env.E5_LINK_REPORT_ONLY, results },
      null,
      2,
    ) + "\n",
  );
  for (const {
    scenario,
    runs: [before, after],
  } of results) {
    if (!process.env.E5_LINK_REPORT_ONLY)
      assert.equal(after.pixelSha256, before.pixelSha256, `${scenario} pixels changed`);
    assert.equal(after.geometrySha256, before.geometrySha256, `${scenario} scene changed`);
    assert.equal(after.randomCalls, before.randomCalls);
    assert.equal(after.remaining, 0);
    assert.ok(after.stats.lineWidth < before.stats.lineWidth, `${scenario} redundant width writes remain`);
    if (scenario === "white-links") assert.ok(after.stats.strokeStyle < before.stats.strokeStyle);
    if (scenario === "p3-hdr-triangles") assert.equal(after.attributes.colorType, "float16");
  }
  console.log(JSON.stringify(results, null, 2));
} finally {
  await browser.close();
}
