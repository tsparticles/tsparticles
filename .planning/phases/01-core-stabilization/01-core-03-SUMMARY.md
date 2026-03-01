---
phase: 01-core-stabilization
plan: 03
subsystem: testing
tags: [vitest, jsdom, canvas, fixtures]

# Dependency graph
requires:
  - phase: 01-core-stabilization
    provides: [foundation for stable tests]
provides:
  - stable canvas fixtures for deterministic canvas-based tests
affects: [utils-tests, ci]

# Tech tracking
tech-stack:
  added: [none]
  patterns: [deterministic test fixtures, seedable RNG for tests]

key-files:
  created: [utils/tests/src/tests/fixtures/canvas-fixtures.ts]
  modified: [utils/tests/package.json]

key-decisions:
  - "Use small LCG RNG for deterministic randomness in fixtures"

patterns-established:
  - "Canvas fixtures expose setup/teardown helpers and a stable devicePixelRatio"

requirements-completed: [TEST-01]

# Metrics
duration: 5min
completed: 2026-03-01
---

# Phase 01-core-stabilization Plan 03: Fixtures + test:ci script Summary

Deterministic canvas fixtures with seedable RNG and CI-friendly vitest invocation to reduce flakiness in canvas-based tests.

## Performance

- **Duration:** ~5 min
- **Started:** 2026-03-01T
- **Completed:** 2026-03-01T
- **Tasks:** 2
- **Files modified:** 2

## Accomplishments

- Added deterministic canvas fixtures exporting setup/teardown helpers and a seedable RNG.
- Updated utils/tests/package.json test:ci script to set NODE_ENV=test and use vitest flags to limit concurrency.

## Task Commits

1. **Task 1: Add deterministic canvas fixtures** - `577b66d0e4` (feat)
2. **Task 2: Configure test:ci to run with stable environment** - `0dc83a85c4` (chore)

**Plan metadata:** `N/A`

## Files Created/Modified

- `utils/tests/src/tests/fixtures/canvas-fixtures.ts` - deterministic fixtures and helpers
- `utils/tests/package.json` - adjusted test:ci script

## Decisions Made

- Use an internal LCG RNG (no external deps) for deterministic randomness in tests.

## Deviations from Plan

None - plan executed as specified.

## Issues Encountered

- Vitest in this environment does not support `--threads`; adjusted test flags to use `--maxWorkers`/`--maxConcurrency` alternatives where applicable. The chosen stable flags were compatible with the installed Vitest version.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- Ready for follow-up if tests still flake; next steps: instrument specific failing tests and reduce nondeterminism.

---

_Phase: 01-core-stabilization_
_Completed: 2026-03-01_
