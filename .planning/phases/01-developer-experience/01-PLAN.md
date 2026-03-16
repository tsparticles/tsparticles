---
phase: 01-developer-experience
plan: 01
type: execute
wave: 1
depends_on: []
files_modified:
  - .planning/phases/01-developer-experience/01-PLAN.md
  - demo/vanilla/README.md
  - .nvmrc
  - scripts/check-setup.sh
  - utils/tests/src/tests/quickstart.test.ts
autonomous: true
requirements: [DEV-01, DEV-02]
user_setup: []
must_haves:
  truths:
    - "A new contributor can install the workspace with pnpm and run the demo with the documented command"
    - "A concise quickstart README exists in `demo/vanilla` explaining how to run the demo and where to find examples"
    - "Automated smoke test(s) exist that assert the demo start script and quickstart docs are present"
  artifacts:
    - path: "demo/vanilla/README.md"
      provides: "Quickstart + example usage"
    - path: "scripts/check-setup.sh"
      provides: "Local smoke-check script for basic dev environment"
    - path: "utils/tests/src/tests/quickstart.test.ts"
      provides: "Automated check that demo start script & README exist"
  key_links:
    - from: "demo/vanilla/README.md"
      to: "engine/src/index.ts"
      via: "import examples in demo referencing engine package"
      pattern: "import .*from '../..*/engine'"
---

<objective>
Make it trivial for a new contributor to install and run the demo (Phase 1: Developer Experience & Docs - quickstart slice).

Purpose: reduce onboarding friction by documenting and verifying the minimum local setup needed to run demos.
Output: demo quickstart README, small check script, and an automated smoke test that validates the presence of start script + docs.
</objective>

<context>
Uses project-level roadmap and requirements: `.planning/REQUIREMENTS.md` (DEV-01, DEV-02). No additional phase CONTEXT.md present.
Executor can run local commands (pnpm, node) and write files under demo/ and utils/tests/.
</context>

<tasks>

<task type="auto" tdd="true">
  <name>Task 1: Add quick automated smoke test (RED)</name>
  <files>utils/tests/src/tests/quickstart.test.ts</files>
  <behavior>
    - Test 1: Read `demo/vanilla/package.json` and assert a `start` script or `dev` script exists
    - Test 2: Read `demo/vanilla/README.md` and assert it contains the words "quickstart" or "run the demo"
  </behavior>
  <action>
    Create `utils/tests/src/tests/quickstart.test.ts` using Vitest. The test should synchronously read files and assert expectations above. Keep tests deterministic and filesystem-only (no network).
    Rationale: Establish a fast, automatable check-before-change so Planner/Executor can verify quickstart behavior.
  </action>
  <verify>
    <automated>pnpm exec vitest run utils/tests/src/tests/quickstart.test.ts</automated>
  </verify>
  <done>Test file exists and `pnpm exec vitest run` returns exit code 0 for the new test when the expected files are present</done>
</task>

<task type="auto">
  <name>Task 2: Create quickstart docs + check script (GREEN)</name>
  <files>demo/vanilla/README.md, .nvmrc, scripts/check-setup.sh</files>
  <action>
    - Create or update `demo/vanilla/README.md` with a short quickstart: prerequisites (Node >= 18, pnpm), `pnpm i`, `pnpm --filter demo/vanilla start` (or repo-specific start command), and where to find example code.
    - Add `.nvmrc` with recommended Node version `18` to help standardize contributor environments.
    - Add `scripts/check-setup.sh`: shell script that prints `node -v`, `pnpm -v`, and checks `demo/vanilla/package.json` for a `start` or `dev` script; exit non-zero if not satisfied.
    - Keep changes minimal and documented in file header comments explaining why they exist.
    Note: Using `start` script conventions avoids editing root package.json; prefer editor-friendly docs and a local script to avoid wide changes.
  </action>
  <verify>
    <automated>pnpm exec vitest run utils/tests/src/tests/quickstart.test.ts</automated>
  </verify>
  <done>Quickstart README exists, `.nvmrc` present, `scripts/check-setup.sh` exits 0 on a healthy dev environment, and the quickstart test passes</done>
</task>

</tasks>

<verification>
Planner verification: run the smoke test and ensure files exist. `pnpm exec vitest run utils/tests/src/tests/quickstart.test.ts` must pass.
</verification>

<success_criteria>

- Quickstart README committed and readable at `demo/vanilla/README.md`.
- `.nvmrc` present at repo root.
- `scripts/check-setup.sh` executable and returns 0 on healthy developer machine.
- Automated test passes via Vitest command above.
  </success_criteria>

<output>
After completion, create `.planning/phases/01-developer-experience/01-PLAN-SUMMARY.md`
</output>
