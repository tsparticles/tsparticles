# Slim

`@tsparticles/slim` is the recommended default for most projects.

## When to choose Slim

- You want a great size/features balance.
- You use the `tsParticles` engine API directly.
- You need common shapes/interactions without loading everything.

## Installation

```bash
pnpm add @tsparticles/engine @tsparticles/slim
```

## Setup

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

await loadSlim(tsParticles);

await tsParticles.load({
  id: "tsparticles",
  options: {
    particles: {
      number: { value: 80 },
      move: { enable: true, speed: 2 },
      links: { enable: true },
    },
  },
});
```

## Common pitfalls

- Calling `tsParticles.load(...)` before `loadSlim(...)`.
- Mixing package versions across engine/plugins.

## Related pages

- Overview: [`/guide/bundles`](/guide/bundles)
- Installation matrix: [`/guide/installation`](/guide/installation)
