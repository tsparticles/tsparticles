# Particles zIndex

| key                   | option type          | example          | notes                                                           |
| --------------------- | -------------------- | ---------------- | --------------------------------------------------------------- |
| `value`               | `number`             | `0...10000`      | Defaults to 0.                                                  |
| `random`              | `boolean` / `object` | `true` / `false` | If boolean it randomize the size from 0 to opacity.value        |
| `random.enable`       | `boolean`            | `true` / `false` | This is the alternative to pure `boolean` value                 |
| `random.minimumValue` | `number`             | `10`             | This is the minimum value used in random values                 |
| `opacityRate`         | `number`             | `2`              | The rate with which the z-index alters the particle's opacity.  |
| `velocityRate`        | `number`             | `-10`            | The rate with which the z-index alters the particle's velocity. |
| `sizeRate`            | `number`             | `5`              | The rate with which the z-index alters the particle's size.     |
