#!/bin/bash
# =============================================================================
# run-template.sh — Scaffold and preview a tsParticles template
#
# Usage:
#   ./scripts/run-template.sh [template] [framework]
#
# Examples:
#   ./scripts/run-template.sh confetti vanilla
#   ./scripts/run-template.sh particles react
#   ./scripts/run-template.sh tictactoe svelte
#   ./scripts/run-template.sh               # defaults: confetti + vanilla
#
# What it does:
#   1. Runs `prebuild` on the template to sync workspace versions into
#      template.json
#   2. Copies the scaffold + use-case template files to /tmp/
#   3. Replaces {{projectName}}, {{packageName}}, {{version}} placeholders
#   4. Merges dependencies from template.json into package.json, rewriting
#      every @tsparticles/* dep to use pnpm's `link:` protocol pointing at
#      the local copy in the workspace
#   5. Runs `pnpm install` in the temp project (so linked packages are
#      resolved)
#   6. Starts `pnpm dev --host` so you can open the result in a browser
# =============================================================================
set -euo pipefail

TEMPLATE="${1:-confetti}"
FRAMEWORK="${2:-vanilla}"

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
TARGET_DIR="/tmp/tsparticles-template-test-${TEMPLATE}-${FRAMEWORK}"
PROJECT_NAME="tsparticles-app"
PACKAGE_NAME="tsparticles-app"

echo "============================================================"
echo "  Template:  $TEMPLATE"
echo "  Framework: $FRAMEWORK"
echo "  Target:    $TARGET_DIR"
echo "============================================================"

# ---- 1. Prebuild (sync versions into template.json) -------------
echo ""
echo "==> Updating template.json versions (prebuild)..."
pnpm --filter "@tsparticles/template-scaffold" run prebuild 2>&1
pnpm --filter "@tsparticles/template-${TEMPLATE}" run prebuild 2>&1

# ---- 2. Read versions -------------------------------------------
ENGINE_VERSION=$(node -p "require('${ROOT_DIR}/engine/package.json').version")
echo "    Engine version: ${ENGINE_VERSION}"

# ---- 3. Prepare target directory --------------------------------
rm -rf "$TARGET_DIR"
mkdir -p "$TARGET_DIR"

# ---- 4. Build a map of @tsparticles/* → local path ---------------
build_pkg_map() {
  node -e "
    const fs = require('fs');
    const path = require('path');
    const dirs = ['bundles','plugins','shapes','updaters','interactions','effects','paths','presets','wrappers','integrations','utils'];
    let map = {};
    for (const d of dirs) {
      try {
        for (const sub of fs.readdirSync(d)) {
          const pj = path.join(d, sub, 'package.json');
          try {
            const pkg = JSON.parse(fs.readFileSync(pj, 'utf-8'));
            if (pkg.name && pkg.name.startsWith('@tsparticles/')) {
              map[pkg.name] = path.join('${ROOT_DIR}', d, sub);
            }
          } catch(e) {}
        }
      } catch(e) {}
    }
    const eng = JSON.parse(fs.readFileSync(path.join('${ROOT_DIR}', 'engine', 'package.json'), 'utf-8'));
    map[eng.name] = path.join('${ROOT_DIR}', 'engine');
    console.log(JSON.stringify(map));
  "
}

echo "==> Building package map..."
PKG_MAP=$(build_pkg_map)

