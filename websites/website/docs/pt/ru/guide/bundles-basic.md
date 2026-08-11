# Bundle: Basic

`@tsparticles/basic` — самый лёгкий bundle. Включает только самое необходимое: круги, которые двигаются с анимируемой прозрачностью и размером.

## Включённые возможности

**Формы:** круг

**Обновления:**

- paint (цвет)
- прозрачность
- out-modes (поведение при выходе за экран)
- размер

**Плагины:**

- move
- blend (смешивание цветов)
- HEX, HSL, RGB цветовые плагины

**Не включено:**

- Взаимодействия мыши/тача
- Связи частиц
- Другие формы (квадраты, звёзды, изображения, полигоны и т.д.)
- Эмиттеры, абсорберы, звуки
- Вращение, жизнь, roll, tilt, wobble

## Когда использовать

- Размер bundle — ваш главный приоритет
- Вам нужны только движущиеся точки
- Не нужны взаимодействия или сложные формы

## Установка

### npm/pnpm/yarn

```bash
pnpm add @tsparticles/engine @tsparticles/basic
```

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadBasic } from "@tsparticles/basic";

await loadBasic(tsParticles);

await tsParticles.load({
  id: "tsparticles",
  options: {
    background: { color: "#ffffff" },
    particles: {
      number: { value: 50 },
      color: { value: ["#5bc0eb", "#fde74c", "#9bc53d"] },
      size: {
        value: { min: 300, max: 400 },
        animation: { enable: true, speed: 100 },
      },
      move: { enable: true, speed: 10 },
    },
  },
});
```

### CDN (теги script)

```html
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/engine@4/tsparticles.engine.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/basic@4/tsparticles.basic.bundle.min.js"></script>
<script>
  (async () => {
    await loadBasic(tsParticles);
    await tsParticles.load({
      id: "tsparticles",
      options: {
        particles: {
          number: { value: 50 },
          move: { enable: true, speed: 1.5 },
        },
      },
    });
  })();
</script>
```

## Частые ошибки

- Ожидание функций, не входящих в basic (например, `links`, взаимодействия мыши) — для них нужны более полные bundle.
- Вызов `tsParticles.load()` до `loadBasic(tsParticles)` — формы и обновления ещё не зарегистрированы.
- Установка только `@tsparticles/engine` без bundle — движок сам по себе ничего не рисует.

## См. также

- [Обзор bundle](/ru/guide/bundles)
- [Руководство по установке](/ru/guide/installation)
