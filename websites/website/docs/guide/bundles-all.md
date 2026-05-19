# All

`@tsparticles/all` loads all official features and is ideal for fast prototyping.

## When to choose All

- You want all features available immediately.
- You are exploring options quickly.
- Bundle size is less important than speed of setup.

## Installation

```bash
pnpm add @tsparticles/engine @tsparticles/all
```

## Setup

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadAll } from "@tsparticles/all";

await loadAll(tsParticles);

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

- Using it in production when a smaller focused bundle would be better.
- Calling `tsParticles.load(...)` before `loadAll(...)`.

## Related pages

- Overview: [`/guide/bundles`](/guide/bundles)
- Installation matrix: [`/guide/installation`](/guide/installation)