# ---- 5. Copy scaffold + use-case files, replace placeholders ----
copy_and_replace() {
  local src="$1" dst="$2"
  if [ ! -d "$src" ]; then
    echo "    [SKIP] $src (not found)"
    return
  fi
  echo "    Copying $src → $dst"
  mkdir -p "$dst"
  for entry in "$src"/*; do
    local name
    name=$(basename "$entry")
    if [ "$name" = "gitignore" ]; then
      name=".gitignore"
    fi
    if [ -d "$entry" ]; then
      copy_and_replace "$entry" "$dst/$name"
    else
      local content
      content=$(sed \
        -e "s/{{projectName}}/${PROJECT_NAME}/g" \
        -e "s/{{packageName}}/${PACKAGE_NAME}/g" \
        -e "s/{{version}}/${ENGINE_VERSION}/g" \
        "$entry")
      echo "$content" > "$dst/$name"
    fi
  done
}

SCAFFOLD_ROOT="${ROOT_DIR}/templates/scaffold"
UC_ROOT="${ROOT_DIR}/templates/${TEMPLATE}"

echo ""
echo "==> Copying scaffold template..."
copy_and_replace "${SCAFFOLD_ROOT}/template/${FRAMEWORK}" "$TARGET_DIR"

echo ""
echo "==> Copying use-case template (${TEMPLATE})..."
copy_and_replace "${UC_ROOT}/template/${FRAMEWORK}" "$TARGET_DIR"

# ---- 6. Merge dependencies from template.json -------------------
echo ""
echo "==> Merging dependencies..."

TMP_DEPS=$(mktemp)
echo '{"dependencies":{},"devDependencies":{}}' > "$TMP_DEPS"

merge_json_deps() {
  local tpl_root="$1"
  local tpl_json="${tpl_root}/template.json"
  if [ ! -f "$tpl_json" ]; then return; fi
  node -e "
    const fs = require('fs');
    const base = JSON.parse(fs.readFileSync('${TMP_DEPS}', 'utf-8'));
    const tmpl = JSON.parse(fs.readFileSync('${tpl_json}', 'utf-8')).package || {};
    const merged = {
      dependencies: { ...base.dependencies, ...(tmpl.dependencies || {}) },
      devDependencies: { ...base.devDependencies, ...(tmpl.devDependencies || {}) },
    };
    fs.writeFileSync('${TMP_DEPS}', JSON.stringify(merged));
  "
}

merge_json_deps "$SCAFFOLD_ROOT"
merge_json_deps "$UC_ROOT"

# ---- 7. Rewrite package.json with linked deps -------------------
echo ""
echo "==> Writing package.json with local link: deps..."

PKG_MAP="$PKG_MAP" node -e "
  const fs = require('fs');
  const path = require('path');

  // Read current package.json
  const pkgPath = path.join('${TARGET_DIR}', 'package.json');
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));

  // Read merged deps
  const merged = JSON.parse(fs.readFileSync('${TMP_DEPS}', 'utf-8'));
  const pkgMap = JSON.parse(process.env.PKG_MAP || '{}');

  // Helper: resolve @tsparticles/* to link: protocol
  function resolveDep(name, version) {
    if (!name.startsWith('@tsparticles/')) return version;
    const localPath = pkgMap[name];
    if (localPath) {
      // Use absolute path with link: protocol
      return 'link:' + path.resolve(localPath);
    }
    return version; // fallback to original version
  }

  // Add merged deps to package.json
  const deps = pkg.dependencies || {};
  const devDeps = pkg.devDependencies || {};

  for (const [k, v] of Object.entries(merged.dependencies || {})) {
    deps[k] = resolveDep(k, v);
  }
  for (const [k, v] of Object.entries(merged.devDependencies || {})) {
    devDeps[k] = resolveDep(k, v);
  }

  pkg.dependencies = deps;
  pkg.devDependencies = devDeps;

  fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');
  console.log('  Updated: ' + pkgPath);
" 2>&1

rm -f "$TMP_DEPS"

echo ""
echo "==> Generated package.json:"
head -50 "${TARGET_DIR}/package.json" | grep -E '"(name|dependenc|devDependenc|@tsparticles/)' | sed 's/^/  /'

# ---- 8. Install dependencies ------------------------------------
echo ""
echo "==> Installing dependencies..."
cd "$TARGET_DIR" && pnpm install 2>&1 | tail -5

# ---- 9. Start dev server ---------------------------------------
echo ""
echo "============================================================"
echo "  Starting dev server for ${TEMPLATE} / ${FRAMEWORK}"
echo "  Target: ${TARGET_DIR}"
echo "============================================================"
echo ""
cd "$TARGET_DIR" && pnpm dev --host
