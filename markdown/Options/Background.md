# Background

Controls the canvas background layer rendered behind particles.

## Layer order (back to front)

1. **CSS background** (color, image, position, repeat, size) — applied as DOM canvas style
2. **`clear()`** — canvas pixel clear each frame
3. **`background.element` auto-draw** — if set, `ctx.drawImage(element, ...)` composites the external element as-is
4. **`background.draw` callback** — if set, called with the main rendering context + delta
5. **Particles** — drawn on top

`element` and `draw` are **independent layers**. Both are optional and can be used together or separately.

## Properties

| Key        | Type                                                                                         | Example                                   | Notes                                                                         |
| ---------- | -------------------------------------------------------------------------------------------- | ----------------------------------------- | ----------------------------------------------------------------------------- |
| `color`    | `string` / `object`                                                                          | `"#bada55"` / `{ "value": "#bada55" }`    | Background color, supports {@link IColor}                                     |
| `opacity`  | `number`                                                                                     | `1` / `0.5`                               | Background color alpha, from `0` to `1`                                       |
| `image`    | `string`                                                                                     | `"url('...')"`                            | CSS `background-image` value                                                  |
| `position` | `string`                                                                                     | `"50% 50%"`                               | CSS `background-position` value                                               |
| `repeat`   | `string`                                                                                     | `"no-repeat"`                             | CSS `background-repeat` value                                                 |
| `size`     | `string`                                                                                     | `"cover"`                                 | CSS `background-size` value                                                   |
| `element`  | `string` / `HTMLCanvasElement` / `OffscreenCanvas` / `HTMLVideoElement` / `HTMLImageElement` | `"#bg"` / `document.getElementById("bg")` | External element auto-drawn each frame via `drawImage`; not managed by engine |
| `draw`     | `function`                                                                                   | `(ctx, delta) => { /* custom draw */ }`   | Per-frame custom background callback on main canvas context                   |

## Quick examples

### Solid color

```json
{
  "background": {
    "color": "#0f172a"
  }
}
```

### Semi-transparent color

```json
{
  "background": {
    "color": {
      "value": "#0ea5e9"
    },
    "opacity": 0.2
  }
}
```

### Background image

```json
{
  "background": {
    "image": "url('https://particles.js.org/images/background3.jpg')",
    "position": "50% 50%",
    "repeat": "no-repeat",
    "size": "cover"
  }
}
```

### Custom background draw

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

### Element auto-draw (external canvas, video, or image)

```json
{
  "background": {
    "element": "#my-bg-canvas"
  }
}
```

When `element` is set, the element's current visual content is drawn onto the main canvas each frame. The element is **not managed** by the engine — external code handles its rendering.

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

Supported element types:

- `HTMLCanvasElement` / `OffscreenCanvas`
- `HTMLVideoElement` (draws the current frame)
- `HTMLImageElement`
- CSS selector string matching any of the above in the DOM

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
