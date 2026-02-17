# Codebase Structure

**Analysis Date:** 2026-02-17

## Directory Layout

```
tsparticles/
├── engine/                   # Core engine package (@tsparticles/engine)
│   ├── src/
│   │   ├── Core/             # Runtime: Engine, Container, Particle, Canvas, Retina
│   │   ├── Options/          # Configuration model (Classes + Interfaces)
│   │   ├── Enums/            # Type-safe constants
│   │   ├── Types/            # TypeScript type definitions
│   │   ├── Utils/            # Shared utilities (math, color, canvas, events)
│   │   ├── index.ts          # Main entry: creates Engine singleton
│   │   ├── bundle.ts         # Bundle entry (no type exports)
│   │   ├── initEngine.ts     # Engine factory function
│   │   ├── exports.ts        # Value re-exports barrel
│   │   └── export-types.ts   # Type-only re-exports barrel
│   ├── dist/                 # Build output (browser, cjs, esm, umd, types)
│   └── scripts/              # Build helper scripts
├── bundles/                  # Meta-packages composing plugin sets
│   ├── basic/                # @tsparticles/basic — minimal working set
│   ├── slim/                 # @tsparticles/slim — common features
│   ├── full/                 # @tsparticles/full — full feature set
│   ├── all/                  # @tsparticles/all — every plugin
│   ├── confetti/             # @tsparticles/confetti — confetti preset
│   ├── fireworks/            # @tsparticles/fireworks — fireworks preset
│   └── pjs/                  # @tsparticles/pjs — particles.js compatibility
├── shapes/                   # Shape drawer plugins (IShapeDrawer)
│   ├── circle/               # @tsparticles/shape-circle
│   ├── star/                 # @tsparticles/shape-star
│   ├── square/               # @tsparticles/shape-square
│   ├── polygon/              # @tsparticles/shape-polygon
│   ├── line/                 # @tsparticles/shape-line
│   ├── emoji/                # @tsparticles/shape-emoji
│   ├── image/                # @tsparticles/shape-image
│   ├── text/                 # @tsparticles/shape-text
│   ├── heart/                # @tsparticles/shape-heart
│   ├── arrow/                # @tsparticles/shape-arrow
│   ├── cards/                # @tsparticles/shape-cards
│   ├── cog/                  # @tsparticles/shape-cog
│   ├── infinity/             # @tsparticles/shape-infinity
│   ├── path/                 # @tsparticles/shape-path
│   ├── rounded-polygon/      # @tsparticles/shape-rounded-polygon
│   ├── rounded-rect/         # @tsparticles/shape-rounded-rect
│   └── spiral/               # @tsparticles/shape-spiral
├── updaters/                 # Particle property updater plugins (IParticleUpdater)
│   ├── color/                # @tsparticles/updater-color
│   ├── opacity/              # @tsparticles/updater-opacity
│   ├── size/                 # @tsparticles/updater-size
│   ├── outModes/             # @tsparticles/updater-out-modes
│   ├── rotate/               # @tsparticles/updater-rotate
│   ├── life/                 # @tsparticles/updater-life
│   ├── strokeColor/          # @tsparticles/updater-stroke-color
│   ├── destroy/              # @tsparticles/updater-destroy
│   ├── gradient/             # @tsparticles/updater-gradient
│   ├── orbit/                # @tsparticles/updater-orbit
│   ├── roll/                 # @tsparticles/updater-roll
│   ├── tilt/                 # @tsparticles/updater-tilt
│   ├── twinkle/              # @tsparticles/updater-twinkle
│   └── wobble/               # @tsparticles/updater-wobble
├── move/                     # Particle mover plugins (IParticleMover)
│   └── base/                 # @tsparticles/move-base
├── effects/                  # Visual effect plugins (IEffectDrawer)
│   ├── bubble/               # @tsparticles/effect-bubble
│   ├── particles/            # @tsparticles/effect-particles
│   ├── shadow/               # @tsparticles/effect-shadow
│   └── trail/                # @tsparticles/effect-trail
├── interactions/             # User/particle interaction plugins
│   ├── external/             # Mouse/touch interactions (ExternalInteractorBase)
│   │   ├── attract/          # @tsparticles/interaction-external-attract
│   │   ├── bounce/           # @tsparticles/interaction-external-bounce
│   │   ├── bubble/           # @tsparticles/interaction-external-bubble
│   │   ├── connect/          # @tsparticles/interaction-external-connect
│   │   ├── grab/             # @tsparticles/interaction-external-grab
│   │   ├── parallax/         # @tsparticles/interaction-external-parallax
│   │   ├── particle/         # @tsparticles/interaction-external-particle
│   │   ├── pause/            # @tsparticles/interaction-external-pause
│   │   ├── pop/              # @tsparticles/interaction-external-pop
│   │   ├── push/             # @tsparticles/interaction-external-push
│   │   ├── remove/           # @tsparticles/interaction-external-remove
│   │   ├── repulse/          # @tsparticles/interaction-external-repulse
│   │   ├── slow/             # @tsparticles/interaction-external-slow
│   │   └── trail/            # @tsparticles/interaction-external-trail
│   ├── particles/            # Particle-to-particle interactions (ParticlesInteractorBase)
│   │   ├── attract/          # @tsparticles/interaction-particles-attract
│   │   ├── collisions/       # @tsparticles/interaction-particles-collisions
│   │   ├── links/            # @tsparticles/interaction-particles-links
│   │   └── repulse/          # @tsparticles/interaction-particles-repulse
│   └── light/                # @tsparticles/interaction-light
├── paths/                    # Path generator plugins (IMovePathGenerator)
│   ├── perlinNoise/          # @tsparticles/path-perlin-noise
│   ├── simplexNoise/         # @tsparticles/path-simplex-noise
│   ├── curves/               # @tsparticles/path-curves
│   ├── polygon/              # @tsparticles/path-polygon
│   ├── branches/             # @tsparticles/path-branches
│   ├── brownian/             # @tsparticles/path-brownian
│   ├── curlNoise/            # @tsparticles/path-curl-noise
│   ├── fractalNoise/         # @tsparticles/path-fractal-noise
│   ├── grid/                 # @tsparticles/path-grid
│   ├── levy/                 # @tsparticles/path-levy
│   ├── random/               # @tsparticles/path-random
│   ├── spiral/               # @tsparticles/path-spiral
│   ├── svg/                  # @tsparticles/path-svg
│   └── zigzag/               # @tsparticles/path-zig-zag
├── plugins/                  # General-purpose plugins (IPlugin + various)
│   ├── absorbers/            # @tsparticles/plugin-absorbers
│   ├── backgroundMask/       # @tsparticles/plugin-background-mask
│   ├── blend/                # @tsparticles/plugin-blend
│   ├── canvasMask/           # @tsparticles/plugin-canvas-mask
│   ├── emitters/             # @tsparticles/plugin-emitters
│   ├── emittersShapes/       # Emitter shape sub-plugins
│   │   ├── canvas/           # @tsparticles/plugin-emitters-shape-canvas
│   │   ├── circle/           # @tsparticles/plugin-emitters-shape-circle
│   │   ├── path/             # @tsparticles/plugin-emitters-shape-path
│   │   ├── polygon/          # @tsparticles/plugin-emitters-shape-polygon
│   │   └── square/           # @tsparticles/plugin-emitters-shape-square
│   ├── exports/              # Export plugins
│   │   ├── image/            # @tsparticles/plugin-export-image
│   │   ├── json/             # @tsparticles/plugin-export-json
│   │   └── video/            # @tsparticles/plugin-export-video
│   ├── colors/               # Color format plugins (IColorManager)
│   │   ├── hex/              # @tsparticles/plugin-hex-color
│   │   ├── hsl/              # @tsparticles/plugin-hsl-color
│   │   ├── hsv/              # @tsparticles/plugin-hsv-color
│   │   ├── hwb/              # @tsparticles/plugin-hwb-color
│   │   ├── lab/              # @tsparticles/plugin-lab-color
│   │   ├── lch/              # @tsparticles/plugin-lch-color
│   │   ├── named/            # @tsparticles/plugin-named-color
│   │   ├── oklab/            # @tsparticles/plugin-oklab-color
│   │   ├── oklch/            # @tsparticles/plugin-oklch-color
│   │   └── rgb/              # @tsparticles/plugin-rgb-color
│   ├── easings/              # Easing function plugins
│   │   ├── back/             # @tsparticles/plugin-easing-back
│   │   ├── bounce/           # @tsparticles/plugin-easing-bounce
│   │   ├── circ/             # @tsparticles/plugin-easing-circ
│   │   ├── cubic/            # @tsparticles/plugin-easing-cubic
│   │   ├── elastic/          # @tsparticles/plugin-easing-elastic
│   │   ├── expo/             # @tsparticles/plugin-easing-expo
│   │   ├── gaussian/         # @tsparticles/plugin-easing-gaussian
│   │   ├── linear/           # @tsparticles/plugin-easing-linear
│   │   ├── quad/             # @tsparticles/plugin-easing-quad
│   │   ├── quart/            # @tsparticles/plugin-easing-quart
│   │   ├── quint/            # @tsparticles/plugin-easing-quint
│   │   ├── sigmoid/          # @tsparticles/plugin-easing-sigmoid
│   │   ├── sine/             # @tsparticles/plugin-easing-sine
│   │   └── smoothstep/       # @tsparticles/plugin-easing-smoothstep
│   ├── infection/            # @tsparticles/plugin-infection
│   ├── interactivity/        # @tsparticles/plugin-interactivity (core interactivity system)
│   ├── manualParticles/      # @tsparticles/plugin-manual-particles
│   ├── motion/               # @tsparticles/plugin-motion
│   ├── poisson/              # @tsparticles/plugin-poisson-disc
│   ├── polygonMask/          # @tsparticles/plugin-polygon-mask
│   ├── responsive/           # @tsparticles/plugin-responsive
│   ├── sounds/               # @tsparticles/plugin-sounds
│   ├── themes/               # @tsparticles/plugin-themes
│   ├── trail/                # @tsparticles/plugin-trail
│   └── zoom/                 # @tsparticles/plugin-zoom
├── utils/                    # Shared utility packages
│   ├── canvasUtils/          # @tsparticles/canvas-utils
│   ├── configs/              # @tsparticles/configs (A-Z organized preset configs)
│   ├── fractalNoise/         # @tsparticles/fractal-noise
│   ├── noiseField/           # @tsparticles/noise-field
│   ├── pathUtils/            # @tsparticles/path-utils
│   ├── perlinNoise/          # @tsparticles/perlin-noise
│   ├── simplexNoise/         # @tsparticles/simplex-noise
│   ├── smoothValueNoise/     # @tsparticles/smooth-value-noise
│   └── tests/                # @tsparticles/tests (test fixtures & suites)
├── demo/                     # Demo applications
│   ├── vanilla/              # Express-based vanilla JS demo
│   ├── vanilla_new/          # Static HTML demo with config files
│   ├── vite/                 # Vite-based demo
│   └── electron/             # Electron desktop demo
├── markdown/                 # Markdown documentation source files
│   ├── Options/              # Options documentation
│   └── Pages/                # General documentation pages
├── docs/                     # Generated TypeDoc documentation
├── nx.json                   # Nx workspace configuration
├── pnpm-workspace.yaml       # pnpm workspace package locations
├── lerna.json                # Lerna versioning/publishing config
├── package.json              # Root workspace package.json
├── tsconfig.json             # Root TypeScript configuration
└── firebase.json             # Firebase hosting config (for docs)
```

