# tsParticles

Quick guide to choose the right package, find the right option reference, and start from presets, palettes, or ready-made configs in a few minutes.

## Quick checklist

If this is your first time with tsParticles:

1. Install `@tsparticles/engine`
2. Pick one runtime path:
   - `@tsparticles/slim` for most production websites and apps
   - `@tsparticles/all` for prototypes, playgrounds, and full feature coverage
   - only the packages you need if you want a minimal custom build
3. Load your chosen bundle once
4. Start with one of these inputs:
   - manual options
   - a ready-made config from `@tsparticles/configs`
   - an official preset from the `tsparticles/presets` repository

## Minimal start example

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

await loadSlim(tsParticles);

await tsParticles.load({
  id: "tsparticles",
  options: {
    background: {
      color: "#0d1117",
    },
    particles: {
      number: {
        value: 60,
      },
      move: {
        enable: true,
        speed: 1.2,
      },
      size: {
        value: { min: 1, max: 3 },
      },
    },
  },
});
```

## Choose your quick-start path

- **I need a production-ready default**: `@tsparticles/slim`
- **I need only core plus custom plugins**: `@tsparticles/engine`
- **I need every feature for quick prototyping**: `@tsparticles/all`
- **I want a ready visual starting point**: use `@tsparticles/configs` or an official preset first

## Quick documentation map

- Root options: [Options](../Options.md)
- Color formats and values: [Color](../Color.md)
- Runtime container management: [Container](../Container.md)
- Plugins, custom shapes, custom presets: [Plugins](../Plugins.md)
- Migration from particles.js: [pjsMigration](../pjsMigration.md)

## Detailed option guides

- Canvas and global behavior: [Background](../Options/Background.md), [Background Mask](../Options/BackgroundMask.md), [Full Screen](../Options/FullScreen.md), [Motion](../Options/Motion.md)
- Interactivity: [Interactivity](../Options/Interactivity.md), [Click](../Options/Interactivity/Click.md), [Hover](../Options/Interactivity/Hover.md), [Div](../Options/Interactivity/Div.md)
- Particle behavior: [Particles](../Options/Particles.md), [Color](../Options/Particles/Color.md), [Collisions](../Options/Particles/Collisions.md), [Life](../Options/Particles/Life.md), [Orbit](../Options/Particles/Orbit.md)
- Plugin-driven options: [Absorbers](../Options/Plugins/Absorbers.md), [Emitters](../Options/Plugins/Emitters.md), [Infection](../Options/Plugins/Infection.md), [Polygon Mask](../Options/Plugins/PolygonMask.md)

## Ready-made starting sources

### Configs (`@tsparticles/configs`)

Use configs when you want a concrete example object you can inspect and modify directly.

- Package README: <https://github.com/tsparticles/tsparticles/blob/main/utils/configs/README.md>
- Typical use case: copy a working config, then tune particles, interactivity, and visuals step by step

### Presets

Use presets when you want a reusable effect name such as `stars`, `fireworks`, or `confetti`.

- Repository: <https://github.com/tsparticles/presets>
- Demo catalog: <https://particles.js.org/samples/presets/>

Main preset catalog:

- Ambient
- Big Circles
- Bubbles
- Confetti
- Confetti Cannon
- Confetti Explosions
- Confetti Falling
- Confetti Parade
- Fire
- Firefly
- Fireworks
- Fountain
- Hyperspace
- Links
- Sea Anemone
- Snow
- Squares
- Stars
- Triangles

### Palettes

Use palettes when you already have the behavior you want and only need a reusable color direction.

- Repository directory: <https://github.com/tsparticles/palettes/tree/main/palettes>
- Palette-based demos: <https://particles.js.org/samples/palettes/>

## Bundle choice

- `@tsparticles/basic`: simple use cases and reduced payload
- `@tsparticles/slim`: recommended choice for most websites and apps
- `tsparticles`: complete bundle with many extensions
- `@tsparticles/all`: includes everything (useful for prototypes/playgrounds)

## Common pitfalls

- Calling `tsParticles.load(...)` before loading bundle or preset features
- Using an `id` that does not exist in the DOM
- Assuming configs or presets also load the runtime plugins they depend on
- Mixing too many presets/options in the first iteration instead of starting from one stable base
