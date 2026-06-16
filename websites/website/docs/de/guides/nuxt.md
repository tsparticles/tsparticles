---
title: Nuxt-Integration
description: Schritt-für-Schritt-Anleitung zur Integration von tsParticles in eine Nuxt 3 / Nuxt 4 Anwendung.
---

# Nuxt-Integration

Diese Anleitung behandelt die Integration von tsParticles in ein **Nuxt 3** (und Nuxt 4) Projekt mit dem offiziellen `@tsparticles/vue3`-Wrapper. Nuxt läuft sowohl server- als auch clientseitig, daher müssen Sie Partikel-Komponenten gegen SSR absichern.

## Installation

Installieren Sie den Vue 3 Wrapper und das Engine-Bundle Ihrer Wahl:

```bash
npm install @tsparticles/vue3 tsparticles
```

Für ein kleineres Bundle installieren Sie `@tsparticles/slim` anstelle von `tsparticles`:

```bash
npm install @tsparticles/vue3 @tsparticles/slim
```

## Grundlegende Verwendung

Nuxt rendert Komponenten standardmäßig auf dem Server. Da tsParticles die Browser-`canvas`-API benötigt, müssen Sie die `<vue-particles>`-Komponente in einen `<client-only>`-Tag einwickeln:

```vue
<template>
  <div class="page">
    <client-only>
      <vue-particles id="tsparticles" :options="options" @particles-loaded="particlesLoaded" />
    </client-only>
    <h1>Meine Nuxt-App</h1>
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
  console.log("Partikel-Container bereit", container?.id);
};
</script>

<style scoped>
.page {
  position: relative;
}
</style>
```

Der `<client-only>`-Wrapper stellt sicher, dass die `<vue-particles>`-Komponente nur im Browser montiert wird, was Hydrierungskonflikte verhindert.

## Konfiguration

Verwenden Sie den vollständigen `ISourceOptions`-Typ für eine typsichere Konfiguration. Sie können Ihre Optionen inline definieren oder aus einer separaten Konfigurationsdatei importieren:

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

## Schnee-Effekt

Erstellen Sie einen winterlichen Schneefall-Effekt mit dem Schnee-Preset:

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

// Das Preset laden, bevor die Komponente montiert wird
await loadSnowPreset(tsParticles);

const options = {
  preset: "snow",
  fullScreen: { zIndex: -1 },
  background: {
    color: "#1a1a2e",
  },
};

const onLoad = (container?: Container) => {
  console.log("Schnee-Effekt bereit", container?.id);
};
</script>
```

Da das Preset mit einem `await` auf oberster Ebene im `<script setup>` geladen wird, ist es garantiert bereit, bevor die Komponente gerendert wird.

## Interaktive Partikel

Aktivieren Sie Klick- und Hover-Interaktionen durch Hinzufügen von Interaktivitätsmodi:

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
        mode: "grab", // Partikel verbinden sich mit dem Cursor
      },
      onClick: {
        enable: true,
        mode: "push", // Partikel bei Klick hinzufügen
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

Verfügbare Interaktionsmodi sind: `grab`, `bubble`, `connect`, `repulse`, `push`, `remove`, `attract` und `slow`.

## Ereignisbehandlung

Die `<vue-particles>`-Komponente sendet mehrere Lebenszyklus-Ereignisse:

```vue
<template>
  <client-only>
    <vue-particles
      id="event-demo"
      :options="options"
      @particles-loaded="onLoaded"
    />
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
  console.log("Container geladen", container?.id);
};

</script>
```

| Ereignis             | Payload     | Beschreibung                                                                    |
| -------------------- | ----------- | ------------------------------------------------------------------------------- |
| `@particles-loaded`  | `Container \| undefined` | Wird jedes Mal ausgelöst, wenn der Container das Laden oder Neuladen abschließt |

## Vollständiges TypeScript-Beispiel

Eine vollständige, typisierte Komponente mit expliziten Importen und Lebenszyklus-Bewusstsein:

```vue
<template>
  <div class="particles-wrapper">
    <client-only>
      <vue-particles
        id="full-example"
        :options="options"
        @particles-loaded="onParticlesLoaded"
      />
    </client-only>
    <div class="controls">
      <button @click="togglePause">{{ paused ? "Fortsetzen" : "Pause" }}</button>
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

