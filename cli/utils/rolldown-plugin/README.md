# @tsparticles/rolldown-plugin

Utility package that generates Rolldown configurations for tsParticles engine, bundles, plugins, presets, shapes, paths, interactions, effects, templates, palettes, updaters, and utils.

## Installation

```bash
pnpm add -D @tsparticles/rolldown-plugin rolldown
```

## Exports

```ts
import {
  createParticlesBuild,
  loadParticlesBundle,
  loadParticlesEffect,
  loadParticlesEngine,
  loadParticlesInteraction,
  loadParticlesInteractionExternal,
  loadParticlesInteractionParticles,
  loadParticlesPalette,
  loadParticlesPath,
  loadParticlesPlugin,
  loadParticlesPluginEasing,
  loadParticlesPluginEmittersShape,
  loadParticlesPluginExport,
  loadParticlesPreset,
  loadParticlesShape,
  loadParticlesTemplate,
  loadParticlesUpdater,
  loadParticlesUtil,
} from "@tsparticles/rolldown-plugin";
```

## Basic Example

```ts
import { loadParticlesPlugin } from "@tsparticles/rolldown-plugin";

export default loadParticlesPlugin({
  bundle: true,
  dir: process.cwd(),
  moduleName: "your-plugin",
  pluginName: "Your Plugin",
  progress: false,
  version: "1.0.0",
});
```

The helpers return Rolldown config objects (or arrays of configs) ready to be used with the `rolldown` bundler.

## Notes

- Output files are generated in each consumer package `dist` directory.
- Helpers support optional external mappings through `additionalExternals` where applicable.
- Bundle/non-bundle variants are generated depending on the helper and input options.
- Uses rolldown's built-in node resolution, replace plugin, and minification instead of separate rollup plugins.

## Build (package maintainers)

```bash
pnpm run build
```

## License

MIT
