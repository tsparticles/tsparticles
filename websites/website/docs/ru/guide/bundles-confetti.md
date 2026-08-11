# Bundle: Confetti

`@tsparticles/confetti` предоставляет упрощённое API для создания эффектов конфетти одним вызовом функции. Не требуется напрямую взаимодействовать с `tsParticles`.

## Включённые возможности

**Формы:** круг, сердце, карты (французские масти: черви, бубны, трефы, пики), эмодзи, изображения, полигон, квадрат, звезда

**Внутренние плагины:** эмиттеры, motion (учитывает предпочтение пользователя по уменьшению движения)

**Обновления:** жизнь, roll, вращение, tilt, wobble

**API:** `confetti(options)` или `confetti(идентификаторCanvas, options)`

## Когда использовать

- Кнопка "Поздравляем!" или "С днём рождения!"
- Быстрый праздничный эффект
- Вы не хотите настраивать движок вручную

## Установка

### npm/pnpm/yarn

```bash
pnpm add @tsparticles/confetti
```

```ts
import { confetti } from "@tsparticles/confetti";

// Базовый эффект
await confetti({
  particleCount: 100,
  spread: 70,
  origin: { x: 0.5, y: 0.5 },
});

// На конкретном canvas
await confetti("my-canvas-id", {
  particleCount: 50,
  angle: 90,
  spread: 45,
  colors: ["#ff0000", "#00ff00", "#0000ff"],
});
```

### CDN (тег script)

```html
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/confetti@4/tsparticles.confetti.bundle.min.js"></script>
<script>
  confetti({
    particleCount: 100,
    spread: 70,
    colors: ["#bb0000", "#ffffff"],
  });
</script>
```

### Основные параметры

| Параметр        | Тип      | По умолчанию | Описание                                            |
| --------------- | -------- | ------------ | --------------------------------------------------- |
| `particleCount` | number   | 50           | Количество частиц конфетти                          |
| `spread`        | number   | 60           | Угол разброса (градусы)                             |
| `angle`         | number   | 90           | Направление (градусы, 90 = вниз)                    |
| `startVelocity` | number   | 30           | Начальная скорость                                  |
| `colors`        | string[] | —            | Цвета конфетти                                      |
| `origin`        | { x, y } | { 0.5, 0.5 } | Точка начала (0-1)                                  |
| `drift`         | number   | 0            | Горизонтальный снос                                 |
| `shapes`        | string[] | —            | Формы: "circle", "heart", "square", "star", "cards" |

## Частые ошибки

- Думать, что `tsParticles` экспортируется из `@tsparticles/confetti` — это не так.
- Непреднамеренное повторное использование одного и того же ID canvas.
- Вызов `confetti` в цикле без управления производительностью — используйте разумный интервал или остановите анимацию по завершении.

## См. также

- [Обзор bundle](/ru/guide/bundles)
- [Bundle фейерверков](/ru/guide/bundles-fireworks)
