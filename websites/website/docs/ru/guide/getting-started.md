# Начало работы

Этот путь — самая быстрая и надежная настройка для `tsParticles` в 2026 году.

## Быстрый контрольный список

1. Установите `@tsparticles/engine`.
2. Выберите один путь выполнения (`@tsparticles/slim`, `@tsparticles/all`, специализированные API, такие как `@tsparticles/particles`, или только пользовательские пакеты).
3. Загрузите пакет один раз.
4. Начните с ручных параметров, объекта конфигурации или предустановки.

## 1) Установка движка + пресет в связке

Используйте `@tsparticles/engine` плюс `@tsparticles/slim` для достижения оптимального баланса размера и функций по умолчанию.

```bash
pnpm add @tsparticles/engine @tsparticles/slim
```

Нужны ссылки CDN, варианты `npm`/`yarn` или примеры `require(...)`?

- См. [`/guide/installation`](/ru/guide/installation).

## 2) Создать контейнер в HTML

```html
<div id="tsparticles"></div>
```

## 3) Инициализируйте tsParticles

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

const options = {
  background: {
    color: "#0b1020",
  },
  particles: {
    number: {
      value: 80,
    },
    links: {
      enable: true,
      distance: 150,
      opacity: 0.35,
    },
    move: {
      enable: true,
      speed: 2,
    },
  },
};

(async () => {
  await loadSlim(tsParticles);

  await tsParticles.load({
    id: "tsparticles",
    options,
  });
})();
```

## 4) Выберите правильный комплект

- `@tsparticles/slim`: здесь должно запускаться большинство приложений.
- `@tsparticles/basic`: меньший набор функций для очень легких настроек.
- `@tsparticles/all`: все включено, проще всего для быстрого прототипирования.

Если вам нужен специализированный API вместо прямой настройки `tsParticles`:

- `@tsparticles/particles`: упрощенный API фона частиц.
- `@tsparticles/confetti`: API конфетти с одним вызовом
- `@tsparticles/fireworks`: API фейерверков с одним вызовом

## 5) Используйте пресеты/конфигурации, когда вам нужна скорость

Если вы предпочитаете готовые эффекты:

```bash
pnpm add @tsparticles/configs
```

Затем загрузите одну конфигурацию по ключу, например [`demo/vite` app](https://github.com/tsparticles/tsparticles/blob/main/demo/vite/src/main.ts).

Если вы предпочитаете настройки на основе имени пресета, используйте официальный каталог пресетов в [`/demos/presets`](/ru/demos/presets).

## Быстрая карта документации

- Корневые параметры: [`/options/`](/ru/options/)
- Ссылка на обертки: [`/guide/wrappers`](/ru/guide/wrappers)
- Каталог пресетов: [`/demos/presets`](/ru/demos/presets)
- Каталог палитр: [`/demos/palettes`](/ru/demos/palettes)
- Каталог форм: [`/demos/shapes`](/ru/demos/shapes)
- Миграция с particles.js: [`/migrations/particles-js`](/ru/migrations/particles-js)
- Цветовые форматы: [`/guide/color-formats`](/ru/guide/color-formats)
- Жизненный цикл контейнера: [`/guide/container-lifecycle`](/ru/guide/container-lifecycle)
- Плагины и настройка: [`/guide/plugins-customization`](/ru/guide/plugins-customization)

## Устранение неполадок

- Пустой экран: убедитесь, что `#tsparticles` существует, прежде чем вызывать `tsParticles.load`.
- Отсутствует функция: вам, вероятно, понадобится другой плагин/пакет (форма, взаимодействие, средство обновления).
- Ошибки типов в параметрах: держите пакеты на одной и той же major/minor версии.
