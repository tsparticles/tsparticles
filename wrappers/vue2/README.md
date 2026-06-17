[![banner](https://particles.js.org/images/banner3.png)](https://particles.js.org)

# @tsparticles/vue2

[![npm](https://img.shields.io/npm/v/@tsparticles/vue2)](https://www.npmjs.com/package/@tsparticles/vue2)
[![npm](https://img.shields.io/npm/dm/@tsparticles/vue2)](https://www.npmjs.com/package/@tsparticles/vue2)

Official Vue 2 component wrapper for [tsParticles](https://github.com/matteobruni/tsparticles).

## Installation

```bash
pnpm add @tsparticles/vue2 @tsparticles/engine
```

## Usage

Register the plugin once in your app and provide your own async `init` function.

```ts
import Vue from "vue";
import Particles from "@tsparticles/vue2";
import type { Engine } from "@tsparticles/engine";
import App from "./App.vue";

async function registerParticles(engine: Engine): Promise<void> {
  const [{ loadSlim }] = await Promise.all([import("@tsparticles/slim")]);

  await loadSlim(engine);
}

Vue.use(Particles, {
  init: registerParticles,
});

new Vue({
  render: h => h(App),
}).$mount("#app");
```

Then use the component anywhere in the app:

```vue
<template>
  <vue-particles id="tsparticles" :options="options" :particles-loaded="particlesLoaded" />
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import type { Container, ISourceOptions } from "@tsparticles/engine";

@Component
export default class App extends Vue {
  options: ISourceOptions = {
    particles: {
      number: { value: 80 },
      links: { enable: true },
      move: { enable: true },
    },
  };

  particlesLoaded(container?: Container): void {
    console.log("Particles loaded", container);
  }
}
</script>
```

## Component props

| Prop              | Type             | Default  | Description                                                           |
| ----------------- | ---------------- | -------- | --------------------------------------------------------------------- | -------------------------------- |
| `id`              | `string`         | required | The DOM element id used for the particles container.                  |
| `options`         | `ISourceOptions` | —        | Particle configuration object. Reactive: changing replaces particles. |
| `url`             | `string`         | —        | Remote JSON config URL. Reactive: changing reloads from URL.          |
| `theme`           | `string`         | —        | Theme name to apply (requires `@tsparticles/plugin-themes`).          |
| `particlesLoaded` | callback         | —        | Fires with `Container                                                 | undefined` after load completes. |

## Reactive behavior

All reactive props (`id`, `options`, `url`) trigger a **destroy + reload** cycle when changed at runtime:

- `id` change → old container destroyed, new one created with the new id
- `options` change → particles are reloaded with the new config
- `url` change → config fetched from the new URL and loaded

> **Note**: When using `@Watch` with deep object references, create a new object reference to trigger the watcher rather than mutating deeply.

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

The `particlesLoaded` prop fires with `Container | undefined` after `tsParticles.load()` resolves. Always guard for `undefined`:

```ts
particlesLoaded(container?: Container): void {
  if (container) {
    console.log("Particles ready", container);
  }
}
```

## How init works

- `init` is called once per Vue app instance.
- Components wait for `init` completion before loading.
- You choose what to import inside `init` (`@tsparticles/slim`, `tsparticles`, custom plugins, etc.).

### TypeScript errors

If TypeScript returns error while importing/using Particles plugin try adding the following import before the previous
code:

```typescript
declare module "@tsparticles/vue2";
```

## Demos

The demo website is [here](https://particles.js.org)

<https://particles.js.org>

There's also a CodePen collection actively maintained and updated [here](https://codepen.io/collection/DPOage)

<https://codepen.io/collection/DPOage>