## Directory Purposes

**`engine/`:**

- Purpose: The core engine library — the only required package
- Contains: Engine runtime, particle management, canvas rendering, options model, utilities
- Key files: `src/Core/Engine.ts`, `src/Core/Container.ts`, `src/Core/Particle.ts`, `src/index.ts`

**`bundles/`:**

- Purpose: Pre-composed collections of plugins for common use cases
- Contains: Aggregation packages that import and register plugin subsets
- Key files: Each has `src/index.ts` (load function) and `src/bundle.ts` (re-exports)
- Hierarchy: `basic` ⊂ `slim` ⊂ `full` ⊂ `all`

**`shapes/`:**

- Purpose: Visual shape implementations for particles
- Contains: One package per shape, each implementing `IShapeDrawer`
- Key files: `src/index.ts` (registration), `src/*Drawer.ts` (implementation)

**`updaters/`:**

- Purpose: Per-frame particle property update logic
- Contains: One package per property updater, each implementing `IParticleUpdater`
- Key files: `src/index.ts` (registration), `src/*Updater.ts` (implementation)

**`move/`:**

- Purpose: Particle movement implementations
- Contains: Movement strategy packages implementing `IParticleMover`
- Key files: `move/base/src/BaseMover.ts` (the default mover)

**`effects/`:**

