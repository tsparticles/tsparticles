# Particles Destroy

Controls what happens when a particle reaches its end condition.

## Properties

| Key       | Type     | Example                            | Notes                            |
| --------- | -------- | ---------------------------------- | -------------------------------- |
| `explode` | `object` |                                    | Explode configuration, see below |
| `mode`    | `string` | `"none"` / `"split"` / `"explode"` | Destroy behavior                 |
| `split`   | `object` |                                    | Split configuration, see below   |

## Explode properties

| Key             | Type     | Example | Notes                                                             |
| --------------- | -------- | ------- | ----------------------------------------------------------------- |
| `maxSizeFactor` | `number` | `3`     | Final size multiplier compared to the particle initial size       |
| `speed`         | `number` | `2`     | Explosion progress speed (higher values complete the fade faster) |

## Split properties

| Key            | Type               | Example                    | Notes                                                 |
| -------------- | ------------------ | -------------------------- | ----------------------------------------------------- |
| `count`        | `number`           | `1`                        | Number of generated particles                         |
| `factor.value` | `number` / `range` | `9` / `{ min: 4, max: 9 }` | Size/speed factor for spawned particles               |
| `particles`    | `object`           |                            | Child particle options, see {@link IParticlesOptions} |
| `rate.value`   | `number` / `range` | `9` / `{ min: 4, max: 9 }` | Spawn intensity                                       |

## Quick examples

### Disable destroy behavior

```json
{
  "destroy": {
    "mode": "none"
  }
}
```

### Split on destroy

```json
{
  "destroy": {
    "mode": "split",
    "split": {
      "count": 2,
      "factor": {
        "value": { "min": 3, "max": 6 }
      },
      "rate": {
        "value": 10
      }
    }
  }
}
```

### Explode on destroy

```json
{
  "destroy": {
    "mode": "explode",
    "explode": {
      "maxSizeFactor": 3,
      "speed": 2
    }
  }
}
```
