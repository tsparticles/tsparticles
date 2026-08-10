# Bundle: All

`@tsparticles/all` loads **everything** from the tsParticles repository: every shape, interaction, updater, effect, path, easing, plugin, and export. It's the largest bundle, meant for prototyping and demos.

## Included features

Inherits everything from `tsparticles` (full) plus:

**All shapes:** arrow, cards, cog, heart, infinity, matrix, path, ribbon, rounded-polygon, rounded-rect, spiral, squircle

**All external interactions:** cannon, light, particle, pop, particles-repulse

**All effects:** bubble, filter, particles, shadow, trail

**All path generators:** branches, brownian, curl-noise, curves, fractal-noise, grid, levy, perlin-noise, polygon, random, simplex-noise, spiral, svg, zig-zag

**All easings:** back, bounce, circ, cubic, elastic, expo, gaussian, linear, quad, quart, quint, sigmoid, sine, smoothstep

**All color plugins:** HEX, HSL, RGB, HSV, HWB, LAB, LCH, Named, OKLAB, OKLCH

**All plugins:** absorbers, background-mask, canvas-mask, emitters (all shapes), easings (all), export-image, export-json, export-video, infection, manual-particles, motion, poisson-disc, polygon-mask, responsive, sounds, themes, trail, zoom

**All updaters:** destroy, gradient, life, opacity, orbit, out-modes, paint, roll, rotate, size, tilt, twinkle, wobble

## When to use

- Rapid prototyping to explore possibilities
- Demos and showcases
- Development environments where size doesn't matter
- **Not recommended for production** — prefer more targeted bundles

## Installation

### npm/pnpm/yarn

```bash
pnpm add @tsparticles/engine @tsparticles/all
```

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadAll } from "@tsparticles/all";

await loadAll(tsParticles);

await tsParticles.load({
  id: "tsparticles",
  options: {
    background: { color: "#000" },
    particles: {
      number: { value: 100 },
      shape: { type: "heart" },
      move: { enable: true, speed: 2 },
    },
  },
});
```

### CDN (script tags)

```html
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/engine@4/tsparticles.engine.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/all@4/tsparticles.all.bundle.min.js"></script>
<script>
  (async () => {
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
  })();
</script>
```

## Difference between `tsparticles` and `@tsparticles/all`

See the comparison table on the [bundles-full page](/guide/bundles-full) for the detailed breakdown.

## Common mistakes

- Using it in production — prefer `@tsparticles/slim` or `tsparticles` for smaller bundles.
- Calling `tsParticles.load()` before `loadAll(tsParticles)`.

## See also

- [Bundle overview](/guide/bundles)
- [Installation guide](/guide/installation)
