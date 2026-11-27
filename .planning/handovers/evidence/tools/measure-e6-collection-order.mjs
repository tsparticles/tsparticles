import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";
import { stripTypeScriptTypes } from "node:module";
import path from "node:path";
import { performance } from "node:perf_hooks";
import { pathToFileURL } from "node:url";

const sourcePath = "engine/src/Core/Particles/ParticlesManager.ts",
  baseline = await readFile(".planning/handovers/evidence/e6/collection-baseline/ParticlesManager.ts", "utf8"),
  current = await readFile(
    ".planning/handovers/evidence/e6/collection-baseline/ParticlesManager-mutation-cursors.ts",
    "utf8",
  ),
  sortBlock = `    newBucket.push(particle);

    if (newBucket.length >= double) {
      const prev = newBucket[newBucket.length - double];

      if (prev && particle.id < prev.id) {
        newBucket.sort((a, b) => a.id - b.id);
      }
    }`,
  insertionBlock = `    const last = newBucket[newBucket.length - one];

    if (last && particle.id < last.id) {
      let low = minIndex, high = newBucket.length;
      while (low < high) {
        const middle = Math.floor((low + high) / double), current = newBucket[middle];
        if (current && current.id < particle.id) low = middle + one;
        else high = middle;
      }
      newBucket.splice(low, minCount, particle);
    } else {
      newBucket.push(particle);
    }`;

assert.equal(current.split(sortBlock).length, 2);

const dirty = current
    .replace("  #array: Particle[];", "  #array: Particle[];\n  readonly #dirtyBuckets = new Set<number>();")
    .replace("newBucket.sort((a, b) => a.id - b.id);", "this.#dirtyBuckets.add(newBucketIndex);")
    .replace(
      "  #resetBuckets(zLayers: number): void {",
      "  #resetBuckets(zLayers: number): void { this.#dirtyBuckets.clear();",
    )
    .replace(
      "      for (const particle of bucket) {",
      `      if (this.#dirtyBuckets.delete(i)) bucket.sort((a, b) => a.id - b.id);
      for (const particle of bucket) {`,
    ),
  sources = {
    baseline,
    current,
    sortedInsertion: current.replace(sortBlock, insertionBlock),
    dirty,
    production: await readFile(sourcePath, "utf8"),
  },
  variants = {};

