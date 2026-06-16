#!/bin/bash
# =============================================================================
# update-template-versions.sh — Sync ALL template.json versions with workspace
#
# Runs every template's prebuild script so their template.json files contain
# the current workspace package versions. Must be called AFTER lerna version
# (or any version bump) to keep template scaffolding in sync.
# =============================================================================
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
TEMPLATES_DIR="${ROOT_DIR}/templates"
FAILED=0

echo "==> Syncing template.json versions across all templates..."

for template_dir in "${TEMPLATES_DIR}"/*/; do
  name=$(basename "$template_dir")
  prebuild="${template_dir}scripts/prebuild.js"

  if [ -f "$prebuild" ]; then
    echo "  [${name}] running prebuild..."
    if ! (cd "$template_dir" && node scripts/prebuild.js 2>&1); then
      echo "  [${name}] FAILED" >&2
      FAILED=$((FAILED + 1))
    fi
  else
    echo "  [${name}] no prebuild script, skipping"
  fi
done

if [ "$FAILED" -gt 0 ]; then
  echo "==> $FAILED template(s) failed to update"
  exit 1
fi

echo "==> All template versions synced successfully"
