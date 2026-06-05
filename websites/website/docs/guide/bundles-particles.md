# Bundle: Particles

`@tsparticles/particles` provides a simplified API for creating interactive particle backgrounds. A richer alternative to `@tsparticles/basic` with a dedicated API instead of manual engine configuration.

## Included features

**Shapes:** circle (from basic)

**Internal plugins:** interactivity (links, collisions)

**Interactions:** links (particle connections), collisions

**API:** `particles(options)` or `particles(canvasId, options)`

## When to use

- Particle background for a website
- Background with particle links (node-style effect)
- You don't want to configure the engine manually

## Installation

### npm/pnpm/yarn

```bash
pnpm add @tsparticles/particles
```

```ts
import { particles } from "@tsparticles/particles";

// Background with links
await particles({
  count: 120,
  links: true,
  color: "#ffffff",
  linksColor: "#00d8ff",
  radius: 3,
  speed: 2,
  opacity: 0.8,
});

// On a specific canvas
await particles("my-canvas", {
  count: 80,
  shape: ["circle", "square"],
  links: true,
});

// With custom colors
await particles({
  count: 100,
  color: ["#ff6b6b", "#4ecdc4", "#45b7d1"],
  links: false,
});
```

### CDN (script tag)

```html
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/particles@4/tsparticles.particles.bundle.min.js"></script>
<script>
  particles({
    radius: 3,
    speed: 2,
    opacity: 0.8,
    links: true,
    linksWidth: 140,
    color: "#ffffff",
    linksColor: "#00d8ff",
  });
</script>
```

### Main parameters

| Parameter | Type | Default | Description |
|---|---|---|---|
| `count` | number | 50 | Number of particles |
| `radius` | number | 3 | Particle radius |
| `speed` | number | 2 | Movement speed |
| `opacity` | number | 0.8 | Opacity (0-1) |
| `color` | string \| string[] | "#ffffff" | Particle color(s) |
| `links` | boolean | false | Show links |
| `linksColor` | string | "#ffffff" | Link color |
| `linksWidth` | number | 1 | Link thickness |
| `shape` | string[] | ["circle"] | Particle shapes |

## Common mistakes

- Thinking `tsParticles` is exported by `@tsparticles/particles` — it is not.
- Reusing the same canvas ID unintentionally.
- Expecting advanced shapes (stars, polygons) — the particles bundle is based on basic and only uses circles.

## See also

- [Bundle overview](/guide/bundles)
- [Getting started](/guide/getting-started)
