# Palette

Palettes define reusable color profiles with fill and stroke colors, blend mode, and optional background. They are referenced with `particles.palette`.

## Quick app-local creation

```ts
import type { Engine, IPalette } from "@tsparticles/engine";

const appPalette: IPalette = {
  name: "App Sunset",
  blendMode: "multiply",
  colors: {
    fill: {
      enable: true,
      value: ["#ff6b6b", "#ffd166", "#4ecdc4"],
    },
  },
};

export async function loadAppPalette(engine: Engine): Promise<void> {
  await engine.pluginManager.register((e) => {
    e.pluginManager.addPalette("app-sunset", appPalette);
  });
}

await loadAppPalette(tsParticles);

const options = {
  particles: {
    palette: "app-sunset",
  },
};
```

## Creating a reusable package

### Using the CLI

```bash
npx @tsparticles/cli-create palette <destination>
```

### Generated files

```
src/
  options.ts        — Palette configuration object
  index.ts          — Load function + exports
  index.lazy.ts     — Lazy async loader
  browser.ts        — Browser global registration
```

### Package structure

The `options.ts` file contains the palette definition:

```ts
import type { IPalette } from "@tsparticles/engine";

const paletteName = "my-palette";

export const myPaletteOptions: IPalette = {
  name: "My Palette",
  blendMode: "normal",
  colors: {
    fill: {
      enable: true,
      value: ["#color1", "#color2"],
    },
  },
};

export { paletteName };
```

The load function registers the palette:

```ts
export async function loadMyPalette(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);
  await engine.pluginManager.register((e) => {
    e.pluginManager.addPalette(paletteName, myPaletteOptions);
  });
}
```

### Using your package

```ts
import { loadMyPalette } from "@tsparticles/palette-my-palette";

await loadMyPalette(tsParticles);

const options = {
  particles: {
    palette: "my-palette",
  },
};
```

## Contributing to the official repository

- Place your package in: `palettes/<category>/<name>/` (two levels deep)
- Lint and build with: `pnpm run build`
- Open a pull request on GitHub
