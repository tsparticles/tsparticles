# Testing Patterns

**Analysis Date:** 2026-03-01

Test framework & runner

- Vitest is the test runner used across test packages (devDependency in root `package.json`: `vitest`).
- Example vitest config: `utils/tests/vitest.config.ts` (includes `src/tests/*.ts`, environment `jsdom`, `coverage.provider: v8`).

Where tests live

- Canonical test package: `utils/tests/`.
- Test files: `utils/tests/src/tests/*.ts` (examples: `Particle.ts`, `Particles.ts`, `Utils.ts`, `Options.ts`, `SpatialGrid.ts`, `ColorUtils.ts`).
- Fixtures: `utils/tests/src/Fixture/Window.ts`, `utils/tests/src/Fixture/CustomCanvas.ts`.

How to run tests

- From the package directory: run the scripts in `utils/tests/package.json`:
  - `pnpm --filter @tsparticles/tests test` -> runs `vitest run`
  - `pnpm --filter @tsparticles/tests test:ui` -> runs `vitest watch --ui`
  - `pnpm --filter @tsparticles/tests test:particle` -> runs `vitest run src/tests/Particle.ts`
- In CI, use `pnpm --filter @tsparticles/tests run test:ci` (script `test:ci` maps to `vitest run`).

Test organization & naming

- Tests are file-based with one or more describe/it blocks. Files are named by the unit under test (e.g. `Particle.ts` for particle behaviour).
- Include fixtures in `Fixture/` and import them at top of test files (see `Particle.ts` imports of `TestWindow` and `createCustomCanvas`).

Mocking and stubbing

- Use lightweight fixtures rather than heavy mocking. `jsdom` (via `JSDOM`) is used to provide `window` in tests: `utils/tests/src/Fixture/Window.ts`.
- For canvas operations, the `canvas` package is used and wrapped in `createCustomCanvas` to augment DOM-like properties: `utils/tests/src/Fixture/CustomCanvas.ts`.
- Prefer integration-style tests that exercise behaviour with real objects where feasible; stub external network or platform calls.

Test patterns & examples

- Top-level pattern in `utils/tests/src/tests/Particle.ts`:
  - Set up global fixtures once per file (e.g. assign `globalThis.window = TestWindow`).
  - Create reusable canvas + container via helper functions and package API (`tsParticles.load`).
  - Use `beforeEach`/`afterAll` to reset container state.
  - Assertions use Vitest's `expect` (assertion style mirrors chai-like matcher usage in current tests: `expect(x).to.equal(...)`, `expect(x).to.be.undefined`).

Coverage

- Coverage is enabled in `utils/tests/vitest.config.ts` with provider `v8`.
- Coverage reports exist under `utils/tests/coverage/` (HTML and JSON artifacts). CI should upload coverage artifacts from that folder.

Linting tests

- Tests are linted by ESLint. See `utils/tests/package.json` scripts: `lint`, `lint:ci` and `prettier` scripts.
- ESLint config for tests: `utils/tests/eslint.config.js` which extends `@tsparticles/eslint-config`.

What to mock vs not to mock

- Mock: platform-specific APIs (network, file system, real DOM beyond `jsdom` capabilities) and long-running timers.
- Do not mock: core library behaviour (particles, utilities) — tests should exercise real code using the provided fixtures.

CI and reliability

- Tests in `utils/tests` run with `maxWorkers: 1` in `vitest.config.ts` to avoid flakiness caused by shared global state.
- Keep tests deterministic: avoid timing-based assertions; when necessary, use mocked timers and explicit ticks.

Useful file paths

- Root package.json: `package.json` (devDeps include `vitest`, `@vitest/coverage-v8`).
- Test runner config: `utils/tests/vitest.config.ts`.
- Example tests: `utils/tests/src/tests/Particle.ts`, `utils/tests/src/tests/Particles.ts`.
- Fixtures: `utils/tests/src/Fixture/Window.ts`, `utils/tests/src/Fixture/CustomCanvas.ts`.
