import { spawn } from "node:child_process";
import { readdirSync, existsSync, readFileSync, mkdirSync, rmSync } from "node:fs";
import { availableParallelism } from "node:os";
import { join, relative } from "node:path";

const ROOT = process.cwd();
const OUTPUT_DIR = join(ROOT, "release-artifacts");
const SKIPPED_PATH_PREFIXES = ["demo", "utils/tests"];
const SKIPPED_DIR_NAMES = new Set([".git", "node_modules", "dist", "release-artifacts"]);
const DEFAULT_CONCURRENCY = Math.max(1, Math.min(8, availableParallelism()));
const ZIP_CONCURRENCY = Math.max(1, Number.parseInt(process.env.ZIP_CONCURRENCY ?? "", 10) || DEFAULT_CONCURRENCY);

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
    if (!entry.isDirectory()) {
      continue;
    }

    if (SKIPPED_DIR_NAMES.has(entry.name)) {
      continue;
    }

    const fullPath = join(dir, entry.name);
    const relativePath = relative(ROOT, fullPath).replace(/\\/g, "/");

    // Ignore excluded trees entirely (demo/** and utils/tests/**).
    if (SKIPPED_PATH_PREFIXES.some((prefix) => relativePath === prefix || relativePath.startsWith(`${prefix}/`))) {
      continue;
    }

    const packageJsonPath = join(fullPath, "package.json");

    if (existsSync(packageJsonPath)) {
      packages.push(fullPath);
    }

    // Continue searching nested folders
    packages.push(...findPackages(fullPath));
  }

  return packages;
}

/**
 * Create a zip from a dist folder
 */
function createZip(distPath, outputZipPath) {
  console.log(`📦 Creating ${outputZipPath}`);

  return new Promise((resolve, reject) => {
    const child = spawn("zip", ["-r", outputZipPath, "."], {
      cwd: distPath,
      stdio: "inherit",
    });

    child.on("error", (error) => {
      reject(error);
    });

    child.on("close", (code) => {
      if (code === 0) {
        resolve();

        return;
      }

      reject(new Error(`zip command failed with exit code ${code} for ${outputZipPath}`));
    });
  });
}

async function runWithConcurrency(items, concurrency, worker) {
  let index = 0;

  async function runWorker() {
    while (true) {
      const currentIndex = index;

      index += 1;

      if (currentIndex >= items.length) {
        return;
      }

      await worker(items[currentIndex]);
    }
  }

  await Promise.all(Array.from({ length: Math.min(concurrency, items.length) }, () => runWorker()));
}

// 🔍 Find all packages in repo
const allPackages = findPackages(ROOT);
const zipJobs = [];

for (const pkgPath of allPackages) {
  const distPath = join(pkgPath, "dist");
  const packageJsonPath = join(pkgPath, "package.json");

  // Skip if no dist folder
  if (!existsSync(distPath)) continue;

  const pkgJson = JSON.parse(readFileSync(packageJsonPath, "utf-8"));

  const normalizedName = pkgJson.name
    .replace(/^@[^/]+\//, "") // remove scope if present
    .replace(/\//g, "-"); // safety

  const name = normalizedName.startsWith("tsparticles") ? normalizedName : `tsparticles-${normalizedName}`;

  const version = pkgJson.version;

  const zipName = `${name}-${version}.zip`;
  const zipPath = join(OUTPUT_DIR, zipName);

  zipJobs.push({
    distPath,
    zipPath,
  });
}

console.log(`⚙️ Packaging ${zipJobs.length} artifacts with concurrency ${ZIP_CONCURRENCY}`);

await runWithConcurrency(zipJobs, ZIP_CONCURRENCY, ({ distPath, zipPath }) => createZip(distPath, zipPath));

console.log("✅ All package archives created successfully.");
