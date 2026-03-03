# Architecture

**Analysis Date:** 2026-03-03

## Pattern Overview

Overall: modular monorepo with an engine core and plugin/bundle system

Key Characteristics:

- Central Engine core implemented in `engine/src/` that exposes a singleton via `engine/src/index.ts` and `engine/src/initEngine.ts`.
- Plugins, updaters, shapes, interactions and effects are small packages under top-level folders (`updaters/`, `interactions/`, `shapes/`, `plugins/`, `utils/`) and are dynamically loaded into the engine by bundles or manual registration.
- Bundles under `bundles/*/` compose multiple plugins for different distribution targets (e.g. `bundles/slim`, `bundles/full`, `bundles/pjs`) and provide convenience loader functions such as `bundles/slim/src/index.ts` → `loadSlim(engine)`.
- Demo apps under `demo/` (notably `demo/vanilla`) run the built packages and serve static assets, demonstrating public APIs.
- Utilities and small helper packages live under `utils/*/` and are published separately (e.g. `utils/perlinNoise`, `utils/noiseField`).

## Major Components

Engine Core

- Purpose: runtime, container lifecycle, animation loop, plugin registry.
- Location: `engine/src/`.
- Key files:
  - `engine/src/Core/Engine.ts` — central Engine class, plugin/preset/shape registries and `load`/`register` APIs.
  - `engine/src/Core/Container.ts` — per-instance Container: lifecycle, animation loop, plugins, particles manager.
  - `engine/src/Core/Canvas.ts` — canvas management and drawing (referenced from `Container`).
  - `engine/src/index.ts`, `engine/src/initEngine.ts` — entry and global singleton export.

Plugin & Extension Packages

- Purpose: extend engine with shapes, interactions, updaters, presets, effects.
- Location examples: `updaters/*/src/`, `interactions/external/*/src/`, `shapes/*/src/`.
- Pattern: each package exports a loader function (e.g. `loadExternalBounceInteraction`) which the bundles call to register the extension with an `Engine` instance.

Bundles

- Purpose: produce distributable bundles that glue engine + selected plugins and provide a single loader function for browsers/CDN.
- Location: `bundles/*/` (e.g. `bundles/slim`, `bundles/full`, `bundles/pjs`).
- Key file: `bundles/slim/src/index.ts` — demonstrates dynamic imports of many packages and calls their loader functions, then registers them via `engine.register`.
- Build outputs: `bundles/*/dist/` with UMD/CJS/ESM artifacts (e.g. `bundles/slim/dist/tsparticles.slim.bundle.js`).

Utilities

- Purpose: shared algorithms and small, publishable utilities.
- Location: `utils/*/` with `src/` and `dist/` (e.g. `utils/perlinNoise/src/PerlinNoise.ts`, `utils/noiseField/src/NoiseFieldGenerator.ts`).

Demo & Docs

- Purpose: examples and interactive playgrounds for the library.
- Location: `demo/vanilla/` and `demo/electron/`.
- Entry: `demo/vanilla/app.ts` starts an Express server that serves `views/*.pug` and `public/` assets and mounts built packages from `node_modules` under static paths.

## Layers

Runtime Layer (Engine):

- Files: `engine/src/Core/*` and `engine/src/Utils/*`.
- Responsibility: creation of `Container` instances, plugin lifecycle, animation loop, drawing orchestration.

Extension Layer (plugins/updaters/shapes/interactions):

- Files: `updaters/*/src/*`, `interactions/*/src/*`, `shapes/*/src/*`.
- Responsibility: implement small behaviors (e.g. `updaters/size/src/SizeUpdater.ts`, `interactions/external/bounce/src/Bouncer.ts`).

Bundle Layer:

- Files: `bundles/*/src/*`, `bundles/*/dist/*`.
- Responsibility: aggregate plugin loaders and expose single convenience API (e.g. `loadSlim(engine)`).

Presentation/Demo Layer:

