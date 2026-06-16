---
title: Vue 3 Integration
description: Step-by-step guide for integrating tsParticles into Vue 3 applications using @tsparticles/vue3.
---

# Vue 3 Integration

The `@tsparticles/vue3` package provides a native Vue 3 component and plugin system for tsParticles. This guide covers everything from basic setup to advanced patterns like dynamic theme switching and custom presets.

---

## Installation

```bash
npm install @tsparticles/vue3 @tsparticles/engine
```

Optionally install a preset or the full bundle:

```bash
# Full bundle (all features)
npm install tsparticles

# Specific presets
npm install @tsparticles/preset-confetti
npm install @tsparticles/preset-fireworks
npm install @tsparticles/preset-snow
npm install @tsparticles/preset-stars

# Utility configs
npm install @tsparticles/configs
```

---

## Basic Usage

Register the plugin in your app entry point, then use the `<vue-particles>` component anywhere.

### App entry (`main.ts`)

```typescript
import { createApp } from "vue";
import App from "./App.vue";
import type { Engine } from "@tsparticles/engine";
import { ParticlesPlugin } from "@tsparticles/vue3";
import { loadFull } from "tsparticles";

const app = createApp(App);

app.use(ParticlesPlugin, {
  init: async (engine: Engine) => {
    await loadFull(engine);
  },
});

app.mount("#app");
```

### Component (`App.vue`)

```vue
<script setup lang="ts">
import type { ISourceOptions } from "@tsparticles/engine";

const options: ISourceOptions = {
  background: {
    color: "#0d47a1",
  },
  fpsLimit: 120,
  particles: {
    number: {
      value: 80,
    },
    color: {
      value: "#ffffff",
    },
    shape: {
      type: "circle",
    },
    opacity: {
      value: 0.5,
    },
    size: {
      value: { min: 1, max: 5 },
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
      speed: 2,
      direction: "none",
      random: false,
      straight: false,
      outModes: "out",
    },
  },
  interactivity: {
    events: {
      onHover: {
        enable: true,
        mode: "repulse",
      },
    },
    modes: {
      repulse: {
        distance: 100,
      },
    },
  },
};
</script>

<template>
  <vue-particles id="tsparticles" :options="options" />
</template>
```

---

## Events

The component emits several lifecycle events:

```vue
<script setup lang="ts">
import type { Container } from "@tsparticles/engine";

const particlesLoaded = async (container: Container): Promise<void> => {
  console.log("Particles container loaded", container);
};
</script>

<template>
  <vue-particles id="tsparticles" :options="options" @particles-loaded="particlesLoaded" />
</template>
```

---

## Confetti Effect

Use the confetti preset for celebrations:

```bash
npm install @tsparticles/preset-confetti
```

```vue
<script setup lang="ts">
import type { ISourceOptions } from "@tsparticles/engine";

const options: ISourceOptions = {
  preset: "confetti",
  background: {
    color: "transparent",
  },
};
</script>

<template>
  <vue-particles id="confetti" :options="options" />
</template>

> **Note:** Register the `loadConfettiPreset` in your app entry point via the plugin's `init` callback (see [Basic Usage](#basic-usage)).
```

For a one-shot burst, load the preset then call `tsParticles.load()` programmatically inside a method.

---

## Fireworks Effect

The fireworks preset creates high-impact particle explosions:

```bash
npm install @tsparticles/preset-fireworks
```

```vue
<script setup lang="ts">
import type { ISourceOptions } from "@tsparticles/engine";

const options: ISourceOptions = {
  preset: "fireworks",
  background: {
    color: "#000000",
  },
};
</script>

<template>
  <vue-particles id="fireworks" :options="options" />
</template>

> **Note:** Register the `loadFireworksPreset` in your app entry point via the plugin's `init` callback (see [Basic Usage](#basic-usage)).
```

> **Tip:** The fireworks preset is resource-intensive. Trigger it on user interaction (e.g., button click) by toggling a `v-if` bound to the component.

---

## Snow Effect

Simulate falling snow with the snow preset:

