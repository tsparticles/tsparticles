# Particles Shadow

Adds a canvas shadow behind each particle.

## Properties

| Key        | Type           | Example          | Notes                            |
| ---------- | -------------- | ---------------- | -------------------------------- |
| `enable`   | `boolean`      | `true` / `false` | Enables particle shadow          |
| `blur`     | `number`       | `4`              | Blur radius                      |
| `color`    | `color object` |                  | Shadow color, see {@link IColor} |
| `offset.x` | `number`       | `10`             | Horizontal offset                |
| `offset.y` | `number`       | `10`             | Vertical offset                  |

## Quick example

```json
{
  "shadow": {
    "enable": true,
    "blur": 8,
    "color": {
      "value": "#60a5fa"
    },
    "offset": {
      "x": 2,
      "y": 2
    }
  }
}
```
