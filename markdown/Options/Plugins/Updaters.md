# Updater Plugins

The `updaters/` directory contains particle updater packages that control how particle properties change over time. Most updaters add their own options under `particles.*`.

## Available updater packages

| Package                          | Options key               | Description                     |
| -------------------------------- | ------------------------- | ------------------------------- |
| `@tsparticles/updater-destroy`   | `particles.destroy`       | Destroy/split particles on exit |
| `@tsparticles/updater-gradient`  | `particles.gradient`      | Gradient color animations       |
| `@tsparticles/updater-life`      | `particles.life`          | Particle life cycle             |
| `@tsparticles/updater-opacity`   | `particles.opacity`       | Opacity animation               |
| `@tsparticles/updater-orbit`     | `particles.orbit`         | Orbiting movement               |
| `@tsparticles/updater-out-modes` | `particles.move.outModes` | Boundary behavior               |
| `@tsparticles/updater-paint`     | `particles.paint`         | Paint/stroke effects            |
| `@tsparticles/updater-roll`      | `particles.roll`          | Rolling rotation                |
| `@tsparticles/updater-rotate`    | `particles.rotate`        | Rotation animation              |
| `@tsparticles/updater-size`      | `particles.size`          | Size animation                  |
| `@tsparticles/updater-tilt`      | `particles.tilt`          | Tilt animation                  |
| `@tsparticles/updater-twinkle`   | `particles.twinkle`       | Twinkle/flash effect            |
| `@tsparticles/updater-wobble`    | `particles.wobble`        | Wobble effect                   |

## Related docs

- Particles root: [Particles](../Particles.md)
- Options root: [Options](../../Options.md)