```bash
npm install @tsparticles/preset-snow
```

```vue
<script setup lang="ts">
import type { ISourceOptions } from "@tsparticles/engine";

const options: ISourceOptions = {
  preset: "snow",
  background: {
    color: "#1a1a2e",
  },
};
</script>

<template>
  <vue-particles id="snow" :options="options" />
</template>

> **Note:** Register the `loadSnowPreset` in your app entry point via the plugin's `init` callback (see [Basic Usage](#basic-usage)).
```

---

## Interactive Particles

Add hover and click interactivity modes:

```vue
<script setup lang="ts">
import type { ISourceOptions } from "@tsparticles/engine";

const options: ISourceOptions = {
  background: {
    color: "#0d0d0d",
  },
  particles: {
    number: {
      value: 100,
    },
    color: {
      value: "#00ff00",
    },
    shape: {
      type: "circle",
    },
    opacity: {
      value: 0.6,
    },
    size: {
      value: { min: 1, max: 4 },
    },
    links: {
      enable: true,
      distance: 120,
      color: "#00ff00",
      opacity: 0.3,
      width: 1,
    },
    move: {
      enable: true,
      speed: 3,
    },
  },
  interactivity: {
    events: {
      onHover: {
        enable: true,
        mode: "grab",
      },
      onClick: {
        enable: true,
        mode: "push",
      },
    },
    modes: {
      grab: {
        distance: 180,
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

<template>
  <vue-particles id="interactive" :options="options" />
</template>
```

Available interaction modes: `grab`, `repulse`, `bubble`, `connect`, `push`, `remove`, `trail`, `attract`, `light`.

---

## Theme Switching

Dynamically swap particle themes at runtime by updating the reactive options object:

```vue
<script setup lang="ts">
import { ref } from "vue";
import type { ISourceOptions } from "@tsparticles/engine";

const isDark = ref(true);

const options = ref<ISourceOptions>({
  background: {
    color: "#000000",
  },
  particles: {
    color: {
      value: "#ffffff",
    },
    links: {
      color: "#ffffff",
    },
    number: {
      value: 60,
    },
    move: {
      enable: true,
      speed: 2,
    },
    size: {
      value: { min: 1, max: 3 },
    },
  },
});

const toggleTheme = () => {
  isDark.value = !isDark.value;
  options.value = {
    ...options.value,
    background: {
      color: isDark.value ? "#000000" : "#f0f0f0",
    },
    particles: {
      ...options.value.particles,
      color: {
        value: isDark.value ? "#ffffff" : "#333333",
      },
      links: {
        ...(options.value.particles?.links as object),
        color: isDark.value ? "#ffffff" : "#333333",
      },
    },
  };
};
</script>

<template>
  <div>
    <button @click="toggleTheme">Switch to {{ isDark ? "light" : "dark" }}</button>
    <vue-particles id="theme-particles" :options="options" />
  </div>
</template>
```

The `<vue-particles>` component also supports a `theme` prop for zero-config switching. When the `theme` prop changes, the component applies the new theme without destroying and recreating the container:

```vue
<template>
  <vue-particles id="tsparticles" :options="options" :theme="currentTheme" />
</template>
```

