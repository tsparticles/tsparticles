# Particles Repulse

Configures particle-to-particle repulsion behavior.

## Properties

| Key        | Type               | Example                       | Notes                      |
| ---------- | ------------------ | ----------------------------- | -------------------------- |
| `enable`   | `boolean`          | `true` / `false`              | Enables repulse behavior   |
| `distance` | `number`           | `100`                         | Repulse distance           |
| `duration` | `number`           | `2`                           | Effect duration in seconds |
| `factor`   | `number`           | `1`                           | Repulse force multiplier   |
| `speed`    | `number`           | `100`                         | Displacement speed         |
| `value`    | `number` / `range` | `50` / `{ min: 10, max: 50 }` | Base repulse intensity     |

## Quick example

```json
{
  "repulse": {
    "enable": true,
    "distance": 120,
    "duration": 1.5,
    "factor": 1,
    "speed": 80,
    "value": { "min": 20, "max": 60 }
  }
}
```
