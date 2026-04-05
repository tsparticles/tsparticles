# Infection

Configures infection-like propagation between particles.

## Properties

| Key          | Type      | Example          | Notes                                   |
| ------------ | --------- | ---------------- | --------------------------------------- |
| `enable`     | `boolean` | `true` / `false` | Enables infection mode                  |
| `infections` | `number`  | `1`              | Number of particles infected at startup |
| `delay`      | `number`  | `1`              | Delay in seconds before symptoms apply  |
| `cure`       | `boolean` | `true` / `false` | If infected particles can recover       |
| `stages`     | `array`   |                  | Infection stages sequence               |

## Infection stage properties

| Key             | Type           | Example | Notes                                   |
| --------------- | -------------- | ------- | --------------------------------------- |
| `color`         | `color object` |         | Stage color, see {@link IColor}         |
| `radius`        | `number`       | `1`     | Infection spread radius                 |
| `rate`          | `number`       | `1`     | Infection chance multiplier             |
| `duration`      | `number`       | `1`     | Stage duration in seconds               |
| `infectedStage` | `number`       | `0`     | Next stage index for infected particles |

## Quick example

```json
{
  "infection": {
    "enable": true,
    "infections": 2,
    "delay": 0.5,
    "cure": true,
    "stages": [
      {
        "color": {
          "value": "#22c55e"
        },
        "radius": 1,
        "rate": 0.3,
        "duration": 2,
        "infectedStage": 0
      }
    ]
  }
}
```
