# tsParticles Vibrant Tropical Palette

[tsParticles](https://github.com/tsparticles/tsparticles) palette for vibrant tropical.

## Quick checklist

1. Install `@tsparticles/engine` and this package
2. Load the palette before calling `tsParticles.load(...)`
3. Set `palette: "vibrant-tropical"` in your options

## Install

```bash
pnpm add @tsparticles/palette-vibrant-tropical
```

## Usage

```ts
import { loadSlim } from "@tsparticles/slim";
import { tsParticles } from "@tsparticles/engine";
import { loadVibrantTropicalPalette } from "@tsparticles/palette-vibrant-tropical";

await loadSlim(tsParticles);
await loadVibrantTropicalPalette(tsParticles);

await tsParticles.load({
  id: "tsparticles",
  options: {
    palette: "vibrant-tropical",
  },
});
```
