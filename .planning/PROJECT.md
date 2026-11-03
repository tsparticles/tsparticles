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

Execution source: [v5 handovers](handovers/README.md). Dedicated branch: `v5`.
Runtime implementation has not started; current package baseline is `4.5.1`.

- [ ] V5-ENG: Replace the exported singleton with explicit independent engine creation; migrate consumers.
- [ ] V5-SVC: Scope custom random and logging to each engine, including transitive utility/plugin calls.
- [ ] V5-MOD: Establish domain folders with selective public facades and enforced internal import boundaries.
- [ ] V5-SIZE: Review all engine sources and reduce shipped bytes, including Container, CanvasManager/RenderManager, ParticlesManager and Particle; compare consistent min/gzip/Brotli consumer scenarios.
- [ ] V5-PLG: Audit all extension packages for singleton removal, per-engine services, registration and core API compatibility.
- [ ] V5-BRW: Refine browser/CDN bundles, globals, externals, lazy chunks and multi-engine composition without a default engine.
- [ ] V5-MIG: Validate downstream packages, browser rendering and v4 → v5 migration/documentation.

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

_Last updated: 2026-11-03 — v5 planning; runtime changes pending_
