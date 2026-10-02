# @tsparticles/browserslist-config

Shared Browserslist targets for tsParticles packages.

## Installation

```bash
pnpm add -D @tsparticles/browserslist-config browserslist
```

## Included Query

Current configuration (`src/index.ts` export):

```ts
const browserslistConfig = ["since 2021", "not dead"] as const;

export default browserslistConfig;
```

## Usage

Add this to your package `package.json`:

```json
{
  "browserslist": [
    "extends @tsparticles/browserslist-config"
  ]
}
```

Then verify with:

```bash
pnpm exec browserslist
```

## Build (package maintainers)

```bash
pnpm run build
```

## License

MIT
