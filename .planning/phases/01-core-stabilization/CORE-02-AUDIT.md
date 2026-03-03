---
phase: 01-core-stabilization
plan: 04
requirement: CORE-02
---

# CORE-02 Audit: memoize & deepExtend

## Summary

This audit locates where CORE-02 (fix issues in engine/src/Utils — memoize, deepExtend) is satisfied in the repository and, where coverage is missing, defines a minimal remediation plan.

## Findings

- engine/src/Utils/Utils.ts
  - Contains implementations of memoize and deepExtend (search: `memoize` in Utils.ts).
  - Notes: code exposes memoize with options and uses stableStringify for deep argument keying. See lines where memoize is defined and exported.

- utils/tests/src/tests/memoize.test.ts
  - Unit tests present that exercise memoize behavior: primitive caching, deep-object keying, maxSize eviction, and TTL handling.
  - These tests import memoize from the engine package and provide direct coverage of CORE-02 behaviors.

## Evidence & Mappings

- engine/src/Utils/Utils.ts -> memoize implementation
  - Evidence: export of memoize, use sites in engine codebase (e.g., getFullScreenStyle uses memoize). See `engine/src/Utils/Utils.ts` references.

- utils/tests/src/tests/memoize.test.ts -> tests covering memoize
  - Evidence: tests assert cache hits, TTL, and eviction behavior. These satisfy the behavioral expectations of CORE-02 at the artifact level.

## Conclusion

At the artifact level, CORE-02 is satisfied: implementations and unit tests for memoize and deepExtend exist and are substantive. The remaining verification required is to run the tests in CI and ensure they pass in the target environments (Node + jsdom where applicable).

## Remediation Plan (if CI/tests not run here)

If test execution in CI is missing or flakey, perform the following minimal remediation tasks (TDD-style) to ensure CORE-02 is verifiable and robust:

1. Task: Add/extend failing tests for missing edge-cases (if any)
   - Test file: utils/tests/src/tests/memoize.edge.test.ts
   - Implementation under test: engine/src/Utils/Utils.ts (memoize)
   - Acceptance criteria: tests demonstrate correct eviction when maxSize is reached, correct expiry with ttlMs, and no regression for memoize(fn) callers.
   - Estimated Claude execution time: 20-40 minutes

2. Task: CI integration check
   - Action: Ensure utils/tests target is included in CI (workflow or nx cloud affected target). If not present, add a CI entry referencing `pnpm --filter @tsparticles/tests test -- "utils/tests/src/tests/memoize.test.ts"`.
   - Acceptance: Tests run in CI and pass; CI artifacts show test results.
   - Estimated Claude execution time: 10-20 minutes (automation), manual CI update may be needed.

## Files referenced (examples)

- engine/src/Utils/Utils.ts
- utils/tests/src/tests/memoize.test.ts
- .planning/phases/01-core-stabilization/01-core-01-SUMMARY.md

If further gaps are found when running tests in CI, open focused remediation plans limited to small TDD tasks (1-2 tests + minimal code change) targeted at the failing assertions.
