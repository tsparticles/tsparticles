# External Integrations

**Analysis Date:** 2026-04-10

## APIs & External Services

**CI/CD & Developer Infrastructure:**

- Nx Cloud - distributed/remote task execution for CI builds
  - SDK/Client: `nx-cloud` and `npx nx-cloud` in `.github/workflows/nodejs.yml` and `.github/workflows/npm-publish.yml`
  - Auth: `NX_CLOUD_ACCESS_TOKEN`
- GitHub Actions + GitHub API ecosystem - workflow execution, release publishing, stale/lock maintenance
  - SDK/Client: Actions in `.github/workflows/*.yml` (including `softprops/action-gh-release@v2`, `actions/stale@v10`, `dessant/lock-threads@v6`)
  - Auth: `GITHUB_TOKEN` (workflow secret/context)

**Hosting & Distribution:**

- Firebase Hosting - deploys demo/site artifacts
  - SDK/Client: `FirebaseExtended/action-hosting-deploy@v0` in `.github/workflows/nodejs.yml`
  - Auth: `FIREBASE_SERVICE_ACCOUNT_TSPARTICLES`
- npm Registry - publishes monorepo packages on tag pushes
  - SDK/Client: `pnpm exec nx release publish --skip-version` in `.github/workflows/npm-publish.yml`
  - Auth: OIDC trusted publishing (workflow requests `id-token: write` in `.github/workflows/npm-publish.yml`)

**Documentation Publishing:**

- GitHub Pages branch publishing for docs JSON
  - SDK/Client: `gh-pages` in `deploy.docs-json.js`
  - Auth: `GITHUB_TOKEN` (optional, falls back to unauthenticated remote URL)

**Optional Demo Logging:**

- Seq log server (optional for `demo/vanilla` local server)
  - SDK/Client: `@datalust/winston-seq` in `demo/vanilla/package.json`, used in `demo/vanilla/app.ts`
  - Auth: `SEQ_KEY` (plus `USE_SEQ`, `SEQ_SSL`, `SEQ_HOST`, `SEQ_PORT`)

## Data Storage

**Databases:**

- Not detected.
  - Connection: Not applicable
  - Client: Not applicable

**File Storage:**

- Local filesystem build artifacts (`dist/`, `docs/`, `docs.json`) referenced in `package.json` scripts and `typedoc.json`.
- Firebase Hosting static asset publish target (`firebase.json` with `hosting.public: "demo/vanilla_new"`).

**Caching:**

- GitHub Actions cache for pnpm store in `.github/workflows/nodejs.yml`, `.github/workflows/npm-publish.yml`, and `.github/workflows/docs.yml`.
- Nx task cache enabled in `nx.json` (`targetDefaults.*.cache: true`).

## Authentication & Identity

**Auth Provider:**

- GitHub Actions secrets/OIDC model (CI identity)
  - Implementation: Secret-based auth for Nx Cloud/Firebase/GitHub token in workflow env, plus OIDC for npm publish in `.github/workflows/npm-publish.yml`.

## Monitoring & Observability

**Error Tracking:**

- Not detected as a centralized SaaS error tracker (no Sentry/Datadog/New Relic integration found in source manifests reviewed).

**Logs:**

- CI logs via GitHub Actions jobs in `.github/workflows/*.yml`.
- Optional structured app logging with `winston` + Seq transport in `demo/vanilla/app.ts`.

## CI/CD & Deployment

**Hosting:**

- Firebase Hosting project `tsparticles` configured in `.firebaserc` and `firebase.json`.

**CI Pipeline:**

- GitHub Actions workflows in `.github/workflows/`:
  - `.github/workflows/nodejs.yml` (CI build + optional Firebase deploy)
  - `.github/workflows/npm-publish.yml` (tag-based publish + release)
  - `.github/workflows/docs.yml` (scheduled/main docs JSON build)
  - `.github/workflows/codeql-analysis.yml` (security scan)

## Environment Configuration

**Required env vars:**

- `NX_CLOUD_ACCESS_TOKEN` (`.github/workflows/nodejs.yml`, `.github/workflows/npm-publish.yml`)
- `FIREBASE_SERVICE_ACCOUNT_TSPARTICLES` (`.github/workflows/nodejs.yml`)
- `GITHUB_TOKEN` (`.github/workflows/docs.yml`, `deploy.docs-json.js`)
- `ZIP_CONCURRENCY` (`.github/workflows/npm-publish.yml`, `scripts/package-zips.js`)
- Optional local demo vars in `demo/vanilla/app.ts`: `USE_SEQ`, `SEQ_SSL`, `SEQ_HOST`, `SEQ_PORT`, `SEQ_KEY`

**Secrets location:**

- GitHub repository/organization secrets consumed by GitHub Actions workflow files under `.github/workflows/`.
- `.env` file expected by `demo/vanilla/app.ts` (file path `demo/.env`) for local demo server configuration.

## Webhooks & Callbacks

**Incoming:**

- GitHub event triggers (push/pull_request/schedule/tag) configured in `.github/workflows/nodejs.yml`, `.github/workflows/npm-publish.yml`, `.github/workflows/docs.yml`, `.github/workflows/stale.yml`, `.github/workflows/lock.yml`, `.github/workflows/codeql-analysis.yml`.

**Outgoing:**

- Deployment callbacks from GitHub Actions to Firebase Hosting via `FirebaseExtended/action-hosting-deploy@v0` in `.github/workflows/nodejs.yml`.
- Release publication callbacks to GitHub Releases via `softprops/action-gh-release@v2` in `.github/workflows/npm-publish.yml`.

---

_Integration audit: 2026-04-10_
