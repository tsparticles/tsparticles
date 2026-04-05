# Particles Orbit

Adds orbital movement around a center, optionally drawing visible orbit trails.

## Properties

| Key                | Type               | Example                       | Notes                                |
| ------------------ | ------------------ | ----------------------------- | ------------------------------------ |
| `enable`           | `boolean`          | `true` / `false`              | Enables orbit behavior               |
| `radius`           | `number`           | `0`                           | Orbit radius                         |
| `rotation.value`   | `number` / `range` | `50` / `{ min: 10, max: 50 }` | Rotation amount                      |
| `animation.enable` | `boolean`          | `true` / `false`              | Enables orbit animation              |
| `animation.speed`  | `number`           | `0`                           | Orbit animation speed                |
| `color`            | `color object`     |                               | Orbit path color, see {@link IColor} |
| `opacity`          | `number`           | `0.5`                         | Orbit line opacity                   |
| `width`            | `number`           | `1`                           | Orbit line width                     |

## Quick example

```json
{
  "orbit": {
    "enable": true,
    "radius": 20,
    "rotation": {
      "value": { "min": 10, "max": 40 }
    },
    "animation": {
      "enable": true,
      "speed": 2
    },
    "opacity": 0.3,
    "width": 1
  }
}
```
