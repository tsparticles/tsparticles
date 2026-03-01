External integrations and services

## Summary

This repo is primarily a library of visual presets and demo apps; it does not contain production integrations but uses typical build-time services.

Observed integrations

- No external APIs or cloud service SDKs in the root codebase (search `fetch`/`axios` yields nothing prominent)
- Demo apps are static and use browser runtime only (`apps/vite`, `apps/demo`)
- CI: GitHub Actions workflows present in `.github/workflows` (`nodejs.yml`, `npm-publish.yml`) for testing and publishing
- Package publishing: npm registry via GitHub Actions (`npm-publish.yml`)

Auth / Secrets

- No application auth providers found (no OAuth configs)
- CI workflows may reference secrets via GitHub repository secrets (not stored in repo)

Datastores

- No databases or persistent datastore integrations detected

Webhooks / External calls

- No server-side webhook handlers found; demo app uses static views

Where to look for changes

- Check `.github/workflows/*.yml` for CI integrations
- Check `package.json` scripts for any publish or deploy hooks

Notes

- This is a self-contained library + demo repo; primary external surface is GitHub Actions for CI and npm for package publishing.