> **Note:** The `theme` prop requires the optional [`@tsparticles/plugin-themes`](https://www.npmjs.com/package/@tsparticles/plugin-themes) package. Without it, the `theme` prop is a safe no-op — no error is thrown, but the theme change is ignored.

---

## Custom Preset from @tsparticles/configs

The `@tsparticles/configs` package exports pre-made configuration objects:

```bash
npm install @tsparticles/configs
```

```vue
<script setup lang="ts">
import type { ISourceOptions } from "@tsparticles/engine";
import particlesConfig from "@tsparticles/configs/particles.json";

const options: ISourceOptions = {
  ...particlesConfig,
  background: {
    color: "#1e1e2e",
  },
};
</script>

<template>
  <vue-particles id="config-particles" :options="options" />
</template>

> **Note:** Register the `loadLinksPreset` in your app entry point via the plugin's `init` callback (see [Basic Usage](#basic-usage)).
```

Browse available configs in the `@tsparticles/configs` package for ready-to-use layouts.

---

## Engine Initialization Approaches

There are two ways to initialise the engine:

### 1. Global Plugin (recommended)

```typescript
// main.ts
import { createApp } from "vue";
import App from "./App.vue";
import type { Engine } from "@tsparticles/engine";
import { ParticlesPlugin } from "@tsparticles/vue3";
import { loadFull } from "tsparticles";

createApp(App)
  .use(ParticlesPlugin, {
    init: async (engine: Engine) => {
      await loadFull(engine);
    },
  })
  .mount("#app");
```

The engine is then available globally and all `<vue-particles>` instances share it.

### 2. Particles Provider (Composition API)

Use the provider to access the engine programmatically:

```vue
<script setup lang="ts">
import { useParticlesProvider } from "@tsparticles/vue3";
import { loadFull } from "tsparticles";

const { init } = useParticlesProvider();

await init(async (engine: Engine) => {
  await loadFull(engine);
});
</script>
```

---

## Named Exports + TypeScript

Full TypeScript example with all the pieces together:

```vue
<script setup lang="ts">
import { ref } from "vue";
import type { Container, ISourceOptions } from "@tsparticles/engine";

const particlesContainer = ref<Container | null>(null);

const options: ISourceOptions = {
  background: {
    color: "#0d47a1",
  },
  fpsLimit: 60,
  particles: {
    number: {
      value: 50,
    },
    color: {
      value: "#ffd700",
    },
    shape: {
      type: ["circle", "triangle", "polygon"],
    },
    opacity: {
      value: 0.7,
      random: true,
    },
    size: {
      value: { min: 2, max: 8 },
      random: true,
    },
    links: {
      enable: true,
      distance: 200,
      color: "#ffd700",
      opacity: 0.3,
      width: 1,
    },
    move: {
      enable: true,
      speed: 2,
      direction: "none",
      random: true,
      straight: false,
      outModes: "bounce",
      attract: {
        enable: false,
      },
    },
  },
  interactivity: {
    events: {
      onHover: {
        enable: true,
        mode: "bubble",
      },
      onClick: {
        enable: true,
        mode: "repulse",
      },
    },
    modes: {
      bubble: {
        distance: 200,
        size: 12,
        duration: 0.3,
      },
      repulse: {
        distance: 200,
      },
    },
  },
  detectRetina: true,
};

const particlesLoaded = async (container: Container): Promise<void> => {
  particlesContainer.value = container;
  console.log("Container ready", container);
};
</script>

<template>
  <vue-particles id="tsparticles" :options="options" @particles-loaded="particlesLoaded" />
</template>
```

---

## API Reference

| Prop      | Type             | Default         | Description                                                                          |
| --------- | ---------------- | --------------- | ------------------------------------------------------------------------------------ |
| `id`      | `string`         | `"tsparticles"` | Canvas element ID                                                                    |
| `options` | `ISourceOptions` | `{}`            | Particle configuration                                                               |
| `url`     | `string`         | —               | URL to load JSON config from                                                         |
| `theme`   | `string`         | —               | Theme name to apply (requires `@tsparticles/plugin-themes`; safe no-op if missing) |

| Event               | Payload     | Description                                   |
| ------------------- | ----------- | --------------------------------------------- |
| `@particles-loaded` | `Container` | Fires when the container is fully initialised |

---

## Troubleshooting

- **Error: `tsparticles is not defined`** — Ensure `tsparticles` (or the presets you need) are loaded inside the `init` callback before the component renders.
- **Canvas not showing** — Verify the parent container has a non-zero height. Add a CSS rule like `#tsparticles { height: 100vh; }`.
- **Performance issues** — Lower `fpsLimit`, reduce `particles.number.value`, or disable `detectRetina` on low-end devices.
- **SSR (Nuxt)** — The `<vue-particles>` component is client-only. Wrap it in `<ClientOnly>` or use the `client:only` directive.
