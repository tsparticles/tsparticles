# @tsparticles/rolldown-plugin

Utility package that generates Rolldown configurations for tsParticles engine, bundles, plugins, presets, shapes, paths, interactions, effects, templates, palettes, updaters, and utils.

It reuses the configuration production of `@tsparticles/rollup-plugin`: the generated configs bundle through [Rolldown](https://rolldown.rs) with the exact same plugin pipeline (node-resolve, replace, terser/visualizer and the IIFE-to-globalScope retargeting that keeps classic and module `<script>` tags working).

## Installation

```bash
pnpm add -D @tsparticles/rolldown-plugin rolldown
```

## Exports

```ts
import {
  createParticlesRolldown,
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
import { rolldown } from "rolldown";

const [config] = loadParticlesPlugin({
  bundle: true,
  dir: process.cwd(),
  moduleName: "your-plugin",
  pluginName: "Your Plugin",
  progress: false,
  version: "1.0.0",
});

const bundle = await rolldown(config.input);

for (const output of config.outputs) {
  await bundle.write(output);
}

await bundle.close();
```

The helpers return Rolldown config objects split into `input` and `outputs`, ready to be consumed by the `rolldown()` API.

## Notes

- Output files are generated in each consumer package `dist` directory.
- Helpers support optional external mappings through `additionalExternals` where applicable.
- Bundle/non-bundle variants are generated depending on the helper and input options.

## Build (package maintainers)

```bash
pnpm run build
```

## License

MIT
