[![banner](https://particles.js.org/images/banner2.png)](https://particles.js.org)

# tsParticles Ribbons Bundle

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/@tsparticles/ribbons/badge)](https://www.jsdelivr.com/package/npm/@tsparticles/ribbons) [![npmjs](https://badge.fury.io/js/@tsparticles/ribbons.svg)](https://www.npmjs.com/package/@tsparticles/ribbons) [![npmjs](https://img.shields.io/npm/dt/@tsparticles/ribbons)](https://www.npmjs.com/package/@tsparticles/ribbons) [![GitHub Sponsors](https://img.shields.io/github/sponsors/matteobruni)](https://github.com/sponsors/matteobruni)

[tsParticles](https://github.com/tsparticles/tsparticles) ribbons bundle to create animated ribbons effects with a single API.

Demo website: <https://ribbons.js.org>

## Exposed API

The package API is centered on `ribbons`.

```ts
import { ribbons } from "@tsparticles/ribbons";

await ribbons(options);
await ribbons("canvas-id", options);

await ribbons.init();
const fireOnCanvas = await ribbons.create(canvas, defaultOptions);
await fireOnCanvas(options);

console.log(ribbons.version);
```

## Installation

```bash
pnpm add @tsparticles/ribbons
```

## How to use it

```ts
import { ribbons } from "@tsparticles/ribbons";

await ribbons({
  count: 5,
  position: { x: 50, y: 0 },
});
```

With advanced ribbon shape customization:

```ts
import { ribbons } from "@tsparticles/ribbons";

await ribbons({
  ribbonOptions: {
    count: 70,
    oscillationDistance: {
      min: 120,
      max: 170,
    },
  },
});
```

## Options

Main options:

- `count` _Integer (default: 5)_
- `ticks` _Number (default: 200)_
- `position` _Object_ (`x`/`y`, default 50/0, in percent) — only `position.x` is used; `position.y` is ignored (emitter always spawns at top-of-canvas)
- `emitterSize` _Object_ (`width`/`height`, default 100/0, in percent) — spawn width is controlled by `emitterSize.width` (default 100); not always full width
- `colors` _Array&lt;String&gt;_
- `ribbonOptions` _Object_ (`particles.shape.options.ribbon`)
  - Includes `darken: { enable: true, value: 30 }` by default
- `scalar` _Number (default: 1)_
- `zIndex` _Integer (default: 100)_
- `disableForReducedMotion` _Boolean (default: true)_

The `ribbons` bundle disables `roll`, `rotate`, `tilt`, and `wobble` on ribbon particles by default for better shape stability.
The emitter spawns from `position.x` across a strip whose width is controlled by `emitterSize.width` (default 100%), with downward movement for a falling-from-top effect. `position.y` is ignored — the emitter is always positioned at the top of the canvas.

Deprecated aliases still accepted:

- `particleCount` (use `count`)
- `origin` (use `position`)
