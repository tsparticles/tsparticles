# Installation

## Choose your path

| Scenario | Command |
|---|---|
| Quick start (recommended) | `pnpm add @tsparticles/engine @tsparticles/slim` |
| Minimal setup | `pnpm add @tsparticles/engine @tsparticles/basic` |
| Full feature set | `pnpm add @tsparticles/engine tsparticles` |
| Everything in the repo | `pnpm add @tsparticles/engine @tsparticles/all` |
| Confetti only | `pnpm add @tsparticles/confetti` |
| Fireworks only | `pnpm add @tsparticles/fireworks` |
| Particle background | `pnpm add @tsparticles/particles` |
| Ribbon effect | `pnpm add @tsparticles/ribbons` |

> **Important**: `@tsparticles/engine` alone draws nothing. You must always add a bundle (to load shapes and animations) or individual plugins. See the [bundle guide](/guide/bundles).

## npm

```bash
# engine + slim (recommended for most projects)
npm install @tsparticles/engine @tsparticles/slim

# engine + basic (minimal)
npm install @tsparticles/engine @tsparticles/basic

# engine + full (tsparticles)
npm install @tsparticles/engine tsparticles

# engine + all
npm install @tsparticles/engine @tsparticles/all

# Dedicated API bundles (no explicit engine needed)
npm install @tsparticles/confetti
npm install @tsparticles/fireworks
npm install @tsparticles/particles
npm install @tsparticles/ribbons
```

## yarn

```bash
yarn add @tsparticles/engine @tsparticles/slim
# ... same pattern for other bundles
```

## pnpm

```bash
pnpm add @tsparticles/engine @tsparticles/slim
# ... same pattern for other bundles
```

## CDN (script tags)

All packages are available on jsDelivr, unpkg, and cdnjs.

### jsDelivr

| Bundle | URL |
|---|---|
| Engine | `https://cdn.jsdelivr.net/npm/@tsparticles/engine@4/tsparticles.engine.min.js` |
| Basic | `https://cdn.jsdelivr.net/npm/@tsparticles/basic@4/tsparticles.basic.bundle.min.js` |
| Slim | `https://cdn.jsdelivr.net/npm/@tsparticles/slim@4/tsparticles.slim.bundle.min.js` |
| Full (`tsparticles`) | `https://cdn.jsdelivr.net/npm/tsparticles@4/tsparticles.bundle.min.js` |
| All | `https://cdn.jsdelivr.net/npm/@tsparticles/all@4/tsparticles.all.bundle.min.js` |
| Confetti | `https://cdn.jsdelivr.net/npm/@tsparticles/confetti@4/tsparticles.confetti.bundle.min.js` |
| Fireworks | `https://cdn.jsdelivr.net/npm/@tsparticles/fireworks@4/tsparticles.fireworks.bundle.min.js` |
| Particles | `https://cdn.jsdelivr.net/npm/@tsparticles/particles@4/tsparticles.particles.bundle.min.js` |
| Ribbons | `https://cdn.jsdelivr.net/npm/@tsparticles/ribbons@4/tsparticles.ribbons.bundle.min.js` |
| particles.js compatibility | `https://cdn.jsdelivr.net/npm/@tsparticles/pjs@4/tsparticles.pjs.min.js` |

### unpkg

Same structure: `https://unpkg.com/{package-name}@{version}/{filename}`

Example:
`https://unpkg.com/@tsparticles/slim@4/tsparticles.slim.bundle.min.js`

### cdnjs

`https://cdnjs.com/libraries/tsparticles`

## Import examples

### With bundler (ES module import)

```ts
// Engine + bundle loader
import { tsParticles } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

await loadSlim(tsParticles);
await tsParticles.load({ id: "tsparticles", options: { ... } });
```

### With CommonJS (require)

```ts
const { tsParticles } = require("@tsparticles/engine");
const { loadSlim } = require("@tsparticles/slim");

(async () => {
  await loadSlim(tsParticles);
  await tsParticles.load({ id: "tsparticles", options: { ... } });
})();
```

### With CDN (script tag)

```html
<!-- 1. Engine -->
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/engine@4/tsparticles.engine.min.js"></script>
<!-- 2. Bundle (exposes loadBasic/loadSlim/loadFull/loadAll globally) -->
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/slim@4/tsparticles.slim.bundle.min.js"></script>
<!-- 3. Your script -->
<script>
  (async () => {
    await loadSlim(tsParticles);  // register features
    await tsParticles.load({
      id: "tsparticles",
      options: {
        particles: {
          number: { value: 60 },
          move: { enable: true },
        },
      },
    });
  })();
</script>
```

With dedicated API bundles:

```html
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/confetti@4/tsparticles.confetti.bundle.min.js"></script>
<script>
  confetti({ particleCount: 100, spread: 70 });
</script>
```

## Related pages

- [Getting started](/guide/getting-started)
- [Bundle guide](/guide/bundles)
- [Framework wrappers](/guide/wrappers)
