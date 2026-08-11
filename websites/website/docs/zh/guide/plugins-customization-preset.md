# Preset

A preset bundles a full set of options into a single named configuration that users can reference with the `preset` option. This is the best way to share complete visual themes.

## Quick app-local creation

```ts
import { tsParticles } from "@tsparticles/engine";

export async function loadAppPreset(): Promise<void> {
  tsParticles.addPreset("app-hero", {
    fpsLimit: 60,
    particles: {
      number: { value: 80 },
      move: { enable: true, speed: 2 },
      links: { enable: true, distance: 140 },
    },
  });
}

await loadAppPreset();

const options = {
  preset: "app-hero",
};
```

## Creating a reusable package

### Using the CLI

```bash
npx @tsparticles/cli-create preset <destination>
```

### Generated files

```
src/
  options.ts        — Preset options object
  bundle.ts         — Bundle entry that auto-loads the preset
  index.ts          — Load function + exports
  index.lazy.ts     — Lazy async loader
  browser.ts        — Browser global registration
```

### Package structure

The `options.ts` file contains the preset options:

```ts
import type { ISourceOptions } from "@tsparticles/engine";

const options: ISourceOptions = {
  // your preset options
};

export default options;
```

The load function registers the preset:

```ts
export async function loadMyPreset(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);
  await engine.pluginManager.register((e) => {
    e.pluginManager.addPreset("my-preset", options);
  });
}
```

### Using your package

```ts
import { loadMyPreset } from "@tsparticles/preset-my-preset";

await loadMyPreset(tsParticles);

const options = {
  preset: "my-preset",
};
```

A preset package often depends on specific shape, updater, or plugin packages to provide the features it needs. Add them as `dependencies` in `package.json`.

## Contributing to the official repository

- Place your package in: `presets/<name>/`
- Presets typically bundle multiple dependencies — declare them in `dependencies`, not `peerDependencies`
- Lint and build with: `pnpm run build`
- Open a pull request on GitHub
