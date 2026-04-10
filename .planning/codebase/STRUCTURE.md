# Codebase Structure

**Analysis Date:** 2026-04-10

## Directory Layout

```text
tsparticles/
├── engine/                 # Core runtime kernel (Engine, Container, rendering, options, exports)
├── bundles/                # Distribution packages composing multiple feature packages
├── plugins/                # Optional plugin packages (interactivity, effects, masks, motion, etc.)
├── interactions/           # External/particles/light interaction packages
├── updaters/               # Particle updater packages (opacity, size, rotate, etc.)
├── shapes/                 # Shape drawer packages
├── paths/                  # Path generator packages
├── effects/                # Visual effect packages
├── utils/                  # Shared utility packages + tests package
├── demo/                   # Demo applications (vite, vanilla server, electron, static)
├── docs/                   # Generated documentation output
├── scripts/                # Workspace automation scripts
├── nx.json                 # Nx workspace task/caching defaults
├── pnpm-workspace.yaml     # Workspace package topology
└── package.json            # Root scripts/toolchain configuration
```

## Directory Purposes

**`engine/`:**

- Purpose: Central runtime and public API package `@tsparticles/engine`.
- Contains: Source in `engine/src/*`, build configs (`engine/tsconfig*.json`, `engine/webpack.config.js`), package metadata `engine/package.json`.
- Key files: `engine/src/index.ts`, `engine/src/Core/Engine.ts`, `engine/src/Core/Container.ts`, `engine/src/exports.ts`.

**`bundles/`:**

- Purpose: Curated package distributions that compose many feature packages.
- Contains: One package per bundle under `bundles/*` with `src/index.ts` and `src/bundle.ts`.
- Key files: `bundles/basic/src/index.ts`, `bundles/slim/src/index.ts`, `bundles/full/src/index.ts`, `bundles/all/src/index.ts`, `bundles/confetti/src/confetti.ts`, `bundles/fireworks/src/fireworks.ts`.

**`plugins/`:**

- Purpose: Feature plugins installed into engine plugin manager.
- Contains: Per-plugin packages with loaders, plugin implementation, option models.
- Key files: `plugins/emitters/src/index.ts`, `plugins/emitters/src/plugin.ts`, `plugins/emitters/src/interaction.ts`, `plugins/absorbers/src/index.ts`.

**`interactions/`:**

- Purpose: Interaction behavior packages grouped by domain (`external`, `particles`, `light`).
- Contains: Interactor loaders and runtime classes.
- Key files: `interactions/external/repulse/src/index.ts`, `interactions/particles/links/src/index.ts`, `interactions/light/src/index.ts`.

**`updaters/`:**

- Purpose: Particle update-step extensions.
- Contains: Loader + updater implementation per package.
- Key files: `updaters/opacity/src/index.ts`, `updaters/size/src/index.ts`, `updaters/rotate/src/index.ts`.

**`shapes/`:**

- Purpose: Shape drawer extensions.
- Contains: Loader + shape drawer class per package.
- Key files: `shapes/circle/src/index.ts`, `shapes/path/src/index.ts`, `shapes/text/src/index.ts`.

**`paths/`:**

- Purpose: Path generator plugins.
- Contains: Path-specific package implementations (grid, noise, spiral, svg, etc.).
- Key files: `paths/grid/package.json`, `paths/svg/package.json`, `paths/perlinNoise/package.json`.

**`effects/`:**

- Purpose: Effect drawer packages for post/extra visual effects.
- Contains: Effect packages and loader entrypoints.
- Key files: `effects/bubble/package.json`, `effects/filter/package.json`, `effects/trail/package.json`.

**`utils/`:**

- Purpose: Shared utility packages and test harness package.
- Contains: Utility libraries (`utils/canvasUtils`, `utils/configs`, noise/path helpers) and Vitest package `utils/tests`.
- Key files: `utils/tests/vitest.config.ts`, `utils/configs/package.json`, `utils/canvasUtils/package.json`.

**`demo/`:**

- Purpose: Runtime showcase applications for browser/server/electron.
- Contains: Vite TS app, Express + Pug demo app, Electron demo, static demo site.
- Key files: `demo/vite/src/main.ts`, `demo/vanilla/app.ts`, `demo/electron/app/index.js`, `demo/electron/client/client.js`, `demo/vanilla_new/js/404.js`.

