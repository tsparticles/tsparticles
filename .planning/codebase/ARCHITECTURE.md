# ARCHITECTURE

High-level architecture

- Purpose: tsParticles is a TypeScript-based particle engine and collection of plugins and paths. The repository is a monorepo containing engine core, plugins, utility libraries, and bundles.

Primary layers

- Engine (runtime): `engine/src/` — core particle system, utilities, and public exports (`engine/src/index.ts`).
- Plugins: `plugins/*/src/` — extend engine features (themes, etc.).
- Paths & generators: `paths/*/src/` — path generation algorithms and types.
- Utilities: `utils/*/src/` — helper libs (e.g., Perlin noise).
- Bundles: `bundles/*/` — assembly of UMD/ESM bundles through webpack.

Public entry points

- Main runtime entry: `engine/src/index.ts` exports the core API.
- Bundled distribution entry: `bundles/*/src/index.ts` and `bundles/*/src/bundle.ts` for assembled bundles.

Data flow

- Configuration (user options) flows into the Engine API which instantiates containers and particles.
- Plugins register updaters and renderers via plugin registration points; look for `Plugin` classes in `plugins/*/src/`.

Extensibility

- Plugin system with clear plugin interfaces (inspect `plugins/*/src/*Plugin.ts` and `ThemesPlugin.ts`).
- Paths and generators are separate packages that implement specific interfaces (e.g., `GridPathGenerator.ts`).

Where to find architectural decisions

- `engine/src/` — core abstractions and utility helpers (`EventDispatcher.ts`, `CanvasUtils.ts`).
- `plugins/*/` — plugin lifecycle and extension patterns.

Notes on build & distribution

- Bundles are constructed via webpack, producing format-specific outputs. `bundles/slim/` contains a trimmed bundle implementation.

Limitations & boundaries

- No server components; architecture assumes client-side/browser execution for rendering, and Node only for tooling/builds.
