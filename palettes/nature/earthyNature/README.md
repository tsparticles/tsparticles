# tsParticles Earthy Nature Palette

[tsParticles](https://github.com/tsparticles/tsparticles) palette for earthy nature.

## Quick checklist

1. Install `@tsparticles/engine` and this package
2. Load the palette before calling `tsParticles.load(...)`
3. Set `palette: "earthy-nature"` in your options

## Install

```bash
pnpm add @tsparticles/palette-earthy-nature
```

## Usage

```ts
import { loadSlim } from "@tsparticles/slim";
import { tsParticles } from "@tsparticles/engine";
import { loadEarthyNaturePalette } from "@tsparticles/palette-earthy-nature";

await loadSlim(tsParticles);
await loadEarthyNaturePalette(tsParticles);

await tsParticles.load({
  id: "tsparticles",
  options: {
    palette: "earthy-nature",
  },
});
```
