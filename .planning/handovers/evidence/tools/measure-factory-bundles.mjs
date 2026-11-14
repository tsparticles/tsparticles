import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { readFile, writeFile, mkdir, readdir } from "node:fs/promises";
import path from "node:path";
import { gzipSync, brotliCompressSync, constants } from "node:zlib";
import { execFileSync } from "node:child_process";

// Run from the repository root, after fresh package builds have finished.
const root = process.cwd();
const require = createRequire(path.join(root, "cli/utils/rollup-plugin/package.json"));
const { rollup, VERSION } = require("rollup");
const { nodeResolve } = require("@rollup/plugin-node-resolve");
const terser = require("@rollup/plugin-terser");
const destination = path.resolve(process.argv[2] ?? ".planning/handovers/evidence/e1");
await mkdir(destination, { recursive: true });
const size = (value) => {
  const bytes = Buffer.from(value);
  return {
    raw: bytes.length,
    gzip: gzipSync(bytes, { level: 9 }).length,
    brotli: brotliCompressSync(bytes, { params: { [constants.BROTLI_PARAM_QUALITY]: 11 } }).length,
  };
};
const normalize = (name) => name.replaceAll(root + "/", "");
const options = {
  autoPlay: false,
  fullScreen: false,
  particles: {
    number: { value: 100 },
    paint: { fill: { color: { value: "#ff0000" } } },
    shape: { type: "circle" },
    size: { value: 3 },
    move: { enable: true, speed: 1 },
  },
};
const scene = `import { createEngine } from '@tsparticles/engine'; const tsParticles = createEngine();
import { loadCircleShape } from '@tsparticles/shape-circle';
import { loadMovePlugin } from '@tsparticles/plugin-move';
import { loadHexColorPlugin } from '@tsparticles/plugin-hex-color';
import { loadPaintUpdater } from '@tsparticles/updater-paint';
import { loadSizeUpdater } from '@tsparticles/updater-size';
import { loadOpacityUpdater } from '@tsparticles/updater-opacity';
import { loadOutModesUpdater } from '@tsparticles/updater-out-modes';
export async function start() {
 await Promise.all([loadCircleShape,loadMovePlugin,loadHexColorPlugin,loadPaintUpdater,
 loadSizeUpdater,loadOpacityUpdater,loadOutModesUpdater].map(load=>load(tsParticles)));
 return tsParticles.load({id:'v5-baseline',options:${JSON.stringify(options)}});
}`;
const entries = {
  helper: `export { clamp } from '@tsparticles/engine';`,
  factory: `import { createEngine } from '@tsparticles/engine'; export const engine = createEngine();`,
  initialization: `import { createEngine } from '@tsparticles/engine'; const tsParticles = createEngine(); export const initialized = tsParticles.init();`,
  minimal: scene,
  "factory-lazy": `import { createEngine } from '@tsparticles/engine/lazy'; export const engine = createEngine();`,
};
const result = {
  workingTree: true,
        measuredAt: new Date().toISOString(),
        revision: execFileSync("git", ["rev-parse", "HEAD"], { encoding: "utf8" }).trim(),
  node: process.version,
  rollup: VERSION,
  compression: { gzipLevel: 9, brotliQuality: 11 },
  factory: { status: "implemented", comparison: "E0 singleton acquisition; explicit creation is intentional" },
  options,
  consumers: [],
  distributions: [],
};
for (const browser of [false, true]) {
  for (const [name, source] of Object.entries(entries)) {
    const id = path.join(root, "utils/tests", `e1-${name}.mjs`);
    const warnings = [];
    const build = await rollup({
      input: id,
      onwarn: (warning) => {
        if (warning.code === "UNRESOLVED_IMPORT") throw new Error(warning.message);
        warnings.push(warning.message);
      },
      plugins: [
        {
          name: "e1-consumer",
          resolveId: (source) => (source === id ? id : null),
          load: (resolved) => (resolved === id ? source : null),
        },
        nodeResolve({ browser }),
      ],
    });
    const raw = await build.generate({ format: "es", entryFileNames: "entry.js", chunkFileNames: "[name]-[hash].js" });
    const min = await build.generate({
      format: "es",
      entryFileNames: "entry.js",
      chunkFileNames: "[name]-[hash].js",
      plugins: [terser()],
    });
    const summarize = (output) =>
      output
        .filter((x) => x.type === "chunk")
        .map((chunk) => ({
          file: chunk.fileName,
          entry: chunk.isEntry,
          ...size(chunk.code),
          imports: chunk.imports,
          dynamicImports: chunk.dynamicImports,
          modules: Object.keys(chunk.modules).map(normalize),
        }));
    const rawChunks = summarize(raw.output),
      minChunks = summarize(min.output);
    const totals = (chunks) =>
      chunks.reduce((a, c) => ({ raw: a.raw + c.raw, gzip: a.gzip + c.gzip, brotli: a.brotli + c.brotli }), {
        raw: 0,
        gzip: 0,
        brotli: 0,
      });
    const record = {
      name,
      condition: browser ? "browser" : "import",
      source,
      rawChunks,
      minChunks,
      rawTotal: totals(rawChunks),
      minTotal: totals(minChunks),
      warnings,
    };
    assert.equal(minChunks.filter((x) => x.entry).length, 1);
    assert.ok(record.minTotal.raw > 0);
    result.consumers.push(record);
    await build.close();
  }
}
for (const dir of ["engine", "bundles/basic", "bundles/slim", "bundles/full", "bundles/all"]) {
  const dist = path.join(root, dir, "dist");
  for (const file of (await readdir(dist)).filter((x) => x.endsWith(".js")).sort()) {
    const data = await readFile(path.join(dist, file));
    result.distributions.push({ file: `${dir}/dist/${file}`, ...size(data) });
  }
}
await writeFile(path.join(destination, "bundle-sizes.json"), JSON.stringify(result, null, 2) + "\n");
console.log(
  JSON.stringify(
    {
      consumers: result.consumers.map((x) => ({
        name: x.name,
        condition: x.condition,
        chunks: x.minChunks.length,
        ...x.minTotal,
      })),
      distributions: result.distributions,
    },
    null,
    2,
  ),
);

