# Background Mask Plugin Options

The `backgroundMask` plugin lets you draw a cover or mask over the canvas using compositing operations. Useful for hiding/masking parts of the rendering or creating erasing effects.

Core properties

- `composite` (GlobalCompositeOperation) — Default: `"destination-out"`. The compositing operation applied when the cover/mask is drawn. Possible values are standard Canvas 2D `globalCompositeOperation`.
- `cover` (BackgroundMaskCover) — Default: object with `opacity: 1`. Defines the cover to draw (color/image/element/draw/opacity).
- `enable` (boolean) — Default: `false`. Enables masking behavior.

BackgroundMaskCover (sub-object)

- `color` (OptionsColor | undefined) — Default: `undefined`. Color used for the cover. Created via `OptionsColor.create` when provided.
- `image` (string | undefined) — Default: `undefined`. URL of the image to use as the cover.
- `element` (string | HTMLCanvasElement | OffscreenCanvas | HTMLVideoElement | HTMLImageElement | undefined) — Default: `undefined`. External element or CSS selector auto-drawn each frame as the mask source _(since 4.3)_.
- `draw` ((context: BackgroundDrawContext, delta: IDelta) => void | undefined) — Default: `undefined`. Custom callback executed each frame on the main canvas context; `delta` is a fallback `{ value: 0, factor: 1 }` _(since 4.3)_.
- `opacity` (number) — Default: `1`. Cover opacity (0..1).

Layer order _(since 4.3)_

1. `clear()` — canvas pixel clear
2. `cover.element` auto-draw — `ctx.drawImage()` of the external element (if set)
3. `cover.draw` callback — custom drawing on the main context (if set)
4. Static cover (color/image) — fallback, only if neither element nor draw is set
5. Global composite operation — applied by `drawSettingsSetup`

Static (legacy) config

```json
{
  "backgroundMask": {
    "enable": true,
    "composite": "destination-out",
    "cover": {
      "color": { "value": "#000000" },
      "opacity": 1
    }
  }
}
```

Dynamic draw callback _(since 4.3)_

```ts
{
  backgroundMask: {
    enable: true,
    cover: {
      draw: (ctx) => {
        const t = performance.now() * 0.001;
        ctx.fillStyle = `hsl(${(t * 30) % 360}, 70%, 50%)`;
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      },
    },
  },
}
```

External element _(since 4.3)_

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

Element resolution rules _(since 4.3)_

- CSS selector string → resolved via `document.querySelector()`:
  - Matched drawable element → stored
  - Matched non-drawable → warning `mask-element-not-supported`
  - No match → warning `mask-element-not-found`
- Direct reference (canvas, video, img, OffscreenCanvas) → stored directly
- `undefined`/`null` → skipped, static cover used

### Warning keys (logged once per key)

| Key                          | Message                                                   | Condition                             |
| ---------------------------- | --------------------------------------------------------- | ------------------------------------- |
| `mask-element-not-found`     | `Mask cover element selector "..." not found in the DOM`  | CSS selector didn't match any element |
| `mask-element-not-supported` | `Mask cover element "..." matched a non-drawable element` | Selector matched non-drawable element |
| `mask-element-draw-error`    | `Error drawing background mask cover element onto canvas` | `ctx.drawImage()` threw               |
| `mask-draw-error`            | `Error in mask cover.draw callback`                       | `cover.draw` callback threw           |

Usage notes

- If `cover` is provided as a string it is treated as a color (e.g. `"#000000"`).
- To use an image as cover, set `cover.image` with the URL and adjust `composite` if needed.
- When using `cover.draw` or `cover.element`, the static fallback (color/image) is skipped automatically.
- At least one of `color`, `image`, `element`, or `draw` should be set; if none are present the cover is transparent.
- Non-DOM environments safely skip CSS selector resolution.
- For default and implementation details see `plugins/backgroundMask/src/Options/Classes/BackgroundMask.ts` and `BackgroundMaskCover.ts`.
