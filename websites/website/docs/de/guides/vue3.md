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
---

## Ereignisse

Die Komponente sendet mehrere Lebenszyklus-Ereignisse:

```vue
<script setup lang="ts">
import type { Container } from "@tsparticles/engine";

const particlesLoaded = async (container: Container): Promise<void> => {
  console.log("Partikel-Container geladen", container);
};
</script>

<template>
  <vue-particles id="tsparticles" :options="options" @particles-loaded="particlesLoaded" />
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

> **Hinweis:** Registrieren Sie `loadConfettiPreset` im Einstiegspunkt Ihrer App über den `init`-Callback des Plugins (siehe [Grundlegende Verwendung](#grundlegende-verwendung)).
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

> **Hinweis:** Registrieren Sie `loadFireworksPreset` im Einstiegspunkt Ihrer App über den `init`-Callback des Plugins (siehe [Grundlegende Verwendung](#grundlegende-verwendung)).
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

> **Hinweis:** Registrieren Sie `loadSnowPreset` im Einstiegspunkt Ihrer App über den `init`-Callback des Plugins (siehe [Grundlegende Verwendung](#grundlegende-verwendung)).
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

Die `<vue-particles>`-Komponente unterstützt auch eine `theme`-Prop für konfigurationsloses Umschalten. Wenn sich die `theme`-Prop ändert, wendet die Komponente das neue Theme an, ohne den Container zu zerstören und neu zu erstellen:

```vue
<template>
  <vue-particles id="tsparticles" :options="options" :theme="currentTheme" />
</template>
```

> **Hinweis:** Die `theme`-Prop erfordert das optionale Paket `@tsparticles/plugin-themes`. Ohne dieses ist die `theme`-Prop ein sicherer No-op — es wird kein Fehler ausgelöst, aber die Theme-Änderung wird ignoriert.

---

## Benutzerdefiniertes Preset von @tsparticles/configs

Das Paket `@tsparticles/configs` exportiert vorgefertigte Konfigurationsobjekte:

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

> **Hinweis:** Registrieren Sie `loadLinksPreset` im Einstiegspunkt Ihrer App über den `init`-Callback des Plugins (siehe [Grundlegende Verwendung](#grundlegende-verwendung)).
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

## Benannte Exporte + TypeScript

Vollständiges TypeScript-Beispiel mit allen Teilen zusammen:

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
  console.log("Container bereit", container);
};
</script>

<template>
  <vue-particles id="tsparticles" :options="options" @particles-loaded="particlesLoaded" />
</template>
```

---

## API-Referenz

| Prop      | Type             | Default         | Description                                                                          |
| --------- | ---------------- | --------------- | ------------------------------------------------------------------------------------ |
| `id`      | `string`         | `"tsparticles"` | Canvas-Element-ID                      |
| `options` | `ISourceOptions` | `{}`            | Partikel-Konfiguration                 |
| `url`     | `string`         | —               | URL zum Laden einer JSON-Konfiguration |
| `theme`   | `string`         | —               | Name des anzuwendenden Themes (erfordert `@tsparticles/plugin-themes`; sicherer No-op, falls nicht vorhanden) |

| Ereignis            | Payload     | Beschreibung                                                     |
| ------------------- | ----------- | ---------------------------------------------------------------- |
| `@particles-loaded` | `Container` | Wird ausgelöst, wenn der Container vollständig initialisiert ist |

---

## Fehlerbehebung

- **Fehler: `tsparticles is not defined`** — Stellen Sie sicher, dass `tsparticles` (oder die benötigten Presets) innerhalb des `init`-Callbacks geladen werden, bevor die Komponente rendert.
- **Canvas wird nicht angezeigt** — Überprüfen Sie, ob der übergeordnete Container eine Höhe ungleich Null hat. Fügen Sie eine CSS-Regel wie `#tsparticles { height: 100vh; }` hinzu.
- **Leistungsprobleme** — Senken Sie `fpsLimit`, reduzieren Sie `particles.number.value` oder deaktivieren Sie `detectRetina` auf Geräten mit geringer Leistung.
- **SSR (Nuxt)** — Die `<vue-particles>`-Komponente ist Client-only. Wickeln Sie sie in `<ClientOnly>` oder verwenden Sie die `client:only`-Direktive.
