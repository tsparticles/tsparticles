---
phase: 01-core-stabilization
plan: 09
type: execute
wave: 1
depends_on: []
files_modified:
  - .github/workflows/nodejs.yml
  - scripts/verify-bundle-determinism.sh
autonomous: true
requirements: [BUNDLE-01]
user_setup: []
must_haves:
  truths:
    - "A CI/local job exists that builds bundles multiple times and compares outputs to detect non-determinism"
    - "The job fails if bundle outputs differ across repeated builds"
  artifacts:
    - path: "scripts/verify-bundle-determinism.sh"
      provides: "Script that builds bundles twice and compares gzipped sizes / SHA256 of outputs"
    - path: ".github/workflows/nodejs.yml"
      provides: "CI job that runs the determinism check"
  key_links:
    - from: ".github/workflows/nodejs.yml"
      to: "bundles/*/"
      via: "run: ./scripts/verify-bundle-determinism.sh"
      pattern: "verify-bundle-determinism"
---

<objective>
Add a reproducible determinism check for bundle builds. This script builds configured bundles twice in a clean environment, compares gzipped sizes and SHA256 hashes of outputs, and fails if differences are detected. Wire it into CI as a lightweight job.

Purpose: Detect non-determinism in bundle outputs early by adding an automated repeat-build comparison.
Output: scripts/verify-bundle-determinism.sh and a CI workflow job that runs it; PLAN summary.
</objective>

<context>
Bundle determinism is necessary to trust bundle-size budgets and repeatable CI artifacts. This plan creates a simple script and CI wiring to validate determinism.
</context>

<tasks>

<task type="auto">
  <name>Task 1: Add determinism verification script</name>
  <files>scripts/verify-bundle-determinism.sh</files>
  <action>
    Create a shell script at scripts/verify-bundle-determinism.sh that:
    - Runs the project's bundle build (pnpm run slimbuild or the relevant build command) twice into separate temp directories
    - For each bundle file (JS output), compute gzipped size and SHA256 hash
    - Compare results; exit non-zero if any mismatch. Provide clear stdout for debugging.
    Make the script executable and document usage in a comment header. Commit the script.
  </action>
  <verify>
    <automated>test -f scripts/verify-bundle-determinism.sh && echo OK || echo MISSING</automated>
  </verify>
  <done>Script exists, is executable, and documented. Commited.</done>
</task>

<task type="auto">
  <name>Task 2: Wire determinism check into CI workflow</name>
  <files>.github/workflows/nodejs.yml</files>
  <action>
    Update .github/workflows/nodejs.yml to add a job or step that runs ./scripts/verify-bundle-determinism.sh after the bundle build step. Ensure job runs on same runner and uploads artifacts/logs on failure. Commit the workflow change with message: "ci(bundles): add repeat-build determinism check".
  </action>
  <verify>
    <automated>grep -n "verify-bundle-determinism" .github/workflows/nodejs.yml || true</automated>
  </verify>
  <done>CI workflow updated to run determinism script and committed.</done>
</task>

<task type="auto">
  <name>Task 3: Create PLAN summary</name>
  <files>.planning/phases/01-core-stabilization/09-PLAN-SUMMARY.md</files>
  <action>
    Create a short summary file documenting the script, the CI job, verification steps for maintainers, and commit the file.
  </action>
  <verify>
    <automated>test -f .planning/phases/01-core-stabilization/09-PLAN-SUMMARY.md && echo OK || echo MISSING</automated>
  </verify>
  <done>Summary file exists and documents the determinism check and verification steps. Commit created.</done>
</task>

</tasks>

<verification>
Run the script locally to validate determinism: ./scripts/verify-bundle-determinism.sh. If outputs differ, investigate build sources that include non-deterministic content (timestamps, hashes, random salts). CI will run the script and fail if mismatches occur.
</verification>

<success_criteria>

- scripts/verify-bundle-determinism.sh exists and is executable
- CI workflow references and runs the script
- 09-PLAN-SUMMARY.md exists and is committed
  </success_criteria>

<output>
After completion, create `.planning/phases/01-core-stabilization/09-PLAN-SUMMARY.md`
</output>
