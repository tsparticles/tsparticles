# Bundle: tsparticles (Full)

`tsparticles` (npm: `tsparticles`, loader: `loadFull`) is the official full bundle. Includes everything from Slim plus emitters, absorbers, text shapes, and advanced animations (wobble, roll, tilt, twinkle, destroy).

## Included features

Inherits everything from `@tsparticles/slim` plus:

**Additional shapes:** text (with custom fonts)

**Additional external interactions:**

- drag (drag particles with mouse)
- trail (particle trail behind mouse)

**Additional updaters:**

- destroy (particle destruction animation)
- roll (rolling)
- tilt (3D tilt)
- twinkle (intermittent sparkle)
- wobble (oscillation)

**Plugins:**

- absorbers (black holes that suck in particles)
- emitters (continuous particle sources)
- emitters-shape-circle, emitters-shape-square (emitter shapes)

## When to use

- Need emitters (particles spawning continuously)
- Need absorbers (particles being sucked in)
- Need text shapes with custom fonts
- Need advanced animations (wobble, tilt, roll, twinkle)
- Good stepping stone before going to individual plugins

## Installation

### npm/pnpm/yarn

```bash
pnpm add @tsparticles/engine tsparticles
```

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadFull } from "tsparticles";

await loadFull(tsParticles);

await tsParticles.load({
  id: "tsparticles",
  options: {
    background: { color: "#000" },
    particles: {
      number: { value: 50 },
      shape: { type: "text", options: { text: ["🔥", "✨", "⭐"] } },
      size: { value: 24 },
      move: { enable: true, speed: 1 },
      wobble: { enable: true, distance: 10 },
    },
    emitters: {
      direction: "top",
      rate: { quantity: 2, delay: 0.3 },
    },
  },
});
```

### CDN (script tags)

```html
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/engine@4/tsparticles.engine.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/tsparticles@4/tsparticles.bundle.min.js"></script>
<script>
  (async () => {
    await loadFull(tsParticles);

    await tsParticles.load({
      id: "tsparticles",
      options: {
        particles: {
          number: { value: 80 },
          move: { enable: true, speed: 2 },
        },
        absorbers: [{ color: "#ff0000", size: { value: 50 } }],
      },
    });
  })();
</script>
```

## Difference between `tsparticles` and `@tsparticles/all`

| Aspect        | `tsparticles` (full)                                    | `@tsparticles/all`                                                                  |
| ------------- | ------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| Size          | Moderate                                                | Very large                                                                          |
| Shapes        | circle, square, star, polygon, line, image, emoji, text | All shapes (heart, cards, arrow, spiral, cog, rounded-rect, etc.)                   |
| Interactions  | Slim + drag + trail                                     | All (cannon, light, pop, particle, repulse)                                         |
| Paths         | Quad easing only                                        | 14 path generators                                                                  |
| Effects       | None                                                    | 5 effects (bubble, filter, shadow, etc.)                                            |
| Exports       | None                                                    | Image, JSON, Video                                                                  |
| Extra plugins | absorbers, emitters                                     | All (sounds, themes, trail, zoom, polygon-mask, canvas-mask, background-mask, etc.) |
| Easing        | Quad                                                    | 15 easings                                                                          |

## Common mistakes

- Confusing `tsparticles` with `@tsparticles/all` — they are different packages.
- Calling `tsParticles.load()` before `loadFull(tsParticles)`.
- The npm package is `tsparticles` (not `@tsparticles/full`), the loader is `loadFull`.

## See also

- [Bundle overview](/guide/bundles)
- [Installation guide](/guide/installation)
