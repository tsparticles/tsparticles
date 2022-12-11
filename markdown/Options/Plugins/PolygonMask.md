# Polygon Mask

| key              | option type    | example                                                 | notes                                                                                            |
| ---------------- | -------------- | ------------------------------------------------------- | ------------------------------------------------------------------------------------------------ | ----- | --- |
| `enable`         | `boolean`      | `true` / `false`                                        |                                                                                                  |
| `draw.enable`    | `boolean`      | `true` / `false`                                        |                                                                                                  |
| `draw.lineWidth` | `number`       | `0.5`                                                   |                                                                                                  |
| `draw.lineColor` | `color object` |                                                         | This `color` object is the same described {@link IColor                                          | here} |     |
| `position`       | `object`       | `{ "x": 50, "y": 50 }`                                  | The position specified is not absolute, it will be used as a percent value.                      |
| `scale`          | `number`       | 1                                                       |                                                                                                  |
| `type`           | `string`       | `none` <br /> `inside` <br /> `outside` <br /> `inline` |                                                                                                  |
| `move.radius`    | `number`       | `10`                                                    |                                                                                                  |
| `url`            | `string`       | `demo/svg/deer.svg`                                     | this file will be downloaded with an ajax request, if it won't load you have some **XSS** issues |
