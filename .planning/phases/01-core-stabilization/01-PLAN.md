---
phase: 01-core-stabilization
plan: 01
type: execute
wave: 1
depends_on: []
files_modified:
  - utils/tests/src/tests/Memoize.test.ts
  - utils/tests/src/tests/DeepExtend.test.ts
  - utils/tests/src/Fixture/CanvasFixture.ts
  - engine/src/Utils/memoize.ts
  - engine/src/Utils/deepExtend.ts
autonomous: true
requirements: [CORE-01, TEST-01]
user_setup: []
must_haves:
  truths:
    - "Unit tests covering core utilities (memoize, deepExtend) exist and pass locally"
    - "Deterministic canvas fixtures are available for jsdom-based tests"
    - "CI will run the same tests (CI wiring in separate plan)"
  artifacts:
    - path: "utils/tests/src/tests/Memoize.test.ts"
      provides: "Behavioral tests for memoize: cache hits, ttl, maxSize"
    - path: "utils/tests/src/tests/DeepExtend.test.ts"
      provides: "Tests for deepExtend merging behavior and edge-cases"
    - path: "utils/tests/src/Fixture/CanvasFixture.ts"
      provides: "Deterministic canvas fixture helpers used by engine tests"
  key_links:
    - from: "utils/tests/src/tests/*.test.ts"
      to: "engine/src/Utils/*"
      via: "import { memoize } from 'engine/src/Utils/memoize'"
      pattern: "memoize\(|deepExtend\("

---

<objective>
Stabilize core utility behavior with TDD and reliable fixtures so downstream work has a trustworthy foundation.

Purpose: Ensure core helpers (memoize, deepExtend) behave correctly under edge cases and are covered by deterministic tests.
Output: Tests (utils/tests/src/tests/_) and small fixes in engine/src/Utils/_; deterministic canvas fixture helper.
</objective>

<execution_context>
@.planning/PROJECT.md
@.planning/REQUIREMENTS.md
@.planning/ROADMAP.md
</execution_context>

<context>
Phase: Core Stabilization — Goal: Ensure core runtime is correct and covered by tests (ROADMAP.md)

Use these existing artifacts as references:
@engine/src/
@utils/tests/
</context>

<tasks>

<task type="auto" tdd="true">
  <name>Task 1: TDD — Add failing tests for memoize and deepExtend (RED)</name>
  <files>utils/tests/src/tests/Memoize.test.ts, utils/tests/src/tests/DeepExtend.test.ts</files>
  <behavior>
    - Test 1: memoize caches results; repeated calls with same args call original function once
    - Test 2: memoize respects maxSize by evicting old entries
    - Test 3: memoize respects ttlMs (entry expires after ttl)
    - Test 4: deepExtend merges nested objects without mutating inputs
    - Test 5: deepExtend handles arrays, nulls, and undefined safely
  </behavior>
  <action>
    Create new Vitest test files at the listed paths that assert the behaviors above (start RED — tests may fail until implementation changes). Use existing test utilities and import paths used by the repo (prefer absolute package imports if present). Keep tests focused and deterministic (avoid timers where possible; use mocked timers for ttl checks).
    After adding tests, run the tests to observe failures. Commit the test files as the RED step.
  </action>
  <verify>
    <automated>pnpm exec vitest run utils/tests/src/tests/Memoize.test.ts utils/tests/src/tests/DeepExtend.test.ts</automated>
  </verify>
  <done>Both test files exist and run (may fail initially). Automated command returns non-zero when RED. Files committed.</done>
</task>

<task type="auto" tdd="true">
  <name>Task 2: TDD — Implement minimal fixes to pass tests (GREEN)</name>
  <files>engine/src/Utils/memoize.ts, engine/src/Utils/deepExtend.ts</files>
  <behavior>
    - After implementation, all tests from Task 1 pass
    - memoize exposes options: { maxSize?: number, ttlMs?: number, keyFn?: Function }
    - deepExtend preserves input immutability and merges correctly
  </behavior>
  <action>
    Modify the implementations in the listed files to satisfy tests. Follow project conventions (explicit types, named exports). Keep changes minimal: prefer patching edge cases exposed by tests rather than full rewrites. Run unit tests locally until green. Commit implementation changes with Conventional Commit message: `feat(01-core-stabilization-01): fix memoize/deepExtend to satisfy tests`.
  </action>
  <verify>
    <automated>pnpm exec vitest run utils/tests/src/tests/Memoize.test.ts utils/tests/src/tests/DeepExtend.test.ts --run</automated>
  </verify>
  <done>All tests from Task 1 pass locally (exit 0). Commits created for implementation changes.</done>
</task>

<task type="auto">
  <name>Task 3: Add deterministic canvas fixture for jsdom tests</name>
  <files>utils/tests/src/Fixture/CanvasFixture.ts, utils/tests/vitest.config.ts</files>
  <action>
    Create `CanvasFixture.ts` exporting helpers to create deterministic canvas elements usable in jsdom-based tests (width/height, deterministic 2D context stubs). Update `utils/tests/vitest.config.ts` (or `vitest` config file used in repo) to register fixture globals if needed. Ensure fixture is documented in top of test files.
  </action>
  <verify>
    <automated>pnpm exec vitest run utils/tests/src/tests/DeepExtend.test.ts --run</automated>
  </verify>
  <done>Fixture file exists, tests relying on canvas fixtures pass locally. Config updated and committed.</done>
</task>

</tasks>

<verification>
After implementing tasks, run the full affected test set:

Automated: `pnpm exec vitest --run utils/tests/src/tests/Memoize.test.ts utils/tests/src/tests/DeepExtend.test.ts`

If tests fail in CI only, surface CI logs for diagnosis. Otherwise tests must pass locally.
</verification>

<success_criteria>

- Unit tests for memoize and deepExtend added and passing locally
- Deterministic canvas fixture created and used by tests
- Commits created for tests and implementation changes
- Requirements covered: CORE-01, TEST-01
  </success_criteria>

<output>
After completion, create `.planning/phases/01-core-stabilization/01-PLAN-SUMMARY.md`
</output>
