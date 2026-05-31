# Instalacao

Esta pagina replica a matriz de instalacao do README principal de `tsParticles`.

Referencia oficial: <https://github.com/tsparticles/tsparticles/blob/main/README.md#library-installation>

## Escolha seu caminho

- **Padrao rapido**: `@tsparticles/engine` + `@tsparticles/slim`
- **Runtime personalizado mais leve**: `@tsparticles/engine` + apenas plugins necessarios
- **APIs focadas**: `@tsparticles/particles`, `@tsparticles/confetti`, `@tsparticles/fireworks` ou `@tsparticles/ribbons`
- **Todos os recursos incluidos**: `@tsparticles/all`

## Hospedagem / CDN

Use um destes provedores (ou hospede voce mesmo os arquivos gerados).

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

## Instalacao via package manager

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

// or

import { tsParticles } from "@tsparticles/engine";
```

## Configuracao minima de runtime (`@tsparticles/slim`)

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

- [`/guide/getting-started`](/pt/guide/getting-started)
- [`/guide/wrappers`](/pt/guide/wrappers)
- [`/demos/presets`](/pt/demos/presets)
- [`/migrations/particles-js`](/pt/migrations/particles-js)

## Compatibilidade legada

Se voce estiver migrando integracoes antigas de particles.js, use o pacote de compatibilidade:

- npm: <https://www.npmjs.com/package/@tsparticles/pjs>
- jsDelivr: <https://www.jsdelivr.com/package/npm/@tsparticles/pjs>
