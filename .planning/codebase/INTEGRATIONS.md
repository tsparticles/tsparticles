# INTEGRATIONS

External services & integrations observed

- GitHub / CI: Repository uses GitHub; CI-related configs present under `.github/workflows/` and `nx-cloud` integration (`nx.json` + `nx-cloud` devDependency).
- Publishing: `lerna` is used for package publishing workflows (`package.json` scripts `version:*`, `publish:*`).
- npm registry: packages published via Lerna/NPM; check `bundles/*/package.dist.json` if publishing is needed.

Datastores & network

- No application-level databases found in repository (it's a library/monorepo). No `db` or `migrations` folders.

Auth & external APIs

- No third-party runtime APIs (OAuth, external REST APIs) integrated in source — repository is a UI/engine library.

Webhooks / integrations to watch

- Dependabot configured (`.github/dependabot.yml`) for dependency updates.

Developer integrations

- Husky for git hooks (`prepare` script) — check `.husky/` if present in packages.
- GitHub Pages: `gh-pages` listed as devDependency — used for docs deployment (see `deploy.docs-json.js`).

Files & locations to review for integrations

- `.github/workflows/` — CI workflows
- `deploy.docs-json.js` — docs deployment logic
- `bundles/*/package.dist.json` — publishing metadata (if present)
- `package.json` — scripts for publishing and release

Action items

- If you plan to add runtime integrations (APIs, DBs), document a top-level `INTEGRATIONS.md` (this file) with required env vars and secrets handling policy.
- Add a `.env.example` if any future packages require secrets for local testing.
