---
phase: 01-fix-tests
plan: 01
status: completed
verified: 2026-03-01T21:05:00Z
---

# Summary — Fix tests: remove unsupported --threads flag

What I changed

- Updated utils/tests/package.json test:ci script to remove unsupported `--threads` option. New value: `NODE_ENV=test vitest run --maxConcurrency=2`.

Why

- Vitest CLI rejected `--threads` (CACError: Unknown option `--threads`). Removing it allows the test runner to start; concurrency remains controlled via `--maxConcurrency`.

Verification

- Executed: `pnpm --filter @tsparticles/tests run test:ci` from repo root.
- Result: Vitest started and ran 8 test files; 136 tests passed. Coverage report printed with v8 provider.

Next steps

- Consider searching the monorepo for other occurrences of `--threads` and update similarly (done in this plan).
- Optionally update ROADMAP/STATE to mark phase work complete.

Log

- 2026-03-01T21:00Z — Edited utils/tests/package.json, removed `--threads`.
- 2026-03-01T21:02Z — Ran pnpm script; all tests passed in that package.
