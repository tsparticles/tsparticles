# Architecture

**Analysis Date:** 2026-04-10

## Pattern Overview

**Overall:** Modular plugin-based monorepo architecture centered on a shared engine kernel.

**Key Characteristics:**

- Core runtime is isolated in `engine/src/*` and exposed through stable package entrypoints in `engine/src/index.ts` and `engine/src/exports.ts`.
- Feature behavior is composed at runtime through plugin registration (`engine.pluginManager.register(...)`) from package-local loaders like `plugins/*/src/index.ts`, `interactions/*/src/index.ts`, `updaters/*/src/index.ts`, and `shapes/*/src/index.ts`.
- Consumer-facing bundles (`bundles/basic`, `bundles/slim`, `bundles/full`, `bundles/all`) aggregate sets of plugin loaders with lazy `import(...)` orchestration.

## Layers

**Engine Kernel Layer:**

- Purpose: Own engine lifecycle, container orchestration, particle update/render loops, and plugin registration infrastructure.
- Location: `engine/src/Core/*`, `engine/src/Utils/*`, `engine/src/Options/*`, `engine/src/index.ts`.
- Contains: `Engine`, `Container`, `ParticlesManager`, `RenderManager`, options model classes, shared math/utils.
- Depends on: Internal engine modules and browser globals (`globalThis`, canvas APIs, `fetch` in `engine/src/Core/Engine.ts`).
- Used by: All workspace feature packages and all published bundles via `@tsparticles/engine`.

**Feature Package Layer (Plugins / Interactions / Shapes / Updaters / Paths / Effects):**

- Purpose: Encapsulate one behavior per package and register that behavior into the engine.
- Location: `plugins/*/src/*`, `interactions/*/*/src/*`, `shapes/*/src/*`, `updaters/*/src/*`, `paths/*/src/*`, `effects/*/src/*`.
- Contains: `load*` functions that call `engine.checkVersion(__VERSION__)` and `engine.pluginManager.register(...)`.
- Depends on: `@tsparticles/engine` and sometimes other feature packages (for example interactivity dependencies in `interactions/external/repulse/src/index.ts`).
- Used by: Bundle packages and direct consumers.

**Bundle Composition Layer:**

- Purpose: Define opinionated feature sets (basic/slim/full/all/confetti/fireworks/pjs compatibility) and load dependencies in one call.
- Location: `bundles/*/src/index.ts`, `bundles/*/src/bundle.ts`.
- Contains: Aggregator loaders (`loadBasic`, `loadSlim`, `loadFull`, `loadAll`) with staged dynamic imports and `Promise.all` fan-out.
- Depends on: Engine package plus many feature packages (for example `bundles/all/src/index.ts`).
- Used by: Apps, demos, and end users importing bundle packages (`tsparticles`, `@tsparticles/all`, etc.).

**Application / Demo Layer:**

- Purpose: Run and demonstrate engine + bundles in runtime hosts.
- Location: `demo/vite/src/main.ts`, `demo/vanilla/app.ts`, `demo/electron/client/client.js`, `demo/vanilla_new/*`.
- Contains: Environment bootstrap, server/electron glue, and sample `engine.load(...)` usage.
- Depends on: Published workspace packages and host runtime frameworks (Vite/Express/Electron).
- Used by: Development, documentation, and manual verification.

**Workspace Orchestration Layer:**

- Purpose: Coordinate multi-package builds, caching, and dependency execution.
- Location: `nx.json`, `pnpm-workspace.yaml`, root `package.json`.
- Contains: Nx target defaults, package globs, root scripts (`nx run-many`, `nx affected`).
- Depends on: Nx + pnpm workspace metadata.
- Used by: CI and local development workflows.

## Data Flow

**Runtime Initialization and Animation Flow:**

1. Importing engine entrypoint creates singleton instance (`engine/src/index.ts`) and assigns `globalThis.tsParticles`.
2. Consumer calls `engine.load(...)` (implemented in `engine/src/Core/Engine.ts`), which initializes plugin manager, resolves options (including optional URL fetch), creates/replaces a `Container`, and binds/creates canvas.
3. `Container.start()` in `engine/src/Core/Container.ts` initializes plugins/drawers/updaters, computes effective options, initializes canvas + particles, and starts draw loop.
4. `RenderManager.drawParticles(...)` in `engine/src/Core/RenderManager.ts` clears canvas, updates particles through `ParticlesManager.update(...)`, then renders particles and plugin overlays each frame.
5. Event dispatch (`EventDispatcher`, `EventType`) propagates lifecycle and particle events to plugins and consumers.

**Bundle and Plugin Loading Flow:**

