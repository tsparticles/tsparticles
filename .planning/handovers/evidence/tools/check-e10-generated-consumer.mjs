import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { mkdir, mkdtemp, readFile, writeFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { tmpdir } from "node:os";
import path from "node:path";
import { pathToFileURL } from "node:url";
import puppeteer from "puppeteer";
import * as typescript from "typescript";

const root = process.cwd(),
  temporary = await mkdtemp(path.join(tmpdir(), "v5-generated-consumer-")),
  outputPath = path.join(root, ".planning/handovers/evidence/e10/generated-consumer.json"),
  require = createRequire(path.join(root, "package.json")),
  rollupRequire = createRequire(path.join(root, "cli/utils/rollup-plugin/package.json")),
  manifestPaths = execFileSync(
    "find",
    [
      root,
      "-path",
      "*/node_modules",
      "-prune",
      "-o",
      "-path",
      "*/.git",
      "-prune",
      "-o",
      "-path",
      "*/.nx",
      "-prune",
      "-o",
      "-path",
      "*/.planning",
      "-prune",
      "-o",
      "-path",
      "*/dist/package.json",
      "-print",
    ],
    { encoding: "utf8" },
  )
    .trim()
    .split("\n")
    .filter(Boolean),
  manifests = new Map();

for (const manifestPath of manifestPaths) {
  const manifest = JSON.parse(await readFile(manifestPath, "utf8"));

  if (manifest.name?.startsWith("@tsparticles/"))
    manifests.set(manifest.name, { manifest, directory: path.dirname(manifestPath) });
}

const generatedModule = await import(
    pathToFileURL(path.join(root, "integrations/mcp-server/dist/tools/generateCode.js"))
  ),
  generated = generatedModule.generateCode({
    description: "simple circles moving",
    framework: "vanilla",
    typescript: true,
  }),
  packages = new Set(),
  pending = [...generated.installPackages];

while (pending.length) {
  const packageName = pending.pop();

  if (packages.has(packageName)) continue;

  const entry = manifests.get(packageName);

  assert(entry, `Built package manifest not found for ${packageName}`);
  packages.add(packageName);

  for (const dependency of Object.keys(entry.manifest.dependencies ?? {})) {
    if (dependency.startsWith("@tsparticles/")) pending.push(dependency);
  }
}

const tarballs = [];

for (const packageName of packages) {
  const entry = manifests.get(packageName),
    packed = JSON.parse(
      execFileSync("pnpm", ["--dir", entry.directory, "pack", "--pack-destination", temporary, "--json"], {
        encoding: "utf8",
      }),
    );

  tarballs.push({
    name: packageName,
    path: path.isAbsolute(packed.filename) ? packed.filename : path.join(temporary, packed.filename),
  });
}

await writeFile(
  path.join(temporary, "package.json"),
  JSON.stringify({ name: "v5-generated-consumer", private: true, type: "module" }),
);

for (const tarball of tarballs) {
  const packageDirectory = path.join(temporary, "node_modules", ...tarball.name.split("/"));

  await mkdir(packageDirectory, { recursive: true });
  execFileSync("tar", ["-xzf", tarball.path, "-C", packageDirectory, "--strip-components=1"]);
}

await writeFile(path.join(temporary, "index.ts"), `${generated.code}\n`);
await writeFile(
  path.join(temporary, "tsconfig.json"),
  JSON.stringify(
    {
      compilerOptions: {
        target: "ES2022",
        module: "ESNext",
        moduleResolution: "Bundler",
        strict: true,
        noEmit: true,
        skipLibCheck: true,
        lib: ["ES2022", "DOM"],
      },
      include: ["index.ts"],
    },
    null,
    2,
  ),
);

const tscPath = path.join(path.dirname(require.resolve("typescript")), "../bin/tsc");

execFileSync(process.execPath, [tscPath, "--project", path.join(temporary, "tsconfig.json")], { stdio: "inherit" });

const transpiled = path.join(temporary, "index.js"),
  source = await readFile(path.join(temporary, "index.ts"), "utf8"),
  rollupModule = rollupRequire("rollup"),
  nodeResolveModule = rollupRequire("@rollup/plugin-node-resolve"),
  javascript = typescript.transpile(source, {
    target: typescript.ScriptTarget.ES2022,
    module: typescript.ModuleKind.ESNext,
  });

await writeFile(transpiled, javascript);
const bundle = await rollupModule.rollup({ input: transpiled, plugins: [nodeResolveModule.nodeResolve()] });

await bundle.write({
  file: path.join(temporary, "app.js"),
  format: "iife",
  name: "GeneratedConsumer",
  inlineDynamicImports: true,
});
await bundle.close();

const browser = await puppeteer.launch({
  executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  headless: true,
  pipe: true,
});

let browserErrors = [];

try {
  const page = await browser.newPage();

  page.on("pageerror", (error) => browserErrors.push(error.message));
  await page.setContent('<body style="margin:0"><div id="tsparticles" style="width:800px;height:600px"></div></body>');
  await page.addScriptTag({ path: path.join(temporary, "app.js") });
  await page.waitForFunction(() => document.querySelector("#tsparticles canvas"), { timeout: 10_000 });
  await new Promise((resolve) => setTimeout(resolve, 250));
} finally {
  await browser.close();
}

assert.deepEqual(browserErrors, []);

const installedPackages = [];

for (const packageName of packages) {
  const manifestPath = path.join(temporary, "node_modules", ...packageName.split("/"), "package.json"),
    manifest = JSON.parse(await readFile(manifestPath, "utf8"));

  assert.equal(manifest.name, packageName);
  installedPackages.push({ name: packageName, version: manifest.version });
}

const result = {
  generated: { framework: generated.framework, bundle: generated.bundle, installPackages: generated.installPackages },
  installedPackages,
  toolchain: { node: process.version, typescript: typescript.version, rollup: "workspace-installed" },
  typecheck: "pass",
  browser: "Chrome headless; generated code initialized one canvas",
  browserErrors,
  temporary,
  installLog: `Extracted ${tarballs.length} packed workspace package tarballs into an isolated consumer node_modules tree`,
};

await writeFile(outputPath, `${JSON.stringify(result, null, 2)}\n`);
console.log(JSON.stringify(result, null, 2));
