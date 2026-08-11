# Bundle: All

`@tsparticles/all` загружает **всё** из репозитория tsParticles: каждую форму, взаимодействие, обновление, эффект, путь, easing, плагин и экспорт. Это самый большой bundle, предназначенный для прототипирования и демонстраций.

## Включённые возможности

Наследует всё из `tsparticles` (full) плюс:

**Все формы:** arrow, cards, cog, heart, infinity, matrix, path, ribbon, rounded-polygon, rounded-rect, spiral, squircle

**Все внешние взаимодействия:** cannon, light, particle, pop, particles-repulse

**Все эффекты:** bubble, filter, particles, shadow, trail

**Все генераторы путей:** branches, brownian, curl-noise, curves, fractal-noise, grid, levy, perlin-noise, polygon, random, simplex-noise, spiral, svg, zig-zag

**Все easing:** back, bounce, circ, cubic, elastic, expo, gaussian, linear, quad, quart, quint, sigmoid, sine, smoothstep

**Все цветовые плагины:** HEX, HSL, RGB, HSV, HWB, LAB, LCH, Named, OKLAB, OKLCH

**Все плагины:** абсорберы, background-mask, canvas-mask, эмиттеры (все формы), easing (все), export-image, export-json, export-video, infection, manual-particles, motion, poisson-disc, polygon-mask, responsive, звуки, темы, trail, zoom

**Все обновления:** destroy, gradient, life, opacity, orbit, out-modes, paint, roll, rotate, size, tilt, twinkle, wobble

## Когда использовать

- Быстрое прототипирование для изучения возможностей
- Демо и показы
- Среды разработки, где размер не имеет значения
- **Не рекомендуется для production** — предпочитайте более целевые bundle

## Установка

### npm/pnpm/yarn

```bash
pnpm add @tsparticles/engine @tsparticles/all
```

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadAll } from "@tsparticles/all";

await loadAll(tsParticles);

await tsParticles.load({
  id: "tsparticles",
  options: {
    background: { color: "#000" },
    particles: {
      number: { value: 100 },
      shape: { type: "heart" },
      move: { enable: true, speed: 2 },
    },
  },
});
```

### CDN (теги script)

```html
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/engine@4/tsparticles.engine.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/all@4/tsparticles.all.bundle.min.js"></script>
<script>
  (async () => {
    await loadAll(tsParticles);

    await tsParticles.load({
      id: "tsparticles",
      options: {
        particles: {
          number: { value: 100 },
          move: { enable: true, speed: 2 },
        },
      },
    });
  })();
</script>
```

## Разница между `tsparticles` и `@tsparticles/all`

См. таблицу сравнения на странице [bundles-full](/ru/guide/bundles-full) для детального разбора.

## Частые ошибки

- Использование в production — предпочитайте `@tsparticles/slim` или `tsparticles` для меньших bundle.
- Вызов `tsParticles.load()` до `loadAll(tsParticles)`.

## См. также

- [Обзор bundle](/ru/guide/bundles)
- [Руководство по установке](/ru/guide/installation)
