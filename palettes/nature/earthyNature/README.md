# tsParticles Earthy Nature Palette

[tsParticles](https://github.com/tsparticles/tsparticles) palette for earthy nature.

## Quick checklist

1. Install `@tsparticles/engine` (or use the CDN bundle below)
2. Load a base package (for example `@tsparticles/basic`) and call `loadEarthyNaturePalette` before `tsParticles.load(...)`
3. Apply the palette plus a minimal particles configuration in your options

A palette defines colors, not complete behavior, so pair it with a runtime package and particle options.

## Install

```bash
pnpm add @tsparticles/palette-earthy-nature
```

## Usage

```ts
import { loadBasic } from "@tsparticles/basic";
import { tsParticles } from "@tsparticles/engine";
import { loadEarthyNaturePalette } from "@tsparticles/palette-earthy-nature";

await loadBasic(tsParticles);
await loadEarthyNaturePalette(tsParticles);

await tsParticles.load({
  id: "tsparticles",
  options: {
    particles: {
      number: { value: 200 },
      shape: { type: "circle" },
      size: { value: { min: 10, max: 15 } },
      move: {
        enable: true,
        speed: 2,
      },
    },
    palette: "earthy-nature",
  },
});
```
