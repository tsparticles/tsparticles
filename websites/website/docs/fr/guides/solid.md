---
title: Intégration SolidJS
description: Guide étape par étape pour intégrer tsParticles dans une application SolidJS en utilisant l'encapsuleur officiel @tsparticles/solid.
---

# Intégration SolidJS

Ce guide couvre l'intégration de tsParticles dans un projet **SolidJS** en utilisant l'encapsuleur officiel `@tsparticles/solid`. Le modèle de réactivité fine de SolidJS fonctionne bien avec tsParticles — les changements d'options déclenchent des mises à jour ciblées du canvas sans réinitialisation complète.

## Installation

Installez l'encapsuleur SolidJS et le bundle moteur de votre choix :

```bash
npm install @tsparticles/solid tsparticles
```

Pour un bundle plus petit, utilisez `@tsparticles/slim` :

```bash
npm install @tsparticles/solid @tsparticles/slim
```

## Utilisation de base

SolidJS s'exécute entièrement dans le navigateur (pas de SSR), vous n'avez donc pas besoin de protéger contre le rendu serveur. Cependant, le moteur doit être initialisé de manière asynchrone avant d'afficher les particules.

Utilisez `initParticlesEngine` dans `onMount` pour charger les fonctionnalités du moteur, puis affichez conditionnellement le composant `<Particles>` avec `<Show>` :

```tsx
import { loadFull } from "tsparticles";
import { createSignal, Show, onMount } from "solid-js";
import type { Component } from "solid-js";
import Particles, { initParticlesEngine } from "@tsparticles/solid";
import type { Engine, ISourceOptions } from "@tsparticles/engine";

const App: Component = () => {
  const [initialized, setInitialized] = createSignal(false);

  onMount(() => {
    initParticlesEngine(async (engine: Engine) => {
      await loadFull(engine);
    }).then(() => setInitialized(true));
  });

  const options: ISourceOptions = {
    fullScreen: { zIndex: -1 },
    background: { color: "#0d47a1" },
    particles: {
      number: { value: 80 },
      links: { enable: true, color: "#ffffff" },
      move: { enable: true },
      size: { value: 3 },
    },
  };

  return (
    <Show when={initialized()}>
      <Particles id="tsparticles" options={options} />
    </Show>
  );
};

export default App;
```

Le composant `<Show>` garantit que l'élément `<Particles>` n'est inséré dans le DOM qu'après que le moteur est prêt.

## Initialisation du moteur

La fonction `initParticlesEngine` accepte un callback qui reçoit l'instance `Engine`. Utilisez ce callback pour enregistrer les fonctionnalités dont votre configuration a besoin :

```tsx
import { initParticlesEngine } from "@tsparticles/solid";
import { loadFull } from "tsparticles";
import { loadSlim } from "@tsparticles/slim";
import { loadConfettiPreset } from "@tsparticles/preset-confetti";
import type { Engine } from "@tsparticles/engine";

// Minimal — seulement les formes de base et les déplacements
initParticlesEngine((engine: Engine) => loadSlim(engine)).then(() => {
  console.log("Moteur prêt (slim)");
});

// Complet — toutes les fonctionnalités incluses
initParticlesEngine((engine: Engine) => loadFull(engine)).then(() => {
  console.log("Moteur prêt (complet)");
});

// Préréglage seulement — juste les fonctionnalités nécessaires pour un préréglage spécifique
initParticlesEngine((engine: Engine) => loadConfettiPreset(engine)).then(() => {
  console.log("Préréglage confetti chargé");
});
```

Appelez `initParticlesEngine` une fois dans votre application — généralement dans le `onMount` du composant racine. L'instance du moteur est mise en cache, donc les appels suivants retournent immédiatement.

## Rendu conditionnel

Utilisez le flux de contrôle `<Show>` de SolidJS pour différer le rendu jusqu'à ce que le moteur soit initialisé :

