import assert from "node:assert/strict";
import puppeteer from "puppeteer";
import { writeFile } from "node:fs/promises";
import path from "node:path";

const browser = await puppeteer.launch({
  executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  headless: true,
  pipe: true,
});
try {
  const page = await browser.newPage(), errors = [];
  page.on("pageerror", error => errors.push(error.message));
  await page.setContent('<canvas id="a" width="300" height="150"></canvas><canvas id="b" width="300" height="150"></canvas>');
  await page.addScriptTag({ path: path.resolve("bundles/basic/dist/tsparticles.basic.bundle.min.js") });
  await page.evaluate(async () => {
    globalThis.firstFactory = tsParticles.createEngine;
    globalThis.firstEngine = firstFactory();
    await loadBasic(firstEngine);
  });
  await page.addScriptTag({ path: path.resolve("bundles/slim/dist/tsparticles.slim.bundle.min.js") });
  const result = await page.evaluate(async () => {
    const second = tsParticles.createEngine();
    await loadSlim(second);
    const options = { autoPlay: false, fullScreen: false, particles: { number: { value: 5 }, size: { value: 3 } } };
    const canvasA = document.getElementById("a"), canvasB = document.getElementById("b");
    const a = await firstEngine.load({ id: "scene", element: canvasA, options });
    const b = await second.load({ id: "scene", element: canvasB, options });
    let rejected = false;
    try { await second.load({ id: "conflict", element: canvasA, options }); } catch { rejected = true; }
    const renderCanvas = a.canvas.renderCanvas;
    a.destroy();
    const bAliveAfterDestroyA = !b.destroyed && second.items.includes(b);
    const replacement = await second.load({ id: "replacement", element: canvasA, options });
    const reusedTransfer = replacement.canvas.renderCanvas === renderCanvas;
    const counts = [b.particles.count, replacement.particles.count];
    await replacement.refresh();
    const bAliveAfterRefresh = !b.destroyed;
    replacement.destroy(); b.destroy();
    return { distinctFactories: firstFactory !== tsParticles.createEngine, distinctEngines: firstEngine !== second,
      rejected, reusedTransfer, bAliveAfterDestroyA, bAliveAfterRefresh, counts,
      remaining: [firstEngine.items.length, second.items.length] };
  });
  assert.deepEqual(errors, []);
  for (const key of ["distinctFactories", "distinctEngines", "rejected", "reusedTransfer", "bAliveAfterDestroyA", "bAliveAfterRefresh"]) assert.equal(result[key], true, key);
  assert.deepEqual(result.counts, [5, 5]);
  assert.deepEqual(result.remaining, [0, 0]);
  const convenience = [];
  for (const name of ["confetti", "fireworks", "particles", "ribbons"]) {
    const tab = await browser.newPage();
    tab.on("pageerror", error => errors.push(error.message));
    await tab.setContent("<body></body>");
    await tab.addScriptTag({ path: path.resolve(`bundles/${name}/dist/tsparticles.${name}.bundle.min.js`) });
    await tab.addScriptTag({ path: path.resolve("shapes/emoji/dist/tsparticles.shape.emoji.min.js") });
    const probe = await tab.evaluate(async name => {
      const a = tsParticles.createEngine(), b = tsParticles.createEngine();
      const factory = tsParticles[`create${name[0].toUpperCase()}${name.slice(1)}`];
      const effectA = factory(a), effectB = factory(b);
      await Promise.all([effectA.init(), effectB.init(), loadEmojiShape(a)]);
      return { name, independent: a !== b && a.pluginManager !== b.pluginManager && effectA !== effectB,
        containers: [a.items.length, b.items.length] };
    }, name);
    assert.equal(probe.independent, true);
    assert.deepEqual(probe.containers, [0, 0]);
    convenience.push(probe);
    await tab.close();
  }
  assert.deepEqual(errors, []);
  await writeFile(".planning/handovers/evidence/e1/factory-browser.json", JSON.stringify({ date: new Date().toISOString(), browser: await browser.version(), result, convenience, errors }, null, 2) + "\n");
  console.log(JSON.stringify(result));
} finally { await browser.close(); }
