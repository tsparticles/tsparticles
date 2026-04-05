import { execSync } from "node:child_process";
import { existsSync, mkdirSync, readdirSync, readFileSync, rmSync } from "node:fs";
import { join, relative } from "node:path";

const ROOT = process.cwd();
const OUTPUT_DIR = join(ROOT, "release-artifacts");
const SKIPPED_PATH_PREFIXES = ["demo", "apps", "utils/tests"];
const SKIPPED_DIR_NAMES = new Set([".git", "node_modules", "dist", "release-artifacts"]);

// Recreate output directory on each run to avoid stale zip files.
rmSync(OUTPUT_DIR, { recursive: true, force: true });
mkdirSync(OUTPUT_DIR, { recursive: true });

function findPackages(dir) {
  const entries = readdirSync(dir, { withFileTypes: true });
  const packages = [];

  for (const entry of entries) {
    if (!entry.isDirectory()) {
      continue;
    }

    if (SKIPPED_DIR_NAMES.has(entry.name)) {
      continue;
    }

    const fullPath = join(dir, entry.name);
    const relativePath = relative(ROOT, fullPath).replaceAll("\\", "/");

    if (SKIPPED_PATH_PREFIXES.some((prefix) => relativePath === prefix || relativePath.startsWith(`${prefix}/`))) {
      continue;
    }

    const packageJsonPath = join(fullPath, "package.json");

    if (existsSync(packageJsonPath)) {
      packages.push(fullPath);
    }

    packages.push(...findPackages(fullPath));
  }

  return packages;
}

function createZip(distPath, outputZipPath) {
  console.log(`Creating ${outputZipPath}`);

  execSync(`cd "${distPath}" && zip -r "${outputZipPath}" .`, {
    stdio: "inherit",
  });
}

const allPackages = findPackages(ROOT);

for (const pkgPath of allPackages) {
  const distPath = join(pkgPath, "dist");
  const packageJsonPath = join(pkgPath, "package.json");

  if (!existsSync(distPath)) {
    continue;
  }

  const pkgJson = JSON.parse(readFileSync(packageJsonPath, "utf-8"));

  const normalizedName = pkgJson.name
    .replace(/^@[^/]+\//, "")
    .replaceAll("/", "-");
  const name = normalizedName.startsWith("tsparticles") ? normalizedName : `tsparticles-${normalizedName}`;

  const zipName = `${name}-${pkgJson.version}.zip`;
  const zipPath = join(OUTPUT_DIR, zipName);

  createZip(distPath, zipPath);
}

console.log("All package archives created successfully.");

