import { readFile, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import puppeteer from "puppeteer";
const browser = await puppeteer.launch({
  executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  headless: true,
  pipe: true,
});
try {
  for (const [name, path] of process.argv.includes("--neutral-only")
    ? [["neutral-fill", "bundles/all/dist/tsparticles.all.bundle.js"]]
    : [
        ["e4", ".nx/cache/1299484874123005961/bundles/all/dist/tsparticles.all.bundle.js"],
        ["e5", "bundles/all/dist/tsparticles.all.bundle.js"],
      ]) {
    let source = await readFile(path, "utf8");
    if (name === "neutral-fill") {
      const start = source.indexOf("class LinkInstance {"),
        end = source.indexOf("var LinkInstance$1", start);
      if (start < 0 || end < 0) throw new Error("Missing LinkInstance");
      let body = source.slice(start, end);
      body = body.replace(
        "for (const link of links) {",
        'const neutralFill = !trianglesEnabled && !twinkle?.enable && links.every(link => !!link.color); if (neutralFill) { context.save(); context.fillStyle = "transparent"; } try { for (const link of links) {',
      );
      body = body.replace(
        "flushLines();\n            context.globalAlpha = originalAlpha;",
        "flushLines(); } finally { if (neutralFill) { context.restore(); if (currentColorStyle) { context.strokeStyle = currentColorStyle; context.lineWidth = currentWidth; } } else { context.globalAlpha = originalAlpha; } }",
      );
      source = source.slice(0, start) + body + source.slice(end);
    }
    const page = await browser.newPage();
    await page.setViewport({ width: 800, height: 600, deviceScaleFactor: 1 });
    await page.setContent('<div id="cpu" style="width:800px;height:600px"></div>');
    await page.addScriptTag({ content: source });
    await page.evaluate(async () => {
      const engine = tsParticles.createEngine();
      await loadAll(engine);
      let seed = 123456789;
      engine.setRandom(() => (seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0) / 4294967296);
      globalThis.container = await engine.load({
        id: "cpu",
        options: {
          autoPlay: false,
          fullScreen: false,
          detectRetina: false,
          particles: {
            number: { value: 1000, density: { enable: false } },
            shape: { type: "circle" },
            size: { value: 3 },
            paint: { fill: { color: { value: "#f00" } } },
            move: { enable: true, speed: 1 },
            links: { enable: true, distance: 80 },
            collisions: { enable: true, mode: "bounce" },
          },
        },
      });
      const delta = { value: 1000 / 60, factor: 1 };
      for (let i = 0; i < 90; i++) container.canvas.render.drawParticles(delta);
      container.particles.update = () => undefined;
    });
    const cdp = await page.createCDPSession();
    await cdp.send("Profiler.enable");
    await cdp.send("Profiler.setSamplingInterval", { interval: 100 });
    await cdp.send("Profiler.start");
    const ms = await page.evaluate(() => {
      const start = performance.now();
      for (let i = 0; i < 120; i++) container.canvas.render.drawParticles({ value: 1000 / 60, factor: 1 });
      return performance.now() - start;
    });
    const { profile } = await cdp.send("Profiler.stop");
    const lines = source.split("\n"),
      counts = new Map();
    for (const id of profile.samples) counts.set(id, (counts.get(id) ?? 0) + 1);
    const hot = profile.nodes
      .map((node) => ({
        functionName: node.callFrame.functionName,
        line: node.callFrame.lineNumber + 1,
        selfSamples: counts.get(node.id) ?? 0,
        positionTicks: node.positionTicks?.map((tick) => ({ ...tick, source: lines[tick.line - 1]?.trim() })),
      }))
      .sort((a, b) => b.selfSamples - a.selfSamples)
      .slice(0, 25);
    await writeFile(
      `.planning/handovers/evidence/e5/closure/${name}-draw-cpu.json`,
      JSON.stringify(
        {
          browser: await browser.version(),
          bundleSha256: createHash("sha256").update(source).digest("hex"),
          ms,
          hot,
          profile,
          limitations: [
            "Instrumented unminified CPU sampling, frozen M4 geometry after 90 ticks; no update during sampled draw. Not a runtime budget measurement.",
          ],
        },
        null,
        2,
      ) + "\n",
    );
    console.log(name, ms, JSON.stringify(hot.slice(0, 12)));
    await page.close();
  }
} finally {
  await browser.close();
}
