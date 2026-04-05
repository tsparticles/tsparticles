# Particles Roll

Adds a rolling effect that changes perceived front/back shading while particles move.

## Properties

| Key                | Type               | Example                    | Notes                               |
| ------------------ | ------------------ | -------------------------- | ----------------------------------- |
| `enable`           | `boolean`          | `true` / `false`           | Enables roll effect                 |
| `speed`            | `number` / `range` | `0` / `{ min: 1, max: 5 }` | Roll speed                          |
| `backColor`        | `color object`     |                            | Back-face color, see {@link IColor} |
| `darken.enable`    | `boolean`          | `true` / `false`           | Enables darkening on rotation       |
| `darken.value`     | `number`           | `5`                        | Percent of darkness                 |
| `enlighten.enable` | `boolean`          | `true` / `false`           | Enables lightening on rotation      |
| `enlighten.value`  | `number`           | `5`                        | Percent of lightness                |

## Quick example

```json
{
  "roll": {
    "enable": true,
    "speed": { "min": 2, "max": 6 },
    "darken": {
      "enable": true,
      "value": 15
    },
    "enlighten": {
      "enable": false,
      "value": 0
    }
  }
}
```
