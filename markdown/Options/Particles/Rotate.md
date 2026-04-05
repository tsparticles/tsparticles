# Particles Rotate

Controls particle rotation angle and rotation animation.

## Properties

| Key                | Type               | Example                                            | Notes                                |
| ------------------ | ------------------ | -------------------------------------------------- | ------------------------------------ |
| `direction`        | `string`           | `"clockwise"` / `"counter-clockwise"` / `"random"` | Rotation direction                   |
| `path`             | `boolean`          | `true` / `false`                                   | Rotates according to movement path   |
| `value`            | `number` / `range` | `0` / `{ min: 90, max: 270 }`                      | Base angle in degrees                |
| `animation.enable` | `boolean`          | `true` / `false`                                   | Enables continuous rotation          |
| `animation.speed`  | `number`           | `5`                                                | Degrees per second                   |
| `animation.sync`   | `boolean`          | `true` / `false`                                   | `true`: all particles rotate in sync |

## Quick example

```json
{
  "rotate": {
    "value": { "min": 0, "max": 360 },
    "direction": "random",
    "path": false,
    "animation": {
      "enable": true,
      "speed": 25,
      "sync": false
    }
  }
}
```
