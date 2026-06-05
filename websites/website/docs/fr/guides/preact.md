---
title: Preact
description: Intégrez tsParticles avec Preact en utilisant l'encapsuleur officiel @tsparticles/preact.
---

# Intégration Preact

Le package `@tsparticles/preact` fournit un composant `<Particles>` qui fonctionne parfaitement avec Preact, incluant les modèles de composants à la fois par classe et fonctionnels.

## Installation

```bash
npm install @tsparticles/preact tsparticles
```

Le package `@tsparticles/preact` est livré avec des déclarations TypeScript. Aucun package de types supplémentaire n'est nécessaire.

## Initialisation du moteur

Avant de pouvoir afficher des particules, vous devez initialiser le moteur avec les plugins dont vous avez besoin. Appelez `initParticlesEngine` une fois, avant le rendu de votre application.

```typescript
import { initParticlesEngine } from "@tsparticles/preact";
import { loadFull } from "tsparticles";

void initParticlesEngine(async (engine) => {
  await loadFull(engine);
});
```

Pour des bundles plus petits, chargez uniquement les fonctionnalités dont vous avez besoin :

```typescript
import { initParticlesEngine } from "@tsparticles/preact";
import { loadBasic } from "@tsparticles/basic";
import { loadPolygonMaskPlugin } from "@tsparticles/plugin-polygon-mask";

void initParticlesEngine(async (engine) => {
  await loadBasic(engine);
  await loadPolygonMaskPlugin(engine);
});
```

`initParticlesEngine` retourne une promesse qui se résout une fois que tous les plugins sont enregistrés. Le composant `<Particles>` ne sera pas rendu tant que l'initialisation n'est pas terminée.

## Utilisation de base

Une fois le moteur initialisé, utilisez le composant `<Particles>` n'importe où dans votre application :

```jsx
import Particles from "@tsparticles/preact";
import configs from "@tsparticles/configs";

function App() {
  return <Particles id="tsparticles" options={configs.basic} />;
}
```

L'attribut `id` définit à la fois l'ID de l'élément DOM et l'identifiant du conteneur utilisé en interne par tsParticles. La prop `options` accepte tout objet de configuration tsParticles valide.

## Changement de préréglage

Passez d'un préréglage à un autre dynamiquement en modifiant la prop `options` :

```jsx
import { useState } from "preact/hooks";
import Particles from "@tsparticles/preact";
import configs from "@tsparticles/configs";

function App() {
  const [preset, setPreset] = useState("basic");

  const presets = {
    basic: configs.basic,
    snow: configs.snow,
    stars: configs.stars,
    fireworks: configs.fireworks,
  };

  return (
    <div>
      <select onChange={(e) => setPreset(e.currentTarget.value)}>
        <option value="basic">Basique</option>
        <option value="snow">Neige</option>
        <option value="stars">Étoiles</option>
        <option value="fireworks">Feux d'artifice</option>
      </select>
      <Particles id="tsparticles" key={preset} options={presets[preset]} />
    </div>
  );
}
```

Utiliser une prop `key` force Preact à démonter le composant, redémarrant complètement les particules pour chaque préréglage.

## Composant à base de classe

Pour les composants à base de classe, initialisez le moteur dans `componentDidMount` et gérez l'état dans `componentDidUpdate` :

```jsx
import { Component } from "preact";
import Particles, { initParticlesEngine } from "@tsparticles/preact";
import { loadFull } from "tsparticles";
import configs from "@tsparticles/configs";

export default class ParticlesApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      engineReady: false,
      options: configs.basic,
    };
  }

  componentDidMount() {
    initParticlesEngine(async (engine) => {
      await loadFull(engine);
    }).then(() => {
      this.setState({ engineReady: true });
    });
  }

  handlePresetChange = (e) => {
    const presets = {
      basic: configs.basic,
      snow: configs.snow,
      stars: configs.stars,
    };
    this.setState({ options: presets[e.currentTarget.value] || configs.basic });
  };

  render() {
    const { engineReady, options } = this.state;

    return (
      <div>
        <select onChange={this.handlePresetChange}>
          <option value="basic">Basique</option>
          <option value="snow">Neige</option>
          <option value="stars">Étoiles</option>
        </select>
        {engineReady && <Particles id="tsparticles" options={options} />}
      </div>
    );
  }
}
```

## Composant fonctionnel

Avec les hooks, utilisez `useState` et `useEffect` pour initialiser le moteur et gérer la configuration :

```jsx
import { useState, useEffect } from "preact/hooks";
import Particles, { initParticlesEngine } from "@tsparticles/preact";
import { loadFull } from "tsparticles";
import configs from "@tsparticles/configs";

export default function App() {
  const [engineReady, setEngineReady] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadFull(engine);
    }).then(() => setEngineReady(true));
  }, []);

  return <div>{engineReady && <Particles id="tsparticles" options={configs.snow} />}</div>;
}
```

## Configuration personnalisée

Définissez un objet de configuration complet directement au lieu d'utiliser des préréglages :

```jsx
import { useState, useEffect } from "preact/hooks";
import Particles, { initParticlesEngine } from "@tsparticles/preact";
import { loadFull } from "tsparticles";

export default function App() {
  const [engineReady, setEngineReady] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadFull(engine);
    }).then(() => setEngineReady(true));
  }, []);

  const options = {
    background: {
      color: "#0d1117",
    },
    fpsLimit: 120,
    particles: {
      color: {
        value: "#58a6ff",
      },
      links: {
        color: "#58a6ff",
        enable: true,
        opacity: 0.4,
        distance: 150,
      },
      move: {
        enable: true,
        speed: 2,
      },
      number: {
        value: 80,
        density: {
          enable: true,
        },
      },
      opacity: {
        value: 0.5,
      },
      size: {
        value: { min: 1, max: 4 },
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
      modes: {
        repulse: {
          distance: 100,
        },
        push: {
          quantity: 4,
        },
      },
    },
  };

  return <>{engineReady && <Particles id="tsparticles" options={options} />}</>;
}
```

## Gestion des événements

Utilisez le callback `particlesLoaded` pour accéder à l'instance `Container` de tsParticles après que les particules sont entièrement rendues :

```jsx
import { useCallback, useState, useEffect } from "preact/hooks";
import Particles, { initParticlesEngine } from "@tsparticles/preact";
import { loadFull } from "tsparticles";
import configs from "@tsparticles/configs";

export default function App() {
  const [engineReady, setEngineReady] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadFull(engine);
    }).then(() => setEngineReady(true));
  }, []);

  const handleParticlesLoaded = useCallback(async (container) => {
    console.log("Conteneur de particules prêt :", container);
    container?.refresh();
  }, []);

  return (
    <div>
      {engineReady && <Particles id="tsparticles" options={configs.basic} particlesLoaded={handleParticlesLoaded} />}
    </div>
  );
}
```

Le callback `particlesLoaded` reçoit l'instance `Container`, que vous pouvez utiliser pour appeler des méthodes comme `refresh()`, `pause()`, `play()` ou `destroy()`.
