# Agent Guide for Contributors and Automation

This repository uses a pnpm + Nx TypeScript monorepo structure. The guidance below is written for agentic coding assistants that will run in this repo (linters, builders, test runners, and change authors). Follow these rules to produce consistent, reviewable changes.

---

## Quick Commands

- Install dependencies: `pnpm i`
- Build all packages: `pnpm run build` (runs `slimbuild` + docs)
- Build affected packages: `pnpm run build:affected` or `npx nx affected -t build`
- Run the full workspace build (CI): `pnpm run build:ci`
- Run typedoc (docs): `pnpm run build:docs`
- Start demo server: `cd demo/vanilla && pnpm start`

## Lint / Format / Commit hooks

- Format README + markdown: `pnpm run prettify:readme`
- Check formatting (CI): `pnpm run prettify:ci:readme`
- Run ESLint (package-local): `npx nx run <project>:lint` or `pnpm --filter <package> run lint`
- Husky hooks are enabled: local `git commit` runs hooks (`prepare` script in `package.json`). Do not bypass hooks.

## Tests

- Run all tests (workspace): `pnpm exec vitest` or `npx nx run-many -t test`
- Run package tests (example): `pnpm --filter @tsparticles/tests test`
- Run a single test file with Vitest:
  - From package: `pnpm --filter @tsparticles/tests test:particle` (predefined script)
  - Directly: `pnpm exec vitest run path/to/test/file.ts` (e.g. `utils/tests/src/tests/Particle.ts`)
  - With Nx (project-level): `npx nx test <project> --testFile=src/tests/Particle.ts` (use project-specific options)
- Run tests in watch UI: `pnpm --filter @tsparticles/tests test:ui` or `pnpm exec vitest --ui`
- Coverage: vitest with v8 provider configured in `utils/tests/vitest.config.ts` — CI exposes coverage artifacts under `utils/tests/coverage/`.

Notes on single-test execution: prefer package scripts that target a single file (many test packages include narrow scripts). If unavailable, run `pnpm exec vitest run <path>` from repo root.

---

## Build & Bundles

- Slim/full bundle build: `pnpm run slimbuild` (uses `nx run-many -t build`)
- Build for CI with module/UMD targets: `pnpm run build:ci`
- Bundle configs are under `bundles/*/webpack.config.js` and package-level `tsconfig.*.json` files.

---

## Code Style and Conventions

Follow the repository-wide style enforced by `@tsparticles/prettier-config` and `@tsparticles/eslint-config`.

General rules

- Language: TypeScript (>= 5.x) is the source language. Compiled outputs and bundles may be JavaScript.
- Formatting: Prettier (configured via `prettier` field in `package.json`). Run `pnpm run prettify:readme` for docs and `pnpm exec prettier --write .` for project-wide formatting when needed.
- Linting: ESLint with shared config `@tsparticles/eslint-config`. Run `npx eslint <path>` only when debugging lint issues.

Imports

- Group imports: 1) external packages, 2) workspace packages (internal), 3) relative imports; separate groups with a blank line.
- Prefer named imports for library exports; avoid default imports when the upstream uses named exports.
- Use absolute package imports for workspace packages (e.g. `@tsparticles/engine`) when available; otherwise use relative paths.

Types & API surfaces

- Prefer explicit types and interfaces for public package APIs. Avoid `any` on exported types.
- Use `unknown` instead of `any` when receiving untyped input and narrow immediately with type guards.
- Keep public option shapes documented and typed under `engine/src/Options/Interfaces/*`.

Naming

- Files exporting a class or main type should use matching PascalCase file names (e.g. `TiltUpdater.ts` exports `TiltUpdater`).
- Use PascalCase for classes & types, camelCase for functions/variables, UPPER_SNAKE_CASE only for constants that are truly constant across runs.

Error handling

- Throw `Error` for unrecoverable issues. Use typed Error subclasses for domain-specific errors when helpful.
- Prefer returning `undefined` for optional/absent results and document this in types (avoid using exceptions for control flow).
- Add defensive checks for external inputs (image URLs, user-provided options) and surface clear error messages.

