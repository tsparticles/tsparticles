# ROADMAP: tsparticles - presets

## Summary

Phases: 3 | Requirements mapped: 5 | All v1 requirements covered ✓

| #   | Phase            | Goal                                               | Requirements                   | Success Criteria                                       |
| --- | ---------------- | -------------------------------------------------- | ------------------------------ | ------------------------------------------------------ |
| 1   | Build & DX       | Standardize build and improve developer onboarding | PKG-01, DEV-01, DEV-02, TST-01 | 1) All presets can build with a single command         |
|     |                  |                                                    |                                | 2) Root lint config enforces consistent style          |
|     |                  |                                                    |                                | 3) Template and CONTRIBUTING.md present                |
| 2   | CI & Release     | Automate CI builds and npm publishing              | PKG-02                         | 1) CI runs for PRs and release builds                  |
|     |                  |                                                    |                                | 2) Releases publish packages to npm via GitHub Actions |
| 3   | Migration & Docs | Migrate legacy builds and improve demos            | MIGR-01, DOCS-01               | 1) At least one migrated preset verified               |
|     |                  |                                                    |                                | 2) Demo playground updated with examples               |

## Phase Details

### Phase 1: Build & DX

Goal: Create a single, reproducible build and clear contributor experience to lower friction for adding new presets.
Requirements: PKG-01, DEV-01, DEV-02, TST-01
Success criteria:

1. `pnpm build` at root builds all presets into browser-friendly bundles
2. `CONTRIBUTING.md` includes steps to add a new preset and a preset template exists
3. Linting runs in CI and local 'pnpm lint' enforces style

### Phase 2: CI & Release

Goal: Wire CI to build and publish packages on releases
Requirements: PKG-02
Success criteria:

1. GitHub Actions builds for PRs and release tags
2. Release workflow publishes packages to npm (dry-run first)

### Phase 3: Migration & Docs

Goal: Migrate legacy webpack presets to unified build and improve demos and playgrounds
Requirements: MIGR-01, DOCS-01
Success criteria:

1. One webpack-based preset migrated and validated
2. Demo playground updated with interactive examples

---

_Roadmap created: 2026-03-02_
