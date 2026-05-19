# tsparticles (Full)

`tsparticles` is the full bundle and includes a broad set of official features with one loader.

## When to choose tsparticles (Full)

- You need many official features without manually selecting plugins.
- You want a complete production-ready baseline before fine-tuning.
- You prefer engine control through the `tsParticles` API.

## Installation

```bash
pnpm add @tsparticles/engine tsparticles
```

## Setup

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadFull } from "tsparticles";

await loadFull(tsParticles);

await tsParticles.load({
  id: "tsparticles",
  options: {
    particles: {
      number: { value: 100 },
      move: { enable: true, speed: 2 },
    },
  },
});
```

## Common pitfalls

- Calling `tsParticles.load(...)` before `loadFull(...)`.
- Assuming this is the same package as `@tsparticles/all` (they are different bundles).

## Related pages

- Overview: [`/guide/bundles`](/guide/bundles)
- Installation matrix: [`/guide/installation`](/guide/installation)
