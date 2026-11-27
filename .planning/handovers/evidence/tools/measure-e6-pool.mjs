import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";
import { createRequire, stripTypeScriptTypes } from "node:module";
import path from "node:path";
import { performance } from "node:perf_hooks";
import { pathToFileURL } from "node:url";

assert.ok(global.gc, "Run with --expose-gc");

const require = createRequire(path.resolve("utils/tests/package.json")),
  { createCanvas } = require("@napi-rs/canvas"),
  { JSDOM } = require("jsdom"),
  window = new JSDOM("").window;

window.SVGPathElement ??= class SVGPathElement extends window.SVGElement {};
globalThis.window = window;
globalThis.document = window.document;
globalThis.HTMLElement = window.HTMLElement;
globalThis.HTMLCanvasElement = window.HTMLCanvasElement;
globalThis.addEventListener = window.addEventListener.bind(window);
globalThis.removeEventListener = window.removeEventListener.bind(window);
globalThis.OffscreenCanvas = class OffscreenCanvas {
  #canvas;
  constructor(width, height) {
    this.#canvas = createCanvas(width, height);
  }
  get width() {
    return this.#canvas.width;
  }
  set width(value) {
    this.#canvas.width = value;
  }
  get height() {
    return this.#canvas.height;
  }
  set height(value) {
    this.#canvas.height = value;
  }
  getContext(type, settings) {
    return this.#canvas.getContext(type, settings);
  }
};

const { createEngine } = await import(pathToFileURL(path.resolve("engine/dist/esm/index.js")).href),
  { loadAll } = await import(pathToFileURL(path.resolve("bundles/all/dist/esm/index.js")).href),
  sourcePath = "engine/src/Core/Particles/ParticlesManager.ts",
  source = await readFile(sourcePath, "utf8");

let js = stripTypeScriptTypes(
  source.replace(
    "export class ParticlesManager {",
    `export class ParticlesManager {
  e6TrimPool(limit: number): void { this.#pool.length = Math.min(this.#pool.length, limit); }
  e6PoolSize(): number { return this.#pool.length; }
}`.slice(0, -1),
  ),
);
js = js.replace(
  /from "(\.[^"]+)"/g,
  (_, specifier) =>
    `from ${JSON.stringify(
      pathToFileURL(path.resolve(path.dirname(sourcePath), specifier).replace("/engine/src/", "/engine/dist/esm/"))
        .href,
    )}`,
);
assert.equal(js.split("new Particle(this.#pluginManager, this.#container)").length, 2);
js =
  `let created = 0; function e6CreateParticle(...args) { created++; return new Particle(...args); }
export const createdParticles = () => created;\n` +
  js.replace(
    "new Particle(this.#pluginManager, this.#container)",
    "e6CreateParticle(this.#pluginManager, this.#container)",
  );

const { ParticlesManager, createdParticles } = await import(
    `data:text/javascript;base64,${Buffer.from(js).toString("base64")}`
  ),
  delta = { value: 1000 / 60, factor: 1 },
  heap = () => {
    global.gc();
    return process.memoryUsage().heapUsed;
  },
  results = [];

