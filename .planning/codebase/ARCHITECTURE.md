# Architecture

**Analysis Date:** 2026-02-17

## Pattern Overview

**Overall:** Plugin-based engine with a microkernel/modular monorepo architecture

**Key Characteristics:**

- A central **engine** package (`@tsparticles/engine`) provides the core runtime (canvas, particles, animation loop)
- All features (shapes, effects, updaters, movers, interactions, paths, colors, easings, plugins) are separate packages that register themselves with the engine via a uniform plugin registration API
- **Bundles** are meta-packages that compose subsets of plugins into ready-to-use distributions (basic, slim, full, confetti, fireworks, etc.)
- ~138 workspace packages under the `@tsparticles/` npm scope, all versioned together at `4.0.0-alpha.24`
- Tree-shakeable: consumers only load the plugins they need; bundles are convenience aggregations

## Layers

**Engine Core (`engine/src/Core/`):**

- Purpose: The microkernel — animation loop, container lifecycle, particle management, canvas rendering, spatial indexing
- Location: `engine/src/Core/`
- Contains: `Engine.ts`, `Container.ts`, `Particle.ts`, `Particles.ts`, `Canvas.ts`, `Retina.ts`
- Depends on: `engine/src/Utils/`, `engine/src/Options/`, `engine/src/Enums/`
- Used by: Every plugin, bundle, and consumer

**Engine Options (`engine/src/Options/`):**

- Purpose: Configuration model — option classes and interfaces for all core particle settings
- Location: `engine/src/Options/Classes/` (implementations), `engine/src/Options/Interfaces/` (contracts)
- Contains: `Options.ts`, `ParticlesOptions.ts`, `Move.ts`, `Opacity.ts`, `Size.ts`, `Shape.ts`, and many more
- Depends on: `engine/src/Utils/`
- Used by: Engine Core, plugins that extend options

**Engine Utilities (`engine/src/Utils/`):**

- Purpose: Shared math, color, canvas drawing, type checking, event dispatching utilities
- Location: `engine/src/Utils/`
- Contains: `MathUtils.ts`, `ColorUtils.ts`, `CanvasUtils.ts`, `EventDispatcher.ts`, `TypeUtils.ts`, `Utils.ts`, `OptionsUtils.ts`, `LogUtils.ts`
- Depends on: Engine Enums, Engine Interfaces
- Used by: Engine Core, all plugins

**Engine Enums (`engine/src/Enums/`):**

- Purpose: Type-safe constants for directions, modes, animation states
- Location: `engine/src/Enums/`
- Contains: `MoveDirection.ts`, `OutMode.ts`, `EasingType.ts`, `EventType.ts`, etc.
- Depends on: Nothing
- Used by: Everything

**Engine Types (`engine/src/Types/`):**

- Purpose: TypeScript type definitions shared across engine
- Location: `engine/src/Types/`
- Contains: `ISourceOptions.ts`, `RecursivePartial.ts`, `SingleOrMultiple.ts`, `RangeValue.ts`, etc.
- Depends on: Engine Options interfaces
- Used by: Everything

**Plugin Packages (shapes, updaters, movers, effects, interactions, paths, plugins):**

- Purpose: Feature implementations that extend engine capabilities via registration
- Location: `shapes/*/`, `updaters/*/`, `move/*/`, `effects/*/`, `interactions/*/`, `paths/*/`, `plugins/*/`
- Contains: Implementation classes + `index.ts` with `load*()` registration function
- Depends on: `@tsparticles/engine` (and sometimes `@tsparticles/plugin-interactivity`)
- Used by: Bundle packages and direct consumers

**Bundle Packages (`bundles/`):**

- Purpose: Compose groups of plugins into convenient meta-packages
- Location: `bundles/basic/`, `bundles/slim/`, `bundles/full/`, `bundles/all/`, `bundles/confetti/`, `bundles/fireworks/`, `bundles/pjs/`
- Contains: `index.ts` (load function aggregating plugins) + `bundle.ts` (re-exports engine + load function)
- Depends on: Engine + selected plugin packages
- Used by: End consumers

**Utility Packages (`utils/`):**

- Purpose: Shared utility libraries used by multiple plugin packages
- Location: `utils/canvasUtils/`, `utils/pathUtils/`, `utils/configs/`, `utils/perlinNoise/`, `utils/simplexNoise/`, `utils/fractalNoise/`, `utils/noiseField/`, `utils/smoothValueNoise/`, `utils/tests/`
- Contains: Standalone utility implementations
- Depends on: `@tsparticles/engine` (some)
- Used by: Path plugins, effect plugins

## Data Flow

**Initialization Flow:**

