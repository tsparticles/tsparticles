---
title: Qwik
description: Intégrez tsParticles avec Qwik en utilisant l'encapsuleur officiel @tsparticles/qwik.
---

# Intégration Qwik

Le package `@tsparticles/qwik` fournit un composant `<Particles>` optimisé pour le modèle de reprenabilité de Qwik. Il utilise `useVisibleTask$` pour l'initialisation paresseuse et des signaux pour les mises à jour réactives.

## Installation

```bash
npm install @tsparticles/qwik tsparticles
```

Les déclarations TypeScript sont incluses — aucun package de types supplémentaire requis.

## Initialisation du moteur

Dans Qwik, le moteur doit être initialisé à l'intérieur d'un bloc `useVisibleTask$` pour garantir qu'il s'exécute uniquement côté client (jamais pendant le SSR). Utilisez un signal pour suivre l'état de préparation :

```tsx
import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import { Particles, initParticlesEngine } from "@tsparticles/qwik";
import type { Engine } from "@tsparticles/engine";
import { loadFull } from "tsparticles";

export default component$(() => {
  const engineReady = useSignal(false);

  useVisibleTask$(async () => {
    await initParticlesEngine(async (engine: Engine) => {
      await loadFull(engine);
    });
    engineReady.value = true;
  });

  return <>{engineReady.value && <Particles id="tsparticles" options={{}} />}</>;
});
```

## Utilisation de base

Une fois le moteur prêt, affichez le composant `<Particles>` avec votre configuration :

```tsx
import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import { Particles, initParticlesEngine } from "@tsparticles/qwik";
import type { Engine } from "@tsparticles/engine";
import { loadFull } from "tsparticles";

export default component$(() => {
  const engineReady = useSignal(false);

  useVisibleTask$(async () => {
    await initParticlesEngine(async (engine: Engine) => {
      await loadFull(engine);
    });
    engineReady.value = true;
  });

  const options = {
    background: {
      color: "#0d1117",
    },
    particles: {
      color: { value: "#58a6ff" },
      links: {
        enable: true,
        color: "#58a6ff",
        distance: 150,
      },
      move: {
        enable: true,
        speed: 2,
      },
      number: {
        value: 80,
      },
    },
  };

  return <>{engineReady.value && <Particles id="tsparticles" options={options} />}</>;
});
```

## Rendu conditionnel

Le modèle de signal `engineReady` garantit que le composant `<Particles>` n'est monté qu'après l'initialisation complète du moteur. Cela évite les erreurs d'hydratation entre le serveur et le client :

```tsx
import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import { Particles, initParticlesEngine } from "@tsparticles/qwik";
import type { Engine } from "@tsparticles/engine";
import { loadFull } from "tsparticles";

export default component$(() => {
  const engineReady = useSignal(false);
  const loading = useSignal(true);

  useVisibleTask$(async () => {
    await initParticlesEngine(async (engine: Engine) => {
      await loadFull(engine);
    });
    engineReady.value = true;
    loading.value = false;
  });

  return (
    <div style={{ position: "relative", width: "100%", height: "100vh" }}>
      {loading.value && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            color: "#888",
          }}
        >
          Chargement des particules...
        </div>
      )}
      {engineReady.value && (
        <Particles
          id="tsparticles"
          options={{
            background: { color: "#0d1117" },
            fullScreen: { enable: true, zIndex: -1 },
            particles: {
              color: { value: "#58a6ff" },
              links: { enable: true, color: "#58a6ff", distance: 150 },
              move: { enable: true, speed: 2 },
              number: { value: 80 },
            },
          }}
        />
      )}
    </div>
  );
});
```

## Particules interactives

Activez les interactions de survol et de clic en ajoutant la section `interactivity` à vos options :

```tsx
import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import { Particles, initParticlesEngine } from "@tsparticles/qwik";
import type { Engine } from "@tsparticles/engine";
import { loadFull } from "tsparticles";

export default component$(() => {
  const engineReady = useSignal(false);

  useVisibleTask$(async () => {
    await initParticlesEngine(async (engine: Engine) => {
      await loadFull(engine);
    });
    engineReady.value = true;
  });

  const options = {
    background: { color: "#0d1117" },
    fullScreen: { enable: true },
    particles: {
      color: { value: "#58a6ff" },
      links: { enable: true, color: "#58a6ff", distance: 150 },
      move: { enable: true, speed: 1.5 },
      number: { value: 100 },
      size: { value: { min: 1, max: 4 } },
      opacity: { value: 0.6 },
    },
    interactivity: {
      events: {
        onHover: { enable: true, mode: "grab" },
        onClick: { enable: true, mode: "push" },
        resize: { enable: true },
      },
      modes: {
        grab: { distance: 180, links: { opacity: 0.5 } },
        push: { quantity: 4 },
      },
    },
  };

  return <>{engineReady.value && <Particles id="tsparticles" options={options} />}</>;
});
```

## Configuration personnalisée

Une configuration complète avec animations, couleurs multiples et interactivité riche :

