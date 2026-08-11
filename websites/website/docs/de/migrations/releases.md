# Releases and Versioning

This project now ships from a single repository: `tsparticles/tsparticles`.

<WebsiteVersionInfo />

## Where release work happens

- Monorepo root: <https://github.com/tsparticles/tsparticles>
- Bundles: <https://github.com/tsparticles/tsparticles/tree/main/bundles>
- Engine: <https://github.com/tsparticles/tsparticles/tree/main/engine>
- Wrappers: <https://github.com/tsparticles/tsparticles/tree/main/wrappers>
- Presets: <https://github.com/tsparticles/tsparticles/tree/main/presets>
- Palettes: <https://github.com/tsparticles/tsparticles/tree/main/palettes>

## Version alignment rule

- Keep all `@tsparticles/*` packages aligned to the same release line.
- Avoid mixing different beta lines or major versions in one app.

## Practical release checklist

1. Verify target package versions in workspace `package.json` files.
2. Build and test affected projects.
3. Validate docs links and playground behavior.
4. Publish from the monorepo release flow.
