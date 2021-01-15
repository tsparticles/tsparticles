# Infection

| key          | option type | example          | notes                                                                               |
| ------------ | ----------- | ---------------- | ----------------------------------------------------------------------------------- |
| `cure`       | `boolean`   | `true` / `false` | if the infection can be cured, bringing back the particle to its normal state       |
| `delay`      | `number`    | `1`              | the "symptoms" delay, after how many seconds the infected particle change its state |
| `enable`     | `boolean`   | `true` / `false` |                                                                                     |
| `infections` | `number`    | `1`              | how many particles are infected at startup                                          |
| `stages`     | `array`     |                  |                                                                                     |

## Infection Stage

| key             | option type    | example | notes                                                                               |
| --------------- | -------------- | ------- | ----------------------------------------------------------------------------------- |
| `color`         | `color object` |         | This `color` object is the same described {@link IColor | here}                     |
| `radius`        | `number`       | `1`     | an outer radius for spreading the infection without touch                           |
| `rate`          | `number`       | `1`     | chances of infecting other particles                                                |
| `duration`      | `number`       | `1`     | how many seconds does the stage should last                                         |
| `infectedStage` | `number`       | `0`     | which stage should be set when a particle will be infected by another at this stage |