// Minimal classic-script closure: engine, shared animation utilities, seven loaders.
const cdnRoots = [
  "engine",
  "utils/animationUtils",
  "shapes/circle",
  "plugins/move",
  "plugins/colors/hex",
  "updaters/paint",
  "updaters/size",
  "updaters/opacity",
  "updaters/outModes",
];
const cdnFiles = [],
  reports = [],
  identities = new Map();
for (const packageRoot of cdnRoots) {
  const dist = path.join(root, packageRoot, "dist");
  const manifest = JSON.parse(await readFile(path.join(dist, "package.json"), "utf8"));
  const filename = manifest.jsdelivr ?? manifest.unpkg ?? (await readdir(dist)).find((x) => x.endsWith(".min.js"));
  if (!filename) throw new Error(`Missing CDN entry for ${packageRoot}`);
  cdnFiles.push({
    root: packageRoot,
    file: `${packageRoot}/dist/${filename}`,
    ...size(await readFile(path.join(dist, filename))),
  });
  const report = await readFile(path.join(dist, "report.html"), "utf8");
  const match = report.match(/const data = (\{[^\n]+\});/);
  if (!match) throw new Error(`Cannot parse Rollup module report for ${packageRoot}`);
  const graph = JSON.parse(match[1]);
  const modules = [
    ...new Set(
      Object.values(graph.nodeParts)
        .filter((part) => part.renderedLength > 0)
        .map((part) => {
          const id = graph.nodeMetas[part.metaUid].id;
          return id.startsWith("/dist/") ? packageRoot + id : id;
        }),
    ),
  ].sort();
  for (const id of modules) identities.set(id, [...(identities.get(id) ?? []), packageRoot]);
  reports.push({ root: packageRoot, modules, source: `${packageRoot}/dist/report.html` });
}
await writeFile(
  path.join(destination, "cdn-candidate.json"),
  JSON.stringify(
    {
      status: "Candidate closure; see separate cdn-browser.json for verification",
      requestCount: cdnFiles.length,
      files: cdnFiles,
      total: cdnFiles.reduce(
        (sum, file) => ({ raw: sum.raw + file.raw, gzip: sum.gzip + file.gzip, brotli: sum.brotli + file.brotli }),
        { raw: 0, gzip: 0, brotli: 0 },
      ),
    },
    null,
    2,
  ) + "\n",
);
await writeFile(
  path.join(destination, "cdn-modules.json"),
  JSON.stringify(
    {
      note: "Rendered module identities from standard Rollup visualizer reports; representative unminified graphs. Byte-level copied logic is not detected. External-only metadata excluded.",
      reports,
      duplicateModuleIdentities: Object.fromEntries([...identities].filter(([, owners]) => owners.length > 1)),
    },
    null,
    2,
  ) + "\n",
);
