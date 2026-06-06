---
title: Guide React
description: Guide complet pour intégrer tsParticles avec React en utilisant @tsparticles/react.
---

# Guide React

## Table des matières

1. [Installation](#installation)
2. [Utilisation de base](#utilisation-de-base)
3. [Effet Confetti](#effet-confetti)
4. [Effet Feux d'artifice](#effet-feux-dartifice)
5. [Effet Neige](#effet-neige)
6. [Liens interactifs](#liens-interactifs)
7. [Changement de thème](#changement-de-thème)
8. [ParticlesProvider](#particlesprovider)
9. [Optimisation des performances](#optimisation-des-performances)
10. [Configuration personnalisée](#configuration-personnalisée)

---

## Installation

```bash
npm install @tsparticles/react tsparticles
```

Ou avec Yarn :

```bash
yarn add @tsparticles/react tsparticles
```

`@tsparticles/react` est l'encapsuleur React officiel. Le package `tsparticles` est le moteur principal.

---

## Utilisation de base

La configuration la plus simple : affichez le composant `<Particles />` avec un objet d'options.

```jsx
import { useCallback } from "react";
import Particles from "@tsparticles/react";

export default function App() {
  const particlesLoaded = useCallback(async (container) => {
    console.log("Conteneur de particules chargé", container);
  }, []);

  const options = {
    fpsLimit: 120,
    particles: {
      number: { value: 80 },
      color: { value: "#00d4ff" },
      shape: { type: "circle" },
      opacity: { value: 0.6 },
      size: { value: { min: 2, max: 5 } },
      move: {
        enable: true,
        speed: 2,
        outModes: { default: "bounce" },
      },
    },
    background: { color: "#0d1117" },
  };

  return <Particles id="tsparticles" particlesLoaded={particlesLoaded} options={options} />;
}
```

**Important** : Le composant `<Particles />` nécessite que le moteur soit initialisé en premier. Utilisez `initParticlesEngine` de `@tsparticles/react` ou `<ParticlesProvider>` pour charger vos préréglages avant d'afficher le composant.

---

## Effet Confetti

Affichez une explosion de confettis en utilisant le préréglage confetti.

```jsx
import Particles from "@tsparticles/react";

export default function Confetti() {
  const options = {
    preset: "confetti",
    fullScreen: { enable: true, zIndex: -1 },
    confetti: {
      colors: ["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff"],
      particleCount: 150,
      spread: 70,
      origin: { x: 0.5, y: 0.5 },
    },
  };

  return <Particles id="confetti" options={options} />;
}
```

Assurez-vous d'avoir chargé le préréglage confetti :

```bash
npm install @tsparticles/preset-confetti
```

Enregistrez-le ensuite dans le point d'entrée de votre application :

```jsx
import { initParticlesEngine } from "@tsparticles/react";
import { loadConfettiPreset } from "@tsparticles/preset-confetti";

initParticlesEngine(async (engine) => {
  await loadConfettiPreset(engine);
});
```

---

## Effet Feux d'artifice

Un affichage de feux d'artifice en plein écran.

```jsx
import { useCallback, useMemo } from "react";
import Particles from "@tsparticles/react";

export default function Fireworks() {
  const particlesLoaded = useCallback(async (container) => {
    console.log("Feux d'artifice chargés", container);
  }, []);

  const options = useMemo(
    () => ({
      preset: "fireworks",
      fullScreen: { enable: true, zIndex: -1 },
      fireworks: {
        background: "#000000",
        brightness: 100,
        colors: ["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff", "#00ffff"],
        intensity: 30,
        life: { min: 4, max: 8 },
        traces: 20,
        explosion: { min: 30, max: 60 },
      },
    }),
    [],
  );

  return <Particles id="fireworks" particlesLoaded={particlesLoaded} options={options} />;
}
```

Installez le préréglage :

```bash
npm install @tsparticles/preset-fireworks
```

---

## Effet Neige

De doux flocons de neige tombant en utilisant le préréglage neige.

```jsx
import { useCallback, useMemo } from "react";
import Particles from "@tsparticles/react";

export default function Snow() {
  const particlesLoaded = useCallback(async (container) => {
    console.log("Neige chargée", container);
  }, []);

  const options = useMemo(
    () => ({
      preset: "snow",
      fullScreen: { enable: true, zIndex: -1 },
      snow: {
        color: "#ffffff",
        opacity: { min: 0.3, max: 0.9 },
        size: { min: 1, max: 4 },
        speed: { min: 0.5, max: 2 },
        wobble: true,
      },
    }),
    [],
  );

  return <Particles id="snow" particlesLoaded={particlesLoaded} options={options} />;
}
```

Installez le préréglage :

```bash
npm install @tsparticles/preset-snow
```

---

## Liens interactifs

Un réseau de nœuds connectés avec attrape au survol de la souris et poussée au clic.

```jsx
import { useCallback, useMemo } from "react";
import Particles from "@tsparticles/react";

export default function InteractiveLinks() {
  const particlesLoaded = useCallback(async (container) => {
    console.log("Liens interactifs chargés", container);
  }, []);

  const options = useMemo(
    () => ({
      fpsLimit: 60,
      particles: {
        number: { value: 80, density: { enable: true } },
        color: { value: "#00d4ff" },
        shape: { type: "circle" },
        opacity: { value: 0.6 },
        size: { value: { min: 1, max: 4 } },
        links: {
          enable: true,
          distance: 150,
          color: "#00d4ff",
          opacity: 0.4,
          width: 1,
        },
        move: {
          enable: true,
          speed: 1.5,
          outModes: { default: "bounce" },
        },
      },
      interactivity: {
        events: {
          onHover: { enable: true, mode: "grab" },
          onClick: { enable: true, mode: "push" },
        },
        modes: {
          grab: { distance: 180, links: { opacity: 0.8 } },
          push: { quantity: 4 },
        },
      },
      background: { color: "#0d1117" },
    }),
    [],
  );

  return <Particles id="interactive-links" particlesLoaded={particlesLoaded} options={options} />;
}
```

---

## Changement de thème

Définissez plusieurs thèmes et basculez entre eux d'un clic.

```jsx
import { useCallback, useMemo, useRef, useState } from "react";
import Particles from "@tsparticles/react";

export default function ThemeSwitcher() {
  const containerRef = useRef(null);
  const [currentTheme, setCurrentTheme] = useState("dark");

  const particlesLoaded = useCallback(async (container) => {
    containerRef.current = container;
  }, []);

  const options = useMemo(
    () => ({
      fpsLimit: 60,
      particles: {
        number: { value: 60 },
        color: { value: "#00d4ff" },
        shape: { type: "circle" },
        opacity: { value: 0.6 },
        size: { value: { min: 2, max: 5 } },
        links: { enable: true, distance: 150, color: "#00d4ff", opacity: 0.3 },
        move: { enable: true, speed: 1.5, outModes: { default: "bounce" } },
      },
      background: { color: "#0d1117" },
      themes: [
        {
          name: "dark",
          default: { value: true },
          options: {
            background: { color: "#0d1117" },
            particles: { color: { value: "#00d4ff" }, links: { color: "#00d4ff" } },
          },
        },
        {
          name: "light",
          options: {
            background: { color: "#f5f5f5" },
            particles: { color: { value: "#e74c3c" }, links: { color: "#333333" } },
          },
        },
        {
          name: "forest",
          options: {
            background: { color: "#1a3a1a" },
            particles: { color: { value: "#7ec850" }, links: { color: "#7ec850" } },
          },
        },
      ],
    }),
    [],
  );

  const switchTheme = useCallback((theme) => {
    setCurrentTheme(theme);
    if (containerRef.current) {
      containerRef.current.loadTheme(theme);
    }
  }, []);

  return (
    <div style={{ position: "relative", width: "100%", height: "100vh" }}>
      <Particles id="theme-switcher" particlesLoaded={particlesLoaded} options={options} />
      <div
        style={{
          position: "absolute",
          bottom: 20,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 10,
          display: "flex",
          gap: 8,
        }}
      >
        <button onClick={() => switchTheme("dark")} style={btnStyle(currentTheme === "dark")}>
          Sombre
        </button>
        <button onClick={() => switchTheme("light")} style={btnStyle(currentTheme === "light")}>
          Clair
        </button>
        <button onClick={() => switchTheme("forest")} style={btnStyle(currentTheme === "forest")}>
          Forêt
        </button>
      </div>
    </div>
  );
}

const btnStyle = (active) => ({
  padding: "8px 16px",
  border: "none",
  borderRadius: 6,
  background: active ? "#333" : "#666",
  color: "#fff",
  cursor: "pointer",
});
```

---

## ParticlesProvider

Utilisez `ParticlesProvider` pour initialiser le moteur une fois à la racine de l'application. C'est l'approche recommandée lorsque vous avez plusieurs composants de particules ou utilisez des préréglages personnalisés.

```jsx
// App.jsx
import { ParticlesProvider } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import Home from "./Home";

const engineInit = async (engine) => {
  await loadSlim(engine);
  // Chargez des préréglages supplémentaires ici :
  // await loadConfettiPreset(engine);
  // await loadFireworksPreset(engine);
  // await loadSnowPreset(engine);
};

export default function App() {
  return (
    <ParticlesProvider load={engineInit}>
      <Home />
    </ParticlesProvider>
  );
}
```

```jsx
// Home.jsx
import Particles from "@tsparticles/react";

export default function Home() {
  return (
    <Particles
      id="tsparticles"
      options={{
        particles: {
          number: { value: 50 },
          color: { value: "#ff6b6b" },
          shape: { type: "circle" },
          opacity: { value: 0.7 },
          size: { value: { min: 2, max: 6 } },
          move: { enable: true, speed: 1, outModes: { default: "bounce" } },
        },
        background: { color: "#1a1a2e" },
      }}
    />
  );
}
```

En encapsulant votre arborescence avec `ParticlesProvider`, chaque composant enfant `<Particles />` hérite de la même instance de moteur. Cela évite de réinitialiser le moteur à chaque montage.

---

## Optimisation des performances

Mémorisez toujours les callbacks et les options pour éviter des re-rendus inutiles.

```jsx
import { useCallback, useMemo, useState } from "react";
import Particles from "@tsparticles/react";

export default function PerformanceExample() {
  const [visible, setVisible] = useState(true);

  // Mémorisez le callback — référence stable entre les rendus
  const particlesLoaded = useCallback(async (container) => {
    // Appelé une fois par montage du conteneur
    console.log("Conteneur prêt", container.id);
  }, []);

  // Mémorisez l'objet options — ne recalcule que lorsque les dépendances changent
  const options = useMemo(
    () => ({
      fpsLimit: 60,
      particles: {
        number: { value: 100, density: { enable: true } },
        color: { value: ["#ff6b6b", "#feca57", "#48dbfb"] },
        shape: { type: "circle" },
        opacity: { value: { min: 0.3, max: 0.7 } },
        size: { value: { min: 2, max: 5 } },
        links: {
          enable: true,
          distance: 120,
          color: "random",
          opacity: 0.3,
        },
        move: {
          enable: true,
          speed: 1,
          outModes: { default: "bounce" },
        },
      },
      background: { color: "#0d1117" },
    }),
    [],
  );

  // Réduisez la résolution du canvas sur les appareils à faible puissance
  const responsiveOptions = useMemo(
    () => ({
      ...options,
      detectRetina: window.devicePixelRatio <= 2,
      fpsLimit: window.innerWidth < 768 ? 30 : 60,
    }),
    [options],
  );

  return (
    <div>
      <button onClick={() => setVisible((v) => !v)}>{visible ? "Cacher" : "Afficher"} les particules</button>
      {visible && <Particles id="perf-particles" particlesLoaded={particlesLoaded} options={responsiveOptions} />}
    </div>
  );
}
```

**Conseils clés** :

- Utilisez toujours `useMemo` pour l'objet `options`.
- Utilisez toujours `useCallback` pour le gestionnaire `particlesLoaded`.
- Abaissez `fpsLimit` sur mobile.
- Définissez `detectRetina: false` sur les appareils avec un rapport de pixels >2 pour réduire de moitié la taille du canvas.
- Démontez `<Particles />` de manière conditionnelle lorsqu'il est hors écran.

---

## Configuration personnalisée

Un exemple personnalisé complet combinant formes multiples, interactivité, thèmes et un fond dégradé.

```jsx
import { useCallback, useMemo } from "react";
import Particles from "@tsparticles/react";

export default function CustomConfig() {
  const particlesLoaded = useCallback(async (container) => {
    console.log("Configuration personnalisée chargée", container);
  }, []);

  const options = useMemo(
    () => ({
      fullScreen: { enable: true, zIndex: 0 },
      fpsLimit: 60,
      particles: {
        number: { value: 60, density: { enable: true, width: 800, height: 800 } },
        color: {
          value: ["#ff6b6b", "#feca57", "#48dbfb", "#ff9ff3", "#54a0ff"],
        },
        shape: {
          type: ["circle", "triangle", "polygon"],
          options: {
            polygon: { sides: 6 },
          },
        },
        opacity: { value: { min: 0.4, max: 0.8 } },
        size: { value: { min: 3, max: 8 } },
        links: {
          enable: true,
          distance: 200,
          color: "#ffffff",
          opacity: 0.15,
          width: 1,
        },
        move: {
          enable: true,
          speed: 2,
          direction: "none",
          random: true,
          outModes: { default: "out" },
        },
      },
      interactivity: {
        events: {
          onHover: { enable: true, mode: "attract" },
          onClick: { enable: true, mode: "repulse" },
        },
        modes: {
          attract: { distance: 200, duration: 0.4, factor: 1 },
          repulse: { distance: 200, duration: 0.4 },
        },
      },
      background: { color: "#0f0f23" },
      themes: [
        {
          name: "light",
          default: { value: false },
          options: {
            background: { color: "#f0f0f5" },
            particles: {
              color: { value: ["#e74c3c", "#2ecc71", "#3498db", "#f1c40f"] },
              links: { color: "#333333", opacity: 0.2 },
              opacity: { value: { min: 0.5, max: 0.9 } },
            },
          },
        },
      ],
    }),
    [],
  );

  return <Particles id="custom-config" particlesLoaded={particlesLoaded} options={options} />;
}
```

---

Vous avez maintenant couvert les modèles principaux pour utiliser tsParticles dans React. Chaque exemple est autonome et prêt à être intégré dans un fichier composant.