- Purpose: Visual effect implementations (trails, shadows, bubbles)
- Contains: One package per effect implementing `IEffectDrawer`
- Key files: `src/index.ts` (registration), `src/*Drawer.ts` (implementation)

**`interactions/`:**

- Purpose: Mouse/touch and particle-to-particle interaction behaviors
- Contains: Two subcategories — `external/` (mouse/touch) and `particles/` (inter-particle)
- Key files: `src/index.ts` (registration), `src/*Interactor.ts` or `src/Attractor.ts` etc.

**`paths/`:**

- Purpose: Path generation algorithms for particle movement
- Contains: One package per path algorithm implementing `IMovePathGenerator`
- Key files: `src/index.ts` (registration), implementation files

**`plugins/`:**

- Purpose: General-purpose engine extensions that don't fit neatly into other categories
- Contains: Sub-grouped packages — `colors/`, `easings/`, `emittersShapes/`, `exports/`, plus standalone plugins
- Key files: `src/index.ts` (registration), `src/*Plugin.ts` + `src/*PluginInstance.ts`

**`utils/`:**

- Purpose: Shared utility libraries and test infrastructure
- Contains: Noise generators, path utilities, canvas helpers, config presets, test suite
- Key files: Varies per package

**`demo/`:**

- Purpose: Working demonstration applications
- Contains: Multiple demo implementations (vanilla JS, Vite, Electron)
- Key files: HTML pages, JS entry points, config JSON files

