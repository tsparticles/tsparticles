#!/usr/bin/env bash
set -euo pipefail

# Simple verification script to run the bundle build twice and compare outputs
# Exits 0 when bundles are identical, non-zero otherwise.

ROOT_DIR=$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)
OUT1=$(mktemp -d)
OUT2=$(mktemp -d)

echo "Running deterministic bundle check..."
pushd "$ROOT_DIR" >/dev/null

# Build bundles into OUT1 and OUT2 using slimbuild:ci which produces outputs in dist/bundles or similar
pnpm run build:ci --silent

# Find bundle output directory (best-effort)
if [ -d "dist" ]; then
  rsync -a dist/ "$OUT1/"
else
  # fallback: capture package bundle outputs under bundles/*
  mkdir -p "$OUT1"
  rsync -a bundles/ "$OUT1/" || true
fi

# Clean and rebuild to second dir
git clean -fdx
pnpm install --silent
pnpm run build:ci --silent

if [ -d "dist" ]; then
  rsync -a dist/ "$OUT2/"
else
  rsync -a bundles/ "$OUT2/" || true
fi

echo "Comparing bundle outputs..."
diff -r "$OUT1" "$OUT2" || {
  echo "Bundle outputs differ"
  exit 2
}

echo "Bundles deterministic"
exit 0
