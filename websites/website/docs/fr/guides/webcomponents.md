# Web Components

Utilisez tsParticles avec les Web Components natifs via le package `@tsparticles/webcomponents`. Cette approche ne nécessite aucun framework — juste du JavaScript vanilla et des éléments personnalisés.

## Installation

### Via CDN

Incluez le cœur tsParticles et le bundle Web Components :

```html
<script src="https://cdn.jsdelivr.net/npm/tsparticles@4/tsparticles.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/webcomponents@4/tsparticles.webcomponents.min.js"></script>
```

### Via npm + Build

```bash
npm install @tsparticles/webcomponents tsparticles
```

Importez ensuite dans votre bundle JavaScript :

```javascript
import { initParticlesEngine, defineParticlesElement } from "@tsparticles/webcomponents";
```

## Initialisation du moteur

Avant que l'élément `<web-particles>` puisse être rendu, le moteur doit être initialisé avec les fonctionnalités dont vous avez besoin. Appelez `initParticlesEngine` avec un callback qui charge les plugins souhaités :

```javascript
import { initParticlesEngine } from "@tsparticles/webcomponents";

const { loadFull } = await import("tsparticles");

await initParticlesEngine(async (engine) => {
  await loadFull(engine);
});
```

> **Pourquoi `loadFull` ?** Il enregistre toutes les formes intégrées (cercle, carré, polygone, image, etc.), les interactions (survol, clic) et les mises à jour (opacité, taille, couleur, etc.). Pour un bundle plus petit, utilisez `tsparticles-slim` ou sélectionnez des plugins individuels.

## Définition de l'élément personnalisé

Après l'initialisation du moteur, enregistrez l'élément personnalisé `<web-particles>` :

```javascript
import { defineParticlesElement } from "@tsparticles/webcomponents";

defineParticlesElement();
```

Ceci enregistre la balise `web-particles` auprès du `CustomElementRegistry` du navigateur. Il est sûr d'appeler plusieurs fois — les enregistrements en double sont ignorés.

## Utilisation de base

Une fois que `initParticlesEngine` et `defineParticlesElement` ont été exécutés, utilisez l'élément directement en HTML :

```html
<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>tsParticles Web Components</title>
  </head>
  <body>
    <web-particles id="tsparticles"></web-particles>

    <script type="module">
      import { initParticlesEngine, defineParticlesElement } from "@tsparticles/webcomponents";

      const { loadFull } = await import("tsparticles");

      await initParticlesEngine(async (engine) => {
        await loadFull(engine);
      });

      defineParticlesElement();

      const el = document.getElementById("tsparticles");
      el.options = {
        background: { color: "#0d47a1" },
        particles: {
          number: { value: 80 },
          links: { enable: true, color: "#ffffff" },
          move: { enable: true, speed: 2 },
        },
      };
    </script>
  </body>
</html>
```

## Configuration personnalisée

L'élément `<web-particles>` accepte la configuration via la propriété `options` (objet JavaScript) ou via JSON dans l'attribut `options`.

### Via une propriété JavaScript

```javascript
const el = document.querySelector("web-particles");
el.options = {
  background: { color: "#000000" },
  fpsLimit: 60,
  particles: {
    color: { value: ["#ff0000", "#00ff00", "#0000ff"] },
    links: {
      enable: true,
      distance: 150,
      color: "#ffffff",
      opacity: 0.4,
    },
    move: {
      enable: true,
      speed: 3,
      outModes: "bounce",
    },
    number: { value: 60 },
    opacity: { value: 0.6 },
    shape: { type: ["circle", "square"] },
    size: { value: { min: 2, max: 6 } },
  },
  interactivity: {
    events: {
      onHover: { enable: true, mode: "repulse" },
      onClick: { enable: true, mode: "push" },
    },
    modes: {
      repulse: { distance: 200 },
      push: { quantity: 4 },
    },
  },
};
```

### Via un attribut HTML (JSON)

```html
<web-particles
  id="tsparticles"
  options='{
    "background": { "color": "#0d47a1" },
    "particles": {
      "number": { "value": 50 },
      "links": { "enable": true, "color": "#ffffff" },
      "move": { "enable": true, "speed": 2 }
    }
  }'
></web-particles>
```

> Lorsque vous utilisez l'attribut `options`, la valeur doit être du JSON valide. L'assignation de propriété est préférée pour les configurations complexes.

