# tsParticles Test Suite

Comprehensive test package for tsParticles core engine using Vitest and jsdom.

## Quick checklist

1. Install dependencies from the repository root
2. Run all tests or watch specific test files
3. Check coverage reports for CI validation

## Usage

From the repository root:

```bash
pnpm i
pnpm --filter @tsparticles/tests test
```

## Available scripts

- `pnpm prettify` — Format source code with Prettier
- `pnpm prettify:ci` — Check formatting (CI mode)
- `pnpm lint` — Run ESLint and auto-fix issues
- `pnpm lint:ci` — Check linting (CI mode)
- `pnpm build` — Lint, format, and run tests
- `pnpm build:ci` — CI build with strict checks
- `pnpm test` — Run all tests
- `pnpm test:particle` — Run Particle-specific tests only
- `pnpm test:ui` — Run tests in watch mode with UI
- `pnpm test:ci` — CI test run with coverage

## Testing

Tests use:
- **Vitest** as the test runner
- **jsdom** for DOM simulation
- **canvas** package for canvas testing
- Custom fixtures in `src/Fixture/`
- Coverage tracking via v8 provider (see `vitest.config.ts`)

## Common pitfalls

- Tests require workspace dependencies to be built first
- Canvas tests need the native `canvas` package; install it if missing
- Ensure deterministic tests: avoid timing assertions without explicit ticks

## Related docs

- Main docs: <https://particles.js.org/docs/>
- Repository README: <https://github.com/tsparticles/tsparticles/blob/main/README.md>

