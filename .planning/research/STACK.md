# Research — Stack (synthesized)

**Analysis Date:** 2026-03-01

Summary of recommended and existing stack choices based on repository inspection.

Languages & Runtimes

- TypeScript (primary, pinned to ^5.9.x in root `package.json`)
- Node.js for CI and tooling (CI uses Node 24 in `.github/workflows/nodejs.yml`)

Package Management & Orchestration

- pnpm workspace (`pnpm-workspace.yaml`) with `pnpm-lock.yaml`
- Nx for task orchestration and affected builds (`nx.json`)
- Lerna used for publish scripts (`lerna` in root `package.json` scripts)

Build & Bundling

- Webpack is used for bundle builds in `bundles/*/webpack.config.js`.
- SWC loader / terser used for minification in build pipelines.

Testing & Docs

- Vitest for unit tests (`utils/tests/`)
- Typedoc for API docs generation (`typedoc.json`, `deploy.docs-json.js`)

CI / Publishing

- GitHub Actions drive CI and publish flows (`.github/workflows/*`).
- Nx Cloud integration expected (secrets: `NX_CLOUD_ACCESS_TOKEN`).

Notes

- This stack is mature for library development. Key operational dependencies are CI secrets and maintaining pinned devDependency versions.