1. Consumer calls `loadSlim(engine)` or similar bundle loader, which registers all included plugins via `engine.register()`
2. Registration stores initializer functions in `engine.initializers` maps (shapes, effects, movers, updaters, pathGenerators)
3. Consumer calls `engine.load({ id, options })`, which triggers `engine.init()` to execute all registered loaders
4. `Engine.load()` creates a `Container` with the given options, finds/creates a DOM element + canvas
5. `Container.start()` → `Container.init()` initializes plugins, retina scaling, canvas, particles
6. `Container.play()` starts the animation loop via `requestAnimationFrame`

**Animation Loop (per frame):**

1. `Container._nextFrame(timestamp)` calculates delta time, respects FPS limit
2. `Canvas.drawParticles(delta)` iterates particles sorted by z-index layers
3. For each particle: apply updaters, movers, interactions, then draw shape + effect via drawers
4. Plugins get lifecycle hooks: `update(delta)`, `draw(context, delta)`, `postUpdate(delta)`, etc.
5. Loop continues via `requestAnimationFrame` until container is paused/destroyed/expired

**Plugin Registration Flow:**

1. Plugin package exports a `load*()` async function (e.g., `loadCircleShape`, `loadColorUpdater`)
2. Inside, it calls `engine.register(callback)` which queues the callback
3. The callback calls one of the `engine.add*()` methods: `addShape()`, `addParticleUpdater()`, `addMover()`, `addEffect()`, `addPlugin()`, `addPathGenerator()`, `addEasing()`, `addColorManager()`
4. Each `add*()` method stores an initializer factory function, using lazy `import()` for the actual implementation
5. When a `Container` is created, the engine resolves initializers into concrete instances per-container

**State Management:**

- Global state: `Engine` singleton on `globalThis.tsParticles` holds plugin registrations and container instances
- Per-container state: Each `Container` owns its `Options`, `Particles`, `Canvas`, `Retina`, and plugin instances
- Per-particle state: Each `Particle` instance holds position, velocity, color, opacity, size, shape data, etc.
- Spatial indexing: `QuadTree` in `engine/src/Core/Utils/QuadTree.ts` for efficient neighbor/range queries
- Events: `EventDispatcher` in `engine/src/Utils/EventDispatcher.ts` for pub/sub lifecycle events

## Key Abstractions

**Engine (`engine/src/Core/Engine.ts`):**

- Purpose: Singleton that manages plugin registration, container lifecycle, and global configuration
- Pattern: Service locator + registry — plugins register themselves, engine resolves them per-container
- Key methods: `register()`, `load()`, `addShape()`, `addParticleUpdater()`, `addMover()`, `addEffect()`, `addPlugin()`, `addPathGenerator()`, `addEasing()`, `addColorManager()`

**Container (`engine/src/Core/Container.ts`):**

- Purpose: A single particle animation instance bound to an HTML canvas element
- Pattern: Composition — owns Canvas, Particles, Retina, plugin instances
- Key methods: `start()`, `stop()`, `pause()`, `play()`, `refresh()`, `destroy()`, `init()`

**Particle (`engine/src/Core/Particle.ts`):**

- Purpose: Individual particle with position, velocity, visual properties, and lifecycle
- Pattern: Data object with initialization logic; updated externally by updaters/movers

**IPlugin (`engine/src/Core/Interfaces/IPlugin.ts`):**

- Purpose: Interface for registering container-level plugins (absorbers, emitters, background mask, etc.)
- Methods: `getPlugin(container)`, `loadOptions()`, `needsPlugin()`
- Implementors: `plugins/absorbers/src/AbsorbersPlugin.ts`, `plugins/emitters/`, `plugins/backgroundMask/`, etc.

**IContainerPlugin (`engine/src/Core/Interfaces/IContainerPlugin.ts`):**

- Purpose: Interface for plugin instances scoped to a specific container
- Methods: ~30 optional lifecycle hooks (`init`, `start`, `stop`, `destroy`, `draw`, `update`, `particleCreated`, `particleUpdate`, etc.)
- Implementors: `AbsorbersPluginInstance`, `EmittersPluginInstance`, etc.

**IShapeDrawer (`engine/src/Core/Interfaces/IShapeDrawer.ts`):**

- Purpose: Draws a specific particle shape on canvas
- Methods: `draw(data)`, optional `init()`, `particleInit()`, `beforeDraw()`, `afterDraw()`
- Implementors: `shapes/circle/src/CircleDrawer.ts`, `shapes/star/`, `shapes/square/`, etc.

**IEffectDrawer (`engine/src/Core/Interfaces/IEffectDrawer.ts`):**

