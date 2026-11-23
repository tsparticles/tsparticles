import { createHash } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";
import { createRequire, stripTypeScriptTypes } from "node:module";
import path from "node:path";
import { brotliCompressSync, gunzipSync, gzipSync } from "node:zlib";

const require = createRequire(path.resolve("cli/utils/rollup-plugin/package.json")),
  { minify } = createRequire(require.resolve("@rollup/plugin-terser"))("terser"),
  sizes = (bytes) => ({
    sha256: createHash("sha256").update(bytes).digest("hex"),
    raw: Buffer.byteLength(bytes),
    gzip: gzipSync(bytes, { level: 9 }).length,
    brotli: brotliCompressSync(bytes).length,
  }),
  delta = (before, after) =>
    Object.fromEntries(["raw", "gzip", "brotli"].map((key) => [key, after[key] - before[key]])),
  modules = {};

for (const name of ["ParticlesManager", "SpatialHashGrid", "Ranges"]) {
  const before = await readFile(`.planning/handovers/evidence/e6/baseline/${name}.ts`, "utf8"),
    after = await readFile(`engine/src/Core/Particles/${name}.ts`, "utf8"),
    min = async (source) =>
      (await minify(stripTypeScriptTypes(source), { module: true, compress: true, mangle: true })).code,
    baseline = sizes(await min(before)),
    candidate = sizes(await min(after));

  modules[name] = { baseline, candidate, delta: delta(baseline, candidate) };
}

const baseline = sizes(
    gunzipSync(await readFile(".planning/handovers/evidence/e5/closure/final-all.bundle.min.js.gz")),
  ),
  candidate = sizes(await readFile("bundles/all/dist/tsparticles.all.bundle.min.js")),
  sources = {};

for (const file of [
  "engine/src/Core/Particles/ParticlesManager.ts",
  "engine/src/Core/Particles/SpatialHashGrid.ts",
  "engine/src/Core/Particles/Ranges.ts",
  "plugins/interactivity/src/InteractionManager.ts",
]) {
  sources[file] = createHash("sha256")
    .update(await readFile(file))
    .digest("hex");
}

const result = {
  node: process.version,
  sources,
  modules,
  allStandalone: { baseline, candidate, delta: delta(baseline, candidate) },
  limitations: [
    "Module sizes are isolated minified modules and are not consumer payloads.",
    "All comparison uses the archived accepted E5 artifact and the current rebuilt standalone artifact.",
    "E5 bundle-growth and runtime exceptions are not reclassified as passing by this incremental comparison.",
  ],
};

await writeFile(
  process.argv[2] ?? ".planning/handovers/evidence/e6/payloads.json",
  JSON.stringify(result, null, 2) + "\n",
);
console.log(JSON.stringify(result, null, 2));
