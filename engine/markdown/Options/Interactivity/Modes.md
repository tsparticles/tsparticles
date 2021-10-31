# Interactivity Modes

| key                          | option type        | example | notes                                                  |
| ---------------------------- | ------------------ | ------- | ------------------------------------------------------ |
| `connect.distance`           | `number`           | `100`   |                                                        |
| `connect.radius`             | `number`           | `60`    |                                                        |
| `connect.lineLinked.opacity` | `number`           | `0...1` |                                                        |
| `grab.distance`              | `number`           | `100`   |                                                        |
| `grab.lineLinked.opacity`    | `number`           | `0...1` |                                                        |
| `bubble.distance`            | `number`           | `100`   |                                                        |
| `bubble.size`                | `number`           | `40`    | Expressed as % increase or decrease of the size of the <br> particle upon mouseover. Note that a value of <br> 100 will result in no change to the particle's size <br> upon mouseover. |
| `bubble.duration`            | `number`           | `0.4`   | seconds                                                |
| `repulse.distance`           | `number`           | `200`   |                                                        |
| `repulse.duration`           | `number`           | `1.2`   | seconds                                                |
| `push.quantity`              | `number`           | `4`     |                                                        |
| `remove.quantity`            | `number`           | `4`     |                                                        |
| `emitter`                    | `object` / `array` |         | See `Emitters` documentation {@link IEmitter | here}   |
| `absorber`                   | `object` / `array` |         | See `Absorbers` documentation {@link IAbsorber | here} |
