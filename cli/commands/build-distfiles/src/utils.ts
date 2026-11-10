import { copyFile, mkdir, readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import klaw from "klaw";
import path from "node:path";

/**
 * @param value - The value
 * @param version - The version
 * @returns -
 */
function resolveWorkspaceVersion(value: string, version: string): string {
  if (!value.startsWith("workspace:")) {
    return value;
  }

  const spec = value.slice("workspace:".length);

  if (!spec || spec === "*") {
    return version;
  }

  if (spec === "^" || spec === "~") {
    return `${spec}${version}`;
  }

  return spec;
}

/**
 * @param deps - The deps
 * @param version - The version
 * @returns -
 */
function resolveDeps(deps: Record<string, string>, version: string): Record<string, string> {
  return Object.fromEntries(
    Object.entries(deps).map(([name, value]) => [
      name,
      resolveWorkspaceVersion(value, version),
    ]),
  );
}

interface PackageInfo {
  dependencies?: Record<string, string>;
  peerDependencies?: Record<string, string>;
  publishConfig?: { directory?: string };
  version: string;
}

interface PreparedManifest {
  contents: string;
  distPath: string;
  version: string;
}

/**
 * @param basePath - The package directory
 * @param ci - Whether the build is running in CI
 * @param silent - Whether to suppress informational logs
 * @returns The resolved package manifest and distribution path
 */
async function prepareManifest(basePath: string, ci: boolean, silent: boolean): Promise<PreparedManifest> {
  const pkgInfo = JSON.parse((await readFile(path.join(basePath, "package.json"))).toString()) as PackageInfo,
    libPackage = path.join(basePath, "package.dist.json"),
    text = (await readFile(libPackage)).toString(),
    libObj = JSON.parse(text) as Record<string, unknown>;

  libObj["version"] = pkgInfo.version;

  if (pkgInfo.dependencies) {
    libObj["dependencies"] = resolveDeps(pkgInfo.dependencies, pkgInfo.version);
  }

  if (pkgInfo.peerDependencies) {
    libObj["peerDependencies"] = resolveDeps(pkgInfo.peerDependencies, pkgInfo.version);
  }

  const jsonIndent = 2,
    contents = `${JSON.stringify(libObj, undefined, jsonIndent)}\n`;

  if (!ci && contents !== text) {
    await writeFile(libPackage, contents, "utf8");
  }

  if (!silent) {
    console.info(`package.dist.json ${ci ? "prepared" : "updated"} for version ${pkgInfo.version}`);
  }

  return {
    contents,
    distPath: path.join(basePath, pkgInfo.publishConfig?.directory ?? "dist"),
    version: pkgInfo.version,
  };
}

/**
 * @param basePath - The package directory
 * @param distPath - The distribution directory
 */
async function copyRootFiles(basePath: string, distPath: string): Promise<void> {
  for (const file of ["LICENSE", "README.md"]) {
    await copyFile(path.join(basePath, file), path.join(distPath, file));
  }
}

/**
 * @param basePath - The package directory
 * @param distPath - The distribution directory
 */
async function copyInstallScript(basePath: string, distPath: string): Promise<void> {
  const scriptsPath = path.join(basePath, "scripts"),
    distScriptsPath = path.join(distPath, "scripts");

  if (!existsSync(scriptsPath) || existsSync(distScriptsPath)) {
    return;
  }

  await mkdir(distScriptsPath, { recursive: true });

  const installPath = path.join(scriptsPath, "install.js");

  if (existsSync(installPath)) {
    await copyFile(installPath, path.join(distScriptsPath, "install.js"));
  }
}

/**
 * @param distPath - The distribution directory
 * @param version - The package version
 */
async function replaceVersionPlaceholders(distPath: string, version: string): Promise<void> {
  for await (const file of klaw(distPath)) {
    if (file.stats.isDirectory() || ![".js", ".mjs", ".cjs"].includes(path.extname(file.path))) {
      continue;
    }

    const contents = await readFile(file.path, "utf8"),
      updatedContents = contents.replaceAll("__VERSION__", `"${version}"`);

    if (updatedContents !== contents) {
      await writeFile(file.path, updatedContents, "utf8");
    }
  }
}

/**
 * @param distPath - The distribution directory
 */
async function writeModuleTypeFiles(distPath: string): Promise<void> {
  await writeFile(path.join(distPath, "cjs", "package.json"), `{ "type": "commonjs" }`);
  await writeFile(path.join(distPath, "esm", "package.json"), `{ "type": "module" }`);
  await writeFile(path.join(distPath, "browser", "package.json"), `{ "type": "module" }`);
}

/**
 * @param basePath - The basePath
 * @param silent - The silent
 * @returns true if the dist files process was successful
 */
export async function buildDistFiles(basePath: string, silent: boolean, ci = false): Promise<boolean> {
  if (!silent) {
    console.info("Build - started on dist files");
  }

  let res: boolean;

  try {
    const { contents, distPath, version } = await prepareManifest(basePath, ci, silent);

    await copyRootFiles(basePath, distPath);
    await writeFile(path.join(distPath, "package.json"), contents, "utf8");
    await copyInstallScript(basePath, distPath);
    await replaceVersionPlaceholders(distPath, version);

    /* for await (const file of klaw(path.join(distPath, "cjs"))) {
            await fs.rename(file.path, file.path.replace(/\.js$/, ".cjs"));
        }

        for await (const file of klaw(path.join(distPath, "esm"))) {
            await fs.rename(file.path, file.path.replace(/\.js$/, ".mjs"));
        } */

    await writeModuleTypeFiles(distPath);

    res = true;
  } catch (e) {
    console.error(e);

    res = false;
  }

  if (!silent) {
    console.info("Build - done on dist files");
  }

  return res;
}
