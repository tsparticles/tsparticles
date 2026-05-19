# Particles

`@tsparticles/particles` exposes a focused API for simple particles backgrounds.

## When to choose Particles

- You want a quick particles background API.
- You do not need direct engine setup for every feature.
- You prefer a compact, app-like API.

## Installation

```bash
pnpm add @tsparticles/particles
```

## Setup

```ts
import { particles } from "@tsparticles/particles";

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
```

Custom canvas:

```ts
const canvas = document.getElementById("my-canvas") as HTMLCanvasElement;
await particles.create(canvas, { links: true });
```

## Common pitfalls

- Assuming `tsParticles` is exported from `@tsparticles/particles`.
- Reusing the same id unintentionally.

## Related pages

- Overview: [`/guide/bundles`](/guide/bundles)
- Playground bundles: [`/playground/bundles`](/playground/bundles)
