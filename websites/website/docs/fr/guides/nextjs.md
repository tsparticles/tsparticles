---
title: Intégration Next.js
description: Guide étape par étape pour intégrer tsParticles dans une application Next.js utilisant l'App Router.
---

# Intégration Next.js

Ce guide couvre l'intégration de tsParticles dans un projet Next.js en utilisant l'**App Router** (Next.js 13+). Pour le legacy Pages Router, voir la section [Legacy Pages Router](#legacy-pages-router) en bas de page.

## Installation

Installez l'encapsuleur `@tsparticles/react` et le moteur complet `tsparticles` (ou un bundle slim pour des builds plus légers) :

```bash
npm install @tsparticles/react tsparticles
```

Si vous préférez le bundle plus petit `@tsparticles/slim` :

```bash
npm install @tsparticles/react @tsparticles/slim
```

## Utilisation de base (App Router)

Les composants de l'App Router Next.js sont côté serveur par défaut. Comme tsParticles nécessite l'API `canvas` du navigateur, vous devez marquer le composant avec la directive `"use client"`.

```tsx
"use client";

import Particles from "@tsparticles/react";
import { useCallback, useMemo } from "react";
import type { Container, ISourceOptions } from "@tsparticles/engine";

export default function ParticlesBackground() {
  const particlesLoaded = useCallback((container?: Container) => {
    console.log("Particules chargées", container);
  }, []);

  const options: ISourceOptions = useMemo(
    () => ({
      fullScreen: { zIndex: -1 },
      background: { color: "#0d47a1" },
      particles: {
        number: { value: 80 },
        links: { enable: true, color: "#ffffff" },
        move: { enable: true },
        size: { value: 3 },
      },
    }),
    [],
  );

  return <Particles id="tsparticles" particlesLoaded={particlesLoaded} options={options} />;
}
```

Créez ce fichier sous `components/particles-background.tsx` et importez-le dans n'importe quelle page ou layout. Comme le fichier commence par `"use client"`, il sera rendu côté client — exactement là où tsParticles doit être.

## Changement de thème

Combinez tsParticles avec les toggles de thème Next.js en dérivant les options de l'état actuel du thème :

```tsx
"use client";

import Particles from "@tsparticles/react";
import { useMemo, useState, useCallback } from "react";
import type { Container, ISourceOptions } from "@tsparticles/engine";

export default function ThemeAwareParticles() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  const toggleTheme = useCallback(() => {
    setTheme((t) => (t === "dark" ? "light" : "dark"));
  }, []);

  const particlesLoaded = useCallback((_container?: Container) => {}, []);

  const options: ISourceOptions = useMemo(
    () => ({
      fullScreen: { zIndex: -1 },
      background: {
        color: theme === "dark" ? "#000000" : "#ffffff",
      },
      particles: {
        color: { value: theme === "dark" ? "#ffffff" : "#000000" },
        number: { value: 100 },
        links: {
          enable: true,
          color: theme === "dark" ? "#ffffff" : "#000000",
        },
        move: { enable: true },
      },
    }),
    [theme],
  );

  return (
    <>
      <Particles id="tsparticles" particlesLoaded={particlesLoaded} options={options} />
      <button
        onClick={toggleTheme}
        style={{
          position: "fixed",
          top: 16,
          right: 16,
          zIndex: 10,
          padding: "8px 16px",
        }}
      >
        Passer en mode {theme === "dark" ? "Clair" : "Sombre"}
      </button>
    </>
  );
}
```

L'objet `options` est recréé via `useMemo` à chaque changement de `theme`, donc le canvas se met à jour automatiquement.

## Effet Confetti

Utilisez `@tsparticles/preset-confetti` pour déclencher des confettis de célébration lors d'événements comme des clics sur un bouton :

```bash
npm install @tsparticles/preset-confetti
```

```tsx
"use client";

import Particles from "@tsparticles/react";
import { useCallback, useMemo, useState } from "react";
import { loadConfettiPreset } from "@tsparticles/preset-confetti";
import type { Container, ISourceOptions, Engine } from "@tsparticles/engine";

export default function ConfettiButton() {
  const [active, setActive] = useState(false);

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadConfettiPreset(engine);
  }, []);

  const particlesLoaded = useCallback(
    async (container?: Container) => {
      if (active && container) {
        await container.play();
      }
    },
    [active],
  );

  const options: ISourceOptions = useMemo(
    () => ({
      preset: "confetti",
      fullScreen: { zIndex: 1000 },
    }),
    [],
  );

  const handleCelebrate = useCallback(() => {
    setActive(true);
    setTimeout(() => setActive(false), 5000);
  }, []);

  return (
    <>
      {active && <Particles id="confetti" init={particlesInit} particlesLoaded={particlesLoaded} options={options} />}
      <button onClick={handleCelebrate} style={{ position: "fixed", top: 16, left: 16, zIndex: 10 }}>
        Célébrer !
      </button>
    </>
  );
}
```

Le callback `init` charge le préréglage confetti dans le moteur avant que les particules ne soient créées.

## Effet Feux d'artifice

De même, le préréglage feux d'artifice crée un spectacle pyrotechnique spectaculaire :

```bash
npm install @tsparticles/preset-fireworks
```

```tsx
"use client";

import Particles from "@tsparticles/react";
import { useCallback, useMemo, useRef } from "react";
import { loadFireworksPreset } from "@tsparticles/preset-fireworks";
import type { Container, Engine } from "@tsparticles/engine";

export default function FireworksBackground() {
  const containerRef = useRef<Container | undefined>(undefined);

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFireworksPreset(engine);
  }, []);

  const particlesLoaded = useCallback((container?: Container) => {
    containerRef.current = container;
  }, []);

  const options = useMemo(
    () => ({
      preset: "fireworks" as const,
      fullScreen: { zIndex: -1 },
      background: {
        color: "#000",
      },
    }),
    [],
  );

  return <Particles id="fireworks" init={particlesInit} particlesLoaded={particlesLoaded} options={options} />;
}
```

## Exemple TypeScript complet avec référence de conteneur

Accédez à l'instance `Container` pour contrôler l'animation par programmation (lecture, pause, destruction, exportation d'image) :

```tsx
"use client";

import Particles from "@tsparticles/react";
import { useCallback, useMemo, useRef } from "react";
import { loadFull } from "tsparticles";
import type { Container, Engine, ISourceOptions } from "@tsparticles/engine";

export default function ControllableParticles() {
  const containerRef = useRef<Container | undefined>(undefined);

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback((container?: Container) => {
    containerRef.current = container;
  }, []);

  const options: ISourceOptions = useMemo(
    () => ({
      fullScreen: { zIndex: -1 },
      fpsLimit: 120,
      interactivity: {
        events: {
          onClick: { enable: true, mode: "push" },
          onHover: { enable: true, mode: "repulse" },
        },
        modes: {
          push: { quantity: 4 },
          repulse: { distance: 100 },
        },
      },
      particles: {
        color: { value: "#ff0000" },
        links: {
          enable: true,
          color: "#ff0000",
          distance: 150,
        },
        move: { enable: true, speed: 2 },
        number: { value: 60 },
        size: { value: { min: 1, max: 5 } },
      },
    }),
    [],
  );

  const handlePause = useCallback(() => {
    containerRef.current?.pause();
  }, []);

  const handlePlay = useCallback(() => {
    containerRef.current?.play();
  }, []);

  return (
    <div style={{ position: "relative" }}>
      <Particles id="tsparticles" init={particlesInit} particlesLoaded={particlesLoaded} options={options} />
      <div
        style={{
          position: "fixed",
          bottom: 16,
          right: 16,
          zIndex: 10,
          display: "flex",
          gap: 8,
        }}
      >
        <button onClick={handlePause}>Pause</button>
        <button onClick={handlePlay}>Lecture</button>
      </div>
    </div>
  );
}
```

Points clés :

- `particlesInit` charge les fonctionnalités du moteur (ne s'exécute qu'une fois par montage du composant).
- `particlesLoaded` se déclenche à chaque fois que le conteneur est complètement initialisé.
- `containerRef` contient l'instance `Container` pour pouvoir appeler ses méthodes plus tard.

## Performance : useMemo et useCallback

Encapsulez toujours les options statiques ou peu changeantes dans `useMemo` et les gestionnaires d'événements dans `useCallback` pour éviter des re-rendus inutiles du canvas :

```tsx
"use client";

import Particles from "@tsparticles/react";
import { useCallback, useMemo, useState } from "react";
import type { Container, ISourceOptions } from "@tsparticles/engine";

export default function PerformanceExample() {
  const [particlesCount, setParticlesCount] = useState(80);

  // Callback stable — jamais recréé sauf si les dépendances changent
  const particlesLoaded = useCallback((container?: Container) => {
    console.log("Conteneur prêt", container?.id);
  }, []);

  // Objet d'options stable — empêche la réinitialisation du canvas
  const options: ISourceOptions = useMemo(
    () => ({
      fullScreen: { zIndex: -1 },
      particles: {
        number: { value: particlesCount },
        links: { enable: true },
        move: { enable: true },
      },
    }),
    [particlesCount],
  );

  return (
    <div>
      <Particles id="performance-particles" particlesLoaded={particlesLoaded} options={options} />
      <button onClick={() => setParticlesCount((c) => c + 20)}>Ajouter 20 particules</button>
    </div>
  );
}
```

Sans ces optimisations, chaque re-rendu du parent créerait un nouvel objet `options`, provoquant la recréation du canvas.

## Intégration dans une page

Ajoutez un arrière-plan de particules à une mise en page sans affecter le contenu de la page :

```tsx
// app/layout.tsx (composant serveur)
import dynamic from "next/dynamic";

const ParticlesBackground = dynamic(() => import("@/components/particles-background"), { ssr: false });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <ParticlesBackground />
        <main style={{ position: "relative", zIndex: 1 }}>{children}</main>
      </body>
    </html>
  );
}
```

Utilisez `dynamic()` avec `ssr: false` pour garantir que le composant ne s'exécute jamais lors du rendu côté serveur. Le canvas de particules se place derrière le contenu principal via le CSS `z-index`.

## Instances multiples

Vous pouvez afficher plusieurs composants `Particles` indépendants sur la même page, chacun avec sa propre configuration :

```tsx
"use client";

import Particles from "@tsparticles/react";
import { useCallback, useMemo } from "react";
import type { Container, ISourceOptions } from "@tsparticles/engine";

function ParticlesGallery() {
  const loaded = useCallback((c?: Container) => {}, []);

  const redOptions: ISourceOptions = useMemo(
    () => ({
      fullScreen: false,
      height: 200,
      background: { color: "#1a0000" },
      particles: {
        color: { value: "#ff0000" },
        number: { value: 30 },
        move: { enable: true },
      },
    }),
    [],
  );

  const blueOptions: ISourceOptions = useMemo(
    () => ({
      fullScreen: false,
      height: 200,
      background: { color: "#00001a" },
      particles: {
        color: { value: "#0000ff" },
        number: { value: 30 },
        move: { enable: true },
      },
    }),
    [],
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <Particles id="red-canvas" particlesLoaded={loaded} options={redOptions} />
      <Particles id="blue-canvas" particlesLoaded={loaded} options={blueOptions} />
    </div>
  );
}
```

Chaque composant `Particles` crée un canvas indépendant avec sa propre boucle d'animation. Définissez `fullScreen: false` et donnez à chacun une hauteur fixe pour qu'ils coexistent dans le flux du document.

## Legacy Pages Router

Si vous utilisez le **Pages Router** de Next.js (répertoire `pages/`), l'approche est similaire mais sans la directive `"use client"`. Utilisez plutôt une importation dynamique dans le composant de page :

```tsx
// pages/index.tsx
import dynamic from "next/dynamic";
import type { NextPage } from "next";

const ParticlesComponent = dynamic(() => import("../components/particles-component"), { ssr: false });

const Home: NextPage = () => {
  return (
    <div>
      <ParticlesComponent />
      <h1>Bienvenue</h1>
    </div>
  );
};

export default Home;
```

Le composant lui-même (`components/particles-component.tsx`) est un simple composant React :

```tsx
import Particles from "@tsparticles/react";
import { useCallback, useMemo } from "react";
import type { Container, ISourceOptions } from "@tsparticles/engine";

export default function ParticlesComponent() {
  const particlesLoaded = useCallback((container?: Container) => {}, []);

  const options: ISourceOptions = useMemo(
    () => ({
      fullScreen: { zIndex: -1 },
      particles: {
        number: { value: 80 },
        links: { enable: true },
        move: { enable: true },
      },
    }),
    [],
  );

  return <Particles id="tsparticles" particlesLoaded={particlesLoaded} options={options} />;
}
```

Notez que le Pages Router ne nécessite **pas** `"use client"` car les composants de page sont déjà rendus côté client par défaut.


## Reactive Behavior

The `<Particles>` component reacts to prop changes at runtime:

- **`id`**, **`options`**, or **`url`** change → the existing container is destroyed and particles are reloaded with the new values.
- **`theme`** change → `loadTheme` is called on the existing container. This requires the optional `@tsparticles/plugin-themes` package to be loaded (otherwise it is a safe no-op).

On component unmount, the particles container is automatically destroyed — no orphan animations remain.

## Dépannage

| Symptôme                        | Cause                                         | Solution                                                                        |
| ------------------------------- | --------------------------------------------- | ------------------------------------------------------------------------------- |
| Page blanche                    | SSR d'un module dépendant du canvas           | Utilisez `dynamic(..., { ssr: false })` ou encapsulez dans un composant client  |
| Canvas non affiché              | Conteneur a une hauteur nulle                 | Définissez `fullScreen: { zIndex: -1 }` ou donnez-lui des dimensions explicites |
| Changement d'options sans effet | Nouvelle référence d'objet non créée          | Utilisez `useMemo` avec un tableau de dépendances approprié                     |
| Préréglage non fonctionnel      | Préréglage non chargé avant init du conteneur | Appelez `loadXPreset(engine)` dans le callback `init`                           |

## Prochaines étapes

- Parcourez les [Démos interactives](/demos/) pour des configurations prêtes à l'emploi.
- Lisez la [Référence des options](/options/) pour chaque paramètre disponible.
- Consultez la page [Préréglages](/demos/presets) pour plus de préréglages préconstruits comme neige, étoiles et lucioles.
