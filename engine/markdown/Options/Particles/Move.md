# Particles Move

| key         | option type | example                                                                                                                                                            | notes                             |
| ----------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------- |
| `angle`     | `object`    |                                                                                                                                                                    | See angle documentation below     |
| `attract`   | `object`    |                                                                                                                                                                    | See attract documentation below   |
| `direction` | `string`    | `"none"` <br /> `"top"` <br /> `"top-right"` <br /> `"right"` <br /> `"bottom-right"` <br /> `"bottom"` <br /> `"bottom-left"` <br /> `"left"` <br /> `"top-left"` |                                   |
| `distance`  | `object`    |                                                                                                                                                                    | See distance documentation below  |
| `enable`    | `boolean`   | `true` / `false`                                                                                                                                                   |                                   |
| `gravity`   | `object`    |                                                                                                                                                                    | See gravity documentation below   |
| `noise`     | `object`    |                                                                                                                                                                    | See noise documentation below     |
| `outModes`  | `object`    |                                                                                                                                                                    | See out modes documentation below |
| `random`    | `boolean`   | `true` / `false`                                                                                                                                                   |                                   |
| `size`      | `boolean`   | `true` / `false`                                                                                                                                                   |                                   |
| `speed`     | `number`    | `4`                                                                                                                                                                | assuming a predefined distance for the particle to travel, `speed` is the amount of time takes to travel the predefined distance for any particle |
| `straight`  | `boolean`   | `true` / `false`                                                                                                                                                   |                                   |
| `trail`     | `object`    |                                                                                                                                                                    | See trail documentation below     |
| `vibrate`   | `boolean`   | `true` / `false`                                                                                                                                                   |                                   |
| `warp`      | `boolean`   | `true` / `false`                                                                                                                                                   |                                   |

## Particles Move Angle

| key      | option type | example          | notes |
| -------- | ----------- | ---------------- | ----- |
| `offset` | `boolean`   | `true` / `false` |       |
| `value`  | `number`    | `3000`           |       |

## Particles Move Attract

| key        | option type | example          | notes |
| ---------- | ----------- | ---------------- | ----- |
| `enable`   | `boolean`   | `true` / `false` |       |
| `rotate.x` | `number`    | `3000`           |       |
| `rotate.y` | `number`    | `1500`           |       |

## Particles Move Distance

| key          | option type | example | notes |
| ------------ | ----------- | ------- | ----- |
| `horizontal` | `number`    | `50`    |       |
| `vertical`   | `number`    | `50`    |       |

## Particles Move Gravity

| key            | option type | example          | notes |
| -------------- | ----------- | ---------------- | ----- |
| `acceleration` | `number`    | `9.81`           |       |
| `enable`       | `boolean`   | `true` / `false` |       |
| `maxSpeed`     | `number`    | `50`             |       |

## Particles Move Noise

| key                         | option type          | example                        | notes |
| --------------------------- |----------------------|--------------------------------| ----- |
| `clamp`                     | `boolean`            | `true` / `false`               |       |
| `delay.value`               | `number` / `object`  | `1` / `{ min: 0.5, max: 1.5 }` |       |
| `enable`                    | `boolean`            | `true` / `false`               |       |
| `generator`                 | `string`             | `"generator name"`             |       |

## Particles Move Out Modes

| key       | option type | example                                                                      | notes |
| --------- | ----------- | ---------------------------------------------------------------------------- | ----- |
| `default` | `string`    | `"out"`<br /> `"destroy"` <br /> `"bounce"` <br /> `"none"` <br /> `"split"` |       |
| `bottom`  | `string`    | `"out"`<br /> `"destroy"` <br /> `"bounce"` <br /> `"none"` <br /> `"split"` |       |
| `left`    | `string`    | `"out"`<br /> `"destroy"` <br /> `"bounce"` <br /> `"none"` <br /> `"split"` |       |
| `right`   | `string`    | `"out"`<br /> `"destroy"` <br /> `"bounce"` <br /> `"none"` <br /> `"split"` |       |
| `top`     | `string`    | `"out"`<br /> `"destroy"` <br /> `"bounce"` <br /> `"none"` <br /> `"split"` |       |

## Particles Move Spin

| key            | option type | example            | notes |
| -------------- | ----------- | ------------------ | ----- |
| `acceleration` | `number`    | `2`                |       |
| `enable`       | `boolean`   | `true` / `false`   |       |
| `position`     | `object`    | `{ x: 50, y: 50 }` |       |

## Particles Move Trail

| key         | option type    | example          | notes                                                            |
| ----------- | -------------- | ---------------- | ---------------------------------------------------------------- |
| `enable`    | `boolean`      | `true` / `false` |                                                                  |
| `length`    | `number`       | `10`             |                                                                  |
| `fillColor` | `color object` |                  | This `color` object is the same described {@links IColor | here} |