```tsx
import { createSignal, Show, onMount } from "solid-js";
import Particles, { initParticlesEngine } from "@tsparticles/solid";
import { loadFull } from "tsparticles";
import type { Engine } from "@tsparticles/engine";
import type { Component } from "solid-js";

const App: Component = () => {
  const [ready, setReady] = createSignal(false);

  onMount(() => {
    initParticlesEngine((engine: Engine) => loadFull(engine)).then(() => setReady(true));
  });

  return (
    <Show when={ready()} fallback={<p>Chargement des particules...</p>}>
      <Particles
        id="tsparticles"
        options={{
          fullScreen: { zIndex: -1 },
          particles: { number: { value: 50 }, move: { enable: true } },
        }}
      />
    </Show>
  );
};
```

La prop `fallback` affiche un indicateur de chargement pendant l'initialisation du moteur.

## Utilisation des préréglages

Utilisez `@tsparticles/configs` pour des configurations rapides et préconçues :

```bash
npm install @tsparticles/configs
```

```tsx
import configs from "@tsparticles/configs";
import { loadFull } from "tsparticles";
import { createSignal, Show, onMount } from "solid-js";
import type { Component } from "solid-js";
import Particles, { initParticlesEngine } from "@tsparticles/solid";
import type { Engine } from "@tsparticles/engine";

const App: Component = () => {
  const [ready, setReady] = createSignal(false);

  onMount(() => {
    initParticlesEngine((engine: Engine) => loadFull(engine)).then(() => setReady(true));
  });

  return (
    <Show when={ready()}>
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <Particles id="basic" options={configs.basic} />
        <Particles id="bubbles" options={configs.bubbles} />
      </div>
    </Show>
  );
};

export default App;
```

Les configurations disponibles incluent : `basic`, `bubbles`, `snow`, `stars`, `fireworks`, `confetti`, `links`, et plus encore.

## Particules interactives

Ajoutez des interactions au clic et au survol en configurant la section `interactivity` :

```tsx
import { loadFull } from "tsparticles";
import { createSignal, Show, onMount } from "solid-js";
import type { Component } from "solid-js";
import Particles, { initParticlesEngine } from "@tsparticles/solid";
import type { Engine, ISourceOptions } from "@tsparticles/engine";

const App: Component = () => {
  const [ready, setReady] = createSignal(false);

  onMount(() => {
    initParticlesEngine((engine: Engine) => loadFull(engine)).then(() => setReady(true));
  });

  const options: ISourceOptions = {
    fullScreen: { zIndex: -1 },
    particles: {
      number: { value: 60 },
      links: { enable: true, distance: 150 },
      move: { enable: true, speed: 2 },
      size: { value: { min: 1, max: 4 } },
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

  return (
    <Show when={ready()}>
      <Particles id="interactive" options={options} />
    </Show>
  );
};

export default App;
```

- **Modes de survol** : `grab`, `bubble`, `repulse`, `attract`, `slow`, `connect`
- **Modes de clic** : `push`, `remove`, `repulse`, `bubble`, `attract`, `pause`

## Configuration personnalisée

Une configuration personnalisée complète avec formes de particules multiples, palettes de couleurs et paramètres de mouvement :

