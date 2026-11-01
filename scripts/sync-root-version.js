import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");

/**
 * Aligns the root package.json version with the engine one, which is the release version.
 * @returns {undefined | { oldVersion: string, newVersion: string, path: string }} The applied change, if any.
 */
export function syncRootVersion() {
  const enginePkg = JSON.parse(readFileSync(join(root, "engine", "package.json"), "utf-8"));
  const rootPkgPath = join(root, "package.json");
  const rootPkg = JSON.parse(readFileSync(rootPkgPath, "utf-8"));

  if (rootPkg.version === enginePkg.version) {
    return undefined;
  }

  const oldVersion = rootPkg.version;

  rootPkg.version = enginePkg.version;
  writeFileSync(rootPkgPath, `${JSON.stringify(rootPkg, null, 2)}\n`, "utf-8");

  return { oldVersion, newVersion: enginePkg.version, path: rootPkgPath };
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const result = syncRootVersion();

  if (result) {
    console.log(`📝 Root package.json: ${result.oldVersion} → ${result.newVersion}`);
  }
}
