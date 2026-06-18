import { readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { execSync } from "node:child_process";
import { resolve, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const root = resolve(__dirname, "..");

const modifiedFiles = [];

// ── 0. Ensure working tree is clean before we start ──
const status = execSync("git status --porcelain", { cwd: root, encoding: "utf-8" }).trim();
if (status) {
  console.error("❌ Working tree is not clean. Commit or stash changes before running this script.");
  process.exit(1);
}

// ── 1. Sync root package.json version with engine ──
const enginePkg = JSON.parse(readFileSync(join(root, "engine", "package.json"), "utf-8"));
const rootPkgPath = join(root, "package.json");
const rootPkg = JSON.parse(readFileSync(rootPkgPath, "utf-8"));
const engineVersion = enginePkg.version;

if (rootPkg.version !== engineVersion) {
  rootPkg.version = engineVersion;
  writeFileSync(rootPkgPath, `${JSON.stringify(rootPkg, null, 2)}\n`, "utf-8");
  console.log(`  📝 Root package.json: ${rootPkg.version} → ${engineVersion}`);
  modifiedFiles.push(rootPkgPath);
}

// ── 2. Restore workspace:* deps that lerna may have hardcoded ──
const workspaceYaml = readFileSync(join(root, "pnpm-workspace.yaml"), "utf-8");
const packagesStart = workspaceYaml.search(/^packages:\n/m);
const nextSection = workspaceYaml.search(/\n\S[^\n]*:/);
const packagesContent =
  packagesStart < 0
    ? ""
    : workspaceYaml.slice(
        packagesStart + "packages:\n".length,
        nextSection < 0 ? workspaceYaml.length : nextSection
      );
const patterns = [...packagesContent.matchAll(/^\s+-\s+(.+)$/gm)].map(m => m[1]);

const pkgJsonFiles = [];

for (const pattern of patterns) {
  if (pattern.includes("*")) {
    const baseDir = join(root, pattern.replace(/\*.*$/, ""));
    if (!statSync(baseDir, { throwIfNoEntry: false })) continue;
    const entries = readdirSync(baseDir, { withFileTypes: true });
    for (const e of entries) {
      if (!e.isDirectory()) continue;
      const p = join(baseDir, e.name, "package.json");
      if (statSync(p, { throwIfNoEntry: false })) pkgJsonFiles.push(p);

      if (pattern.includes("/*")) {
        const subDir = join(baseDir, e.name);
        const subEntries = readdirSync(subDir, { withFileTypes: true });
        for (const sub of subEntries) {
          if (!sub.isDirectory()) continue;
          const sp = join(subDir, sub.name, "package.json");
          if (statSync(sp, { throwIfNoEntry: false })) pkgJsonFiles.push(sp);
        }
      }
    }
  } else {
    const p = join(root, pattern, "package.json");
    if (statSync(p, { throwIfNoEntry: false })) pkgJsonFiles.push(p);
  }
}

const unique = [...new Set(pkgJsonFiles)].filter(f => !f.includes("/dist/"));

for (const f of unique) {
  const pkg = JSON.parse(readFileSync(f, "utf-8"));
  let fileChanged = false;

  for (const depType of ["dependencies", "devDependencies", "peerDependencies"]) {
    const deps = pkg[depType];
    if (!deps) continue;
    for (const [k, v] of Object.entries(deps)) {
      if (k.startsWith("@tsparticles/") && v !== "workspace:*") {
        deps[k] = "workspace:*";
        fileChanged = true;
        console.log(`  🔧 ${f.replace(root, "")} [${depType}]: ${k} "${v}" → "workspace:*"`);
      }
    }
  }

  if (fileChanged) {
    writeFileSync(f, `${JSON.stringify(pkg, null, 2)}\n`, "utf-8");
    modifiedFiles.push(f);
  }
}

// ── 3. Amend lerna's commit with our fixes and relocate the tag ──
if (modifiedFiles.length > 0) {
  const tag = execSync("git describe --tags --abbrev=0", { cwd: root, encoding: "utf-8" }).trim();

  execSync(`git add ${modifiedFiles.join(" ")}`, { cwd: root, stdio: "inherit" });
  execSync("git commit --amend --no-edit", { cwd: root, stdio: "inherit" });
  execSync(`git tag -d ${tag}`, { cwd: root, stdio: "pipe" });
  execSync(`git tag -a ${tag} -m ${tag}`, { cwd: root, stdio: "pipe" });

  console.log(`\n✅ Lerna commit amended with workspace:* fixes.`);
  console.log(`   Tag ${tag} relocated to the amended commit.`);
} else {
  console.log("✅ No fixes needed — all @tsparticles/ deps use workspace:* and root version matches.");
}
