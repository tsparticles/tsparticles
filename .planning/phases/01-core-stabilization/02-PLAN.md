---
phase: 01-core-stabilization
plan: 02
type: execute
wave: 1
depends_on: [01]
files_modified:
  - utils/tests/src/tests/BundleSize.test.ts
  - .github/workflows/ci.yml
  - bundles/*/webpack.config.js
autonomous: true
requirements: [BUNDLE-01]
user_setup: []
must_haves:
  truths:
    - "CI enforces bundle size budgets and fails on regression"
    - "Bundle build step runs deterministically in CI"
  artifacts:
    - path: "bundles/*/webpack.config.js"
      provides: "Bundle build configs and size budget hints"
    - path: ".github/workflows/ci.yml"
      provides: "CI job that runs the bundle size check"
  key_links:
    - from: ".github/workflows/ci.yml"
      to: "bundles/*/"
      via: "pnpm run slimbuild / webpack build"
---

<objective>
Add automated bundle size checks to CI to prevent regressions in published bundles.

Purpose: Keep distribution bundles within size budgets (prevent weight creep) and surface regressions early in CI.
Output: CI job and tests that measure bundle sizes and fail if budgets exceeded.
</objective>

<execution_context>
@.planning/PROJECT.md
@.planning/REQUIREMENTS.md
</execution_context>

<context>
This plan depends on Plan 01 (tests and core fixes). It adds CI-level checks that measure bundle sizes produced by existing `bundles/*` configs.
</context>

<tasks>

<task type="auto">
  <name>Task 1: Add bundle size test and budget config</name>
  <files>utils/tests/src/tests/BundleSize.test.ts</files>
  <action>
    Create a test that builds the bundles (using existing build scripts or webpack configs) in a fast, CI-friendly mode and measures output size for configured bundles. Define budgets per bundle (e.g., slim: 50KB gzipped, full: 200KB gzipped). Use `gzip-size` or `brotli-size` to measure compressed size. The test should fail if any bundle exceeds its budget. Keep runtimes reasonable — use single-file builds or reuse existing build artifacts when possible.
  </action>
  <verify>
    <automated>pnpm exec vitest run utils/tests/src/tests/BundleSize.test.ts --run</automated>
  </verify>
  <done>Bundle size test exists and fails when artificially increasing bundle content past budget. Test committed.</done>
</task>

<task type="auto">
  <name>Task 2: CI integration — run bundle size test in GitHub Actions</name>
  <files>.github/workflows/ci.yml</files>
  <action>
    Update CI workflow to run the bundle size tests as a job after building bundles. Ensure job uses Node 18+, caches pnpm store, and uploads artifacts when size check fails for debugging. The CI job should exit non-zero when budgets are exceeded.
  </action>
  <verify>
    <automated>node -e "console.log('CI job updated')" && git --no-pager diff -- .github/workflows/ci.yml | cat
  </automated>
  <done>CI workflow updated and staged for commit. Job integrated into existing pipeline and documented in the plan summary.</done>
</task>

</tasks>

<verification>
Run the bundle size test locally and ensure CI workflow contains the job.

Automated: `pnpm exec vitest --run utils/tests/src/tests/BundleSize.test.ts`
</verification>

<success_criteria>

- Bundle size test exists and reliably detects regressions
- CI workflow updated to run the size check
- Requirement BUNDLE-01 covered
  </success_criteria>

<output>
After completion, create `.planning/phases/01-core-stabilization/02-PLAN-SUMMARY.md`
</output>
