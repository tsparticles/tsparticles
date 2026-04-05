# Particles Bounce

Controls how strongly particles bounce on horizontal and vertical axes after collisions.

## Properties

| Key                | Type               | Example                       | Notes                    |
| ------------------ | ------------------ | ----------------------------- | ------------------------ |
| `horizontal.value` | `number` / `range` | `50` / `{ min: 30, max: 50 }` | Horizontal bounce factor |
| `vertical.value`   | `number` / `range` | `50` / `{ min: 30, max: 50 }` | Vertical bounce factor   |

## Quick examples

### Symmetric bounce

```json
{
  "bounce": {
    "horizontal": {
      "value": 50
    },
    "vertical": {
      "value": 50
    }
  }
}
```

### Softer vertical bounce

```json
{
  "bounce": {
    "horizontal": {
      "value": { "min": 40, "max": 60 }
    },
    "vertical": {
      "value": 20
    }
  }
}
```
