# Particles Paint

Defines particle painting options grouped under `paint`.

## Properties

| Key      | Type               | Notes                                |
| -------- | ------------------ | ------------------------------------ |
| `fill`   | `IColorFill`       | Inner particle color options         |
| `stroke` | `SingleOrMultiple` | Outline options, see {@link IStroke} |

## `fill` details

`paint.fill` controls particle fill color and related animation settings.

```json
{
  "paint": {
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
