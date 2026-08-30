# Background & Canvas

This section controls the canvas layer and full-screen behavior.

## Layer order (back to front)

1. **CSS background** (`color`, `image`, `position`, `repeat`, `size`) — applied as DOM canvas style
2. **`clear()`** — canvas pixel clear each frame
3. **`background.element` auto-draw** — if set, `ctx.drawImage(element, ...)` composites the external element as-is
4. **`background.draw` callback** — if set, called with the main rendering context + delta
5. **Particles** — drawn on top

`element` and `draw` are **independent layers**. Both are optional and can be used together or separately.

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

| Key        | Type                                                                                         | Description                                                                        |
| ---------- | -------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| `color`    | `string` / `object`                                                                          | Canvas background color. Supports {@link IColor}.                                  |
| `opacity`  | `number`                                                                                     | Alpha channel for the background color, from `0` to `1`.                           |
| `image`    | `string`                                                                                     | CSS `background-image` value (e.g. `url('...')`).                                  |
| `position` | `string`                                                                                     | CSS `background-position` value.                                                   |
| `repeat`   | `string`                                                                                     | CSS `background-repeat` value.                                                     |
| `size`     | `string`                                                                                     | CSS `background-size` value.                                                       |
| `element`  | `string` / `HTMLCanvasElement` / `OffscreenCanvas` / `HTMLVideoElement` / `HTMLImageElement` | External element auto-drawn each frame via `drawImage`. Not managed by the engine. |
| `draw`     | `(context, delta) => void`                                                                   | Per-frame custom background callback on the main canvas context.                   |

### `element`

When `element` is set, the element's current visual content is drawn onto the main canvas each frame via `ctx.drawImage()`. The element is **not managed** by the engine — external code handles its rendering.

Supported element types:

- `HTMLCanvasElement` / `OffscreenCanvas`
- `HTMLVideoElement` (draws the current frame)
- `HTMLImageElement`
- CSS selector string matching any of the above in the DOM

```json
{
  "background": {
    "element": "#my-bg-canvas"
  }
}
```

```ts
// Auto-draw an external <video> element as background
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

A per-frame callback for custom background rendering. Always receives the **main canvas context** (`OffscreenCanvasRenderingContext2D | CanvasRenderingContext2D`), never the element's context.

```json
{
  "background": {
    "draw": "(ctx, delta) => { ctx.fillStyle = 'blue'; ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height); }"
  }
}
```

(TypeScript uses a function reference, not a string.)

```ts
import { type BackgroundDrawContext, type IDelta } from "@tsparticles/engine";

const drawBackground = (ctx: BackgroundDrawContext, delta: IDelta): void => {
  ctx.fillStyle = "#ff0000";
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
};
```

### Combined element + draw

Both layers run independently every frame. Element is drawn first, then the draw callback:

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

- `enable`: makes the canvas full viewport.
- `zIndex`: useful to place particles behind your content.

For embedded playgrounds and inline docs previews, set:

```ts
fullScreen: {
  enable: false,
}
```

## `detectRetina`

```ts
detectRetina: true;
```

Improves rendering on HiDPI screens, but increases GPU/CPU load.

## Practical notes

- For landing pages, use `fullScreen.enable: true` with `zIndex: -1`.
- If you see slowdowns on mobile, try `detectRetina: false`.
- If a config is designed for fullscreen, disable `fullScreen` before embedding it in a bounded section.
