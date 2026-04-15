# tsParticles Monochrome Pinks Palette

[tsParticles](https://github.com/tsparticles/tsparticles) palette for monochrome pinks.

## Quick checklist

1. Install `@tsparticles/engine` (or use the CDN bundle below)
2. Load a base package (for example `@tsparticles/basic`) and call `loadMonochromePinksPalette` before `tsParticles.load(...)`
3. Apply the palette plus a minimal particles configuration in your options

A palette defines colors, not complete behavior, so pair it with a runtime package and particle options.

## Install

```bash
pnpm add @tsparticles/palette-monochrome-pinks
```

## Usage

```ts
import { loadBasic } from "@tsparticles/basic";
import { tsParticles } from "@tsparticles/engine";
import { loadMonochromePinksPalette } from "@tsparticles/palette-monochrome-pinks";

await loadBasic(tsParticles);
await loadMonochromePinksPalette(tsParticles);

await tsParticles.load({
  id: "tsparticles",
  options: {
    particles: {
      number: { value: 200 },
      shape: { type: "circle" },
      size: { value: { min: 10, max: 15 } },
      move: {
        enable: true,
        speed: 2,
      },
    },
    palette: "monochrome-pinks",
  },
});
```
