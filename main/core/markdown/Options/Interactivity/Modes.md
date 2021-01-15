# Interactivity Modes

| key        | option type        | example | notes                                                  |
| ---------- | ------------------ | ------- | ------------------------------------------------------ |
| `attract`  | `object`           |         | See the object options below                           |
| `bounce`   | `object`           |         | See the object options below                           |
| `bubble`   | `object`           |         | See the object options below                           |
| `connect`  | `object`           |         | See the object options below                           |
| `grab`     | `object`           |         | See the object options below                           |
| `light`    | `object`           |         | See the object options below                           |
| `push`     | `object`           |         | See the object options below                           |
| `remove`   | `object`           |         | See the object options below                           |
| `repulse`  | `object`           |         | See the object options below                           |
| `slow`     | `object`           |         | See the object options below                           |
| `trail`    | `object`           |         | See the object options below                           |
| `emitter`  | `object` / `array` |         | See `Emitters` documentation {@link IEmitter | here}   |
| `absorber` | `object` / `array` |         | See `Absorbers` documentation {@link IAbsorber | here} |

## Attract Options

| key        | option type | example | notes   |
| ---------- | ----------- | ------- | ------- |
| `distance` | `number`    | `200`   |         |
| `duration` | `number`    | `1.2`   | seconds |
| `factor`   | `number`    | `1`     |         |
| `speed`    | `number`    | `1`     |         |

## Bounce Options

| key        | option type | example | notes   |
| ---------- | ----------- | ------- | ------- |
| `distance` | `number`    | `200`   |         |

## Bubble Options

| key        | option type    | example | notes                                                            |
| ---------- | -------------- | ------- | ---------------------------------------------------------------- |
| `color`    | `color object` |         | This `color` object is the same described {@links IColor | here} |
| `distance` | `number`       | `100`   |                                                                  |
| `duration` | `number`       | `0.4`   | seconds                                                          |
| `opacity`  | `number`       | `0.5`   |                                                                  |
| `size`     | `number`       | `40`    |                                                                  |

## Connect Options

| key             | option type | example | notes |
| --------------- | ----------- | ------- | ----- |
| `distance`      | `number`    | `100`   |       |
| `radius`        | `number`    | `60`    |       |
| `links.opacity` | `number`    | `0...1` |       |

## Grab Options

| key             | option type    | example          | notes                                                            |
| --------------- | -------------- | ---------------- | ---------------------------------------------------------------- |
| `distance`      | `number`       | `100`            |                                                                  |
| `links.blink`   | `boolean`      | `true` / `false` |                                                                  |
| `links.color`   | `color object` |                  | This `color` object is the same described {@links IColor | here} |
| `links.consent` | `boolean`      | `true` / `false` |                                                                  |
| `links.opacity` | `number`       | `0...1`          |                                                                  |

## Light Options

| key                   | option type    | example | notes                                                            |
| --------------------- | -------------- | ------- | ---------------------------------------------------------------- |
| `area.gradient.start` | `color object` |         | This `color` object is the same described {@links IColor | here} |
| `area.gradient.stop`  | `color object` |         | This `color` object is the same described {@links IColor | here} |
| `area.radius`         | `number`       |         |                                                                  |
| `shadow.color`        | `color object` |         | This `color` object is the same described {@links IColor | here} |
| `shadow.length`       | `number`       |         |                                                                  |

## Push Options

| key        | option type | example | notes |
| ---------- | ----------- | ------- | ----- |
| `quantity` | `number`    | `4`     |       |

## Remove Options

| key        | option type | example | notes |
| ---------- | ----------- | ------- | ----- |
| `quantity` | `number`    | `4`     |       |

## Repulse Options

| key        | option type | example | notes   |
| ---------- | ----------- | ------- | ------- |
| `distance` | `number`    | `200`   |         |
| `duration` | `number`    | `1.2`   | seconds |
| `factor`   | `number`    | `100`   |         |
| `speed`    | `number`    | `1`     |         |

## Slow Options

| key         | option type | example | notes |
| ----------- | ----------- | ------- | ----- |
| `factor`    | `number`    | `3`     |       |
| `radius`    | `number`    | `200`   |       |

## Trail Options

| key         | option type | example | notes                                           |
| ----------- | ----------- | ------- | ----------------------------------------------- |
| `delay`     | `number`    | `0.1`   | seconds                                         |
| `particles` | `object`    |         | See Particles options {@link IParticles | here} |
| `quantity`  | `number`    | `1`     |                                                 |

