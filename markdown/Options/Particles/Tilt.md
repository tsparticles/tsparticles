# Particles Tilt

Applies tilt rotation to particle rendering.

## Properties

| Key                | Type               | Example                                            | Notes                               |
| ------------------ | ------------------ | -------------------------------------------------- | ----------------------------------- |
| `enable`           | `boolean`          | `true` / `false`                                   | Enables tilt effect                 |
| `value`            | `number` / `range` | `0` / `{ min: 1, max: 5 }`                         | Base tilt angle in degrees          |
| `direction`        | `string`           | `"clockwise"` / `"counter-clockwise"` / `"random"` | Tilt direction                      |
| `animation.enable` | `boolean`          | `true` / `false`                                   | Enables tilt animation              |
| `animation.speed`  | `number`           | `5`                                                | Tilt speed                          |
| `animation.sync`   | `boolean`          | `true` / `false`                                   | `true`: synchronized tilt animation |

## Quick example

```json
{
  "tilt": {
    "enable": true,
    "value": { "min": 0, "max": 45 },
    "direction": "random",
    "animation": {
      "enable": true,
      "speed": 20,
      "sync": false
    }
  }
}
```
