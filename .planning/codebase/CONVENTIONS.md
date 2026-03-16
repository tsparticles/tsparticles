# CONVENTIONS

Coding style & linting

- Prettier is enforced via `@tsparticles/prettier-config` (see `package.json` `prettify:readme` scripts).
- ESLint is present (`eslint` + `@tsparticles/eslint-config`) — prefer named imports and avoid default exports for library modules.

TypeScript & typing

- Explicit types for public APIs; avoid `any`. Use `unknown` for untyped inputs and narrow with guards.
- Public option interfaces are declared under `engine/src/Options/Interfaces/` (follow naming and explicit interfaces).

Imports & grouping

- Import grouping: 1) external packages, 2) workspace packages (e.g., `@tsparticles/engine`), 3) relative imports — separate with a blank line.

Naming

- Classes & types: PascalCase (e.g., `GridPathGenerator`).
- Functions/variables: camelCase.
- Files exporting a class/major type: PascalCase filename matching the exported symbol.

Error handling

- Throw `Error` for unrecoverable issues; prefer returning `undefined` for optional results.

Performance notes

- Avoid per-frame allocations in hot loops; reuse objects or pools where helpful (critical in particle engine updates).

Commit & release

- Conventional commits enforced by commitlint dev dependency; follow `type(scope): description` convention.
