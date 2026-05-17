# Installation

यह पेज `tsParticles` के main README में दी गई installation matrix को फॉलो करता है।

Official reference: <https://github.com/tsparticles/tsparticles/blob/main/README.md#library-installation>

## अपना path चुनें

- **Fast default**: `@tsparticles/engine` + `@tsparticles/slim`
- **छोटा custom runtime**: `@tsparticles/engine` + केवल required plugins
- **Focused APIs**: `@tsparticles/particles`, `@tsparticles/confetti`, या `@tsparticles/fireworks`
- **All features included**: `@tsparticles/all`

## Hosting / CDN

इन providers में से कोई भी उपयोग करें (या अपनी built files को self-host करें)।

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

## Package manager से install करें

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

## Import और require

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

- [`/guide/getting-started`](/hi/guide/getting-started)
- [`/guide/wrappers`](/hi/guide/wrappers)
- [`/demos/presets`](/hi/demos/presets)
- [`/migrations/particles-js`](/hi/migrations/particles-js)

## Legacy compatibility

अगर आप legacy particles.js integrations से migrate कर रहे हैं, तो compatibility package उपयोग करें:

- npm: <https://www.npmjs.com/package/@tsparticles/pjs>
- jsDelivr: <https://www.jsdelivr.com/package/npm/@tsparticles/pjs>
