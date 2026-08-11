---
title: Integrazione Nuxt
description: Guida passo-passo per integrare tsParticles in un'applicazione Nuxt 3 / Nuxt 4.
---

# Integrazione Nuxt

Questa guida copre l'integrazione di tsParticles in un progetto **Nuxt 3** (e Nuxt 4) usando il wrapper ufficiale `@tsparticles/vue3`. Nuxt viene eseguito sia lato server che lato client, quindi devi proteggere i componenti delle particelle dall'SSR.

## Installazione

Installa il wrapper Vue 3 e il bundle del motore che preferisci:

```bash
npm install @tsparticles/vue3 tsparticles
```

Per un bundle più piccolo, installa `@tsparticles/slim` invece di `tsparticles`:

```bash
npm install @tsparticles/vue3 @tsparticles/slim
```

## Utilizzo Base

Nuxt renderizza i componenti lato server per impostazione predefinita. Poiché tsParticles necessita dell'API `canvas` del browser, devi avvolgere il componente `<vue-particles>` in un tag `<client-only>`:

```vue
<template>
  <div class="page">
    <client-only>
      <vue-particles id="tsparticles" :options="options" @particles-loaded="particlesLoaded" />
    </client-only>
    <h1>La Mia App Nuxt</h1>
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
  console.log("Container particelle pronto", container?.id);
};
</script>

<style scoped>
.page {
  position: relative;
}
</style>
```

Il wrapper `<client-only>` garantisce che il componente `<vue-particles>` venga montato solo nel browser, prevenendo mismatch di idratazione.

## Configurazione

Usa il tipo `ISourceOptions` completo per una configurazione type-safe. Puoi definire le tue opzioni inline o importarle da un file di configurazione separato:

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

## Effetto Neve

Crea un effetto nevoso invernale usando il preset snow:

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

// Carica il preset prima che il componente venga montato
await loadSnowPreset(tsParticles);

const options = {
  preset: "snow",
  fullScreen: { zIndex: -1 },
  background: {
    color: "#1a1a2e",
  },
};

const onLoad = (container?: Container) => {
  console.log("Effetto neve pronto", container?.id);
};
</script>
```

Poiché il preset viene caricato con `await` di primo livello in `<script setup>`, è garantito che sia pronto prima che il componente venga renderizzato.

## Particelle Interattive

Abilita interazioni al click e al passaggio del mouse aggiungendo modalità di interattività:

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
        mode: "grab", // le particelle si collegano al cursore
      },
      onClick: {
        enable: true,
        mode: "push", // aggiunge particelle al click
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

Le modalità di interazione disponibili includono: `grab`, `bubble`, `connect`, `repulse`, `push`, `remove`, `attract` e `slow`.

## Gestione Eventi

Il componente `<vue-particles>` emette diversi eventi del ciclo di vita:

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
  console.log("Container caricato", container?.id);
};
</script>
```

| Evento              | Payload                  | Descrizione                                                                 |
| ------------------- | ------------------------ | --------------------------------------------------------------------------- |
| `@particles-loaded` | `Container \| undefined` | Viene attivato ogni volta che il container finisce di caricare o ricaricare |

## Esempio TypeScript Completo

Un componente completo e tipizzato con import espliciti e consapevolezza del ciclo di vita:

```vue
<template>
  <div class="particles-wrapper">
    <client-only>
      <vue-particles id="full-example" :options="options" @particles-loaded="onParticlesLoaded" />
    </client-only>
    <div class="controls">
      <button @click="togglePause">{{ paused ? "Riprendi" : "Pausa" }}</button>
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

## Integrazione nella Pagina

Aggiungi uno sfondo di particelle a una pagina Nuxt specifica posizionando il componente nel template della pagina:

```vue
<template>
  <div>
    <client-only>
      <vue-particles id="page-particles" :options="options" />
    </client-only>

    <div class="content">
      <h1>Pagina Informazioni</h1>
      <p>Questo contenuto si trova sopra il canvas delle particelle.</p>
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

Se vuoi le particelle su **ogni** pagina, aggiungi il componente a `layouts/default.vue` invece che a pagine singole.

## Note su Nuxt 4

Nuxt 4 mantiene la retrocompatibilità con i pattern `<client-only>` e `<script setup>` di Nuxt 3. Tutti gli esempi sopra funzionano senza modifiche in Nuxt 4.

Considerazioni chiave per Nuxt 4:

- **Nitropack 2**: Il motore server è stato aggiornato, ma non influisce sui componenti solo client come `<vue-particles>`.
- **Vue 3.5+**: Nuxt 4 include una versione più recente di Vue — `@tsparticles/vue3` è compatibile con Vue 3.3+ senza problemi.
- **Controlli SSR più rigorosi**: Se vedi avvisi di idratazione, assicurati che `<vue-particles>` sia sempre dentro `<client-only>` e mai renderizzato lato server.
- **Rendering ibrido**: Se usi regole di route con `ssr: false` per certe pagine, puoi omettere `<client-only>` su quelle pagine, ma è più sicuro includerlo sempre.

Se esegui l'upgrade da Nuxt 2 con il pacchetto `@tsparticles/vue` (vue 2), devi migrare a `@tsparticles/vue3` per Nuxt 3 / 4 — le API non sono compatibili.

## Galleria Preset

Combina il pattern sopra con uno qualsiasi di questi preset ufficiali:

| Preset    | Package                         | Effetto                  |
| --------- | ------------------------------- | ------------------------ |
| Confetti  | `@tsparticles/preset-confetti`  | Esplosione di coriandoli |
| Fireworks | `@tsparticles/preset-fireworks` | Esplosioni pirotecniche  |
| Snow      | `@tsparticles/preset-snow`      | Fiocchi di neve cadenti  |
| Stars     | `@tsparticles/preset-stars`     | Cielo notturno stellato  |
| Links     | `@tsparticles/preset-links`     | Rete di nodi connessi    |
| Bubbles   | `@tsparticles/preset-bubbles`   | Bolle fluttuanti         |

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

## Risoluzione dei Problemi

| Sintomo                                     | Causa                                      | Rimedio                                                               |
| ------------------------------------------- | ------------------------------------------ | --------------------------------------------------------------------- |
| Schermata bianca / errore idratazione       | `<vue-particles>` renderizzato lato server | Avvolgi in `<client-only>`                                            |
| Il preset non ha effetto                    | Preset non caricato prima del montaggio    | Chiama `loadXPreset()` con await di primo livello in `<script setup>` |
| Il canvas non riempie il viewport           | `fullScreen` non abilitato                 | Aggiungi `fullScreen: { zIndex: -1 }` alle opzioni                    |
| I controlli non mettono in pausa/riprendono | Riferimento container non impostato        | Assegna il container nel gestore `@particles-loaded`                  |

## Prossimi Passi

- Esplora le [Demo Interattive](/demos/) per configurazioni Vue già pronte.
- Leggi il [Riferimento Opzioni](/options/) per un elenco completo dei parametri per le particelle.
- Visita la [pagina Presets](/demos/presets) per altri effetti predefiniti.
