# External Integrations

**Analysis Date:** 2026-03-01

This repository is a TypeScript monorepo producing a client-side library and demo apps; integrations are primarily distribution, CI/CD, and hosting services rather than back-end APIs.

## CDNs / Package distribution

- jsDelivr / unpkg / cdnjs
  - Usage: library bundles are referenced and published for CDN usage. See many package README files and `package.dist.json` files that reference `jsdelivr` / `unpkg` fields (examples: `engine/package.dist.json`, `bundles/all/package.dist.json`, `shapes/matrix/package.dist.json`).
  - Where: `engine/package.dist.json`, `bundles/*/package.dist.json`, `shapes/*/package.dist.json`.
  - Credentials: Not required for CDN consumption. Publishing to npm is performed by CI (see below).

## NPM registry & publishing

- NPM publish via GitHub Actions
  - Workflow: `.github/workflows/npm-publish.yml` executes `npx lerna publish from-package` and `npx nx run-many -t build:ci`.
  - Auth: Uses GitHub Actions OIDC and GH token; NX Cloud access token expected via `NX_CLOUD_ACCESS_TOKEN` secret (see `.github/workflows/npm-publish.yml`).
  - Files: `.github/workflows/npm-publish.yml`, `package.json` scripts (`publish:*`).

## CI / Build & Orchestration

- GitHub Actions with Nx + Nx Cloud
  - Where: `.github/workflows/nodejs.yml` and `.github/workflows/npm-publish.yml`.
  - Integrations: `npx nx-cloud start-ci-run` is called in CI. CI expects `NX_CLOUD_ACCESS_TOKEN` in secrets. See `nodejs.yml` lines where `NX_CLOUD_ACCESS_TOKEN` and `FIREBASE_SERVICE_ACCOUNT_TSPARTICLES` are referenced.
  - Secrets: `NX_CLOUD_ACCESS_TOKEN`, `FIREBASE_SERVICE_ACCOUNT_TSPARTICLES` (used for Firebase hosting deploy, see below).

## Hosting / Static site / Demos

- Firebase Hosting (demo deploy)
  - Where referenced: `.github/workflows/nodejs.yml` (deploy step uses `FirebaseExtended/action-hosting-deploy@v0`).
  - Config: `firebase.json` config is present and sets hosting publish target to `demo/vanilla_new` (see `firebase.json`).
  - Credentials: CI uses `FIREBASE_SERVICE_ACCOUNT_TSPARTICLES` secret (service account JSON passed to action). Do not commit service account files; only secret is referenced.

## Observability / Monitoring

- No explicit error-tracking / monitoring SDKs detected in source code (no references to Sentry, Datadog, etc.).

## Analytics

- No analytics SDK (GA, Amplitude, Mixpanel) found in core library. Demo apps may link external scripts manually (see `demo/` content) but no programmatic SDK usage is detected in the core packages.

## External APIs & Webhooks

- No third-party API clients (Stripe, AWS SDK, Supabase, etc.) detected in the core library code. The library is client-side and does not need server-side API credentials.

## Storage & Databases

- No database clients detected. Repo contains demo backends (e.g. `demo/vanilla` is an Express-based demo server) but not persistent storage integrations.
  - Demo server dependencies: `demo/vanilla/package.json` includes `express`, `dotenv` (for local config), `winston` and related logging libs.
  - Environment variables for demos: `dotenv` is included in `demo/vanilla/package.json` (devDependency) — demo may load `.env` files locally (no `.env` files are read by this analysis as per rules).

## Authentication & Secrets

- CI secrets used in workflows:
  - `NX_CLOUD_ACCESS_TOKEN` - referenced in `.github/workflows/nodejs.yml` and `.github/workflows/npm-publish.yml` for Nx Cloud.
  - `FIREBASE_SERVICE_ACCOUNT_TSPARTICLES` - referenced to authenticate Firebase hosting deploy in `.github/workflows/nodejs.yml`.
  - GitHub Actions OIDC is used for npm publish (see `.github/workflows/npm-publish.yml`).

## Build-time / Tooling integrations

- Typedoc for documentation generation: `typedoc` in root `package.json` and `deploy.docs-json.js` script in root package scripts.
- Webpack and SWC loader: `webpack`, `swc-loader`, and `terser-webpack-plugin` are used for bundling/minification (root `package.json` devDependencies).

## Notes about secrets & setup

- Secrets are stored in GitHub repository secrets (CI expects them at runtime); the repository does not include secret files. See `.github/workflows/nodejs.yml` for secret usage lines referencing `NX_CLOUD_ACCESS_TOKEN` and `FIREBASE_SERVICE_ACCOUNT_TSPARTICLES`.
- Local development:
  - Use `pnpm i` to install workspace packages.
  - Demos may use `.env` files locally (demo `package.json` includes `dotenv`) — do not commit any credentials.

## Quick reference file locations

- CI workflows: `.github/workflows/nodejs.yml`, `.github/workflows/npm-publish.yml`.
- Firebase config: `firebase.json` (publishes `demo/vanilla_new`).
- Root scripts: `package.json` (scripts: `build`, `publish:*`, `deploy:docs:json`).
- Demo server: `demo/vanilla/package.json` and `demo/vanilla/dist/app.js` (built output).
- CDN / publish descriptors: `*/package.dist.json` and `*/package.json` files under `bundles/`, `plugins/`, `shapes/`.

---

_Integration audit: 2026-03-01_
