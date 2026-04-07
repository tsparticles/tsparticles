# tsParticles Monochrome Purples Palette

[tsParticles](https://github.com/tsparticles/tsparticles) palette for monochrome purples.

## Quick checklist

1. Install `@tsparticles/engine` and this package
2. Load the palette before calling `tsParticles.load(...)`
3. Set `palette: "monochrome-purples"` in your options

## Install

```bash
pnpm add @tsparticles/palette-monochrome-purples
```

## Usage

```ts
import { loadSlim } from "@tsparticles/slim";
import { tsParticles } from "@tsparticles/engine";
import { loadMonochromePurplesPalette } from "@tsparticles/palette-monochrome-purples";

await loadSlim(tsParticles);
await loadMonochromePurplesPalette(tsParticles);

await tsParticles.load({
  id: "tsparticles",
  options: {
    palette: "monochrome-purples",
  },
});
```
