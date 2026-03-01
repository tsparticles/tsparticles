# Coding Conventions

**Analysis Date:** 2026-03-01

Overview

- This repo uses TypeScript as the primary language across packages. Key configs: `package.json` (root), devDeps include `typescript` and `@tsparticles/tsconfig`.
- Formatting and linting are centralized: Prettier via `prettier` devDependency and `prettier` field in package.json referencing `@tsparticles/prettier-config`.
- ESLint is used via `eslint` and `@tsparticles/eslint-config`; per-package ESLint configurations exist, e.g. `utils/tests/eslint.config.js`.

File and naming conventions

- Files: use `.ts` for source and `.d.ts` for types. Test files live under `utils/tests/src/tests/*.ts`.
- Modules: index files are avoided; exports are per-package in `package.json` and individual files.
- Types & classes: PascalCase (e.g. `Engine`, `IParticle`); files that export a class or main type should use matching file name.
- Functions and variables: camelCase. Constants that are exported may use camelCase as well.

TypeScript patterns

- Prefer explicit public interfaces for package APIs. Reference `@tsparticles/tsconfig` in root `package.json`.
- Avoid `any`; when unavoidable in tests, disable rules with inline eslint comments as seen in `utils/tests/src/tests/Particle.ts`.
- Use union/utility types rather than overloading; maintain small function public surface.

Formatting and linting

- Prettier is the formatter. Package-level Prettier config comes from `@tsparticles/prettier-config` declared in `package.json`.
- ESLint config is provided via `@tsparticles/eslint-config`. Example override file: `utils/tests/eslint.config.js`.
- Lint scripts: see `utils/tests/package.json` scripts: `lint`, `lint:ci`.
- Formatting scripts: see `utils/tests/package.json` scripts: `prettify`, `prettify:ci`.

Imports and ordering

- Group imports by external packages, internal packages (workspace libraries), and relative imports. Keep a blank line between groups.
- Use specifiers rather than default imports where library exports are named (consistent with TypeScript settings).

Error handling

- Throw Errors for unrecoverable situations (e.g. `throw new Error("test container not initialized")` in `utils/tests/src/tests/Particle.ts`).
- Prefer returning undefined for optional/absent results and document with types (e.g. functions that may return `undefined`).
- Use typed Error subclasses only when domain-specific behaviour is required.

Tests and fixtures

- Tests use Vitest and live in `utils/tests/src/tests/*.ts`. Fixtures live in `utils/tests/src/Fixture/`.
- In tests, JSDOM and `canvas` are used as fixtures: see `utils/tests/src/Fixture/Window.ts` and `CustomCanvas.ts`.

Commit and PR conventions

- Commit messages are validated with `@commitlint/config-conventional` and `@commitlint/cli` (devDependencies in root `package.json`). Husky is installed (prepare script in `package.json`) to run hooks.
- Use Conventional Commits (type(scope): subject). Example: `fix(engine): handle NaN in velocity`.
- PRs should reference related issue/feature and include brief testing notes and changelog entry where relevant.

Additional notes

- Exceptions to rules are documented inline with ESLint disable comments and must be justified in the same file.
