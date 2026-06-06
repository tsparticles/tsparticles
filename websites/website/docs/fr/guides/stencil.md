---
title: Guide Stencil
description: Guide complet pour intégrer tsParticles avec des composants Stencil.
---

# Guide Stencil

## Table des matières

1. [Installation](#installation)
2. [Enregistrement des éléments personnalisés](#enregistrement-des-éléments-personnalisés)
3. [Utilisation de base](#utilisation-de-base)
4. [Initialisation du moteur](#initialisation-du-moteur)
5. [Configuration personnalisée](#configuration-personnalisée)
6. [Cycle de vie du composant](#cycle-de-vie-du-composant)
7. [Exemple TypeScript](#exemple-typescript)

---

## Installation

Installez l'encapsuleur Stencil et le moteur tsParticles via npm :

```bash
npm install @tsparticles/stencil tsparticles
```

Installez optionnellement un bundle de préréglage pour réduire la configuration manuelle :

```bash
npm install @tsparticles/slim
```

---

## Enregistrement des éléments personnalisés

Le package `@tsparticles/stencil` fournit une fonction `defineCustomElements` qui enregistre l'élément personnalisé `<stencil-particles>` auprès du navigateur. Appelez-la une fois avant d'utiliser le composant n'importe où dans votre application.

```tsx
import { defineCustomElements } from "@tsparticles/stencil/loader";

// Enregistrer l'élément <stencil-particles>
defineCustomElements();
```

Pour les projets Stencil utilisant le chargement paresseux, appelez-la dans `componentWillLoad` ou dans le composant racine de votre application pour garantir que l'élément est disponible avant le rendu.

---

## Utilisation de base

Une fois l'élément personnalisé enregistré, vous pouvez utiliser `<stencil-particles>` dans votre JSX avec une prop `options` et un callback `init` pour charger les fonctionnalités moteur requises.

```tsx
import { Component, h } from "@stencil/core";
import type { ISourceOptions } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

const options: ISourceOptions = {
  fpsLimit: 60,
  particles: {
    number: { value: 80 },
    color: { value: "#00d4ff" },
    shape: { type: "circle" },
    opacity: { value: 0.6 },
    size: { value: { min: 2, max: 5 } },
    links: {
      enable: true,
      distance: 150,
      color: "#00d4ff",
      opacity: 0.3,
      width: 1,
    },
    move: {
      enable: true,
      speed: 1.5,
      direction: "none",
      random: true,
      outModes: { default: "bounce" },
    },
  },
  background: { color: "#0d1117" },
};

@Component({ tag: "my-particles" })
export class MyParticles {
  render() {
    return (
      <stencil-particles
        container-id="tsparticles"
        options={options}
        init={async (engine) => {
          await loadSlim(engine);
        }}
      />
    );
  }
}
```

---

## Initialisation du moteur

La prop `init` reçoit l'instance du moteur et vous permet de charger les fonctionnalités dont vous avez besoin. C'est l'endroit recommandé pour appeler `loadSlim`, `loadFull` ou des plugins individuels de mise à jour/interaction.

```tsx
import { loadSlim } from "@tsparticles/slim";
import { loadFull } from "tsparticles";
import { loadConfettiPreset } from "@tsparticles/preset-confetti";

// Option A : léger (cercles, mouvement de base, liaisons)
init={async engine => { await loadSlim(engine); }}

// Option B : ensemble complet (toutes formes, effets, préréglages)
init={async engine => { await loadFull(engine); }}

// Option C : préréglages (confetti, feux d'artifice, neige, étoiles)
init={async engine => { await loadConfettiPreset(engine); }}
```

L'instance du moteur est également accessible après l'initialisation via l'attribut `container-id`, vous permettant de contrôler le système de particules par programmation plus tard si nécessaire.

---

## Configuration personnalisée

Voici une configuration complète avec interactivité, types de formes multiples et modes survol/clic.

```tsx
import { Component, h } from "@stencil/core";
import type { ISourceOptions } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

const fullOptions: ISourceOptions = {
  fpsLimit: 60,
  particles: {
    number: {
      value: 60,
      density: { enable: true, width: 800, height: 800 },
    },
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
      straight: false,
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
  background: {
    color: "#0f0f23",
  },
};

@Component({ tag: "app-particles" })
export class AppParticles {
  render() {
    return (
      <stencil-particles
        container-id="tsparticles"
        options={fullOptions}
        init={async (engine) => {
          await loadSlim(engine);
        }}
      />
    );
  }
}
```

---

## Cycle de vie du composant

Dans Stencil, le hook de cycle de vie recommandé pour la configuration unique est `componentWillLoad`. Utilisez-le pour enregistrer les éléments personnalisés et gérer l'état d'initialisation afin que le composant `<stencil-particles>` ne soit rendu que lorsque le moteur est préparé.

```tsx
import { Component, h, State } from "@stencil/core";
import type { ISourceOptions } from "@tsparticles/engine";
import { defineCustomElements } from "@tsparticles/stencil/loader";
import { loadSlim } from "@tsparticles/slim";

@Component({ tag: "app-root" })
export class AppRoot {
  @State() private engineReady = false;

  private options: ISourceOptions = {
    particles: {
      number: { value: 50 },
      color: { value: "#ffffff" },
      shape: { type: "circle" },
      opacity: { value: 0.6 },
      size: { value: { min: 1, max: 4 } },
      move: {
        enable: true,
        speed: 1,
        outModes: { default: "bounce" },
      },
    },
    background: { color: "#1a1a2e" },
  };

  componentWillLoad() {
    defineCustomElements();
    this.engineReady = true;
  }

  render() {
    return (
      <div>
        <h1>tsParticles + Stencil</h1>
        {this.engineReady && (
          <stencil-particles
            container-id="tsparticles"
            options={this.options}
            init={async (engine) => {
              await loadSlim(engine);
            }}
          />
        )}
      </div>
    );
  }
}
```

Utiliser `@State()` garantit que le composant se réaffiche lorsque le moteur devient prêt, et le rendu conditionnel empêche le conteneur de particules de se monter avant que l'élément personnalisé ne soit défini.

---

## Exemple TypeScript

Voici un composant d'application Stencil complet et typé qui intègre tsParticles avec le préréglage slim, l'interactivité au survol et un thème sombre personnalisé.

```tsx
import { Component, h, State, Prop } from "@stencil/core";
import type { Container, Engine, ISourceOptions } from "@tsparticles/engine";
import { defineCustomElements } from "@tsparticles/stencil/loader";
import { loadSlim } from "@tsparticles/slim";

@Component({
  tag: "app-home",
  styleUrl: "app-home.css",
  shadow: true,
})
export class AppHome {
  @State() private initialized = false;

  @Prop() readonly title: string = "Bienvenue";

  private container?: Container;

  private readonly options: ISourceOptions = {
    fullScreen: { enable: true, zIndex: -1 },
    fpsLimit: 60,
    particles: {
      number: { value: 80, density: { enable: true } },
      color: { value: "#6366f1" },
      shape: { type: "circle" },
      opacity: { value: { min: 0.3, max: 0.7 } },
      size: { value: { min: 2, max: 6 } },
      links: {
        enable: true,
        distance: 160,
        color: "#6366f1",
        opacity: 0.25,
        width: 1,
      },
      move: {
        enable: true,
        speed: 1.2,
        direction: "none",
        random: false,
        straight: false,
        outModes: { default: "bounce" },
      },
    },
    interactivity: {
      events: {
        onHover: { enable: true, mode: "grab" },
        onClick: { enable: true, mode: "push" },
      },
      modes: {
        grab: { distance: 180, links: { opacity: 0.6 } },
        push: { quantity: 3 },
      },
    },
    background: { color: "#0a0a1a" },
  };

  componentWillLoad() {
    defineCustomElements();
    this.initialized = true;
  }

  private handleInit = async (engine: Engine): Promise<void> => {
    await loadSlim(engine);
  };

  private handleLoaded = async (container?: Container): Promise<void> => {
    this.container = container;
    console.log("Conteneur de particules chargé :", container?.id);
  };

  render() {
    return (
      <div class="home">
        <h1>{this.title}</h1>
        <p>Propulsé par tsParticles et Stencil</p>

        {this.initialized && (
          <stencil-particles
            container-id="tsparticles"
            options={this.options}
            init={this.handleInit}
            particlesLoaded={this.handleLoaded}
          />
        )}
      </div>
    );
  }
}
```

L'événement `particlesLoaded` se déclenche une fois la première image rendue, vous donnant accès à l'instance `Container` pour un contrôle programmatique (lecture, pause, arrêt, changement de thèmes).

---

Vous avez maintenant tout ce qu'il faut pour intégrer tsParticles dans une application Stencil. Chaque exemple est autonome et prêt à être copié dans votre projet.
