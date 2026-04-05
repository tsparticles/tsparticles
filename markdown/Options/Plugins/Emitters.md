# Emitters

Defines particle emitters that continuously or periodically spawn particles.

## Properties

| Key             | Type     | Example                                                                                                            | Notes                                                   |
| --------------- | -------- | ------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------- |
| `direction`     | `string` | `"none"`, `"top"`, `"top-right"`, `"right"`, `"bottom-right"`, `"bottom"`, `"bottom-left"`, `"left"`, `"top-left"` | Spawn direction                                         |
| `life.count`    | `number` | `1`                                                                                                                | Number of emitter cycles                                |
| `life.duration` | `number` | `5`                                                                                                                | Emitter active duration (seconds)                       |
| `life.delay`    | `number` | `0.1`                                                                                                              | Delay between cycles (seconds)                          |
| `particles`     | `object` |                                                                                                                    | Spawned particle options, see {@link IParticlesOptions} |
| `position`      | `object` | `{ "x": 50, "y": 50 }`                                                                                             | Position in canvas percent values                       |
| `size.width`    | `number` | `10`                                                                                                               | Emitter area width                                      |
| `size.height`   | `number` | `10`                                                                                                               | Emitter area height                                     |
| `size.mode`     | `string` | `"precise"` / `"percent"`                                                                                          | `precise`: pixels, `percent`: relative to canvas size   |
| `rate.quantity` | `number` | `1`                                                                                                                | Particles generated per emission                        |
| `rate.delay`    | `number` | `0.1`                                                                                                              | Delay between emissions (seconds)                       |

## Quick example

```json
{
  "emitters": {
    "direction": "top",
    "position": {
      "x": 50,
      "y": 90
    },
    "size": {
      "width": 40,
      "height": 0,
      "mode": "percent"
    },
    "rate": {
      "quantity": 4,
      "delay": 0.15
    },
    "particles": {
      "move": {
        "speed": 2
      }
    }
  }
}
```