## Key File Locations

**Entry Points:**

- `engine/src/index.ts`: Primary engine import path; initializes global `tsParticles` and exports API/types.
- `engine/src/bundle.ts`: Bundle-focused engine entrypoint.
- `bundles/basic/src/index.ts`: Minimal curated loader.
- `bundles/slim/src/index.ts`: Mid-size curated loader.
- `bundles/full/src/index.ts`: Full compatibility loader.
- `bundles/all/src/index.ts`: Maximal feature loader.
- `demo/vite/src/main.ts`: Vite demo runtime bootstrap.
- `demo/vanilla/app.ts`: Express demo server bootstrap.

**Configuration:**

- `nx.json`: Nx target defaults, caching inputs, cloud config.
- `pnpm-workspace.yaml`: Package location globs and workspace linking mode.
- `package.json`: Root build orchestration scripts.
- `tsconfig.json`: Root TypeScript baseline.

**Core Logic:**

- `engine/src/Core/Engine.ts`: Engine lifecycle and container management.
- `engine/src/Core/Container.ts`: Container lifecycle, animation loop, plugin wiring.
- `engine/src/Core/ParticlesManager.ts`: Particle creation/update/density/spatial indexing.
- `engine/src/Core/RenderManager.ts`: Per-frame draw orchestration and plugin render hooks.
- `engine/src/Core/Utils/PluginManager.ts`: Global registries for plugins/updaters/shapes/effects.

**Testing:**

- `utils/tests/src/tests/*.ts`: Main workspace test suites.
- `utils/tests/vitest.config.ts`: Vitest runtime configuration.

## Naming Conventions

**Files:**

- Class/major type files use PascalCase in engine core: `engine/src/Core/Container.ts`, `engine/src/Core/RenderManager.ts`.
- Package entry files use lowercase `index.ts` plus optional companion files (`plugin.ts`, `interaction.ts`, `bundle.ts`).
- Interfaces/types commonly use `I*` prefixes in dedicated folders: `engine/src/Core/Interfaces/IParticleUpdater.ts`, `engine/src/Options/Interfaces/IOptions.ts`.

**Directories:**

- Workspace feature directories are categorized by capability: `plugins/`, `interactions/`, `updaters/`, `shapes/`, `paths/`, `effects/`.
- Package directories are generally lowercase or camelCase (`plugins/backgroundMask`, `paths/simplexNoise`).

## Where to Add New Code

**New Feature:**

- Primary code: Create a new package under the matching capability root (`plugins/<feature>/`, `interactions/<domain>/<feature>/`, `updaters/<feature>/`, `shapes/<feature>/`, `paths/<feature>/`, `effects/<feature>/`).
- Tests: Add or extend tests under `utils/tests/src/tests/` and/or package-local test location if already present.

**New Component/Module:**

- Engine-level runtime changes: place under `engine/src/Core/*` for lifecycle/render/update behavior, `engine/src/Options/*` for option model changes, and re-export from `engine/src/exports.ts` / `engine/src/export-types.ts` if public.
- Package-level extension: place in package-local `src/` and expose via `src/index.ts` loader.

**Utilities:**

- Shared helpers: prefer existing utility packages in `utils/*`.
- Engine-internal helpers: place under `engine/src/Utils/*` only when tightly coupled to engine internals.

## Special Directories

**`docs/`:**

- Purpose: Generated TypeDoc output used for published/reference docs.
- Generated: Yes.
- Committed: Yes.

**`dist/` directories inside packages (for example `engine/dist/`, `bundles/full/dist/`):**

- Purpose: Build artifacts for package publishing/consumption.
- Generated: Yes.
- Committed: Yes (present across packages in current tree).

**`.planning/codebase/`:**

- Purpose: Architecture/planning reference docs consumed by GSD workflows.
- Generated: No (authored analysis documents).
- Committed: Yes.

**`.nx/`:**

- Purpose: Nx local cache/state.
- Generated: Yes.
- Committed: No (workspace cache directory).

---

_Structure analysis: 2026-04-10_
