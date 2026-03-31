Project technology stack

## Summary

This repository is a TypeScript monorepo that provides particle presets and demo apps.

Key points

- Languages: TypeScript, JavaScript, CSS, Pug templates
- Package manager: pnpm (see `pnpm-workspace.yaml`, `pnpm-lock.yaml`)
- Bundlers / tooling: Vite (app in `apps/vite`), webpack (some presets use `webpack.config.js`), typedoc
- Linting / code quality: ESLint configuration present (`presets/hyperspace/eslint.config.js`)
- Monorepo tooling: Lerna (`lerna.json`) and pnpm workspaces

Runtimes and targets

- Node.js for build tooling and scripts (package.json scripts in repo root)
- Browser: the presets are built to run in browsers via Vite/webpack bundles

Top-level files of interest

- `package.json` - workspace scripts and dependencies
- `pnpm-workspace.yaml`, `pnpm-lock.yaml` - workspace configuration and lockfile
- `tsconfig.json` - TypeScript config for the repository
- `typedoc.json`, `apps/vite/tsconfig.json` - documentation and app-specific configs

Dependencies and notable packages

- Look in `package.json` and `presets/*/package*.json` for exact versions.
- Dev tooling commonly used: `vite`, `typescript`, `webpack`, `eslint`, `typedoc`, `lerna`

Where to check versions

- `package.json` (root) and `presets/*/package.json` (each preset)

Build and local dev

- `apps/vite` contains a Vite-based demo app (entry: `apps/vite/src/main.ts`, `apps/vite/index.html`)
- `apps/demo` contains server-side demo views using Pug templates (`apps/demo/views/*.pug`)

Notes

- The project mixes different build setups for different presets; expect both Vite and legacy webpack configs.
