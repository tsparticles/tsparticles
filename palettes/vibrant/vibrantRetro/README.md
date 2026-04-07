# tsParticles Vibrant Retro Palette

[tsParticles](https://github.com/tsparticles/tsparticles) palette for vibrant retro.

## Quick checklist

1. Install `@tsparticles/engine` and this package
2. Load the palette before calling `tsParticles.load(...)`
3. Set `palette: "vibrant-retro"` in your options

## Install

```bash
pnpm add @tsparticles/palette-vibrant-retro
```

## Usage

```ts
import { loadSlim } from "@tsparticles/slim";
import { tsParticles } from "@tsparticles/engine";
import { loadVibrantRetroPalette } from "@tsparticles/palette-vibrant-retro";

await loadSlim(tsParticles);
await loadVibrantRetroPalette(tsParticles);

await tsParticles.load({
  id: "tsparticles",
  options: {
    palette: "vibrant-retro",
  },
});
```