```tsx
import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import { Particles, initParticlesEngine } from "@tsparticles/qwik";
import type { Engine, ISourceOptions } from "@tsparticles/engine";
import { loadFull } from "tsparticles";

export default component$(() => {
  const engineReady = useSignal(false);

  useVisibleTask$(async () => {
    await initParticlesEngine(async (engine: Engine) => {
      await loadFull(engine);
    });
    engineReady.value = true;
  });

  const options: ISourceOptions = {
    background: { color: "#0d1117" },
    fpsLimit: 60,
    fullScreen: { enable: true, zIndex: -1 },
    particles: {
      color: {
        value: ["#ff5733", "#33ff57", "#3357ff", "#f3f333"],
      },
      links: {
        color: "random",
        enable: true,
        opacity: 0.3,
        distance: 120,
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
          rotateX: 600,
          rotateY: 1200,
        },
      },
      number: {
        value: 120,
        density: { enable: true },
      },
      opacity: {
        value: 0.8,
        animation: {
          enable: true,
          speed: 0.5,
          minimumValue: 0.1,
          sync: false,
        },
      },
      size: {
        value: { min: 1, max: 6 },
        animation: {
          enable: true,
          speed: 3,
          minimumValue: 1,
          sync: false,
        },
      },
      twinkle: {
        particles: {
          enable: true,
          frequency: 0.05,
          opacity: 0.5,
        },
      },
    },
    interactivity: {
      events: {
        onHover: { enable: true, mode: "repulse" },
        onClick: { enable: true, mode: "push" },
        resize: { enable: true },
      },
      modes: {
        repulse: { distance: 120, duration: 0.4 },
        push: { quantity: 4 },
      },
    },
    detectRetina: true,
  };

  return <>{engineReady.value && <Particles id="tsparticles" options={options} />}</>;
});
```

## TypeScript

Le package `@tsparticles/qwik` exporte des types complets. Utilisez `ISourceOptions` pour des configurations typées et `Engine` pour le callback d'initialisation :

```tsx
import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import { Particles, initParticlesEngine } from "@tsparticles/qwik";
import type { Engine, ISourceOptions } from "@tsparticles/engine";
import { loadFull } from "tsparticles";

export default component$(() => {
  const engineReady = useSignal(false);

  useVisibleTask$(async () => {
    await initParticlesEngine(async (engine: Engine) => {
      await loadFull(engine);
    });
    engineReady.value = true;
  });

  const options: ISourceOptions = {
    background: { color: "#000" },
    particles: {
      number: { value: 50 },
      color: { value: "#fff" },
    },
  };

  return <>{engineReady.value && <Particles id="tsparticles" options={options} />}</>;
});
```

## Reactive Behavior

The `<Particles>` component reacts to prop changes at runtime:

- **`id`**, **`options`**, or **`url`** change → the existing container is destroyed and particles are reloaded with the new values.
- **`theme`** change → `loadTheme` is called on the existing container. This requires the optional `@tsparticles/plugin-themes` package to be loaded (otherwise it is a safe no-op).

On component unmount, the particles container is automatically destroyed — no orphan animations remain.

## Chargement paresseux

Le modèle de reprenabilité de Qwik signifie que le code des particules n'est chargé et exécuté que lorsque le composant devient visible dans la fenêtre d'affichage. Le hook `useVisibleTask$` déclenche l'initialisation du moteur, et le composant `<Particles>` lui-même est automatiquement séparé par Qwik lors de l'importation :

```tsx
import { component$, useSignal, useVisibleTask$, $ } from "@builder.io/qwik";
import type { Engine } from "@tsparticles/engine";
import { loadFull } from "tsparticles";

export default component$(() => {
  const engineReady = useSignal(false);

  useVisibleTask$(async () => {
    await initParticlesEngine(async (engine: Engine) => {
      await loadFull(engine);
    });
    engineReady.value = true;
  });

  return (
    <div>
      {engineReady.value && (
        <Particles
          id="tsparticles"
          options={{
            background: { color: "#0d1117" },
          }}
        />
      )}
    </div>
  );
});
```

Utilisez la convention du suffixe `$` pour les gestionnaires d'événements optimisés pour Qwik lors du câblage des callbacks :

```tsx
import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import { Particles, initParticlesEngine } from "@tsparticles/qwik";
import type { Engine, Container } from "@tsparticles/engine";
import { loadFull } from "tsparticles";

export default component$(() => {
  const engineReady = useSignal(false);
  const containerRef = useSignal<Container | undefined>();

  useVisibleTask$(async () => {
    await initParticlesEngine(async (engine: Engine) => {
      await loadFull(engine);
    });
    engineReady.value = true;
  });

  const handleParticlesLoaded = $((container?: Container) => {
    containerRef.value = container;
    console.log("Particules chargées :", container?.id);
  });

  return (
    <>
      {engineReady.value && (
        <Particles
          id="tsparticles"
          options={{ background: { color: "#0d1117" } }}
          particlesLoaded={handleParticlesLoaded}
        />
      )}
    </>
  );
});
```

Cette approche garantit que vos animations de particules sont entièrement éliminables par l'arbre et uniquement livrées aux clients lorsque nécessaire.
