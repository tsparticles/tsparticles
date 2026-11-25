/* global console, document, process, URL */
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { createServer } from "node:http";
import { cp, mkdir, mkdtemp, readFile, readdir, writeFile, symlink } from "node:fs/promises";
import { createRequire } from "node:module";
import { tmpdir } from "node:os";
import path from "node:path";
import { pathToFileURL } from "node:url";
import puppeteer from "puppeteer";

const framework = process.argv.find((arg) => arg.startsWith("--framework="))?.slice("--framework=".length) ?? "vanilla";

assert(
  ["astro", "jquery", "lit", "react", "riot", "solid", "svelte", "vanilla", "vue3", "webcomponents"].includes(
    framework,
  ),
  `Unsupported E10 scaffold framework: ${framework}`,
);

const root = process.cwd(),
  temporary = await mkdtemp(path.join(tmpdir(), `v5-cli-${framework}-scaffold-`)),
  projectDir = path.join(temporary, "project"),
  outputName = framework === "vanilla" ? "cli-scaffold.json" : `cli-${framework}-scaffold.json`,
  outputPath = path.join(root, ".planning/handovers/evidence/e10", outputName),
  require = createRequire(path.join(root, "package.json")),
  viteRequire = createRequire(path.join(root, "websites/website/package.json")),
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

if (!manifests.has("@tsparticles/lit")) {
  const manifest = JSON.parse(await readFile(path.join(root, "wrappers/lit/package.json"), "utf8"));

  manifests.set(manifest.name, { manifest, directory: path.join(root, "wrappers/lit") });
}

const astroManifest = JSON.parse(await readFile(path.join(root, "wrappers/astro/package.json"), "utf8"));

manifests.set(astroManifest.name, { manifest: astroManifest, directory: path.join(root, "wrappers/astro") });

const scaffoldModule = await import(pathToFileURL(path.join(root, "cli/commands/create-app/dist/scaffold.js")));

await scaffoldModule.createAppProject({
  destination: projectDir,
  framework,
  projectName: `v5-e10-${framework}-scaffold`,
  skipInstall: true,
  useCase: "none",
});

const projectManifest = JSON.parse(await readFile(path.join(projectDir, "package.json"), "utf8")),
  packages = new Set(),
  pending = Object.keys(projectManifest.dependencies ?? {}).filter((name) => name.startsWith("@tsparticles/"));

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
    archiveName = `${packageName.replace("@tsparticles/", "tsparticles-")}.tgz`,
    archivePath = path.join(temporary, archiveName),
    stagingRoot = path.join(temporary, "staging", packageName.replaceAll("/", "_")),
    packageDirectory = path.join(stagingRoot, "package");

  await mkdir(packageDirectory, { recursive: true });
  if (packageName === "@tsparticles/lit") {
    await cp(path.join(entry.directory, "package.json"), path.join(packageDirectory, "package.json"));
    await cp(path.join(entry.directory, "lib"), path.join(packageDirectory, "lib"), { recursive: true });
  } else if (packageName === "@tsparticles/astro") {
    for (const file of ["package.json", "env.d.ts", "index.ts", "index.client.js", "index.server.js"]) {
      await cp(path.join(entry.directory, file), path.join(packageDirectory, file));
    }
    await cp(path.join(entry.directory, "src"), path.join(packageDirectory, "src"), { recursive: true });
  } else {
    await cp(entry.directory, packageDirectory, { recursive: true });
  }
  execFileSync("tar", ["-czf", archivePath, "-C", stagingRoot, "package"]);
  tarballs.push({ name: packageName, path: archivePath });
}

for (const tarball of tarballs) {
  const packageDirectory = path.join(projectDir, "node_modules", ...tarball.name.split("/"));

  await mkdir(packageDirectory, { recursive: true });
  execFileSync("tar", ["-xzf", tarball.path, "-C", packageDirectory, "--strip-components=1"]);
}

