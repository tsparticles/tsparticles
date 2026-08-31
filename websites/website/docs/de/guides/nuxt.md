---
title: Nuxt Integration
description: Step-by-step guide to integrating tsParticles into a Nuxt 3 / Nuxt 4 application.
---

# Nuxt Integration

This guide covers integrating tsParticles into a **Nuxt 3** (and Nuxt 4) project using the official `@tsparticles/vue3` wrapper. Nuxt runs both server-side and client-side, so you must guard particle components against SSR.

## Installation

Install the Vue 3 wrapper and the engine bundle of your choice:

```bash
npm install @tsparticles/vue3 tsparticles
```

For a smaller bundle, install `@tsparticles/slim` instead of `tsparticles`:

```bash
npm install @tsparticles/vue3 @tsparticles/slim
```

## Basic Usage

Nuxt renders components on the server by default. Since tsParticles needs the browser `canvas` API, you must wrap the `<vue-particles>` component in a `<client-only>` tag:

```vue
<template>
  <div class="page">
    <client-only>
      <vue-particles id="tsparticles" :options="options" :init="particlesInit" @particles-loaded="particlesLoaded" />
    </client-only>
    <h1>My Nuxt App</h1>
  </div>
</template>

<script setup lang="ts">
import type { Container, Engine, ISourceOptions } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

const particlesInit = async (engine: Engine): Promise<void> => {
  await loadSlim(engine);
};

const options: ISourceOptions = {
  fullScreen: {
    zIndex: -1,
  },
  background: {
    color: "#0d47a1",
  },
  particles: {
    number: { value: 80 },
    links: { enable: true, color: "#ffffff" },
    move: { enable: true },
    size: { value: 3 },
  },
};

const particlesLoaded = (container?: Container) => {
  console.log("Particles container ready", container?.id);
};
</script>

<style scoped>
.page {
  position: relative;
}
</style>
```

The `<client-only>` wrapper ensures the `<vue-particles>` component is only mounted in the browser, preventing hydration mismatches.

## Configuration

Use the full `ISourceOptions` type for type-safe configuration. You can define your options inline or import them from a separate config file:

```vue
<script setup lang="ts">
import type { ISourceOptions } from "@tsparticles/engine";

const options: ISourceOptions = {
  fpsLimit: 60,
  background: {
    color: "#000000",
  },
  particles: {
    number: {
      value: 100,
      density: {
        enable: true,
      },
    },
    color: {
      value: ["#ff0000", "#00ff00", "#0000ff"],
    },
    shape: {
      type: ["circle", "square", "triangle"],
    },
    opacity: {
      value: 0.8,
    },
    size: {
      value: { min: 1, max: 8 },
    },
    links: {
      enable: true,
      distance: 150,
      color: "#ffffff",
      opacity: 0.4,
      width: 1,
    },
    move: {
      enable: true,
      speed: 3,
      direction: "none",
      random: false,
      straight: false,
      outModes: "bounce",
    },
  },
  interactivity: {
    events: {
      onHover: {
        enable: true,
        mode: "repulse",
      },
      onClick: {
        enable: true,
        mode: "push",
      },
    },
  },
};
</script>
```

## Snow Effect

Create a wintery snowfall effect using the snow preset:

```bash
npm install @tsparticles/preset-snow
```

```vue
<template>
  <client-only>
    <vue-particles id="snow" :options="options" @particles-loaded="onLoad" />
  </client-only>
</template>

<script setup lang="ts">
import { loadSnowPreset } from "@tsparticles/preset-snow";
import { tsParticles } from "@tsparticles/engine";
import type { Container } from "@tsparticles/engine";

// Load the preset before the component mounts
await loadSnowPreset(tsParticles);

const options = {
  preset: "snow",
  fullScreen: { zIndex: -1 },
  background: {
    color: "#1a1a2e",
  },
};

const onLoad = (container?: Container) => {
  console.log("Snow effect ready", container?.id);
};
</script>
```

Because the preset is loaded with top-level `await` in the `<script setup>`, it is guaranteed to be ready before the component renders.

## Interactive Particles

Enable click and hover interactions by adding interactivity modes:

