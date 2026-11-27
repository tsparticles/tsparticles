import puppeteer from "puppeteer";
import path from "node:path";
import assert from "node:assert/strict";
import { writeFile } from "node:fs/promises";
const out = path.resolve(".planning/handovers/evidence/e0");
const browser = await puppeteer.launch({
  executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  headless: true,
  pipe: true,
});
try {
  const page = await browser.newPage();
  await page.setViewport({ width: 800, height: 600, deviceScaleFactor: 1 });
  await page.setContent('<body style="margin:0;background:#222;font:14px sans-serif;color:white"></body>');
  await page.addScriptTag({ path: path.resolve("bundles/all/dist/tsparticles.all.bundle.min.js") });
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  const rows = await page.evaluate(async () => {
    await loadAll(tsParticles);
    const rows = [];
    const match = window.matchMedia.bind(window);
    const fixtures = [
      { name: "hex", value: "#ff0000" },
      { name: "HSL", value: "hsl(120, 100%, 50%)" },
      { name: "RGB", value: "rgb(0, 0, 255)" },
      { name: "OKLCH in gamut", value: "oklch(0.7 0.1 40)" },
      { name: "OKLCH wide", value: "oklch(0.7 0.4 140)" },
      { name: "RGBA .5", value: "rgba(255, 0, 0, 0.5)" },
      { name: "OKLCH alpha", value: "oklch(0.7 0.1 40 / 0.5)" },
      { name: "fill opacity .5", value: "#ff0000", opacity: 0.5 },
    ];
    for (const mode of ["SDR", "HDR requested / detected", "HDR forced capability"]) {
      // Force only capability detection for the third row, retaining real browser contexts.
      window.matchMedia = (query) => {
        const mql = match(query);
        if (mode === "HDR forced capability" && ["(color-gamut: p3)", "(dynamic-range: high)"].includes(query))
          Object.defineProperty(mql, "matches", { value: true });
        return mql;
      };
      const title = document.createElement("div");
      title.textContent = mode + " — hex / HSL / RGB / OKLCH / wide / RGBA / OKLCH alpha / fill opacity";
      title.style.height = "30px";
      document.body.append(title);
      const host = document.createElement("div");
      host.id = "colors-" + rows.length;
      host.style.cssText = "width:800px;height:150px";
      document.body.append(host);
      const c = await tsParticles.load({
        id: host.id,
        options: {
          autoPlay: false,
          fullScreen: false,
          detectRetina: false,
          hdr: { enable: mode !== "SDR", mode: "standard", peakNits: 400 },
          background: { color: "#fff" },
          particles: {
            number: { value: 0 },
            move: { enable: false },
            size: { value: 25 },
            shape: { type: "circle" },
            paint: { fill: { color: { value: "#fff" } } },
          },
        },
      });
      const particles = fixtures.map((f, i) =>
        c.particles.addParticle(
          { x: 50 + 100 * i, y: 75 },
          { paint: { fill: { color: { value: f.value }, opacity: f.opacity ?? 1 } } },
        ),
      );
      if (particles.some((p) => !p)) throw new Error("Missing fixture particle");
      c.canvas.render.drawParticles({ value: 1000 / 60, factor: 1 });
      let attributes, pixels;
      c.canvas.render.draw((ctx) => {
        attributes = ctx.getContextAttributes();
        pixels = fixtures.map((f, i) => ({
          ...f,
          srgbPixel: [
            ...ctx.getImageData(50 + 100 * i, 75, 1, 1, { colorSpace: "srgb", pixelFormat: "rgba-unorm8" }).data,
          ],
        }));
      });
      rows.push({ mode, hdr: c.hdr, attributes, pixels, particleColors: particles.map((p) => p.getFillColor()) });
    }
    window.matchMedia = match;
    return rows;
  });
  assert.equal(rows.length, 3);
  assert.equal(errors.length, 0);
  assert.equal(rows[2].attributes.colorSpace, "display-p3");
  assert.equal(rows[2].attributes.colorType, "float16");
  await page.screenshot({ path: path.join(out, "color-matrix.png") });
  await writeFile(
    path.join(out, "color-matrix.json"),
    JSON.stringify(
      {
        browser: await browser.version(),
        rows,
        errors,
        notes: [
          "Baseline observations, not intended v5 output/reference math",
          "Third row forces HDR/P3 media detection only; real float16 Canvas2D renders all particles",
          "Screenshots and sampled pixels are SDR readback, not physical HDR luminance",
          "Color parser alpha and separate fill opacity are intentionally independent fixtures",
        ],
      },
      null,
      2,
    ) + "\n",
  );
  console.log(
    JSON.stringify({ rows: rows.map((x) => ({ mode: x.mode, hdr: x.hdr, attributes: x.attributes })), errors }),
  );
} finally {
  await browser.close();
}
