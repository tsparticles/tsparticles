# Plugin Option: Interactions

`interactions` provides interaction mode packages that extend the interactivity system.

## External interaction modes

| Package                         | Mode       | Description                      |
| ------------------------------- | ---------- | -------------------------------- |
| `interaction-external-attract`  | `attract`  | Attracts particles toward cursor |
| `interaction-external-bounce`   | `bounce`   | Bounces particles away           |
| `interaction-external-bubble`   | `bubble`   | Enlarges particles near cursor   |
| `interaction-external-cannon`   | `cannon`   | Fires particles from cursor      |
| `interaction-external-connect`  | `connect`  | Lines between nearby particles   |
| `interaction-external-destroy`  | `destroy`  | Destroys particles under cursor  |
| `interaction-external-drag`     | `drag`     | Drags particles with cursor      |
| `interaction-external-grab`     | `grab`     | Line from cursor to particles    |
| `interaction-external-parallax` | `parallax` | Parallax movement                |
| `interaction-external-particle` | `particle` | Spawns a particle on click       |
| `interaction-external-pause`    | `pause`    | Pauses animation                 |
| `interaction-external-pop`      | `pop`      | Removes particles near cursor    |
| `interaction-external-push`     | `push`     | Adds particles on click          |
| `interaction-external-remove`   | `remove`   | Removes particles on click       |
| `interaction-external-repulse`  | `repulse`  | Pushes particles away            |
| `interaction-external-slow`     | `slow`     | Slows particles near cursor      |
| `interaction-external-trail`    | `trail`    | Cursor trail effect              |

## Particle interactions

| Package                            | Description                       |
| ---------------------------------- | --------------------------------- |
| `interaction-particles-attract`    | Particles attract each other      |
| `interaction-particles-collisions` | Particles collide                 |
| `interaction-particles-links`      | Lines between connected particles |
| `interaction-particles-repulse`    | Particles repel each other        |

## Notes

- Modes are configured under `interactivity.modes` and activated through `interactivity.events`.

## Source reference

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Plugins/Interactions.md>
