---
title: Vue 3-Integration
description: Schritt-für-Schritt-Anleitung zur Integration von tsParticles in Vue 3-Anwendungen mit @tsparticles/vue3.
---

# Vue 3-Integration

Das Paket `@tsparticles/vue3` bietet ein natives Vue 3-Komponenten- und Plugin-System für tsParticles. Diese Anleitung behandelt alles von der grundlegenden Einrichtung bis zu fortgeschrittenen Mustern wie dynamischem Theme-Wechsel und benutzerdefinierten Presets.

---

## Installation

```bash
npm install @tsparticles/vue3 @tsparticles/engine
```

Optional ein Preset oder das vollständige Bundle installieren:

```bash
# Vollständiges Bundle (alle Funktionen)
npm install tsparticles

# Spezifische Presets
npm install @tsparticles/preset-confetti
npm install @tsparticles/preset-fireworks
npm install @tsparticles/preset-snow
npm install @tsparticles/preset-stars

# Dienstprogramm-Konfigurationen
npm install @tsparticles/configs
```

---

## Grundlegende Verwendung

Registrieren Sie das Plugin in Ihrem App-Einstiegspunkt und verwenden Sie dann die `<vue-particles>`-Komponente überall.

### App-Einstieg (`main.ts`)

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

### Komponente (`App.vue`)

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

## Verwendung von `particlesInit` mit der Komponente

Wenn Sie das globale Plugin nicht verwenden möchten, übergeben Sie einen `init`-Callback direkt:

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

## Ereignisse

Die Komponente sendet mehrere Lebenszyklus-Ereignisse:

```vue
<script setup lang="ts">
import type { Container } from "@tsparticles/engine";

const particlesLoaded = async (container: Container): Promise<void> => {
  console.log("Partikel-Container geladen", container);
};

const particlesInit = async (engine: Engine): Promise<void> => {
  console.log("Engine initialisiert");
  await loadFull(engine);
};
</script>

<template>
  <vue-particles id="tsparticles" :options="options" :init="particlesInit" @particles-loaded="particlesLoaded" />
</template>
```

---

## Konfetti-Effekt

Verwenden Sie das Konfetti-Preset für Feierlichkeiten:

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

Für einen einmaligen Ausbruch laden Sie das Preset und rufen dann programmatisch `tsParticles.load()` innerhalb einer Methode auf.

---

## Feuerwerks-Effekt

Das Feuerwerk-Preset erzeugt wirkungsvolle Partikelexplosionen:

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

> **Tipp:** Das Feuerwerk-Preset ist ressourcenintensiv. Lösen Sie es bei Benutzerinteraktion (z. B. Button-Klick) aus, indem Sie ein `v-if` umschalten, das an die Komponente gebunden ist.

---

## Schnee-Effekt

Simulieren Sie fallenden Schnee mit dem Schnee-Preset:

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

## Interaktive Partikel

Fügen Sie Hover- und Klick-Interaktivitätsmodi hinzu:

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

Verfügbare Interaktionsmodi: `grab`, `repulse`, `bubble`, `connect`, `push`, `remove`, `trail`, `attract`, `light`.

---

## Theme-Wechsel

Wechseln Sie dynamisch zwischen Partikel-Themes zur Laufzeit durch Aktualisieren des reaktiven Optionsobjekts:

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
    <button @click="toggleTheme">Wechsel zu {{ isDark ? "Hell" : "Dunkel" }}</button>
    <vue-particles id="theme-particles" :options="options" />
  </div>
</template>
```

Alternativ verwenden Sie die integrierte [themes](https://particles.js.org/docs/interfaces/Options_Interfaces_IOptions.IOptions.html#themes)-Option und die `theme`-Eigenschaft am Container für eine konfigurationsloses Umschalten.

---

## Benutzerdefiniertes Preset von @tsparticles/configs

Das Paket `@tsparticles/configs` exportiert vorgefertigte Konfigurationsobjekte:

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

Durchstöbern Sie die verfügbaren Konfigurationen im `@tsparticles/configs`-Paket für sofort einsatzbereite Layouts.

---

## Ansätze zur Engine-Initialisierung

Es gibt zwei Möglichkeiten, die Engine zu initialisieren:

### 1. Globales Plugin (empfohlen)

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

Die Engine ist dann global verfügbar und alle `<vue-particles>`-Instanzen teilen sie.

### 2. Init auf Komponentenebene

Übergeben Sie einen `:init`-Callback an jede `<vue-particles>`-Instanz. Nützlich, wenn verschiedene Komponenten unterschiedliche Pluginsätze benötigen:

```vue
<template>
  <vue-particles id="a" :options="optionsA" :init="initA" />
  <vue-particles id="b" :options="optionsB" :init="initB" />
</template>
```

### 3. Particles Provider (Composition API)

Verwenden Sie den Provider, um programmatisch auf die Engine zuzugreifen:

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

## Benannte Exporte + TypeScript

Vollständiges TypeScript-Beispiel mit allen Teilen zusammen:

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
  console.log("Container bereit", container);
};
</script>

<template>
  <vue-particles id="tsparticles" :options="options" :init="particlesInit" @particles-loaded="particlesLoaded" />
</template>
```

---

## API-Referenz

| Eigenschaft | Typ                                | Standard          | Beschreibung                        |
| ----------- | ----------------------------------- | ----------------- | ---------------------------------- |
| `id`        | `string`                            | `"tsparticles"`   | Canvas-Element-ID                   |
| `options`   | `ISourceOptions`                    | `{}`              | Partikel-Konfiguration              |
| `init`      | `(engine: Engine) => Promise<void>` | —                 | Engine-Initialisierungs-Callback    |
| `url`       | `string`                            | —                 | URL zum Laden einer JSON-Konfiguration |

| Ereignis             | Payload     | Beschreibung                                    |
| ------------------- | ----------- | ----------------------------------------------- |
| `@particles-loaded` | `Container` | Wird ausgelöst, wenn der Container vollständig initialisiert ist |
| `@particles-init`   | `Engine`    | Wird ausgelöst, nachdem die Engine initialisiert wurde |

---

## Fehlerbehebung

- **Fehler: `tsparticles is not defined`** — Stellen Sie sicher, dass `tsparticles` (oder die benötigten Presets) innerhalb des `init`-Callbacks geladen werden, bevor die Komponente rendert.
- **Canvas wird nicht angezeigt** — Überprüfen Sie, ob der übergeordnete Container eine Höhe ungleich Null hat. Fügen Sie eine CSS-Regel wie `#tsparticles { height: 100vh; }` hinzu.
- **Leistungsprobleme** — Senken Sie `fpsLimit`, reduzieren Sie `particles.number.value` oder deaktivieren Sie `detectRetina` auf Geräten mit geringer Leistung.
- **SSR (Nuxt)** — Die `<vue-particles>`-Komponente ist Client-only. Wickeln Sie sie in `<ClientOnly>` oder verwenden Sie die `client:only`-Direktive.
