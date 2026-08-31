# Plugin Option: Background Mask

`backgroundMask` draws a cover or mask over the canvas using compositing operations.

## Examples

### Static cover (legacy)

```ts
backgroundMask: {
  enable: true,
  composite: "destination-out",
  cover: {
    color: { value: "#000000" },
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

| Property    | Type                       | Default             | Description                  |
| ----------- | -------------------------- | ------------------- | ---------------------------- |
| `enable`    | `boolean`                  | `false`             | Enables background mask mode |
| `composite` | `GlobalCompositeOperation` | `"destination-out"` | Canvas composite operation   |
| `cover`     | `BackgroundMaskCover`      | `{ opacity: 1 }`    | Cover configuration          |

### `cover` (BackgroundMaskCover)

| Property  | Type                                                                                         | Default     | Description                                                                                                             |
| --------- | -------------------------------------------------------------------------------------------- | ----------- | ----------------------------------------------------------------------------------------------------------------------- |
| `color`   | `string` / `OptionsColor`                                                                    | `undefined` | Cover color                                                                                                             |
| `image`   | `string`                                                                                     | `undefined` | Cover image URL                                                                                                         |
| `opacity` | `number`                                                                                     | `1`         | Cover alpha (0..1)                                                                                                      |
| `element` | `string` / `HTMLCanvasElement` / `OffscreenCanvas` / `HTMLVideoElement` / `HTMLImageElement` | `undefined` | External element or CSS selector auto-drawn each frame _(since 4.3.0)_                                                  |
| `draw`    | `(context: BackgroundDrawContext, delta: IDelta) => void`                                    | `undefined` | Custom draw callback on main canvas context each frame; `delta` is a fallback `{ value: 0, factor: 1 }` _(since 4.3.0)_ |

## Layer order _(since 4.3.0)_

1. `clear()` — canvas pixel clear
2. `cover.element` auto-draw (if set)
3. `cover.draw` callback (if set)
4. Static cover (color/image) — fallback, only if neither element nor draw is set
5. Global composite operation

## Notes

- Use `cover.image` to use an image as the mask cover.
- When `cover.draw` or `cover.element` is set, the static cover (color/image) is skipped.
- If none of `color`, `image`, `element`, `draw` are set, the cover is transparent.
- The plugin extends the built-in `backgroundMask` with additional compositing features.

## Source reference

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Plugins/BackgroundMask.md>
