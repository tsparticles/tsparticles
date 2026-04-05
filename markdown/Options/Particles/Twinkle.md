# Particles Twinkle

Adds random blinking effects to particles and links.

## Properties

| Key                   | Type           | Example          | Notes                                            |
| --------------------- | -------------- | ---------------- | ------------------------------------------------ |
| `particles.enable`    | `boolean`      | `true` / `false` | Enables particle twinkle                         |
| `particles.color`     | `color object` |                  | Optional twinkle color, see {@link IColor}       |
| `particles.frequency` | `number`       | `0...1`          | Probability threshold for twinkle per frame      |
| `particles.opacity`   | `number`       | `0...1`          | Twinkle opacity                                  |
| `lines`               | `object`       |                  | Same properties as `particles`, applied to links |

## Quick example

```json
{
  "twinkle": {
    "particles": {
      "enable": true,
      "frequency": 0.05,
      "opacity": 1,
      "color": {
        "value": "#ffffff"
      }
    },
    "lines": {
      "enable": false
    }
  }
}
```
