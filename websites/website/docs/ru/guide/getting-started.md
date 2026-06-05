# Начало работы

tsParticles — это JavaScript/TypeScript библиотека для создания анимаций частиц, конфетти, фейерверков и многого другого. Она работает в любом современном браузере и доступна как в виде npm-пакета, так и через CDN с тегами `<script>`.

## Архитектура: engine + bundle

`@tsparticles/engine` сам по себе **ничего не отображает**. Он содержит только ядро (цикл анимации, canvas, управление событиями), но **не содержит форм, взаимодействий или визуальных эффектов**. Чтобы увидеть что-то, необходимо загрузить хотя бы **bundle** или отдельные **плагины**.

| Концепция | Роль |
|---|---|
| `@tsparticles/engine` | Ядро. Экспортирует `tsParticles`, типы, опции. Сам по себе ничего не рисует. |
| Bundle (`@tsparticles/basic`, `@tsparticles/slim` и т.д.) | Предварительно собранный пакет, который регистрирует формы, взаимодействия и обновления на движке. |
| Отдельные плагины (`@tsparticles/shape-circle`, `@tsparticles/updater-opacity` и т.д.) | Отдельные пакеты, которые можно комбинировать для создания собственного bundle. |

## Выберите свой путь

### Путь A — npm/pnpm/yarn (современные проекты с бандлером)

Установите движок + bundle:

```bash
pnpm add @tsparticles/engine @tsparticles/slim
```

Затем в вашем коде:

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

