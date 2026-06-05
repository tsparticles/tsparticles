---
title: Integración con Vue 3
description: Guía paso a paso para integrar tsParticles en aplicaciones Vue 3 usando @tsparticles/vue3.
---

# Integración con Vue 3

El paquete `@tsparticles/vue3` proporciona un componente nativo de Vue 3 y un sistema de plugins para tsParticles. Esta guía cubre todo, desde la configuración básica hasta patrones avanzados como el cambio dinámico de temas y presets personalizados.

---

## Instalación

```bash
npm install @tsparticles/vue3 @tsparticles/engine
```

Opcionalmente instala un preset o el paquete completo:

```bash
# Paquete completo (todas las funcionalidades)
npm install tsparticles

# Presets específicos
npm install @tsparticles/preset-confetti
npm install @tsparticles/preset-fireworks
npm install @tsparticles/preset-snow
npm install @tsparticles/preset-stars

# Configuraciones de utilidad
npm install @tsparticles/configs
```

---

## Uso Básico

Registra el plugin en el punto de entrada de tu aplicación, luego usa el componente `<vue-particles>` en cualquier parte.

### Entrada de la App (`main.ts`)

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

### Componente (`App.vue`)

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

## Usando `particlesInit` con el Componente

Si prefieres no usar el plugin global, pasa un callback `init` directamente:

```vue
<script setup lang="ts">
import type { Engine } from "@tsparticles/engine";
import { loadFull } from "tsparticles";

const particlesInit = async (engine: Engine): Promise<void> => {
  await loadFull(engine);
};
</script>

<template>
  <vue-particles id="tsparticles" :options="options" :init="particlesInit" />
</template>
```

---

## Eventos

El componente emite varios eventos del ciclo de vida:

```vue
<script setup lang="ts">
import type { Container } from "@tsparticles/engine";

const particlesLoaded = async (container: Container): Promise<void> => {
  console.log("Contenedor de partículas cargado", container);
};

const particlesInit = async (engine: Engine): Promise<void> => {
  console.log("Motor inicializado");
  await loadFull(engine);
};
</script>

<template>
  <vue-particles id="tsparticles" :options="options" :init="particlesInit" @particles-loaded="particlesLoaded" />
</template>
```

---

## Efecto Confeti

Usa el preset de confeti para celebraciones:

```bash
npm install @tsparticles/preset-confetti
```

```vue
<script setup lang="ts">
import type { Engine, ISourceOptions } from "@tsparticles/engine";
import { loadConfettiPreset } from "@tsparticles/preset-confetti";

const particlesInit = async (engine: Engine): Promise<void> => {
  await loadConfettiPreset(engine);
};

const options: ISourceOptions = {
  preset: "confetti",
  background: {
    color: "transparent",
  },
};
</script>

<template>
  <vue-particles id="confetti" :options="options" :init="particlesInit" />
</template>
```

Para una explosión única, carga el preset y luego llama a `tsParticles.load()` programáticamente dentro de un método.

---

## Efecto Fuegos Artificiales

El preset de fuegos artificiales crea explosiones de partículas de alto impacto:

```bash
npm install @tsparticles/preset-fireworks
```

```vue
<script setup lang="ts">
import type { Engine, ISourceOptions } from "@tsparticles/engine";
import { loadFireworksPreset } from "@tsparticles/preset-fireworks";

const particlesInit = async (engine: Engine): Promise<void> => {
  await loadFireworksPreset(engine);
};

const options: ISourceOptions = {
  preset: "fireworks",
  background: {
    color: "#000000",
  },
};
</script>

<template>
  <vue-particles id="fireworks" :options="options" :init="particlesInit" />
</template>
```

> **Consejo:** El preset de fuegos artificiales consume muchos recursos. Actívalo en una interacción del usuario (ej., clic de botón) alternando un `v-if` vinculado al componente.

---

## Efecto Nieve

Simula nieve cayendo con el preset de nieve:

```bash
npm install @tsparticles/preset-snow
```

```vue
<script setup lang="ts">
import type { Engine, ISourceOptions } from "@tsparticles/engine";
import { loadSnowPreset } from "@tsparticles/preset-snow";

const particlesInit = async (engine: Engine): Promise<void> => {
  await loadSnowPreset(engine);
};

const options: ISourceOptions = {
  preset: "snow",
  background: {
    color: "#1a1a2e",
  },
};
</script>

<template>
  <vue-particles id="snow" :options="options" :init="particlesInit" />
</template>
```

---

## Partículas Interactivas

Añade modos de interactividad de hover y clic:

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

