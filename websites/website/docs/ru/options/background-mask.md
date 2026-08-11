# Фоновая маска

`backgroundMask` позволяет частицам проникать сквозь маскированный фоновый слой или смешиваться с ним.

## Примеры

### Статическое наложение (legacy)

```ts
backgroundMask: {
  enable: true,
  cover: {
    color: {
      value: "#0b1020",
    },
    opacity: 1,
  },
}
```

### Динамический draw callback _(с 4.3.0)_

```ts
backgroundMask: {
  enable: true,
  cover: {
    draw: (ctx) => {
      const t = performance.now() * 0.001;
      ctx.fillStyle = `hsl(${(t * 30) % 360}, 70%, 50%)`;
      ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    },
  },
}
```

### Внешний элемент _(с 4.3.0)_

```ts
backgroundMask: {
  enable: true,
  cover: {
    element: "#myVideo",
    opacity: 0.8,
  },
}
```

## Свойства

| Свойство    | Тип                        | Описание                                                       |
| ----------- | -------------------------- | -------------------------------------------------------------- |
| `enable`    | `boolean`                  | Активирует маскировку фона                                     |
| `composite` | `GlobalCompositeOperation` | Операция композиции canvas (по умолчанию: `"destination-out"`) |
| `cover`     | `BackgroundMaskCover`      | Конфигурация наложения                                         |

### `cover` (BackgroundMaskCover)

| Свойство  | Тип                                                                                          | Описание                                                                               |
| --------- | -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| `color`   | `string` / `OptionsColor`                                                                    | Цвет наложения                                                                         |
| `image`   | `string`                                                                                     | URL изображения наложения                                                              |
| `opacity` | `number`                                                                                     | Уровень альфа-прозрачности (0..1, по умолчанию: `1`)                                   |
| `element` | `string` / `HTMLCanvasElement` / `OffscreenCanvas` / `HTMLVideoElement` / `HTMLImageElement` | Внешний элемент или CSS-селектор, автоматически отрисовывается каждый кадр _(с 4.3.0)_ |
| `draw`    | `(context: BackgroundDrawContext, delta: IDelta) => void`                                    | Пользовательский draw callback на основном canvas контексте каждый кадр _(с 4.3.0)_    |

### Порядок слоёв _(с 4.3.0)_

1. `clear()` — очистка пикселей canvas
2. `cover.element` авто-отрисовка (если установлено)
3. `cover.draw` callback (если установлен)
4. Статическое наложение (цвет/изображение) — запасной вариант
5. Глобальная операция композиции

## Когда это использовать

- Эффекты, похожие на прожектор.
- Контрастные главные разделы.
- Многоуровневое взаимодействие на темном фоне.

## Ссылка на источник

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/BackgroundMask.md>
