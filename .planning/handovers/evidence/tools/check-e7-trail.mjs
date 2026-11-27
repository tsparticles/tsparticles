import assert from "node:assert/strict";
import { readFile, writeFile } from "node:fs/promises";
import { gunzipSync } from "node:zlib";
import puppeteer from "puppeteer";
const [file, output] = process.argv.slice(2),
  bytes = await readFile(file),
  source = (file.endsWith(".gz") ? gunzipSync(bytes) : bytes).toString();
const browser = await puppeteer.launch({
  executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  headless: true,
  pipe: true,
});
try {
  const page = await browser.newPage(),
    logs = [];
  page.on("console", (m) => logs.push(m.text()));
  await page.setContent('<canvas id="trail" style="width:100px;height:100px"></canvas>');
  await page.addScriptTag({ content: source });
  const report = await page.evaluate(async () => {
    const e = tsParticles.createEngine();
    await loadAll(e);
    const c = await e.load({
      id: "trail",
      element: document.querySelector("canvas"),
      options: {
        autoPlay: false,
        fullScreen: false,
        detectRetina: false,
        trail: { enable: true, length: 10, fill: { color: "#102030" } },
        particles: { number: { value: 10 }, size: { value: 3 }, paint: { fill: { color: "#ff0000" } } },
      },
    });
    const trail = c.actualOptions.trail,
      hooks = c.plugins
        .filter((p) => p.canvasClear)
        .map((p) => ({ name: p.constructor.name, handled: p.canvasClear() })),
      handled = c.canvas.render.clear();
    c.destroy();
    return { trail, hooks, clearHandled: !!handled, remaining: e.items.length };
  });
  await writeFile(output, JSON.stringify({ browser: await browser.version(), report, logs }, null, 2) + "\n");
  console.log(JSON.stringify({ report, logs }));
  assert.equal(report.clearHandled, true, "configured trail handles canvas clearing");
} finally {
  await browser.close();
}
