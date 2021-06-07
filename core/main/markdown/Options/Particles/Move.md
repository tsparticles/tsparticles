# Particles Move

| key         | option type         | example                                                                                                                                                                        | notes                                                           |
| ----------- | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------- |
| `attract`   | `object`            |                                                                                                                                                                                | See attract documentation below                                 |
| `direction` | `string` / `number` | `"none"` <br /> `"top"` <br /> `"top-right"` <br /> `"right"` <br /> `"bottom-right"` <br /> `"bottom"` <br /> `"bottom-left"` <br /> `"left"` <br /> `"top-left"` <br /> `30` | If using the numeric value, it's the angle direction in degrees |
| `enable`    | `boolean`           | `true` / `false`                                                                                                                                                               |                                                                 |
| `outMode`   | `string`            | `"out"`<br /> `"destroy"` <br /> `"bounce"` <br /> `"bounce-vertical"` <br /> `"bounce-horizontal"`                                                                            | out of canvas                                                   |
| `random`    | `boolean`           | `true` / `false`                                                                                                                                                               |                                                                 |
| `speed`     | `number`            | `4`                                                                                                                                                                            |                                                                 |
| `straight`  | `boolean`           | `true` / `false`                                                                                                                                                               |                                                                 |
| `trail`     | `object`            |                                                                                                                                                                                | See trail documentation below                                   |

## Particles Move Attract

| key        | option type | example          | notes |
| ---------- | ----------- | ---------------- | ----- |
| `distance` | `number`    | `200`            |       |
| `enable`   | `boolean`   | `true` / `false` |       |
| `rotate.x` | `number`    | `3000`           |       |
| `rotate.y` | `number`    | `1500`           |       |

## Particles Move Trail

| key         | option type    | example          | notes                                                            |
| ----------- | -------------- | ---------------- | ---------------------------------------------------------------- |
| `enable`    | `boolean`      | `true` / `false` |                                                                  |
| `length`    | `number`       | `10`             |                                                                  |
| `fillColor` | `color object` |                  | This `color` object is the same described {@links IColor | here} |