```tsx
import { loadFull } from "tsparticles";
import { createSignal, Show, onMount } from "solid-js";
import type { Component } from "solid-js";
import Particles, { initParticlesEngine } from "@tsparticles/solid";
import type { Engine, ISourceOptions } from "@tsparticles/engine";

const App: Component = () => {
  const [ready, setReady] = createSignal(false);

  onMount(() => {
    initParticlesEngine((engine: Engine) => loadFull(engine)).then(() => setReady(true));
  });

  const options: ISourceOptions = {
    fullScreen: { zIndex: -1 },
    background: { color: "#0a0a23" },
    fpsLimit: 60,
    particles: {
      color: {
        value: ["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff"],
      },
      move: {
        enable: true,
        speed: 1.5,
        direction: "none",
        random: true,
        straight: false,
        outModes: "bounce",
        attract: { enable: true, rotateX: 600, rotateY: 1200 },
      },
      number: {
        value: 40,
        density: { enable: true },
      },
      opacity: {
        value: { min: 0.3, max: 0.8 },
        animation: {
          enable: true,
          speed: 0.5,
          sync: false,
        },
      },
      size: {
        value: { min: 2, max: 8 },
        animation: {
          enable: true,
          speed: 2,
          sync: false,
        },
      },
      links: {
        enable: true,
        distance: 200,
        color: "#ffffff",
        opacity: 0.3,
        width: 1,
      },
      shape: {
        type: ["circle", "square", "triangle", "polygon"],
        options: {
          polygon: { sides: 6 },
        },
      },
      twinkle: {
        particles: {
          enable: true,
          frequency: 0.05,
          opacity: 1,
        },
      },
    },
    interactivity: {
      events: {
        onHover: { enable: true, mode: "repulse" },
        onClick: { enable: true, mode: "bubble" },
      },
      modes: {
        repulse: { distance: 120 },
        bubble: { distance: 200, size: 10, opacity: 0.8 },
      },
    },
    detectRetina: true,
  };

  return (
    <Show when={ready()}>
      <Particles id="custom" options={options} />
    </Show>
  );
};

export default App;
```

## Exemple TypeScript complet

Un composant typé complet avec référence de conteneur, initialisation du moteur et contrôles manuels :

```tsx
import { loadFull } from "tsparticles";
import { createSignal, Show, onMount } from "solid-js";
import type { Component } from "solid-js";
import Particles, { initParticlesEngine } from "@tsparticles/solid";
import type { Container, Engine, ISourceOptions } from "@tsparticles/engine";

const App: Component = () => {
  const [ready, setReady] = createSignal(false);
  const [container, setContainer] = createSignal<Container | undefined>(undefined);
  const [paused, setPaused] = createSignal(false);

  onMount(() => {
    initParticlesEngine(async (engine: Engine) => {
      await loadFull(engine);
    }).then(() => setReady(true));
  });

  const options: ISourceOptions = {
    fullScreen: { zIndex: -1 },
    background: { color: "#1a1a2e" },
    particles: {
      color: { value: "#e94560" },
      number: { value: 80 },
      links: { enable: true, color: "#e94560", distance: 150 },
      move: { enable: true, speed: 2 },
      size: { value: { min: 1, max: 5 } },
    },
  };

  const particlesLoaded = (c: Container) => {
    setContainer(c);
  };

  const togglePause = () => {
    const c = container();
    if (c) {
      if (paused()) {
        c.play();
      } else {
        c.pause();
      }
      setPaused(!paused());
    }
  };

  return (
    <Show when={ready()}>
      <Particles id="full-example" options={options} particlesLoaded={particlesLoaded} />
      <button
        onClick={togglePause}
        style={{
          position: "fixed",
          bottom: 24,
          right: 24,
          zIndex: 10,
          padding: "8px 16px",
        }}
      >
        {paused() ? "Reprendre" : "Pause"}
      </button>
    </Show>
  );
};

export default App;
```

## Options dynamiques avec signaux

L'un des atouts de SolidJS est sa réactivité fine — vous pouvez utiliser des signaux pour piloter les options des particules et le canvas se mettra à jour efficacement :

