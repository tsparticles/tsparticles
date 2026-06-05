---
title: Integrazione Vue 3
description: Guida passo-passo per integrare tsParticles in applicazioni Vue 3 usando @tsparticles/vue3.
---

# Integrazione Vue 3

Il pacchetto `@tsparticles/vue3` fornisce un componente e un sistema di plugin Vue 3 nativi per tsParticles. Questa guida copre tutto, dalla configurazione base ai pattern avanzati come il cambio tema dinamico e i preset personalizzati.

---

## Installazione

```bash
npm install @tsparticles/vue3 @tsparticles/engine
```

Installa opzionalmente un preset o il bundle completo:

```bash
# Bundle completo (tutte le funzionalità)
npm install tsparticles

# Preset specifici
npm install @tsparticles/preset-confetti
npm install @tsparticles/preset-fireworks
npm install @tsparticles/preset-snow
npm install @tsparticles/preset-stars

# Configurazioni utility
npm install @tsparticles/configs
```

---

## Utilizzo Base

Registra il plugin nel punto di ingresso della tua app, poi usa il componente `<vue-particles>` ovunque.

### Punto di ingresso app (`main.ts`)

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

## Usare `particlesInit` con il Componente

Se preferisci non usare il plugin globale, passa una callback `init` direttamente:

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

## Eventi

Il componente emette diversi eventi del ciclo di vita:

```vue
<script setup lang="ts">
import type { Container } from "@tsparticles/engine";

const particlesLoaded = async (container: Container): Promise<void> => {
  console.log("Container particelle caricato", container);
};

const particlesInit = async (engine: Engine): Promise<void> => {
  console.log("Motore inizializzato");
  await loadFull(engine);
};
</script>

<template>
  <vue-particles id="tsparticles" :options="options" :init="particlesInit" @particles-loaded="particlesLoaded" />
</template>
```

---

## Effetto Coriandoli

Usa il preset confetti per celebrazioni:

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

Per un'esplosione singola, carica il preset poi chiama `tsParticles.load()` programmaticamente all'interno di un metodo.

---

## Effetto Fuochi d'Artificio

Il preset fireworks crea esplosioni di particelle ad alto impatto:

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

> **Suggerimento:** Il preset fireworks richiede molte risorse. Attivalo su interazione dell'utente (es. click su pulsante) tramite un `v-if` collegato al componente.

---

## Effetto Neve

Simula la neve che cade con il preset snow:

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

## Particelle Interattive

Aggiungi modalità di interattività al passaggio del mouse e al click:

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

Modalità di interazione disponibili: `grab`, `repulse`, `bubble`, `connect`, `push`, `remove`, `trail`, `attract`, `light`.

---

## Cambio Tema

Cambia dinamicamente i temi delle particelle in fase di esecuzione aggiornando l'oggetto opzioni reattivo:

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
    <button @click="toggleTheme">Passa a {{ isDark ? "chiaro" : "scuro" }}</button>
    <vue-particles id="theme-particles" :options="options" />
  </div>
</template>
```

In alternativa, usa l'opzione [themes](https://particles.js.org/docs/interfaces/Options_Interfaces_IOptions.IOptions.html#themes) integrata e la proprietà `theme` sul container per un cambio senza configurazione.

---

## Preset Personalizzato da @tsparticles/configs

Il pacchetto `@tsparticles/configs` esporta oggetti di configurazione predefiniti:

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

Esplora le configurazioni disponibili nel pacchetto `@tsparticles/configs` per layout pronti all'uso.

---

## Approcci all'Inizializzazione del Motore

Ci sono due modi per inizializzare il motore:

### 1. Plugin Globale (consigliato)

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

Il motore è quindi disponibile globalmente e tutte le istanze `<vue-particles>` lo condividono.

### 2. Init a Livello di Componente

Passa una callback `:init` a ciascuna istanza `<vue-particles>`. Utile quando diversi componenti necessitano di set diversi di plugin:

```vue
<template>
  <vue-particles id="a" :options="optionsA" :init="initA" />
  <vue-particles id="b" :options="optionsB" :init="initB" />
</template>
```

### 3. Particles Provider (Composition API)

Usa il provider per accedere al motore programmaticamente:

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

## Esportazioni Nominative + TypeScript

Esempio TypeScript completo con tutti gli elementi insieme:

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
  console.log("Container pronto", container);
};
</script>

<template>
  <vue-particles id="tsparticles" :options="options" :init="particlesInit" @particles-loaded="particlesLoaded" />
</template>
```

---

## Riferimento API

| Prop      | Tipo                                | Default         | Descrizione                          |
| --------- | ----------------------------------- | --------------- | ------------------------------------ |
| `id`      | `string`                            | `"tsparticles"` | ID dell'elemento canvas              |
| `options` | `ISourceOptions`                    | `{}`            | Configurazione particelle            |
| `init`    | `(engine: Engine) => Promise<void>` | —               | Callback di inizializzazione motore  |
| `url`     | `string`                            | —               | URL per caricare configurazione JSON |

| Evento              | Payload     | Descrizione                                                      |
| ------------------- | ----------- | ---------------------------------------------------------------- |
| `@particles-loaded` | `Container` | Viene attivato quando il container è completamente inizializzato |
| `@particles-init`   | `Engine`    | Viene attivato dopo che il motore è inizializzato                |

---

## Risoluzione dei Problemi

- **Errore: `tsparticles is not defined`** — Assicurati che `tsparticles` (o i preset necessari) siano caricati all'interno della callback `init` prima che il componente venga renderizzato.
- **Canvas non visibile** — Verifica che il contenitore padre abbia un'altezza non zero. Aggiungi una regola CSS come `#tsparticles { height: 100vh; }`.
- **Problemi di performance** — Riduci `fpsLimit`, diminuisci `particles.number.value` o disabilita `detectRetina` su dispositivi meno potenti.
- **SSR (Nuxt)** — Il componente `<vue-particles>` è solo client. Avvolgilo in `<ClientOnly>` o usa la direttiva `client:only`.
