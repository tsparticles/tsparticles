# Architecture

**Analysis Date:** 2026-03-01

## Pattern Overview

**Overall:** Monorepo with a modular core engine and per-feature packages assembled into distribution bundles.

**Key Characteristics:**

- Central engine package that exposes the runtime and shared utilities.
- Per-feature packages (shapes, updaters, plugins, utils) that register with the engine via standardized hooks.
- Bundles (basic/slim/full) that assemble the engine + selected features into publishable builds.

## Layers

**Core Engine:**

- Purpose: low-level particle runtime, lifecycle management and shared helpers.
- Location: `engine/src/index.ts`, `engine/src/Utils/*`, `engine/src/Enums/*`.
- Contains: particle lifecycle, render loop, utilities (math, canvas, color) and public exports `engine/src/exports.ts`.
- Used by: feature modules and bundles.

**Feature Modules:**

- Purpose: implement shape drawers, updaters, plugins and specialized utilities.
- Locations: `shapes/rounded-polygon/src/*`, `updaters/tilt/src/*`, `plugins/themes/src/*`, `utils/perlinNoise/src/*`.
- Contains: concrete implementations such as `shapes/rounded-polygon/src/RoundedPolygonDrawer.ts` and `updaters/tilt/src/TiltUpdater.ts`.

**Bundles / Distribution:**

- Purpose: assemble engine + selected features and produce browser/Node artifacts.
- Location: `bundles/basic/src/bundle.ts`, `bundles/slim/src/bundle.ts`, `bundles/full/src/bundle.ts` and each bundle's `src/index.ts`.
- Contains: assembly logic, bundle-specific `package.json` and `package.dist.json`, and `webpack` configs (`bundles/*/webpack.config.js`).

## Data Flow

1. Consumer imports a bundle (for most use-cases) or the core engine directly: e.g. `bundles/slim/src/index.ts` or `engine/src/index.ts`.
2. Bundle initialization (`bundles/*/src/bundle.ts`) registers feature modules with the engine.
3. Engine (`engine/src/index.ts`) creates internal particle state and runs update/draw cycles using helpers in `engine/src/Utils/*`.
4. Feature modules (e.g. `updaters/tilt/src/TiltUpdater.ts`, `shapes/rounded-polygon/src/RoundedPolygonDrawer.ts`) implement hooks invoked each tick by the engine.
5. Rendering output is produced on a browser canvas or via headless `canvas` when used in Node (the repository depends on `canvas` in `package.json`).

## Entry Points and Public APIs

- Core public exports: `engine/src/exports.ts` and `engine/src/export-types.ts` expose engine APIs and types.
- Bundle entry points: `bundles/*/src/index.ts` (consumer-facing) and `bundles/*/src/bundle.ts` (internal assembly).
- Feature package entries: e.g. `shapes/rounded-polygon/src/index.ts`, `updaters/tilt/src/index.ts`, `plugins/themes/src/index.ts`.
- Docs generation and public API docs: `typedoc.json` and `package.json` scripts that run `typedoc`.

## Key Abstractions

- Engine lifecycle: animation states and loop control in `engine/src/Enums/AnimationStatus.ts` and orchestrated by `engine/src/index.ts`.
- Utilities: `engine/src/Utils/*` (math, color, canvas) are shared across features and bundles.
- Feature contracts: feature packages expose standardized initialization and registration hooks—see `plugins/*`, `updaters/*` and `shapes/*` implementations for concrete examples.

## Error Handling & Cross-cutting Concerns

- Logging helpers: `engine/src/Utils/LogUtils.ts`.
- Types and linting: TypeScript configuration in `tsconfig.json` and shared configs referenced in `package.json` (`@tsparticles/tsconfig`, `@tsparticles/eslint-config`).
- Monorepo orchestration: `pnpm-workspace.yaml`, `nx.json`, plus `lerna` used in release/publish scripts (see `package.json` scripts).

## Runtime Considerations

- Targets: browser bundles (webpack) and Node (tests or headless rendering using `jsdom` + `canvas`).
- Browser-specific compilation: `bundles/*/tsconfig.browser.json` present to tailor builds.

## Where to extend

- Add new feature packages under top-level folders like `shapes/`, `updaters/`, `plugins/` using the observed package pattern (`src/index.ts` entry and implementation files under `src/`).
- To publish or expose new API surface include package metadata in `bundles/*/package.dist.json` and register features in the relevant `bundles/*/src/bundle.ts`.

_Architecture analysis: 2026-03-01_
