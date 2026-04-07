# tsParticles Vibrant Palette

[tsParticles](https://github.com/tsparticles/tsparticles) palette for vibrant.

## Quick checklist

1. Install `@tsparticles/engine` and this package
2. Load the palette before calling `tsParticles.load(...)`
3. Set `palette: "vibrant"` in your options

## Install

```bash
pnpm add @tsparticles/palette-vibrant
```

## Usage

```ts
import { loadSlim } from "@tsparticles/slim";
import { tsParticles } from "@tsparticles/engine";
import { loadVibrantPalette } from "@tsparticles/palette-vibrant";

await loadSlim(tsParticles);
await loadVibrantPalette(tsParticles);

await tsParticles.load({
  id: "tsparticles",
  options: {
    palette: "vibrant",
  },
});
```
