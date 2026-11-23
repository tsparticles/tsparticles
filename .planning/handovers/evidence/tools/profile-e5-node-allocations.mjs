import assert from "node:assert/strict";
import inspector from "node:inspector";
import { execFileSync } from "node:child_process";
import { createRequire } from "node:module";
import { writeFile } from "node:fs/promises";

const require = createRequire(new URL("../../../../utils/tests/package.json", import.meta.url)),
  { createCanvas } = require("@napi-rs/canvas"),
  { JSDOM } = require("jsdom"),
  counts = [100, 500, 1000],
  scenarios = {
    M3: {},
    M4: { links: { enable: true, distance: 80 }, collisions: { enable: true, mode: "bounce" } },
    M5: { collisions: { enable: true, mode: "fluid" } },
    M7: { zIndex: { value: { min: 0, max: 100 } } },
  },
  repetitions = 3,
  warmupTicks = 30,
  measuredTicks = 60,
  session = new inspector.Session(),
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

session.connect();

const { loadAll } = require("@tsparticles/all"),
  { createEngine } = require("@tsparticles/engine"),
  delta = { value: 1000 / 60, factor: 1 };

function post(method, params = {}) {
  return new Promise((resolve, reject) => {
    session.post(method, params, (error, result) => (error ? reject(error) : resolve(result)));
  });
}

async function samplePhase(run) {
  globalThis.gc();
  await post("HeapProfiler.startSampling", { samplingInterval: 512 });
  run();
  const { profile } = await post("HeapProfiler.stopSampling"),
    sizes = profile.samples.map((sample) => sample.size),
    sampledBytes = sizes.reduce((total, size) => total + size, 0);

  return { sampledBytes, sampleRecords: sizes.length, sampledBytesPerTick: sampledBytes / measuredTicks };
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
  const container = await engine.load({
    id: `e5-allocation-${scenario}-${count}-${repetition}`,
    options,
    element: new OffscreenCanvas(800, 600),
  });

  assert.equal(container?.particles.count, count);

  for (let tick = 0; tick < warmupTicks; tick++) {
    container.particles.update(delta);
    container.canvas.render.drawParticles(delta);
  }

  const update = container.particles.update.bind(container.particles),
    updateProfile = await samplePhase(() => {
      for (let tick = 0; tick < measuredTicks; tick++) update(delta);
    }),
    drawProfile = await samplePhase(() => {
      for (let tick = 0; tick < measuredTicks; tick++) container.canvas.render.drawParticles(delta);
    });

  container.destroy();
  assert.equal(engine.items.length, 0);

  return {
    scenario,
    count,
    repetition,
    updateProfile,
    drawProfile,
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
    const group = samples.filter((sample) => sample.scenario === scenario && sample.count === count),
      middle = (values) => [...values].sort((a, b) => a - b)[Math.floor(values.length / 2)];

    return {
      scenario,
      count,
      updateSampledBytesPerTickMedian: middle(group.map((sample) => sample.updateProfile.sampledBytesPerTick)),
      updateSampleRecordsPerTickMedian: middle(
        group.map((sample) => sample.updateProfile.sampleRecords / measuredTicks),
      ),
      drawSampledBytesPerTickMedian: middle(group.map((sample) => sample.drawProfile.sampledBytesPerTick)),
      drawSampleRecordsPerTickMedian: middle(group.map((sample) => sample.drawProfile.sampleRecords / measuredTicks)),
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
  runtime: `Node ${process.version} + V8 allocation sampling + jsdom + @napi-rs/canvas`,
  samplingIntervalBytes: 512,
  scenarios: Object.keys(scenarios),
  counts,
  repetitions,
  warmupTicks,
  measuredTicks,
  seed: 123456789,
  samples,
  summary,
  limitations: [
    "V8 sampling estimates JavaScript heap allocation bytes and counts; it is not an exact allocation trace.",
    "Profiles are same-runtime diagnostics and are not comparable with Chrome/CDP allocation profiles.",
    "Native canvas allocations and GPU work are not represented; sampled tick phases omit initialization and teardown.",
    "The profiler changes timing and profile overhead is excluded from the separate runtime timing report.",
  ],
};

await writeFile(".planning/handovers/evidence/e5/node-allocations.json", JSON.stringify(result, null, 2) + "\n");
console.log(JSON.stringify({ measuredAt: result.measuredAt, summary }, null, 2));
session.disconnect();