const vitePackageRoot = path.resolve(path.dirname(viteRequire.resolve("vite")), "../..");

await symlink(
  path.join(root, "node_modules", "typescript"),
  path.join(projectDir, "node_modules", "typescript"),
  "dir",
);
await symlink(vitePackageRoot, path.join(projectDir, "node_modules", "vite"), "dir");

const frameworkPackages =
  {
    react: [
      ["react", "react@19.3.1"],
      ["react-dom", "react-dom@19.3.1_react@19.3.1"],
      ["@vitejs/plugin-react", "@vitejs+plugin-react@6.2.1_"],
      ["@types/react", "@types+react@19.2.17"],
      ["@types/react-dom", "@types+react-dom@19.2.3_"],
    ],
    vue3: [
      ["vue", "vue@3.5.44"],
      ["@vitejs/plugin-vue", "@vitejs+plugin-vue@6.0.10_vite@8.3.5_"],
      ["vue-tsc", "vue-tsc@3.3.14_"],
    ],
    solid: [
      ["solid-js", "solid-js@1.9.14"],
      ["vite-plugin-solid", "vite-plugin-solid@2.11.14_"],
    ],
    lit: [["lit", "lit@3.3.3"]],
    jquery: [
      ["jquery", "jquery@4.0.0"],
      ["@types/jquery", "@types+jquery@4.0.1"],
    ],
    riot: [
      ["riot", "riot@10.1.6"],
      ["@riotjs/compiler", "@riotjs+compiler@10.0.4"],
      ["rollup-plugin-riot", "rollup-plugin-riot@10.0.0_"],
    ],
    astro: [
      ["astro", "astro@7.4.7_"],
      ["@astrojs/check", "@astrojs+check@0.9.10_"],
    ],
    svelte: [
      ["svelte", "svelte@5.57.3_"],
      ["@sveltejs/vite-plugin-svelte", "@sveltejs+vite-plugin-svelte@7.3.1_"],
      ["svelte-check", "svelte-check@4.7.8_"],
    ],
  }[framework] ?? [];

if (frameworkPackages.length) {
  const storeRoot = path.join(root, "node_modules/.pnpm"),
    storeEntries = await readdir(storeRoot);

  for (const [packageName, storePrefix] of frameworkPackages) {
    const storeEntry = storeEntries.find((entry) => entry.startsWith(storePrefix));

    assert(storeEntry, `Workspace package store entry missing: ${storePrefix}`);

    const packagePath = path.join(projectDir, "node_modules", ...packageName.split("/")),
      storePath = path.join(storeRoot, storeEntry, "node_modules", ...packageName.split("/"));

    await mkdir(path.dirname(packagePath), { recursive: true });
    await symlink(storePath, packagePath, "dir");
  }
}

const tscPath = path.join(path.dirname(require.resolve("typescript")), "../bin/tsc"),
  vitePath = path.join(vitePackageRoot, "bin/vite.js");

if (framework === "astro") {
  const astroManifest = JSON.parse(await readFile(path.join(projectDir, "node_modules/astro/package.json"), "utf8")),
    astroBin = typeof astroManifest.bin === "string" ? astroManifest.bin : astroManifest.bin.astro;

  execFileSync(process.execPath, [path.join(projectDir, "node_modules/astro", astroBin), "check"], {
    cwd: projectDir,
    stdio: "inherit",
  });
  execFileSync(process.execPath, [path.join(projectDir, "node_modules/astro", astroBin), "build"], {
    cwd: projectDir,
    stdio: "inherit",
  });
} else if (framework === "vue3") {
  const vueTscManifest = JSON.parse(await readFile(path.join(projectDir, "node_modules/vue-tsc/package.json"), "utf8")),
    vueTscBin = typeof vueTscManifest.bin === "string" ? vueTscManifest.bin : vueTscManifest.bin["vue-tsc"];

  execFileSync(process.execPath, [path.join(projectDir, "node_modules/vue-tsc", vueTscBin), "--noEmit"], {
    cwd: projectDir,
    stdio: "inherit",
  });
} else if (framework === "svelte") {
  const svelteCheckManifest = JSON.parse(
      await readFile(path.join(projectDir, "node_modules/svelte-check/package.json"), "utf8"),
    ),
    svelteCheckBin =
      typeof svelteCheckManifest.bin === "string" ? svelteCheckManifest.bin : svelteCheckManifest.bin["svelte-check"];

  execFileSync(
    process.execPath,
    [path.join(projectDir, "node_modules/svelte-check", svelteCheckBin), "--tsconfig", "./tsconfig.json"],
    {
      cwd: projectDir,
      stdio: "inherit",
    },
  );
} else {
  execFileSync(process.execPath, [tscPath, "--project", path.join(projectDir, "tsconfig.json")], {
    stdio: "inherit",
  });
}

