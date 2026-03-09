# Technology Stack

**Analysis Date:** 2026-03-03

## Languages

**Primary:**

- TypeScript ^5.x - source language for all packages and demos. (See `package.json` root `devDependencies.typescript` and many `tsconfig*.json` files under package dirs, e.g. `tsconfig.json` at project root and `engine/tsconfig.json`.)

**Secondary:**

- JavaScript - emitted build artifacts and demo server code (bundles and `dist` outputs). See `bundles/*/package.json` (exports point to `dist/*`).

## Runtime

**Environment:**

- Node.js - CI uses Node.js 24 in GitHub Actions (`.github/workflows/nodejs.yml`, `.github/workflows/npm-publish.yml`, `.github/workflows/docs.yml`).

**Package Manager:**

- pnpm (workspace) - declared in root `package.json` (`packageManager: "pnpm@10.30.3"`) and used throughout scripts and CI. Lockfile: `pnpm-lock.yaml` present at repo root (workspace lockfile).

## Frameworks & Monorepo Tools

- Nx - monorepo orchestration and affected builds. See `nx.json` and many `package.json` scripts that call `nx` (`package.json` root scripts: `slimbuild`, `build:ci`, etc.). `nx-cloud` is configured and used for distributed execution (`nx.json`, `devDependencies.nx`, `devDependencies.nx-cloud`).
- Lerna - used for publishing packages (see root `package.json` `scripts.version:*` and `scripts.publish:*`, and `.github/workflows/npm-publish.yml` which runs `npx lerna publish from-package`).
- tsparticles-cli - custom build/publish tooling used by packages. Many package `scripts` call `tsparticles-cli build` (examples: `bundles/all/package.json` `scripts.build`, `engine/package.json` `scripts.build`).

## Build & Bundling

- Webpack 5 - bundling for browser bundles. There are many `webpack.config.js` files spread across `bundles/*` and package subfolders (examples: `bundles/all/webpack.config.js`, `engine/webpack.config.js`, and many `*/webpack.config.js` under `shapes/`, `plugins/`, `paths/`).
- swc (via `@swc/core` and `swc-loader`) is present for faster compilation and transforms (`devDependencies` in root `package.json`).
- TypeDoc - API documentation generation (`package.json` root scripts: `build:docs`, `build:docs:json`). See `typedoc` usage in root and packages (`devDependencies.typedoc`).
- ts-json-schema-generator / ts-json-schema-generator-like tooling used in `engine/package.json` to generate JSON schema (`scripts.build:schema`).

## Testing & QA

- Vitest - test runner (`devDependencies.vitest`, `@vitest/ui`). Tests and test tooling are mentioned in `AGENTS.md` and devDependencies; workspace test commands documented in `AGENTS.md`.
- jsdom & canvas - runtime shims for DOM and canvas in tests (`devDependencies.jsdom`, `canvas`). See `utils/tests` referenced in `AGENTS.md` and `devDependencies` in root `package.json`.
- ESLint & Prettier - linting and formatting enforced. Root `package.json` references `@tsparticles/eslint-config` and `@tsparticles/prettier-config`. Husky + commitlint for commit message rules (`devDependencies.husky`, `@commitlint/*`).

## Key Dependencies (representative)

**Workspace / monorepo tooling:**

- `nx` (`devDependencies` in root `package.json`) - task orchestration. Files: `nx.json`.
- `nx-cloud` - remote caching and distributed execution (see `nx.json` `tasksRunnerOptions.runner` and CI env `NX_CLOUD_ACCESS_TOKEN` in `.github/workflows`).
- `lerna` - publishing orchestration (`package.json` root scripts and publish workflow). Files: root `package.json` and `.github/workflows/npm-publish.yml`.

**Build / transpilation:**

- `typescript` (root `devDependencies`) - source language. Configs: multiple `tsconfig*.json` across packages (e.g. `tsconfig.json` at repo root and per-package configs under `*/tsconfig.*.json`).
- `webpack` + `webpack-cli` + `terser-webpack-plugin` - bundling and minification. See `bundles/*/webpack.config.js` and `engine/webpack.config.js`.
- `@swc/core` + `swc-loader` - optional fast transforms in build pipeline (root `devDependencies`).

**Testing:**

- `vitest`, `@vitest/ui` - unit tests (`devDependencies`).
- `jsdom`, `canvas` - test environment support for DOM/canvas tests (`devDependencies`).

**Utilities & tooling:**

- `typedoc` and a number of typedoc plugins for docs generation (root `devDependencies` and `build:docs` script).
- `gh-pages` - for legacy docs/website publishing (present in root `devDependencies`).
- `rimraf`, `fs-extra`, `copyfiles` - build helpers.

## Dev / Local Workflow (how to build)

Recommended quick-start (documented in `README.md`):

1. Install workspace deps: `pnpm i` (root `package.json` uses `pnpm`).
   - See root `package.json` and `AGENTS.md` for workspace-aware commands; prefer `pnpm` + `nx` patterns.

2. Build everything locally (slim/full flow):
   - `pnpm run build` runs root script which calls `pnpm run slimbuild` and then `pnpm run build:docs` (see `package.json` root `scripts`).
   - `pnpm run slimbuild` runs `nx run-many -t build --parallel=50%` after README prettification. For CI a stricter path is `pnpm run slimbuild:ci` / `pnpm run build:ci`.

3. Build a single package or affected packages with Nx:
   - `npx nx build <project>` or `npx nx affected -t build` (see `nx.json` and CI usage in `.github/workflows/nodejs.yml`).

4. Demo server (example):
   - `cd demo/vanilla && pnpm start` — demo server startup (see `demo/vanilla/package.json` `scripts.start`).

5. Publishing:
   - Publishing is automated through `.github/workflows/npm-publish.yml` that uses Node 24 and OIDC to publish via `lerna`. Locally, `pnpm run publish:...` helper scripts exist in root `package.json` (alpha/beta/next/dist tags).

## Notable file references

- Root package manifest: `package.json` (workspace scripts, devDependencies, `packageManager: pnpm@...`).
- Monorepo orchestration: `nx.json` (Nx + nx-cloud settings).
- Per-package build scripts: `engine/package.json`, `bundles/*/package.json`, many `*/webpack.config.js` files (examples: `bundles/all/webpack.config.js`, `engine/webpack.config.js`).
- Demo server: `demo/vanilla/package.json` (express-based demo server) and `demo/electron/package.json`.
- CI: `.github/workflows/nodejs.yml`, `.github/workflows/npm-publish.yml`, `.github/workflows/docs.yml`.

---

_Stack analysis: 2026-03-03_
