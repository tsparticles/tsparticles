# Coding Conventions

**Analysis Date:** 2026-03-03

This document summarizes the repository-wide coding conventions you must follow when authoring code in this workspace. All items below reference concrete files and patterns present in the repository so they are actionable for implementers and automation.

1. Formatting / Prettier

- Prettier configuration is applied via the `prettier` field in package manifests. See the root `package.json` (`/package.json`) and many package-level `package.json` files that set:
  - `"prettier": "@tsparticles/prettier-config"` (example: `bundles/all/package.json`, `plugins/zoom/package.json`).
- Commands that run formatting in CI or locally:
  - `pnpm run prettify:readme` — formats README/markdown (root `package.json`, line 16-17).
  - `pnpm exec prettier --write .` — full repository formatting (used ad-hoc).
- Recommended usage:
  - Always run `pnpm exec prettier --write` before committing large edits when not covered by Husky hooks.
  - For package-local operations prefer package scripts (see `utils/tests/package.json` scripts `prettify` / `prettify:ci`).

2. Linting / ESLint

- A shared ESLint configuration package is used: `@tsparticles/eslint-config` (declared in root `package.json`, devDependencies). See per-package ESLint entrypoints such as `utils/tests/eslint.config.js` and dozens of `eslint.config.js` files across packages (examples: `updaters/tilt/eslint.config.js`, `shapes/square/eslint.config.js`). Those files import and re-export the shared config:
  - `import tsParticlesESLintConfig from "@tsparticles/eslint-config";` (e.g. `utils/tests/eslint.config.js`).
- How to run linting:
  - Package-local: `pnpm --filter <package> run lint` (example `pnpm --filter @tsparticles/tests run lint`).
  - Workspace/NX: `npx nx run <project>:lint`.
  - CI lint-check: `pnpm run lint:ci` in package scripts (see `utils/tests/package.json` line 12).
- ESLint ruleset expectations (implicit from shared config and repo conventions):
  - Prefer explicit typing and avoid `any` on exported types.
  - Favor `unknown` for untrusted inputs and narrow immediately.
  - Enforce import ordering and group separation (external, workspace/internal, relative).

3. Import grouping and style

- Enforced and documented import order (see `AGENTS.md` and multiple `eslint.config.js` files):
  1. External packages (npm modules) — e.g. `import { expect } from "vitest";`
  2. Workspace packages (absolute package imports) — e.g. `import { deepExtend } from "@tsparticles/engine";`
  3. Relative imports (same package) — e.g. `import { helper } from "./helper";`
- Separation: leave a blank line between groups. Example from `utils/tests/src/tests/deepExtend.test.ts`:
  - `import { describe, expect, it } from "vitest";`
  - `import { deepExtend } from "@tsparticles/engine";`

4. Naming conventions

- Files that export a class or main type use PascalCase filenames. Example policy in `AGENTS.md`:
  - `TiltUpdater.ts` should export `TiltUpdater`.
- Use PascalCase for classes and types, camelCase for functions and variables, and UPPER_SNAKE_CASE only for true runtime-constant values.
- Test files: either `*.test.ts` (co-located tests) or `src/tests/*.ts` inside test packages (see `utils/tests/src/tests/`).

5. TypeScript and tsconfig

- Root `tsconfig.json` exists at `/tsconfig.json` and sets strict type checking with `"strict": true` and `esModuleInterop: true`. Many packages provide package-level `tsconfig.*.json` (examples: `bundles/slim/tsconfig.base.json`, `shapes/square/tsconfig.browser.json`).
- Shared tsconfig package: `@tsparticles/tsconfig` is present in `devDependencies` (root `package.json`). Use package-level configs for build targets (module / umd / types) as the repository already contains `tsconfig.module.json`, `tsconfig.umd.json`, `tsconfig.types.json` in packages.

6. Error handling

- Throw `Error` for unrecoverable conditions and prefer returning `undefined` for absent optional results (documented in `AGENTS.md`). Example defensive check in `utils/tests/src/tests/fixtures/canvas-fixtures.ts`:
  - `if (typeof document === "undefined") { throw new Error("createDeterministicCanvas: document is not available in this environment"); }`
- Use typed Error subclasses for domain-specific failures when helpful.

7. Exports & API surface

- Public package APIs must be explicitly typed; avoid exporting `any`. Public option shapes should be declared under `engine/src/Options/Interfaces/*` (see `AGENTS.md` guidance).
- Prefer named exports across the workspace. Many packages use named imports/exports (examples: `@tsparticles/engine` used in tests).

8. Performance & hot-path coding patterns

- Avoid per-frame allocations in tight loops; reuse objects and consider pooling. This is a documented performance rule in `AGENTS.md` and applies to engine code under `engine/src/`.

9. Tests and fixtures conventions (short)

- Tests rely on deterministic fixtures: see `utils/tests/src/Fixture/` and `utils/tests/src/tests/fixtures/canvas-fixtures.ts` (seedable RNG, deterministic canvas size).
- Use `jsdom` environment for DOM tests and `canvas` package for headless canvas rendering (see `utils/tests/vitest.config.ts` and `utils/tests/package.json` dependencies).

10. Commit / repo tooling expectations

- Husky is enabled via `prepare` script (root `package.json` line 27). Do not bypass hooks.
- Commit messages must follow Conventional Commits and are validated by `@commitlint/config-conventional` (root `package.json` devDeps).

Quick checklist for contributors

- Run linter and formatter before opening PR:
  - `pnpm --filter @tsparticles/tests run lint` (or package-specific lint)
  - `pnpm --filter @tsparticles/tests run prettify` (or `pnpm exec prettier --write .`)
- Run tests locally (see TESTING.md for commands).

References (concrete files):

- Root manifest: `/package.json` (prettier field, devDependencies)
- Root TS config: `/tsconfig.json`
- Example ESLint entrypoint: `utils/tests/eslint.config.js`
- Per-package ESLint files: many `eslint.config.js` under package folders (e.g. `updaters/tilt/eslint.config.js`)
- Test fixtures: `utils/tests/src/Fixture/Window.ts`, `utils/tests/src/tests/fixtures/canvas-fixtures.ts`

---

_Convention analysis: 2026-03-03_
