# Absorbers

Defines absorber entities that pull nearby particles and can consume them.

## Properties

| Key            | Type               | Example                       | Notes                              |
| -------------- | ------------------ | ----------------------------- | ---------------------------------- |
| `color`        | `color object`     |                               | Absorber color, see {@link IColor} |
| `opacity`      | `number`           | `0...1`                       | Absorber opacity                   |
| `position`     | `object`           | `{ "x": 50, "y": 50 }`        | Position in canvas percent values  |
| `size.value`   | `number` / `range` | `50` / `{ min: 10, max: 50 }` | Absorber radius                    |
| `size.density` | `number`           | `5`                           | Attraction intensity               |
| `size.limit`   | `number`           | `100`                         | Maximum absorber radius            |

## Quick example

```json
{
  "absorbers": {
    "color": {
      "value": "#f59e0b"
    },
    "opacity": 0.7,
    "position": {
      "x": 50,
      "y": 50
    },
    "size": {
      "value": 30,
      "density": 6,
      "limit": 120
    }
  }
}
```