## Seitenintegration

Fügen Sie einen Partikel-Hintergrund zu einer bestimmten Nuxt-Seite hinzu, indem Sie die Komponente im Seiten-Template platzieren:

```vue
<template>
  <div>
    <client-only>
      <vue-particles id="page-particles" :options="options" />
    </client-only>

    <div class="content">
      <h1>Über uns</h1>
      <p>Dieser Inhalt befindet sich über der Partikel-Canvas.</p>
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

Wenn Sie Partikel auf **jeder** Seite wünschen, fügen Sie die Komponente zu `layouts/default.vue` anstelle einzelner Seiten hinzu.

## Nuxt 4 Hinweise

Nuxt 4 behält die Abwärtskompatibilität mit Nuxt 3s `<client-only>`- und `<script setup>`-Mustern bei. Alle obigen Beispiele funktionieren ohne Änderungen in Nuxt 4.

Wichtige Überlegungen für Nuxt 4:

- **Nitropack 2**: Die Server-Engine wurde aktualisiert, beeinträchtigt aber keine Client-only-Komponenten wie `<vue-particles>`.
- **Vue 3.5+**: Nuxt 4 wird mit einer neueren Vue-Version ausgeliefert — `@tsparticles/vue3` ist kompatibel mit Vue 3.3+ ohne Probleme.
- **Strengere SSR-Prüfungen**: Wenn Sie Hydrierungswarnungen sehen, stellen Sie sicher, dass `<vue-particles>` immer innerhalb von `<client-only>` liegt und niemals auf dem Server gerendert wird.
- **Hybrid-Rendering**: Wenn Sie Routenregeln mit `ssr: false` für bestimmte Seiten verwenden, können Sie `<client-only>` auf diesen Seiten weglassen, aber es ist sicherer, es immer einzufügen.

Wenn Sie von Nuxt 2 mit dem `@tsparticles/vue`-Paket (Vue 2) aktualisieren, müssen Sie zu `@tsparticles/vue3` für Nuxt 3/4 migrieren — die APIs sind nicht kompatibel.

## Preset-Galerie

Kombinieren Sie das obige Muster mit einem dieser offiziellen Presets:

| Preset    | Paket                           | Effekt                     |
| --------- | ------------------------------- | -------------------------- |
| Confetti  | `@tsparticles/preset-confetti`  | Bunter Konfetti-Ausbruch   |
| Fireworks | `@tsparticles/preset-fireworks` | Feuerwerksexplosionen      |
| Snow      | `@tsparticles/preset-snow`      | Fallende Schneeflocken     |
| Stars     | `@tsparticles/preset-stars`     | Funkelnder Nachthimmel     |
| Links     | `@tsparticles/preset-links`     | Verbundenes Knotennetzwerk |
| Bubbles   | `@tsparticles/preset-bubbles`   | Schwimmende Blasen         |

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

## Fehlerbehebung

| Symptom                                    | Ursache                                    | Lösung                                                                |
| ------------------------------------------ | ------------------------------------------ | --------------------------------------------------------------------- |
| Leerer Bildschirm / Hydrierungsfehler      | `<vue-particles>` auf dem Server gerendert | In `<client-only>` einwickeln                                         |
| Preset hat keine Wirkung                   | Preset vor Komponenten-Mount nicht geladen | Rufen Sie `loadXPreset()` mit top-level await im `<script setup>` auf |
| Canvas füllt Viewport nicht aus            | `fullScreen` nicht aktiviert               | Fügen Sie `fullScreen: { zIndex: -1 }` zu den Optionen hinzu          |
| Steuerelemente pausieren/setzen nicht fort | Container-Ref nicht gesetzt                | Weisen Sie den Container im `@particles-loaded`-Handler zu            |

## Nächste Schritte

- Erkunden Sie die [Interaktiven Demos](/demos/) für fertige Vue-Konfigurationen.
- Lesen Sie die [Optionen-Referenz](/options/) für eine vollständige Liste der Partikel-Parameter.
- Besuchen Sie die [Presets-Seite](/demos/presets) für weitere vorgefertigte Effekte.
