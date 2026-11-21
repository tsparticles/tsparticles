# Particles Paint

Defines particle painting options grouped under `paint`.

## Properties

| Key      | Type               | Notes                                |
| -------- | ------------------ | ------------------------------------ |
| `color`  | `IColor`           | Default fill/stroke color fallback   |
| `fill`   | `IColorFill`       | Inner particle color options         |
| `stroke` | `SingleOrMultiple` | Outline options, see {@link IStroke} |

`paint.color` is used as the base color for both fill and stroke when their own `color` is not set. If `paint.fill.color` or
`paint.stroke.color` are provided, they override `paint.color`.

## Defaults

- `paint.color.value`: `"#fff"`
- `paint.fill.enable`: `true`

These defaults are initialized in particle options and keep the historical behavior: particles are white and filled unless
overridden.

## `fill` details

`paint.fill` controls particle fill color and related animation settings.
Color animation uses independent OKLCH channels. Hue `h` is measured in
degrees, chroma `c` in OKLab units, and lightness `l` on a 0–100 scale. HSL
saturation animation (`s`) is unsupported because its values do not map directly
to OKLCH chroma.

```json
{
  "paint": {
    "color": {
      "value": "#22d3ee"
    },
    "fill": {
      "enable": true,
      "color": {
        "value": ["#60a5fa", "#a78bfa", "#f472b6"]
      }
    }
  }
}
```

An animated fill can configure each channel independently:

```ts
paint: {
  fill: {
    color: {
      value: "oklch(65% 0.2 285)",
      animation: {
        h: { enable: true, speed: 12 },
        c: { enable: true, speed: 0.04, min: 0.08 },
        l: { enable: true, speed: 3, min: 45, max: 80 },
      },
    },
  },
}
```

## `stroke` details

`paint.stroke` controls particle outline color and width.

```json
{
  "paint": {
    "color": {
      "value": "#14b8a6"
    },
    "stroke": {
      "width": 2,
      "color": {
        "value": "#ffffff"
      }
    }
  }
}
```

## Related docs

- Fill color models: [Color](../../Color.md)
- Particles root: [Particles](../Particles.md)
- Options root: [Options](../../Options.md)
