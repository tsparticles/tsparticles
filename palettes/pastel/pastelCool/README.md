# tsParticles Pastel Cool Palette

[tsParticles](https://github.com/tsparticles/tsparticles) palette for pastel cool.

## Quick checklist

1. Install `@tsparticles/engine` and this package
2. Load the palette before calling `tsParticles.load(...)`
3. Set `palette: "pastel-cool"` in your options

## Install

```bash
pnpm add @tsparticles/palette-pastel-cool
```

## Usage

```ts
import { loadSlim } from "@tsparticles/slim";
import { tsParticles } from "@tsparticles/engine";
import { loadPastelCoolPalette } from "@tsparticles/palette-pastel-cool";

await loadSlim(tsParticles);
await loadPastelCoolPalette(tsParticles);

await tsParticles.load({
  id: "tsparticles",
  options: {
    palette: "pastel-cool",
  },
});
```
