# tsParticles Pastel Sunset Palette

[tsParticles](https://github.com/tsparticles/tsparticles) palette for pastel sunset.

## Quick checklist

1. Install `@tsparticles/engine` and this package
2. Load the palette before calling `tsParticles.load(...)`
3. Set `palette: "pastel-sunset"` in your options

## Install

```bash
pnpm add @tsparticles/palette-pastel-sunset
```

## Usage

```ts
import { loadSlim } from "@tsparticles/slim";
import { tsParticles } from "@tsparticles/engine";
import { loadPastelSunsetPalette } from "@tsparticles/palette-pastel-sunset";

await loadSlim(tsParticles);
await loadPastelSunsetPalette(tsParticles);

await tsParticles.load({
  id: "tsparticles",
  options: {
    palette: "pastel-sunset",
  },
});
```