Modos de interacción disponibles: `grab`, `repulse`, `bubble`, `connect`, `push`, `remove`, `trail`, `attract`, `light`.

---

## Cambio de Tema

Intercambia dinámicamente los temas de partículas en tiempo de ejecución actualizando el objeto de opciones reactivo:

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
    <button @click="toggleTheme">Cambiar a {{ isDark ? "claro" : "oscuro" }}</button>
    <vue-particles id="theme-particles" :options="options" />
  </div>
</template>
```

Alternativamente, usa la opción incorporada [themes](https://particles.js.org/docs/interfaces/Options_Interfaces_IOptions.IOptions.html#themes) y la propiedad `theme` en el contenedor para un cambio sin configuración.

---

## Preset Personalizado desde @tsparticles/configs

El paquete `@tsparticles/configs` exporta objetos de configuración predefinidos:

```bash
npm install @tsparticles/configs
```

```vue
<script setup lang="ts">
import type { Engine, ISourceOptions } from "@tsparticles/engine";
import { loadLinksPreset } from "@tsparticles/preset-links";
import particlesConfig from "@tsparticles/configs/particles.json";

const particlesInit = async (engine: Engine): Promise<void> => {
  await loadLinksPreset(engine);
};

const options: ISourceOptions = {
  ...particlesConfig,
  background: {
    color: "#1e1e2e",
  },
};
</script>

<template>
  <vue-particles id="config-particles" :options="options" :init="particlesInit" />
</template>
```

Explora las configuraciones disponibles en el paquete `@tsparticles/configs` para diseños listos para usar.

---

## Enfoques de Inicialización del Motor

Hay dos formas de inicializar el motor:

### 1. Plugin Global (recomendado)

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

El motor está entonces disponible globalmente y todas las instancias de `<vue-particles>` lo comparten.

### 2. Init a Nivel de Componente

Pasa un callback `:init` a cada instancia de `<vue-particles>`. Útil cuando diferentes componentes necesitan diferentes conjuntos de plugins:

```vue
<template>
  <vue-particles id="a" :options="optionsA" :init="initA" />
  <vue-particles id="b" :options="optionsB" :init="initB" />
</template>
```

### 3. Particles Provider (Composition API)

Usa el provider para acceder al motor programáticamente:

```vue
<script setup lang="ts">
import { useParticles } from "@tsparticles/vue3";
import { loadFull } from "tsparticles";

const { init } = useParticles();

await init(async (engine: Engine) => {
  await loadFull(engine);
});
</script>
```

---

## Exportaciones Nombradas + TypeScript

Ejemplo TypeScript completo con todas las piezas juntas:

```vue
<script setup lang="ts">
import { ref } from "vue";
import type { Container, Engine, ISourceOptions } from "@tsparticles/engine";
import { loadFull } from "tsparticles";

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

const particlesInit = async (engine: Engine): Promise<void> => {
  await loadFull(engine);
};

const particlesLoaded = async (container: Container): Promise<void> => {
  particlesContainer.value = container;
  console.log("Contenedor listo", container);
};
</script>

<template>
  <vue-particles id="tsparticles" :options="options" :init="particlesInit" @particles-loaded="particlesLoaded" />
</template>
```

---

## Referencia de API

| Prop      | Tipo                                | Por Defecto         | Descripción                    |
| --------- | ----------------------------------- | --------------- | ------------------------------ |
| `id`      | `string`                            | `"tsparticles"` | ID del elemento canvas              |
| `options` | `ISourceOptions`                    | `{}`            | Configuración de partículas         |
| `init`    | `(engine: Engine) => Promise<void>` | —               | Callback de inicialización del motor |
| `url`     | `string`                            | —               | URL para cargar configuración JSON   |

| Evento               | Carga     | Descripción                                   |
| ------------------- | ----------- | --------------------------------------------- |
| `@particles-loaded` | `Container` | Se dispara cuando el contenedor está completamente inicializado |
| `@particles-init`   | `Engine`    | Se dispara después de que el motor se inicializa         |

---

## Solución de Problemas

- **Error: `tsparticles is not defined`** — Asegúrate de que `tsparticles` (o los presets que necesites) se carguen dentro del callback `init` antes de que el componente se renderice.
- **Canvas no visible** — Verifica que el contenedor padre tenga una altura no nula. Añade una regla CSS como `#tsparticles { height: 100vh; }`.
- **Problemas de rendimiento** — Reduce `fpsLimit`, disminuye `particles.number.value`, o desactiva `detectRetina` en dispositivos de gama baja.
- **SSR (Nuxt)** — El componente `<vue-particles>` es solo de cliente. Envuélvelo en `<ClientOnly>` o usa la directiva `client:only`.
