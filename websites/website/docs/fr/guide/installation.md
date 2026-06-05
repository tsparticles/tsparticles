# Installation

## Choisissez votre parcours

| Scénario                            | Commande                                          |
| ----------------------------------- | ------------------------------------------------- |
| Démarrage rapide (recommandé)       | `pnpm add @tsparticles/engine @tsparticles/slim`  |
| Minimum indispensable               | `pnpm add @tsparticles/engine @tsparticles/basic` |
| Ensemble complet de fonctionnalités | `pnpm add @tsparticles/engine tsparticles`        |
| Tout l'écosystème                   | `pnpm add @tsparticles/engine @tsparticles/all`   |
| Confettis uniquement                | `pnpm add @tsparticles/confetti`                  |
| Feux d'artifice uniquement          | `pnpm add @tsparticles/fireworks`                 |
| Fond de particules                  | `pnpm add @tsparticles/particles`                 |
| Effet rubans                        | `pnpm add @tsparticles/ribbons`                   |

> **Important** : `@tsparticles/engine` seul ne dessine rien. Vous devez toujours ajouter un bundle (pour charger les formes et animations) ou des plugins individuels. Voir le [guide des bundles](/fr/guide/bundles).

## Avec npm

```bash
# engine + slim (recommandé pour la plupart des projets)
npm install @tsparticles/engine @tsparticles/slim

# engine + basic (minimum)
npm install @tsparticles/engine @tsparticles/basic

# engine + full (tsparticles)
npm install @tsparticles/engine tsparticles

# engine + all (tout)
npm install @tsparticles/engine @tsparticles/all

# Bundle à API dédiée (pas besoin d'engine explicite)
npm install @tsparticles/confetti
npm install @tsparticles/fireworks
npm install @tsparticles/particles
npm install @tsparticles/ribbons
```

## Avec yarn

```bash
yarn add @tsparticles/engine @tsparticles/slim
# ... même schéma pour les autres bundles
```

## Avec pnpm

```bash
pnpm add @tsparticles/engine @tsparticles/slim
# ... même schéma pour les autres bundles
```

## Avec CDN (balise `<script>`)

Tous les packages sont disponibles sur jsDelivr, unpkg et cdnjs.

### jsDelivr

| Bundle                     | URL                                                                                         |
| -------------------------- | ------------------------------------------------------------------------------------------- |
| Engine                     | `https://cdn.jsdelivr.net/npm/@tsparticles/engine@4/tsparticles.engine.min.js`              |
| Basic                      | `https://cdn.jsdelivr.net/npm/@tsparticles/basic@4/tsparticles.basic.bundle.min.js`         |
| Slim                       | `https://cdn.jsdelivr.net/npm/@tsparticles/slim@4/tsparticles.slim.bundle.min.js`           |
| Full (`tsparticles`)       | `https://cdn.jsdelivr.net/npm/tsparticles@4/tsparticles.bundle.min.js`                      |
| All                        | `https://cdn.jsdelivr.net/npm/@tsparticles/all@4/tsparticles.all.bundle.min.js`             |
| Confetti                   | `https://cdn.jsdelivr.net/npm/@tsparticles/confetti@4/tsparticles.confetti.bundle.min.js`   |
| Fireworks                  | `https://cdn.jsdelivr.net/npm/@tsparticles/fireworks@4/tsparticles.fireworks.bundle.min.js` |
| Particles                  | `https://cdn.jsdelivr.net/npm/@tsparticles/particles@4/tsparticles.particles.bundle.min.js` |
| Ribbons                    | `https://cdn.jsdelivr.net/npm/@tsparticles/ribbons@4/tsparticles.ribbons.bundle.min.js`     |
| Compatibilité particles.js | `https://cdn.jsdelivr.net/npm/@tsparticles/pjs@4/tsparticles.pjs.min.js`                    |

### unpkg

Même structure : `https://unpkg.com/{package-name}@{version}/{filename}`

Exemple :
`https://unpkg.com/@tsparticles/slim@4/tsparticles.slim.bundle.min.js`

### cdnjs

`https://cdnjs.com/libraries/tsparticles`

## Exemples d'import

### Avec bundler (import ES module)

```ts
// Engine + bundle loader
import { tsParticles } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

await loadSlim(tsParticles);
await tsParticles.load({ id: "tsparticles", options: { ... } });
```

### Avec CommonJS (require)

```ts
const { tsParticles } = require("@tsparticles/engine");
const { loadSlim } = require("@tsparticles/slim");

(async () => {
  await loadSlim(tsParticles);
  await tsParticles.load({ id: "tsparticles", options: { ... } });
})();
```

### Avec CDN (balise script)

```html
<!-- 1. Engine -->
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/engine@4/tsparticles.engine.min.js"></script>
<!-- 2. Bundle (expose loadBasic/loadSlim/loadFull/loadAll globalement) -->
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/slim@4/tsparticles.slim.bundle.min.js"></script>
<!-- 3. Votre script -->
<script>
  (async () => {
    await loadSlim(tsParticles); // enregistre les fonctionnalités
    await tsParticles.load({
      id: "tsparticles",
      options: {
        particles: {
          number: { value: 60 },
          move: { enable: true },
        },
      },
    });
  })();
</script>
```

Avec les bundles à API dédiée :

```html
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/confetti@4/tsparticles.confetti.bundle.min.js"></script>
<script>
  confetti({ particleCount: 100, spread: 70 });
</script>
```

## Pages associées

- [Pour démarrer](/fr/guide/getting-started)
- [Guide des bundles](/fr/guide/bundles)
- [Catalogue de préréglages](/demos/presets)
- [Wrappers framework](/fr/guide/wrappers)
