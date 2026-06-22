# Background Mask

Configures masking between particles and the background/cover layer.

## Properties

| Key         | Type                | Example             | Notes                                                     |
| ----------- | ------------------- | ------------------- | --------------------------------------------------------- |
| `enable`    | `boolean`           | `true` / `false`    | Enables background mask mode                              |
| `composite` | `string`            | `"destination-out"` | Canvas composite operation                                |
| `cover`     | `string` / `object` | `"#000000"`         | Cover color config, supports {@link IBackgroundMaskCover} |

## Cover properties

| Key       | Type                                                                                                       | Example                                | Notes                                                      |
| --------- | ---------------------------------------------------------------------------------------------------------- | -------------------------------------- | ---------------------------------------------------------- |
| `color`   | `string` / `object`                                                                                        | `"#bada55"` / `{ "value": "#bada55" }` | Cover color, supports {@link IColor}                       |
| `opacity` | `number`                                                                                                   | `1` / `0.5`                            | Cover alpha, from `0` to `1`                               |
| `image`   | `string`                                                                                                   | `"https://..."`                        | Image URL for the cover                                    |
| `element` | `string` / `HTMLCanvasElement` / `OffscreenCanvas` / `HTMLVideoElement` / `HTMLImageElement` _(since 4.3)_ | `"#myCanvas"` / direct reference       | External element auto-drawn as mask source                 |
| `draw`    | `(context: BackgroundDrawContext, delta: IDelta) => void` _(since 4.3)_                                    | custom callback function               | Custom draw callback on the main canvas context each frame |

## Quick examples

### Enable default mask behavior

```json
{
  "backgroundMask": {
    "enable": true
  }
}
```

### Custom composite and cover

```json
{
  "backgroundMask": {
    "enable": true,
    "composite": "destination-out",
    "cover": {
      "color": {
        "value": "#111827"
      },
      "opacity": 0.9
    }
  }
}
```

### Dynamic source — custom draw callback _(since 4.3)_

```ts
{
  backgroundMask: {
    enable: true,
    cover: {
      draw: (ctx) => {
        ctx.fillStyle = `hsl(${(performance.now() * 0.001 * 30) % 360}, 70%, 50%)`;
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      },
    },
  },
}
```

### Dynamic source — external element _(since 4.3)_

```json
{
  "backgroundMask": {
    "enable": true,
    "cover": {
      "element": "#myVideo",
      "opacity": 0.8
    }
  }
}
```
