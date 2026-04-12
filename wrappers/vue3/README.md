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

## How init works

- `init` is called once per Vue app instance.
- Components wait for `init` completion before loading.
- You choose what to import inside `init` (`@tsparticles/slim`, `tsparticles`, custom plugins, etc.).

## Nuxt support

For Nuxt projects use [`@tsparticles/nuxt3`](../nuxt3/README.md) or [`@tsparticles/nuxt4`](../nuxt4/README.md), which wrap this package in a Nuxt module.