```tsx
import { loadFull } from "tsparticles";
import { createSignal, Show, onMount } from "solid-js";
import type { Component } from "solid-js";
import Particles, { initParticlesEngine } from "@tsparticles/solid";
import type { Container, Engine, ISourceOptions } from "@tsparticles/engine";

const App: Component = () => {
  const [ready, setReady] = createSignal(false);
  const [color, setColor] = createSignal("#ff0000");
  const [particleCount, setParticleCount] = createSignal(60);

  onMount(() => {
    initParticlesEngine((engine: Engine) => loadFull(engine)).then(() => setReady(true));
  });

  // les options sont un objet normal — il sera lu de manière réactive via
  // le suivi interne du composant Particle
  const options = (): ISourceOptions => ({
    fullScreen: { zIndex: -1 },
    background: { color: "#000" },
    particles: {
      color: { value: color() },
      number: { value: particleCount() },
      links: { enable: true, color: color() },
      move: { enable: true },
    },
  });

  return (
    <Show when={ready()}>
      <Particles id="dynamic" options={options()} particlesLoaded={() => {}} />
      <div style={{ position: "fixed", top: 16, right: 16, zIndex: 10 }}>
        <label>
          Couleur :
          <input type="color" value={color()} onInput={(e) => setColor(e.currentTarget.value)} />
        </label>
        <label>
          Quantité :
          <input
            type="range"
            min={10}
            max={200}
            value={particleCount()}
            onInput={(e) => setParticleCount(Number(e.currentTarget.value))}
          />
          {particleCount()}
        </label>
      </div>
    </Show>
  );
};

export default App;
```

Comme `options` est une fonction qui accède aux signaux, chaque fois que `color()` ou `particleCount()` change, le composant `<Particles>` reçoit un nouvel objet d'options et applique uniquement les propriétés modifiées au canvas existant.

## Préréglage avec surcharges personnalisées

Chargez un préréglage, puis fusionnez des surcharges personnalisées pour un effet adapté :

```tsx
import { loadSnowPreset } from "@tsparticles/preset-snow";
import { createSignal, Show, onMount } from "solid-js";
import type { Component } from "solid-js";
import Particles, { initParticlesEngine } from "@tsparticles/solid";
import type { Container, Engine, ISourceOptions } from "@tsparticles/engine";

const App: Component = () => {
  const [ready, setReady] = createSignal(false);

  onMount(() => {
    initParticlesEngine(async (engine: Engine) => {
      await loadSnowPreset(engine);
    }).then(() => setReady(true));
  });

  const options: ISourceOptions = {
    preset: "snow",
    fullScreen: { zIndex: -1 },
    background: { color: "#0d0d2b" },
    particles: {
      // Surcharger la couleur de la neige en bleu
      color: { value: "#88ccff" },
      // Augmenter le nombre de flocons
      number: { value: 300 },
    },
  };

  return (
    <Show when={ready()}>
      <Particles id="custom-snow" options={options} />
    </Show>
  );
};

export default App;
```

Le préréglage fournit des valeurs par défaut pour chaque option, et vos surcharges sont fusionnées par-dessus — vous n'avez besoin de spécifier que les propriétés que vous voulez modifier.

## Dépannage

| Symptôme                      | Cause                                   | Solution                                                                  |
| ---------------------------- | --------------------------------------- | ------------------------------------------------------------------------ |
| Élément DOM vide             | Moteur non initialisé avant le rendu    | Encapsulez `<Particles>` dans `<Show when={initialized()}>`               |
| Aucune particule visible     | `move.enable` ou `number.value` manquant | Assurez-vous `particles.move.enable: true` et `particles.number.value > 0` |
| Canvas derrière le contenu   | `zIndex` manquant dans fullScreen       | Utilisez `fullScreen: { zIndex: -1 }`                                     |
| Changement d'options sans effet | La référence d'objet ne change pas    | Encapsulez les options dans une fonction ou un store ; évitez les objets statiques |
| Moteur non trouvé            | Import manquant de `loadFull` ou `loadSlim` | Installez `tsparticles` ou `@tsparticles/slim` et appelez `loadFull(engine)` |

## Prochaines étapes

- Explorez le [Terrain de jeu des configurations](/playground/configs) pour des configurations prêtes à l'emploi.
- Lisez la [Référence des options](/options/) pour la liste complète des paramètres.
- Parcourez le [code source SolidJS](https://github.com/tsparticles/solid) sur GitHub pour les détails internes de l'encapsuleur.
