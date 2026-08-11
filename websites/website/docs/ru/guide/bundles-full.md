# Bundle: tsparticles (Full)

`tsparticles` (npm: `tsparticles`, загрузчик: `loadFull`) — официальный полный bundle. Включает всё из Slim плюс эмиттеры, абсорберы, текстовые формы и продвинутые анимации (wobble, roll, tilt, twinkle, destroy).

## Включённые возможности

Наследует всё из `@tsparticles/slim` плюс:

**Дополнительные формы:** текст (с пользовательскими шрифтами)

**Дополнительные внешние взаимодействия:**

- drag (перетаскивание частиц мышью)
- trail (след частиц за мышью)

**Дополнительные обновления:**

- destroy (анимация уничтожения частиц)
- roll (перекатывание)
- tilt (3D наклон)
- twinkle (мерцание)
- wobble (колебание)

**Плагины:**

- абсорберы (чёрные дыры, втягивающие частицы)
- эмиттеры (непрерывные источники частиц)
- emitters-shape-circle, emitters-shape-square (формы эмиттеров)

## Когда использовать

- Нужны эмиттеры (частицы, появляющиеся непрерывно)
- Нужны абсорберы (частицы, втягиваемые внутрь)
- Нужны текстовые формы с пользовательскими шрифтами
- Нужны продвинутые анимации (wobble, tilt, roll, twinkle)
- Хорошая промежуточная ступень перед переходом на отдельные плагины

## Установка

### npm/pnpm/yarn

```bash
pnpm add @tsparticles/engine tsparticles
```

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadFull } from "tsparticles";

await loadFull(tsParticles);

await tsParticles.load({
  id: "tsparticles",
  options: {
    background: { color: "#000" },
    particles: {
      number: { value: 50 },
      shape: { type: "text", options: { text: ["🔥", "✨", "⭐"] } },
      size: { value: 24 },
      move: { enable: true, speed: 1 },
      wobble: { enable: true, distance: 10 },
    },
    emitters: {
      direction: "top",
      rate: { quantity: 2, delay: 0.3 },
    },
  },
});
```

### CDN (теги script)

```html
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/engine@4/tsparticles.engine.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/tsparticles@4/tsparticles.bundle.min.js"></script>
<script>
  (async () => {
    await loadFull(tsParticles);

    await tsParticles.load({
      id: "tsparticles",
      options: {
        particles: {
          number: { value: 80 },
          move: { enable: true, speed: 2 },
        },
        absorbers: [{ color: "#ff0000", size: { value: 50 } }],
      },
    });
  })();
</script>
```

## Разница между `tsparticles` и `@tsparticles/all`

| Аспект                 | `tsparticles` (full)                                              | `@tsparticles/all`                                                                 |
| ---------------------- | ----------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| Размер                 | Умеренный                                                         | Очень большой                                                                      |
| Формы                  | круг, квадрат, звезда, полигон, линия, изображение, эмодзи, текст | Все формы (сердце, карты, стрелка, спираль, cog, скруглённый прямоугольник и т.д.) |
| Взаимодействия         | Slim + drag + trail                                               | Все (cannon, light, pop, particle, repulse)                                        |
| Пути                   | Только easing Quad                                                | 14 генераторов путей                                                               |
| Эффекты                | Нет                                                               | 5 эффектов (bubble, filter, shadow и т.д.)                                         |
| Экспорты               | Нет                                                               | Изображение, JSON, Видео                                                           |
| Дополнительные плагины | абсорберы, эмиттеры                                               | Все (звуки, темы, trail, zoom, polygon-mask, canvas-mask, background-mask и т.д.)  |
| Easing                 | Quad                                                              | 15 easing'ов                                                                       |

## Частые ошибки

- Путать `tsparticles` с `@tsparticles/all` — это разные пакеты.
- Вызов `tsParticles.load()` до `loadFull(tsParticles)`.
- Пакет npm называется `tsparticles` (не `@tsparticles/full`), загрузчик — `loadFull`.

## См. также

- [Обзор bundle](/ru/guide/bundles)
- [Руководство по установке](/ru/guide/installation)
