# tsParticles Monochrome Pinks Palette

[tsParticles](https://github.com/tsparticles/tsparticles) palette for monochrome pinks.

## Quick checklist

1. Install `@tsparticles/engine` and this package
2. Load the palette before calling `tsParticles.load(...)`
3. Set `palette: "monochrome-pinks"` in your options

## Install

```bash
pnpm add @tsparticles/palette-monochrome-pinks
```

## Usage

```ts
import { loadSlim } from "@tsparticles/slim";
import { tsParticles } from "@tsparticles/engine";
import { loadMonochromePinksPalette } from "@tsparticles/palette-monochrome-pinks";

await loadSlim(tsParticles);
await loadMonochromePinksPalette(tsParticles);

await tsParticles.load({
  id: "tsparticles",
  options: {
    palette: "monochrome-pinks",
  },
});
```
