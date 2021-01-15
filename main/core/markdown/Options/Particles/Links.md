# Particles Links

| key         | option type    | example          | notes                                                                                                           |
| ----------- | -------------- | ---------------- | --------------------------------------------------------------------------------------------------------------- |
| `blink`     | `boolean`      | `true` / `false` | This option works with `color` with "random" value, if set to `true` the links will blink with random colors    |
| `color`     | `color object` |                  | This `color` object is the same described {@links IColor | here}                                                |
| `consent`   | `boolean`      | `true` / `false` | This option works with `color` with "random" value, if set to `true` the links will have a random common color  |
| `distance`  | `number`       | `150`            |                                                                                                                 |
| `enable`    | `boolean`      | `true` / `false` |                                                                                                                 |
| `id`        | `string`       | "link1"          | This `id` is optional, when specified the particles with the same link `id` will be linked together, if enabled |
| `opacity`   | `number`       | `0...1`          |                                                                                                                 |
| `shadow`    | `object`       |                  | See shadow documentation below                                                                                  |
| `triangles` | `object`       |                  | See triangles documentation below                                                                               |
| `warp`      | `boolean`      | `true` / `false` |                                                                                                                 |
| `width`     | `number`       | `1.5`            |                                                                                                                 |

## Links Shadow

| key      | option type                   | example          | notes                                                            |
| -------- | ----------------------------- | ---------------- | ---------------------------------------------------------------- |
| `blur`   | `number`                      | `4`              |                                                                  |
| `color`  | `string`<br /> `color object` |                  | This `color` object is the same described {@links IColor | here} |
| `enable` | `boolean`                     | `true` / `false` |                                                                  | 

## Links Triangles

| key       | option type                   | example          | notes                                                            |
| --------- | ----------------------------- | ---------------- | ---------------------------------------------------------------- |
| `color`   | `string`<br /> `color object` |                  | This `color` object is the same described {@links IColor | here} |
| `enable`  | `boolean`                     | `true` / `false` |                                                                  |
| `opacity` | `number`                      | `0...1`          |                                                                  |
