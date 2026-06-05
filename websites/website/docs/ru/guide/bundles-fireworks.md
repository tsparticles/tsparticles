# Bundle: Fireworks

`@tsparticles/fireworks` предоставляет упрощённое API для создания эффектов фейерверков одним вызовом функции. Поддерживает звуки, пользовательские цвета и управление экземпляром (пауза/воспроизведение).

## Включённые возможности

**Формы:** линия, круг (из basic)

**Внутренние плагины:** эмиттеры, emitters-shape-square, blend (смешивание), звуки

**Обновления:** destroy, жизнь, paint, вращение

**API:** `fireworks(options)` — возвращает управляемый экземпляр

## Когда использовать

- Эффект для Нового года или праздника
- Праздничный интерфейс
- Вы не хотите настраивать движок вручную

## Установка

### npm/pnpm/yarn

```bash
pnpm add @tsparticles/fireworks
```

```ts
import { fireworks } from "@tsparticles/fireworks";

// Базовый эффект
const instance = await fireworks({
  colors: ["#ffffff", "#ff0000", "#00ff00", "#0000ff"],
  sounds: true,
});

// Управление экземпляром
instance?.pause();
instance?.play();

// На конкретном canvas
await fireworks("my-canvas", {
  rate: 3,
  speed: { min: 10, max: 25 },
  sounds: false,
});
```

### CDN (тег script)

```html
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/fireworks@4/tsparticles.fireworks.bundle.min.js"></script>
<script>
  // Немедленный запуск фейерверков
  fireworks();
</script>
```

### Основные параметры

| Параметр | Тип | По умолчанию | Описание |
|---|---|---|---|
| `colors` | string[] | — | Цвета взрывов |
| `rate` | number | — | Фейерверков в секунду |
| `speed` | { min, max } | — | Скорость частиц |
| `sounds` | boolean | true | Включить звуковые эффекты |
| `gravity` | number | — | Гравитация (по умолчанию: 0) |
| `opacity` | number | — | Прозрачность (0-1) |
| `brightness` | { min, max } | — | Яркость взрыва |

## Частые ошибки

- Думать, что `tsParticles` экспортируется из `@tsparticles/fireworks` — это не так.
- Вызов `fireworks()` в цикле без управления экземпляром — эффект уже непрерывный.
- Остановка экземпляра при уходе со страницы не производится — вызывайте `instance?.pause()` или `instance?.stop()`.

## См. также

- [Обзор bundle](/ru/guide/bundles)
- [Bundle конфетти](/ru/guide/bundles-confetti)
