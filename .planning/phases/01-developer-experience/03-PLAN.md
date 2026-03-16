---
phase: 01-developer-experience
plan: 03
type: execute
wave: 2
depends_on: [01, 02]
files_modified:
  - .planning/phases/01-developer-experience/03-PLAN.md
  - utils/tests/src/tests/demo-integration.test.ts
autonomous: true
requirements: [CI-01, CI-02]
user_setup: []
must_haves:
  truths:
    - "CI config ensures `pnpm run build:ci` runs and reports success"
    - "Pre-commit hooks prevent lint and format violations"
  artifacts:
    - path: ".github/workflows/ci.yml"
      provides: "CI pipeline (ensure it runs build & tests)"
    - path: "utils/tests/src/tests/demo-integration.test.ts"
      provides: "A test that runs a headless check against the demo bundle or build output"
  key_links:
    - from: "utils/tests/src/tests/demo-integration.test.ts"
      to: "bundles/slim/"
      via: "Points at bundle artifacts or dev server"
---

<objective>
Add basic CI smoke checks and integrate the quickstart test into the CI pipeline for Phase 1 completion.

Purpose: ensure contributors and CI share the same expectations — builds and basic tests pass in CI.
Output: CI pipeline entry and an integration smoke test that runs in CI.
</objective>

<context>
Depends on Plan 01 and 02 content (quickstart docs and demo). Wave 2 to allow docs and demo to exist before CI verification.
</context>

<tasks>

<task type="auto">
  <name>Task 1: Add demo integration test</name>
  <files>utils/tests/src/tests/demo-integration.test.ts</files>
  <action>
    Create a Vitest test that verifies that the demo build artifacts exist (e.g., `bundles/slim/dist/bundle.js`) or that the demo server responds with 200. Keep test short and deterministic; run using `pnpm exec vitest run <file>`.
  </action>
  <verify>
    <automated>pnpm exec vitest run utils/tests/src/tests/demo-integration.test.ts</automated>
  </verify>
  <done>Integration test exists and passes locally against build artifacts or dev server</done>
</task>

<task type="auto">
  <name>Task 2: Add CI pipeline entry (smoke checks)</name>
  <files>.github/workflows/ci.yml</files>
  <action>
    - If `.github/workflows/ci.yml` does not exist, create a minimal YAML that runs: `pnpm i`, `pnpm run build:ci`, and `pnpm exec vitest` (or targeted tests). If it exists, add a step that runs `pnpm exec vitest run utils/tests/src/tests/demo-integration.test.ts` as a smoke check.
    - Keep the CI job minimal and non-blocking initially (optional `allow_failures: false` recommended for main branch).
  </action>
  <verify>
    <automated>node -e "process.exit(require('fs').existsSync('.github/workflows/ci.yml')?0:1)"</automated>
  </verify>
  <done>CI workflow file present and references build/test steps</done>
</task>

</tasks>

<verification>
Validate CI workflow file exists and run the integration test locally.
</verification>

<success_criteria>

- `.github/workflows/ci.yml` exists and includes build + test steps.
- Demo integration test passes locally.
  </success_criteria>

<output>
After completion, create `.planning/phases/01-developer-experience/03-PLAN-SUMMARY.md`
</output>
