import { readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { execFileSync, execSync } from "node:child_process";
import { resolve, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const root = resolve(__dirname, "..");

const modifiedFiles = [];

// ── 1. Sync root package.json version with engine ──
const enginePkg = JSON.parse(readFileSync(join(root, "engine", "package.json"), "utf-8"));
const rootPkgPath = join(root, "package.json");
const rootPkg = JSON.parse(readFileSync(rootPkgPath, "utf-8"));
const engineVersion = enginePkg.version;

if (rootPkg.version !== engineVersion) {
  const oldVersion = rootPkg.version;
  rootPkg.version = engineVersion;
  writeFileSync(rootPkgPath, `${JSON.stringify(rootPkg, null, 2)}\n`, "utf-8");
  console.log(`  📝 Root package.json: ${oldVersion} → ${engineVersion}`);
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

// ── 2b. Regenerate lockfile to reflect restored workspace:* specifiers ──
if (modifiedFiles.length > 0) {
  console.log("\n🔄 Regenerating lockfile...");
  execSync("pnpm install --no-frozen-lockfile", { cwd: root, stdio: "inherit" });
}

// ── 3. Create single commit with version bumps + fixes ──
const tagVersion = engineVersion;

execSync("git add -A", { cwd: root, stdio: "inherit" });

const hasNewChanges = execSync("git diff --cached --name-only", { cwd: root, encoding: "utf-8" }).trim();
if (hasNewChanges || modifiedFiles.length > 0) {
  console.log(`\n📦 Creating single commit and tag for ${tagVersion}...`);

  execSync(`git commit -m "chore(release): published new version"`, { cwd: root, stdio: "inherit" });
  execFileSync("git", ["tag", "-a", `v${tagVersion}`, "-m", `v${tagVersion}`], { cwd: root, stdio: "pipe" });

  console.log(`   ✅ Commit and tag v${tagVersion} created.`);
} else {
  console.log("✅ No changes to commit.");
}

// ── 4. Push branch and tag ──
const branch = execSync("git rev-parse --abbrev-ref HEAD", { cwd: root, encoding: "utf-8" }).trim();
console.log(`\n🚀 Pushing branch ${branch} and tag v${tagVersion}...`);
execSync(`git push origin ${branch}`, { cwd: root, stdio: "inherit" });
execSync(`git push origin v${tagVersion}`, { cwd: root, stdio: "inherit" });
console.log(`   ✅ Branch ${branch} and tag v${tagVersion} pushed.`);
