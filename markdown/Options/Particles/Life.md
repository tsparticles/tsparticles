# Particles Life

Controls particle lifespan and respawn timing.

## Properties

| Key        | Type     | Example | Notes                                      |
| ---------- | -------- | ------- | ------------------------------------------ |
| `count`    | `number` | `0`     | Number of life cycles (`0` means infinite) |
| `delay`    | `object` |         | Delay before each life starts              |
| `duration` | `object` |         | Active lifetime duration                   |

## Delay

| Key     | Type               | Example                    | Notes                                                       |
| ------- | ------------------ | -------------------------- | ----------------------------------------------------------- |
| `value` | `number` / `range` | `0` / `{ min: 1, max: 5 }` | Delay in seconds                                            |
| `sync`  | `boolean`          | `true` / `false`           | `true`: particles start together, `false`: staggered starts |

## Duration

| Key     | Type               | Example                    | Notes                                                       |
| ------- | ------------------ | -------------------------- | ----------------------------------------------------------- |
| `value` | `number` / `range` | `0` / `{ min: 1, max: 5 }` | Duration in seconds                                         |
| `sync`  | `boolean`          | `true` / `false`           | `true`: particles end together, `false`: independent timing |

## Quick example

```json
{
  "life": {
    "count": 3,
    "delay": {
      "value": { "min": 0.5, "max": 2 },
      "sync": false
    },
    "duration": {
      "value": { "min": 2, "max": 4 },
      "sync": false
    }
  }
}
```
