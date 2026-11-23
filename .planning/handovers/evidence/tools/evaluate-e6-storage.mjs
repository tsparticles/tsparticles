import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";
import { stripTypeScriptTypes } from "node:module";
import path from "node:path";
import { performance } from "node:perf_hooks";
import { pathToFileURL } from "node:url";

const gridSource = await readFile("engine/src/Core/Particles/SpatialHashGrid.ts", "utf8"),
  managerSource = await readFile("engine/src/Core/Particles/ParticlesManager.ts", "utf8"),
  hash = (source) => createHash("sha256").update(source).digest("hex"),
  median = (values) => values.toSorted((a, b) => a - b)[Math.floor(values.length / 2)],
  summarize = (values) => ({
    median: median(values),
    min: Math.min(...values),
    max: Math.max(...values),
    p95: values.toSorted((a, b) => a - b)[Math.floor((values.length - 1) * 0.95)],
  });

async function load(source, sourcePath) {
  const js = stripTypeScriptTypes(source).replace(
    /from "(\.[^"]+)"/g,
    (_, specifier) =>
      `from ${JSON.stringify(
        pathToFileURL(path.resolve(path.dirname(sourcePath), specifier).replace("/engine/src/", "/engine/dist/esm/"))
          .href,
      )}`,
  );
  return import(`data:text/javascript;base64,${Buffer.from(js).toString("base64")}`);
}

const gridPath = "engine/src/Core/Particles/SpatialHashGrid.ts",
  gridVariants = { current: gridSource };
for (const cap of [32, 256]) {
  assert.equal(gridSource.split("      cell = [];").length, 2);
  gridVariants[`pool${cap}`] = gridSource
    .replace("  #cellSize: number;", "  #cellSize: number;\n  readonly #cellPool: ParticleCell[] = [];")
    .replace("      cell = [];", "      cell = this.#cellPool.pop() ?? [];")
    .replace(
      "    this.#cells.clear();",
      `    for (const cell of this.#cells.values()) {
      if (!this.#activeCells.includes(cell) && this.#cellPool.length < ${cap}) {
        cell.length = 0; this.#cellPool.push(cell);
      }
    }
    this.#cells.clear();`,
    );
}

const grids = {};
for (const [name, source] of Object.entries(gridVariants)) grids[name] = (await load(source, gridPath)).SpatialHashGrid;

const keyFixtures = [1000, 10000].flatMap((count) =>
    ["clustered", "uniform", "distant"].map((distribution) => ({ count, distribution })),
  ),
  keyResults = [];