## Création dynamique

Vous pouvez créer des éléments `<web-particles>` entièrement en JavaScript et les ajouter au DOM à tout moment :

```javascript
import { initParticlesEngine, defineParticlesElement } from "@tsparticles/webcomponents";

const { loadFull } = await import("tsparticles");

await initParticlesEngine(async (engine) => {
  await loadFull(engine);
});

defineParticlesElement();

function createParticles(container, config) {
  const el = document.createElement("web-particles");
  el.id = "dynamic-particles";
  el.style.position = "absolute";
  el.style.width = "100%";
  el.style.height = "100%";
  el.style.top = "0";
  el.style.left = "0";
  el.options = config;
  container.appendChild(el);
  return el;
}

// Utilisation
const particles = createParticles(document.body, {
  background: { color: "#1a1a2e" },
  particles: {
    number: { value: 100 },
    links: { enable: true, color: "#e94560" },
    move: { enable: true, speed: 1 },
  },
});
```

## Extension de l'élément personnalisé

Vous pouvez sous-classer `ParticlesElement` pour créer votre propre élément personnalisé avec configuration intégrée :

```javascript
import { initParticlesEngine, ParticlesElement } from "@tsparticles/webcomponents";

const { loadFull } = await import("tsparticles");

await initParticlesEngine(async (engine) => {
  await loadFull(engine);
});

class MyParticlesBackground extends ParticlesElement {
  constructor() {
    super();
    this.style.position = "fixed";
    this.style.top = "0";
    this.style.left = "0";
    this.style.width = "100%";
    this.style.height = "100%";
    this.style.zIndex = "-1";
  }

  connectedCallback() {
    this.options = {
      background: { color: "#0d47a1" },
      particles: {
        number: { value: 80 },
        links: { enable: true, color: "#ffffff" },
        move: { enable: true, speed: 2 },
      },
    };
    super.connectedCallback();
  }
}

customElements.define("my-particles-bg", MyParticlesBackground);
```

Utilisation :

```html
<my-particles-bg></my-particles-bg>
```

## Accès et contrôle du conteneur

L'élément personnalisé expose l'instance `Container` de tsParticles pour un contrôle impératif :

```javascript
const el = document.querySelector("web-particles");

// Accéder au conteneur (disponible après connectedCallback)
const container = el.container;
container?.pause();
container?.play();

// Détruire et nettoyer
el.dispose();
```

## Exemple complet

Une page HTML complète utilisant le module Web Components avec des scripts CDN :

```html
<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Démo tsParticles Web Components</title>
    <style>
      body {
        margin: 0;
        overflow: hidden;
      }
      web-particles {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
      }
      .content {
        position: relative;
        z-index: 1;
        color: white;
        text-align: center;
        padding-top: 20vh;
        font-family: sans-serif;
      }
    </style>
  </head>
  <body>
    <div class="content">
      <h1>tsParticles + Web Components</h1>
      <p>Éléments personnalisés natifs, aucun framework requis.</p>
    </div>

    <web-particles id="tsparticles"></web-particles>

    <script type="module">
      import {
        initParticlesEngine,
        defineParticlesElement,
      } from "https://cdn.jsdelivr.net/npm/@tsparticles/webcomponents@4/tsparticles.webcomponents.min.js";

      const tsParticles = window.tPparticles;

      await initParticlesEngine(async (engine) => {
        await tsParticles.loadFull(engine);
      });

      defineParticlesElement();

      const el = document.getElementById("tsparticles");
      el.options = {
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
    </script>
  </body>
</html>
```

## Référence API

| Export / Propriété              | Type                     | Description                                                            |
| ------------------------------- | ------------------------ | ---------------------------------------------------------------------- |
| `initParticlesEngine(callback)` | `function`               | Initialise le moteur tsParticles avec des chargeurs de plugins         |
| `defineParticlesElement()`      | `function`               | Enregistre l'élément personnalisé `<web-particles>`                    |
| `ParticlesElement`              | `class`                  | Classe de base que vous pouvez étendre pour des éléments personnalisés |
| `element.options`               | `ISourceOptions`         | Obtenir/définir l'objet de configuration des particules                |
| `element.container`             | `Container \| undefined` | Référence en lecture seule au `Container` sous-jacent                  |
| `element.dispose()`             | `function`               | Détruire l'instance de particules et nettoyer les ressources           |
