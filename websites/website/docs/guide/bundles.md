# Bundles Guide

This page helps you pick the right `tsParticles` bundle and set it up quickly.

## Package comparison

| Package                  | Best for                                      | Setup style                                    |
| ------------------------ | --------------------------------------------- | ---------------------------------------------- |
| `@tsparticles/basic`     | Extra-light setups                            | `tsParticles` + `await loadBasic(tsParticles)` |
| `@tsparticles/slim`      | Most websites/apps                            | `tsParticles` + `await loadSlim(tsParticles)`  |
| `tsparticles`            | Full official feature set with engine control | `tsParticles` + `await loadFull(tsParticles)`  |
| `@tsparticles/all`       | Full features, fastest prototyping            | `tsParticles` + `await loadAll(tsParticles)`   |
| `@tsparticles/confetti`  | One-call confetti effects                     | `await confetti(options)`                      |
| `@tsparticles/fireworks` | One-call fireworks effects                    | `await fireworks(options)`                     |
| `@tsparticles/particles` | Simple particles background API               | `await particles(options)`                     |

## Bundle guides

- Basic: [`/guide/bundles-basic`](/guide/bundles-basic)
- Slim: [`/guide/bundles-slim`](/guide/bundles-slim)
- tsparticles (Full): [`/guide/bundles-full`](/guide/bundles-full)
- All: [`/guide/bundles-all`](/guide/bundles-all)
- Confetti: [`/guide/bundles-confetti`](/guide/bundles-confetti)
- Fireworks: [`/guide/bundles-fireworks`](/guide/bundles-fireworks)
- Particles: [`/guide/bundles-particles`](/guide/bundles-particles)

## Installation

Install the package path that matches your use case.

```bash
pnpm add @tsparticles/engine @tsparticles/basic
pnpm add @tsparticles/engine @tsparticles/slim
pnpm add @tsparticles/engine tsparticles
pnpm add @tsparticles/engine @tsparticles/all
pnpm add @tsparticles/confetti
pnpm add @tsparticles/fireworks
pnpm add @tsparticles/particles
```

Need CDN links and more package-manager variants?

- See [`/guide/installation`](/guide/installation).

## Setup examples

### Engine + loader bundles (`basic`, `slim`, `full`, `all`)

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
    },
  },
});
```

For the other presets, swap only the loader import/function:

- `@tsparticles/basic` -> `loadBasic`
- `tsparticles` -> `loadFull`
- `@tsparticles/all` -> `loadAll`

### Focused APIs (`confetti`, `fireworks`, `particles`)

```ts
import { confetti } from "@tsparticles/confetti";
import { fireworks } from "@tsparticles/fireworks";
import { particles } from "@tsparticles/particles";

await confetti({ count: 80, spread: 60 });
await fireworks({ sounds: false });
await particles({ count: 100, links: true });
```

These APIs are great when you want fast integration without manually wiring many engine plugins.

## Practical selection rules

1. Start with `@tsparticles/slim` in most projects.
2. Use `@tsparticles/basic` if bundle size is your top priority and features are simple.
3. Use `tsparticles` when you need a broad full-feature baseline with `loadFull`.
4. Use `@tsparticles/all` for prototyping or when you need many features immediately.
5. Use `@tsparticles/confetti`, `@tsparticles/fireworks`, or `@tsparticles/particles` when your UI needs one focused effect with minimal setup.

## Related pages

- Playground focused bundles: [`/playground/bundles`](/playground/bundles)
- Getting started path: [`/guide/getting-started`](/guide/getting-started)
- Installation matrix: [`/guide/installation`](/guide/installation)
- Wrappers overview: [`/guide/wrappers`](/guide/wrappers)
