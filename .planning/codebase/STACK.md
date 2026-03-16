# STACK

Project overview

- Language: TypeScript (see `package.json` -> `typescript` dependency)
- Package manager: pnpm (see `packageManager` in `package.json` and `pnpm-workspace.yaml`)
- Monorepo tooling: Nx (`nx.json`) + Lerna used for publishing (`lerna` devDependency)
- Bundlers: Webpack (bundles/\*), SWC used as a transpiler in devDeps (`@swc/core`, `swc-loader`)
- Test runner: Vitest (`vitest` devDependency)

Runtimes & targets

- Node.js for build scripts and tooling; browser targets for bundles (see `bundles/*/tsconfig.browser.json`).
- UMD/ESM bundles produced under `bundles/` (webpack configs in `bundles/*/webpack.config.js`).

Key dependencies and dev tooling

- Build and docs: `typedoc`, `typedoc-plugins` (see `typedoc.json`)
- Lint & formatting: `eslint`, `prettier` plus internal `@tsparticles/eslint-config` and `@tsparticles/prettier-config`
- CI helpers: `nx`, `nx-cloud` (see `nx.json`)

Workspace layout references

- Core engine code: `engine/src/` and `engine/src/index.ts`
- Bundles: `bundles/slim/src/`, `bundles/slim/src/bundle.ts`
- Utility libs: `utils/perlinNoise/src/`
- Plugins: `plugins/themes/src/`
- Path generators: `paths/grid/src/`

Configuration files to inspect

- `package.json` (workspace scripts & devDependencies)
- `pnpm-workspace.yaml` (workspace package list)
- `nx.json` (Nx configuration)
- `typedoc.json` (documentation build)

Developer workflow notes

- Use `pnpm i` to install and `pnpm run build` to build the full workspace.
- Many package-level tasks are exposed via Nx; prefer `pnpm exec nx` or `npx nx` for targeted actions.

Where to look for tech-specific code

- Build/bundle configs: `bundles/*/webpack.config.js`
- Typedoc config: `typedoc.json`
- Workspace scripts: `package.json` (root)

Recommendations / quick wins

- Check Node and pnpm versions in CI to match `packageManager` and devDependency compatibility.
- Add explicit node engine constraint if consistent Node version is required for contributors.
