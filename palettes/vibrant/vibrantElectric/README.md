# tsParticles Vibrant Electric Palette

[tsParticles](https://github.com/tsparticles/tsparticles) palette for vibrant electric.

## Quick checklist

1. Install `@tsparticles/engine` and this package
2. Load the palette before calling `tsParticles.load(...)`
3. Set `palette: "vibrant-electric"` in your options

## Install

```bash
pnpm add @tsparticles/palette-vibrant-electric
```

## Usage

```ts
import { loadSlim } from "@tsparticles/slim";
import { tsParticles } from "@tsparticles/engine";
import { loadVibrantElectricPalette } from "@tsparticles/palette-vibrant-electric";

await loadSlim(tsParticles);
await loadVibrantElectricPalette(tsParticles);

await tsParticles.load({
  id: "tsparticles",
  options: {
    palette: "vibrant-electric",
  },
});
```
