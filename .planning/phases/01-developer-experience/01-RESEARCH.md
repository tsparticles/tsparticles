---
phase: 01-developer-experience
type: research
padded_phase: 01
files_generated: [.planning/phases/01-developer-experience/01-RESEARCH.md]
---

# Research: Phase 01 — Developer Experience & Docs

## Objective

Research how to make it trivial for new contributors to install, build, and run demos for tsParticles. Answer: "What do we need to know to plan Phase 1 well?"

## Inputs

- `.planning/REQUIREMENTS.md` (DEV-01, DEV-02, DOC-01, DOC-02)
- `package.json`, `pnpm-workspace.yaml`, `nx.json`
- Existing docs: `markdown/`, `demo/vanilla/`, `typedoc.json`

## Findings

1. Developer workflow
   - Project uses pnpm workspaces and Nx. Recommended commands: `pnpm i` then `pnpm --filter demo/vanilla start` or `pnpm run slimbuild` for workspace build.
   - Standardize Node version using `.nvmrc` (Node 18 LTS recommended by devDependencies and toolchain).

2. Quickstart and demos
   - `demo/vanilla` contains a demo server; adding a concise `README.md` with copy-paste start commands reduces friction.
   - Provide a minimal static `index.html` example and a short snippet demonstrating `import { tsParticles } from '@tsparticles/engine'` or the bundle script reference.

3. Automated checks
   - Vitest is already available. Add small file-system tests that assert presence of demo files and start script. These tests run fast and are suitable for plan-level verification.

4. Documentation generation
   - Typedoc config exists (`typedoc.json`). Running `pnpm run build:docs` should be tested in CI; failures often stem from missing exports or TS config mismatches.
   - As a mitigation, add a docs smoke check step: run typedoc in a dry-run or `typedoc --version` in CI to verify tooling presence.

5. CI and pre-commit hooks
   - Husky present. Ensure pre-commit hooks are not too strict to block initial contributors; CI should enforce lint/format.

6. Validation architecture
   - Validation for this phase is the ability to run the quickstart smoke test (`utils/tests/src/tests/quickstart.test.ts`) and the docs build step locally and in CI. This will be used later by Nyquist if enabled.

## Recommendations (used by planner)

- Create `demo/vanilla/README.md` with prerequisites and one-line start commands.
- Add `.nvmrc` with Node 18 to standardize environment.
- Add `scripts/check-setup.sh` that verifies `node -v`, `pnpm -v`, and demo package scripts.
- Add filesystem Vitest tests for quickstart presence. Keep tests read-only and deterministic.
- Defer Typedoc fixes to a follow-up plan if `pnpm run build:docs` fails.

## Risks & Mitigations

- Risk: Typedoc build failures due to export mismatches. Mitigation: add a plan to run typedoc and address errors in Phase 2 if necessary.
- Risk: CI initial flakiness. Mitigation: keep CI smoke checks minimal and non-blocking until stable.

## Next steps

1. Planner consumes these recommendations and creates actionable PLAN.md files (already present for quickstart and docs).
2. Verify that phase plans reference only phase 1 requirement IDs (DEV-01, DEV-02, DOC-01, DOC-02).

---
