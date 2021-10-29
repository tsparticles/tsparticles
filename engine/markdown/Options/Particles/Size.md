# Particles Size

| key                      | option type          | example                        | notes                                                                                                  |
| ------------------------ | -------------------- | ------------------------------ | ------------------------------------------------------------------ |
| `value`                  | `number`             | `50`                           |                                                                    |
| `random`                 | `boolean` / `object` | `true` / `false`               | If boolean it randomize the size from `0` to `value`               |
| `random.enable`          | `boolean`            | `true` / `false`               | This is the alternative to pure boolean value                      |
| `random.minimumValue`    | `number`             | `10`                           | This is the minimum value used in random values                    |
| `animation.destroy`      | `string`             | `min`<br />`max`<br />`none`   | Destroys the particles if not `none` when it reaches the `min` or <br> `max` value of the animation |
| `animation.enable`       | `boolean`            | `true` / `false`               |                                                                    |
| `animation.minimumValue` | `number`             | `0.25`                         |                                                                    |
| `animation.speed`        | `number`             | `3`                            |                                                                    |
| `animation.startValue`   | `string`             | `min`<br />`max`<br />`random` | Defines where is the starting value of the animation, if `random` <br> property is set this will be ignored |
| `animation.sync`         | `boolean`            | `true` / `false`               | Unless `animation.startValue` is set to `random`, when `sync` is <br> toggled `true`, particles will change size simultaneously for <br> their entire duration; when `false`, particles begin changing <br> size from their time of appearance, but independently <br> of one another. |
