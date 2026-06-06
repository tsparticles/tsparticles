# Intégration jQuery

Intégrez tsParticles dans vos projets basés sur jQuery avec l'encapsuleur officiel du plugin jQuery.

## Installation

### Via CDN

Incluez jQuery, tsParticles et le plugin jQuery via des balises script :

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.0/jquery.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/tsparticles@4/tsparticles.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/jquery@4/tsparticles.jquery.min.js"></script>
```

---

### Via npm + Build

Installez les paquets requis :

```bash
npm install jquery @tsparticles/jquery tsparticles
```

Importez dans votre projet :

```javascript
import $ from "jquery";
import "@tsparticles/jquery";
```

## Initialisation du moteur

Avant que les particules puissent être rendues, le moteur tsParticles doit être initialisé avec les fonctionnalités dont vous avez besoin. Cela se fait via `$.particles.init` :

```javascript
(async () => {
  await $.particles.init(async (engine) => {
    const { loadFull } = await import("tsparticles");
    await loadFull(engine);
  });
})();
```

> **Pourquoi est-ce nécessaire ?** tsParticles utilise une architecture modulaire. `loadFull` enregistre toutes les formes, interactions et mises à jour intégrées. Vous pouvez importer des bundles plus petits (ex. `tsparticles-slim`) pour réduire la taille du bundle.

## Utilisation de base

Une fois le moteur initialisé et le DOM prêt, sélectionnez un élément conteneur et appelez `.particles().load()` :

```javascript
$(document).ready(async () => {
  await $.particles.init(async (engine) => {
    const { loadFull } = await import("tsparticles");
    await loadFull(engine);
  });

  $("#tsparticles")
    .particles()
    .load({
      background: {
        color: "#0d47a1",
      },
      particles: {
        number: { value: 80 },
        links: { enable: true, color: "#ffffff" },
        move: { enable: true },
      },
    });
});
```

L'élément conteneur doit exister dans le DOM :

```html
<div id="tsparticles"></div>
```

## Configuration personnalisée

La méthode `.load()` accepte l'objet complet `ISourceOptions`. Voici un exemple complet :

```javascript
$("#tsparticles")
  .particles()
  .load({
    background: {
      color: "#000000",
    },
    fpsLimit: 120,
    particles: {
      color: {
        value: ["#ff0000", "#00ff00", "#0000ff"],
      },
      move: {
        direction: "none",
        enable: true,
        outModes: "bounce",
        speed: 4,
      },
      number: {
        density: {
          enable: true,
        },
        value: 60,
      },
      opacity: {
        value: 0.6,
      },
      shape: {
        type: ["circle", "square", "triangle"],
      },
      size: {
        value: { min: 2, max: 8 },
      },
      links: {
        enable: true,
        distance: 150,
        color: "#ffffff",
        opacity: 0.4,
        width: 1,
      },
    },
    interactivity: {
      events: {
        onClick: {
          enable: true,
          mode: "push",
        },
        onHover: {
          enable: true,
          mode: "repulse",
        },
      },
      modes: {
        push: {
          quantity: 4,
        },
        repulse: {
          distance: 200,
        },
      },
    },
  });
```

## Chargement de préréglage

Si vous avez installé un package de préréglage (ex. `tsparticles-preset-stars`), chargez-le lors de l'initialisation du moteur et référencez-le dans la configuration :

```bash
npm install tsparticles-preset-stars
```

```javascript
(async () => {
  await $.particles.init(async (engine) => {
    const { loadStarsPreset } = await import("tsparticles-preset-stars");
    await loadStarsPreset(engine);
  });

  $("#tsparticles")
    .particles()
    .load({
      preset: "stars",
      background: { color: "#0d47a1" },
    });
})();
```

## Gestion des événements et contrôle du conteneur

`.particles()` retourne une instance de plugin jQuery. Pour accéder au `Container` tsParticles sous-jacent et appeler des méthodes comme `play()`, `pause()` ou `destroy()` :

```javascript
const $container = $("#tsparticles");

// Charger les particules
$container.particles().load({
  /* options */
});

// Lecture/pause après quelques secondes
setTimeout(() => {
  const container = $container.particles().getContainer();
  container?.pause();
}, 5000);
```

## Exemple complet

Voici une page HTML complète et autonome qui charge tsParticles via CDN et affiche une scène de particules avec effets interactifs :

```html
<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>tsParticles + jQuery</title>
    <style>
      #tsparticles {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background: #0d47a1;
      }
    </style>
  </head>
  <body>
    <div id="tsparticles"></div>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.0/jquery.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/tsparticles@4/tsparticles.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@tsparticles/jquery@4/tsparticles.jquery.min.js"></script>
    <script>
      $(document).ready(async () => {
        await $.particles.init(async (engine) => {
          await tsParticles.loadFull(engine);
        });

        $("#tsparticles")
          .particles()
          .load({
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
            background: { color: "#0d47a1" },
          });
      });
    </script>
  </body>
</html>
```

## Référence API

| Méthode                            | Description                                                  |
| ---------------------------------- | ------------------------------------------------------------ |
| `$.particles.init(fn)`             | Initialiser le moteur avec un callback de chargeur           |
| `$(el).particles()`                | Créer une instance du plugin de particules sur l'élément     |
| `$(el).particles().load(opts)`     | Charger et démarrer la configuration des particules          |
| `$(el).particles().destroy()`      | Détruire l'instance de particules et nettoyer                |
| `$(el).particles().getContainer()` | Retourner le `Container` sous-jacent pour contrôle impératif |
