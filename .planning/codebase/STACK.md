# Technology Stack

**Analysis Date:** 2026-03-01

## Languages

Primary:

- TypeScript (>= 5.x) - source language across the monorepo. Key sources: `engine/src/**`, `bundles/**`, `plugins/**` (e.g. `engine/src/Core/Engine.ts`).

Secondary:

- JavaScript (build outputs, demos) - demos and generated bundles under `demo/` and `bundles/*/`.

## Runtime / Platform

- Node.js (CI uses Node 24 in GitHub Actions) - referenced in `.github/workflows/nodejs.yml` (line: `node-version: '24'`).

## Package manager

- pnpm (workspace) - `package.json` root declares `"packageManager": "pnpm@10.30.3"` and many package.json files use `workspace:` protocol.
- Lockfile: `pnpm-lock.yaml` at repository root.

## Monorepo / Orchestration

- Nx workspace (`nx` is a devDependency in root `package.json`) - configuration in `nx.json` and `workspace.json`/project files.
- Lerna is used for publishing and some repo scripts: `lerna` present in `package.json` scripts (e.g. `version:alpha`, `publish:*`).

## Frameworks & Libraries

- No frontend framework enforced in the core: library is framework-agnostic and provides official wrappers for React/Angular/Svelte/Vue/etc (see README).
- Bundling/tooling: `webpack` (devDependency in root `package.json`) used for bundle builds and the workspace uses multiple `tsconfig.*.json` files for different targets (module / umd / browser) in packages (e.g. `bundles/all/tsconfig.*.json`, `paths/*/tsconfig.*.json`).

## Testing & TypeDoc

- Vitest is included as a devDependency in root `package.json` (unit tests and test utilities across packages).
- Typedoc used for docs generation: `typedoc` in root `package.json` (scripts: `build:docs`, `build:docs:json`).

## Key Dependencies (selected)

- `@tsparticles/*` packages - the monorepo packages (many packages under the repository root such as `engine/package.json`, `bundles/*/package.json`, `plugins/*/package.json`).
- Development tooling: `eslint`, `prettier`, `husky`, `commitlint` configured in `package.json` and repo configs (root `package.json` and workspace-level config packages `@tsparticles/*-config`).
- Bundling: `webpack`, `terser-webpack-plugin`, `swc-loader`.

## Dev Tools & CI

- GitHub Actions workflows in `.github/workflows/` - CI job definitions include `nodejs.yml`, `npm-publish.yml` and use `pnpm` + `npx nx` commands.
- Nx Cloud integration (CI uses `npx nx-cloud start-ci-run`) and expects `NX_CLOUD_ACCESS_TOKEN` (see `.github/workflows/nodejs.yml` and `.github/workflows/npm-publish.yml`).
- Firebase deploy in CI via `FirebaseExtended/action-hosting-deploy@v0` with secret `FIREBASE_SERVICE_ACCOUNT_TSPARTICLES` (see `.github/workflows/nodejs.yml`).

## Configuration files & locations

- Root package manifest: `package.json` (workspace orchestration) - contains scripts like `build`, `slimbuild`, `build:docs`.
- Workspace root tsconfig: `tsconfig.json` at repository root.
- Many package-level `tsconfig.*.json` files for module/umd/browser builds, e.g. `bundles/all/tsconfig.browser.json`, `paths/grid/tsconfig.json`, `utils/perlinNoise/tsconfig.*.json`.
- Nx config: `nx.json` at repository root.
- GitHub workflows: `.github/workflows/nodejs.yml` and `.github/workflows/npm-publish.yml`.

## Example commands (local development)

# Install

pnpm i

# Build everything (monorepo):

pnpm run build

# This runs the root `slimbuild` script which uses `nx run-many -t build` (see `package.json`).

# Build affected packages with Nx (local)

npx nx affected -t build --parallel=100%

# Build demo and start demo server

cd demo/vanilla
pnpm start

# See `demo/vanilla/package.json` for demo server scripts (uses `tsc` + `node dist/app.js`).

# Run tests (workspace)

pnpm exec vitest

# or run package-specific tests via `npx nx test <project>` when configured.

## Notes & version constraints

- TypeScript: root `package.json` pins `typescript` to `^5.9.3`.
- Node: CI uses Node 24 in GitHub Actions; local development should use a current Node 18+ or Node 24 for parity.
- Package manager: `pnpm@10.30.3` (root `package.json`).

## Important file paths referenced

- `package.json` (root)
- `pnpm-lock.yaml` (root)
- `tsconfig.json` (root) and package-level `tsconfig.*.json` files under `bundles/*/`, `paths/*/`, `plugins/*/`.
- `engine/src/Core/Engine.ts` (core library code) — example of TypeScript source.
- `demo/vanilla/package.json` and `demo/vanilla` server files (demo app).
- `.github/workflows/nodejs.yml` and `.github/workflows/npm-publish.yml` (CI / publishing).

---

_Stack analysis: 2026-03-01_
