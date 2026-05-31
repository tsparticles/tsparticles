# Installation

Diese Seite ubernimmt die Installationsmatrix aus dem Haupt-README von `tsParticles`.

Offizielle Referenz: <https://github.com/tsparticles/tsparticles/blob/main/README.md#library-installation>

## Wähle deinen Weg

- **Schneller Standard**: `@tsparticles/engine` + `@tsparticles/slim`
- **Leichteres Custom-Runtime**: `@tsparticles/engine` + nur benotigte Plugins
- **Fokussierte APIs**: `@tsparticles/particles`, `@tsparticles/confetti`, `@tsparticles/fireworks` oder `@tsparticles/ribbons`
- **Alle Features enthalten**: `@tsparticles/all`

## Hosting / CDN

Nutze einen dieser Anbieter (oder hoste die gebauten Dateien selbst).

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

## Installation per Package-Manager

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

## Import und require

```ts
const tsParticles = require("@tsparticles/engine");

// or

import { tsParticles } from "@tsparticles/engine";
```

## Minimales Runtime-Setup (`@tsparticles/slim`)

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

## Verwandte Seiten

- [`/guide/getting-started`](/de/guide/getting-started)
- [`/guide/wrappers`](/de/guide/wrappers)
- [`/demos/presets`](/de/demos/presets)
- [`/migrations/particles-js`](/de/migrations/particles-js)

## Legacy-Kompatibilitat

Wenn du alte particles.js-Integrationen migrierst, nutze das Kompatibilitatspaket:

- npm: <https://www.npmjs.com/package/@tsparticles/pjs>
- jsDelivr: <https://www.jsdelivr.com/package/npm/@tsparticles/pjs>
