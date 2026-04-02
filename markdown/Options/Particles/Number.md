# Particles Number

Controls how many particles exist and how their count is distributed across the canvas.

## Properties

| Key              | Type      | Example          | Notes                                                     |
| ---------------- | --------- | ---------------- | --------------------------------------------------------- |
| `value`          | `number`  | `40`             | Total particle count                                      |
| `limit`          | `number`  | `200`            | Maximum allowed particles; `0` or less disables the limit |
| `density.enable` | `boolean` | `true` / `false` | Scales particle count based on canvas area                |
| `density.area`   | `number`  | `800`            | Reference area (px²) used for density calculation         |

## Quick examples

### Fixed count

```json
{
  "number": {
    "value": 60
  }
}
```

### Density-based count (adapts to screen size)

```json
{
  "number": {
    "value": 80,
    "density": {
      "enable": true,
      "area": 800
    }
  }
}
```

With `density.enable: true`, the actual particle count is calculated as:

```
count = value × (canvas area / area)
```

A `800×600` canvas with `value: 80` and `area: 800` will render approximately 60 particles.
A `1920×1080` canvas with the same config will render approximately 259 particles.

### With a cap

```json
{
  "number": {
    "value": 80,
    "limit": 150,
    "density": {
      "enable": true,
      "area": 800
    }
  }
}
```

## Common pitfalls

- Setting a very high `value` without density enabled causes performance issues on small screens
- Setting `density.enable: true` but not adjusting `value` and `area` together leads to unexpected counts
- `limit` is a hard cap and applies after density calculation; if density produces a higher count, the excess is silently dropped

## Related docs

- Particles root: [Particles](../Particles.md)
- Options root: [Options](../../Options.md)
