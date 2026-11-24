import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import { mkdtemp, readFile, readdir, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { tmpdir } from "node:os";

const root = process.cwd(),
  destination = path.join(root, ".planning/handovers/evidence/e9"),
  temporary = await mkdtemp(path.join(tmpdir(), "tsparticles-e9-consumer-"));

await writeFile(
  path.join(temporary, "package.json"),
  JSON.stringify({ name: "tsparticles-e9-installed-consumer", private: true, type: "module" }),
);

const workspacePackages = new Map();

async function scanWorkspace(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    if (entry.isDirectory() && [".git", ".nx", ".planning", "dist", "node_modules"].includes(entry.name)) {
      continue;
    }

    const entryPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      await scanWorkspace(entryPath);

      continue;
    }

    if (entry.name !== "package.json") {
      continue;
    }

    const packageJson = JSON.parse(await readFile(entryPath, "utf8"));

    if (packageJson.name?.startsWith("@tsparticles/") || packageJson.name === "tsparticles") {
      workspacePackages.set(packageJson.name, path.dirname(entryPath));
    }
  }
}

await scanWorkspace(root);

const packageDirs = new Set(["engine", "bundles/basic"]),
  pending = ["@tsparticles/engine", "@tsparticles/basic"];

while (pending.length) {
  const name = pending.pop(),
    packageRoot = workspacePackages.get(name);

  assert(packageRoot, `Workspace package not found: ${name}`);

  const distPackagePath = path.join(packageRoot, "dist/package.json");

  assert(
    await stat(distPackagePath).then(
      () => true,
      () => false,
    ),
    `Built distribution missing: ${distPackagePath}`,
  );

  const packageJson = JSON.parse(await readFile(distPackagePath, "utf8"));

  for (const dependency of Object.keys(packageJson.dependencies ?? {})) {
    const dependencyDir = workspacePackages.get(dependency);

    if (!dependencyDir) {
      continue;
    }

    const relativeDir = path.relative(root, dependencyDir);

    if (!packageDirs.has(relativeDir)) {
      packageDirs.add(relativeDir);
      pending.push(dependency);
    }
  }
}

const packed = [];

for (const packageDir of [...packageDirs].sort()) {
  const packageRoot = path.join(root, packageDir, "dist"),
    output = JSON.parse(
      execFileSync("pnpm", ["--dir", packageRoot, "pack", "--pack-destination", temporary, "--json"], {
        encoding: "utf8",
      }),
    );

  packed.push({ packageDir, ...output[0] });
}

const archives = (await readdir(temporary))
  .filter((file) => file.endsWith(".tgz"))
  .map((file) => path.join(temporary, file));

assert.equal(archives.length, packageDirs.size);

const localPackages = {};

for (const packageDir of packageDirs) {
  const packageJson = JSON.parse(await readFile(path.join(root, packageDir, "dist/package.json"), "utf8")),
    archive = archives.find((file) =>
      path.basename(file).startsWith(packageJson.name.replace(/^@/, "").replaceAll("/", "-") + "-"),
    );

  assert(archive, `Packed tarball not found for ${packageJson.name}`);
  localPackages[packageJson.name] = `file:./${path.basename(archive)}`;
}

await writeFile(
  path.join(temporary, "package.json"),
  JSON.stringify(
    {
      name: "tsparticles-e9-installed-consumer",
      private: true,
      type: "module",
      dependencies: localPackages,
    },
    null,
    2,
  ),
);

await writeFile(
  path.join(temporary, "pnpm-workspace.yaml"),
  `packages: []\noverrides:\n${Object.entries(localPackages)
    .map(([name, specifier]) => `  ${JSON.stringify(name)}: ${JSON.stringify(specifier)}`)
    .join("\n")}\n`,
);

const install = execFileSync(
  "pnpm",
  ["--dir", temporary, "install", "--offline", "--ignore-scripts", "--store-dir", path.join(temporary, "store")],
  { encoding: "utf8" },
);

const probePath = path.join(temporary, "probe.mjs");

