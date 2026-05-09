# Руководство по bundle

Эта страница поможет выбрать подходящий bundle `tsParticles` и быстро его настроить.

## Сравнение пакетов

| Пакет                    | Лучше всего подходит для                                 | Стиль настройки                                |
| ------------------------ | -------------------------------------------------------- | ---------------------------------------------- |
| `@tsparticles/basic`     | Очень легкие конфигурации                                | `tsParticles` + `await loadBasic(tsParticles)` |
| `@tsparticles/slim`      | Большинство сайтов/приложений                            | `tsParticles` + `await loadSlim(tsParticles)`  |
| `tsparticles`            | Полный набор официальных возможностей с контролем engine | `tsParticles` + `await loadFull(tsParticles)`  |
| `@tsparticles/all`       | Все возможности, быстрое прототипирование                | `tsParticles` + `await loadAll(tsParticles)`   |
| `@tsparticles/confetti`  | Эффекты конфетти в один вызов                            | `await confetti(options)`                      |
| `@tsparticles/fireworks` | Эффекты фейерверков в один вызов                         | `await fireworks(options)`                     |
| `@tsparticles/particles` | Простое API для фоновых частиц                           | `await particles(options)`                     |

## Руководства по bundle

- Basic: [`/guide/bundles-basic`](/ru/guide/bundles-basic)
- Slim: [`/guide/bundles-slim`](/ru/guide/bundles-slim)
- tsparticles (Full): [`/guide/bundles-full`](/ru/guide/bundles-full)
- All: [`/guide/bundles-all`](/ru/guide/bundles-all)
- Confetti: [`/guide/bundles-confetti`](/ru/guide/bundles-confetti)
- Fireworks: [`/guide/bundles-fireworks`](/ru/guide/bundles-fireworks)
- Particles: [`/guide/bundles-particles`](/ru/guide/bundles-particles)

## Установка

Установите вариант пакетов под ваш сценарий.

```bash
pnpm add @tsparticles/engine @tsparticles/basic
pnpm add @tsparticles/engine @tsparticles/slim
pnpm add @tsparticles/engine tsparticles
pnpm add @tsparticles/engine @tsparticles/all
pnpm add @tsparticles/confetti
pnpm add @tsparticles/fireworks
pnpm add @tsparticles/particles
```

Нужны CDN-ссылки и другие варианты package manager?

- См. [`/guide/installation`](/ru/guide/installation).

## Примеры настройки

### Bundle с engine + loader (`basic`, `slim`, `full`, `all`)

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

await loadSlim(tsParticles);

await tsParticles.load({
  id: "tsparticles",
  options: {
    particles: {
      number: { value: 80 },
      move: { enable: true, speed: 2 },
    },
  },
});
```

Для других пресетов замените только импорт/функцию loader:

- `@tsparticles/basic` -> `loadBasic`
- `tsparticles` -> `loadFull`
- `@tsparticles/all` -> `loadAll`

### Фокусные API (`confetti`, `fireworks`, `particles`)

```ts
import { confetti } from "@tsparticles/confetti";
import { fireworks } from "@tsparticles/fireworks";
import { particles } from "@tsparticles/particles";

await confetti({ count: 80, spread: 60 });
await fireworks({ sounds: false });
await particles({ count: 100, links: true });
```

Эти API удобны, когда нужна быстрая интеграция без ручного подключения большого числа плагинов engine.

## Практические правила выбора

1. В большинстве проектов начинайте с `@tsparticles/slim`.
2. Используйте `@tsparticles/basic`, если размер bundle критичен и нужны только простые возможности.
3. Используйте `tsparticles`, когда нужна full-база с широкими возможностями и `loadFull`.
4. Используйте `@tsparticles/all` для прототипирования или когда сразу нужен широкий набор возможностей.
5. Используйте `@tsparticles/confetti`, `@tsparticles/fireworks` или `@tsparticles/particles`, когда интерфейсу нужен один специализированный эффект с минимальной настройкой.

## Связанные страницы

- Фокусные bundles в playground: [`/playground/bundles`](/ru/playground/bundles)
- Стартовый путь: [`/guide/getting-started`](/ru/guide/getting-started)
- Матрица установки: [`/guide/installation`](/ru/guide/installation)
- Обзор wrappers: [`/guide/wrappers`](/ru/guide/wrappers)
