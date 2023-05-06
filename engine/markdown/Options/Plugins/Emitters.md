# Emitters

| key             | option type | example                                                                                                                                                            | notes                                                                                                  |
| --------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------ | ----- |
| `direction`     | `string`    | `"none"` <br /> `"top"` <br /> `"top-right"` <br /> `"right"` <br /> `"bottom-right"` <br /> `"bottom"` <br /> `"bottom-left"` <br /> `"left"` <br /> `"top-left"` | The generated particles direction                                                                      |
| `life.count`    | `number`    | `1`                                                                                                                                                                | The emitter number of times will appear                                                                |
| `life.duration` | `number`    | `5`                                                                                                                                                                | The emitter life duration, in seconds                                                                  |
| `life.delay`    | `number`    | `0.1`                                                                                                                                                              | The emitter delay between any appearance                                                               |
| `particles`     | `object`    |                                                                                                                                                                    | See Particles options {@link IParticlesOptions                                                         | here} |
| `position`      | `object`    | `{ "x": 50, "y": 50 }`                                                                                                                                             | The position specified is not absolute, it will be used as a percent value of the canvas size.         |
| `size.width`    | `number`    | `10`                                                                                                                                                               |                                                                                                        |
| `size.height`   | `number`    | `10`                                                                                                                                                               |                                                                                                        |
| `size.mode`     | `string`    | `"precise"` / `"percent"`                                                                                                                                          | Specify how to use the size values, `precise` uses pixels, `percent` will be calculated on canvas size |
| `rate.quantity` | `number`    | `1`                                                                                                                                                                | The particles generated everytime the rate event occurs                                                |
| `rate.delay`    | `number`    | `0.1`                                                                                                                                                              | The rate event event delay time, in seconds                                                            |