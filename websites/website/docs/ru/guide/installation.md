# Установка

Эта страница повторяет матрицу установки из основного README проекта `tsParticles`.

Официальный источник: <https://github.com/tsparticles/tsparticles/blob/main/README.md#library-installation>

## Выберите свой путь

- **Быстрый старт по умолчанию**: `@tsparticles/engine` + `@tsparticles/slim`
- **Более легкий кастомный runtime**: `@tsparticles/engine` + только нужные plugins
- **Фокусные API**: `@tsparticles/particles`, `@tsparticles/confetti` или `@tsparticles/fireworks`
- **Все функции включены**: `@tsparticles/all`

## Хостинг / CDN

Используйте одного из этих провайдеров (или размещайте собранные файлы самостоятельно).

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

## Установка через package manager

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

## Import и require

```ts
const tsParticles = require("@tsparticles/engine");

// or

import { tsParticles } from "@tsparticles/engine";
```

## Минимальная настройка runtime (`@tsparticles/slim`)

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

## Связанные страницы

- [`/guide/getting-started`](/ru/guide/getting-started)
- [`/guide/wrappers`](/ru/guide/wrappers)
- [`/demos/presets`](/ru/demos/presets)
- [`/migrations/particles-js`](/ru/migrations/particles-js)

## Legacy-совместимость

Если вы мигрируете старые интеграции particles.js, используйте пакет совместимости:

- npm: <https://www.npmjs.com/package/@tsparticles/pjs>
- jsDelivr: <https://www.jsdelivr.com/package/npm/@tsparticles/pjs>
