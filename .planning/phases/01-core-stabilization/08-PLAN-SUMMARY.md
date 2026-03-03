---
phase: 01-core-stabilization
plan: 08
summary: "Add CI enforcement to run workspace unit tests in nodejs workflow"
---

# Phase 01-core-stabilization Plan 08: Run test:ci in CI

One-liner: Ensure workspace unit tests (utils/tests) are executed in CI via test:ci so regressions fail early.

What changed

- Modified: .github/workflows/nodejs.yml
- Commit: 59802249a2 (ci(bundles): add repeat-build determinism check to nodejs workflow) and earlier commit for test:ci step

Verification

- The workflow now contains a step that runs: pnpm --filter @tsparticles/tests run test:ci
- Grep check: grep -n "--filter @tsparticles/tests run test:ci" .github/workflows/nodejs.yml

How to run locally

- From repo root: pnpm --filter @tsparticles/tests run test:ci

Notes

- Keep an eye on CI run times; adjust concurrency flags in utils/tests/package.json if necessary.
