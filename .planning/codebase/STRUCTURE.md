# STRUCTURE

Top-level layout

- `engine/` — Core runtime and exports (`engine/src/`)
- `plugins/` — Plugins (e.g., `plugins/themes/src/`)
- `paths/` — Path generators (e.g., `paths/grid/src/`)
- `utils/` — Utilities and small libraries (e.g., `utils/perlinNoise/src/`)
- `bundles/` — Build targets and webpack configs for distribution
- `markdown/` — Developer and docs markdown

Notable files

- `package.json` (root) — workspace scripts, devDeps
- `pnpm-workspace.yaml` — workspace package globs
- `nx.json` — Nx configuration for tasks
- `typedoc.json` — typedoc configuration

Directory conventions

- Each package follows `src/` layout with TypeScript sources and package-specific `tsconfig.*.json`.
- Bundles use `tsconfig.browser.json` when building browser-specific bundles.

Naming & file conventions

- PascalCase for classes and types (e.g., `GridPathGenerator.ts` exports `GridPathGenerator`).
- Use `index.ts` for package/module public entry points (`engine/src/index.ts`).

Where to look for runtime vs build code

- Runtime code: `engine/src/`, `plugins/*/src/`, `paths/*/src/`, `utils/*/src/`
- Build/tooling: `bundles/*/`, `typedoc.json`, root `package.json` scripts

Quick navigation pointers

- Start at `engine/src/index.ts` to understand the runtime API surface.
- Explore `plugins/themes/src/` to see how plugins register with the engine.
- Check `bundles/slim/src/` for how bundles are assembled.
