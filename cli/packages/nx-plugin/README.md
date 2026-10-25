[![banner](https://particles.js.org/images/banner2.png)](https://particles.js.org)

# tsParticles Nx Plugin

Internal Nx plugin used by the `tsParticles CLI` workspace.

## What it does

The plugin augments package-based Nx projects under `commands/*`, `packages/*`, and `utils/*` with canonical tsParticles build-step aliases.

It is enabled in the workspace `nx.json` via the `@tsparticles/cli-nx-plugin` entry in `plugins`.

### Canonical aliases inferred by the plugin

| Canonical target  | Script fallback                       |
| ----------------- | ------------------------------------- |
| `clean`           | `clear:dist`                          |
| `prettify`        | `prettify:src` or `format`            |
| `prettify:ci`     | `prettify:ci:src`                     |
| `tsc`             | `compile`, `build:ts`, or `typecheck` |
| `bundle:webpack`  | `build:bundle:webpack`                |
| `bundle:rollup`   | `build:bundle:rollup`                 |
| `bundle:rolldown` | `build:bundle:rolldown`               |
| `distfiles`       | `build:distfiles`                     |

This allows Nx-friendly commands such as:

```bash
pnpm nx run @tsparticles/cli-command-build:tsc
pnpm nx run @tsparticles/cli-command-build:clean
```

without forcing every package to rename its existing npm scripts.

## Verify plugin behavior

From the `cli` root:

```bash
pnpm nx show project @tsparticles/cli-command-build --json
pnpm nx show projects --withTarget tsc
pnpm nx run @tsparticles/cli-nx-plugin:test
```
