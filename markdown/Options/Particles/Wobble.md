# Particles Wobble

Applies oscillating movement on top of normal particle motion.

## Properties

| Key        | Type               | Example                    | Notes                 |
| ---------- | ------------------ | -------------------------- | --------------------- |
| `enable`   | `boolean`          | `true` / `false`           | Enables wobble effect |
| `distance` | `number` / `range` | `0` / `{ min: 1, max: 5 }` | Oscillation amplitude |
| `speed`    | `number` / `range` | `0` / `{ min: 1, max: 5 }` | Oscillation speed     |

## Quick example

```json
{
  "wobble": {
    "enable": true,
    "distance": {
      "min": 2,
      "max": 6
    },
    "speed": {
      "min": 4,
      "max": 10
    }
  }
}
```
