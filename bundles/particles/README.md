[![banner](https://particles.js.org/images/banner2.png)](https://particles.js.org)

# tsParticles Particles Bundle

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/@tsparticles/particles/badge)](https://www.jsdelivr.com/package/npm/@tsparticles/particles) [![npmjs](https://badge.fury.io/js/@tsparticles/particles.svg)](https://www.npmjs.com/package/@tsparticles/particles) [![npmjs](https://img.shields.io/npm/dt/@tsparticles/particles)](https://www.npmjs.com/package/@tsparticles/particles) [![GitHub Sponsors](https://img.shields.io/github/sponsors/matteobruni)](https://github.com/sponsors/matteobruni)

tsParticles `particles` bundle to create simple particle effects with a focused API.

**Included Packages**

- [@tsparticles/basic (and all its dependencies)](https://github.com/tsparticles/tsparticles/tree/main/bundles/basic)
- [@tsparticles/engine](https://github.com/tsparticles/tsparticles/tree/main/engine)
- [@tsparticles/plugin-interactivity](https://github.com/tsparticles/tsparticles/tree/main/plugins/interactivity)
- [@tsparticles/interaction-particles-collisions](https://github.com/tsparticles/tsparticles/tree/main/interactions/particles/collisions)
- [@tsparticles/interaction-particles-links](https://github.com/tsparticles/tsparticles/tree/main/interactions/particles/links)

## Exposed API

The package API is centered on `particles`.

```ts
import { createEngine } from "@tsparticles/engine";
import { createParticles } from "@tsparticles/particles";
const particles = createParticles(createEngine());

// Main API
const instance = await particles();
const byId = await particles("canvas-id", options);
const byOptions = await particles(options);

// Extra helpers
await particles.init();
const custom = await particles.create(canvas, options);

console.log(particles.version);
```

`@tsparticles/particles` does not expose `tsParticles` from its main entrypoint.
If you need direct engine APIs, import them from `@tsparticles/engine`.

## Installation

```bash
pnpm add @tsparticles/particles
```

Lazy entrypoint (loads dependencies on demand):

```ts
import { particles } from "@tsparticles/particles/lazy";
```

## How to use it

```ts
import { createEngine } from "@tsparticles/engine";
import { createParticles } from "@tsparticles/particles";
const particles = createParticles(createEngine());

const instance = await particles({
  count: 120,
  color: "#00f",
  links: true,
  linksColor: "#0ff",
  linksLength: 140,
  radius: 4,
  shape: ["circle", "square"],
});

instance?.pause();
instance?.play();
instance?.stop();
```

### Custom canvas via `particles.create`

```ts
import { createEngine } from "@tsparticles/engine";
import { createParticles } from "@tsparticles/particles";
const particles = createParticles(createEngine());

const canvas = document.getElementById("my-canvas") as HTMLCanvasElement;
await particles.create(canvas, { links: true });
```

### Options

Main options (shallow overview):

- `count` Number: particles amount (default: 80)
- `radius` Number or RangeValue: particle radius (default: 3)
- `links` Boolean: enable links between particles
- `linksLength` Number: maximum link distance
- `speed` Number or RangeValue: particle movement speed
- `collisions` Boolean: enable particle collisions
- `opacity` Number: particle opacity
- `shape` String or Array&lt;String&gt;: particle shape type(s)
- `color` String: particle color
- `linksColor` String: link color

### Returned instance methods

The resolved `ParticlesInstance` exposes:

- `pause()`
- `play()`
- `stop()`

## Common pitfalls

- Calling `particles` before scripts are loaded in CDN usage
- Assuming `tsParticles` is exported by `@tsparticles/particles` main entrypoint
- Reusing the same `id` unintentionally (the package caches instances by id)

## Related docs

- All packages catalog: <https://github.com/tsparticles/tsparticles>
- Main docs: <https://particles.js.org/docs/>
