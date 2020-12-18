# Particles Life

| key        | option type | example | notes |
| ---------- | ----------- | ------- | ----- |
| `count`    | `number`    | `0`     |       |
| `delay`    | `object`    |         |       |
| `duration` | `object`    |         |       |

## Particles Life Delay

| key                   | option type          | example          | notes                                                      |
| --------------------- | -------------------- | ---------------- | ---------------------------------------------------------- |
| `value`               | `number`             | `0`              |                                                            |
| `random`              | `boolean` / `object` | `true` / `false` | If boolean it randomize the life delay from `0` to `value` |
| `random.enable`       | `boolean`            | `true` / `false` | This is the alternative to pure boolean value              |
| `random.minimumValue` | `number`             | `0`              | This is the minimum value used in random values            |
| `sync`                | `boolean`            | `true` / `false` |                                                            |

## Particles Life Duration

| key                   | option type          | example          | notes                                                         |
| --------------------- | -------------------- | ---------------- | ------------------------------------------------------------- |
| `value`               | `number`             | `0`              |                                                               |
| `random`              | `boolean` / `object` | `true` / `false` | If boolean it randomize the life duration from `0` to `value` |
| `random.enable`       | `boolean`            | `true` / `false` | This is the alternative to pure boolean value                 |
| `random.minimumValue` | `number`             | `0`              | This is the minimum value used in random values               |
| `sync`                | `boolean`            | `true` / `false` |                                                               |
