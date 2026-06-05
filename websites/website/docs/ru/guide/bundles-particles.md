# Bundle: Particles

`@tsparticles/particles` предоставляет упрощённое API для создания интерактивных фонов из частиц. Более богатая альтернатива `@tsparticles/basic` с выделенным API вместо ручной настройки движка.

## Включённые возможности

**Формы:** круг (из basic)

**Внутренние плагины:** interactivity (связи, коллизии)

**Взаимодействия:** связи (links) — соединения частиц, коллизии

**API:** `particles(options)` или `particles(идентификаторCanvas, options)`

## Когда использовать

- Фон из частиц для веб-сайта
- Фон со связями частиц (эффект в стиле узлов)
- Вы не хотите настраивать движок вручную

## Установка

### npm/pnpm/yarn

```bash
pnpm add @tsparticles/particles
```

```ts
import { particles } from "@tsparticles/particles";

// Фон со связями
await particles({
  count: 120,
  links: true,
  color: "#ffffff",
  linksColor: "#00d8ff",
  radius: 3,
  speed: 2,
  opacity: 0.8,
});

// На конкретном canvas
await particles("my-canvas", {
  count: 80,
  shape: ["circle", "square"],
  links: true,
});

// С пользовательскими цветами
await particles({
  count: 100,
  color: ["#ff6b6b", "#4ecdc4", "#45b7d1"],
  links: false,
});
```

### CDN (тег script)

```html
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/particles@4/tsparticles.particles.bundle.min.js"></script>
<script>
  particles({
    radius: 3,
    speed: 2,
    opacity: 0.8,
    links: true,
    linksWidth: 140,
    color: "#ffffff",
    linksColor: "#00d8ff",
  });
</script>
```

### Основные параметры

| Параметр | Тип | По умолчанию | Описание |
|---|---|---|---|
| `count` | number | 50 | Количество частиц |
| `radius` | number | 3 | Радиус частицы |
| `speed` | number | 2 | Скорость движения |
| `opacity` | number | 0.8 | Прозрачность (0-1) |
| `color` | string \| string[] | "#ffffff" | Цвет(а) частиц |
| `links` | boolean | false | Показывать связи |
| `linksColor` | string | "#ffffff" | Цвет связей |
| `linksWidth` | number | 1 | Толщина связей |
| `shape` | string[] | ["circle"] | Формы частиц |

## Частые ошибки

- Думать, что `tsParticles` экспортируется из `@tsparticles/particles` — это не так.
- Непреднамеренное повторное использование одного и того же ID canvas.
- Ожидание продвинутых форм (звёзды, полигоны) — bundle частиц основан на basic и использует только круги.

## См. также

- [Обзор bundle](/ru/guide/bundles)
- [Начало работы](/ru/guide/getting-started)
