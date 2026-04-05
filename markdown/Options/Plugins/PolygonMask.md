# Polygon Mask

Constrains particles to a polygon/SVG shape and optionally draws its outline.

## Properties

| Key              | Type           | Example                                       | Notes                              |
| ---------------- | -------------- | --------------------------------------------- | ---------------------------------- |
| `enable`         | `boolean`      | `true` / `false`                              | Enables polygon mask               |
| `url`            | `string`       | `"demo/svg/deer.svg"`                         | SVG source URL                     |
| `type`           | `string`       | `"none"`, `"inside"`, `"outside"`, `"inline"` | Particle placement mode            |
| `position`       | `object`       | `{ "x": 50, "y": 50 }`                        | Position in canvas percent values  |
| `scale`          | `number`       | `1`                                           | Polygon scale factor               |
| `move.radius`    | `number`       | `10`                                          | Movement radius along inline paths |
| `draw.enable`    | `boolean`      | `true` / `false`                              | Draws polygon outline              |
| `draw.lineWidth` | `number`       | `0.5`                                         | Outline width                      |
| `draw.lineColor` | `color object` |                                               | Outline color, see {@link IColor}  |

## Quick example

```json
{
  "polygon": {
    "enable": true,
    "url": "demo/svg/deer.svg",
    "type": "inline",
    "position": {
      "x": 50,
      "y": 50
    },
    "scale": 1,
    "move": {
      "radius": 8
    },
    "draw": {
      "enable": false,
      "lineWidth": 0.5,
      "lineColor": {
        "value": "#ffffff"
      }
    }
  }
}
```
