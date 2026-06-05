# Intégration Astro

Utilisez tsParticles dans votre site Astro avec le package d'intégration officiel `@tsparticles/astro`.

## Installation

Installez l'intégration Astro et le cœur tsParticles via votre gestionnaire de paquets :

```bash
npm install @tsparticles/astro tsparticles
```

```bash
pnpm add @tsparticles/astro tsparticles
```

```bash
yarn add @tsparticles/astro tsparticles
```

## Initialisation du moteur

tsParticles utilise une architecture modulaire. Avant d'afficher les particules, vous devez initialiser le moteur avec les fonctionnalités dont vous avez besoin. Créez un script client (ex. `src/scripts/particles-init.ts`) ou utilisez une balise `<script>` en ligne dans votre composant Astro :

```typescript
import { initParticlesEngine } from "@tsparticles/astro";

void initParticlesEngine(async (engine) => {
  const { loadFull } = await import("tsparticles");
  await loadFull(engine);
});
```

> `initParticlesEngine` est un encapsuleur autour de `tsParticles.init()` qui garantit que le moteur est prêt avant que le composant `<Particles>` ne soit monté. Elle retourne une `Promise` qui se résout une fois l'initialisation terminée.

## Utilisation de base

Placez le composant `<Particles />` dans n'importe quel template `.astro`. Passez votre configuration via la prop `options` :

```astro
---
import Particles from "@tsparticles/astro";
import type { ISourceOptions } from "@tsparticles/engine";

const options: ISourceOptions = {
  background: {
    color: "#000000",
  },
  particles: {
    number: { value: 80 },
    links: { enable: true, color: "#ffffff" },
    move: { enable: true, speed: 2 },
  },
};
---

<Particles id="tsparticles" options={options} />

<script>
  import { initParticlesEngine } from "@tsparticles/astro";

  void initParticlesEngine(async (engine) => {
    const { loadFull } = await import("tsparticles");
    await loadFull(engine);
  });
</script>
```

> La prop `id` est transmise au `<div>` conteneur du canvas sous-jacent. Utilisez-la pour le style ou l'accès impératif via `document.getElementById()`.

## Support TypeScript

L'intégration est livrée avec des déclarations TypeScript complètes. Utilisez `ISourceOptions` de `@tsparticles/engine` pour typer votre configuration :

```typescript
import type { ISourceOptions } from "@tsparticles/engine";

const options: ISourceOptions = {
  background: { color: "#0d47a1" },
  fpsLimit: 60,
  particles: {
    color: {
      value: ["#ff0000", "#00ff00", "#0000ff"],
    },
    move: {
      enable: true,
      speed: 3,
      outModes: "bounce",
    },
    number: {
      value: 50,
      density: { enable: true },
    },
    opacity: { value: 0.5 },
    shape: { type: "circle" },
    size: { value: { min: 2, max: 6 } },
  },
  interactivity: {
    events: {
      onHover: { enable: true, mode: "repulse" },
    },
    modes: {
      repulse: { distance: 200 },
    },
  },
};
```

## Configuration personnalisée

Voici une configuration plus élaborée que vous pouvez intégrer dans n'importe quelle page Astro :

```astro
---
import Particles from "@tsparticles/astro";
import type { ISourceOptions } from "@tsparticles/engine";

const options: ISourceOptions = {
  autoPlay: true,
  background: {
    color: "#0d47a1",
    image: "",
    position: "50% 50%",
    repeat: "no-repeat",
    size: "cover",
  },
  backgroundMode: {
    enable: true,
    zIndex: -1,
  },
  fpsLimit: 120,
  particles: {
    color: {
      value: "#ffffff",
      animation: {
        enable: true,
        speed: 20,
        sync: false,
      },
    },
    links: {
      enable: true,
      distance: 150,
      color: "#ffffff",
      opacity: 0.4,
      width: 1,
      triangles: {
        enable: true,
        opacity: 0.1,
      },
    },
    move: {
      enable: true,
      speed: 3,
      direction: "none",
      random: true,
      straight: false,
      outModes: "out",
      attract: { enable: false },
    },
    number: {
      value: 80,
      density: {
        enable: true,
      },
    },
    opacity: {
      value: 0.5,
      animation: {
        enable: true,
        speed: 1,
        sync: false,
      },
    },
    shape: {
      type: "circle",
    },
    size: {
      value: { min: 1, max: 5 },
      animation: {
        enable: true,
        speed: 3,
        sync: false,
      },
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
      resize: true,
    },
    modes: {
      grab: {
        distance: 200,
        links: { opacity: 0.5 },
      },
      push: { quantity: 4 },
    },
  },
  detectRetina: true,
};
---

<Particles id="tsparticles" options={options} />

<script>
  import { initParticlesEngine } from "@tsparticles/astro";

  void initParticlesEngine(async (engine) => {
    const { loadFull } = await import("tsparticles");
    await loadFull(engine);
  });
</script>
```

