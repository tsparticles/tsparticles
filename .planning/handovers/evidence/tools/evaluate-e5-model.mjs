import assert from "node:assert/strict";
import { readFile, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import puppeteer from "puppeteer";

const original = await readFile("bundles/all/dist/tsparticles.all.bundle.js", "utf8"),
  output = ".planning/handovers/evidence/e5/closure/model-evaluation.json",
  browser = await puppeteer.launch({
    executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    headless: true,
    pipe: true,
  });
const results = [];
try {
  for (const lazy of [false, true]) {
    let source = original.replace(
      "class Particle {",
      "const e5ScratchCreates = { cachedPosition: 0, cachedOpacityData: 0, cachedRotateData: 0, cachedTransform: 0 }; class Particle {",
    );
    assert.notEqual(source, original);
    source = source.replace(
      "exports.createEngine = createEngine;",
      "exports.__e5ScratchCreates = e5ScratchCreates; exports.createEngine = createEngine;",
    );
    if (lazy) {
      for (const [field, expression] of [
        ["cachedPosition", "Vector3d.origin"],
        ["cachedRotateData", "{ sin: 0, cos: 0 }"],
        ["cachedOpacityData", "{ fillOpacity: 1, opacity: 1, strokeOpacity: 1 }"],
        ["cachedTransform", "{ a: 1, b: 0, c: 0, d: 1 }"],
      ]) {
        const declaration = new RegExp(`#${field} = [\\s\\S]*?;`);
        assert.ok(declaration.test(source), `${field} declaration`);
        source = source.replace(declaration, `#${field};`);
        const marker = `this.#${field}.`;
        assert.ok(source.includes(marker), `${field} access`);
        source = source.split(marker).join(`(this.#${field} ??= (e5ScratchCreates.${field}++, ${expression})).`);
      }
    }
    if (!lazy) {
      for (const field of ["cachedPosition", "cachedRotateData", "cachedOpacityData", "cachedTransform"]) {
        source = source.replace(
          new RegExp(`#${field} = ([\\s\\S]*?);`),
          (_, expression) => `#${field} = (e5ScratchCreates.${field}++, ${expression});`,
        );
      }
    }
    const page = await browser.newPage();
    await page.setViewport({ width: 800, height: 600, deviceScaleFactor: 1 });
    await page.setContent('<div id="model" style="width:800px;height:600px"></div>');
    await page.addScriptTag({ content: source });
    await page.evaluate(async () => {
      globalThis.api = __tsParticlesInternals.bundles.all;
      globalThis.engine = api.createEngine();
      await loadAll(engine);
      globalThis.prepare = async (scenario, count) => {
        let seed = 123456789;
        engine.setRandom(() => (seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0) / 4294967296);
        for (const key of Object.keys(api.__e5ScratchCreates)) api.__e5ScratchCreates[key] = 0;
        const start = performance.now();
        globalThis.container = await engine.load({
          id: "model",
          options: {
            autoPlay: false,
            fullScreen: false,
            detectRetina: false,
            ...(scenario === "M6-options"
              ? {
                  emitters: { startCount: 0, rate: { quantity: 0, delay: 1 } },
                  absorbers: { position: { x: 80, y: 80 }, size: { value: 5 }, destroy: false },
                }
              : {}),
            ...(scenario === "M8" ? { backgroundMask: { enable: true, cover: { color: "#101020", opacity: 1 } } } : {}),
            particles: {
              number: { value: count, density: { enable: false } },
              size: { value: 3 },
              shape: { type: "circle" },
              paint: { fill: { color: { value: "#ff0000" } } },
              move: { enable: true, speed: 1 },
            },
          },
        });
        return performance.now() - start;
      };
      globalThis.tick = () => container.canvas.render.drawParticles({ value: 1000 / 60, factor: 1 });
      globalThis.finish = () => {
        container.destroy();
        globalThis.container = undefined;
        globalThis.extra = undefined;
      };
    });
    const cdp = await page.createCDPSession();
    const heap = async () => {
      await cdp.send("HeapProfiler.collectGarbage");
      return (await cdp.send("Runtime.getHeapUsage")).usedSize;
    };
    for (const scenario of ["M3", "M8", "M6-options"])
      for (let repetition = 0; repetition < 3; repetition++) {
        await page.evaluate((scenario) => prepare(scenario, 0), scenario);
        const empty = await heap();
        await page.evaluate(() => finish());
        const initMs = await page.evaluate((scenario) => prepare(scenario, 1000), scenario);
        const loaded = await heap(),
          loadedScratchObjects = await page.evaluate(() => ({ ...api.__e5ScratchCreates }));
        const timing = await page.evaluate(() => {
          const prototype = Object.getPrototypeOf(container.particles.get(0)),
            counts = {},
            originals = {};
          for (const name of [
            "getPosition",
            "getRadius",
            "getOpacity",
            "getRotateData",
            "getTransformData",
            "getFillColor",
            "getStrokeColor",
          ]) {
            originals[name] = prototype[name];
            counts[name] = 0;
            prototype[name] = function (...args) {
              counts[name]++;
              return Reflect.apply(originals[name], this, args);
            };
          }
          const frames = [];
          try {
            for (let i = 0; i < 90; i++) {
              const start = performance.now();
              tick();
              if (i >= 30) frames.push(performance.now() - start);
            }
          } finally {
            for (const [name, method] of Object.entries(originals)) prototype[name] = method;
          }
          return {
            getterCalls: counts,
            frameMedianMs: [...frames].sort((a, b) => a - b)[29],
            geometry: Array.from({ length: 1000 }, (_, i) => {
              const p = container.particles.get(i);
              return [p.position.x, p.position.y, p.velocity.x, p.velocity.y];
            }),
          };
        });
        const warm = await heap(),
          warmScratchObjects = await page.evaluate(() => ({ ...api.__e5ScratchCreates }));
        const probes = await page.evaluate(() => {
          const sample = container.particles.get(0),
            options = sample.options;
          // All candidates live only in this diagnostic; they are never installed on live particles.
          const copy = (value, seen = new Map()) => {
            if (!value || typeof value !== "object") return value;
            if (seen.has(value)) return seen.get(value);
            const out = Array.isArray(value) ? [] : Object.create(Object.getPrototypeOf(value));
            seen.set(value, out);
            for (const key of Object.keys(value)) out[key] = copy(value[key], seen);
            return out;
          };
          const patches = [
              { move: { speed: 2 } },
              { move: { speed: 5 } },
              { move: { speed: 3 } },
              { move: { speed: 4 } },
            ],
            normalizationStart = performance.now(),
            normalized = api.loadParticlesOptions(engine.pluginManager, container, options, ...patches),
            normalizationMs = performance.now() - normalizationStart,
            modes = {
              ownedLoad: () => api.loadParticlesOptions(engine.pluginManager, container, options, ...patches),
              normalizedPrototypeCopy: () => copy(normalized),
              plainStateCopy: () => api.deepExtend({}, normalized),
            },
            optionCandidates = [];
          for (const [name, make] of Object.entries(modes)) {
            const times = [];
            let candidate;
            for (let repeat = 0; repeat < 3; repeat++) {
              const start = performance.now();
              for (let i = 0; i < 500; i++) candidate = make();
              times.push(performance.now() - start);
            }
            const layeredSpeed = candidate.move.speed;
            let loadError;
            try {
              candidate.load({ move: { speed: 9 } });
            } catch (error) {
              loadError = String(error);
            }
            const aliases = candidate.move === options.move || candidate.paint === options.paint;
            optionCandidates.push({
              name,
              median500CopiesMs: times.sort((a, b) => a - b)[1],
              layeredSpeed,
              loadError,
              aliases,
              sourceSpeedAfterMutation: options.move.speed,
            });
          }
          const originalDrift = options.move.drift;
          options.move.drift = 2;
          const refreshed = api.loadParticlesOptions(engine.pluginManager, container, options, ...patches),
            templateStaleAfterMutation = refreshed.move.drift !== normalized.move.drift;
          options.move.drift = originalDrift;
          const plainParticle = { ...sample };
          let privateBrandError;
          try {
            Object.getPrototypeOf(sample).getPosition.call(plainParticle);
          } catch (error) {
            privateBrandError = String(error);
          }
          const phasePosition = { ...sample.getPosition() },
            originalX = sample.position.x;
          sample.position.x += 1;
          const phaseSnapshotStale = phasePosition.x !== sample.getPosition().x;
          sample.position.x = originalX;
          const snapshot = (p) => ({
            version: 1,
            id: p.id,
            x: p.position.x,
            y: p.position.y,
            z: p.position.z,
            vx: p.velocity.x,
            vy: p.velocity.y,
            radius: p.getRadius(),
          });
          const start = performance.now();
          globalThis.extra = Array.from({ length: 1000 }, (_, i) => snapshot(container.particles.get(i)));
          const snapshotMs = performance.now() - start;
          const clone = structuredClone(extra);
          return {
            templateStaleAfterMutation,
            phaseSnapshotStale,
            normalizationMs,
            optionCandidates,
            plainParticle: {
              sharesOptions: plainParticle.options === sample.options,
              sharesVelocity: plainParticle.velocity === sample.velocity,
              hasGetRadius: typeof plainParticle.getRadius === "function",
              privateBrandError,
            },
            snapshotMs,
            snapshotCloneMatches: JSON.stringify(clone) === JSON.stringify(extra),
          };
        });
        const withSnapshot = await heap();
        results.push({
          lazy,
          scenario,
          count: 1000,
          repetition,
          initMs,
          loadedScratchObjects,
          warmScratchObjects,
          loadedBytesPerParticle: (loaded - empty) / 1000,
          warmBytesPerParticle: (warm - empty) / 1000,
          frameMedianMs: timing.frameMedianMs,
          getterCalls: timing.getterCalls,
          geometrySha256: createHash("sha256").update(JSON.stringify(timing.geometry)).digest("hex"),
          snapshotAdditionalBytesPerParticle: (withSnapshot - warm) / 1000,
          probes,
        });
        await page.evaluate(() => finish());
        console.log(`${lazy ? "lazy" : "eager"} ${scenario}/${repetition}`);
      }
    await page.close();
  }
  for (const scenario of ["M3", "M8", "M6-options"]) {
    const group = results.filter((s) => s.scenario === scenario);
    assert.equal(new Set(group.map((s) => s.geometrySha256)).size, 1, `${scenario} geometry changed`);
    for (const sample of group) {
      for (const count of Object.values(sample.warmScratchObjects)) assert.equal(count, 1000);
      const candidates = sample.probes.optionCandidates;
      assert.equal(candidates.find((c) => c.name === "ownedLoad").loadError, undefined);
      for (const candidate of candidates) {
        assert.equal(candidate.layeredSpeed, 4);
        assert.equal(candidate.sourceSpeedAfterMutation, 1);
        assert.equal(candidate.aliases, false);
      }
      assert.ok(candidates.find((c) => c.name === "normalizedPrototypeCopy").loadError?.includes("private"));
      assert.ok(candidates.find((c) => c.name === "plainStateCopy").loadError);
      assert.equal(sample.probes.templateStaleAfterMutation, true);
      assert.equal(sample.probes.phaseSnapshotStale, true);
      assert.equal(sample.probes.plainParticle.hasGetRadius, false);
      assert.equal(sample.probes.plainParticle.sharesOptions, true);
      assert.equal(sample.probes.snapshotCloneMatches, true);
    }
  }
  await writeFile(
    output,
    JSON.stringify(
      {
        measuredAt: new Date().toISOString(),
        browser: await browser.version(),
        bundleSha256: createHash("sha256").update(original).digest("hex"),
        results,
        limitations: [
          "Diagnostic unminified bundle and getter counters perturb timing; compare variants only within this experiment.",
          "Lazy scratch-cache variant is patched in memory only and never shipped.",
          "Prototype/plain options copies cannot preserve arbitrary plugin private brands or loader hooks; their timing is not an admissible production speedup.",
          "Snapshots are inspection-only numeric data, not save/resume, options serialization or a full Particle codec.",
          "Snapshot heap delta includes probe/JIT/diagnostic overhead; it is not an exact object-size measurement.",
        ],
      },
      null,
      2,
    ) + "\n",
  );
} finally {
  await browser.close();
}