if (framework !== "astro") {
  execFileSync(process.execPath, [vitePath, "build"], { cwd: projectDir, stdio: "inherit" });
}

const distDirectory = path.join(projectDir, "dist"),
  server = createServer(async (request, response) => {
    const pathname = decodeURIComponent(new URL(request.url ?? "/", "http://localhost").pathname),
      filePath = path.resolve(distDirectory, `.${pathname === "/" ? "/index.html" : pathname}`);

    if (pathname === "/favicon.ico") {
      response.writeHead(204).end();
      return;
    }

    if (!filePath.startsWith(`${distDirectory}${path.sep}`)) {
      response.writeHead(403).end();
      return;
    }

    try {
      const content = await readFile(filePath),
        extension = path.extname(filePath),
        mime =
          { ".css": "text/css", ".html": "text/html", ".js": "text/javascript" }[extension] ??
          "application/octet-stream";

      response.writeHead(200, { "content-type": mime }).end(content);
    } catch {
      response.writeHead(404).end();
    }
  });

await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
const address = server.address();

assert(address && typeof address === "object");

const browser = await puppeteer.launch({
  executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  headless: true,
  pipe: true,
});

let browserErrors = [],
  browserConsoleErrors = [];

try {
  const page = await browser.newPage();

  page.on("pageerror", (error) => browserErrors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") browserConsoleErrors.push(message.text());
  });
  await page.goto(`http://127.0.0.1:${address.port}/`, { waitUntil: "networkidle0" });
  await page
    .waitForFunction(() => document.querySelectorAll("canvas").length === 1, { timeout: 15_000 })
    .catch(() => {
      throw new Error(
        `Expected one canvas; page errors: ${JSON.stringify(browserErrors)}; console errors: ${JSON.stringify(browserConsoleErrors)}`,
      );
    });
} finally {
  await browser.close();
  await new Promise((resolve, reject) => server.close((error) => (error ? reject(error) : resolve())));
}

assert.deepEqual(browserErrors, []);
assert.deepEqual(browserConsoleErrors, []);

const result = {
  framework,
  template: "scaffold",
  projectDependencies: projectManifest.dependencies,
  distributionArchives: [...packages],
  archiveMethod: "tar archives of built dist package contents; devDependencies omitted from extracted consumer tree",
  toolchain: {
    node: process.version,
    typescript: JSON.parse(await readFile(path.join(projectDir, "node_modules/typescript/package.json"), "utf8"))
      .version,
    vite: JSON.parse(await readFile(path.join(projectDir, "node_modules/vite/package.json"), "utf8")).version,
    source: "workspace-installed build tools symlinked into the isolated consumer",
  },
  typecheck: "pass",
  productionBuild: "pass",
  browser: "Chrome headless; generated CLI scaffold initialized one canvas",
  browserErrors,
  browserConsoleErrors,
  temporary,
};

await writeFile(outputPath, `${JSON.stringify(result, null, 2)}\n`);
console.log(JSON.stringify(result, null, 2));
