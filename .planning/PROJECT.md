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

### Active

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
- Build outputs are produced via webpack under `bundles/*`.

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

_Last updated: after project initialization_
