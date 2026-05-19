# Basic

`@tsparticles/basic` is for extra-light setups where you need a minimal runtime.

## When to choose Basic

- Bundle size is the top priority.
- You only need core effects.
- Advanced plugins are not required.

## Installation

```bash
pnpm add @tsparticles/engine @tsparticles/basic
```

## Setup

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadBasic } from "@tsparticles/basic";

await loadBasic(tsParticles);

await tsParticles.load({
  id: "tsparticles",
  options: {
    particles: {
      number: { value: 50 },
      move: { enable: true, speed: 1.5 },
    },
  },
});
```

## Common pitfalls

- Expecting features that belong to plugins not included in basic.
- Calling `tsParticles.load(...)` before `loadBasic(...)`.

## Related pages

- Overview: [`/guide/bundles`](/guide/bundles)
- Installation matrix: [`/guide/installation`](/guide/installation)