await writeFile(
  probePath,
  `import assert from "node:assert/strict";
import { createRequire } from "node:module";
const require = createRequire(import.meta.url),
  packageName = process.argv[2],
  mode = process.argv[3],
  subpath = process.argv[4],
  specifier = packageName + subpath,
  before = new Set(Object.keys(globalThis)),
  resolved = mode === "require" ? require.resolve(specifier) : import.meta.resolve(specifier),
  value = mode === "require" ? require(specifier) : await import(specifier);
assert(resolved.includes("node_modules"));
const result = { packageName, mode, subpath, resolved: resolved.split("node_modules/").at(-1), globals: Object.keys(globalThis).filter(key => !before.has(key)) };
if (packageName === "@tsparticles/engine") {
  assert.equal(typeof value.createEngine, "function");
  assert.equal("tsParticles" in value, false);
  const first = value.createEngine(), second = value.createEngine();
  assert.notEqual(first, second);
  assert.notEqual(first.pluginManager, second.pluginManager);
  assert.notEqual(first.items, second.items);
  await first.pluginManager.register(async current => {
    current.pluginManager.addPlugin({ id: "e9-installed-custom", getPlugin: async () => ({}), loadOptions: () => {}, needsPlugin: () => false });
  });
  await first.init();
  assert.equal(first.pluginManager.getPlugin("e9-installed-custom")?.id, "e9-installed-custom");
  let mismatch;
  try { first.checkVersion("0.0.0-e9-probe"); } catch (error) { mismatch = error; }
  assert(mismatch instanceof Error);
  result.factory = typeof value.createEngine;
  result.independentEngines = true;
  result.customPlugin = true;
  result.versionMismatch = mismatch.message;
} else {
  assert.equal(typeof value.loadBasic, "function");
  const engineModule = mode === "require" ? require("@tsparticles/engine") : await import("@tsparticles/engine"),
    engine = engineModule.createEngine();
  await value.loadBasic(engine);
  await engine.init();
  result.loader = typeof value.loadBasic;
  result.engineInitialized = true;
}
assert.deepEqual(result.globals, []);
result.globals = [];
console.log(JSON.stringify(result));
`,
);

const conditions = [];

for (const packageName of ["@tsparticles/engine", "@tsparticles/basic"]) {
  for (const mode of ["import", "require", "browser"]) {
    for (const subpath of ["", "/lazy"]) {
      const args = [
        ...(mode === "browser" ? ["--conditions=browser"] : []),
        probePath,
        packageName,
        mode === "browser" ? "import" : mode,
        subpath,
      ];

      conditions.push(JSON.parse(execFileSync(process.execPath, args, { encoding: "utf8" })));
    }
  }
}

const typeProbe = path.join(temporary, "probe.ts");

await writeFile(
  typeProbe,
  `import { createEngine, type Engine, type IPlugin } from "@tsparticles/engine";
import { loadBasic } from "@tsparticles/basic";
declare module "@tsparticles/engine" { interface IPlugin { e9ConsumerMarker?: string; } }
const plugin: IPlugin = { id: "typed-consumer", e9ConsumerMarker: "installed", getPlugin: async () => ({}), loadOptions: () => {}, needsPlugin: () => false };
const engine: Engine = createEngine();
void engine.pluginManager.register(async current => current.pluginManager.addPlugin(plugin));
void loadBasic(engine);
`,
);

await writeFile(
  path.join(temporary, "tsconfig.json"),
  JSON.stringify(
    {
      compilerOptions: {
        module: "NodeNext",
        moduleResolution: "NodeNext",
        target: "ES2022",
        strict: true,
        noEmit: true,
        skipLibCheck: true,
      },
      include: ["probe.ts"],
    },
    null,
    2,
  ),
);

execFileSync(path.join(root, "node_modules/.bin/tsc"), ["--project", path.join(temporary, "tsconfig.json")], {
  encoding: "utf8",
});

const hashes = [];

for (const archive of archives) {
  hashes.push({
    file: path.basename(archive),
    sha256: createHash("sha256")
      .update(await readFile(archive))
      .digest("hex"),
  });
}

const report = {
  revision: execFileSync("git", ["rev-parse", "HEAD"], { encoding: "utf8" }).trim(),
  install: "Offline install of local tarballs outside the workspace; no workspace links or lifecycle scripts.",
  packages: packed.map(({ packageDir, filename, size }) => ({ packageDir, filename, size })),
  hashes,
  conditions,
  types:
    "Strict TypeScript consumer compiles Engine, IPlugin, the Basic loader, and a module augmentation against installed declarations.",
  customPlugin: "Runtime and TypeScript registration through the installed engine package.",
  installLog: install.trim(),
};

await writeFile(path.join(destination, "installed-consumers.json"), JSON.stringify(report, null, 2) + "\n");
console.log(
  JSON.stringify({ packages: packed.length, conditions: conditions.length, types: "passed", customPlugin: "passed" }),
);
