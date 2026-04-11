# tsParticles Vibrant Neon Palette

[tsParticles](https://github.com/tsparticles/tsparticles) palette for vibrant neon.

## Quick checklist

1. Install `@tsparticles/engine` (or use the CDN bundle below)
2. Load a base package (for example `@tsparticles/basic`) and call `loadVibrantNeonPalette` before `tsParticles.load(...)`
3. Apply the palette plus a minimal particles configuration in your options

A palette defines colors, not complete behavior, so pair it with a runtime package and particle options.

## Install

```bash
pnpm add @tsparticles/palette-vibrant-neon
```

## Usage

```ts
import { loadBasic } from "@tsparticles/basic";
import { tsParticles } from "@tsparticles/engine";
import { loadVibrantNeonPalette } from "@tsparticles/palette-vibrant-neon";

await loadBasic(tsParticles);
await loadVibrantNeonPalette(tsParticles);

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
    palette: "vibrant-neon",
  },
});
```
