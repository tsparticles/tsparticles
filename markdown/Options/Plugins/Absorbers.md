# Absorbers

| key            | option type         | example                       | notes                                                                                          |
|----------------|---------------------|-------------------------------| ---------------------------------------------------------------------------------------------- |
| `color`        | `color object`      |                               | This `color` object is the same described {@link IColor | here}                                |
| `opacity`      | `number`            | `0...1`                       |                                                                                                |
| `position`     | `object`            | `{ "x": 50, "y": 50 }`        | The position specified is not absolute, it will be used as a percent value of the canvas size. |
| `size.density` | `number`            | `5`                           | The higher the value, the more the particles are attracted                                     |
| `size.limit`   | `number`            | `100`                         | The absorber max radius, this value is optional                                                |
| `size.value`   | `number` / `object` | `50` / `{ min: 10, max: 50 }` | The absorber radius                                                                            |