## Key File Locations

**Entry Points:**

- `engine/src/index.ts`: Main engine entry — creates singleton, exports API
- `engine/src/bundle.ts`: Bundle entry — same as index but without type exports
- `bundles/*/src/index.ts`: Bundle load functions
- `{category}/*/src/index.ts`: Plugin registration functions

**Configuration:**

- `nx.json`: Nx workspace config (build targets, caching, cloud)
- `pnpm-workspace.yaml`: Workspace package locations
- `lerna.json`: Versioning and publishing config
- `tsconfig.json`: Root TypeScript config
- `{package}/tsconfig.json`: Per-package CJS TypeScript config
- `{package}/tsconfig.module.json`: Per-package ESM TypeScript config
- `{package}/tsconfig.browser.json`: Per-package browser TypeScript config
- `{package}/tsconfig.umd.json`: Per-package UMD TypeScript config
- `{package}/tsconfig.types.json`: Per-package type declarations config
- `{package}/tsconfig.base.json`: Per-package base config (rootDir, includes)
- `{package}/webpack.config.js`: Per-package webpack config for UMD bundles
- `{package}/eslint.config.js`: Per-package ESLint config
- `{package}/.browserslistrc`: Per-package browserslist config

**Core Logic:**

- `engine/src/Core/Engine.ts`: Plugin registry, container factory
- `engine/src/Core/Container.ts`: Animation container lifecycle
- `engine/src/Core/Particle.ts`: Individual particle data and behavior
- `engine/src/Core/Particles.ts`: Particle collection manager
- `engine/src/Core/Canvas.ts`: Canvas rendering
- `engine/src/Core/Retina.ts`: HiDPI/Retina scaling
- `engine/src/Core/Utils/QuadTree.ts`: Spatial indexing for particle queries
- `engine/src/Utils/EventDispatcher.ts`: Pub/sub event system

**Testing:**

- `utils/tests/src/tests/`: Test suites for core engine functionality
- `utils/tests/src/Fixture/`: Test utilities and mocks (CustomCanvas, Window)
- `utils/tests/vitest.config.ts`: Vitest configuration

## Naming Conventions

**Packages (npm):**

