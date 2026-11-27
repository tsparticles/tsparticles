import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { writeFile } from "node:fs/promises";

const require = createRequire(new URL("../../../../utils/tests/package.json", import.meta.url)),
  { createCanvas } = require("@napi-rs/canvas"),
  { JSDOM } = require("jsdom"),
  counts = [0, 100, 500, 1000, 2000],
  repetitions = 5,
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

const { loadAll } = require("@tsparticles/all"),
  { createEngine } = require("@tsparticles/engine");

function makeCanvas(width, height) {
  return new globalThis.OffscreenCanvas(width, height);
}

function collect() {
  for (let i = 0; i < 3; i++) {
    globalThis.gc();
  }

  return process.memoryUsage().heapUsed;
}

async function measure(count, repetition) {
  const engine = createEngine();

  await loadAll(engine);

  const empty = await engine.load({
      id: `e5-heap-empty-${repetition}`,
      options: { autoPlay: false, detectRetina: false, particles: { number: { value: 0 } } },
      element: makeCanvas(800, 600),
    }),
    emptyHeap = collect();

  empty?.destroy();
  collect();

  const container = await engine.load({
    id: `e5-heap-${count}-${repetition}`,
    options: {
      autoPlay: false,
      detectRetina: false,
      particles: {
        move: { enable: true, speed: 1 },
        number: { value: count, density: { enable: false } },
        paint: { fill: { color: { value: "#ff0000" } } },
        shape: { type: "circle" },
        size: { value: 3 },
      },
    },
    element: makeCanvas(800, 600),
  });

  assert.equal(container?.particles.count, count);

  const particleHeap = collect();

  container?.destroy();
  for (const item of engine.items) {
    item.destroy();
  }

  return { count, emptyHeapBytes: emptyHeap, retainedHeapBytes: particleHeap, deltaBytes: particleHeap - emptyHeap };
}

const samples = [];

for (let repetition = 0; repetition < repetitions; repetition++) {
  for (const count of counts) {
    samples.push(await measure(count, repetition));
  }
}

const summary = counts.map((count) => {
  const values = samples
    .filter((sample) => sample.count === count)
    .map((sample) => sample.deltaBytes)
    .sort((a, b) => a - b);

  return {
    count,
    heapDeltaMedianBytes: values[Math.floor(values.length / 2)],
    samplesBytes: values,
    estimatedBytesPerParticle: count > 0 ? Math.round(values[Math.floor(values.length / 2)] / count) : null,
  };
});

const result = {
  measuredAt: new Date().toISOString(),
  node: process.version,
  runtime: "Node + jsdom + @napi-rs/canvas; not comparable to Chrome/CDP measurements",
  scenario: "M3 minimal moving circle, all workspace extensions registered",
  repetitions,
  forcedGc: true,
  counts,
  summary,
  samples,
  limitations: [
    "Heap deltas include per-container and renderer objects; the empty-container baseline reduces but does not eliminate that overhead.",
    "This estimates retained JavaScript heap, not allocation volume, native canvas memory, or browser-engine overhead.",
    "Use as a same-runtime per-particle estimate only; do not compare directly with Chrome or E0 browser values.",
  ],
};

await writeFile(".planning/handovers/evidence/e5/node-particle-heap.json", JSON.stringify(result, null, 2) + "\n");
console.log(JSON.stringify({ measuredAt: result.measuredAt, node: result.node, summary }, null, 2));
