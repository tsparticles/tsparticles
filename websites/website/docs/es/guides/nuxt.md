---
title: Integración con Nuxt
description: Guía paso a paso para integrar tsParticles en una aplicación Nuxt 3 / Nuxt 4.
---

# Integración con Nuxt

Esta guía cubre la integración de tsParticles en un proyecto **Nuxt 3** (y Nuxt 4) usando el wrapper oficial `@tsparticles/vue3`. Nuxt se ejecuta tanto del lado del servidor como del cliente, por lo que debes proteger los componentes de partículas contra SSR.

## Instalación

Instala el wrapper de Vue 3 y el paquete del motor de tu elección:

```bash
npm install @tsparticles/vue3 tsparticles
```

Para un paquete más pequeño, instala `@tsparticles/slim` en lugar de `tsparticles`:

```bash
npm install @tsparticles/vue3 @tsparticles/slim
```

## Uso Básico

Nuxt renderiza componentes en el servidor por defecto. Dado que tsParticles necesita la API `canvas` del navegador, debes envolver el componente `<vue-particles>` en una etiqueta `<client-only>`:

```vue
<template>
  <div class="page">
    <client-only>
      <vue-particles id="tsparticles" :options="options" @particles-loaded="particlesLoaded" />
    </client-only>
    <h1>Mi App Nuxt</h1>
  </div>
</template>

<script setup lang="ts">
import type { ISourceOptions, Container } from "@tsparticles/engine";

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
  console.log("Contenedor de partículas listo", container?.id);
};
</script>

<style scoped>
.page {
  position: relative;
}
</style>
```

El envoltorio `<client-only>` asegura que el componente `<vue-particles>` solo se monte en el navegador, evitando discrepancias de hidratación.

## Configuración

Usa el tipo `ISourceOptions` completo para una configuración segura en cuanto a tipos. Puedes definir tus opciones en línea o importarlas desde un archivo de configuración separado:

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

## Efecto Nieve

Crea un efecto de nevada invernal usando el preset de nieve:

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

// Carga el preset antes de que el componente se monte
await loadSnowPreset(tsParticles);

const options = {
  preset: "snow",
  fullScreen: { zIndex: -1 },
  background: {
    color: "#1a1a2e",
  },
};

const onLoad = (container?: Container) => {
  console.log("Efecto de nieve listo", container?.id);
};
</script>
```

Debido a que el preset se carga con `await` de nivel superior en el `<script setup>`, se garantiza que esté listo antes de que el componente se renderice.

## Partículas Interactivas

Habilita interacciones de clic y hover añadiendo modos de interactividad:

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
        mode: "grab", // las partículas se conectan al cursor
      },
      onClick: {
        enable: true,
        mode: "push", // añade partículas al hacer clic
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

Los modos de interacción disponibles incluyen: `grab`, `bubble`, `connect`, `repulse`, `push`, `remove`, `attract` y `slow`.

## Manejo de Eventos

El componente `<vue-particles>` emite varios eventos del ciclo de vida:

```vue
<template>
  <client-only>
    <vue-particles id="event-demo" :options="options" @particles-loaded="onLoaded" />
  </client-only>
</template>

<script setup lang="ts">
import type { Container, Engine } from "@tsparticles/engine";

const options = {
  fullScreen: { zIndex: -1 },
  particles: {
    number: { value: 60 },
    links: { enable: true },
    move: { enable: true },
  },
};

const onLoaded = (container?: Container) => {
  console.log("Contenedor cargado", container?.id);
};
</script>
```

| Evento              | Carga                    | Descripción                                                            |
| ------------------- | ------------------------ | ---------------------------------------------------------------------- |
| `@particles-loaded` | `Container \| undefined` | Se dispara cada vez que el contenedor termina de cargarse o recargarse |

## Ejemplo TypeScript Completo

Un componente tipado completo con importaciones explícitas y conocimiento del ciclo de vida:

```vue
<template>
  <div class="particles-wrapper">
    <client-only>
      <vue-particles id="full-example" :options="options" @particles-loaded="onParticlesLoaded" />
    </client-only>
    <div class="controls">
      <button @click="togglePause">{{ paused ? "Reanudar" : "Pausar" }}</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { loadFull } from "tsparticles";
