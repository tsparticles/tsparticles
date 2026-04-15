# tsParticles Vibrant Electric Palette

[tsParticles](https://github.com/tsparticles/tsparticles) palette for vibrant electric.

## Quick checklist

1. Install `@tsparticles/engine` (or use the CDN bundle below)
2. Load a base package (for example `@tsparticles/basic`) and call `loadVibrantElectricPalette` before `tsParticles.load(...)`
3. Apply the palette plus a minimal particles configuration in your options

A palette defines colors, not complete behavior, so pair it with a runtime package and particle options.

## Install

```bash
pnpm add @tsparticles/palette-vibrant-electric
```

## Usage

```ts
import { loadBasic } from "@tsparticles/basic";
import { tsParticles } from "@tsparticles/engine";
import { loadVibrantElectricPalette } from "@tsparticles/palette-vibrant-electric";

await loadBasic(tsParticles);
await loadVibrantElectricPalette(tsParticles);

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
    palette: "vibrant-electric",
  },
});
```
