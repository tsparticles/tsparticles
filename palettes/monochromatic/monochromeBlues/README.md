# tsParticles Monochrome Blues Palette

[tsParticles](https://github.com/tsparticles/tsparticles) palette for monochrome blues.

## Quick checklist

1. Install `@tsparticles/engine` and this package
2. Load the palette before calling `tsParticles.load(...)`
3. Set `palette: "monochrome-blues"` in your options

## Install

```bash
pnpm add @tsparticles/palette-monochrome-blues
```

## Usage

```ts
import { loadSlim } from "@tsparticles/slim";
import { tsParticles } from "@tsparticles/engine";
import { loadMonochromeBluesPalette } from "@tsparticles/palette-monochrome-blues";

await loadSlim(tsParticles);
await loadMonochromeBluesPalette(tsParticles);

await tsParticles.load({
  id: "tsparticles",
  options: {
    palette: "monochrome-blues",
  },
});
```