for (const { count, distribution } of keyFixtures) {
  const positions = Array.from({ length: count }, (_, id) => ({
      x: distribution === "clustered" ? id % 32 : distribution === "distant" ? id * 4096 : (id * 73) % 800,
      y: distribution === "clustered" ? id % 16 : (id * 137) % 600,
    })),
    offset = 33554432,
    width = offset * 2,
    key = (x, y) =>
      Number.isInteger(x) && Number.isInteger(y) && x >= -offset && x < offset && y >= -offset && y < offset
        ? x + offset + (y + offset) * width
        : `${x}_${y}`,
    maps = { string: new Map(), numericWithFallback: new Map(), nested: new Map() },
    operations = {
      string: () => {
        const map = maps.string;
        map.clear();
        for (const p of positions) {
          const k = `${Math.floor(p.x / 64)}_${Math.floor(p.y / 64)}`;
          let cell = map.get(k);
          if (!cell) {
            cell = [];
            map.set(k, cell);
          }
          cell.push(p);
        }
      },
      numericWithFallback: () => {
        const map = maps.numericWithFallback;
        map.clear();
        for (const p of positions) {
          const k = key(Math.floor(p.x / 64), Math.floor(p.y / 64));
          let cell = map.get(k);
          if (!cell) {
            cell = [];
            map.set(k, cell);
          }
          cell.push(p);
        }
      },
      nested: () => {
        const map = maps.nested;
        map.clear();
        for (const p of positions) {
          const x = Math.floor(p.x / 64),
            y = Math.floor(p.y / 64);
          let row = map.get(x);
          if (!row) {
            row = new Map();
            map.set(x, row);
          }
          let cell = row.get(y);
          if (!cell) {
            cell = [];
            row.set(y, cell);
          }
          cell.push(p);
        }
      },
    },
    samples = Object.fromEntries(Object.keys(operations).map((name) => [name, []]));

  const encoded = new Set();
  for (const x of [-offset - 1, -offset, 0, offset - 1, offset, Number.MAX_SAFE_INTEGER])
    for (const y of [-offset - 1, -offset, 0, offset - 1, offset, Number.MAX_SAFE_INTEGER]) encoded.add(key(x, y));
  assert.equal(encoded.size, 36);
  for (let repetition = -2; repetition < 9; repetition++) {
    const names = Object.keys(operations);
    if (repetition % 2) names.reverse();
    for (const name of names) {
      const start = performance.now();
      for (let cycle = 0; cycle < 30; cycle++) operations[name]();
      if (repetition >= 0) samples[name].push((performance.now() - start) / 30);
    }
  }
  const flatten = (map) => [...map.values()].flat(),
    strings = flatten(maps.string),
    numeric = flatten(maps.numericWithFallback),
    nested = [...maps.nested.values()].flatMap((row) => flatten(row));
  assert.deepEqual(numeric, strings);
  assert.equal(nested.length, strings.length);
  assert.deepEqual(new Set(nested), new Set(strings));
  for (const [cellKey, cell] of maps.string) {
    const [x, y] = cellKey.split("_").map(Number);
    assert.deepEqual(maps.nested.get(x)?.get(y), cell);
  }
  keyResults.push({
    count,
    distribution,
    samples,
    summary: Object.fromEntries(Object.entries(samples).map(([name, values]) => [name, summarize(values)])),
    rows: maps.nested.size,
    cells: maps.string.size,
  });
}

const cellResults = [];
for (const count of [1000, 10000])
  for (const distribution of ["clustered", "uniform", "moving"]) {
    const positions = Array.from({ length: count }, (_, id) => ({
        x: distribution === "clustered" ? id % 32 : (id * 73) % 800,
        y: distribution === "clustered" ? id % 16 : (id * 137) % 600,
      })),
      particles = positions.map((position) => ({ getPosition: () => position })),
      instances = Object.fromEntries(Object.entries(grids).map(([name, Grid]) => [name, new Grid(64)])),
      samples = Object.fromEntries(Object.keys(grids).map((name) => [name, []]));
    for (let repetition = -2; repetition < 9; repetition++) {
      const names = Object.keys(grids);
      if (repetition % 2) names.reverse();
      for (const name of names) {
        const grid = instances[name],
          start = performance.now();
        for (let cycle = 0; cycle < 30; cycle++) {
          grid.clear();
          for (let id = 0; id < count; id++) {
            if (distribution === "moving") positions[id].x = ((id * 73) % 800) + cycle * 64;
            grid.insert(particles[id]);
          }
        }
        if (repetition >= 0) samples[name].push((performance.now() - start) / 30);
        assert.equal(grid.queryRectangle({ x: -100000, y: -100000 }, { width: 200000, height: 200000 }).length, count);
      }
    }
    cellResults.push({
      count,
      distribution,
      samples,
      summary: Object.fromEntries(Object.entries(samples).map(([name, values]) => [name, summarize(values)])),
    });
  }

for (const Grid of Object.values(grids)) {
  const grid = new Grid(64),
    first = { getPosition: () => ({ x: 0, y: 0 }) },
    second = { getPosition: () => ({ x: 1, y: 0 }) };
  grid.insert(first);
  grid.insert(second);
  assert.deepEqual(
    grid.queryCircle({ x: 0, y: 0 }, 1000, (p) => {
      if (p === first) grid.clear();
      return true;
    }),
    [first, second],
  );
  grid.insert(first);
  assert.deepEqual(
    grid.queryCircle({ x: 0, y: 0 }, 1000, () => {
      grid.clear(true);
      grid.insert(second);
      return true;
    }),
    [],
  );
}

