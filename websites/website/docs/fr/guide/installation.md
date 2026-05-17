# Installation

Cette page reprend la matrice d'installation du README principal de `tsParticles`.

Reference officielle : <https://github.com/tsparticles/tsparticles/blob/main/README.md#library-installation>

## Choisir votre parcours

- **Demarrage rapide** : `@tsparticles/engine` + `@tsparticles/slim`
- **Runtime personnalise plus leger** : `@tsparticles/engine` + seulement les plugins necessaires
- **API ciblees** : `@tsparticles/particles`, `@tsparticles/confetti`, ou `@tsparticles/fireworks`
- **Toutes les fonctionnalites incluses** : `@tsparticles/all`

## Hebergement / CDN

Utilisez l'un de ces fournisseurs (ou hebergez vos fichiers buildes vous-meme).

### jsDelivr

- <https://www.jsdelivr.com/package/npm/@tsparticles/confetti>
- <https://www.jsdelivr.com/package/npm/@tsparticles/particles>
- <https://www.jsdelivr.com/package/npm/@tsparticles/engine>
- <https://www.jsdelivr.com/package/npm/@tsparticles/fireworks>
- <https://www.jsdelivr.com/package/npm/@tsparticles/basic>
- <https://www.jsdelivr.com/package/npm/@tsparticles/slim>
- <https://www.jsdelivr.com/package/npm/tsparticles>
- <https://www.jsdelivr.com/package/npm/@tsparticles/all>

### cdnjs

- <https://cdnjs.com/libraries/tsparticles>

### unpkg

- <https://unpkg.com/@tsparticles/confetti/>
- <https://unpkg.com/@tsparticles/particles/>
- <https://unpkg.com/@tsparticles/engine/>
- <https://unpkg.com/@tsparticles/fireworks/>
- <https://unpkg.com/@tsparticles/basic/>
- <https://unpkg.com/@tsparticles/slim/>
- <https://unpkg.com/tsparticles/>
- <https://unpkg.com/@tsparticles/all/>

## Installation via gestionnaire de packages

### npm

```bash
npm install @tsparticles/engine
```

### yarn

```bash
yarn add @tsparticles/engine
```

### pnpm

```bash
pnpm add @tsparticles/engine
```

## Import et require

```ts
const tsParticles = require("@tsparticles/engine");

// or

import { tsParticles } from "@tsparticles/engine";
```

## Configuration runtime minimale (`@tsparticles/slim`)

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

await loadSlim(tsParticles);

await tsParticles.load({
  id: "tsparticles",
  options: {
    particles: {
      move: {
        enable: true,
      },
      number: {
        value: 60,
      },
    },
  },
});
```

## Pages liees

- [`/guide/getting-started`](/fr/guide/getting-started)
- [`/guide/wrappers`](/fr/guide/wrappers)
- [`/demos/presets`](/fr/demos/presets)
- [`/migrations/particles-js`](/fr/migrations/particles-js)

## Compatibilite legacy

Si vous migrez d'anciennes integrations particles.js, utilisez le package de compatibilite :

- npm : <https://www.npmjs.com/package/@tsparticles/pjs>
- jsDelivr : <https://www.jsdelivr.com/package/npm/@tsparticles/pjs>