```vue
<template>
  <client-only>
    <vue-particles id="interactive" :options="options" />
  </client-only>
</template>

<script setup lang="ts">
import type { ISourceOptions } from "@tsparticles/engine";

const options: ISourceOptions = {
  fullScreen: { zIndex: -1 },
  particles: {
    number: { value: 50 },
    links: {
      enable: true,
      distance: 150,
    },
    move: {
      enable: true,
      speed: 2,
    },
    size: {
      value: { min: 1, max: 4 },
    },
  },
  interactivity: {
    events: {
      onHover: {
        enable: true,
        mode: "grab", // particles connect to the cursor
      },
      onClick: {
        enable: true,
        mode: "push", // add particles on click
      },
    },
    modes: {
      grab: {
        distance: 200,
        links: {
          opacity: 0.5,
        },
      },
      push: {
        quantity: 4,
      },
    },
  },
};
</script>
```

Available interaction modes include: `grab`, `bubble`, `connect`, `repulse`, `push`, `remove`, `attract`, and `slow`.

## Event Handling

The `<vue-particles>` component emits several lifecycle events:

```vue
<template>
  <client-only>
    <vue-particles id="event-demo" :options="options" @particles-loaded="onLoaded" />
  </client-only>
</template>

<script setup lang="ts">
import type { Container } from "@tsparticles/engine";

const options = {
  fullScreen: { zIndex: -1 },
  particles: {
    number: { value: 60 },
    links: { enable: true },
    move: { enable: true },
  },
};

const onLoaded = (container?: Container) => {
  console.log("Container loaded", container?.id);
};
</script>
```

| Event               | Payload                  | Description                                                  |
| ------------------- | ------------------------ | ------------------------------------------------------------ |
| `@particles-loaded` | `Container \| undefined` | Fires every time the container finishes loading or reloading |

## Full TypeScript Example

A complete, typed component with explicit imports and lifecycle awareness:

```vue
<template>
  <div class="particles-wrapper">
    <client-only>
      <vue-particles id="full-example" :init="particlesInit" :options="options" @particles-loaded="onParticlesLoaded" />
    </client-only>
    <div class="controls">
      <button @click="togglePause">{{ paused ? "Resume" : "Pause" }}</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { Container, Engine, ISourceOptions } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

const particlesInit = async (engine: Engine): Promise<void> => {
  await loadSlim(engine);
};

const containerRef = ref<Container | undefined>(undefined);
const paused = ref(false);

const options: ISourceOptions = {
  fullScreen: { zIndex: -1 },
  background: { color: "#0a0a23" },
  particles: {
    color: { value: "#00ff00" },
    number: { value: 80 },
    links: { enable: true, color: "#00ff00", distance: 150 },
    move: { enable: true, speed: 1.5 },
    size: { value: { min: 1, max: 4 } },
  },
  interactivity: {
    events: {
      onHover: { enable: true, mode: "repulse" },
    },
    modes: {
      repulse: { distance: 120 },
    },
  },
};

const onParticlesLoaded = (container?: Container) => {
  containerRef.value = container;
};

const togglePause = () => {
  if (containerRef.value) {
    if (paused.value) {
      containerRef.value.play();
    } else {
      containerRef.value.pause();
    }
    paused.value = !paused.value;
  }
};
</script>

<style scoped>
.particles-wrapper {
  position: relative;
  min-height: 100vh;
}
.controls {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 10;
}
</style>
```

## Page Integration

Add a particle background to a specific Nuxt page by placing the component in the page's template:

```vue
<template>
  <div>
    <client-only>
      <vue-particles id="page-particles" :options="options" />
    </client-only>

    <div class="content">
      <h1>About Page</h1>
      <p>This content sits above the particle canvas.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ISourceOptions } from "@tsparticles/engine";

const options: ISourceOptions = {
  fullScreen: { zIndex: -1 },
  background: { color: "#1a1a2e" },
  particles: {
    number: { value: 50 },
    color: { value: "#e94560" },
    links: { enable: true, color: "#e94560" },
    move: { enable: true },
  },
};
</script>

<style scoped>
.content {
  position: relative;
  z-index: 1;
  padding: 2rem;
  color: white;
}
</style>
```

If you want particles on **every** page, add the component to `layouts/default.vue` instead of individual pages.

## Nuxt 4 Notes

