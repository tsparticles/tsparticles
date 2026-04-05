# Particles zIndex

Controls how particle layering affects opacity, velocity, and size.

## Properties

| Key            | Type               | Example                            | Notes                                    |
| -------------- | ------------------ | ---------------------------------- | ---------------------------------------- |
| `value`        | `number` / `range` | `0...100` / `{ min: 0, max: 100 }` | Base z-layer value                       |
| `opacityRate`  | `number`           | `2`                                | Multiplier applied to opacity by zIndex  |
| `velocityRate` | `number`           | `-10`                              | Multiplier applied to velocity by zIndex |
| `sizeRate`     | `number`           | `5`                                | Multiplier applied to size by zIndex     |

## Quick example

```json
{
  "zIndex": {
    "value": {
      "min": 0,
      "max": 50
    },
    "opacityRate": 1,
    "velocityRate": -2,
    "sizeRate": 2
  }
}
```
