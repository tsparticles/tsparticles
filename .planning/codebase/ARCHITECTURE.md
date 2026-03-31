Architecture overview

## Overview

This repository is organized as a monorepo containing presets and demo applications. It separates reusable preset packages (under `presets/`) from demo applications (under `apps/`).

High-level components

- Presets: `presets/<preset-name>/` - each preset is a small package with source (`src`), build config, and package metadata
- Demo apps: `apps/vite` (Vite-based SPA demo), `apps/demo` (server-side Express/Pug style demo)
- Tooling and config: root-level configs (`tsconfig.json`, `pnpm-workspace.yaml`, `lerna.json`, `typedoc.json`)

Entry points

- For demos: `apps/vite/src/main.ts` (SPA entry), `apps/demo/app.js` (server entry)
- For presets: `presets/*/src/index.ts` each exports the preset options and bundle entry points

Patterns and dataflow

- Build-time: TypeScript sources compiled and bundled per-target (Vite for modern demo, webpack for some presets)
- Runtime: Bundles run in the browser, exposing preset objects consumed by demo apps

Abstractions

- Each preset acts as a small module that exports options and bundle setup (`presets/*/src/options.ts`, `index.ts`)
- Shared tooling and types maintained at root `tsconfig.json` and `typedoc.json`

Operational concerns

- Multiple build systems increases maintenance complexity; adding a single standardized build (Vite/Rollup) could simplify

Where to look in code

- `presets/*/src` for preset implementations
- `apps/vite/src` and `apps/demo` for demo wiring and examples
- `package.json` root for workspace scripts
