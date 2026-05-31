# Blend Plugin Options

The `blend` plugin provides canvas blend/composite operations for particles, letting you use different blend modes when drawing particles on the canvas.

## Properties

| Key      | Type      | Default             | Notes                                                                                                                                                                                      |
| -------- | --------- | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `enable` | `boolean` | `false`             | Enables the blend mode, applying the `composite` option to all drawn elements                                                                                                              |
| `mode`   | `string`  | `"destination-out"` | The composition mode for the blend effect, see [MDN globalCompositeOperation](https://developer.mozilla.org/en-US/docs/Web/API/OffscreenCanvasRenderingContext2D/globalCompositeOperation) |

## Quick example

```json
{
  "blend": {
    "enable": true,
    "mode": "source-over"
  }
}
```

## Common blend modes

| Mode                | Effect                                  |
| ------------------- | --------------------------------------- |
| `"source-over"`     | Default — draws new over old            |
| `"destination-out"` | Unveils background below drawn elements |
| `"source-atop"`     | New drawn only where old is opaque      |
| `"lighter"`         | Sums colors (additive blending)         |
| `"multiply"`        | Multiplies colors                       |
| `"screen"`          | Invert, multiply, invert (brightening)  |
| `"overlay"`         | Mix of multiply and screen              |

## Related docs

- Options root: [Options](../../Options.md)
