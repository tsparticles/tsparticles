# tsParticles Pastel Sunset Palette

[tsParticles](https://github.com/tsparticles/tsparticles) palette for pastel sunset.

## Quick checklist

1. Install `@tsparticles/engine` (or use the CDN bundle below)
2. Load a base package (for example `@tsparticles/basic`) and call `loadPastelSunsetPalette` before `tsParticles.load(...)`
3. Apply the palette plus a minimal particles configuration in your options

A palette defines colors, not complete behavior, so pair it with a runtime package and particle options.

## Install

```bash
pnpm add @tsparticles/palette-pastel-sunset
```

## Usage

```ts
import { loadBasic } from "@tsparticles/basic";
import { tsParticles } from "@tsparticles/engine";
import { loadPastelSunsetPalette } from "@tsparticles/palette-pastel-sunset";

await loadBasic(tsParticles);
await loadPastelSunsetPalette(tsParticles);

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
    palette: "pastel-sunset",
  },
});
```
