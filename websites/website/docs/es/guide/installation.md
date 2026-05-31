# Instalacion

Esta pagina replica la matriz de instalacion del README principal de `tsParticles`.

Referencia oficial: <https://github.com/tsparticles/tsparticles/blob/main/README.md#library-installation>

## Elige tu ruta

- **Inicio rapido**: `@tsparticles/engine` + `@tsparticles/slim`
- **Runtime personalizado mas ligero**: `@tsparticles/engine` + solo los plugins necesarios
- **APIs enfocadas**: `@tsparticles/particles`, `@tsparticles/confetti`, `@tsparticles/fireworks` o `@tsparticles/ribbons`
- **Todas las funcionalidades incluidas**: `@tsparticles/all`

## Hosting / CDN

Usa uno de estos proveedores (o autoalojar tus archivos generados).

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

## Instalacion con package manager

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

## Import y require

```ts
const tsParticles = require("@tsparticles/engine");

// or

import { tsParticles } from "@tsparticles/engine";
```

## Configuracion runtime minima (`@tsparticles/slim`)

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

## Paginas relacionadas

- [`/guide/getting-started`](/es/guide/getting-started)
- [`/guide/wrappers`](/es/guide/wrappers)
- [`/demos/presets`](/es/demos/presets)
- [`/migrations/particles-js`](/es/migrations/particles-js)

## Compatibilidad legacy

Si estas migrando integraciones antiguas de particles.js, usa el paquete de compatibilidad:

- npm: <https://www.npmjs.com/package/@tsparticles/pjs>
- jsDelivr: <https://www.jsdelivr.com/package/npm/@tsparticles/pjs>
