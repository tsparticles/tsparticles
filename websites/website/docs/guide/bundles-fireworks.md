# Fireworks

`@tsparticles/fireworks` exposes a focused API for fireworks effects with minimal setup.

## When to choose Fireworks

- You want one-call fireworks animations.
- You do not need direct engine wiring.
- You prefer a compact API for celebratory moments.

## Installation

```bash
pnpm add @tsparticles/fireworks
```

## Setup example

```ts
import { fireworks } from "@tsparticles/fireworks";

const instance = await fireworks({
  colors: ["#ffffff", "#ff0000"],
  sounds: false,
});

instance?.pause();
instance?.play();

await fireworks("canvas-id", {
  rate: 3,
  speed: { min: 10, max: 25 },
});
```

## Common pitfalls

- Assuming `tsParticles` is exported from `@tsparticles/fireworks`.
- Calling `fireworks(...)` repeatedly without managing the returned instance.

## Related pages

- Overview: [`/guide/bundles`](/guide/bundles)
- Playground bundles: [`/playground/bundles`](/playground/bundles)
