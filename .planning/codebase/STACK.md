# Technology Stack

**Analysis Date:** 2026-02-17

## Languages

**Primary:**

- TypeScript ~5.9.3 - All library source code, plugins, effects, shapes, updaters, interactions, paths, utils
- JavaScript (ES Modules) - Webpack configs (`*/webpack.config.js`), deploy scripts (`deploy.docs-json.js`)

**Secondary:**

- HTML - Demo apps (`demo/vanilla_new/`, `demo/vite/index.html`)
- JSON - Configuration schemas, TypeDoc config, package manifests

## Runtime

**Environment:**

- Node.js 24 (CI target, see `.github/workflows/nodejs.yml` line 32)
- Browser: `since 2021, not dead` (see `engine/.browserslistrc`)
- Electron: ^40.1.0 (demo app only, `demo/electron/package.json`)

**Package Manager:**

- pnpm 10.29.3 (exact version pinned in `package.json` `"packageManager"` field)
- Lockfile: `pnpm-lock.yaml` (present)

## Monorepo Architecture

**Workspace Manager:**

- pnpm workspaces - configured in `pnpm-workspace.yaml`
- Packages distributed across: `bundles/*`, `demo/*`, `effects/*`, `engine`, `interactions/*`, `interactions/external/*`, `interactions/particles/*`, `move/*`, `paths/*`, `plugins/*`, `plugins/colors/*`, `plugins/easings/*`, `plugins/emittersShapes/*`, `plugins/exports/*`, `shapes/*`, `updaters/*`, `utils/*`

**Task Orchestration:**

- Nx ^22.4.5 - task runner, caching, affected commands (`nx.json`)
- Nx Cloud (nx-cloud ^19.1.0) - distributed caching and CI distribution (`nx.json` `nxCloudId: "62a6df5ddbaff92c46e3b366"`)
- Lerna ^9.0.3 - versioning and npm publishing only (`lerna.json`)

**Total Package Count:** ~90 packages (excluding node_modules/dist)

## Frameworks

**Core:**

- Custom particle engine (`@tsparticles/engine`) - HTML5 Canvas-based animation library, zero framework dependencies
- Plugin architecture - engine accepts shapes, effects, updaters, interactions, paths, movers as pluggable modules

**Testing:**

- Vitest ^4.0.18 - test runner (`utils/tests/vitest.config.ts`)
- @vitest/coverage-v8 ^4.0.18 - coverage provider
- @vitest/ui ^4.0.18 - visual test UI
- jsdom ^28.0.0 - browser environment simulation for tests
- canvas ^3.2.1 - Node.js Canvas API polyfill for test rendering

**Build/Dev:**

- Webpack ^5.105.0 - UMD/browser bundle generation
- @tsparticles/webpack-plugin - custom webpack plugin for standardized bundle config (`engine/webpack.config.js`)
- @tsparticles/cli (tsparticles-cli) ^3.1.3 - custom CLI for building packages (all packages use `tsparticles-cli build`)
- @swc/core ^1.15.11 + swc-loader ^0.2.7 - fast TypeScript transpilation
- terser-webpack-plugin ^5.3.16 - production minification
- TypeScript compiler (tsc) - type checking and type declaration generation

**Documentation:**

- TypeDoc ^0.28.16 - API documentation generation (`typedoc.json`)
- typedoc-plugin-carbon-ads, typedoc-plugin-clarity, typedoc-plugin-coverage, typedoc-plugin-keywords, typedoc-plugin-mdn-links, typedoc-plugin-missing-exports

**Code Quality:**

- ESLint ^9.39.2 - linting with flat config (`eslint.config.js` per package)
- @tsparticles/eslint-config - shared ESLint configuration
- eslint-plugin-jsdoc, eslint-plugin-tsdoc, eslint-plugin-prettier
- Prettier ^3.8.1 - code formatting
- @tsparticles/prettier-config - shared Prettier configuration (referenced via `"prettier"` field in package.json)
- prettier-plugin-multiline-arrays 4.1.4

**Git Hooks:**

- Husky ^9.1.7 - git hooks (`.husky/`)
- @commitlint/cli ^20.4.1 + @commitlint/config-conventional ^20.4.1 - conventional commit message enforcement (`.commitlintrc.json`, `.husky/commit-msg`)