async function run(peak, policy, repetition) {
  const engine = createEngine();
  let seed = 123456789;
  engine.setRandom(() => {
    seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
    return seed / 4294967296;
  });
  await loadAll(engine);

  const container = await engine.load({
    id: `e6-pool-${peak}-${policy}-${repetition}`,
    element: new OffscreenCanvas(800, 600),
    options: {
      autoPlay: false,
      detectRetina: false,
      fullScreen: false,
      particles: {
        number: { value: 0, density: { enable: false } },
        shape: { type: "circle" },
        paint: { fill: { color: { value: "#ff0000" } } },
        move: { enable: true, speed: 1 },
      },
    },
  });
  assert.ok(container);
  container.particles.destroy();
  const manager = new ParticlesManager(engine.pluginManager, container);
  container.particles = manager;
  await manager.init();

  const limit = policy === "retain" ? Infinity : policy === "cap256" ? 256 : 0,
    emptyHeap = heap(),
    beforeCreated = createdParticles(),
    firstStart = performance.now();
  manager.push(peak);
  assert.equal(manager.count, peak);
  const firstInitMs = performance.now() - firstStart;
  manager.update(delta);
  container.canvas.render.drawParticles(delta);
  const peakHeap = heap();
  manager.clear();
  manager.e6TrimPool(limit);
  const troughHeap = heap(),
    retainedPool = manager.e6PoolSize(),
    rampStart = performance.now();
  manager.push(peak);
  const rampMs = performance.now() - rampStart,
    firstRampCreated = createdParticles() - beforeCreated - peak;
  assert.equal(firstRampCreated, peak - Math.min(peak, limit));

  const churnMs = [],
    cycles = peak === 5000 ? 3 : 5;
  for (let cycle = 0; cycle < cycles; cycle++) {
    const start = performance.now();
    manager.clear();
    manager.e6TrimPool(limit);
    manager.push(peak);
    manager.update(delta);
    churnMs.push(performance.now() - start);
    assert.equal(manager.count, peak);
  }

  const finalPeakHeap = heap();
  manager.clear();
  manager.e6TrimPool(limit);
  const finalTroughHeap = heap(),
    finalPool = manager.e6PoolSize(),
    totalCreated = createdParticles() - beforeCreated;
  container.destroy();
  assert.equal(engine.items.length, 0);
  assert.equal(manager.e6PoolSize(), 0);
  return {
    peak,
    policy,
    repetition,
    firstInitMs,
    emptyHeap,
    peakHeap,
    troughHeap,
    retainedPool,
    retainedOverEmpty: troughHeap - emptyHeap,
    releasedAtTrough: peakHeap - troughHeap,
    rampMs,
    firstRampCreated,
    cycles,
    churnMs,
    finalPeakHeap,
    finalTroughHeap,
    finalPool,
    totalCreated,
  };
}

try {
  await run(100, "retain", -1);
  for (const peak of [1000, 5000])
    for (let repetition = 0; repetition < 3; repetition++) {
      const policies = repetition % 2 ? ["cap0", "cap256", "retain"] : ["retain", "cap256", "cap0"];
      for (const policy of policies) results.push(await run(peak, policy, repetition));
    }
} finally {
  window.close();
}

const median = (values) => values.toSorted((a, b) => a - b)[Math.floor(values.length / 2)],
  summary = [1000, 5000].flatMap((peak) =>
    ["retain", "cap256", "cap0"].map((policy) => {
      const group = results.filter((row) => row.peak === peak && row.policy === policy);
      return {
        peak,
        policy,
        retainedOverEmpty: median(group.map((row) => row.retainedOverEmpty)),
        releasedAtTrough: median(group.map((row) => row.releasedAtTrough)),
        rampMs: median(group.map((row) => row.rampMs)),
        firstRampCreated: median(group.map((row) => row.firstRampCreated)),
        churnMedianMs: median(group.flatMap((row) => row.churnMs)),
      };
    }),
  ),
  result = {
    node: process.version,
    sourceSha256: createHash("sha256").update(source).digest("hex"),
    results,
    summary,
    limitations: [
      "Real Particle, options and extension instances in Node/jsdom/canvas, not browser timing acceptance.",
      "Pool trimming and constructor counts exist only in this diagnostic; no production cap/API is added.",
      "Heap measures a still-live container after clear and optional trim, with no external strong particle references.",
      "Caps of 0 and 256 are experimental controls, not proposed default policies.",
      "Three repetitions alternate policy order; constructor counts are exact, heap/timings include runtime and plugin overhead.",
    ],
  };

await writeFile(
  process.argv[2] ?? ".planning/handovers/evidence/e6/live-pool.json",
  JSON.stringify(result, null, 2) + "\n",
);
console.log(JSON.stringify(summary, null, 2));
