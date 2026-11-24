import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { createServer } from "node:http";
import { cp, mkdir, mkdtemp, readFile, writeFile, symlink } from "node:fs/promises";
import { createRequire } from "node:module";
import { tmpdir } from "node:os";
import path from "node:path";
import { pathToFileURL } from "node:url";
import puppeteer from "puppeteer";

const root = process.cwd(),
  temporary = await mkdtemp(path.join(tmpdir(), "v5-cli-scaffold-")),
  projectDir = path.join(temporary, "project"),
  outputPath = path.join(root, ".planning/handovers/evidence/e10/cli-scaffold.json"),
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

const scaffoldModule = await import(pathToFileURL(path.join(root, "cli/commands/create-app/dist/scaffold.js")));

await scaffoldModule.createAppProject({
  destination: projectDir,
  framework: "vanilla",
  projectName: "v5-e10-scaffold",
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
  await cp(entry.directory, packageDirectory, { recursive: true });
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

const tscPath = path.join(path.dirname(require.resolve("typescript")), "../bin/tsc"),
  vitePath = path.join(vitePackageRoot, "bin/vite.js");

execFileSync(process.execPath, [tscPath, "--project", path.join(projectDir, "tsconfig.json")], { stdio: "inherit" });
execFileSync(process.execPath, [vitePath, "build"], { cwd: projectDir, stdio: "inherit" });

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
  await page.waitForFunction(() => document.querySelectorAll("canvas").length === 1, { timeout: 15_000 });
} finally {
  await browser.close();
  await new Promise((resolve, reject) => server.close((error) => (error ? reject(error) : resolve())));
}

assert.deepEqual(browserErrors, []);
assert.deepEqual(browserConsoleErrors, []);

const result = {
  framework: "vanilla",
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
