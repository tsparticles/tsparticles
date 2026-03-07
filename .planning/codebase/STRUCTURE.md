# Codebase Structure

**Analysis Date:** 2026-03-03

## Directory Layout (top-level)

```
[project-root]/
├── engine/                 # Core runtime and public API (TypeScript source)
├── bundles/                # Prebuilt bundles that aggregate sets of plugins
├── demo/                   # Demo applications (vanilla, electron)
├── updaters/               # Particle updaters (per-feature packages)
├── interactions/           # Interaction packages (external & particles)
├── shapes/                 # Shape drawers (circle, polygon, emoji, image...)
├── plugins/                # Plugins (interactivity, emitters, etc.)
├── utils/                  # Small utility libraries (noise, fields, etc.)
├── .planning/              # Planning docs and phases (this repo)
├── package.json            # Workspace scripts and devDependencies
├── pnpm-workspace.yaml     # pnpm workspace config
├── nx.json                 # Nx configuration
└── README.md
```

## Key directories and purposes

engine/

- Purpose: core runtime implementation and public API surface.
- Contains: `src/` with core classes, `package.json`, `typedoc.json`, `scripts/`.
- Key files:
  - `engine/src/index.ts` — library entrypoint, sets `globalThis.tsParticles`.
  - `engine/src/initEngine.ts` — Engine initializer.
  - `engine/src/exports.ts` and `engine/src/export-types.ts` — public exports.
  - `engine/src/Core/Engine.ts`, `engine/src/Core/Container.ts` — main runtime classes.

bundles/

- Purpose: produce browser-ready bundles that include engine + commonly-used plugins.
- Pattern: each bundle has `src/` for a loader (e.g. `bundles/slim/src/index.ts`), `webpack.config.js` and `dist/` with generated artifacts.
- Example paths: `bundles/slim/src/index.ts`, `bundles/slim/dist/tsparticles.slim.bundle.js`.

updaters/, interactions/, shapes/

- Purpose: broken-down feature packages that each expose a loader function.
- Structure: `updaters/<name>/src/`, `interactions/external/<name>/src/`, `shapes/<name>/src/`.
- Example files:
  - `updaters/size/src/SizeUpdater.ts`
  - `interactions/external/bounce/src/Bouncer.ts`
  - `shapes/rounded-polygon/src/RoundedPolygonDrawer.ts`

utils/

- Purpose: small libraries usable by engine and external projects.
- Layout: `utils/<lib>/src/` and `utils/<lib>/dist/` after build.
- Example: `utils/perlinNoise/src/PerlinNoise.ts`, `utils/noiseField/dist/` bundles.

demo/

- Purpose: example apps that run the built packages and host sample pages.
- Important files: `demo/vanilla/app.ts` (Express server), `demo/vanilla/views/*.pug`, `demo/vanilla/public/javascripts/*.js`.

.planning/

- Purpose: planning and phase documents used by this repo's process.
- Contains: `.planning/phases/*` and the files this mapping writes (`.planning/codebase/ARCHITECTURE.md`, `.planning/codebase/STRUCTURE.md`).

Other top-level files

- `package.json` — workspace scripts and central devDependencies (run with pnpm).
- `pnpm-workspace.yaml` — list of workspace packages.
- `nx.json` — Nx monorepo configuration.

## Example file map (notable files)

- `engine/src/Core/Engine.ts` — engine registry, plugin and preset management.
- `engine/src/Core/Container.ts` — container lifecycle, animation loop, plugin orchestration.
- `engine/src/Core/Canvas.ts` — canvas drawing and background handling.
- `engine/src/Utils/EventDispatcher.ts` — event pub/sub used by engine and containers.
- `bundles/slim/src/index.ts` — bundle loader that imports many packages and registers them.
- `bundles/slim/dist/tsparticles.slim.bundle.js` — prebuilt bundle for browser consumption.
- `updaters/size/src/SizeUpdater.ts` — an example updater implementation.
- `interactions/external/bounce/src/Bouncer.ts` — example external interaction.
- `shapes/rounded-polygon/src/RoundedPolygonDrawer.ts` — example shape drawer.
- `utils/perlinNoise/src/PerlinNoise.ts` — utility noise generator.
- `demo/vanilla/app.ts` — demo server mounting many built packages under static routes.

## Where to find sources vs build outputs

- Sources: every package contains `src/` with TypeScript source files. Examples:
  - `engine/src/*.ts`, `updaters/*/src/*.ts`, `shapes/*/src/*.ts`, `utils/*/src/*.ts`.
- Build outputs: packages that produce a distribution place compiled artifacts in `dist/` (UMD/CJS/ESM). Examples:
  - `bundles/slim/dist/` (many `.js` files and `tsparticles.slim.bundle.js`)
  - `utils/perlinNoise/dist/` contains `tsparticles.perlin.noise.js` and module builds.

## Tests and fixtures

- Tests live under specialized packages (see `utils/tests/` referenced in AGENTS.md). Search `*.test.*` or vitest project configs per package.
- The repo uses Vitest as test runner. Top-level devDependencies include `vitest` (see root `package.json` lines ~80).

## Docs and typedoc

- Each package may include `typedoc.json` (e.g. `engine/typedoc.json`, `bundles/slim/typedoc.json`).
- Root `package.json` scripts include `build:docs` → `typedoc` which generates docs from engine and packages.

## Naming & placement guidance (where to add new code)

New engine-level features

- Add to: `engine/src/` (Core classes go in `engine/src/Core/`, reusable utils to `engine/src/Utils/`).
- Tests: add package-local tests under an appropriate `tests/` folder inside `engine` or follow existing test conventions (see `utils/tests/` for patterns).

New plugin/shape/updater

- Create a new package under `updaters/`, `shapes/`, or `interactions/` with `package.json`, `src/`, and `typedoc.json`.
- Export a loader function named `load<FeatureName>` which accepts `engine: Engine` and registers the feature.
- Example: `updaters/my-updater/src/index.ts` exporting `export async function loadMyUpdater(engine: Engine) { /* register */ }`.

New bundle

- Add a `bundles/<name>/src/index.ts` loader that dynamically imports packages and calls their loader functions, following the pattern in `bundles/slim/src/index.ts`.
- Add `webpack.config.js`, `typedoc.json`, and `package.json` for packaging.

Utilities & shared code

- Put generic helpers into `utils/<lib>/src/` and expose minimal public APIs.

## File & naming conventions (observed patterns)

- TypeScript source files use PascalCase for classes and matching filenames (e.g. `Container.ts` exports `Container`).
- Loader functions follow `loadXxx` naming (e.g. `loadSlim`, `loadExternalBounceInteraction`).
- Packages follow standard npm layout with `src/`, `dist/`, `package.json` and `package.dist.json` when publishing.

---

_Structure analysis: 2026-03-03_
