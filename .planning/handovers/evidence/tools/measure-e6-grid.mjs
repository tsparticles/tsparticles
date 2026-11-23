import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";
import { createRequire, stripTypeScriptTypes } from "node:module";
import path from "node:path";
import { performance } from "node:perf_hooks";
import { pathToFileURL } from "node:url";
import { brotliCompressSync, gzipSync } from "node:zlib";

const baselinePath = ".planning/handovers/evidence/e6/baseline/SpatialHashGrid.ts",
  currentPath = ".planning/handovers/evidence/e6/baseline/SpatialHashGrid-validated.ts",
  baseline = await readFile(baselinePath, "utf8"),
  validated = await readFile(currentPath, "utf8"),
  before = `    if (!this.#cells.has(key)) {
      this.#cells.set(key, []);
    }

    this.#cells.get(key)?.push(particle);`,
  after = `    let cell = this.#cells.get(key);

    if (!cell) {
      cell = [];
      this.#cells.set(key, cell);
    }

    cell.push(particle);`;

assert.equal(validated.split(before).length, 2, "single-lookup patch must match once");

const sources = { baseline, validated, singleLookup: validated.replace(before, after) },
  require = createRequire(path.resolve("cli/utils/rollup-plugin/package.json")),
  { minify } = createRequire(require.resolve("@rollup/plugin-terser"))("terser"),
  variants = {},
  sizes = {},
  rangesUrl = pathToFileURL(path.resolve("engine/dist/esm/Core/Particles/Ranges.js")).href;

for (const [name, source] of Object.entries(sources)) {
  const js = stripTypeScriptTypes(source),
    runnable = js.replace('"./Ranges.js"', JSON.stringify(rangesUrl)),
    { SpatialHashGrid } = await import(`data:text/javascript;base64,${Buffer.from(runnable).toString("base64")}`),
    { code } = await minify(js, { module: true, compress: true, mangle: true });

  variants[name] = SpatialHashGrid;
  sizes[name] = {
    sourceSha256: createHash("sha256").update(source).digest("hex"),
    min: Buffer.byteLength(code),
    gzip: gzipSync(code).length,
    brotli: brotliCompressSync(code).length,
  };
}

const percentile = (values, fraction) => values.toSorted((a, b) => a - b)[Math.floor((values.length - 1) * fraction)],
  scenarios = [];

for (const count of [500, 1_000, 10_000]) {
  for (const distribution of ["clustered", "uniform", "churn"]) {
    const positions = Array.from({ length: count }, (_, i) => ({
        x: distribution === "clustered" ? i % 32 : ((i * 73) % 4096) - 2048,
        y: distribution === "clustered" ? i % 16 : ((i * 137) % 4096) - 2048,
        z: 0,
      })),
      particles = positions.map((position, id) => ({ id, getPosition: () => position })),
      grids = Object.fromEntries(Object.entries(variants).map(([name, Grid]) => [name, new Grid(64)])),
      samples = Object.fromEntries(Object.keys(variants).map((name) => [name, []])),
      cycles = count === 10_000 ? 40 : 200;

    for (let repetition = -3; repetition < 15; repetition++) {
      const names = Object.keys(variants);

      if (repetition % 2) names.reverse();

      for (const name of names) {
        const grid = grids[name],
          started = performance.now();

        for (let cycle = 0; cycle < cycles; cycle++) {
          grid.clear();

          for (let i = 0; i < count; i++) {
            if (distribution === "churn") {
              positions[i].x = ((i * 73) % 4096) - 2048 + cycle * 64;
              positions[i].y = ((i * 137) % 4096) - 2048 - cycle * 64;
            }
            grid.insert(particles[i]);
          }
        }

        const elapsed = (performance.now() - started) / cycles;

        if (repetition >= 0) samples[name].push(elapsed);
      }

      const query = (grid) =>
          grid.queryRectangle({ x: -100_000, y: -100_000 }, { width: 200_000, height: 200_000 }).map((p) => p.id),
        expected = query(grids.baseline);

      for (const grid of Object.values(grids)) assert.deepEqual(query(grid), expected);
    }

    scenarios.push({
      count,
      distribution,
      cyclesPerSample: cycles,
      samplesMsPerClearInsert: samples,
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
}

const output = process.argv[2] ?? ".planning/handovers/evidence/e6/grid-insert.json";
await writeFile(
  output,
  JSON.stringify(
    {
      node: process.version,
      sizes,
      scenarios,
      limitations: [
        "Node synthetic clear/insert benchmark, not browser scene acceptance.",
        "Same deterministic coordinates, alternating variant order, 3 warmups and 15 samples per workload.",
        "Geometry comes from the installed E5 compiled engine; contains behavior is unchanged by the E6 intersection fix.",
        "Sizes cover the isolated grid module, not a shipped bundle.",
        "No retained heap or frame-allocation claim is made by this diagnostic.",
      ],
    },
    null,
    2,
  ) + "\n",
);
console.log(
  JSON.stringify(
    scenarios.map(({ count, distribution, summary }) => ({ count, distribution, summary })),
    null,
    2,
  ),
);
