# Particles Life

| key        | option type | example | notes |
| ---------- | ----------- | ------- | ----- |
| `count`    | `number`    | `0`     |       |
| `delay`    | `object`    |         |       |
| `duration` | `object`    |         |       |

## Particles Life Delay

| key     | option type        | example                    | notes                                                                     |
| ------- | ------------------ | -------------------------- | ------------------------------------------------------------------------- |
| `value` | `number` / `range` | `0` / `{ min: 1, max: 5 }` |                                                                           |
| `sync`  | `boolean`          | `true` / `false`           | When `true`, all particles appear at the same time when the browser loads <br> the page.  When `false`, particles appear with the `life.delay` value specified. |

## Particles Life Duration

| key     | option type        | example                    | notes                                                                          |
| ------- | ------------------ | -------------------------- | ------------------------------------------------------------------------------ |
| `value` | `number` / `range` | `0` / `{ min: 1, max: 5 }` |                                                                                |
| `sync`  | `boolean`          | `true` / `false`           | When `true`, the particle durations will be coordinated with one another. <br> In other words, they will all appear and disappear at the same time.|
