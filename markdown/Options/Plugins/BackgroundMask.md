# Background Mask Plugin Options

The `backgroundMask` plugin lets you draw a cover or mask over the canvas using compositing operations. Useful for hiding/masking parts of the rendering or creating erasing effects.

Core properties

- `composite` (GlobalCompositeOperation) — Default: `"destination-out"`. The compositing operation applied when the cover/mask is drawn. Possible values are standard Canvas 2D `globalCompositeOperation`.
- `cover` (BackgroundMaskCover) — Default: object with `opacity: 1`. Defines the cover to draw (color/image/opacity).
- `enable` (boolean) — Default: `false`. Enables masking behavior.

BackgroundMaskCover (sub-object)

- `color` (OptionsColor | undefined) — Default: `undefined`. Color used for the cover. Created via `OptionsColor.create` when provided.
- `image` (string | undefined) — Default: `undefined`. URL of the image to use as the cover.
- `opacity` (number) — Default: `1`. Cover opacity (0..1).

JSON example

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

Usage notes

- If `cover` is provided as a string it is treated as a color (e.g. `"#000000"`).
- To use an image as cover, set `cover.image` with the URL and adjust `composite` if needed.
- For default and implementation details see `plugins/backgroundMask/src/Options/Classes/BackgroundMask.ts` and `BackgroundMaskCover.ts`.
