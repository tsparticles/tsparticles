Known concerns and technical debt

## High-level concerns

- Mixed build tooling: repository contains both Vite and webpack configurations which increases maintenance burden.
- Inconsistent linting/formatting: ESLint config exists in some packages but not centralized at root.
- Lack of tests: no clear test framework or scripts found; this increases risk when making changes.

Potential fragile areas

- Preset packaging: `package.dist.json` and per-preset bundling may have subtle differences; ensure package builds are tested.
- Demo synchronization: demos may rely on built bundles; mismatch between built bundles and source can cause surprises.

Security

- No secrets in repository files observed. CI workflows may use repository secrets (not in repo).

Suggested next steps

1. Standardize build tooling (prefer Vite/Rollup for modern bundles) — reduces complexity.
2. Centralize linting and formatting configs at repo root.
3. Add tests and CI coverage checks in `.github/workflows/nodejs.yml`.
4. Add CONTRIBUTING.md documenting how to build, test, and publish presets.
