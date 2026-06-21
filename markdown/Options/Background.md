# Background

Controls the canvas background layer rendered behind particles.

## Properties

| Key        | Type                                               | Example                                                    | Notes                                                     |
| ---------- | -------------------------------------------------- | ---------------------------------------------------------- | --------------------------------------------------------- |
| `color`    | `string` / `object`                                | `"#bada55"` / `{ "value": "#bada55" }`                     | Background color, supports {@link IColor}                 |
| `opacity`  | `number`                                           | `1` / `0.5`                                                | Background color alpha, from `0` to `1`                   |
| `image`    | `string`                                           | `"url('https://particles.js.org/images/background3.jpg')"` | CSS `background-image` value                              |
| `position` | `string`                                           | `"50% 50%"`                                                | CSS `background-position` value                           |
| `repeat`   | `string`                                           | `"no-repeat"`                                              | CSS `background-repeat` value                             |
| `size`     | `string`                                           | `"cover"`                                                  | CSS `background-size` value                               |
| `element`  | `string` / `HTMLCanvasElement` / `OffscreenCanvas` | `"#bg"` / `document.getElementById("bg")`                  | Target canvas for `draw`; omitted → uses particles canvas |
| `draw`     | `function`                                         | `(ctx, delta) => { /* custom draw */ }`                    | Per-frame custom background callback, called after clear  |

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

### Custom background draw on external element

```json
{
  "background": {
    "element": "#my-bg-canvas",
    "draw": "(ctx, delta) => { ctx.fillStyle = 'rgba(0,0,0,0.1)'; ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height); }"
  }
}
```

```ts
import { BackgroundDrawContext, IDelta } from "@tsparticles/engine";

const drawBackground = (ctx: BackgroundDrawContext, delta: IDelta): void => {
  // Composite over the external canvas each frame
  ctx.fillStyle = `rgba(0,0,0,${0.05 * delta.factor})`;
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
};

tsParticles.load({
  id: "tsparticles",
  options: {
    background: {
      element: "#bg-canvas",
      draw: drawBackground,
    },
  },
});
```
