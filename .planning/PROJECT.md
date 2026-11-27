# tsParticles — Project

## What This Is

tsParticles is a TypeScript-first, extensible particle engine and ecosystem packaged as a monorepo. It provides a compact runtime (`engine/src/`) plus plugins (`plugins/*/`), path generators (`paths/*/`), utility libraries (`utils/*/`), and prebuilt bundles (`bundles/*/`). This project produces library bundles, demos, and documentation for web developers building particle effects.

## Core Value

Provide a small, high-performance, and extensible particle engine that developers can integrate into web projects with minimal configuration.

## Requirements

### Validated

- ✓ Engine runtime and public API (`engine/src/index.ts`) — existing
- ✓ Plugin system and example plugin (`plugins/themes/src/`) — existing
- ✓ Bundles and build targets (`bundles/slim/`, `bundles/*/webpack.config.js`) — existing

### Active — v5 major (planned 2026-11-03)

Execution order: [E0–E12, then optional E13](handovers/V5-EXECUTION.md), with detailed scope in the
[v5 handovers](handovers/README.md). Topic IDs are not chronological. Dedicated branch: `v5`.
The branch carries package version `4.6.0` after merging `main`; the v5 runtime
implementation and E0–E10 verification are complete for progression. E11/E12
remain planned follow-up gates. Physical HDR and native translation reviews are
queued for final plan validation at the user's direction; no release is authorized.

- [x] V5-ENG: Replace the exported singleton with explicit independent engine creation; migrate consumers.
- [x] V5-SVC: Scope custom random and logging to each engine, including transitive utility/plugin calls.
- [x] V5-MOD: Establish domain folders with selective public facades and enforced internal import boundaries.
- [x] V5-SIZE: Review engine sources and consumer size scenarios; explain justified growth and remove demonstrated waste.
- [x] V5-PLG: Audit all extension packages for singleton removal, per-engine services, registration and core API compatibility.
- [x] V5-BRW: Refine browser/CDN bundles, globals, externals, lazy chunks and multi-engine composition without a default engine.
- [x] V5-LEG: Retire Vue 2, Nuxt 2, and Nuxt 3 integrations and deprecated APIs with supported replacements; document the intentionally retained PJS and Stencil v4 compatibility surfaces.
- [x] V5-COLOR: Adopt OKLCH as the canonical particle/animation model, preserve color-manager inputs and wide-gamut fidelity, and separate gamut/HDR capabilities; see the [color report](handovers/V5-COLOR-REPORT.md). Physical HDR display validation is in the final-plan queue.
- [x] V5-MIG: Validate downstream packages, browser rendering and v4 → v5 migration/documentation. Human review of the nine translations is in the final-plan queue.

- [x] V5-ARCH: Evaluate Particle state/serialization, engine package boundaries,
      options resolution and a common capability architecture for extensions;
      record decisions and evidence in the [architecture plan](handovers/V5-ARCHITECTURE.md).

The [source review](handovers/V5-CODE-REVIEW.md) refines mandatory acceptance
checks for these requirements. E11 (engine-owned services) and E12
(engine-independent extensions) are planned follow-up gates after E10. [E13](handovers/V5-13-OPTIONAL-PLUGINS.md)
is an optional plugin performance backlog, with no required new packages.

### Historical initialization backlog (not the v5 execution plan)

- [ ] DEV-01: Stabilize build & CI across the monorepo (consistent Node/pnpm + Nx pipelines)
- [ ] DEV-02: Improve developer documentation and examples (expand `markdown/` and demo/vanilla)
- [ ] PERF-01: Reduce per-frame allocations in hot loops and add benchmarks for core update paths
- [ ] QA-01: Expand test coverage for rendering and physics (utilize `utils/tests/` fixtures)
- [ ] DX-01: Provide an easy local demo start (`demo/vanilla` quickstart improvements)

### Out of Scope

- Mobile native SDKs — this project targets web/browser bundles for now
- Paid plugin marketplace — commercial distribution is out of scope for initial roadmap

## Context

- Monorepo managed with pnpm, Nx, and Lerna for publishing. Root scripts in `package.json` and workspace layout in `pnpm-workspace.yaml`.
- Typedoc is used for API docs (`typedoc.json`) and `markdown/` contains higher-level guides.
- Standard package builds use Rollup through `tsparticles-build`; Webpack and Rolldown are opt-in. Inspect CLI/configs before comparing artifacts.

## Constraints

- **Platform**: Browser-first; Node only for tooling and CI — runtime APIs must not rely on server features.
- **Compatibility**: Support modern evergreen browsers; minimize polyfills to keep bundles small.
- **Performance**: Hot-path code (particle update/render loop) needs careful allocation discipline.

## Key Decisions

| Decision                      | Rationale                                                        | Outcome |
| ----------------------------- | ---------------------------------------------------------------- | ------- |
| Monorepo with pnpm + Nx       | Organize many small packages and speed local dev with workspaces | ✓ Good  |
| Web-first, not server runtime | Primary consumers are web apps and demos                         | ✓ Good  |

---

_Last updated 2026-11-27 after E10 acceptance for progression. Physical HDR and native-language reviews are queued for final plan validation._
