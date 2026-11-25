/* global console, document, process, URL */
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { spawn } from "node:child_process";
import { createServer } from "node:http";
import { cp, mkdir, mkdtemp, readFile, readdir, writeFile, symlink } from "node:fs/promises";
import { existsSync } from "node:fs";
import { createRequire } from "node:module";
import { tmpdir } from "node:os";
import path from "node:path";
import { pathToFileURL } from "node:url";
import puppeteer from "puppeteer";

const framework = process.argv.find((arg) => arg.startsWith("--framework="))?.slice("--framework=".length) ?? "vanilla";

assert(
  [
    "angular",
    "angular-confetti",
    "angular-fireworks",
    "astro",
    "ember",
    "inferno",
    "jquery",
    "lit",
    "nextjs",
    "preact",
    "qwik",
    "react",
    "riot",
    "solid",
    "svelte",
    "stencil",
    "vanilla",
    "vue3",
    "webcomponents",
    "nuxt4",
  ].includes(framework),
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

if (!manifests.has("@tsparticles/preact")) {
  const manifest = JSON.parse(await readFile(path.join(root, "wrappers/preact/package.json"), "utf8"));

  manifests.set(manifest.name, { manifest, directory: path.join(root, "wrappers/preact") });
}

if (!manifests.has("@tsparticles/angular")) {
  const directory = path.join(root, "wrappers/angular/dist/ng-particles"),
    manifest = JSON.parse(await readFile(path.join(directory, "package.json"), "utf8"));

  manifests.set(manifest.name, { manifest, directory });
}

if (!manifests.has("@tsparticles/qwik")) {
  const manifest = JSON.parse(await readFile(path.join(root, "wrappers/qwik/package.json"), "utf8"));

  manifests.set(manifest.name, { manifest, directory: path.join(root, "wrappers/qwik") });
}

if (!manifests.has("@tsparticles/stencil")) {
  const manifest = JSON.parse(await readFile(path.join(root, "wrappers/stencil/package.json"), "utf8"));

  manifests.set(manifest.name, { manifest, directory: path.join(root, "wrappers/stencil") });
}

if (!manifests.has("@tsparticles/ember")) {
  const manifest = JSON.parse(await readFile(path.join(root, "wrappers/ember/package.json"), "utf8"));

  manifests.set(manifest.name, { manifest, directory: path.join(root, "wrappers/ember") });
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
  if (packageName === "@tsparticles/ember") {
    for (const file of ["package.json", "index.js", "addon", "app"]) {
      await cp(path.join(entry.directory, file), path.join(packageDirectory, file), { recursive: true });
    }
  } else if (packageName === "@tsparticles/lit") {
    await cp(path.join(entry.directory, "package.json"), path.join(packageDirectory, "package.json"));
    await cp(path.join(entry.directory, "lib"), path.join(packageDirectory, "lib"), { recursive: true });
  } else if (packageName === "@tsparticles/preact") {
    for (const file of ["package.json", "index.js", "index.d.ts", "cjs", "umd"]) {
      await cp(path.join(entry.directory, file), path.join(packageDirectory, file), { recursive: true });
    }
  } else if (packageName === "@tsparticles/qwik") {
    for (const file of ["package.json", "lib", "lib-types"]) {
      await cp(path.join(entry.directory, file), path.join(packageDirectory, file), { recursive: true });
    }
  } else if (packageName === "@tsparticles/stencil") {
    for (const file of ["package.json", "dist", "loader"]) {
      await cp(path.join(entry.directory, file), path.join(packageDirectory, file), { recursive: true });
    }
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
    ember: [],
    inferno: [],
    preact: [],
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

if (
  [
    "angular",
    "angular-confetti",
    "angular-fireworks",
    "ember",
    "inferno",
    "nextjs",
    "nuxt4",
    "preact",
    "qwik",
    "stencil",
  ].includes(framework)
) {
  const toolchainDirectory = path.join(temporary, "toolchain"),
    localPackageDependencies = Object.fromEntries(
      [...packages].flatMap((packageName) =>
        Object.entries(manifests.get(packageName).manifest.dependencies ?? {}).filter(
          ([name]) => !name.startsWith("@tsparticles/"),
        ),
      ),
    ),
    scaffoldDependencies = Object.fromEntries(
      Object.entries(projectManifest.dependencies ?? {}).filter(([name]) => !name.startsWith("@tsparticles/")),
    ),
    toolchainDependencies = { ...localPackageDependencies, ...scaffoldDependencies },
    toolchainDevDependencies = Object.fromEntries(
      Object.entries(projectManifest.devDependencies ?? {}).filter(([name]) => !name.startsWith("@tsparticles/")),
    );

  await mkdir(toolchainDirectory, { recursive: true });
  await writeFile(
    path.join(toolchainDirectory, "package.json"),
    `${JSON.stringify(
      {
        private: true,
        dependencies: toolchainDependencies,
        devDependencies: toolchainDevDependencies,
      },
      null,
      2,
    )}\n`,
  );
  execFileSync("pnpm", ["install", "--ignore-scripts"], { cwd: toolchainDirectory, stdio: "inherit" });

  for (const packageName of [...Object.keys(toolchainDependencies), ...Object.keys(toolchainDevDependencies)]) {
    if (packageName.startsWith("@tsparticles/")) continue;

    const packagePath = path.join(projectDir, "node_modules", ...packageName.split("/")),
      sourcePath = path.join(toolchainDirectory, "node_modules", ...packageName.split("/"));

    if (existsSync(packagePath)) continue;

    await mkdir(path.dirname(packagePath), { recursive: true });
    await symlink(sourcePath, packagePath, "dir");
  }
}

const tscPath = path.join(path.dirname(require.resolve("typescript")), "../bin/tsc"),
  vitePath = path.join(vitePackageRoot, "bin/vite.js");

if (framework === "ember") {
  const emberManifest = JSON.parse(
      await readFile(path.join(projectDir, "node_modules/ember-cli/package.json"), "utf8"),
    ),
    emberBin = typeof emberManifest.bin === "string" ? emberManifest.bin : emberManifest.bin.ember;

  execFileSync(
    process.execPath,
    [path.join(projectDir, "node_modules/ember-cli", emberBin), "build", "--environment=production"],
    { cwd: projectDir, stdio: "inherit" },
  );
} else if (framework.startsWith("angular")) {
  const angularCliManifest = JSON.parse(
      await readFile(path.join(projectDir, "node_modules/@angular/cli/package.json"), "utf8"),
    ),
    angularCliBin = typeof angularCliManifest.bin === "string" ? angularCliManifest.bin : angularCliManifest.bin["ng"];

  execFileSync(process.execPath, [path.join(projectDir, "node_modules/@angular/cli", angularCliBin), "build"], {
    cwd: projectDir,
    stdio: "inherit",
  });
} else if (framework === "stencil") {
  const stencilManifest = JSON.parse(
      await readFile(path.join(projectDir, "node_modules/@stencil/core/package.json"), "utf8"),
    ),
    stencilBin = typeof stencilManifest.bin === "string" ? stencilManifest.bin : stencilManifest.bin["stencil"];

  execFileSync(process.execPath, [path.join(projectDir, "node_modules/@stencil/core", stencilBin), "build"], {
    cwd: projectDir,
    stdio: "inherit",
  });
} else if (framework === "nextjs") {
  const nextManifest = JSON.parse(await readFile(path.join(projectDir, "node_modules/next/package.json"), "utf8")),
    nextBin = typeof nextManifest.bin === "string" ? nextManifest.bin : nextManifest.bin.next;

  execFileSync(process.execPath, [path.join(projectDir, "node_modules/next", nextBin), "build"], {
    cwd: projectDir,
    stdio: "inherit",
  });
} else if (framework === "nuxt4") {
  const nuxtManifest = JSON.parse(await readFile(path.join(projectDir, "node_modules/nuxt/package.json"), "utf8")),
    nuxtBin = typeof nuxtManifest.bin === "string" ? nuxtManifest.bin : nuxtManifest.bin.nuxt;

  execFileSync(process.execPath, [path.join(projectDir, "node_modules/nuxt", nuxtBin), "build"], {
    cwd: projectDir,
    stdio: "inherit",
  });
} else if (framework === "astro") {
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

if (
  !framework.startsWith("angular") &&
  framework !== "astro" &&
  framework !== "ember" &&
  framework !== "nextjs" &&
  framework !== "nuxt4" &&
  framework !== "stencil"
) {
  execFileSync(process.execPath, [vitePath, "build"], { cwd: projectDir, stdio: "inherit" });
}

const distDirectory = framework.startsWith("angular")
    ? path.join(projectDir, "dist/browser")
    : framework === "stencil"
      ? path.join(projectDir, "www")
      : path.join(projectDir, "dist"),
  isServerRendered = framework === "nextjs" || framework === "nuxt4";
let server, applicationServer, applicationPort, baseUrl;

if (isServerRendered) {
  const portServer = createServer();

  await new Promise((resolve) => portServer.listen(0, "127.0.0.1", resolve));
  const address = portServer.address();

  assert(address && typeof address === "object");
  applicationPort = address.port;
  await new Promise((resolve, reject) => portServer.close((error) => (error ? reject(error) : resolve())));

  if (framework === "nextjs") {
    const nextManifest = JSON.parse(await readFile(path.join(projectDir, "node_modules/next/package.json"), "utf8")),
      nextBin = typeof nextManifest.bin === "string" ? nextManifest.bin : nextManifest.bin.next;

    applicationServer = spawn(process.execPath, [path.join(projectDir, "node_modules/next", nextBin), "start"], {
      cwd: projectDir,
      env: { ...process.env, HOSTNAME: "127.0.0.1", PORT: String(applicationPort) },
      stdio: "inherit",
    });
  } else {
    applicationServer = spawn(process.execPath, [path.join(projectDir, ".output/server/index.mjs")], {
      cwd: projectDir,
      env: {
        ...process.env,
        HOST: "127.0.0.1",
        NITRO_HOST: "127.0.0.1",
        NITRO_PORT: String(applicationPort),
        PORT: String(applicationPort),
      },
      stdio: "inherit",
    });
  }

  baseUrl = `http://127.0.0.1:${applicationPort}/`;

  let ready = false;

  for (let attempt = 0; attempt < 60 && !ready; attempt++) {
    if (applicationServer.exitCode !== null) {
      throw new Error(`${framework} preview server exited with code ${applicationServer.exitCode}`);
    }

    try {
      const response = await fetch(baseUrl);

      ready = response.status < 500;
    } catch {
      await new Promise((resolve) => setTimeout(resolve, 250));
    }
  }

  assert(ready, `${framework} preview server did not become ready`);
} else {
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
  baseUrl = `http://127.0.0.1:${address.port}/`;
}

const browser = await puppeteer.launch({
  executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  headless: true,
  pipe: true,
});

let browserErrors = [],
  browserConsoleErrors = [];

try {
  const page = await browser.newPage();

  page.on("pageerror", (error) => browserErrors.push(error.stack ?? error.message));
  page.on("console", (message) => {
    if (message.type() === "error") browserConsoleErrors.push(message.text());
  });
  await page.goto(baseUrl, { waitUntil: "networkidle0" });
  await page
    .waitForFunction(
      () => {
        let canvases = 0;

        const visit = (root) => {
          for (const element of root.querySelectorAll("*")) {
            if (element instanceof HTMLCanvasElement) canvases++;
            if (element.shadowRoot) visit(element.shadowRoot);
          }
        };

        visit(document);

        return canvases === 1;
      },
      { timeout: 15_000 },
    )
    .catch(() => {
      throw new Error(
        `Expected one canvas; page errors: ${JSON.stringify(browserErrors)}; console errors: ${JSON.stringify(browserConsoleErrors)}`,
      );
    });
} finally {
  await browser.close();
  if (server) {
    await new Promise((resolve, reject) => server.close((error) => (error ? reject(error) : resolve())));
  }
  if (applicationServer) {
    const exited = new Promise((resolve) => applicationServer.once("exit", resolve));

    applicationServer.kill("SIGTERM");
    await Promise.race([
      exited,
      new Promise((resolve) => {
        setTimeout(resolve, 5_000);
      }),
    ]);
  }
}

assert.deepEqual(browserErrors, []);
assert.deepEqual(browserConsoleErrors, []);

const result = {
  framework,
  template: "scaffold",
  projectDependencies: projectManifest.dependencies,
  distributionArchives: [...packages],
  archiveMethod: "tar archives of local package contents; dependencies installed into isolated consumer toolchain",
  toolchain: {
    node: process.version,
    typescript: JSON.parse(await readFile(path.join(projectDir, "node_modules/typescript/package.json"), "utf8"))
      .version,
    vite: JSON.parse(await readFile(path.join(projectDir, "node_modules/vite/package.json"), "utf8")).version,
    source: [
      "angular",
      "angular-confetti",
      "angular-fireworks",
      "ember",
      "inferno",
      "preact",
      "qwik",
      "stencil",
    ].includes(framework)
      ? "framework dependencies installed into a temporary isolated toolchain"
      : "workspace-installed build tools symlinked into the isolated consumer",
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
