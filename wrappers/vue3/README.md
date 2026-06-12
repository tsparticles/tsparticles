[![banner](https://particles.js.org/images/banner3.png)](https://particles.js.org)

# @tsparticles/vue3

[![npm](https://img.shields.io/npm/v/@tsparticles/vue3)](https://www.npmjs.com/package/@tsparticles/vue3)
[![npm](https://img.shields.io/npm/dm/@tsparticles/vue3)](https://www.npmjs.com/package/@tsparticles/vue3)

Official Vue 3 component wrapper for [tsParticles](https://github.com/matteobruni/tsparticles).

## Installation

```bash
pnpm add @tsparticles/vue3 @tsparticles/engine
```

## Usage

Register the plugin once in your app and provide your own async `init` function.

```ts
import { createApp } from "vue";
import Particles from "@tsparticles/vue3";
import type { Engine } from "@tsparticles/engine";
import App from "./App.vue";

async function registerParticles(engine: Engine): Promise<void> {
  const [{ loadSlim }] = await Promise.all([import("@tsparticles/slim")]);

  await loadSlim(engine);
}

const app = createApp(App);

app.use(Particles, {
  init: registerParticles,
});

app.mount("#app");
```

Then use the component anywhere in the app:

```vue
<template>
  <vue-particles id="tsparticles" :options="options" @particles-loaded="particlesLoaded" />
</template>

<script setup lang="ts">
import type { Container, ISourceOptions } from "@tsparticles/engine";

const options: ISourceOptions = {
  particles: {
    number: { value: 80 },
    links: { enable: true },
    move: { enable: true },
  },
};

function particlesLoaded(container?: Container): void {
  console.log("Particles loaded", container);
}
</script>
```

## Component props

| Prop      | Type             | Default  | Description                                                           |
| --------- | ---------------- | -------- | --------------------------------------------------------------------- |
| `id`      | `string`         | required | The DOM element id used for the particles container.                  |
| `options` | `ISourceOptions` | —        | Particle configuration object. Reactive: changing replaces particles. |
| `url`     | `string`         | —        | Remote JSON config URL. Reactive: changing reloads from URL.          |
| `theme`   | `string`         | —        | Theme name to apply (requires `@tsparticles/plugin-themes`).          |

## Reactive behavior

All reactive props (`id`, `options`, `url`) trigger a **destroy + reload** cycle when changed at runtime:

- `id` change → old container destroyed, new one created with the new id
- `options` change → particles are reloaded with the new config
- `url` change → config fetched from the new URL and loaded

> **Note**: `options` uses a deep watcher. For frequent updates, create a new object reference rather than mutating deeply to avoid unexpected reloads.

## Theme support

The `theme` prop requires the optional [`@tsparticles/plugin-themes`](https://www.npmjs.com/package/@tsparticles/plugin-themes) package. Without it, the prop is safely ignored (no crash, no throw).

```ts
import { loadThemePlugin } from "@tsparticles/plugin-themes";

async function registerParticles(engine: Engine): Promise<void> {
  await loadThemePlugin(engine);
  // ... load other presets/plugins
}
```

When the plugin is loaded, changing `theme` applies the new theme on the fly without destroying the container.

## Loaded callback

The `@particles-loaded` event fires with `Container | undefined` after `tsParticles.load()` resolves. Always guard for `undefined`:

```ts
function particlesLoaded(container?: Container): void {
  if (container) {
    console.log("Particles ready", container);
  }
}
```

## How init works

- `init` is called once per Vue app instance.
- Components wait for `init` completion before loading.
- You choose what to import inside `init` (`@tsparticles/slim`, `tsparticles`, custom plugins, etc.).

## Nuxt support

For Nuxt projects use [`@tsparticles/nuxt3`](../nuxt3/README.md) or [`@tsparticles/nuxt4`](../nuxt4/README.md), which wrap this package in a Nuxt module.
