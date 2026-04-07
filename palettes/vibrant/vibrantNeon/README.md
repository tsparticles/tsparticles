# tsParticles Vibrant Neon Palette

[tsParticles](https://github.com/tsparticles/tsparticles) palette for vibrant neon.

## Quick checklist

1. Install `@tsparticles/engine` and this package
2. Load the palette before calling `tsParticles.load(...)`
3. Set `palette: "vibrant-neon"` in your options

## Install

```bash
pnpm add @tsparticles/palette-vibrant-neon
```

## Usage

```ts
import { loadSlim } from "@tsparticles/slim";
import { tsParticles } from "@tsparticles/engine";
import { loadVibrantNeonPalette } from "@tsparticles/palette-vibrant-neon";

await loadSlim(tsParticles);
await loadVibrantNeonPalette(tsParticles);

await tsParticles.load({
  id: "tsparticles",
  options: {
    palette: "vibrant-neon",
  },
});
```