1. A bundle loader (for example `bundles/slim/src/index.ts`) receives `Engine` and validates version with `engine.checkVersion(__VERSION__)`.
2. Bundle dynamically imports required feature loaders and calls each loader.
3. Each feature loader registers behavior using `engine.pluginManager.register(...)` and adds updaters/shapes/interactors/plugins.
4. Registered initializers are materialized per-container via `PluginManager.getEffectDrawers/getShapeDrawers/getUpdaters` when container starts.

**State Management:**

- Engine-level state is centralized in in-memory registries/maps: `Engine._domArray` (`engine/src/Core/Engine.ts`) and `PluginManager` maps/sets (`engine/src/Core/Utils/PluginManager.ts`).
- Container-level mutable state (running/paused/destroyed/options/plugins) is maintained in instance fields in `engine/src/Core/Container.ts`.
- Particle-level state is maintained in arrays plus spatial hash grid in `engine/src/Core/ParticlesManager.ts`.

## Key Abstractions

**Engine:**

- Purpose: Global orchestrator for containers and plugin lifecycle.
- Examples: `engine/src/Core/Engine.ts`, `engine/src/initEngine.ts`, `engine/src/index.ts`.
- Pattern: Singleton-like exported instance + reusable `Engine` class.

**Container:**

- Purpose: One rendering/runtime instance bound to one canvas/DOM scope.
- Examples: `engine/src/Core/Container.ts`, `engine/src/Core/CanvasManager.ts`, `engine/src/Core/Retina.ts`.
- Pattern: Stateful lifecycle object (`init/start/play/pause/stop/destroy`).

**PluginManager:**

- Purpose: Registry and instantiation boundary for plugins, shapes, effects, updaters, easings, presets, and configs.
- Examples: `engine/src/Core/Utils/PluginManager.ts`.
- Pattern: Registry + deferred initializer execution.

**Feature Loaders (`load*`):**

- Purpose: Install one feature package into engine.
- Examples: `shapes/circle/src/index.ts`, `updaters/opacity/src/index.ts`, `interactions/external/repulse/src/index.ts`, `plugins/absorbers/src/index.ts`.
- Pattern: Version gate + `pluginManager.register(...)` + lazy import.

**Bundle Loaders (`loadBasic/loadSlim/loadFull/loadAll`):**

- Purpose: Compose many feature loaders into curated distributions.
- Examples: `bundles/basic/src/index.ts`, `bundles/slim/src/index.ts`, `bundles/full/src/index.ts`, `bundles/all/src/index.ts`.
- Pattern: Dependency fan-out with staged dynamic imports and `Promise.all`.

## Entry Points

**Engine Public Entrypoint:**

- Location: `engine/src/index.ts`
- Triggers: Package import of `@tsparticles/engine`.
- Responsibilities: Create singleton engine (`tsParticles`), publish on `globalThis`, re-export public API/types.

**Engine Bundle Entrypoint (no type exports):**

- Location: `engine/src/bundle.ts`
- Triggers: Bundle-oriented engine consumption.
- Responsibilities: Create global `tsParticles` and export runtime API.

**Bundle Entrypoints:**

- Location: `bundles/*/src/index.ts` and `bundles/*/src/bundle.ts`
- Triggers: Import of bundle packages like `tsparticles` or `@tsparticles/slim`.
- Responsibilities: Register predefined feature sets and expose one `load*` entrypoint.

**Demo Entrypoints:**

- Location: `demo/vite/src/main.ts`, `demo/vanilla/app.ts`, `demo/electron/client/client.js`, `demo/electron/app/index.js`
- Triggers: Dev server startup or browser/electron app load.
- Responsibilities: Host runtime bootstrapping and `engine.load(...)` invocation.

## Error Handling

**Strategy:** Fail fast on version/runtime contract violations, log recoverable runtime failures, and return `undefined` for optional result paths.

**Patterns:**

- Version mismatch is thrown as `Error` via `Engine.checkVersion(...)` in `engine/src/Core/Engine.ts`.
- Runtime loop and recoverable operations use logger-based reporting (`getLogger().error/warning`) in `engine/src/Core/Container.ts`, `engine/src/Core/ParticlesManager.ts`, `engine/src/Core/Engine.ts`.
- Optional workflows return `undefined` instead of throwing (for example `Engine.load(...)` fallback path in `engine/src/Core/Engine.ts`, particle add failures in `engine/src/Core/ParticlesManager.ts`).

## Cross-Cutting Concerns

**Logging:** `getLogger()` from `engine/src/Utils/LogUtils.ts` is used across engine core for warnings/errors.
**Validation:** Runtime API contract validation is performed via `engine.checkVersion(__VERSION__)` in every loadable package entrypoint (for example `bundles/full/src/index.ts`, `shapes/circle/src/index.ts`).
**Authentication:** Not applicable in core architecture; no auth layer exists in engine packages.

---

_Architecture analysis: 2026-04-10_
