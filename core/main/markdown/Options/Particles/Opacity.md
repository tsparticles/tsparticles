# Particles Opacity

| key                      | option type          | example          | notes                                                    |
| ------------------------ | -------------------- | ---------------- | -------------------------------------------------------- |
| `value`                  | `number`             | `0...1`          |                                                          |
| `random`                 | `boolean` / `object` | `true` / `false` | If boolean it randomize the size from 0 to opacity.value |
| `random.enable`          | `boolean`            | `true` / `false` | This is the alternative to pure `boolean` value          |
| `random.minimumValue`    | `number`             | `10`             | This is the minimum value used in random values          |
| `animation.enable`       | `boolean`            | `true` / `false` |                                                          |
| `animation.speed`        | `number`             | `3`              |                                                          |
| `animation.minimumValue` | `number`             | `0...1`          | replaces the old `opacity_min` property                  |
| `animation.sync`         | `boolean`            | `true` / `false` |                                                          |
