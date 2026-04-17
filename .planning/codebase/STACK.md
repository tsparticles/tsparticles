# Technology Stack

**Analysis Date:** 2026-04-10

## Languages

**Primary:**

- TypeScript 6.x - monorepo source language across packages and demos in `engine/`, `bundles/`, `plugins/`, `paths/`, `updaters/`, `interactions/`, `effects/`, `utils/`, and demo apps like `demo/vite/package.json` and `demo/vanilla/package.json`.
- JavaScript (ESM + Node scripts) - build/deploy automation and configuration in `deploy.docs-json.js`, `engine/webpack.config.js`, per-package `webpack.config.js`, and GitHub workflows under `.github/workflows/*.yml`.

**Secondary:**

- HTML/SCSS/Stylus/Pug - demo presentation layer and static site assets in `demo/vanilla_new/` and `demo/vanilla/` (`demo/vanilla/app.ts` configures Pug + Stylus).
- YAML - CI/CD and automation definitions in `.github/workflows/nodejs.yml`, `.github/workflows/npm-publish.yml`, `.github/workflows/docs.yml`, and other workflow files.

## Runtime

**Environment:**

- Node.js 24 in CI (`actions/setup-node@v6` with `node-version: "24"`) in `.github/workflows/nodejs.yml` and `.github/workflows/npm-publish.yml`.
- Browser runtime for published libraries and demos (`engine/package.json` and `bundles/full/package.json` expose browser/cjs/esm outputs).

**Package Manager:**

- pnpm 10.33.0 at workspace root (`package.json` → `packageManager`).
- Lockfile: present at `pnpm-lock.yaml`.

## Frameworks

**Core:**

- Nx 22.6.4 - monorepo task orchestration and affected builds (`package.json`, `nx.json`).
- tsParticles CLI (`@tsparticles/cli`) - package build pipeline invoked by package scripts (`engine/package.json`, `bundles/full/package.json`).

**Testing:**

- Vitest 4.1.2 - workspace test runner in `utils/tests/package.json` with config in `utils/tests/vitest.config.ts`.
- jsdom + canvas - browser-like/unit rendering environment for tests (`utils/tests/package.json`).

**Build/Dev:**

- Webpack 5 + webpack-cli + `@tsparticles/webpack-plugin` - package bundling (`engine/webpack.config.js`, `bundles/*/webpack.config.js`).
- TypeDoc 0.28.18 - API docs generation (`typedoc.json`, root scripts `build:docs`/`build:docs:json` in `package.json`).
- SWC (`@swc/core`, `swc-loader`) - transpilation support in toolchain (`package.json`, `demo/vanilla_new/package.json`).
- ESLint 10 + Prettier 3 - linting/formatting baseline (`package.json`, package-level `eslint.config.js`).

## Key Dependencies

**Critical:**

- `@tsparticles/engine` (`engine/package.json`) - foundational runtime consumed by all bundles/plugins and demos (`demo/vanilla/package.json`, `demo/vite/package.json`).
- `@tsparticles/webpack-plugin` (`package.json`) - standardizes package build output for the modular ecosystem (`engine/webpack.config.js`).
- `nx` + `nx-cloud` (`package.json`) - incremental/distributed CI and affected-task execution (`nx.json`, `.github/workflows/nodejs.yml`).

**Infrastructure:**

- `typedoc` + typedoc plugins (`package.json`, `typedoc.json`) - documentation site/json generation.
- `gh-pages` (`package.json`) - publishes docs JSON branch via `deploy.docs-json.js`.
- `firebase` deployment action usage (`.github/workflows/nodejs.yml`) + Firebase project config (`firebase.json`, `.firebaserc`).

## Configuration

**Environment:**

- CI secrets and tokens configured via GitHub Actions env in `.github/workflows/nodejs.yml` and `.github/workflows/npm-publish.yml`.
- Optional demo logging env vars read in `demo/vanilla/app.ts` (`USE_SEQ`, `SEQ_SSL`, `SEQ_HOST`, `SEQ_PORT`, `SEQ_KEY`).
- Root `.env*` files at repository root: not detected.

**Build:**

- Workspace build orchestration: `package.json`, `nx.json`, `pnpm-workspace.yaml`.
- Compiler and docs config: `tsconfig.json`, package-local tsconfig files (example `demo/vanilla/tsconfig.json`), `typedoc.json`.
- Bundling config: package-level `webpack.config.js` files (example `engine/webpack.config.js`, `bundles/full/webpack.config.js`).

## Platform Requirements

**Development:**

- Node.js + pnpm workspace with deep linking enabled (`pnpm-workspace.yaml` → `linkWorkspacePackages: deep`).
- Git + GitHub Actions-compatible scripts for release/docs pipelines (`package.json` scripts, `.github/workflows/*`).

**Production:**

- npm registry publication target for packages (`.github/workflows/npm-publish.yml`, package `publishConfig` such as `engine/package.json`).
- Firebase Hosting deployment target for website/demo assets (`firebase.json`, `.github/workflows/nodejs.yml`).

---

_Stack analysis: 2026-04-10_
