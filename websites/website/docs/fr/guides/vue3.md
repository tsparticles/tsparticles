---
title: Intégration Vue 3
description: Guide étape par étape pour intégrer tsParticles dans des applications Vue 3 en utilisant @tsparticles/vue3.
---

# Intégration Vue 3

Le package `@tsparticles/vue3` fournit un composant et un système de plugin Vue 3 natifs pour tsParticles. Ce guide couvre tout, de la configuration de base aux modèles avancés comme le changement de thème dynamique et les préréglages personnalisés.

---

## Installation

```bash
npm install @tsparticles/vue3 @tsparticles/engine
```

Installez optionnellement un préréglage ou le bundle complet :

```bash
# Bundle complet (toutes les fonctionnalités)
npm install tsparticles

# Préréglages spécifiques
npm install @tsparticles/preset-confetti
npm install @tsparticles/preset-fireworks
npm install @tsparticles/preset-snow
npm install @tsparticles/preset-stars

# Configurations utilitaires
npm install @tsparticles/configs
```

---

## Utilisation de base

Enregistrez le plugin dans le point d'entrée de votre application, puis utilisez le composant `<vue-particles>` n'importe où.

### Entrée de l'application (`main.ts`)

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

### Composant (`App.vue`)

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

## Événements

Le composant émet plusieurs événements du cycle de vie :

```vue
<script setup lang="ts">
import type { Container } from "@tsparticles/engine";

const particlesLoaded = async (container: Container): Promise<void> => {
  console.log("Conteneur de particules chargé", container);
};
</script>

<template>
  <vue-particles id="tsparticles" :options="options" @particles-loaded="particlesLoaded" />
</template>
```

---

## Effet Confetti

Utilisez le préréglage confetti pour les célébrations :

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

> **Note :** Enregistrez le `loadConfettiPreset` dans le point d'entrée de votre application via le callback `init` du
plugin (voir [Utilisation de base](#utilisation-de-base)).
```

Pour une explosion unique, chargez le préréglage puis appelez `tsParticles.load()` par programmation dans une méthode.

---

## Effet Feux d'artifice

Le préréglage feux d'artifice crée des explosions de particules à fort impact :

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

> **Note :** Enregistrez le `loadFireworksPreset` dans le point d'entrée de votre application via le callback `init` du
plugin (voir [Utilisation de base](#utilisation-de-base)).
```

> **Conseil :** Le préréglage feux d'artifice est intensif en ressources. Déclenchez-le sur une interaction utilisateur (ex. clic sur un bouton) en basculant un `v-if` lié au composant.

---

## Effet Neige

Simulez la chute de neige avec le préréglage neige :

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

> **Note :** Enregistrez le `loadSnowPreset` dans le point d'entrée de votre application via le callback `init` du
plugin (voir [Utilisation de base](#utilisation-de-base)).
```

---

## Particules interactives

Ajoutez des modes d'interactivité au survol et au clic :

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

Modes d'interaction disponibles : `grab`, `repulse`, `bubble`, `connect`, `push`, `remove`, `trail`, `attract`, `light`.

---

## Changement de thème

Échangez dynamiquement les thèmes de particules à l'exécution en mettant à jour l'objet d'options réactif :

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
    <button @click="toggleTheme">Passer en {{ isDark ? "clair" : "sombre" }}</button>
    <vue-particles id="theme-particles" :options="options" />
  </div>
</template>
```

Le composant `<vue-particles>` supporte également une prop `theme` pour une commutation sans configuration. Lorsque la prop `theme` change, le composant applique le nouveau thème sans détruire et recréer le conteneur :

```vue
<template>
  <vue-particles id="tsparticles" :options="options" :theme="currentTheme" />
</template>
```

> **Note :** La prop `theme` nécessite le paquet optionnel `@tsparticles/plugin-themes`. Sans lui, la prop `theme` est un no-op sans danger — aucune erreur n'est générée, mais le changement de thème est ignoré.

---

## Préréglage personnalisé depuis @tsparticles/configs

Le package `@tsparticles/configs` exporte des objets de configuration prêts à l'emploi :

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

> **Note :** Enregistrez le `loadLinksPreset` dans le point d'entrée de votre application via le callback `init` du
plugin (voir [Utilisation de base](#utilisation-de-base)).
```

Parcourez les configurations disponibles dans le package `@tsparticles/configs` pour des mises en page prêtes à l'emploi.

---

## Approches d'initialisation du moteur

Il existe deux façons d'initialiser le moteur :

### 1. Plugin global (recommandé)

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

Le moteur est alors disponible globalement et toutes les instances `<vue-particles>` le partagent.

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

## Exportations nommées + TypeScript

Exemple TypeScript complet avec tous les éléments ensemble :

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
  console.log("Conteneur prêt", container);
};
</script>

<template>
  <vue-particles id="tsparticles" :options="options" @particles-loaded="particlesLoaded" />
</template>
```

---

## Référence API

| Prop      | Type             | Default         | Description                                                                               |
| --------- | ---------------- | --------------- | ----------------------------------------------------------------------------------------- |
| `id`      | `string`         | `"tsparticles"` | ID de l'élément canvas                                                                    |
| `options` | `ISourceOptions` | `{}`            | Configuration des particules                                                              |
| `url`     | `string`         | —               | URL pour charger une config JSON                                                          |
| `theme`   | `string`         | —               | Nom du thème à appliquer (nécessite `@tsparticles/plugin-themes` ; sans danger si absent) |

| Événement           | Payload     | Description                                    |
| ------------------- | ----------- | ---------------------------------------------- |
| `@particles-loaded` | `Container` | Se déclenche quand le conteneur est initialisé |

---

## Dépannage

- **Erreur : `tsparticles n'est pas défini`** — Assurez-vous que `tsparticles` (ou les préréglages dont vous avez besoin) sont chargés dans le callback `init` avant le rendu du composant.
- **Canvas non affiché** — Vérifiez que le conteneur parent a une hauteur non nulle. Ajoutez une règle CSS comme `#tsparticles { height: 100vh; }`.
- **Problèmes de performances** — Abaissez `fpsLimit`, réduisez `particles.number.value`, ou désactivez `detectRetina` sur les appareils bas de gamme.
- **SSR (Nuxt)** — Le composant `<vue-particles>` est client-only. Encapsulez-le dans `<ClientOnly>` ou utilisez la directive `client:only`.
