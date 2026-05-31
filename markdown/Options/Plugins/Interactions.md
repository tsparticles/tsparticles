# Interaction Plugins

The `interactions/` directory contains interaction packages that extend the interactivity system. They are configured via `interactivity.modes` and activated through `interactivity.events`.

## External interaction modes

These modes are triggered by mouse/touch events (hover, click, etc.):

| Package                                      | Mode name  | Description                          |
| -------------------------------------------- | ---------- | ------------------------------------ |
| `@tsparticles/interaction-external-attract`  | `attract`  | Attracts particles toward cursor     |
| `@tsparticles/interaction-external-bounce`   | `bounce`   | Bounces particles away from cursor   |
| `@tsparticles/interaction-external-bubble`   | `bubble`   | Enlarges/changes opacity near cursor |
| `@tsparticles/interaction-external-cannon`   | `cannon`   | Fires particles from cursor          |
| `@tsparticles/interaction-external-connect`  | `connect`  | Draws lines between nearby particles |
| `@tsparticles/interaction-external-destroy`  | `destroy`  | Destroys particles under cursor      |
| `@tsparticles/interaction-external-drag`     | `drag`     | Drags particles with cursor          |
| `@tsparticles/interaction-external-grab`     | `grab`     | Draws line from cursor to particles  |
| `@tsparticles/interaction-external-parallax` | `parallax` | Parallax movement on mouse move      |
| `@tsparticles/interaction-external-particle` | `particle` | Spawns a particle on click           |
| `@tsparticles/interaction-external-pause`    | `pause`    | Pauses animation on click            |
| `@tsparticles/interaction-external-pop`      | `pop`      | Pops (removes) particles near cursor |
| `@tsparticles/interaction-external-push`     | `push`     | Adds particles on click              |
| `@tsparticles/interaction-external-remove`   | `remove`   | Removes particles on click           |
| `@tsparticles/interaction-external-repulse`  | `repulse`  | Pushes particles away from cursor    |
| `@tsparticles/interaction-external-slow`     | `slow`     | Slows particles near cursor          |
| `@tsparticles/interaction-external-trail`    | `trail`    | Particle trail following cursor      |

## Particle-to-particle interactions

These modes affect how particles interact with each other:

| Package                                         | Mode name             | Description                             |
| ----------------------------------------------- | --------------------- | --------------------------------------- |
| `@tsparticles/interaction-particles-attract`    | `attract` (particles) | Particles attract each other            |
| `@tsparticles/interaction-particles-collisions` | `collisions`          | Particles collide with each other       |
| `@tsparticles/interaction-particles-links`      | `links`               | Draws lines between connected particles |
| `@tsparticles/interaction-particles-repulse`    | `repulse` (particles) | Particles repel each other              |

## Light interaction

| Package                          | Description                        |
| -------------------------------- | ---------------------------------- |
| `@tsparticles/interaction-light` | Adds lighting/shadows to particles |

## Usage

```json
{
  "interactivity": {
    "events": {
      "onClick": { "enable": true, "mode": "push" },
      "onHover": { "enable": true, "mode": "repulse" }
    },
    "modes": {
      "push": { "quantity": 4 },
      "repulse": { "distance": 150 }
    }
  }
}
```

## Related docs

- Interactivity: [Interactivity](../Interactivity.md)
- Modes: [Modes](../Interactivity/Modes.md)
- Options root: [Options](../../Options.md)
