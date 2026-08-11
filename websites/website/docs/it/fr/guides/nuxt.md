---
title: Intégration Nuxt
description: Guide étape par étape pour intégrer tsParticles dans une application Nuxt 3 / Nuxt 4.
---

# Intégration Nuxt

Ce guide couvre l'intégration de tsParticles dans un projet **Nuxt 3** (et Nuxt 4) en utilisant l'encapsuleur officiel `@tsparticles/vue3`. Nuxt s'exécute à la fois côté serveur et côté client, vous devez donc protéger les composants de particules contre le SSR.

## Installation

Installez l'encapsuleur Vue 3 et le bundle moteur de votre choix :

```bash
npm install @tsparticles/vue3 tsparticles
```

Pour un bundle plus petit, installez `@tsparticles/slim` au lieu de `tsparticles` :

```bash
npm install @tsparticles/vue3 @tsparticles/slim
```

## Utilisation de base

Nuxt rend les composants sur le serveur par défaut. Comme tsParticles nécessite l'API `canvas` du navigateur, vous devez encapsuler le composant `<vue-particles>` dans une balise `<client-only>` :

```vue
<template>
  <div class="page">
    <client-only>
      <vue-particles id="tsparticles" :options="options" @particles-loaded="particlesLoaded" />
    </client-only>
    <h1>Mon application Nuxt</h1>
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
  console.log("Conteneur de particules prêt", container?.id);
};
</script>

<style scoped>
.page {
  position: relative;
}
</style>
```

L'encapsuleur `<client-only>` garantit que le composant `<vue-particles>` n'est monté que dans le navigateur, évitant les erreurs d'hydratation.

## Configuration

Utilisez le type `ISourceOptions` complet pour une configuration typée. Vous pouvez définir vos options en ligne ou les importer depuis un fichier de configuration séparé :

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

## Effet Neige

Créez un effet de chute de neige hivernale en utilisant le préréglage neige :

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

// Charger le préréglage avant le montage du composant
await loadSnowPreset(tsParticles);

const options = {
  preset: "snow",
  fullScreen: { zIndex: -1 },
  background: {
    color: "#1a1a2e",
  },
};

const onLoad = (container?: Container) => {
  console.log("Effet neige prêt", container?.id);
};
</script>
```

Comme le préréglage est chargé avec `await` au niveau supérieur dans le `<script setup>`, il est garanti d'être prêt avant le rendu du composant.

## Particules interactives

Activez les interactions au clic et au survol en ajoutant des modes d'interactivité :

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
        mode: "grab", // les particules se connectent au curseur
      },
      onClick: {
        enable: true,
        mode: "push", // ajoute des particules au clic
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

Les modes d'interaction disponibles incluent : `grab`, `bubble`, `connect`, `repulse`, `push`, `remove`, `attract` et `slow`.

## Gestion des événements

Le composant `<vue-particles>` émet plusieurs événements du cycle de vie :

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
  console.log("Conteneur chargé", container?.id);
};
</script>
```

| Événement           | Payload                  | Description                                                             |
| ------------------- | ------------------------ | ----------------------------------------------------------------------- |
| `@particles-loaded` | `Container \| undefined` | Se déclenche chaque fois que le conteneur finit de charger ou recharger |

## Exemple TypeScript complet

Un composant typé complet avec des importations explicites et la gestion du cycle de vie :

```vue
<template>
  <div class="particles-wrapper">
    <client-only>
      <vue-particles id="full-example" :options="options" @particles-loaded="onParticlesLoaded" />
    </client-only>
    <div class="controls">
      <button @click="togglePause">{{ paused ? "Reprendre" : "Pause" }}</button>
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

## Intégration dans une page

Ajoutez un arrière-plan de particules à une page Nuxt spécifique en plaçant le composant dans le template de la page :

```vue
<template>
  <div>
    <client-only>
      <vue-particles id="page-particles" :options="options" />
    </client-only>

    <div class="content">
      <h1>Page À propos</h1>
      <p>Ce contenu se trouve au-dessus du canvas de particules.</p>
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

Si vous voulez des particules sur **chaque** page, ajoutez le composant dans `layouts/default.vue` au lieu de pages individuelles.

## Notes sur Nuxt 4

Nuxt 4 maintient la rétrocompatibilité avec les modèles `<client-only>` et `<script setup>` de Nuxt 3. Tous les exemples ci-dessus fonctionnent sans modification dans Nuxt 4.

Considérations clés pour Nuxt 4 :

- **Nitropack 2** : Le moteur serveur est mis à niveau, mais cela n'affecte pas les composants client-only comme `<vue-particles>`.
- **Vue 3.5+** : Nuxt 4 est livré avec une version plus récente de Vue — `@tsparticles/vue3` est compatible avec Vue 3.3+ sans problème.
- **Vérifications SSR plus strictes** : Si vous voyez des avertissements d'hydratation, assurez-vous que `<vue-particles>` est toujours à l'intérieur de `<client-only>` et jamais rendu sur le serveur.
- **Rendu hybride** : Si vous utilisez des règles de route avec `ssr: false` pour certaines pages, vous pouvez omettre `<client-only>` sur ces pages, mais il est plus sûr de toujours l'inclure.

Si vous effectuez une mise à niveau depuis Nuxt 2 avec le package `@tsparticles/vue` (vue 2), vous devez migrer vers `@tsparticles/vue3` pour Nuxt 3 / 4 — les API ne sont pas compatibles.

## Galerie de préréglages

Combinez le modèle ci-dessus avec l'un de ces préréglages officiels :

| Préréglage      | Package                         | Effet                          |
| --------------- | ------------------------------- | ------------------------------ |
| Confetti        | `@tsparticles/preset-confetti`  | Explosion de confettis colorés |
| Feux d'artifice | `@tsparticles/preset-fireworks` | Explosions de feux d'artifice  |
| Neige           | `@tsparticles/preset-snow`      | Chute de flocons de neige      |
| Étoiles         | `@tsparticles/preset-stars`     | Ciel étoilé scintillant        |
| Liens           | `@tsparticles/preset-links`     | Réseau de nœuds connectés      |
| Bulles          | `@tsparticles/preset-bubbles`   | Bulles flottantes              |

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

## Dépannage

| Symptôme                                | Cause                                  | Solution                                                                     |
| --------------------------------------- | -------------------------------------- | ---------------------------------------------------------------------------- |
| Écran blanc / erreur d'hydratation      | `<vue-particles>` rendu sur le serveur | Encapsulez dans `<client-only>`                                              |
| Le préréglage n'a aucun effet           | Préréglage non chargé avant le montage | Appelez `loadXPreset()` avec await au niveau supérieur dans `<script setup>` |
| Le canvas ne remplit pas la fenêtre     | `fullScreen` pas activé                | Ajoutez `fullScreen: { zIndex: -1 }` aux options                             |
| Les contrôles ne font pas pause/reprise | Référence du conteneur non définie     | Assignez le conteneur dans le gestionnaire `@particles-loaded`               |

## Prochaines étapes

- Explorez les [Démos interactives](/demos/) pour des configurations Vue prêtes à l'emploi.
- Lisez la [Référence des options](/options/) pour une liste complète des paramètres de particules.
- Visitez la [page des Préréglages](/demos/presets) pour plus d'effets préconstruits.