## Utilisation des préréglages

Au lieu de construire une configuration manuellement, chargez un préréglage pendant l'initialisation du moteur et référencez-le dans les options :

```astro
---
import Particles from "@tsparticles/astro";
import type { ISourceOptions } from "@tsparticles/engine";

const options: ISourceOptions = {
  preset: "stars",
  background: { color: "#000000" },
};
---

<Particles id="tsparticles" options={options} />

<script>
  import { initParticlesEngine } from "@tsparticles/astro";

  void initParticlesEngine(async (engine) => {
    const { loadStarsPreset } = await import("tsparticles-preset-stars");
    await loadStarsPreset(engine);
  });
</script>
```

## Intégration avec d'autres frameworks

Comme Astro prend en charge les frameworks d'interface utilisateur comme React, Vue, Svelte et Solid, vous pouvez utiliser le composant tsParticles spécifique au framework dans des fichiers `.astro` :

### React dans Astro

```astro
---
import Particles from "@tsparticles/react";
import type { ISourceOptions } from "@tsparticles/engine";

const options: ISourceOptions = {
  background: { color: "#000" },
  particles: {
    number: { value: 60 },
    links: { enable: true },
    move: { enable: true },
  },
};
---

<Particles client:load id="tsparticles" options={options} />
```

### Vue dans Astro

```astro
---
import Particles from "@tsparticles/vue3";
import type { ISourceOptions } from "@tsparticles/engine";

const options: ISourceOptions = {
  background: { color: "#000" },
  particles: {
    number: { value: 60 },
    links: { enable: true },
    move: { enable: true },
  },
};
---

<Particles client:load id="tsparticles" :options="options" />
```

> La directive `client:load` indique à Astro d'hydrater le composant immédiatement au chargement de la page. Utilisez `client:visible` pour un chargement différé.

## Exemple de page complète

Une page Astro complète avec des particules servant d'arrière-plan animé :

```astro
---
import Layout from "../layouts/Layout.astro";
import Particles from "@tsparticles/astro";
import type { ISourceOptions } from "@tsparticles/engine";

const options: ISourceOptions = {
  background: { color: "#0d47a1" },
  fpsLimit: 60,
  particles: {
    number: { value: 100 },
    color: { value: "#ffffff" },
    links: {
      enable: true,
      distance: 150,
      color: "#ffffff",
      opacity: 0.4,
    },
    move: {
      enable: true,
      speed: 2,
      outModes: "out",
    },
    size: {
      value: { min: 1, max: 4 },
    },
  },
  interactivity: {
    events: {
      onHover: { enable: true, mode: "grab" },
      onClick: { enable: true, mode: "push" },
    },
    modes: {
      grab: { distance: 200, links: { opacity: 0.5 } },
      push: { quantity: 4 },
    },
  },
};
---

<Layout title="Arrière-plan de particules">
  <main>
    <h1>Bienvenue</h1>
    <p>Cette page a un arrière-plan de particules propulsé par tsParticles.</p>
  </main>
  <Particles id="bg-particles" options={options} />
</Layout>

<style is:global>
  #bg-particles {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
  }
  main {
    position: relative;
    z-index: 1;
    color: white;
    text-align: center;
    padding-top: 20vh;
  }
</style>

<script>
  import { initParticlesEngine } from "@tsparticles/astro";

  void initParticlesEngine(async (engine) => {
    const { loadFull } = await import("tsparticles");
    await loadFull(engine);
  });
</script>
```

## Props du composant

| Prop                 | Type             | Défaut                    | Description                                           |
| -------------------- | ---------------- | ------------------------- | ----------------------------------------------------- |
| `id`                 | `string`         | `"tsparticles"`           | ID de l'élément DOM pour le conteneur                 |
| `options`            | `ISourceOptions` | `{}`                      | Objet de configuration complet tsParticles            |
| `url`                | `string`         | —                         | Charger la configuration depuis une URL JSON distante |
| `particlesClassName` | `string`         | `"tsparticles-canvas-el"` | Classe CSS pour l'élément canvas                      |
| `container`          | `object`         | —                         | Instance `Container` préexistante (avancé)            |
