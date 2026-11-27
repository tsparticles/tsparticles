import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";
import { createRequire, stripTypeScriptTypes } from "node:module";
import path from "node:path";
import { performance } from "node:perf_hooks";
import { pathToFileURL } from "node:url";
import { brotliCompressSync, gzipSync } from "node:zlib";

const sourcePath = "engine/src/Core/Particles/ParticlesManager.ts",
  sources = {
    baseline: await readFile(".planning/handovers/evidence/e6/baseline/ParticlesManager.ts", "utf8"),
    reusable: await readFile(".planning/handovers/evidence/e6/collection-baseline/ParticlesManager.ts", "utf8"),
  },
  require = createRequire(path.resolve("cli/utils/rollup-plugin/package.json")),
  { minify } = createRequire(require.resolve("@rollup/plugin-terser"))("terser"),
  variants = {},
  sizes = {};

async function load(source, instrument = false) {
  let js = stripTypeScriptTypes(
    source.replace(
      "export class ParticlesManager {",
      `export class ParticlesManager {
    e6Seed(particles: Particle[]): void { this.#array = particles; }
  `,
    ),
  );

  js = js.replace(/from "(\.[^"]+)"/g, (_, specifier) => {
    const imported = path.resolve(path.dirname(sourcePath), specifier).replace("/engine/src/", "/engine/dist/esm/");

    return `from ${JSON.stringify(pathToFileURL(imported).href)}`;
  });

  if (instrument) {
    js =
      `let created = 0; class E6Set extends Set { constructor(...args) { super(...args); created++; } }
      export const countCreatedSets = () => created;\n` + js.replaceAll("new Set", "new E6Set");
  }

  return import(`data:text/javascript;base64,${Buffer.from(js).toString("base64")}`);
}

const container = () => ({ zLayers: 1, particleUpdaters: [] }),
  delta = { value: 1000 / 60, factor: 1 },
  createdSets = {};

for (const [name, source] of Object.entries(sources)) {
  variants[name] = (await load(source)).ParticlesManager;

  const { ParticlesManager, countCreatedSets } = await load(source, true),
    manager = new ParticlesManager({}, container()),
    frames = 20_000;

  for (let frame = 0; frame < frames; frame++) manager.update(delta);
  createdSets[name] = { frames, created: countCreatedSets() };

  const { code } = await minify(stripTypeScriptTypes(source), { module: true, compress: true, mangle: true });

  sizes[name] = {
    sha256: createHash("sha256").update(source).digest("hex"),
    min: Buffer.byteLength(code),
    gzip: gzipSync(code).length,
    brotli: brotliCompressSync(code).length,
  };
}

assert.equal(createdSets.baseline.created, 20_000);
assert.equal(createdSets.reusable.created, 1);

const percentile = (values, fraction) => values.toSorted((a, b) => a - b)[Math.floor((values.length - 1) * fraction)],
  scenarios = [];

for (const count of [0, 500, 1_000, 10_000]) {
  const particles = Array.from({ length: count }, (_, id) => {
      const position = { x: ((id * 73) % 4096) - 2048, y: ((id * 137) % 4096) - 2048, z: 0 };

      return {
        id,
        position,
        initialPosition: { ...position },
        ignoresResizeRatio: false,
        destroyed: false,
        spawning: false,
        getPosition: () => position,
      };
    }),
    managers = Object.fromEntries(
      Object.entries(variants).map(([name, Manager]) => {
        const manager = new Manager({}, container());

        manager.e6Seed(particles);

        return [name, manager];
      }),
    ),
    cycles = count === 0 ? 20_000 : count === 10_000 ? 30 : 100,
    samples = { baseline: [], reusable: [] };

  for (let repetition = -3; repetition < 21; repetition++) {
    const names = Object.keys(managers);

    if (repetition % 2) names.reverse();

    for (const name of names) {
      const manager = managers[name],
        started = performance.now();

      for (let cycle = 0; cycle < cycles; cycle++) manager.update(delta);
      if (repetition >= 0) samples[name].push((performance.now() - started) / cycles);
      assert.equal(manager.count, count);
    }
  }

  scenarios.push({
    count,
    cycles,
    samples,
    summary: Object.fromEntries(
      Object.entries(samples).map(([name, values]) => [
        name,
        {
          median: percentile(values, 0.5),
          p95: percentile(values, 0.95),
          min: Math.min(...values),
          max: Math.max(...values),
        },
      ]),
    ),
  });
}

const heap = {};

if (global.gc) {
  for (const [name, Manager] of Object.entries(variants)) {
    const values = [];

    for (let repetition = 0; repetition < 5; repetition++) {
      global.gc();
      const before = process.memoryUsage().heapUsed,
        managers = Array.from({ length: 2_000 }, () => new Manager({}, container()));

      global.gc();
      values.push((process.memoryUsage().heapUsed - before) / managers.length);
      managers.length = 0;
    }
    heap[name] = { bytesPerManager: values, median: percentile(values, 0.5) };
  }
}

const result = {
  node: process.version,
  createdSets,
  sizes,
  scenarios,
  heap,
  limitations: [
    "Synthetic manager fixture seeds private arrays only in the diagnostic; no public API is added.",
    "No plugins, real Particle initialization or draw work; timing is not browser scene acceptance.",
    "The common current compiled grid is used by both variants, so this isolates the removal-buffer change.",
    "Set creation counts use a local instrumented subclass in a separate pass; timed variants are uninstrumented.",
    "Heap measures manager fixtures, not production particle retention; sizes cover an isolated module.",
  ],
};

await writeFile(
  process.argv[2] ?? ".planning/handovers/evidence/e6/removals.json",
  JSON.stringify(result, null, 2) + "\n",
);
console.log(
  JSON.stringify(
    { createdSets, sizes, scenarios: scenarios.map(({ count, summary }) => ({ count, summary })), heap },
    null,
    2,
  ),
);
