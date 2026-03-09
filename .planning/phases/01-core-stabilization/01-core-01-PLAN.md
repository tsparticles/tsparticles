---
phase: 01-core-stabilization
plan: 01
type: tdd
wave: 1
depends_on: []
files_modified:
  - engine/src/Utils/Utils.ts
  - utils/tests/src/tests/memoize.test.ts
  - utils/tests/package.json
autonomous: true
requirements:
  - CORE-02
  - CORE-01
user_setup: []
must_haves:
  truths:
    - "Memoize behaviour is correct for primitive and object args (cache hit/miss observable)"
    - "Memoize will not grow unbounded (supports optional max-size or TTL)"
    - "Unit tests for memoize exist and run in CI/test runner"
  artifacts:
    - path: "engine/src/Utils/Utils.ts"
      provides: "memoize function implementation"
    - path: "utils/tests/src/tests/memoize.test.ts"
      provides: "unit tests that assert memoize correctness and bounded cache behaviour"
  key_links:
    - from: "utils/tests/src/tests/memoize.test.ts"
      to: "engine/src/Utils/Utils.ts"
      via: "import { memoize } from '../../../../engine/src/Utils/Utils.js'"
      pattern: "memoize\(" 
---

<objective>
Stabilize and harden the `memoize` utility in engine/src/Utils/Utils.ts using a test-first (TDD) approach.

Purpose: memoize is used across hot paths; unbounded caches and brittle keying have been flagged in research. This plan creates failing tests, implements a bounded, backward-compatible memoize, and proves behavior with unit tests so downstream work can rely on it.
Output: engine/src/Utils/Utils.ts (updated), utils/tests/src/tests/memoize.test.ts (new tests), package script adjustments if needed.
</objective>

<context>
@.planning/REQUIREMENTS.md
@.planning/ROADMAP.md
@.planning/research/SUMMARY.md
@engine/src/Utils/Utils.ts
</context>

<tasks>

<task type="auto" tdd="true">
  <name>Task 1: Add failing tests for memoize (RED)</name>
  <files>utils/tests/src/tests/memoize.test.ts</files>
  <behavior>
    - Test 1: memoize(fn) returns cached value for same primitive args
    - Test 2: memoize(fn) differentiates object args by deep key (not by reference only)
    - Test 3: bounded cache evicts older entries when maxSize reached
    - Test 4: cache can be cleared if API exposes a clear() helper (optional)
  </behavior>
  <action>
    Create a Vitest test file at utils/tests/src/tests/memoize.test.ts containing the above tests. Keep tests focused: require the memoize export from engine/src/Utils/Utils.js (Esm import path). Do not modify production code in this task. Commit the tests so they run (they will initially fail).
  </action>
  <verify>
    <automated>pnpm --filter @tsparticles/tests test -- "utils/tests/src/tests/memoize.test.ts" || true</automated>
  </verify>
  <done>The new test file exists and the test runner executes the file (expected: failing tests present).</done>
</task>

<task type="auto" tdd="true">
  <name>Task 2: Implement bounded, backward-compatible memoize (GREEN)</name>
  <files>engine/src/Utils/Utils.ts</files>
  <action>
    Modify memoize in engine/src/Utils/Utils.ts to preserve the existing function signature where possible but accept an optional options object: { maxSize?: number, ttlMs?: number, keyFn?: (args) => string }.
    Implementation notes:
    - Default behavior must remain the same for callers that pass only a function.
    - Use a simple LRU-like eviction based on insertion order when maxSize is set.
    - Avoid JSON.stringify-heavy keys by allowing a keyFn; default to a safer keyer that handles primitives and shallow objects (fall back to stable stringify for deep objects).
    - Add a small internal Map cache and optional timestamps for ttlMs eviction.
    - Add comments referencing research (.planning/research/PITFALLS.md) explaining tradeoffs.
    - Keep changes minimal and well-typed; export any helper types if needed.
  </action>
  <verify>
    <automated>pnpm --filter @tsparticles/tests test -- "utils/tests/src/tests/memoize.test.ts"</automated>
  </verify>
  <done>All memoize tests pass and new implementation exposes optional options (maxSize/ttlMs) while previous call sites that used memoize(fn) continue to function.</done>
</task>

</tasks>

<verification>
Run the memoize-specific test file; tests must pass locally. The plan passes verification if the memoize tests are green and there is a small doc comment in Utils.ts describing the new options.
</verification>

<success_criteria>
- memoize tests pass: `pnpm --filter @tsparticles/tests test utils/tests/src/tests/memoize.test.ts` returns 0
- engine/src/Utils/Utils.ts contains the bounded cache implementation and an exported type or JSDoc describing options
- No public API breaking changes for simple memoize(fn) callers
</success_criteria>

<output>
After completion, create `.planning/phases/01-core-stabilization/01-core-01-SUMMARY.md`
</output>
