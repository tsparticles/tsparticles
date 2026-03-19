# TESTING

Test framework & setup

- Vitest is used as the test runner (`vitest` devDependency).
- Tests use jsdom for DOM/canvas-related tests (`jsdom`, `@types/jsdom`).

Where tests live

- Primary test utilities and fixtures: `utils/tests/` (look for fixtures under `utils/tests/src/Fixture/`).

Running tests

- Run all tests: `pnpm exec vitest` or `npx nx run-many -t test`.
- Run package tests: `pnpm --filter @tsparticles/tests test` (package-specific scripts may exist).
- Run a single test file: `pnpm exec vitest run path/to/test/file.ts` or use Nx `npx nx test <project> --testFile=src/tests/Particle.ts`.

Coverage

- Vitest configured with v8 provider and coverage is emitted under `utils/tests/coverage/` in CI.

Testing practices

- Keep tests deterministic; avoid timing-based assertions and use mocked timers or manual ticks.
- Canvas tests run in Node in CI via `canvas` library.

Quick checks

- To run a single particle test: `pnpm --filter @tsparticles/tests test:particle` (where available).
