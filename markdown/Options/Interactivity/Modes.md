# Interactivity Modes

Configures the behavior parameters for each interaction mode.
Modes are activated through `interactivity.events` — see [Events](./Events.md).

## Connect

Draws temporary lines between particles that are near each other when the cursor is nearby.

| Key                     | Type     | Example | Notes                                                    |
| ----------------------- | -------- | ------- | -------------------------------------------------------- |
| `connect.distance`      | `number` | `100`   | Max distance between particles to draw a connection line |
| `connect.radius`        | `number` | `60`    | Radius around cursor that activates connect mode         |
| `connect.links.opacity` | `number` | `0.5`   | Opacity of the connection lines                          |

## Grab

Draws a line from the cursor to nearby particles.

| Key                  | Type     | Example | Notes                                |
| -------------------- | -------- | ------- | ------------------------------------ |
| `grab.distance`      | `number` | `100`   | Max distance from cursor to particle |
| `grab.links.opacity` | `number` | `0.5`   | Opacity of grab lines                |

## Bubble

Enlarges or changes the opacity of particles near the cursor.

| Key               | Type     | Example | Notes                                      |
| ----------------- | -------- | ------- | ------------------------------------------ |
| `bubble.distance` | `number` | `100`   | Radius of effect                           |
| `bubble.size`     | `number` | `40`    | Target size of particles inside the bubble |
| `bubble.duration` | `number` | `0.4`   | Transition duration in seconds             |
| `bubble.opacity`  | `number` | `0.8`   | Target opacity inside bubble               |

## Repulse

Pushes particles away from the cursor.

| Key                | Type     | Example | Notes                                          |
| ------------------ | -------- | ------- | ---------------------------------------------- |
| `repulse.distance` | `number` | `200`   | Radius of repulse effect                       |
| `repulse.duration` | `number` | `1.2`   | How long particles are pushed before returning |
| `repulse.speed`    | `number` | `1`     | Speed of the repulse movement                  |

## Push

Adds new particles near the cursor on click.

| Key             | Type     | Example | Notes                               |
| --------------- | -------- | ------- | ----------------------------------- |
| `push.quantity` | `number` | `4`     | Number of particles added per click |

## Remove

Removes particles near the cursor on click.

| Key               | Type     | Example | Notes                                 |
| ----------------- | -------- | ------- | ------------------------------------- |
| `remove.quantity` | `number` | `4`     | Number of particles removed per click |

## Attract

Pulls particles toward the cursor.

| Key                | Type     | Example | Notes                                          |
| ------------------ | -------- | ------- | ---------------------------------------------- |
| `attract.distance` | `number` | `200`   | Radius of attract effect                       |
| `attract.duration` | `number` | `0.4`   | How long particles are pulled before returning |
| `attract.speed`    | `number` | `1`     | Speed of the attract movement                  |

## Slow

Slows down particles near the cursor.

| Key           | Type     | Example | Notes                             |
| ------------- | -------- | ------- | --------------------------------- |
| `slow.factor` | `number` | `3`     | Slowdown factor (higher = slower) |
| `slow.radius` | `number` | `200`   | Radius of slow effect             |

## Emitter / Absorber

These modes are available when the corresponding plugin package is loaded.

| Key        | Type               | Notes                                                                                          |
| ---------- | ------------------ | ---------------------------------------------------------------------------------------------- |
| `emitter`  | `object` / `array` | See [Emitters plugin](https://github.com/tsparticles/tsparticles/tree/main/plugins/emitters)   |
| `absorber` | `object` / `array` | See [Absorbers plugin](https://github.com/tsparticles/tsparticles/tree/main/plugins/absorbers) |

## Quick example

```json
{
  "interactivity": {
    "events": {
      "onHover": { "enable": true, "mode": "repulse" },
      "onClick": { "enable": true, "mode": ["push", "bubble"] }
    },
    "modes": {
      "repulse": {
        "distance": 150,
        "duration": 0.4,
        "speed": 1
      },
      "push": {
        "quantity": 4
      },
      "bubble": {
        "distance": 200,
        "size": 20,
        "duration": 0.5
      }
    }
  }
}
```

## Common pitfalls

- Configuring a mode under `modes` but forgetting to enable it in `events`
- Using emitter/absorber modes without loading their plugin packages
- Setting very large `distance` values — they scale with canvas size and can degrade performance

## Related docs

- Events: [Events](./Events.md)
- Interactivity root: [Interactivity](../Interactivity.md)
- Options root: [Options](../../Options.md)
