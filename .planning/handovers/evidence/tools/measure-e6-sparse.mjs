import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";
import { stripTypeScriptTypes } from "node:module";
import path from "node:path";
import { performance } from "node:perf_hooks";
import { pathToFileURL } from "node:url";

const sources = {
    baseline: await readFile(".planning/handovers/evidence/e6/baseline/SpatialHashGrid.ts", "utf8"),
    liveSparse: await readFile("engine/src/Core/Particles/SpatialHashGrid.ts", "utf8"),
  },
  variants = {},
  rangesUrl = pathToFileURL(path.resolve("engine/dist/esm/Core/Particles/Ranges.js")).href;

async function load(source, instrument = false) {
  let js = stripTypeScriptTypes(source).replace('"./Ranges.js"', JSON.stringify(rangesUrl));

  if (instrument) {
    js =
      `let cellLookups = 0, keyVisits = 0; export const counters = () => ({cellLookups, keyVisits});\n` +
      js
        .replace("const cellParticles = this.#cells.get", "cellLookups++; const cellParticles = this.#cells.get")
        .replaceAll("for (const key of this.#cells.keys()) {", "for (const key of this.#cells.keys()) { keyVisits++;");
  }

  return import(`data:text/javascript;base64,${Buffer.from(js).toString("base64")}`);
}

for (const [name, source] of Object.entries(sources)) variants[name] = (await load(source)).SpatialHashGrid;

const scenarios = [],
  percentile = (values, fraction) => values.toSorted((a, b) => a - b)[Math.floor((values.length - 1) * fraction)];

for (const [count, radius] of [
  [1, 10_000],
  [10, 10_000],
  [100, 10_000],
  [1000, 10_000],
  [1, 50_000],
  [10, 50_000],
  [100, 50_000],
]) {
  const particles = Array.from({ length: count }, (_, id) => ({
      id,
      getPosition: () => ({ x: (id % 32) * 64 - 1024, y: Math.floor(id / 32) * 64 - 1024 }),
    })),
    grids = Object.fromEntries(Object.entries(variants).map(([name, Grid]) => [name, new Grid(64)])),
    samples = { baseline: [], liveSparse: [] },
    counters = {};

  for (const grid of Object.values(grids)) for (const particle of particles) grid.insert(particle);

  const query = (grid) => grid.queryCircle({ x: 0, y: 0 }, radius, (particle) => particle.id % 2 === 0),
    expected = query(grids.baseline).map((p) => p.id);

  for (let repetition = -2; repetition < 9; repetition++) {
    const names = Object.keys(grids);

    if (repetition % 2) names.reverse();

    for (const name of names) {
      const start = performance.now(),
        actual = query(grids[name]),
        elapsed = performance.now() - start;

      assert.deepEqual(
        actual.map((p) => p.id),
        expected,
      );
      if (repetition >= 0) samples[name].push(elapsed);
    }
  }

  for (const [name, source] of Object.entries(sources)) {
    const module = await load(source, true),
      grid = new module.SpatialHashGrid(64),
      before = module.counters();

    for (const particle of particles) grid.insert(particle);
    assert.deepEqual(
      query(grid).map((p) => p.id),
      expected,
    );

    const after = module.counters();

    counters[name] = {
      cellLookups: after.cellLookups - before.cellLookups,
      keyVisits: after.keyVisits - before.keyVisits,
    };
  }

  scenarios.push({
    count,
    radius,
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

const huge = await load(sources.liveSparse, true),
  grid = new huge.SpatialHashGrid(64),
  hugeBefore = huge.counters(),
  first = { getPosition: () => ({ x: 0, y: 0 }) },
  future = { getPosition: () => ({ x: 128, y: 0 }) };

grid.insert(first);
assert.deepEqual(
  grid.queryCircle({ x: 0, y: 0 }, 1_000_000, (particle) => {
    if (particle === first) grid.insert(future);

    return true;
  }),
  [first, future],
);

const mutationComparisons = [];

for (let seed = 0; seed < 50; seed++) {
  for (const shape of ["circle", "rectangle"]) {
    const run = (Grid) => {
        const grid = new Grid(64),
          visited = [],
          nested = [],
          particle = (id) => {
            const position = { x: ((id * 73 + seed * 17) % 1024) - 512, y: ((id * 137 + seed * 31) % 1024) - 512 };

            return { id, getPosition: () => position };
          };

        for (const id of [0, 1, 2]) grid.insert(particle(id));

        let calls = 0;
        const check = (p) => {
            calls++;
            visited.push(p.id);
            if (calls <= 4) grid.insert(particle(calls + 2));
            if (calls === 3) {
              grid.cellSize = 32;
              grid.clear();
              for (const id of [10, 11, 12]) grid.insert(particle(id));
            }
            if (calls === 4) nested.push(grid.queryCircle({ x: 0, y: 0 }, 1000).map((item) => item.id));
            if (calls === 5) p.getPosition().x += 2048;

            return calls % 3 !== 0;
          },
          result =
            shape === "circle"
              ? grid.queryCircle({ x: 0, y: 0 }, 1000, check)
              : grid.queryRectangle({ x: -1000, y: -1000 }, { width: 2000, height: 2000 }, check);

        return { visited, nested, result: result.map((p) => p.id) };
      },
      baseline = run(variants.baseline),
      candidate = run(variants.liveSparse);

    assert.deepEqual(candidate, baseline, `${shape} mutation seed ${seed}`);
    mutationComparisons.push({ seed, shape, visits: baseline.visited.length });
  }
}

const hugeAfter = huge.counters(),
  result = {
    node: process.version,
    sourceHashes: Object.fromEntries(
      Object.entries(sources).map(([name, source]) => [name, createHash("sha256").update(source).digest("hex")]),
    ),
    scenarios,
    mutationComparisons,
    hugeLiveMutation: {
      radius: 1_000_000,
      cellLookups: hugeAfter.cellLookups - hugeBefore.cellLookups,
      keyVisits: hugeAfter.keyVisits - hugeBefore.keyVisits,
    },
    limitations: [
      "Node synthetic predicate queries, not browser scene acceptance.",
      "Alternating order, 2 warmups and 9 samples per workload; output ID order compared exactly.",
      "Counters use a separate instrumented pass; huge-area case is candidate-only to avoid a billion-cell baseline traversal.",
    ],
  };

await writeFile(
  process.argv[2] ?? ".planning/handovers/evidence/e6/sparse-predicates.json",
  JSON.stringify(result, null, 2) + "\n",
);
console.log(
  JSON.stringify(
    {
      scenarios: scenarios.map(({ count, radius, summary, counters }) => ({ count, radius, summary, counters })),
      hugeLiveMutation: result.hugeLiveMutation,
    },
    null,
    2,
  ),
);
