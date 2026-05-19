# Confetti

`@tsparticles/confetti` exposes a focused API for confetti effects with minimal setup.

## When to choose Confetti

- You want one-call celebratory effects.
- You do not need to wire the engine manually.
- You prefer a compact API for UI events.

## Installation

```bash
pnpm add @tsparticles/confetti
```

## Setup example

```ts
import { confetti } from "@tsparticles/confetti";

await confetti({
  count: 80,
  spread: 60,
});

await confetti("canvas-id", {
  count: 50,
  angle: 90,
  spread: 45,
});
```

## Common pitfalls

- Assuming `tsParticles` is exported from `@tsparticles/confetti`.
- Reusing the same canvas id unintentionally.

## Related pages

- Overview: [`/guide/bundles`](/guide/bundles)
- Playground bundles: [`/playground/bundles`](/playground/bundles)
