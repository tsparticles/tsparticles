# tsParticles Vibrant Retro Palette

[tsParticles](https://github.com/tsparticles/tsparticles) palette for vibrant retro.

## Quick checklist

1. Install `@tsparticles/engine` (or use the CDN bundle below)
2. Load a base package (for example `@tsparticles/basic`) and call `loadVibrantRetroPalette` before `tsParticles.load(...)`
3. Apply the palette plus a minimal particles configuration in your options

A palette defines colors, not complete behavior, so pair it with a runtime package and particle options.

## Install

```bash
pnpm add @tsparticles/palette-vibrant-retro
```

## Usage

```ts
import { loadBasic } from "@tsparticles/basic";
import { tsParticles } from "@tsparticles/engine";
import { loadVibrantRetroPalette } from "@tsparticles/palette-vibrant-retro";

await loadBasic(tsParticles);
await loadVibrantRetroPalette(tsParticles);

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
    palette: "vibrant-retro",
  },
});
```