- Engine: `@tsparticles/engine`
- Bundles: `@tsparticles/{name}` (e.g., `@tsparticles/slim`)
- Shapes: `@tsparticles/shape-{name}` (e.g., `@tsparticles/shape-circle`)
- Updaters: `@tsparticles/updater-{name}` (e.g., `@tsparticles/updater-color`)
- Movers: `@tsparticles/move-{name}` (e.g., `@tsparticles/move-base`)
- Effects: `@tsparticles/effect-{name}` (e.g., `@tsparticles/effect-trail`)
- External interactions: `@tsparticles/interaction-external-{name}` (e.g., `@tsparticles/interaction-external-attract`)
- Particle interactions: `@tsparticles/interaction-particles-{name}` (e.g., `@tsparticles/interaction-particles-links`)
- Paths: `@tsparticles/path-{name}` (e.g., `@tsparticles/path-perlin-noise`)
- Plugins: `@tsparticles/plugin-{name}` (e.g., `@tsparticles/plugin-absorbers`)
- Color plugins: `@tsparticles/plugin-{format}-color` (e.g., `@tsparticles/plugin-hex-color`)
- Easing plugins: `@tsparticles/plugin-easing-{name}` (e.g., `@tsparticles/plugin-easing-quad`)
- Utilities: `@tsparticles/{name}` (e.g., `@tsparticles/perlin-noise`)

**Directories:**

- camelCase for multi-word directories: `outModes/`, `strokeColor/`, `backgroundMask/`, `emittersShapes/`
- kebab-case for some: `rounded-polygon/`, `rounded-rect/`, `curlNoise/`
- Lowercase single words: `color/`, `opacity/`, `circle/`, `star/`

**Files:**

- PascalCase for classes: `CircleDrawer.ts`, `ColorUpdater.ts`, `AbsorbersPlugin.ts`, `BaseMover.ts`
- PascalCase for interfaces: `IPlugin.ts`, `IShapeDrawer.ts`, `ICircleShapeData.ts`
- camelCase for utilities: `index.ts`, `types.ts`, `utils.ts`
- PascalCase for option classes: `Absorber.ts`, `AbsorberLife.ts`, `AbsorberSize.ts`
- PascalCase for enums: `MoveDirection.ts`, `OutMode.ts`, `EasingType.ts`

**Export Functions (load functions):**

- Shape: `loadCircleShape`, `loadStarShape`, `loadPolygonShape`
- Updater: `loadColorUpdater`, `loadSizeUpdater`, `loadOpacityUpdater`
- Mover: `loadBaseMover`
- Effect: `loadTrailEffect`, `loadBubbleEffect`
- Interaction: `loadExternalAttractInteraction`, `loadParticlesLinksInteraction`
- Path: `loadPerlinNoisePath`, `loadSimplexNoisePath`
- Plugin: `loadAbsorbersPlugin`, `loadEmittersPlugin`
- Easing: `loadEasingQuadPlugin`, `loadEasingLinearPlugin`
- Color: `loadHexColorPlugin`, `loadRgbColorPlugin`
- Bundle: `loadBasic`, `loadSlim`, `loadFull`

**Classes:**

- Drawer implementations: `{Shape}Drawer` (e.g., `CircleDrawer`, `StarDrawer`)
- Updater implementations: `{Property}Updater` (e.g., `ColorUpdater`, `SizeUpdater`)
- Mover implementations: `{Name}Mover` (e.g., `BaseMover`)
- Plugin implementations: `{Name}Plugin` + `{Name}PluginInstance` (e.g., `AbsorbersPlugin`, `AbsorbersPluginInstance`)
- Interactor implementations: `{Name}Interactor` or action name (e.g., `Attractor`, `Bouncer`)

## Where to Add New Code

**New Shape:**

- Create directory: `shapes/{shape-name}/`
- Copy structure from `shapes/circle/` as template
- Implementation: `shapes/{shape-name}/src/{Shape}Drawer.ts` implementing `IShapeDrawer`
- Registration: `shapes/{shape-name}/src/index.ts` exporting `load{Shape}Shape(engine)`
- Package name: `@tsparticles/shape-{name}`
- Dependencies: `@tsparticles/engine` as `workspace:*`
- Add to `pnpm-workspace.yaml` under `shapes/*`

**New Updater:**

- Create directory: `updaters/{property-name}/`
- Copy structure from `updaters/color/` as template
- Implementation: `updaters/{property-name}/src/{Property}Updater.ts` implementing `IParticleUpdater`
- Registration: `updaters/{property-name}/src/index.ts` exporting `load{Property}Updater(engine)`
- Package name: `@tsparticles/updater-{name}`

**New Interaction (External):**

