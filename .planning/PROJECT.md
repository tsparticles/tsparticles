# tsparticles - presets

## What This Is

A monorepo that provides particle presets and demo applications for visual effects in the browser. It includes multiple preset packages under `presets/` and demo apps under `apps/` (Vite and server-side Pug-based demos).

## Core Value

Provide a curated set of high-quality particle presets that developers can drop into browser demos and apps to achieve rich visual effects quickly.

## Requirements

### Validated

(Inferred from codebase map)

- ✓ Packaging and distribution of presets via npm (CI workflows present)
- ✓ Demo apps that showcase presets: `apps/vite` (SPA) and `apps/demo` (Pug views)

### Active

- [ ] Provide a streamlined build and publishing pipeline for presets (standardize build tooling)
- [ ] Improve developer experience for adding new presets (clear templates and docs)
- [ ] Add automated tests for preset builds and demos

### Out of Scope

- Real-time editing UI for presets — out of scope for initial improvements
- Migration of legacy webpack presets to a new format (may be phased)

## Context

- Monorepo using `pnpm` and `lerna` with TypeScript source for presets
- Multiple build systems present (Vite and webpack) — contributes to maintenance overhead
- GitHub Actions configured for CI and publishing

## Constraints

- **Compatibility**: Must continue supporting browser runtime for demos
- **Timeline**: Aim for incremental improvements (phased roadmap)

## Key Decisions

| Decision           | Rationale                  | Outcome |
| ------------------ | -------------------------- | ------- |
| Use pnpm workspace | Already configured in repo | ✓ Good  |

---

_Last updated: 2026-03-02 after initialization_
