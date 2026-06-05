# Bundle: Basic

`@tsparticles/basic` is the lightest bundle. Only includes the essentials: circles that move with animatable opacity and size.

## Included features

**Shapes:** circle

**Updaters:**
- paint (color)
- opacity
- out-modes (behavior when leaving the screen)
- size

**Plugins:**
- move
- blend (color blending)
- HEX, HSL, RGB color plugins

**Not included:**
- Mouse/touch interactions
- Particle links
- Other shapes (squares, stars, images, polygons, etc.)
- Emitters, absorbers, sounds
- Rotation, life, roll, tilt, wobble

## When to use

- Bundle size is your top priority
- You only need dots moving around
- No interactions or complex shapes needed

## Installation

### npm/pnpm/yarn

```bash
pnpm add @tsparticles/engine @tsparticles/basic
```

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadBasic } from "@tsparticles/basic";

await loadBasic(tsParticles);

await tsParticles.load({
  id: "tsparticles",
  options: {
    background: { color: "#ffffff" },
    particles: {
      number: { value: 50 },
      color: { value: ["#5bc0eb", "#fde74c", "#9bc53d"] },
      size: {
        value: { min: 300, max: 400 },
        animation: { enable: true, speed: 100 },
      },
      move: { enable: true, speed: 10 },
    },
  },
});
```

### CDN (script tags)

```html
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/engine@4/tsparticles.engine.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/basic@4/tsparticles.basic.bundle.min.js"></script>
<script>
  (async () => {
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
  })();
</script>
```

## Common mistakes

- Expecting features not included (e.g., `links`, mouse interactions) — these require higher bundles.
- Calling `tsParticles.load()` before `loadBasic(tsParticles)` — shapes and updaters aren't registered yet.
- Installing only `@tsparticles/engine` without a bundle — the engine alone draws nothing.

## See also

- [Bundle overview](/guide/bundles)
- [Installation guide](/guide/installation)
