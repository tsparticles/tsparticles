# Particles Size

| key                      | option type         | example                        | notes                                                                                                  |
| ------------------------ |---------------------|--------------------------------| ------------------------------------------------------------------ |
| `value`                  | `number` / `object` | `50` / `{ min: 10, max: 50 }`  |                                                                    |
| `animation.destroy`      | `string`            | `min`<br />`max`<br />`none`   | Destroys the particles if not `none` when it reaches the `min` or <br> `max` value of the animation |
| `animation.enable`       | `boolean`           | `true` / `false`               |                                                                    |
| `animation.speed`        | `number`            | `3`                            | Describes the rate at which particles will shrink or grow as a <br> function of other `size` values |
| `animation.startValue`   | `string`            | `min`<br />`max`<br />`random` | Defines where is the starting value of the animation, if `random` <br> property is set this will be ignored |
| `animation.sync`         | `boolean`           | `true` / `false`               | Unless `animation.startValue` is set to `random`, when `sync` is <br> toggled `true`, particles will change size simultaneously for <br> their entire duration; when `false`, particles begin changing <br> size from their time of appearance, but independently <br> of one another. |
