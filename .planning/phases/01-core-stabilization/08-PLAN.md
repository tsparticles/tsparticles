---
phase: 01-core-stabilization
plan: 08
type: execute
wave: 1
depends_on: []
files_modified:
  - .github/workflows/nodejs.yml
autonomous: true
requirements: [TEST-01]
user_setup: []
must_haves:
  truths:
    - "CI runs the workspace unit tests (utils tests) as part of the nodejs workflow"
    - "A failing unit test causes the CI job to exit non-zero"
  artifacts:
    - path: ".github/workflows/nodejs.yml"
      provides: "CI job that runs pnpm --filter @tsparticles/tests run test:ci"
  key_links:
    - from: ".github/workflows/nodejs.yml"
      to: "utils/tests/"
      via: "pnpm --filter @tsparticles/tests run test:ci"
      pattern: "test:ci|--filter @tsparticles/tests"
---

<objective>
Add CI enforcement to run the workspace unit tests (pnpm --filter @tsparticles/tests run test:ci) in the repository's Node.js workflow so unit regressions fail CI.

Purpose: Ensure TEST-01 (unit tests enforced in CI) is validated by running the test:ci script during CI runs.
Output: Updated .github/workflows/nodejs.yml with an explicit step to run the utils test:ci script and a PLAN summary.
</objective>

<context>
The verifier reported that CI runs bundle-size checks but does not run the workspace unit tests. This small gap plan adds a single CI step and verifies presence.
</context>

<tasks>

<task type="auto">
  <name>Task 1: Add unit-test step to CI workflow</name>
  <files>.github/workflows/nodejs.yml</files>
  <action>
    Edit .github/workflows/nodejs.yml to add a job step after build/install that runs:
      pnpm --filter @tsparticles/tests run test:ci
    The step should use the existing Node matrix, run on the same runner, and upload test artifacts/logs when the job fails for debugging. Keep changes minimal and add comments describing the reason.
    Commit with message: "ci(tests): run workspace unit tests in nodejs workflow"
  </action>
  <verify>
    <automated>grep -n "--filter @tsparticles/tests run test:ci" .github/workflows/nodejs.yml || true</automated>
  </verify>
  <done>CI workflow updated; the workflow file contains the test:ci step and is committed.</done>
</task>

<task type="auto">
  <name>Task 2: Create PLAN summary and sanity-check CI step</name>
  <files>.planning/phases/01-core-stabilization/08-PLAN-SUMMARY.md</files>
  <action>
    Create a short summary file listing the change, the modified workflow, the commit hash, and verification instructions for maintainers (how to run the step locally). Commit the summary.
  </action>
  <verify>
    <automated>test -f .planning/phases/01-core-stabilization/08-PLAN-SUMMARY.md && echo OK || echo MISSING</automated>
  </verify>
  <done>Summary file exists and documents the CI change and verification steps.</done>
</task>

</tasks>

<verification>
After implementing tasks, ensure git commits exist for the workflow change and that the test command appears in the workflow file. Recommend running the test:ci locally once before pushing.
</verification>

<success_criteria>

- .github/workflows/nodejs.yml contains the test:ci step
- .planning/phases/01-core-stabilization/08-PLAN-SUMMARY.md exists and is committed
  </success_criteria>

<output>
After completion, create `.planning/phases/01-core-stabilization/08-PLAN-SUMMARY.md`
</output>
