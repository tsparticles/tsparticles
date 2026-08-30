# Custom Bundle

A bundle is a loader that groups multiple extension packages together and registers them all with a single function call. The official `slim`, `basic`, and `all` packages are bundles.

## Quick app-local creation

```ts
import type { Engine } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

export async function loadAppBundle(engine: Engine): Promise<void> {
  await loadSlim(engine);

  await Promise.all([
    loadAppShape(engine),
    loadAppPreset(),
    loadAppPalette(engine),
    loadAppEffect(engine),
    loadAppPath(engine),
    loadAppUpdater(engine),
    loadAppInteraction(engine),
    loadAppPlugin(engine),
  ]);
}

await loadAppBundle(tsParticles);
```

## Creating a reusable package

### Using the CLI

```bash
npx @tsparticles/cli-create bundle <destination>
```

### Generated files

```
src/
  bundle.ts         — Bundle entry that loads all dependency loaders
  index.ts          — Load function + exports
  index.lazy.ts     — Lazy async loader
  browser.ts        — Browser global registration
```

### Package structure

The bundle load function aggregates other loaders:

```ts
export async function loadMyBundle(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);
  await engine.pluginManager.register(async () => {
    // load dependency packages
    await loadFeatureA(engine);
    await loadFeatureB(engine);
  });
}
```

### Using your package

```ts
import { loadMyBundle } from "@tsparticles/my-bundle";

await loadMyBundle(tsParticles);
```

Add your dependency packages (shapes, updaters, plugins, presets, etc.) in `dependencies` in `package.json`.

## Contributing to the official repository

- Place your bundle in: `bundles/<name>/`
- Use `dependencies` (not `peerDependencies`) for all bundled sub-packages
- Lint and build with: `pnpm run build`
- Open a pull request on GitHub
