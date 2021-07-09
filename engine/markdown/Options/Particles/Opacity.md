# Particles Opacity

| key                    | option type        | example                            | notes                                                                                                  |
| ---------------------- | ------------------ | ---------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `value`                | `number` / `range` | `0...1` / `{ min: 0.1, max: 0.8 }` |                                                                                                        |
| `animation.destroy`    | `string`           | `min`<br />`max`<br />`none`       | Destroys the particles if not `none` when it reaches the `min` or `max` value of the animation         |
| `animation.enable`     | `boolean`          | `true` / `false`                   |                                                                                                        |
| `animation.speed`      | `number`           | `3`                                |                                                                                                        |
| `animation.startValue` | `string`           | `min`<br />`max`<br />`random`     | Defines where is the starting value of the animation, if `random` property is set this will be ignored |
| `animation.sync`       | `boolean`          | `true` / `false`                   |                                                                                                        |
