---
title: Guide Ember
description: Guide complet pour intégrer tsParticles avec des applications Ember.js.
---

# Guide Ember

## Table des matières

1. [Installation](#installation)
2. [Initialisation du moteur](#initialisation-du-moteur)
3. [Utilisation de base](#utilisation-de-base)
4. [Configuration personnalisée](#configuration-personnalisée)
5. [Gestion des événements](#gestion-des-événements)
6. [Rendu conditionnel](#rendu-conditionnel)
7. [Exemple TypeScript](#exemple-typescript)

---

## Installation

Installez l'addon Ember et le moteur tsParticles via ember-cli :

```bash
ember install @tsparticles/ember
```

Ceci installera l'addon et sa dépendance directe `tsparticles`. Vous pouvez optionnellement ajouter des packages de préréglages :

```bash
npm install @tsparticles/slim
```

---

## Initialisation du moteur

L'addon exporte un utilitaire `initParticlesEngine` que vous appelez une fois au niveau de l'application. Il reçoit un callback asynchrone où vous chargez les fonctionnalités, préréglages ou formes dont votre application a besoin.

```typescript
import { initParticlesEngine } from "@tsparticles/ember/utils/init-particles-engine";
import { loadFull } from "tsparticles";

// Appelez ceci lors du bootstrap de l'application
if (typeof window !== "undefined") {
  void initParticlesEngine(async (engine) => {
    await loadFull(engine);
  });
}
```

Les emplacements typiques pour cet appel sont le hook `beforeModel` de la route de l'application, le constructeur d'un contrôleur d'application, ou un initialiseur d'instance. Le singleton du moteur est initialisé une fois et partagé entre tous les composants `<Particles>` de votre application.

---

## Utilisation de base

Après avoir initialisé le moteur, utilisez le composant `<Particles>` dans n'importe quel template. Passez votre configuration de particules via l'argument `@options`.

```hbs
{{! app/templates/application.hbs }}

<Particles @options={{this.options}} />
```

```typescript
// app/controllers/application.ts
import Controller from "@ember/controller";
import type { ISourceOptions } from "@tsparticles/engine";

export default class ApplicationController extends Controller {
  options: ISourceOptions = {
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
}
```

---

## Configuration personnalisée

Construisez une configuration plus riche avec interactivité, formes multiples et densité réactive.

```typescript
import Controller from "@ember/controller";
import type { ISourceOptions } from "@tsparticles/engine";

export default class IndexController extends Controller {
  options: ISourceOptions = {
    fullScreen: { enable: true, zIndex: -1 },
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
    background: { color: "#0f0f23" },
  };
}
```

```hbs
<Particles @options={{this.options}} />
```

---

## Gestion des événements

Le composant `<Particles>` déclenche une action `@particlesLoaded` lorsque le conteneur a fini de s'initialiser et que la première image est rendue. Utilisez-la pour accéder à l'instance `Container` pour un contrôle programmatique.

```typescript
import Controller from "@ember/controller";
import { action } from "@ember/object";
import type { Container, ISourceOptions } from "@tsparticles/engine";

export default class ApplicationController extends Controller {
  options: ISourceOptions = {
    /* ... */
  };

  @action
  loadedCallback(container: Container) {
    console.log("Particules chargées", container.id);

    // Exemple de contrôle programmatique :
    setTimeout(() => {
      container.pause();
      console.log("Particules mises en pause après 5 secondes");
    }, 5000);
  }
}
```

```hbs
<Particles @options={{this.options}} @particlesLoaded={{this.loadedCallback}} />
```

Vous pouvez également utiliser le modèle de callback en ligne avec un assistant de template si vous préférez ne pas définir d'action séparée.

---

## Rendu conditionnel

Utilisez le helper `{{if}}` d'Ember avec une propriété `@tracked` pour contrôler quand le composant `<Particles>` est rendu. Ceci est utile lorsque l'initialisation du moteur est asynchrone et que vous voulez éviter de rendre le composant avant que le moteur ne soit prêt.

```typescript
import Controller from "@ember/controller";
import { tracked } from "@glimmer/tracking";
import { action } from "@ember/object";
import type { Container, Engine, ISourceOptions } from "@tsparticles/engine";
import { initParticlesEngine } from "@tsparticles/ember/utils/init-particles-engine";
import { loadSlim } from "@tsparticles/slim";

export default class ApplicationController extends Controller {
  @tracked engineReady = false;

  options: ISourceOptions = {
    particles: {
      number: { value: 50 },
      color: { value: "#ffffff" },
      shape: { type: "circle" },
      opacity: { value: 0.6 },
      size: { value: { min: 1, max: 4 } },
      move: { enable: true, speed: 1, outModes: { default: "bounce" } },
    },
    background: { color: "#1a1a2e" },
  };

  constructor(...args: any[]) {
    super(...args);
    if (typeof window !== "undefined") {
      void initParticlesEngine(async (engine: Engine) => {
        await loadSlim(engine);
      }).then(() => {
        this.engineReady = true;
      });
    }
  }
}
```

```hbs
{{#if this.engineReady}}
  <Particles @options={{this.options}} @particlesLoaded={{this.loadedCallback}} />
{{else}}
  <p>Chargement des particules...</p>
{{/if}}
```

Le décorateur `@tracked` garantit que le template se ré-affiche automatiquement une fois la promesse résolue.

---

## Exemple TypeScript

Voici un contrôleur d'application Ember complet et typé démontrant le modèle d'intégration complet avec le préréglage slim, l'interactivité et la gestion du cycle de vie.

```typescript
// app/controllers/application.ts
import Controller from "@ember/controller";
import { tracked } from "@glimmer/tracking";
import { action } from "@ember/object";
import type { Container, Engine, ISourceOptions } from "@tsparticles/engine";
import { initParticlesEngine } from "@tsparticles/ember/utils/init-particles-engine";
import { loadSlim } from "@tsparticles/slim";

export default class ApplicationController extends Controller {
  @tracked private engineReady = false;

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

  constructor(...args: any[]) {
    super(...args);
    if (typeof window !== "undefined") {
      void initParticlesEngine(async (engine: Engine) => {
        await loadSlim(engine);
      }).then(() => {
        this.engineReady = true;
      });
    }
  }

  @action
  private handleParticlesLoaded(container: Container): void {
    this.container = container;
    console.log("Particules chargées dans le conteneur :", container.id);
  }
}
```

```hbs
{{! app/templates/application.hbs }}

{{#if this.engineReady}}
  <div class="app-container">
    <h1>tsParticles + Ember</h1>
    <Particles @options={{this.options}} @particlesLoaded={{this.handleParticlesLoaded}} />
  </div>
{{else}}
  <div class="loading">
    <p>Initialisation du moteur de particules...</p>
  </div>
{{/if}}
```

---

Vous avez maintenant tout ce qu'il faut pour intégrer tsParticles dans une application Ember.js. Chaque exemple est autonome et prêt à être copié dans votre projet.