Performance & hot paths

- Avoid per-frame allocations in hot loops; reuse objects or introduce pooling where it measurably improves throughput.
- Replace expensive operations on hot paths (e.g. `JSON.stringify` for memo keys) with bounded caches and efficient keying.

Global state

- Do not mutate `globalThis` unless strictly required; prefer opt-in bootstrap APIs that return instances.

Tests & fixtures

- Tests use Vitest + jsdom; canvas tests use `canvas` package and custom fixtures under `utils/tests/src/Fixture/`.
- Keep tests deterministic: avoid timing-based assertions; use mocked timers or explicit ticks where needed.

Commit messages

- Use Conventional Commits. Commitlint is enforced (`@commitlint/config-conventional`). Example: `fix(engine): handle NaN in velocity`.

PRs

- Provide clear description, testing notes, and update `CHANGELOG.md` if the change affects public APIs.

---

## Agent-specific rules (for automated assistants)

1. Always prefer workspace-aware commands: use `pnpm` + `nx` rather than invoking global CLIs.
2. NEVER bypass Husky hooks. If you cannot run hooks in the environment, stage files and report failure rather than committing.
3. When creating or modifying packages, update related `bundles/*/package.dist.json` if you intend to publish.
4. For code edits: include tests or update existing tests that cover the change. If tests are flaky locally, document the failure and do not proceed to commit-only fixes without fixing tests.
5. For large refactors, produce a short migration plan and update `PROJECT.md` or `CHANGELOG.md` as appropriate.

---

## Tooling references (important files)

- Root `package.json` — workspace scripts and devDependencies
- `pnpm-workspace.yaml` — workspace packages
- `nx.json` — Nx task configuration
- `engine/src/` — core runtime
- `bundles/*/` — bundle assembly and webpack configs
- `utils/tests/` — primary test package and fixtures
- `.github/workflows/` — CI and publish pipelines

## Cursor & Copilot rules

- Cursor skills & rules found under `.cursor/`: follow the skill definitions before invoking local helpers. Notable files:
  - `.cursor/skills/monitor-ci/SKILL.md`
  - `.cursor/skills/nx-workspace/SKILL.md`
  - `.cursor/skills/nx-generate/SKILL.md`
  - `.cursor/skills/nx-run-tasks/SKILL.md`
  - `.cursor/skills/nx-plugins/SKILL.md`

- There is no `.github/copilot-instructions.md` present; follow the repository linting and commit rules instead.

---

If you are an automated agent making changes: run the full test suite locally (`pnpm exec vitest`) and ensure lint + format pass before proposing a commit. When in doubt, open a short PR with a clear testing checklist.

<!-- nx configuration start-->
<!-- Leave the start & end comments to automatically receive updates. -->

## General Guidelines for working with Nx

- For navigating/exploring the workspace, invoke the `nx-workspace` skill first - it has patterns for querying projects, targets, and dependencies
- When running tasks (for example build, lint, test, e2e, etc.), always prefer running the task through `nx` (i.e. `nx run`, `nx run-many`, `nx affected`) instead of using the underlying tooling directly
- Prefix nx commands with the workspace's package manager (e.g., `pnpm nx build`, `npm exec nx test`) - avoids using globally installed CLI
- You have access to the Nx MCP server and its tools, use them to help the user
- For Nx plugin best practices, check `node_modules/@nx/<plugin>/PLUGIN.md`. Not all plugins have this file - proceed without it if unavailable.
- NEVER guess CLI flags - always check nx_docs or `--help` first when unsure

## Scaffolding & Generators

- For scaffolding tasks (creating apps, libs, project structure, setup), ALWAYS invoke the `nx-generate` skill FIRST before exploring or calling MCP tools

## When to use nx_docs

- USE for: advanced config options, unfamiliar flags, migration guides, plugin configuration, edge cases
- DON'T USE for: basic generator syntax (`nx g @nx/react:app`), standard commands, things you already know
- The `nx-generate` skill handles generator discovery internally - don't call nx_docs just to look up generator syntax

<!-- nx configuration end-->
