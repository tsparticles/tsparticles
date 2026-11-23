# Colors

This page explains all color formats accepted by tsParticles options.
Every resolved engine color is stored internally as floating-point OKLCH plus
independent alpha. Other supported formats are converted at input resolution;
animation and extensions use the same canonical color model.
Supported CSS/Canvas destinations receive `oklch(...)` directly. Before
serialization, the engine maps a copy into the effective sRGB or Display-P3
gamut by reducing chroma while preserving lightness and hue; canonical runtime
state stays unchanged. HDR output remains a separate rendering path.

Most color fields accept either:

- a `string`
- an object with a `value` property

Note: particle base color has additional behaviors, see {@link IParticlesOptions.color}.

## Quick examples

```json
{
  "particles": {
    "color": {
      "value": "#ffffff"
    },
    "links": {
      "color": "#4f46e5"
    }
  }
}
```

```json
{
  "background": {
    "color": {
      "value": "rgb(15, 23, 42)"
    }
  }
}
```

## String formats

### Hex (short)

```json
"#fff"
```

### Hex (full)

```json
"#ffffff"
```

### RGB

Alpha in color strings is preserved and composes with dedicated opacity options.

```json
"rgb(255, 255, 255)"
```

### HSL

Alpha in color strings is preserved and composes with dedicated opacity options.

```json
"hsl(0, 100%, 100%)"
```

### HSV

Alpha in color strings is preserved and composes with dedicated opacity options.

```json
"hsv(0, 100%, 100%)"
```

### Display-P3

```json
"color(display-p3 1 0 0 / 50%)"
```

### Random

```json
"random"
```

## Object formats

### String value

```json
{
  "value": "#fff"
}
```

### RGB object

```json
{
  "value": {
    "r": 255,
    "g": 255,
    "b": 255
  }
}
```

Untagged RGB objects mean sRGB. Specify `colorSpace` when the channels use
Display-P3 primaries. `p3: true` and `p3: false` are equivalent input-only
shorthands for `colorSpace: "display-p3"` and `colorSpace: "srgb"`:

```json
{
  "value": {
    "r": 255,
    "g": 0,
    "b": 0,
    "colorSpace": "display-p3",
    "a": 0.5
  }
}
```

This describes the source channels and does not select the canvas output space.
When both `p3` and `colorSpace` are supplied, they must agree. Intrinsically
tagged strings such as `color(display-p3 ...)` keep their own source space.
The same source metadata and optional alpha are accepted for wrapped
`value.rgb` objects and ranged RGB channel objects.
Channel objects with an `hdr` property are rejected: a boolean does not identify
the transfer function, channel scale, reference white, or absolute luminance.
HDR source decoding is not currently supported; `hdr` options configure output.
Canvas image/text sampling retains the color space reported by `ImageData`; when
a sampled pixel becomes an emitter or canvas-mask particle color, that source
space is used for the OKLCH conversion. Readback uses RGBA-unorm8, so sampled
pixels do not retain HDR headroom. Canvas pixel filter callbacks receive the
source space as an optional second argument.

### HSL object

```json
{
  "value": {
    "h": 0,
    "s": 100,
    "l": 100
  }
}
```

### HSV object

```json
{
  "value": {
    "h": 0,
    "s": 100,
    "v": 100
  }
}
```

### Mixed object (`rgb` and `hsl`)

```json
{
  "value": {
    "rgb": {
      "r": 255,
      "g": 255,
      "b": 255
    },
    "hsl": {
      "h": 0,
      "s": 100,
      "l": 100
    }
  }
}
```

If both `rgb` and `hsl` are provided, `rgb` is used.

## Mixing colors

Use `colorMixOklch(color1, color2, weight1, weight2)` when a mixed color will
remain an engine color. It interpolates rectangular OKLab coordinates and
returns canonical OKLCH with alpha. The color coordinates use premultiplied
alpha while output alpha is interpolated separately; a zero total weight uses
equal weights, and fully transparent inputs retain their deterministic weighted
color coordinates. The older `colorMix()` returns RGB for compatibility and is
deprecated.

## Multiple colors

`color.value` can be an array of mixed valid values; one is picked randomly.

This works well for most elements, but runtime-generated entities (like some `links`) can produce frequent color
changes.

## Related docs

- Root options: [Options](./Options.md)
- Container runtime API: [Container](./Container.md)
