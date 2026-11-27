import assert from "node:assert/strict";
import { mkdtemp, readFile, writeFile, readdir, realpath } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { createRequire } from "node:module";
import { createHash } from "node:crypto";
import { gzipSync, brotliCompressSync, constants } from "node:zlib";
const root = process.cwd(),
  output = path.join(root, ".planning/handovers/evidence/e0");
const temporary = await mkdtemp(path.join(tmpdir(), "v5-installed-"));
const pack = JSON.parse(
  execFileSync("pnpm", ["--dir", path.join(root, "engine/dist"), "pack", "--pack-destination", temporary, "--json"], {
    encoding: "utf8",
  }),
);
const archive = (await readdir(temporary)).find((x) => x.endsWith(".tgz"));
await writeFile(
  path.join(temporary, "package.json"),
  JSON.stringify({ name: "v5-installed-baseline", private: true, type: "module" }),
);
const install = execFileSync(
  "pnpm",
  [
    "--dir",
    temporary,
    "add",
    path.join(temporary, archive),
    "--offline",
    "--ignore-scripts",
    "--store-dir",
    path.join(temporary, "store"),
  ],
  { encoding: "utf8" },
);
const probe = path.join(temporary, "probe.mjs");
await writeFile(
  probe,
  `import {createRequire} from 'node:module';
const require=createRequire(import.meta.url),specifier='@tsparticles/engine'+process.argv[3];
const before=new Set(Object.keys(globalThis));
const mode=process.argv[2],resolved=mode==='require'?require.resolve(specifier):import.meta.resolve(specifier);
const engine=mode==='require'?require(specifier):await import(specifier);
await engine.tsParticles.init();
console.log(JSON.stringify({mode,subpath:process.argv[3],resolved,singleton:!!engine.tsParticles,factory:typeof engine.createEngine,globals:Object.keys(globalThis).filter(x=>!before.has(x)),loaded:Object.keys(require.cache).filter(x=>x.endsWith('.js'))}));`,
);
const conditions = [];
for (const mode of ["import", "require", "browser"])
  for (const subpath of ["", "/lazy"]) {
    const row = JSON.parse(
      execFileSync(process.execPath, [...(mode === "browser" ? ["--conditions=browser"] : []), probe, mode, subpath], {
        encoding: "utf8",
      }),
    );
    assert(row.singleton && row.factory === "undefined");
    assert(row.resolved.includes(temporary));
    conditions.push(row);
  }
const req = createRequire(path.join(root, "cli/utils/rollup-plugin/package.json"));
const terser = createRequire(req.resolve("@rollup/plugin-terser"))("terser");
const size = (data) => ({
  bytes: Buffer.byteLength(data),
  gzip: gzipSync(data, { level: 9 }).length,
  brotli: brotliCompressSync(data, { params: { [constants.BROTLI_PARAM_QUALITY]: 11 } }).length,
});
const engineRoot = await realpath(path.join(temporary, "node_modules/@tsparticles/engine"));
const files = await readdir(path.join(engineRoot, "cjs"), { recursive: true });
const modules = [];
for (const file of files.filter((x) => x.endsWith(".js")).sort()) {
  const source = await readFile(path.join(engineRoot, "cjs", file), "utf8");
  const min = await terser.minify(source);
  assert(min.code);
  modules.push({ file: "cjs/" + file, raw: size(source), min: size(min.code) });
}
const total = (rows) =>
  rows.reduce(
    (sum, m) => {
      for (const k of ["bytes", "gzip", "brotli"]) {
        sum.raw[k] += m.raw[k];
        sum.min[k] += m.min[k];
      }
      return sum;
    },
    { raw: { bytes: 0, gzip: 0, brotli: 0 }, min: { bytes: 0, gzip: 0, brotli: 0 } },
  );
const acquisitions = conditions
  .filter((x) => x.mode === "require")
  .map((x) => {
    const loaded = x.loaded.map((f) => path.relative(engineRoot, f));
    const selected = modules.filter((m) => loaded.includes(m.file));
    assert.equal(loaded.length, selected.length);
    return { subpath: x.subpath, modules: loaded, ...total(selected) };
  });
for (const row of conditions) {
  row.resolved = row.resolved.replaceAll(temporary, "<temporary>");
  row.loaded = row.loaded.map((x) => path.relative(engineRoot, x));
}
await writeFile(
  path.join(output, "installed-package.json"),
  JSON.stringify(
    {
      revision: execFileSync("git", ["rev-parse", "HEAD"], { encoding: "utf8" }).trim(),
      archive,
      sha256: createHash("sha256")
        .update(await readFile(path.join(temporary, archive)))
        .digest("hex"),
      pack,
      install,
      conditions,
      cjs: {
        kind: "Per-file minification; unbundled CJS require/init and complete shipped CJS graph, not a browser tree-shaken consumer",
        compression: { gzip: 9, brotli: 11 },
        acquisitions,
        full: { modules: modules.length, ...total(modules) },
        modules,
      },
    },
    null,
    2,
  ) + "\n",
);
console.log(
  JSON.stringify({
    conditions: conditions.length,
    cjsAcquisitions: acquisitions.map((x) => ({ subpath: x.subpath, count: x.modules.length, raw: x.raw, min: x.min })),
    full: total(modules),
  }),
);
