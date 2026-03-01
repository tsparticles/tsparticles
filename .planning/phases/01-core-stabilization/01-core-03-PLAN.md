---
phase: 01-core-stabilization
plan: 03
type: execute
wave: 2
depends_on: [01, 02]
files_modified:
  - utils/tests/src/tests/fixtures/canvas-fixtures.ts
  - utils/tests/package.json
autonomous: true
requirements:
  - TEST-01
must_haves:
  truths:
    - "Canvas/jsdom test fixtures run deterministically in CI"
    - "Test runner configuration for canvas fixtures is stable across environments"
    - "CI runs test:ci without intermittent failures related to fixtures"
  artifacts:
    - path: "utils/tests/src/tests/fixtures/canvas-fixtures.ts"
      provides: "stable fixtures for canvas-based unit tests"
  key_links:
    - from: "utils/tests/src/tests/fixtures/canvas-fixtures.ts"
      to: "utils/tests/package.json"
      via: "vitest configuration and test scripts"
---

<objective>
Stabilize canvas/jsdom fixtures used by utils tests so TEST-01 passes reliably in CI.

Purpose: Flaky canvas fixtures cause non-deterministic test failures. This plan adds stable fixtures and a CI-friendly setup so tests run consistently.
Output: fixtures file updates and small test harness adjustments.
</objective>

<context>
@.planning/REQUIREMENTS.md
@.planning/ROADMAP.md
@.planning/research/PITFALLS.md
</context>

<tasks>

<task type="auto">
  <name>Task 1: Add deterministic canvas fixtures</name>
  <files>utils/tests/src/tests/fixtures/canvas-fixtures.ts</files>
  <action>
    Create or update fixtures to initialize a headless canvas with deterministic size, seedable RNG, and explicit devicePixelRatio. Export setup/teardown helpers for tests to call. Avoid network or system-dependent resources.
  </action>
  <verify>
    <automated>pnpm --filter @tsparticles/tests test -- "utils/tests/src/tests/fixtures/canvas-fixtures.ts" || true</automated>
  </verify>
  <done>Fixtures file exists and can be imported by other tests; running the fixture test file executes (may initially fail until consumers updated).</done>
</task>

<task type="auto">
  <name>Task 2: Configure test:ci to run with stable environment</name>
  <files>utils/tests/package.json</files>
  <action>
    Ensure package.json test:ci script uses `vitest run --threads=1 --maxConcurrency=2` (or similar) to reduce flakiness, and sets NODE_ENV=test. Add a note in README on running canvas tests locally.
  </action>
  <verify>
    <automated>pnpm --filter @tsparticles/tests run test:ci || true</automated>
  </verify>
  <done>CI test script updated, and local invocation runs (initially may surface failures to fix in later iterations).</done>
</task>

</tasks>

<verification>
Run `pnpm --filter @tsparticles/tests run test:ci` locally; observe reduced flakiness. This plan focuses on fixtures and runner config; follow-up may be needed if tests still show flakiness.
</verification>

<success_criteria>
- fixtures file present and imported by at least one test
- test:ci script updated in utils/tests/package.json
- Basic run of test:ci completes (may still fail if additional test fixes required)
</success_criteria>

<output>
After completion, create `.planning/phases/01-core-stabilization/01-core-03-SUMMARY.md`
</output>