- Files: `demo/vanilla/app.ts`, `demo/vanilla/public/javascripts/*.js`, `demo/vanilla/views/*.pug`.
- Responsibility: demonstrate runtime usage, host assets and docs.

Build & Distribution Layer:

- The repo is a pnpm + Nx monorepo (root `package.json`, `pnpm-workspace.yaml`, `nx.json`), packages maintain `package.json` and `package.dist.json` where needed. Bundles provide compiled `dist/` outputs.

## Data Flow

1. Application code or bundle calls the engine entrypoint: `import { tsParticles } from "@tsparticles/engine";` or bundles call `loadSlim(tsParticles)`.
2. Engine initializes (via `init()` / `initEngine()`), runs registered loader functions (`engine.register(...)`) which call plugin loader functions.
3. When consumers call `engine.load({ id, options })`, Engine creates a `Container` (`new Container(this, id, options)`), which:
   - creates `Canvas` and `Particles` managers,
   - loads plugins for the container (via `plugin.getPlugin(container)`), and
   - starts the animation loop using `requestAnimationFrame` wrappers (`animate()` in `Container._nextFrame`). See `engine/src/Core/Container.ts`.
4. Per-frame loop: `Container._nextFrame` computes delta, updates particles and canvas (`canvas.drawParticles(delta)`), and schedules next frame.

Event Flow / PubSub

- Engine includes an `EventDispatcher` used across engine and container (`engine/src/Utils/EventDispatcher.ts`). Events (container built, container init, container started, container destroyed, etc.) are dispatched by `Engine` and `Container`. API surface: `engine.addEventListener`, `engine.dispatchEvent`, `engine.removeEventListener`.

Plugin Registration

- Plugins expose loader functions which are passed to `engine.register` or called by bundles. Example: `bundles/slim/src/index.ts` imports `@tsparticles/interaction-external-bounce` and calls `loadExternalBounceInteraction(e)` where `e` is the Engine.

Entry points

- Library runtime: `engine/src/index.ts` (exports `tsParticles` and re-exports public API from `engine/src/exports.ts`).
- Bundle loader: `bundles/slim/src/index.ts` → `loadSlim(engine)`.
- Demo server: `demo/vanilla/app.ts` → Express app serving examples.

Public APIs

- Engine API (examples):
  - `initEngine()` — creates Engine instance (`engine/src/initEngine.ts`).
  - `Engine.load(params: ILoadParams)` — create Container and start it (`engine/src/Core/Engine.ts` lines ~449–488).
  - `Engine.register(...loaders)` — register plugin loader functions before calling `load()` (`engine/src/Core/Engine.ts` lines ~522–534).
  - `tsParticles` global singleton (set on `globalThis` in `engine/src/index.ts`).

Distribution

- Packages are built to `dist/` with UMD/CJS/ESM outputs. Example: `bundles/slim/dist/tsparticles.slim.bundle.js` and many module files under `bundles/slim/dist/`.

Error handling and logging

- Logger provided via `engine/src/Utils/LogUtils.ts` and used across engine to surface errors (e.g. animation loop try/catch in `Container._nextFrame`).

Concurrency and loops

- Per-container animation uses a requestAnimationFrame abstraction via `animate()` and `cancelAnimation()` (`engine/src/Core/Container.ts`, `engine/src/Utils/MathUtils.ts`), keeping each container decoupled.
- The engine's plugin init/loader process is asynchronous: `Engine.init()` awaits all registered loaders and ensures single-run semantics via sets `_executedSet` and `_loadPromises`.

Notes and design decisions visible in code

- Small packages export loader functions; bundles prefer dynamic `import()` for code-splitting and lazy loading (see `bundles/slim/src/index.ts` using `await Promise.all([ import("@tsparticles/...") ])`).
- Container lifecycle is explicit and self-contained; `Container.start()` → `init()` → plugin `start()` and `play()` sequence.

---

_Architecture analysis: 2026-03-03_
