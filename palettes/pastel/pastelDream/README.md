# tsParticles Pastel Dream Palette

[tsParticles](https://github.com/tsparticles/tsparticles) palette for pastel dream.

## Quick checklist

1. Install `@tsparticles/engine` and this package
2. Load the palette before calling `tsParticles.load(...)`
3. Set `palette: "pastel-dream"` in your options

## Install

```bash
pnpm add @tsparticles/palette-pastel-dream
```

## Usage

```ts
import { loadSlim } from "@tsparticles/slim";
import { tsParticles } from "@tsparticles/engine";
import { loadPastelDreamPalette } from "@tsparticles/palette-pastel-dream";

await loadSlim(tsParticles);
await loadPastelDreamPalette(tsParticles);

await tsParticles.load({
  id: "tsparticles",
  options: {
    palette: "pastel-dream",
  },
});
```
