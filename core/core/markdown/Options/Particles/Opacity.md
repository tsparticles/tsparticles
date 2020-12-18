# Particles Opacity

| key                      | option type          | example                        | notes                                                                                                  |
| ------------------------ | -------------------- | ------------------------------ | ------------------------------------------------------------------------------------------------------ |
| `value`                  | `number`             | `0...1`                        |                                                                                                        |
| `random`                 | `boolean` / `object` | `true` / `false`               | If boolean it randomize the size from `0` to `value`                                                   |
| `random.enable`          | `boolean`            | `true` / `false`               | This is the alternative to pure `boolean` value                                                        |
| `random.minimumValue`    | `number`             | `10`                           | This is the minimum value used in random values                                                        |
| `animation.destroy`      | `string`             | `min`<br />`max`<br />`none`   | Destroys the particles if not `none` when it reaches the `min` or `max` value of the animation         |
| `animation.enable`       | `boolean`            | `true` / `false`               |                                                                                                        |
| `animation.minimumValue` | `number`             | `0...1`                        | replaces the old `opacity_min` property                                                                |
| `animation.speed`        | `number`             | `3`                            |                                                                                                        |
| `animation.startValue`   | `string`             | `min`<br />`max`<br />`random` | Defines where is the starting value of the animation, if `random` property is set this will be ignored |
| `animation.sync`         | `boolean`            | `true` / `false`               |                                                                                                        |
