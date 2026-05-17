# Option-Rename-Matrix

Schnellreferenz fuer die haeufigsten Umbenennungen waehrend Migrationen.

## tsParticles

| Legacy-Key         | Aktueller Key            | Hinweise                                       |
| ------------------ | ------------------------ | ---------------------------------------------- |
| `particles.color`  | `particles.paint.fill`   | Hauptfarbe wurde nach `paint.fill` verschoben. |
| `particles.stroke` | `particles.paint.stroke` | Stroke wurde nach `paint.stroke` verschoben.   |

## particles.js legacy

| particles.js-Key | Aktueller Key  | Hinweise                         |
| ---------------- | -------------- | -------------------------------- |
| `line_linked`    | `links`        | Auf modernen Key-Stil umbenannt. |
| `retina_detect`  | `detectRetina` | Von snake_case auf camelCase.    |

## Load API

| Legacy-API                        | Aktuelle API                              |
| --------------------------------- | ----------------------------------------- |
| `tsParticles.load("id", options)` | `tsParticles.load({ id: "id", options })` |
| `particlesJS("id", options)`      | `tsParticles.load({ id: "id", options })` |