## Key Dependencies

**Critical (Runtime):**

- `@tsparticles/engine` - Core particle engine, dependency of every other package
- No external runtime dependencies - the engine and all plugins are self-contained TypeScript

**Infrastructure (Dev/Build):**

- `@tsparticles/cli` ^3.1.3 - Custom build CLI used by every package's `build` script
- `@tsparticles/webpack-plugin` ^3.1.2 - Standardized webpack configuration generator
- `@tsparticles/tsconfig` ^3.1.0 - Shared TypeScript configuration (extended by all packages via `tsconfig.base.json`)
- `@tsparticles/eslint-config` ^3.1.1 - Shared ESLint flat config
- `@tsparticles/prettier-config` ^3.0.11 - Shared Prettier config
- `@tsparticles/depcruise-config` ^3.1.2 - Dependency cruiser configuration

**Utility (Dev):**

- `ts-json-schema-generator` ^2.4.0 - Generates JSON Schema from TypeScript types (engine options schema)
- `typescript-json-schema` ^0.67.1 - Alternative JSON Schema generation
- `webpack-bundle-analyzer` ^5.2.0 - Bundle size analysis
- `gh-pages` ^6.3.0 - Documentation deployment to GitHub Pages
- `rimraf` ^6.1.2 - Cross-platform file removal
- `copyfiles` ^2.4.1 - File copying utility
- `cross-env` ^10.1.0 - Cross-platform environment variables
- `fs-extra` ^11.3.3 - Enhanced filesystem operations
- `browserslist` ^4.28.1 - Browser target specification
- `source-map-support` ^0.5.21 - Source map support for debugging

## Module System & Output Formats

**Source:**

- ESM (`"type": "module"` in all package.json files)
- TypeScript with `.js` extension imports (e.g., `import { foo } from "./bar.js"`)

**Build Outputs (per package):**
Each package builds to `dist/` with 5 module formats:

- `dist/browser/` - Browser-targeted ES modules
- `dist/esm/` - Standard ES modules (`"module"` field)
- `dist/cjs/` - CommonJS (`"main"` field)
- `dist/umd/` - UMD bundles (via webpack)
- `dist/types/` - TypeScript declaration files (`"types"` field)

**Package Exports Map:**

```json
{
  ".": {
    "types": "./dist/types/index.d.ts",
    "browser": "./dist/browser/index.js",
    "import": "./dist/esm/index.js",
    "require": "./dist/cjs/index.js",
    "umd": "./dist/umd/index.js",
    "default": "./dist/cjs/index.js"
  }
}
```

## Configuration

**TypeScript:**

- Root `tsconfig.json` - base config (target: es2016, module: commonjs, strict: true)
- `@tsparticles/tsconfig` - shared base config extended by all packages
- Per-package tsconfig variants: `tsconfig.base.json`, `tsconfig.browser.json`, `tsconfig.module.json`, `tsconfig.umd.json`, `tsconfig.types.json`, `tsconfig.schema.json`

**Nx:**

- `nx.json` - task pipeline (build depends on ^build), caching config, Nx Cloud integration
- Cacheable operations: build, build:ci, test, lint, package, prepare
- Affected default base: `main`

**Build:**

- `webpack.config.js` (per package) - uses `@tsparticles/webpack-plugin` helpers
- `tsparticles-cli build` / `tsparticles-cli build --ci` - primary build command

**Publishing:**

- `lerna.json` - version 4.0.0-alpha.24, conventional commits, forcePublish
- `publishConfig.directory: "dist"` - publishes only dist folder
- `publishConfig.access: "public"` - all packages are public npm packages
- npm OIDC authentication for publishing (`.github/workflows/npm-publish.yml`)
- Dist tags: alpha, beta, next, v1, v2, v3 (for version lines)

## Platform Requirements

**Development:**

- Node.js >= 24
- pnpm 10.29.3 (exact)
- Git with Husky hooks

**Production/Browser:**

- Any modern browser (since 2021, not dead per browserslist)
- HTML5 Canvas API
- No server-side runtime required (client-side library)

**CI:**

- GitHub Actions (ubuntu-latest)
- Nx Cloud for distributed builds (5 linux-medium-js agents)

---

_Stack analysis: 2026-02-17_