- Purpose: Draws visual effects around/on particles
- Methods: `drawBefore()`, `drawAfter()`, optional `init()`, `particleInit()`
- Implementors: `effects/trail/src/TrailDrawer.ts`, `effects/bubble/`, `effects/shadow/`

**IParticleUpdater (`engine/src/Core/Interfaces/IParticleUpdater.ts`):**

- Purpose: Updates particle properties each frame (color, opacity, size, rotation, etc.)
- Methods: `init(particle)`, `isEnabled(particle)`, `update(particle, delta)`, optional `loadOptions()`
- Implementors: `updaters/color/src/ColorUpdater.ts`, `updaters/opacity/`, `updaters/size/`, etc.

**IParticleMover (`engine/src/Core/Interfaces/IParticleMover.ts`):**

- Purpose: Moves particles each frame (position updates, gravity, spin)
- Methods: `init(particle)`, `isEnabled(particle)`, `move(particle, delta)`
- Implementors: `move/base/src/BaseMover.ts`

**IMovePathGenerator (`engine/src/Core/Interfaces/IMovePathGenerator.ts`):**

- Purpose: Generates movement path vectors for particles
- Methods: `init()`, `update()`, `generate(particle, delta)`, `reset(particle)`
- Implementors: `paths/perlinNoise/`, `paths/simplexNoise/`, `paths/curves/`, etc.

## Entry Points

**Engine Library (`engine/src/index.ts`):**

- Location: `engine/src/index.ts`
- Triggers: Imported by consumers and bundles
- Responsibilities: Creates `Engine` singleton, sets it on `globalThis.tsParticles`, re-exports all public APIs

**Bundle Entry Points (`bundles/*/src/index.ts`):**

- Location: `bundles/basic/src/index.ts`, `bundles/slim/src/index.ts`, `bundles/full/src/index.ts`
- Triggers: Imported by consumers
- Responsibilities: Export `load*()` functions that register curated sets of plugins

**Plugin Entry Points (`{category}/*/src/index.ts`):**

- Location: Every plugin package has `src/index.ts`
- Triggers: Imported by bundles or directly by consumers
- Responsibilities: Export `load*()` function that calls `engine.register()` + `engine.add*()`
- Pattern: All follow the same structure:
  ```typescript
  export async function load*(engine: Engine): Promise<void> {
    engine.checkVersion(__VERSION__);
    await engine.register(e => {
      e.add*("name", async () => {
        const { Implementation } = await import("./Implementation.js");
        return new Implementation();
      });
    });
  }
  ```

**Consumer Entry Point (demo):**

- Location: `demo/vite/src/main.ts`, `demo/vanilla/`, `demo/electron/`
- Triggers: User loads web page
- Responsibilities: Import engine + bundle, call `load*()`, then `tsParticles.load({ id, options })`

## Error Handling

**Strategy:** Defensive programming with guard checks and try-catch in critical paths

**Patterns:**

- `guardCheck(container)` function in `Container.ts` prevents operations on destroyed containers — called at the start of most public methods
- Animation loop wraps frame processing in try-catch, logging errors via `getLogger().error()` without crashing
- Version checking: `engine.checkVersion(__VERSION__)` in every plugin's `load*()` function throws if engine/plugin version mismatch
- Fetch errors in `getDataFromUrl()` are caught and logged, returning fallback options
- No global error boundaries — errors in individual plugins don't crash the engine

## Cross-Cutting Concerns

**Logging:**

- `engine/src/Utils/LogUtils.ts` provides `getLogger()` returning a console-like logger
- Used sparingly — primarily for error conditions

**Validation:**

- Options validation is done via the `load()` method on each options class, which applies defaults and type coercion
- `RecursivePartial<T>` type allows consumers to provide partial options; classes fill in defaults

**Event System:**

- `EventDispatcher` (`engine/src/Utils/EventDispatcher.ts`) provides pub/sub within the engine
- Events defined in `engine/src/Enums/Types/EventType.ts`: `containerBuilt`, `containerInit`, `containerStarted`, `containerStopped`, `containerDestroyed`, `containerPaused`, `containerPlay`, `particlesSetup`, `configAdded`
- Container lifecycle events dispatched automatically

**Build System:**

- All packages use `tsparticles-cli build` (from `@tsparticles/cli`)
- Each package produces 5 output formats: browser, CJS, ESM, UMD, types (in `dist/`)
- Webpack configs use `@tsparticles/webpack-plugin` helpers (`loadParticlesShape`, `loadParticlesPlugin`, etc.)
- `__VERSION__` global constant injected at build time
- Multiple tsconfig files per package: `tsconfig.json` (CJS), `tsconfig.module.json` (ESM), `tsconfig.browser.json`, `tsconfig.umd.json`, `tsconfig.types.json`

---

_Architecture analysis: 2026-02-17_
