# tsparticles — Project Initialization

## What This Is

tsparticles is a TypeScript monorepo that produces a modular particle engine library and multiple distribution bundles (basic, slim, full), along with demo applications. The codebase is used by web developers who want a lightweight, extensible particle system for browser-based visual effects and interactive demos.

## Core Value

Provide a stable, well-tested, and easy-to-consume particle engine that can be published to npm as multiple curated bundles so consumers can pick the minimal footprint they need.

## Requirements

### Validated

- ✓ Core engine runtime with public exports — existing (see `engine/src/`)
- ✓ Feature packages (shapes, updaters, plugins) with standardized hooks — existing (`shapes/*`, `updaters/*`, `plugins/*`)
- ✓ Bundles producing browser artifacts (webpack configs & `package.dist.json`) — existing (`bundles/*/`)

### Active

- [ ] PUBLISH-01: Ensure CI can build and publish selected bundles to npm (automated via GitHub Actions)
- [ ] DOCS-01: Generate and publish API docs (typedoc) for core engine and bundles
- [ ] TEST-01: Increase test coverage for hot-path engine utilities and edge cases
- [ ] DEMO-01: Improve demo site stability and deploy pipeline (demo/vanilla)

### Out of Scope

- Native mobile SDKs — the project targets web-first consumption
- Backend services or hosted analytics — demos may use simple demo servers only

## Context

- Monorepo managed with `pnpm` and `nx` (root `package.json`, `pnpm-workspace.yaml`, `nx.json`).
- CI uses GitHub Actions (`.github/workflows/nodejs.yml`, `npm-publish.yml`) with Nx Cloud integration.
- Core code lives in `engine/src/`; feature packages live under `shapes/`, `updaters/`, `plugins/`; bundles under `bundles/*/`.
- Existing docs and examples: `typedoc.json`, `demo/vanilla/`, `.github` workflows.

## Constraints

- **Compatibility**: Support modern browsers; Node used for tests and CI (Node 18+/24 in CI).
- **Tooling**: `pnpm` (workspace) and `nx` required for local developer workflows.
- **Publishing**: Publishing via GitHub Actions and Lerna/Nx — requires repository secrets (NX_CLOUD_ACCESS_TOKEN, FIREBASE_SERVICE_ACCOUNT_TSPARTICLES).

## Key Decisions

| Decision                | Rationale                                     | Outcome |
| ----------------------- | --------------------------------------------- | ------- |
| Monorepo with pnpm + nx | Reuse existing structure and CI optimizations | ✓ Good  |

---

_Last updated: 2026-03-01 after initialization_