const managerPath = "engine/src/Core/Particles/ParticlesManager.ts",
  seed = (source) =>
    source.replace(
      "export class ParticlesManager {",
      `export class ParticlesManager {
    e6Seed(particles: Particle[]): void {
      this.#array=particles.slice();this.#pool.length=0;this.#particleBuckets.clear();
      this.#resetBuckets(this.#container.zLayers);this.#grid.clear();
    }
  `,
    ),
  listSource = managerSource.replaceAll("new Map<number, Particle>()", "new E6RemovalList()"),
  listClass = `class E6RemovalList {
    #ids=[];#particles=[];get size(){return this.#ids.length;}
    set(id,p){const i=this.#ids.indexOf(id);if(i<0){this.#ids.push(id);this.#particles.push(p);}else this.#particles[i]=p;}
    clear(){this.#ids.length=0;this.#particles.length=0;}
    *[Symbol.iterator](){for(let i=0;i<this.#ids.length;i++)yield [this.#ids[i],this.#particles[i]];}
  }\n`,
  managers = {
    map: (await load(seed(managerSource), managerPath)).ParticlesManager,
    list: (await load(listClass + seed(listSource), managerPath)).ParticlesManager,
  },
  removalResults = [],
  delta = { value: 1000 / 60, factor: 1 };

assert.equal(managerSource.split("new Map<number, Particle>()").length, 3);
for (const removed of [0, 10, 500, 1000]) {
  const particles = Array.from({ length: 1000 }, (_, id) => {
      const position = { x: (id * 73) % 800, y: (id * 137) % 600, z: 0 };
      return {
        id,
        group: undefined,
        position,
        initialPosition: { ...position },
        ignoresResizeRatio: false,
        destroyed: false,
        spawning: false,
        getPosition: () => position,
        destroy() {
          this.destroyed = true;
        },
      };
    }),
    instances = Object.fromEntries(
      Object.entries(managers).map(([name, Manager]) => [
        name,
        new Manager(
          {},
          {
            zLayers: 100,
            particleUpdaters: [],
            dispatchEvent: () => undefined,
          },
        ),
      ]),
    ),
    samples = { map: [], list: [] };
  for (let repetition = -2; repetition < 9; repetition++) {
    const names = Object.keys(instances);
    if (repetition % 2) names.reverse();
    for (const name of names) {
      const manager = instances[name];
      let elapsed = 0;
      for (let cycle = 0; cycle < 10; cycle++) {
        manager.e6Seed(particles);
        for (const p of particles) p.destroyed = p.id < removed;
        const start = performance.now();
        manager.update(delta);
        elapsed += performance.now() - start;
        assert.equal(manager.count, 1000 - removed);
      }
      if (repetition >= 0) samples[name].push(elapsed / 10);
    }
  }
  removalResults.push({
    removed,
    samples,
    summary: Object.fromEntries(Object.entries(samples).map(([name, values]) => [name, summarize(values)])),
  });
}

const result = {
  node: process.version,
  sourceHashes: { grid: hash(gridSource), manager: hash(managerSource) },
  keyResults,
  cellResults,
  removalResults,
  limitations: [
    "Synthetic diagnostics, not browser frame acceptance; 2 warmups and 9 alternating-order samples.",
    "Key benchmarks isolate clear/insert. Numeric encoding uses exact 26+26-bit arithmetic with string fallback; 36 boundary pairs checked.",
    "Nested maps and numeric keys are not full query-engine replacements and do not justify changing default contracts.",
    "Bounded array reuse skips active query cells; nested raw-clear/retire behavior is asserted for each prototype.",
    "Map/list removal fixtures seed 1000 particles and mark 0/10/500/1000 destroyed, including duplicate phase collection.",
    "Prototype fields and fixtures are in-memory only; production APIs are unchanged by this evaluator.",
  ],
};
await writeFile(
  process.argv[2] ?? ".planning/handovers/evidence/e6/storage-evaluation.json",
  JSON.stringify(result, null, 2) + "\n",
);
console.log(
  JSON.stringify(
    {
      keys: keyResults.map(({ count, distribution, summary }) => ({ count, distribution, summary })),
      cells: cellResults.map(({ count, distribution, summary }) => ({ count, distribution, summary })),
      removals: removalResults.map(({ removed, summary }) => ({ removed, summary })),
    },
    null,
    2,
  ),
);
