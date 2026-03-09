---
phase: 01-core-stabilization
plan: 09
summary: "Add bundle determinism verification script and CI wiring"
---

# Phase 01-core-stabilization Plan 09: Bundle determinism check

One-liner: Add a simple repeat-build script that rebuilds bundles twice and compares outputs to detect nondeterminism.

What changed

- Added: scripts/verify-bundle-determinism.sh (executable)
- Modified: .github/workflows/nodejs.yml to run the determinism check
- Commit: 0a466ac89e (feat add script), 59802249a2 (ci wiring)

Verification

- Script exists and is executable: test -f scripts/verify-bundle-determinism.sh && test -x scripts/verify-bundle-determinism.sh
- Workflow contains reference: grep -n "verify-bundle-determinism" .github/workflows/nodejs.yml
- Recommended: run ./scripts/verify-bundle-determinism.sh locally (may be slow)

Notes

- The script uses pnpm run build:ci and may require network and build tooling; CI will run it in the same environment.
