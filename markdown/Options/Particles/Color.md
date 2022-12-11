# Particles Color

| key           | option type | example | notes                                                     |
| ------------- | ----------- | ------- | --------------------------------------------------------- | ----- |
| `value`       | `object`    |         | This `value` property is the same described {@link IColor | here} |
| `animation.h` | `object`    |         | See animation documentation below                         |
| `animation.s` | `object`    |         | See animation documentation below                         |
| `animation.l` | `object`    |         | See animation documentation below                         |

## Particles Color Animation

| key          | option type | example          | notes                                                                                                                                                                                                                                                                                                      |
| ------------ | ----------- | ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `enable`     | `boolean`   | `true` / `false` |                                                                                                                                                                                                                                                                                                            |
| `offset.max` | `number`    | `60`             |                                                                                                                                                                                                                                                                                                            |
| `offset.min` | `number`    | `20`             |                                                                                                                                                                                                                                                                                                            |
| `speed`      | `number`    | `40`             | Determines the rate (% or ° per second) at which a particle changes its <br>hue, saturation, or lightness. A `speed` of `0` will set the hsl of <br> particles to what was initially defined in `value`.                                                                                                   |
| `sync`       | `boolean`   | `true` / `false` | When `sync` is toggled `true`, particles generated will change color in <br> time with each other for their entire duration. However, when `sync` is <br> toggled `false`, particles generated begin changing color at the set speed from <br> their time of appearance, but independently of one another. |
