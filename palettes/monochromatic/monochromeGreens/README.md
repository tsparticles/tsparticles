# tsParticles Monochrome Greens Palette

[tsParticles](https://github.com/tsparticles/tsparticles) palette for monochrome greens.

## Quick checklist

1. Install `@tsparticles/engine` and this package
2. Load the palette before calling `tsParticles.load(...)`
3. Set `palette: "monochrome-greens"` in your options

## Install

```bash
pnpm add @tsparticles/palette-monochrome-greens
```

## Usage

```ts
import { loadSlim } from "@tsparticles/slim";
import { tsParticles } from "@tsparticles/engine";
import { loadMonochromeGreensPalette } from "@tsparticles/palette-monochrome-greens";

await loadSlim(tsParticles);
await loadMonochromeGreensPalette(tsParticles);

await tsParticles.load({
  id: "tsparticles",
  options: {
    palette: "monochrome-greens",
  },
});
```
