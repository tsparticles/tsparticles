# Background Mask

`backgroundMask` lets particles punch through or blend with a masked background layer.

## Examples

### Static cover (legacy)

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

### Dynamic draw callback _(since 4.3.0)_

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

### External element _(since 4.3.0)_

```ts
backgroundMask: {
  enable: true,
  cover: {
    element: "#myVideo",
    opacity: 0.8,
  },
}
```

## Properties

| Property    | Type                       | Description                                               |
| ----------- | -------------------------- | --------------------------------------------------------- |
| `enable`    | `boolean`                  | Activates background masking                              |
| `composite` | `GlobalCompositeOperation` | Canvas composite operation (default: `"destination-out"`) |
| `cover`     | `BackgroundMaskCover`      | Cover configuration                                       |

### `cover` (BackgroundMaskCover)

| Property  | Type                                                                                         | Description                                                            |
| --------- | -------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| `color`   | `string` / `OptionsColor`                                                                    | Cover color                                                            |
| `image`   | `string`                                                                                     | Cover image URL                                                        |
| `opacity` | `number`                                                                                     | Cover alpha level (0..1, default: `1`)                                 |
| `element` | `string` / `HTMLCanvasElement` / `OffscreenCanvas` / `HTMLVideoElement` / `HTMLImageElement` | External element or CSS selector auto-drawn each frame _(since 4.3.0)_ |
| `draw`    | `(context: BackgroundDrawContext, delta: IDelta) => void`                                    | Custom draw callback on main canvas context each frame _(since 4.3.0)_ |

### Layer order _(since 4.3.0)_

1. `clear()` — canvas pixel clear
2. `cover.element` auto-draw (if set)
3. `cover.draw` callback (if set)
4. Static cover (color/image) — fallback
5. Global composite operation

## When to use it

- Spotlight-like effects.
- Contrast-heavy hero sections.
- Layered interactions on dark backgrounds.

## Source reference

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/BackgroundMask.md>
