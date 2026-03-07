---
phase: 01-core-stabilization
plan: 02
subsystem: utils
tags: [deepExtend, utils, security, tests]

# Dependency graph
requires:
  - phase: 01-core-stabilization
    provides: core utilities stability
provides:
  - hardened deepExtend implementation that avoids prototype pollution and adds a shallow-merge fast-path
affects: [engine utils consumers, tests]

# Tech tracking
tech-stack:
  added: []
  patterns: [defensive merging, test-first verification]

key-files:
  created: ["utils/tests/src/tests/deepExtend.test.ts"]
  modified: ["engine/src/Utils/Utils.ts"]

key-decisions:
  - "Avoided prototype/constructor/prototype copying and added shallow-merge fast-path for performance"

patterns-established:
  - "Always filter dangerous keys when merging external data"

requirements-completed: [CORE-02]

# Metrics
duration: 5min
completed: 2026-03-01
---

# Phase 01-core-stabilization Plan 02: deepExtend hardening summary

deepExtend hardened to ignore prototype/constructor keys to prevent prototype pollution and a shallow-merge
fast-path was added to improve common-case performance; unit tests were added to verify behavior and edge cases.

## Performance

- **Duration:** 5 min
- **Started:** 2026-03-01T20:24:00Z
- **Completed:** 2026-03-01T20:29:00Z
- **Tasks:** 2
- **Files modified:** 2

## Accomplishments

- Added Vitest tests covering nested merges, arrays, prototype/constructor safety, and null/undefined handling
- Patched engine/src/Utils/Utils.ts to filter dangerous keys and include a shallow-merge fast-path

## Task Commits

Each task was committed atomically:

1. **Task 1: Add tests for deepExtend edge cases** - `2f5add76f4` (test)
2. **Task 2: Patch deepExtend to avoid proto/constructor copying** - `c52c592e70` (fix)

**Plan metadata:** `pending` (docs commit follows)

## Files Created/Modified

- `utils/tests/src/tests/deepExtend.test.ts` - Vitest tests for deepExtend edge cases
- `engine/src/Utils/Utils.ts` - deepExtend implementation hardened against prototype pollution and optimized

## Decisions Made

None - followed plan as specified.

## Deviations from Plan

None - plan executed as written.

## Issues Encountered

While running the workspace test command, other test suites failed due to unresolved package imports (@tsparticles/engine) in the utils/tests package environment. The verification for this plan targeted the deepExtend test specifically and that test passed when run in isolation.

## User Setup Required

None

## Next Phase Readiness

Core utilities hardened; ready for downstream integration and CI verification.

## Self-Check

FOUND: engine/src/Utils/Utils.ts
FOUND: utils/tests/src/tests/deepExtend.test.ts
FOUND: commit 2f5add76f4
FOUND: commit c52c592e70

## Self-Check: PASSED
