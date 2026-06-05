# Установка

## Выберите свой путь

| Сценарий | Команда |
|---|---|
| Быстрый старт (рекомендуется) | `pnpm add @tsparticles/engine @tsparticles/slim` |
| Минимальная настройка | `pnpm add @tsparticles/engine @tsparticles/basic` |
| Полный набор функций | `pnpm add @tsparticles/engine tsparticles` |
| Всё из репозитория | `pnpm add @tsparticles/engine @tsparticles/all` |
| Только конфетти | `pnpm add @tsparticles/confetti` |
| Только фейерверки | `pnpm add @tsparticles/fireworks` |
| Фон из частиц | `pnpm add @tsparticles/particles` |
| Эффект лент | `pnpm add @tsparticles/ribbons` |

> **Важно**: `@tsparticles/engine` сам по себе ничего не рисует. Вы всегда должны добавить bundle (для загрузки форм и анимаций) или отдельные плагины. См. [руководство по bundle](/ru/guide/bundles).

## npm

```bash
# engine + slim (рекомендуется для большинства проектов)
npm install @tsparticles/engine @tsparticles/slim

# engine + basic (минимально)
npm install @tsparticles/engine @tsparticles/basic

# engine + full (tsparticles)
npm install @tsparticles/engine tsparticles

# engine + all
npm install @tsparticles/engine @tsparticles/all

# Bundle с выделенным API (явный engine не требуется)
npm install @tsparticles/confetti
npm install @tsparticles/fireworks
npm install @tsparticles/particles
npm install @tsparticles/ribbons
```

## yarn

```bash
yarn add @tsparticles/engine @tsparticles/slim
# ... тот же принцип для других bundle
```

## pnpm

```bash
pnpm add @tsparticles/engine @tsparticles/slim
# ... тот же принцип для других bundle
```

## CDN (теги script)

Все пакеты доступны на jsDelivr, unpkg и cdnjs.

### jsDelivr

| Bundle | URL |
|---|---|
| Engine | `https://cdn.jsdelivr.net/npm/@tsparticles/engine@4/tsparticles.engine.min.js` |
| Basic | `https://cdn.jsdelivr.net/npm/@tsparticles/basic@4/tsparticles.basic.bundle.min.js` |
| Slim | `https://cdn.jsdelivr.net/npm/@tsparticles/slim@4/tsparticles.slim.bundle.min.js` |
| Full (`tsparticles`) | `https://cdn.jsdelivr.net/npm/tsparticles@4/tsparticles.bundle.min.js` |
| All | `https://cdn.jsdelivr.net/npm/@tsparticles/all@4/tsparticles.all.bundle.min.js` |
| Confetti | `https://cdn.jsdelivr.net/npm/@tsparticles/confetti@4/tsparticles.confetti.bundle.min.js` |
| Fireworks | `https://cdn.jsdelivr.net/npm/@tsparticles/fireworks@4/tsparticles.fireworks.bundle.min.js` |
| Particles | `https://cdn.jsdelivr.net/npm/@tsparticles/particles@4/tsparticles.particles.bundle.min.js` |
| Ribbons | `https://cdn.jsdelivr.net/npm/@tsparticles/ribbons@4/tsparticles.ribbons.bundle.min.js` |
| Совместимость с particles.js | `https://cdn.jsdelivr.net/npm/@tsparticles/pjs@4/tsparticles.pjs.min.js` |

### unpkg

Та же структура: `https://unpkg.com/{имя-пакета}@{версия}/{имя-файла}`

Пример:
`https://unpkg.com/@tsparticles/slim@4/tsparticles.slim.bundle.min.js`

### cdnjs

`https://cdnjs.com/libraries/tsparticles`

## Примеры импорта

### С бандлером (импорт ES-модуля)

```ts
// Engine + загрузчик bundle
import { tsParticles } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

await loadSlim(tsParticles);
await tsParticles.load({ id: "tsparticles", options: { ... } });
```

### С CommonJS (require)

```ts
const { tsParticles } = require("@tsparticles/engine");
const { loadSlim } = require("@tsparticles/slim");

(async () => {
  await loadSlim(tsParticles);
  await tsParticles.load({ id: "tsparticles", options: { ... } });
})();
```

### С CDN (тег script)

```html
<!-- 1. Engine -->
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/engine@4/tsparticles.engine.min.js"></script>
<!-- 2. Bundle (делает loadBasic/loadSlim/loadFull/loadAll глобально доступными) -->
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/slim@4/tsparticles.slim.bundle.min.js"></script>
<!-- 3. Ваш скрипт -->
<script>
  (async () => {
    await loadSlim(tsParticles);  // регистрация функций
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

С bundle с выделенным API:

```html
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/confetti@4/tsparticles.confetti.bundle.min.js"></script>
<script>
  confetti({ particleCount: 100, spread: 70 });
</script>
```

## Связанные страницы

- [Начало работы](/ru/guide/getting-started)
- [Руководство по bundle](/ru/guide/bundles)
- [Обёртки для фреймворков](/ru/guide/wrappers)
