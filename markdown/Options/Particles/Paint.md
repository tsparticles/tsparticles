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
