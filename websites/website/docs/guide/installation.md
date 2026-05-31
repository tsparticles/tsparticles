# Installation

This page mirrors the installation matrix from the main `tsParticles` README.

Source of truth: <https://github.com/tsparticles/tsparticles/blob/main/README.md#library-installation>

## Choose your path

- **Fast default**: `@tsparticles/engine` + `@tsparticles/slim`
- **Smaller custom runtime**: `@tsparticles/engine` + only required plugins
- **Focused APIs**: `@tsparticles/particles`, `@tsparticles/confetti`, `@tsparticles/fireworks`, or `@tsparticles/ribbons`
- **All features included**: `@tsparticles/all`

## Hosting / CDN

Use one of these providers (or self-host your built files).

### jsDelivr

- <https://www.jsdelivr.com/package/npm/@tsparticles/confetti>
- <https://www.jsdelivr.com/package/npm/@tsparticles/particles>
- <https://www.jsdelivr.com/package/npm/@tsparticles/engine>
- <https://www.jsdelivr.com/package/npm/@tsparticles/fireworks>
- <https://www.jsdelivr.com/package/npm/@tsparticles/basic>
- <https://www.jsdelivr.com/package/npm/@tsparticles/slim>
- <https://www.jsdelivr.com/package/npm/tsparticles>
- <https://www.jsdelivr.com/package/npm/@tsparticles/all>

### cdnjs

- <https://cdnjs.com/libraries/tsparticles>

### unpkg

- <https://unpkg.com/@tsparticles/confetti/>
- <https://unpkg.com/@tsparticles/particles/>
- <https://unpkg.com/@tsparticles/engine/>
- <https://unpkg.com/@tsparticles/fireworks/>
- <https://unpkg.com/@tsparticles/basic/>
- <https://unpkg.com/@tsparticles/slim/>
- <https://unpkg.com/tsparticles/>
- <https://unpkg.com/@tsparticles/all/>

## Package manager install

### npm

```bash
npm install @tsparticles/engine
```

### yarn

```bash
yarn add @tsparticles/engine
```

### pnpm

```bash
pnpm add @tsparticles/engine
```

## Import and require

```ts
const tsParticles = require("@tsparticles/engine");

// or

import { tsParticles } from "@tsparticles/engine";
```

## Minimal runtime setup (`@tsparticles/slim`)

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

await loadSlim(tsParticles);

await tsParticles.load({
  id: "tsparticles",
  options: {
    particles: {
      move: {
        enable: true,
      },
      number: {
        value: 60,
      },
    },
  },
});
```

## Related pages

- [`/guide/getting-started`](/guide/getting-started)
- [`/guide/wrappers`](/guide/wrappers)
- [`/demos/presets`](/demos/presets)
- [`/migrations/particles-js`](/migrations/particles-js)

## Legacy compatibility

If you are migrating legacy particles.js integrations, use the compatibility package:

- npm: <https://www.npmjs.com/package/@tsparticles/pjs>
- jsDelivr: <https://www.jsdelivr.com/package/npm/@tsparticles/pjs>
