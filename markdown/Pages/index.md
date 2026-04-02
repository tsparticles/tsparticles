# tsParticles

Quick guide to understand what to use, where to find options, and how to start in a few minutes.

## Start here

If this is your first time with tsParticles:

1. Install a ready bundle (`@tsparticles/slim` in most cases)
2. Load the bundle once
3. Start an instance with `tsParticles.load(...)`

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
- **I need only core and custom plugins**: `@tsparticles/engine`
- **I need every feature for quick prototyping**: `@tsparticles/all`

## Common pitfalls

- Calling `tsParticles.load(...)` before loading bundle features
- Using an `id` that does not exist in the DOM
- Mixing too many presets/options in the first iteration

## Quick documentation map

- Root options: [Options](../Options.md)
- Color formats and values: [Color](../Color.md)
- Runtime container management: [Container](../Container.md)
- Plugins, custom shapes, custom presets: [Plugins](../Plugins.md)
- Migration from particles.js: [pjsMigration](../pjsMigration.md)

## Bundle choice

- `@tsparticles/basic`: simple use cases and reduced payload
- `@tsparticles/slim`: recommended choice for most websites and apps
- `tsparticles`: complete bundle with many extensions
- `@tsparticles/all`: includes everything (useful for prototypes/playgrounds)

## Ready-to-use presets

If you want to start without configuring everything manually, use official presets:

- Repository: <https://github.com/tsparticles/presets>
- Demo catalog: <https://particles.js.org/samples/presets/>

Presets are great to start fast and then customize only the options you need.
