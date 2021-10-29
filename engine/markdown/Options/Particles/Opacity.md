# Particles Opacity

| key                    | option type        | example                            | notes                                                                            |
| ---------------------- | ------------------ | ---------------------------------- | -------------------------------------------------------------------------------- |
| `value`                | `number` / `range` | `0...1` / `{ min: 0.1, max: 0.8 }` |                                                                                  |
| `animation.destroy`    | `string`           | `min`<br />`max`<br />`none`       | Destroys the particles if not `none` when it reaches the `min` or `max` <br> value of the animation |
| `animation.enable`     | `boolean`          | `true` / `false`                   |                                                                                  |
| `animation.speed`      | `number`           | `3`                                |                                                                                  |
| `animation.startValue` | `string`           | `min`<br />`max`<br />`random`     | Defines where is the starting value of the animation, if `random` property <br> is set this will be ignored |
| `animation.sync`       | `boolean`          | `true` / `false`                   | Unless `animation.startValue` is set to `random`, when `sync` is toggled <br> `true`, particles will change opacity simultaneously for their entire <br> duration; when `false`, particles begin changing opacity from their <br> time of appearance, but independently of one another. |


