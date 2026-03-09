# Testing Patterns

**Analysis Date:** 2026-03-03

This document captures the repository's testing framework, test layout, fixture patterns, and commands to run tests locally and in CI. All references point to concrete files so automation and human contributors can run tests and follow existing patterns.

1. Test framework and config

- Test runner: Vitest (workspace devDependency declared in root `/package.json`, line ~80). Many packages use vitest; the primary test package is `utils/tests` which contains `vitest.config.ts` at `utils/tests/vitest.config.ts`.
- `utils/tests/vitest.config.ts` (path: `utils/tests/vitest.config.ts`) configures:
  - include: `src/tests/*.ts`
  - environment: `jsdom`
  - maxWorkers: 1
  - coverage provider: `v8` and coverage enabled (see lines 4-11).

2. Test package layout

- Primary test package: `utils/tests/` (path: `utils/tests/`)
  - `utils/tests/src/tests/` — test files (e.g. `Particle.ts`, `Utils.ts`, `deepExtend.test.ts`, `memoize.test.ts`).
  - `utils/tests/src/Fixture/` — fixtures used by tests (e.g. `Window.ts`, `CustomCanvas.ts`, `Utils.ts`).
  - `utils/tests/vitest.config.ts` — vitest configuration for this package.
  - `utils/tests/package.json` — package scripts for running tests and linting.

3. Test file naming & organization

- Two patterns coexist:
  - Co-located tests following `*.test.ts` naming (examples: `utils/tests/src/tests/deepExtend.test.ts`, `memoize.test.ts`).
  - Package-level test files under `src/tests/*.ts` that are imported by the package vitest config (see `vitest.config.ts` include pattern).
- Tests use ES module imports and named imports. Examples:
  - `import { describe, expect, it } from "vitest";` (`utils/tests/src/tests/deepExtend.test.ts`)
  - `import { memoize } from "@tsparticles/engine";` (`utils/tests/src/tests/memoize.test.ts`)

4. Test scripts and commands

- Package scripts (see `utils/tests/package.json`):
  - `pnpm --filter @tsparticles/tests run test` → runs `vitest run` (non-watch)
  - `pnpm --filter @tsparticles/tests run test:ui` → `vitest watch --ui` (UI watch mode)
  - `pnpm --filter @tsparticles/tests run test:particle` → runs a single test file `src/tests/Particle.ts` (convenience script)
  - `pnpm --filter @tsparticles/tests run test:ci` → `NODE_ENV=test vitest run --maxConcurrency=2` (CI tuned)
- Workspace-level commands (see `AGENTS.md`):
  - Run all tests: `pnpm exec vitest` or `npx nx run-many -t test`
  - Run one package tests: `pnpm --filter @tsparticles/tests test`
  - Run a single test file directly: `pnpm exec vitest run path/to/test/file.ts` (e.g. `utils/tests/src/tests/Particle.ts`).

5. Fixtures & deterministic testing

- DOM/jsdom fixture: `utils/tests/src/Fixture/Window.ts` exposes a `TestWindow` using `new JSDOM("").window` for deterministic DOM.
- Canvas fixture: `utils/tests/src/tests/fixtures/canvas-fixtures.ts` provides `createDeterministicCanvas`, `setupCanvasFixtures`, and `teardownCanvasFixtures`. Characteristics:
  - Seedable RNG (`makeRng(seed)`), default seed 1337.
  - Sets `globalThis.devicePixelRatio` in a guarded way for deterministic rendering (see lines ~58-66 and ~129-139).
  - Prefers `OffscreenCanvas` when available; falls back to `HTMLCanvasElement` (lines 46-56).
  - Provides `clear(color)` utility to reset canvas (lines 71-82).
- Tests rely on deterministic inputs and avoid timing-based assertions; prefer explicit ticks or mocked timers when needed (documented in `AGENTS.md`).

6. Coverage

- Coverage is collected using Vitest's `v8` provider. Configured in `utils/tests/vitest.config.ts` (coverage.provider = "v8", enabled: true).
- Coverage artifacts are generated under `utils/tests/coverage/` in CI and in local runs. The repository includes sample coverage outputs in `utils/tests/coverage/` (e.g. `index.html`, `coverage-final.json`).

7. Mocking & isolation patterns

- Tests import small fixture helpers rather than global mocks. Example patterns:
  - Use `setupCanvasFixtures()` and `teardownCanvasFixtures()` from `utils/tests/src/tests/fixtures/canvas-fixtures.ts` to create and remove DOM canvas elements.
  - Use `TestWindow` from `utils/tests/src/Fixture/Window.ts` when a JSDOM window is required by a helper.
- Prefer per-test setup/teardown (Vitest `beforeEach`/`afterEach`) and avoid global state mutation when possible. Canvas fixture demonstrates guarded global writes and best-effort cleanup.

8. Running tests locally (recommended commands)

- Run tests for the `utils/tests` package (fast path):
  - pnpm --filter @tsparticles/tests run test
  - pnpm --filter @tsparticles/tests run test:ui
- Run a single test file directly from the repo root:
  - pnpm exec vitest run utils/tests/src/tests/Particle.ts
- Run the full workspace tests (may be heavy):
  - pnpm exec vitest
  - or npx nx run-many -t test
- For CI-like execution with environment settings (mimics package script):
  - NODE_ENV=test pnpm exec vitest run --maxConcurrency=2

9. Lint + tests in CI pipeline

- Packages define combined scripts that run lint + prettify + tests. Example in `utils/tests/package.json`:
  - `build:ci` → `pnpm run lint:ci && pnpm run prettify:ci && pnpm run test:ci` (line 12).
- Recommended pre-PR local run: `pnpm --filter @tsparticles/tests run build` will run lint, prettify, and tests for the package (see `utils/tests/package.json` line 10).

10. Guidelines for adding new tests

- Place unit tests with the code they test when possible; otherwise add test files under `utils/tests/src/tests/` if they depend on engine internals or shared fixtures.
- Use existing fixtures: import `createDeterministicCanvas` or `TestWindow` rather than creating ad-hoc DOM mocks.
- Name tests clearly and keep them deterministic; prefer small, focused tests with explicit setup and teardown.

References (concrete files):

- Runner & deps: `/package.json` (Vitest in devDependencies)
- Main test package: `utils/tests/package.json`
- Vitest config: `utils/tests/vitest.config.ts`
- Fixtures: `utils/tests/src/Fixture/Window.ts`, `utils/tests/src/tests/fixtures/canvas-fixtures.ts`
- Example tests: `utils/tests/src/tests/deepExtend.test.ts`, `utils/tests/src/tests/memoize.test.ts`
- Coverage artifacts: `utils/tests/coverage/` (contains `index.html`, `coverage-final.json`, and per-file HTML reports)

---

_Testing analysis: 2026-03-03_