import type { Container, Engine, ISourceOptions } from "@tsparticles/engine";

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

## Integración en Páginas

Añade un fondo de partículas a una página específica de Nuxt colocando el componente en la plantilla de la página:

```vue
<template>
  <div>
    <client-only>
      <vue-particles id="page-particles" :options="options" />
    </client-only>

    <div class="content">
      <h1>Página Acerca de</h1>
      <p>Este contenido está sobre el canvas de partículas.</p>
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

Si quieres partículas en **todas** las páginas, añade el componente a `layouts/default.vue` en lugar de a páginas individuales.

## Notas sobre Nuxt 4

Nuxt 4 mantiene compatibilidad hacia atrás con los patrones `<client-only>` y `<script setup>` de Nuxt 3. Todos los ejemplos anteriores funcionan sin cambios en Nuxt 4.

Consideraciones clave para Nuxt 4:

- **Nitropack 2**: El motor del servidor está actualizado, pero no afecta a componentes solo de cliente como `<vue-particles>`.
- **Vue 3.5+**: Nuxt 4 incluye una versión más nueva de Vue — `@tsparticles/vue3` es compatible con Vue 3.3+ sin problemas.
- **Comprobaciones SSR más estrictas**: Si ves advertencias de hidratación, asegúrate de que `<vue-particles>` esté siempre dentro de `<client-only>` y nunca se renderice en el servidor.
- **Renderizado híbrido**: Si usas reglas de ruta con `ssr: false` para ciertas páginas, puedes omitir `<client-only>` en esas páginas, pero es más seguro incluirlo siempre.

Si actualizas desde Nuxt 2 con el paquete `@tsparticles/vue` (vue 2), debes migrar a `@tsparticles/vue3` para Nuxt 3 / 4 — las APIs no son compatibles.

## Galería de Presets

Combina el patrón anterior con cualquiera de estos presets oficiales:

| Preset    | Paquete                         | Efecto                             |
| --------- | ------------------------------- | ---------------------------------- |
| Confetti  | `@tsparticles/preset-confetti`  | Explosión de confeti colorido      |
| Fireworks | `@tsparticles/preset-fireworks` | Explosiones de fuegos artificiales |
| Snow      | `@tsparticles/preset-snow`      | Copos de nieve cayendo             |
| Stars     | `@tsparticles/preset-stars`     | Cielo nocturno titilante           |
| Links     | `@tsparticles/preset-links`     | Red de nodos conectados            |
| Bubbles   | `@tsparticles/preset-bubbles`   | Burbujas flotantes                 |

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

The `<Particles>` component reacts to prop changes at runtime:

- **`id`**, **`options`**, or **`url`** change → the existing container is destroyed and particles are reloaded with the new values.
- **`theme`** change → `loadTheme` is called on the existing container. This requires the optional `@tsparticles/plugin-themes` package to be loaded (otherwise it is a safe no-op).

On component unmount, the particles container is automatically destroyed — no orphan animations remain.

## Solución de Problemas

| Síntoma                                   | Causa                                                  | Solución                                                                |
| ----------------------------------------- | ------------------------------------------------------ | ----------------------------------------------------------------------- |
| Pantalla en blanco / error de hidratación | `<vue-particles>` renderizado en el servidor           | Envuélvelo en `<client-only>`                                           |
| El preset no tiene efecto                 | El preset no se cargó antes del montaje del componente | Llama a `loadXPreset()` con await de nivel superior en `<script setup>` |
| El canvas no llena el viewport            | `fullScreen` no está habilitado                        | Añade `fullScreen: { zIndex: -1 }` a las opciones                       |
| Los controles no pausan/reanudan          | La referencia al contenedor no está establecida        | Asigna el contenedor en el manejador `@particles-loaded`                |

## Próximos Pasos

- Explora las [Demostraciones Interactivas](/demos/) para configuraciones Vue listas para usar.
- Lee la [Referencia de Opciones](/options/) para una lista completa de parámetros de partículas.
- Visita la [página de Presets](/demos/presets) para más efectos preconstruidos.
