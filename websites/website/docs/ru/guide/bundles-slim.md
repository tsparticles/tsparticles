# Bundle: Slim

`@tsparticles/slim` — рекомендуемый bundle для большинства проектов. Включает всё необходимое для современных анимаций частиц с взаимодействием мыши, множеством форм и связями частиц.

## Включённые возможности

Наследует всё из `@tsparticles/basic` плюс:

**Формы:** круг, квадрат, звезда, полигон, линия, изображение, эмодзи

**Внешние взаимодействия (мышь/тач):**
- attract
- bounce
- bubble
- connect
- destroy
- grab
- parallax
- pause
- push
- remove
- repulse
- slow

**Взаимодействия частиц:**
- attract
- коллизии
- связи (links) — соединения частиц

**Дополнительные обновления:**
- жизнь (lifecycle)
- вращение

**Плагины:**
- interactivity
- easing-quad
- HEX, HSL, RGB цветовые плагины

## Когда использовать

- Рекомендуемая отправная точка для большинства проектов
- Нужны несколько форм (круги, звёзды, полигоны, изображения)
- Нужны взаимодействия мыши (клик, наведение, bubble, repulse)
- Нужны связи частиц
- Хороший баланс между размером bundle и функциями

## Установка

### npm/pnpm/yarn

```bash
pnpm add @tsparticles/engine @tsparticles/slim
```

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

await loadSlim(tsParticles);

await tsParticles.load({
  id: "tsparticles",
  options: {
    background: { color: "#0b1020" },
    particles: {
      number: { value: 80 },
      links: { enable: true, distance: 150 },
      move: { enable: true, speed: 2 },
      shape: { type: ["circle", "star", "square"] },
    },
  },
});
```

### CDN (теги script)

```html
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/engine@4/tsparticles.engine.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/slim@4/tsparticles.slim.bundle.min.js"></script>
<script>
  (async () => {
    await loadSlim(tsParticles);

    await tsParticles.load({
      id: "tsparticles",
      options: {
        particles: {
          number: { value: 80 },
          links: { enable: true },
          move: { enable: true, speed: 2 },
        },
      },
    });
  })();
</script>
```

## Частые ошибки

- Вызов `tsParticles.load()` до `loadSlim(tsParticles)`.
- Смешивание разных версий engine и bundle — держите их синхронизированными.
- Ожидание функций из более полных bundle (эмиттеры, абсорберы, текст, wobble) — нужен `tsparticles` (full) или отдельные плагины.

## См. также

- [Обзор bundle](/ru/guide/bundles)
- [Руководство по установке](/ru/guide/installation)
