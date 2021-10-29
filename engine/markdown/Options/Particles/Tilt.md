# Particles Tilt

| key                | option type        | example                                            | notes            |
| ------------------ | ------------------ | -------------------------------------------------- | ---------------- |
| `enable`           | `boolean`          | `true` / `false`                                   |                  |
| `value`            | `number` / `range` | `0` / `{ min: 1, max: 5 }`                         | angle in degrees |
| `direction`        | `string`           | `"clockwise"` / `"counter-clockwise"` / `"random"` |                  |
| `animation.enable` | `boolean`          | `true` / `false`                                   |                  |
| `animation.speed`  | `number`           | `5`                                                |                  |
| `animation.sync`   | `boolean`          | `true` / `false`                                   |  When `sync` is toggled `true`, particles generated will turn in <br> time with each other for their entire duration. However, when `sync` is <br> toggled `false`, particles generated begin turning at the set speed from <br> their time of appearance, but independently of one another.                  |
