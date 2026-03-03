# External Integrations

**Analysis Date:** 2026-03-03

This repository is a frontend-first TypeScript monorepo (libraries, bundles, demos) with CI/CD and publishing integrations. The integration points below reference concrete files.

## CI / CD

- GitHub Actions workflows (repo-level):
  - `.github/workflows/nodejs.yml` - primary CI that runs `pnpm install`, sets up Nx Cloud, runs `npx nx affected -t build:ci`, and conditionally deploys demo site to Firebase Hosting when `firebaseToken` secret is present. The workflow sets Node.js version 24 and uses `pnpm/action-setup`. See lines: env NX_CLOUD_ACCESS_TOKEN, firebaseToken usage for conditional deploys. (File: `.github/workflows/nodejs.yml`)
  - `.github/workflows/npm-publish.yml` - publishes packages on push tags (v\*). It sets up Node.js 24 and uses OIDC/lerna to publish packages (`npx lerna publish from-package`) and determines dist-tags from tag name. (File: `.github/workflows/npm-publish.yml`)
  - `.github/workflows/docs.yml` - scheduled daily job that runs `pnpm run build:ci:json` to produce docs JSON. (File: `.github/workflows/docs.yml`)
  - `.github/workflows/codeql-analysis.yml` - GitHub CodeQL scanning enabled. (File: `.github/workflows/codeql-analysis.yml`)

## CI Cache & Remote Execution

- Nx Cloud - remote caching and distributed execution configured in `nx.json` (`tasksRunnerOptions.default.runner: "nx-cloud"` and `nxCloudId` set). Workflows initialize Nx Cloud (see `npx nx-cloud start-ci-run` in `.github/workflows/*`). (Files: `nx.json`, `.github/workflows/*`)

## Package Publishing

- Lerna + npm: publishing handled by Lerna invoked in CI (`npx lerna publish from-package --ignore-scripts` in `.github/workflows/npm-publish.yml`). Packages specify `publishConfig` to `directory: dist` and `access: public` in package manifests (examples: `bundles/all/package.json`, `engine/package.json`). Local scripts in root `package.json` include `publish:alpha`, `publish:beta`, `publish:next`, etc., which call `lerna` CLI.

## Hosting / Static Site

- Firebase Hosting (conditional in CI): `.github/workflows/nodejs.yml` will deploy to Firebase Hosting when the `FIREBASE_SERVICE_ACCOUNT_TSPARTICLES` secret is present. The workflow uses `FirebaseExtended/action-hosting-deploy@v0` with `projectId: tsparticles` and `channelId: live`. (File: `.github/workflows/nodejs.yml`)

- gh-pages/Docs - repository uses `gh-pages` devDependency and `typedoc` for docs generation. Root scripts `build:docs` and `deploy:docs:json` exist in `package.json` (File: `package.json`). The scheduled docs job runs `pnpm run build:ci:json` in `.github/workflows/docs.yml`.

## Telemetry & Security Scanning

- CodeQL - configured in `.github/workflows/codeql-analysis.yml` to run security scanning for JavaScript.

- Nx Cloud telemetry / OpenTelemetry artifacts: `nx` and `nx-cloud` are in use; node modules include OpenTelemetry packages via nx cloud tooling (observed in `node_modules` and lockfiles). CI sets `NX_CLOUD_ACCESS_TOKEN` from GitHub secrets (see `.github/workflows/*`). (Files: `nx.json`, `.github/workflows/*`)

## External APIs & Services

- No direct third-party runtime APIs (Stripe, AWS, Supabase, etc.) are referenced in the repository source code. Grep across codebase shows imports primarily from internal workspace packages `@tsparticles/*` (see many `import` statements referencing `@tsparticles/engine` and other `@tsparticles` packages). (See `functions.grep` results and many `*.ts` files importing `@tsparticles/*`.)

## Demo Server Integrations

- Demo/Vanilla server (`demo/vanilla/package.json`) uses the following integrations for local demo serving and security:
  - `express` - demo HTTP server (see `demo/vanilla/package.json` `devDependencies.express`).
  - `helmet` - sets HTTP headers for security on demo server (see `demo/vanilla/package.json`).
  - `dotenv` - demo server may read environment variables (note: `.env` files are present in repo but not read by this audit; existence only). (See `demo/vanilla/package.json` and `README.md` instructions.)

## Analytics / Error Tracking

- No project-level analytics (e.g., Google Analytics, Sentry) configured in source files. The README and site use external badges and links but there are no Sentry or GA integration code references in the library source.

## Webhooks & Callbacks

- The codebase does not define public webhook receivers for external services. CI workflows use GitHub Actions with `actions/checkout` and conditional deployment steps. No webhook endpoints in library packages.

## Required Secrets / Environment Variables (referenced in CI)

- `NX_CLOUD_ACCESS_TOKEN` - used by CI workflows to enable nx-cloud distributed execution (referenced in `.github/workflows/nodejs.yml`, `.github/workflows/npm-publish.yml`).
- `FIREBASE_SERVICE_ACCOUNT_TSPARTICLES` (and an env alias `firebaseToken`) - used to deploy demo site to Firebase Hosting from CI (`.github/workflows/nodejs.yml`). The secret name appears as `secrets.FIREBASE_SERVICE_ACCOUNT_TSPARTICLES`.
- `GITHUB_TOKEN` - used by GitHub Actions deploy steps (standard secret reference in workflows). (See `.github/workflows/*`.)

Note: Do not expose secrets. `.env` files may exist for local demos but contents are not read or included in this document.

## Observability / Logging

- No repo-level APM or error-tracking integration code is present. Demo server `demo/vanilla` includes `winston` and `@datalust/winston-seq` packages (`demo/vanilla/package.json`) which enable structured logging and optional Seq ingestion in demo server runtime if configured.

## Where integrations live (key file list)

- Root manifest and scripts: `package.json`
- Nx Cloud & targets: `nx.json`
- GitHub Actions CI: `.github/workflows/nodejs.yml`, `.github/workflows/npm-publish.yml`, `.github/workflows/docs.yml`, `.github/workflows/codeql-analysis.yml`, `.github/workflows/lock.yml`
- Publishing configs: `bundles/*/package.json`, `engine/package.json`, and many package `package.json` files (they include `publishConfig` and `files: ["dist"]`).
- Webpack bundling for browser builds: `bundles/*/webpack.config.js`, `engine/webpack.config.js` and many `*/webpack.config.js` files under packages.
- Demo server: `demo/vanilla/package.json`, demo server source under `demo/vanilla/src` (if present).

---

_Integration audit: 2026-03-03_
