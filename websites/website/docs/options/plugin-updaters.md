# Plugin Option: Updaters

`updaters` provides particle updater packages that control how particle properties change over time.

## Available updaters

| Package | Options key | Description |
| ------- | ----------- | ----------- |
| `updater-destroy` | `particles.destroy` | Destroy/split particles on exit |
| `updater-gradient` | `particles.gradient` | Gradient color animations |
| `updater-life` | `particles.life` | Particle life cycle |
| `updater-opacity` | `particles.opacity` | Opacity animation |
| `updater-orbit` | `particles.orbit` | Orbiting movement |
| `updater-out-modes` | `particles.move.outModes` | Boundary behavior |
| `updater-paint` | `particles.paint` | Paint/stroke effects |
| `updater-roll` | `particles.roll` | Rolling rotation |
| `updater-rotate` | `particles.rotate` | Rotation animation |
| `updater-size` | `particles.size` | Size animation |
| `updater-tilt` | `particles.tilt` | Tilt animation |
| `updater-twinkle` | `particles.twinkle` | Twinkle/flash effect |
| `updater-wobble` | `particles.wobble` | Wobble effect |

## Notes

- Most updaters add their own options under the `particles` configuration object.
- Many updaters are included in `@tsparticles/slim` or `@tsparticles/full`.

## Source reference

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Plugins/Updaters.md>
