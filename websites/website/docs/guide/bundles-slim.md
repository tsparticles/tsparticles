# Bundle: Slim

`@tsparticles/slim` is the recommended bundle for most projects. Includes everything needed for modern particle animations with mouse interactions, multiple shapes, and particle links.

## Included features

Inherits everything from `@tsparticles/basic` plus:

**Shapes:** circle, square, star, polygon, line, image, emoji

**External interactions (mouse/touch):**
- attract
- bounce
- bubble
- connect
- destroy
- grab
- parallax
- pause
- push
- remove
- repulse
- slow

**Particle interactions:**
- attract
- collisions
- links (particle connections)

**Additional updaters:**
- life (lifecycle)
- rotate

**Plugins:**
- interactivity
- easing-quad
- HEX, HSL, RGB color plugins

## When to use

- Recommended starting point for most projects
- Need multiple shapes (circles, stars, polygons, images)
- Need mouse interactions (click, hover, bubble, repulse)
- Need particle links
- Good balance between bundle size and features

## Installation

### npm/pnpm/yarn

```bash
pnpm add @tsparticles/engine @tsparticles/slim
```

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

await loadSlim(tsParticles);

await tsParticles.load({
  id: "tsparticles",
  options: {
    background: { color: "#0b1020" },
    particles: {
      number: { value: 80 },
      links: { enable: true, distance: 150 },
      move: { enable: true, speed: 2 },
      shape: { type: ["circle", "star", "square"] },
    },
  },
});
```

### CDN (script tags)

```html
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/engine@4/tsparticles.engine.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/slim@4/tsparticles.slim.bundle.min.js"></script>
<script>
  (async () => {
    await loadSlim(tsParticles);

    await tsParticles.load({
      id: "tsparticles",
      options: {
        particles: {
          number: { value: 80 },
          links: { enable: true },
          move: { enable: true, speed: 2 },
        },
      },
    });
  })();
</script>
```

## Common mistakes

- Calling `tsParticles.load()` before `loadSlim(tsParticles)`.
- Mixing different versions between engine and bundle — keep them aligned.
- Expecting features from higher bundles (emitters, absorbers, text, wobble) — need `tsparticles` (full) or individual plugins.

## See also

- [Bundle overview](/guide/bundles)
- [Installation guide](/guide/installation)
