import { execSync } from "node:child_process";
import { readdirSync, existsSync, readFileSync, mkdirSync, rmSync } from "node:fs";
import { join } from "node:path";

const ROOT = process.cwd();
const OUTPUT_DIR = join(ROOT, "release-artifacts");

// Clean output directory
rmSync(OUTPUT_DIR, { recursive: true, force: true });
mkdirSync(OUTPUT_DIR, { recursive: true });

/**
 * Recursively find all directories containing a package.json
 */
function findPackages(dir) {
  const entries = readdirSync(dir, { withFileTypes: true });
  const packages = [];

  for (const entry of entries) {
    const fullPath = join(dir, entry.name);

    if (entry.isDirectory()) {
      const packageJsonPath = join(fullPath, "package.json");

      if (existsSync(packageJsonPath)) {
        packages.push(fullPath);
      }

      // Continue searching nested folders
      packages.push(...findPackages(fullPath));
    }
  }

  return packages;
}

/**
 * Create a zip from a dist folder
 */
function createZip(distPath, outputZipPath) {
  console.log(`📦 Creating ${outputZipPath}`);

  execSync(`cd "${distPath}" && zip -r "${outputZipPath}" .`, {
    stdio: "inherit",
  });
}

// 🔍 Find all packages in repo
const allPackages = findPackages(ROOT);

for (const pkgPath of allPackages) {
  const distPath = join(pkgPath, "dist");
  const packageJsonPath = join(pkgPath, "package.json");

  // Skip if no dist folder
  if (!existsSync(distPath)) continue;

  const pkgJson = JSON.parse(readFileSync(packageJsonPath, "utf-8"));

  const name = pkgJson.name
    .replace(/^@[^/]+\//, "") // remove scope if present
    .replace(/\//g, "-"); // safety

  const version = pkgJson.version;

  const zipName = `${name}-${version}.zip`;
  const zipPath = join(OUTPUT_DIR, zipName);

  createZip(distPath, zipPath);
}

console.log("✅ All package archives created successfully.");
