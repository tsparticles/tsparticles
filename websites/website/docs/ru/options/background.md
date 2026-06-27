# Фон и холст

Этот раздел управляет слоем холста и поведением в полноэкранном режиме.

## Порядок слоев (сзади наперед)

1. **CSS-фон** (`color`, `image`, `position`, `repeat`, `size`) — применяется как стиль DOM холста
2. **`clear()`** — очистка пикселей холста каждый кадр
3. **`background.element` авто-рисование** — если задан, `ctx.drawImage(element, ...)`
4. **`background.draw` callback** — если задан, вызывается с основным контекстом рендеринга + delta
5. **Частицы** — рисуются поверх

`element` и `draw` являются **независимыми слоями**. Оба опциональны и могут использоваться вместе или по отдельности.

## `background`

```ts
background: {
  color: "#0b1020",
  image: "",
  position: "50% 50%",
  repeat: "no-repeat",
  size: "cover"
}
```

| Ключ       | Тип                                                                                          | Описание                                                                                       |
| ---------- | -------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| `color`    | `string` / `object`                                                                          | Цвет фона холста.                                                                              |
| `opacity`  | `number`                                                                                     | Альфа-канал для цвета фона, от `0` до `1`.                                                     |
| `image`    | `string`                                                                                     | Значение CSS `background-image` (напр. `url('...')`).                                          |
| `position` | `string`                                                                                     | Значение CSS `background-position`.                                                            |
| `repeat`   | `string`                                                                                     | Значение CSS `background-repeat`.                                                              |
| `size`     | `string`                                                                                     | Значение CSS `background-size`.                                                                |
| `element`  | `string` / `HTMLCanvasElement` / `OffscreenCanvas` / `HTMLVideoElement` / `HTMLImageElement` | Внешний элемент, автоматически рисуемый каждый кадр через `drawImage`. Не управляется движком. |
| `draw`     | `(context, delta) => void`                                                                   | Покадровый callback для пользовательской отрисовки фона на основном контексте холста.          |

### `element`

Когда `element` задан, текущее визуальное содержимое элемента рисуется на основном холсте каждый кадр через `ctx.drawImage()`. Элемент **не управляется движком** — внешний код отвечает за его рендеринг.

Поддерживаемые типы элементов:

- `HTMLCanvasElement` / `OffscreenCanvas`
- `HTMLVideoElement` (рисует текущий кадр)
- `HTMLImageElement`
- Строка CSS-селектора, соответствующая любому из вышеперечисленных в DOM

```json
{
  "background": {
    "element": "#my-bg-canvas"
  }
}
```

```ts
// Автоматически рисовать внешний элемент <video> как фон
tsParticles.load({
  id: "tsparticles",
  options: {
    background: {
      element: "#bg-video",
    },
  },
});
```

### `draw`

Покадровый callback для пользовательской отрисовки фона. Всегда получает **основной контекст холста** (`OffscreenCanvasRenderingContext2D | CanvasRenderingContext2D`), никогда не получает контекст элемента.

```json
{
  "background": {
    "draw": "(ctx, delta) => { ctx.fillStyle = 'blue'; ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height); }"
  }
}
```

(TypeScript использует ссылку на функцию, а не строку.)

```ts
import { type BackgroundDrawContext, type IDelta } from "@tsparticles/engine";

const drawBackground = (ctx: BackgroundDrawContext, delta: IDelta): void => {
  ctx.fillStyle = "#ff0000";
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
};
```

### Комбинированные element + draw

Оба слоя выполняются независимо каждый кадр. Сначала рисуется элемент, затем callback draw:

```ts
import { type BackgroundDrawContext, type IDelta } from "@tsparticles/engine";

tsParticles.load({
  id: "tsparticles",
  options: {
    background: {
      element: "#bg-canvas",
      draw: (ctx: BackgroundDrawContext, delta: IDelta) => {
        ctx.fillStyle = `rgba(0,0,0,${0.05 * delta.factor})`;
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      },
    },
  },
});
```

## `fullScreen`

```ts
fullScreen: {
  enable: true,
  zIndex: -1
}
```

- `enable`: делает область просмотра холста полной.
- `zIndex`: полезно для размещения частиц позади вашего контента.

Для встроенных игровых площадок и встроенного предварительного просмотра документов установите:

```ts
fullScreen: {
  enable: false,
}
```

## `detectRetina`

```ts
detectRetina: true;
```

Улучшает рендеринг на экранах HiDPI, но увеличивает нагрузку на графический процессор/процессор.

## Практические замечания

- Для целевых страниц используйте `fullScreen.enable: true` с `zIndex: -1`.
- Если вы заметили замедление работы на мобильном устройстве, попробуйте `detectRetina: false`.
- Если конфигурация предназначена для полноэкранного режима, отключите `fullScreen` перед встраиванием его в ограниченный раздел.