(async () => {
  // 1. Зарегистрировать все возможности slim bundle на движке
  await loadSlim(tsParticles);

  // 2. Создать анимацию
  await tsParticles.load({
    id: "tsparticles",       // ID HTML-контейнера
    options: {
      background: {
        color: "#0b1020",
      },
      particles: {
        number: { value: 80 },
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
    },
  });
})();
```

HTML-контейнер:

```html
<div id="tsparticles"></div>
```

### Путь B — CDN с тегами `<script>` (без бандлера, чистый HTML)

Сначала загрузите движок, затем bundle. CDN-файлы выставляют всё на `window` — `import` не нужен.

```html
<!DOCTYPE html>
<html>
<head>
  <!-- tsParticles engine -->
  <script src="https://cdn.jsdelivr.net/npm/@tsparticles/engine@4/tsparticles.engine.min.js"></script>
  <!-- Slim bundle (делает loadSlim глобально доступным) -->
  <script src="https://cdn.jsdelivr.net/npm/@tsparticles/slim@4/tsparticles.slim.bundle.min.js"></script>
</head>
<body>
  <div id="tsparticles"></div>
  <script>
    (async () => {
      // loadSlim доступен глобально из CDN-сборки
      await loadSlim(tsParticles);

      await tsParticles.load({
        id: "tsparticles",
        options: {
          background: { color: "#0b1020" },
          particles: {
            number: { value: 80 },
            links: { enable: true, distance: 150 },
            move: { enable: true, speed: 2 },
          },
        },
      });
    })();
  </script>
</body>
</html>
```

> **Примечание**: даже с CDN-сборками вы ОБЯЗАНЫ вызвать `loadSlim(tsParticles)` (или `loadBasic` / `loadFull` / `loadAll`) перед `tsParticles.load()`. CDN-сборки выставляют функцию загрузки глобально, но не вызывают её автоматически.

Тот же принцип применим к `@tsparticles/basic` → `loadBasic`, `tsparticles` → `loadFull`, `@tsparticles/all` → `loadAll`.

### Путь C — Специализированные bundle с собственным API (confetti, fireworks, particles)

Некоторые bundle имеют свой упрощённый API, без необходимости использовать `tsParticles.load()`:

```html
<!DOCTYPE html>
<html>
<head>
  <script src="https://cdn.jsdelivr.net/npm/@tsparticles/confetti@4/tsparticles.confetti.bundle.min.js"></script>
</head>
<body>
  <script>
    confetti({ particleCount: 100, spread: 70 });
  </script>
</body>
</html>
```

То же самое для `fireworks()`, `particles()`, `ribbons()`.

## Какой bundle выбрать?

| Bundle | npm | Когда использовать |
|---|---|---|
| `@tsparticles/basic` | `loadBasic(tsParticles)` | Минимум: круги, движение, прозрачность, размер. Без взаимодействий. |
| `@tsparticles/slim` | `loadSlim(tsParticles)` | **Рекомендуется для большинства проектов.** Добавляет взаимодействия (клик/наведение), связи частиц, изображения, звёзды, полигоны. |
| `tsparticles` | `loadFull(tsParticles)` | Полный официальный набор функций: эмиттеры, абсорберы, текстовые формы, roll, wobble, trail. |
| `@tsparticles/all` | `loadAll(tsParticles)` | **Всё** из репозитория: каждая форма, взаимодействие, эффект, easing, путь, экспорт. Только для прототипирования. |
| `@tsparticles/confetti` | `confetti(options)` | Конфетти одним вызовом функции. Выделенное API. |
| `@tsparticles/fireworks` | `fireworks(options)` | Фейерверки одним вызовом функции. Выделенное API. |
| `@tsparticles/particles` | `particles(options)` | Упрощённый фон из частиц. Выделенное API. |
| `@tsparticles/ribbons` | `ribbons(options)` | Эффект лент. Выделенное API. |

Подробнее: [`/ru/guide/bundles`](/ru/guide/bundles).

## Использование пресетов

Пакет `@tsparticles/configs` содержит десятки готовых конфигураций (absorbers, bubbles, snow, stars, gravity, collisions и т.д.).

```bash
pnpm add @tsparticles/engine @tsparticles/slim @tsparticles/configs
```

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";
import "@tsparticles/configs";

await loadSlim(tsParticles);

await tsParticles.load({
  id: "tsparticles",
  options: { preset: "snow" },
});
```

С CDN:

```html
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/engine@4/tsparticles.engine.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/slim@4/tsparticles.slim.bundle.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/configs@4/tsparticles.configs.min.js"></script>
<script>
  (async () => {
    await loadSlim(tsParticles);
    tsParticles.load({ id: "tsparticles", options: { preset: "snow" } });
  })();
</script>
```

## Быстрые ссылки

- Документация по опциям: [`/ru/options/`](/ru/options/)
- Руководство по bundle: [`/ru/guide/bundles`](/ru/guide/bundles)
- Каталог пресетов: [`/ru/demos/presets`](/ru/demos/presets)
- Каталог палитр: [`/ru/demos/palettes`](/ru/demos/palettes)
- Каталог форм: [`/ru/demos/shapes`](/ru/demos/shapes)
- Обёртки для фреймворков: [`/ru/guide/wrappers`](/ru/guide/wrappers)
- Цветовые форматы: [`/ru/guide/color-formats`](/ru/guide/color-formats)
- Жизненный цикл контейнера: [`/ru/guide/container-lifecycle`](/ru/guide/container-lifecycle)
- Плагины и настройка: [`/ru/guide/plugins-customization`](/ru/guide/plugins-customization)

## Устранение неполадок

| Проблема | Вероятная причина | Решение |
|---|---|---|
| Пустой экран, нет частиц | `#tsparticles` не существует в DOM при вызове `tsParticles.load()` | Убедитесь, что DIV существует перед скриптом, или используйте `DOMContentLoaded` |
| Пустой экран, нет частиц | Установлен только `@tsparticles/engine` | Установите также bundle (`@tsparticles/slim`) или плагины — движок сам по себе не имеет форм для отрисовки |
| Ошибка "loadBasic/loadSlim/loadFull is not a function" | Bundle не установлен или неправильный импорт | `pnpm add @tsparticles/slim` и импортируйте `{ loadSlim }` |
| Частицы не двигаются | `move.enable` не установлен в `true` | Добавьте `move: { enable: true, speed: 2 }` |
| Отсутствует функция (например, links, collisions) | Выбранный bundle не включает её | Переключитесь на более богатый bundle (`@tsparticles/slim` или `tsparticles`) или установите конкретный плагин |
| Ошибки типов TypeScript | Версии пакетов не синхронизированы | Держите engine и bundle на одной major/minor версии |
