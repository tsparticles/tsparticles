import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { createRequire } from "node:module";
import { writeFile } from "node:fs/promises";

const require = createRequire(new URL("../../../../utils/tests/package.json", import.meta.url)),
  { createCanvas } = require("@napi-rs/canvas"),
  { JSDOM } = require("jsdom"),
  counts = [100, 500, 1000],
  repetitions = 3,
  warmupTicks = 30,
  measuredTicks = 60,
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
  { createEngine } = require("@tsparticles/engine"),
  scenarios = {
    M3: {},
    M4: { links: { enable: true, distance: 80 }, collisions: { enable: true, mode: "bounce" } },
    M5: { collisions: { enable: true, mode: "fluid" } },
    M7: { zIndex: { value: { min: 0, max: 100 } } },
  },
  delta = { value: 1000 / 60, factor: 1 };

function summarize(values) {
  const sorted = [...values].sort((a, b) => a - b);

  return {
    samples: sorted.length,
    median: sorted[Math.floor(sorted.length * 0.5)],
    p95: sorted[Math.floor((sorted.length - 1) * 0.95)],
    min: sorted[0],
    max: sorted.at(-1),
  };
}

async function measure(scenario, count, repetition) {
  let seed = 123456789,
    randomCalls = 0;
  const engine = createEngine(),
    random = () => {
      randomCalls++;
      seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;

      return seed / 4294967296;
    };

  engine.setRandom(random);
  await loadAll(engine);

  const options = {
    autoPlay: false,
    detectRetina: false,
    fullScreen: false,
    particles: {
      number: { value: count, density: { enable: false } },
      paint: { fill: { color: { value: "#ff0000" } } },
      shape: { type: "circle" },
      size: { value: 3 },
      opacity: { value: 1 },
      move: { enable: true, speed: 1 },
      ...scenarios[scenario],
    },
  };
  const canvas = new OffscreenCanvas(800, 600),
    initStart = performance.now(),
    container = await engine.load({ id: `e5-${scenario}-${count}-${repetition}`, options, element: canvas }),
    initializationMs = performance.now() - initStart;

  assert.equal(container?.particles.count, count);

  const updateTimes = [],
    drawTimes = [],
    update = container.particles.update.bind(container.particles);

  for (let tick = 0; tick < warmupTicks + measuredTicks; tick++) {
    const updateStart = performance.now();

    update(delta);

    const updateMs = performance.now() - updateStart,
      drawStart = performance.now();

    container.canvas.render.drawParticles(delta);

    if (tick >= warmupTicks) {
      updateTimes.push(updateMs);
      drawTimes.push(performance.now() - drawStart);
    }
  }

  container.destroy();
  assert.equal(engine.items.length, 0);

  return {
    scenario,
    count,
    repetition,
    initializationMs,
    updateMs: summarize(updateTimes),
    drawMs: summarize(drawTimes),
    randomCalls,
    remainingContainers: engine.items.length,
  };
}

const samples = [];

for (const scenario of Object.keys(scenarios)) {
  for (const count of counts) {
    for (let repetition = 0; repetition < repetitions; repetition++) {
      samples.push(await measure(scenario, count, repetition));
    }
  }
}

const summary = Object.keys(scenarios).flatMap((scenario) =>
  counts.map((count) => {
    const group = samples.filter((sample) => sample.scenario === scenario && sample.count === count);

    return {
      scenario,
      count,
      initializationMsMedian: summarize(group.map((sample) => sample.initializationMs)).median,
      updateMsMedian: summarize(group.map((sample) => sample.updateMs.median)).median,
      updateMsP95: summarize(group.map((sample) => sample.updateMs.p95)).median,
      drawMsMedian: summarize(group.map((sample) => sample.drawMs.median)).median,
      drawMsP95: summarize(group.map((sample) => sample.drawMs.p95)).median,
      randomCalls: group.map((sample) => sample.randomCalls),
    };
  }),
);

for (const item of summary) {
  assert.equal(new Set(item.randomCalls).size, 1, `${item.scenario}/${item.count} RNG count varied across repetitions`);
}

const result = {
  measuredAt: new Date().toISOString(),
  revision: execFileSync("git", ["rev-parse", "HEAD"], { encoding: "utf8" }).trim(),
  workingTree: true,
  runtime: `Node ${process.version} + jsdom + @napi-rs/canvas`,
  machine: `${process.platform} ${process.arch}`,
  viewport: { width: 800, height: 600 },
  scenarios: Object.keys(scenarios),
  counts,
  repetitions,
  warmupTicks,
  measuredTicks,
  seed: 123456789,
  samples,
  summary,
  limitations: [
    "Node/jsdom timings are same-runtime diagnostic values and are not comparable with Chrome/CDP or visible browser performance.",
    "Draw timing measures @napi-rs/canvas CPU work and does not represent browser GPU submission or display output.",
    "Forced-GC heapUsed includes runtime/plugin/container overhead and does not report allocation volume or native canvas memory.",
    "Use equal random call counts to check deterministic scenario setup; per-frame state equivalence to the E0 browser harness is not asserted.",
  ],
};

await writeFile(".planning/handovers/evidence/e5/node-runtime.json", JSON.stringify(result, null, 2) + "\n");
console.log(JSON.stringify({ measuredAt: result.measuredAt, summary }, null, 2));
