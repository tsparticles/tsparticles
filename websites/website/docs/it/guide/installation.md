# Installazione

Questa pagina rispecchia la matrice di installazione del README principale di `tsParticles`.

Riferimento ufficiale: <https://github.com/tsparticles/tsparticles/blob/main/README.md#library-installation>

## Scegli il tuo percorso

- **Default rapido**: `@tsparticles/engine` + `@tsparticles/slim`
- **Runtime custom piu leggero**: `@tsparticles/engine` + solo plugin necessari
- **API focalizzate**: `@tsparticles/particles`, `@tsparticles/confetti`, `@tsparticles/fireworks` o `@tsparticles/ribbons`
- **Tutte le feature incluse**: `@tsparticles/all`

## Hosting / CDN

Usa uno di questi provider (oppure self-hosta i file buildati).

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

## Installazione con package manager

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

## Import e require

```ts
const tsParticles = require("@tsparticles/engine");

// oppure

import { tsParticles } from "@tsparticles/engine";
```

## Setup runtime minimo (`@tsparticles/slim`)

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

## Pagine correlate

- [`/guide/getting-started`](/it/guide/getting-started)
- [`/guide/wrappers`](/it/guide/wrappers)
- [`/demos/presets`](/it/demos/presets)
- [`/migrations/particles-js`](/it/migrations/particles-js)

## Compatibilita legacy

Se stai migrando integrazioni particles.js legacy, usa il pacchetto di compatibilita:

- npm: <https://www.npmjs.com/package/@tsparticles/pjs>
- jsDelivr: <https://www.jsdelivr.com/package/npm/@tsparticles/pjs>
