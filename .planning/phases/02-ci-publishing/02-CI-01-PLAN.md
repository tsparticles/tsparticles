---
phase: 02-ci-publishing
plan: 01
type: execute
wave: 1
depends_on: []
files_modified:
  - .github/workflows/ci-build.yml
  - scripts/ci/check-build-workflow.js
  - package.json
autonomous: true
requirements:
  - PUBLISH-01
user_setup: []
must_haves:
  truths:
    - "CI builds bundles deterministically when run in the CI environment"
    - "Build workflow produces build artifacts (bundle files) accessible to later publish steps"
    - "CI workflow triggers on push to main and for pull requests"
  artifacts:
    - path: ".github/workflows/ci-build.yml"
      provides: "GitHub Actions workflow that builds all library bundles and stores artifacts"
    - path: "scripts/ci/check-build-workflow.js"
      provides: "Automated validation script that sanity-checks the workflow and basic build commands"
  key_links:
    - from: ".github/workflows/ci-build.yml"
      to: "package.json"
      via: "build script / nx build commands"
      pattern: "nx run|nx run-many|pnpm --filter"
---

<objective>
Create a repeatable CI build pipeline that builds the project's bundles and produces artifacts suitable for later publishing.

Purpose: CI must produce deterministic build artifacts so publishing can be automated and releases are reproducible.
Output: .github/workflows/ci-build.yml, scripts/ci/check-build-workflow.js, minimal package.json script adjustments if necessary.
</objective>

<context>
@.planning/ROADMAP.md
@.planning/REQUIREMENTS.md
@.planning/codebase/CONVENTIONS.md
</context>

<tasks>

<task type="auto">
  <name>Task 1: Add validation script for CI build workflow</name>
  <files>scripts/ci/check-build-workflow.js</files>
  <action>
    Create a small Node.js script at scripts/ci/check-build-workflow.js that:
    - Verifies .github/workflows/ci-build.yml exists
    - Parses the YAML (use a tiny JS YAML parser or regex) and asserts presence of a job with a build step that invokes nx or package.json build scripts
    - Checks that an upload-artifact step is present (artifact name includes "bundles" or "dist")
    - Exit code 0 on success, non-zero on failure. Keep script dependency-free (vanilla Node) or use a single dev-dep if already present in package.json.
    Reason: provides a fast automated verification that workflow contains required steps without running full builds in the plan verification loop.
  </action>
  <verify>
    <automated>node scripts/ci/check-build-workflow.js || true</automated>
  </verify>
  <done>The file scripts/ci/check-build-workflow.js exists and `node scripts/ci/check-build-workflow.js` returns 0 when the expected workflow file and keys are present.</done>
</task>

<task type="auto">
  <name>Task 2: Add GitHub Actions CI build workflow</name>
  <files>.github/workflows/ci-build.yml, package.json</files>
  <action>
    Create .github/workflows/ci-build.yml with a simple, clear workflow:
    - triggers: push to main, pull_request
    - jobs.build: uses ubuntu-latest, sets up Node (use .nvmrc or Node 18), installs deps with pnpm, runs a deterministic build step that runs pnpm exec nx run-many --target=build --all --parallel=false (or `pnpm --filter ./... run build` if workspace uses that pattern), and uploads artifacts named `bundles-<commit>` containing the dist outputs (e.g., dist/* or packages/*/dist).
    - Keep the workflow minimal and well-documented in comments.
    If package.json needs a `build:ci` script to unify bundle builds, add it.
    Note: Do NOT attempt to run the workflow here; plan verification uses the check script from Task 1.
  </action>
  <verify>
    <automated>node scripts/ci/check-build-workflow.js</automated>
  </verify>
  <done>The workflow file exists, the CI validation script reports success, and package.json contains any added `build:ci` script if required.</done>
</task>

</tasks>

<verification>
Run the validation script to assert the workflow contains the expected build job and artifact step. This plan's verification is structural (workflow correctness) rather than executing full builds.
</verification>

<success_criteria>
- .github/workflows/ci-build.yml exists and contains a build job that runs Nx or workspace build scripts
- scripts/ci/check-build-workflow.js passes when executed
- Build artifacts are named/uploaded by the workflow (upload-artifact step present)
</success_criteria>

<output>
After completion, create `.planning/phases/02-ci-publishing/02-CI-01-SUMMARY.md`
</output>