async function load(source, instrument = false) {
  let js = stripTypeScriptTypes(
    source.replace(
      "export class ParticlesManager {",
      `export class ParticlesManager {
    e6Seed(particles: Particle[]): void { this.#array = particles; }
  `,
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

  if (instrument)
    js =
      `let sorts = 0; export const sortCount = () => sorts;\n` +
      js.replace(/(\w+)\.sort\(\(a, b\) => a.id - b.id\)/g, "(sorts++, $1.sort((a, b) => a.id - b.id))");

  return import(`data:text/javascript;base64,${Buffer.from(js).toString("base64")}`);
}

for (const [name, source] of Object.entries(sources)) variants[name] = (await load(source)).ParticlesManager;

const delta = { value: 1000 / 60, factor: 1 },
  fixture = (count) =>
    Array.from({ length: count }, (_, id) => {
      const position = { x: (id * 73) % 800, y: (id * 137) % 600, z: id % 100 };

      return {
        id,
        position,
        initialPosition: { ...position },
        destroyed: false,
        spawning: false,
        ignoresResizeRatio: false,
        getPosition: () => position,
        draw: () => undefined,
      };
    }),
  context = () => ({ zLayers: 100, particleUpdaters: Array.from({ length: 20 }, () => ({ update: () => undefined })) }),
  moveDepth = (particles, scenario, frame) => {
    for (const p of particles) {
      p.position.z =
        scenario === "stable"
          ? p.id % 100
          : scenario === "random"
            ? (p.id * 73 + frame * 137) % 100
            : p.id < particles.length / 2
              ? frame % 2
                ? 0
                : 99
              : 99;
    }
  },
  percentile = (values, fraction) => values.toSorted((a, b) => a - b)[Math.floor((values.length - 1) * fraction)],
  results = [];

for (const count of [100, 500, 1000])
  for (const scenario of ["stable", "random", "skewed"]) {
    const particles = fixture(count),
      managers = Object.fromEntries(
        Object.entries(variants).map(([name, Manager]) => {
          const manager = new Manager({}, context());

          manager.e6Seed(particles);

          return [name, manager];
        }),
      ),
      samples = Object.fromEntries(Object.keys(variants).map((name) => [name, []])),
      cycles = scenario === "skewed" ? 8 : 20,
      counters = {};

    for (let repetition = -2; repetition < 9; repetition++) {
      const names = Object.keys(managers);

      if (repetition % 2) names.reverse();

      for (const name of names) {
        const manager = managers[name],
          start = performance.now();

        for (let frame = 0; frame < cycles; frame++) {
          moveDepth(particles, scenario, frame);
          manager.update(delta);
          manager.drawParticles(delta);
        }
        if (repetition >= 0) samples[name].push((performance.now() - start) / cycles);
      }
    }

    for (const [name, source] of Object.entries(sources)) {
      const module = await load(source, true),
        before = module.sortCount(),
        manager = new module.ParticlesManager({}, context()),
        items = fixture(count),
        drawn = [];

      for (const p of items) p.draw = () => drawn.push(p.id);
      manager.e6Seed(items);
      manager.update(delta);

      for (let frame = 0; frame < 5; frame++) {
        moveDepth(items, scenario, frame);
        manager.update(delta);
        drawn.length = 0;
        manager.drawParticles(delta);
        assert.deepEqual(
          drawn,
          items.toSorted((a, b) => b.position.z - a.position.z || a.id - b.id).map((p) => p.id),
        );
      }
      counters[name] = { fullSortsAcrossFiveFramesAndInitialSetup: module.sortCount() - before };
    }

    results.push({
      count,
      scenario,
      cycles,
      samples,
      counters,
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

const groupCounts = [];
for (const count of [1000, 10000]) {
  const particles = Array.from({ length: count }, (_, id) => ({ group: `group-${id % 10}` })),
    operations = {
      filter: () => {
        for (let group = 0; group < 10; group++) {
          const name = `group-${group}`;
          assert.equal(particles.filter((p) => p.group === name).length, count / 10);
        }
      },
      count: () => {
        for (let group = 0; group < 10; group++) {
          const name = `group-${group}`;
          let total = 0;
          for (const p of particles) if (p.group === name) total++;
          assert.equal(total, count / 10);
        }
      },
      aggregate: () => {
        const groups = new Map();
        for (const p of particles) groups.set(p.group, (groups.get(p.group) ?? 0) + 1);
        assert.equal(groups.size, 10);
        for (const total of groups.values()) assert.equal(total, count / 10);
      },
    },
    samples = Object.fromEntries(Object.keys(operations).map((name) => [name, []]));

  for (let repetition = -2; repetition < 15; repetition++) {
    const names = Object.keys(operations);
    if (repetition % 2) names.reverse();
    for (const name of names) {
      const start = performance.now();
      for (let cycle = 0; cycle < 50; cycle++) operations[name]();
      if (repetition >= 0) samples[name].push((performance.now() - start) / 50);
    }
  }
  groupCounts.push({
    count,
    samples,
    medians: Object.fromEntries(Object.entries(samples).map(([name, values]) => [name, percentile(values, 0.5)])),
  });
}

const result = {
  node: process.version,
  sourceHashes: Object.fromEntries(
    Object.entries(sources).map(([name, source]) => [name, createHash("sha256").update(source).digest("hex")]),
  ),
  results,
  groupCounts,
  limitations: [
    "Synthetic manager fixture with 20 inert updaters; times are not browser frame budgets.",
    "Stable/random/skewed depth workloads use identical coordinates and alternate variant order; 2 warmups and 9 samples.",
    "Draw ID order is asserted on five frames per variant and workload; instrumentation is a separate pass.",
    "Aggregate counting assumes no callbacks/group mutation and is not a compatible replacement for public mutable groups.",
    "Diagnostic seeding and counters do not add production APIs.",
  ],
};
await writeFile(
  process.argv[2] ?? ".planning/handovers/evidence/e6/collection-order.json",
  JSON.stringify(result, null, 2) + "\n",
);
console.log(
  JSON.stringify(
    {
      results: results.map(({ count, scenario, summary, counters }) => ({ count, scenario, summary, counters })),
      groupCounts: groupCounts.map(({ count, medians }) => ({ count, medians })),
    },
    null,
    2,
  ),
);