Nuxt 4 maintains backward compatibility with Nuxt 3's `<client-only>` and `<script setup>` patterns. All of the examples above work without changes in Nuxt 4.

Key considerations for Nuxt 4:

- **Nitropack 2**: The server engine is upgraded, but it does not affect client-only components like `<vue-particles>`.
- **Vue 3.5+**: Nuxt 4 ships with a newer Vue version — `@tsparticles/vue3` is compatible with Vue 3.3+ without issues.
- **Stricter SSR checks**: If you see hydration warnings, ensure `<vue-particles>` is always inside `<client-only>` and never rendered on the server.
- **Hybrid rendering**: If using route rules with `ssr: false` for certain pages, you can omit `<client-only>` on those pages, but it is safer to always include it.

If you upgrade from Nuxt 2 with the `@tsparticles/vue` package (vue 2), you must migrate to `@tsparticles/vue3` for Nuxt 3 / 4 — the APIs are not compatible.

## Preset Gallery

Combine the pattern above with any of these official presets:

| Preset    | Package                         | Effect                  |
| --------- | ------------------------------- | ----------------------- |
| Confetti  | `@tsparticles/preset-confetti`  | Colorful confetti burst |
| Fireworks | `@tsparticles/preset-fireworks` | Firework explosions     |
| Snow      | `@tsparticles/preset-snow`      | Falling snowflakes      |
| Stars     | `@tsparticles/preset-stars`     | Twinkling night sky     |
| Links     | `@tsparticles/preset-links`     | Connected node network  |
| Bubbles   | `@tsparticles/preset-bubbles`   | Floating bubbles        |

```vue
<template>
  <client-only>
    <vue-particles id="preset-demo" :options="{ preset: 'stars' }" />
  </client-only>
</template>

<script setup lang="ts">
import { loadStarsPreset } from "@tsparticles/preset-stars";
import { tsParticles } from "@tsparticles/engine";

await loadStarsPreset(tsParticles);
</script>
```

## Reactive Behavior

The `<vue-particles>` component reacts to prop changes at runtime:

- **`:options`**, **`:url`**, or **`id`** change → the existing container is destroyed and particles are reloaded with the new values.
- **`theme`** attribute change → `loadTheme` is called on the existing container. This requires the optional `@tsparticles/plugin-themes` package (safe no-op otherwise).

On component unmount, the particles container is automatically destroyed — no orphan animations remain.

## Component API

| Prop       | Type                        | Description                                                               |
| ---------- | --------------------------- | ------------------------------------------------------------------------- |
| `id`       | `string`                    | Canvas element id. Change triggers destroy+reload.                        |
| `:options` | `ISourceOptions`            | Particle configuration object. Change triggers destroy+reload.            |
| `:url`     | `string`                    | Remote JSON config URL. Change triggers destroy+reload.                   |
| `theme`    | `string`                    | Theme name (requires `@tsparticles/plugin-themes`; safe no-op otherwise). |
| `:init`    | `(Engine) => Promise<void>` | Async callback to load engine plugins during initialization.              |

| Event               | Payload                  | Description                                                  |
| ------------------- | ------------------------ | ------------------------------------------------------------ |
| `@particles-loaded` | `Container \| undefined` | Fires every time the container finishes loading or reloading |

## Troubleshooting

| Symptom                           | Cause                                    | Fix                                                           |
| --------------------------------- | ---------------------------------------- | ------------------------------------------------------------- |
| Blank screen / hydration error    | `<vue-particles>` rendered on the server | Wrap in `<client-only>`                                       |
| Preset has no effect              | Preset not loaded before component mount | Call `loadXPreset()` with top-level await in `<script setup>` |
| Canvas does not fill the viewport | `fullScreen` not enabled                 | Add `fullScreen: { zIndex: -1 }` to the options               |
| Controls do not pause/resume      | Container ref not set                    | Assign the container in the `@particles-loaded` handler       |
| Theme change ignored              | `@tsparticles/plugin-themes` not loaded  | Install plugin and load it during engine initialization       |

## Next Steps

- Explore the [Interactive Demos](/demos/) for ready-made Vue configurations.
- Read the [Options Reference](/options/) for a complete list of particle parameters.
- Visit the [Presets page](/demos/presets) for more pre-built effects.
