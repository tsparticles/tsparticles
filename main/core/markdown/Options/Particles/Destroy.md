# Particles Destroy

| key     | option type | example                 | notes |
| ------- | ----------- | ----------------------- | ----- |
| `mode`  | `string`    | `"none"`<br />`"split"` |       |
| `split` | `object`    |                         |       |

## Particles Destroy Split

| key                          | option type          | example          | notes                                                         |
| ---------------------------- | -------------------- | ---------------- | ------------------------------------------------------------- |
| `count`                      | `number`             | `1`              |                                                               |
| `factor.value`               | `number`             | `9`              |                                                               |
| `factor.random`              | `boolean` / `object` | `true` / `false` | If boolean it randomize the factor from `0` to `factor.value` |
| `factor.random.enable`       | `boolean`            | `true` / `false` | This is the alternative to pure boolean value                 |
| `factor.random.minimumValue` | `number`             | `4`              | This is the minimum value used in random values               |
| `particles`                  | `object`             |                  | See Particles options {@link IParticles | here}               |
| `rate.value`                 | `number`             | `9`              |                                                               |
| `rate.random`                | `boolean` / `object` | `true` / `false` | If boolean it randomize the factor from `0` to `rate.value`   |
| `rate.random.enable`         | `boolean`            | `true` / `false` | This is the alternative to pure boolean value                 |
| `rate.random.minimumValue`   | `number`             | `4`              | This is the minimum value used in random values               |