- Create directory: `interactions/external/{name}/`
- Copy structure from `interactions/external/attract/` as template
- Implementation: `interactions/external/{name}/src/{Name}.ts`
- Registration: `interactions/external/{name}/src/index.ts` exporting `loadExternal{Name}Interaction(engine)`
- Package name: `@tsparticles/interaction-external-{name}`
- Dependencies: `@tsparticles/engine` + `@tsparticles/plugin-interactivity`

**New Interaction (Particle-to-Particle):**

- Create directory: `interactions/particles/{name}/`
- Copy structure from `interactions/particles/attract/` as template
- Package name: `@tsparticles/interaction-particles-{name}`

**New Plugin:**

- Create directory: `plugins/{name}/`
- Copy structure from `plugins/absorbers/` as template
- Implementation: `plugins/{name}/src/{Name}Plugin.ts` implementing `IPlugin`, `plugins/{name}/src/{Name}PluginInstance.ts` implementing `IContainerPlugin`
- Registration: `plugins/{name}/src/index.ts` exporting `load{Name}Plugin(engine)`
- Package name: `@tsparticles/plugin-{name}`

**New Path Generator:**

- Create directory: `paths/{name}/`
- Copy structure from `paths/perlinNoise/` as template
- Package name: `@tsparticles/path-{name}`

**New Effect:**

- Create directory: `effects/{name}/`
- Copy structure from `effects/trail/` as template
- Implementation: `effects/{name}/src/{Name}Drawer.ts` implementing `IEffectDrawer`
- Registration: `effects/{name}/src/index.ts` exporting `load{Name}Effect(engine)`
- Package name: `@tsparticles/effect-{name}`

**New Easing Function:**

- Create directory: `plugins/easings/{name}/`
- Copy structure from `plugins/easings/quad/` as template
- Package name: `@tsparticles/plugin-easing-{name}`

**New Utility:**

- Create directory: `utils/{name}/`
- Package name: `@tsparticles/{name}`
- Add to `pnpm-workspace.yaml` under `utils/*`

**Adding a Plugin to a Bundle:**

- Edit the bundle's `src/index.ts` (e.g., `bundles/slim/src/index.ts`)
- Add the import to the `Promise.all([...])` block
- Call the load function in the registration callback
- Add the dependency to the bundle's `package.json`

## Special Directories

**`dist/` (in every package):**

- Purpose: Build output containing 5 formats (browser, cjs, esm, umd, types)
- Generated: Yes, by `tsparticles-cli build`
- Committed: No (in `.gitignore`)

**`node_modules/` (root + per-package):**

- Purpose: Installed dependencies (pnpm manages via workspace links)
- Generated: Yes, by `pnpm install`
- Committed: No

**`docs/`:**

- Purpose: Generated TypeDoc API documentation
- Generated: Yes, by `typedoc`
- Committed: Yes (deployed to GitHub Pages/Firebase)

**`markdown/`:**

- Purpose: Source markdown files included in TypeDoc via `[[include:...]]` syntax
- Generated: No
- Committed: Yes

**`utils/configs/src/`:**

- Purpose: A-Z organized preset particle configuration objects
- Generated: No
- Committed: Yes
- Note: Each letter directory contains multiple named config exports

**`.planning/`:**

- Purpose: GSD planning and analysis documents
- Generated: By analysis tools
- Committed: Yes

## Standard Package Files

Every plugin package follows this consistent file structure:

```
{package}/
├── .browserslistrc          # Browser support targets
├── .npmignore               # npm publish ignore patterns (optional)
├── CHANGELOG.md             # Auto-generated changelog
├── eslint.config.js         # ESLint configuration
├── LICENSE                  # MIT license
├── package.json             # Package manifest
├── package.dist.json        # Package.json for dist/ publishing
├── README.md                # Package documentation
├── src/                     # Source code
│   ├── index.ts             # Entry point with load*() function
│   └── ...                  # Implementation files
├── tsconfig.json            # CJS TypeScript config
├── tsconfig.base.json       # Base TypeScript config
├── tsconfig.browser.json    # Browser format config
├── tsconfig.module.json     # ESM format config
├── tsconfig.types.json      # Type declarations config
├── tsconfig.umd.json        # UMD format config
├── typedoc.json             # TypeDoc config
└── webpack.config.js        # Webpack UMD bundle config
```

---

_Structure analysis: 2026-02-17_
