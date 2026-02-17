# External Integrations

**Analysis Date:** 2026-02-17

## APIs & External Services

**None (Client-Side Library):**

- tsParticles is a standalone client-side particle animation library
- It does not integrate with any external APIs, backend services, or third-party SDKs at runtime
- All functionality is self-contained using the HTML5 Canvas API

## Data Storage

**Databases:**

- None - no database dependencies

**File Storage:**

- None - renders directly to HTML5 Canvas
- Optional SVG path loading via `@tsparticles/path-svg` (browser fetch of SVG files)
- Optional image loading via `@tsparticles/shape-image` (browser fetch of image URLs)

**Caching:**

- Nx Cloud remote cache for build artifacts (CI only)
- pnpm store cache in CI pipelines

## Authentication & Identity

**Auth Provider:**

- Not applicable - client-side rendering library with no auth concerns

## Monitoring & Observability

**Error Tracking:**

- None integrated

**Analytics (Documentation only):**

- Microsoft Clarity (ID: `8q4bxin4tm`) - embedded in TypeDoc-generated documentation via `typedoc-plugin-clarity` (`typedoc.json`)
- Carbon Ads (serve: `CEAI6KJL`, placement: `particlesjsorg`) - ads in documentation via `typedoc-plugin-carbon-ads` (`typedoc.json`)

**Logs:**

- Custom `LogUtils` module in engine (`engine/src/Utils/LogUtils.ts`) for internal debug logging

## CI/CD & Deployment

**Hosting:**

- Firebase Hosting - demo site deployment (project: `tsparticles`)
  - Config: `firebase.json` (public dir: `demo/vanilla_new`)
  - Project mapping: `.firebaserc`
  - Auto-deploys on push to `main` branch
  - Preview deploys on PRs from `matteobruni`

- npm Registry - package publishing
  - All ~90 packages published to npm under `@tsparticles/*` scope
  - Main bundle published as `tsparticles` (unscoped)
  - Uses npm OIDC authentication (`.github/workflows/npm-publish.yml`)

- GitHub Pages - documentation JSON deployment
  - Branch: `docs-gen`
  - Script: `deploy.docs-json.js` using `gh-pages` package

**CI Pipeline (GitHub Actions):**

- `.github/workflows/nodejs.yml` - Main CI (build on push/PR to main, v4, v3, v2, v1)
  - Node.js 24, pnpm, Nx Cloud distributed execution (5 agents)
  - Runs `nx affected -t build:ci`
  - Firebase preview/live deploy
- `.github/workflows/npm-publish.yml` - Publish on version tags (`v*`)
  - Builds all packages, publishes via Lerna with dist tags
  - npm OIDC auth (no NPM_TOKEN secret needed)
- `.github/workflows/docs.yml` - Daily docs JSON generation (cron + push to main)
- `.github/workflows/codeql-analysis.yml` - GitHub CodeQL security scanning (weekly + push/PR)
- `.github/workflows/stale.yml` - Mark stale issues/PRs (daily cron)
- `.github/workflows/lock.yml` - Lock resolved issues/PRs after 30 days (daily cron)
- `.github/workflows/opencode.yml` - OpenCode AI assistant triggered by `/oc` or `/opencode` comments

**Nx Cloud:**

- Distributed CI execution (5 linux-medium-js agents)
- Remote build cache
- Cloud ID: `62a6df5ddbaff92c46e3b366` (`nx.json`)
- Access token via `NX_CLOUD_ACCESS_TOKEN` secret

## Environment Configuration

**Required env vars (CI only):**

- `NX_CLOUD_ACCESS_TOKEN` - Nx Cloud authentication (GitHub secret)
- `FIREBASE_SERVICE_ACCOUNT_TSPARTICLES` - Firebase deploy credentials (GitHub secret)
- `GITHUB_TOKEN` - Standard GitHub token for actions/gh-pages

**Secrets location:**

- GitHub Actions secrets (no local `.env` files)

## Webhooks & Callbacks

**Incoming:**

- GitHub Actions webhook triggers (push, PR, issue comments, schedule)
- OpenCode AI integration triggered via issue/PR comments containing `/oc` or `/opencode`

**Outgoing:**

- None

## Third-Party Tooling Integrations

**Renovate Bot:**

- Automated dependency updates (`renovate.json`)
- Base branch: `v4`
- Extends: `config:base`, `:preserveSemverRanges`

**Gitpod:**

- Cloud development environment (`.gitpod.yml`)
- Init: `pnpm i && npx lerna run build`

**Browser APIs Used by Library:**

- HTML5 Canvas 2D Context - primary rendering surface
- Web Audio API - via `@tsparticles/plugin-sounds` (optional)
- Pointer/Mouse/Touch Events - via interaction plugins
- requestAnimationFrame - animation loop
- SVG path parsing - via `@tsparticles/plugin-polygon-mask` (includes pathseg polyfill)
- Image loading (HTMLImageElement) - via `@tsparticles/shape-image`
- MediaRecorder API - via `@tsparticles/plugin-export-video` (optional)
- Canvas toBlob/toDataURL - via `@tsparticles/plugin-export-image` (optional)

---

_Integration audit: 2026-02-17_
