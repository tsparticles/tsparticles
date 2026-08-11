# Matriz de renombre de opciones

Referencia rapida para los renombres mas comunes durante migraciones.

## tsParticles

| Clave legacy       | Clave actual             | Notas                                       |
| ------------------ | ------------------------ | ------------------------------------------- |
| `particles.color`  | `particles.paint.fill`   | El color principal se movio a `paint.fill`. |
| `particles.stroke` | `particles.paint.stroke` | El stroke se movio a `paint.stroke`.        |

## particles.js legacy

| Clave particles.js | Clave actual   | Notas                         |
| ------------------ | -------------- | ----------------------------- |
| `line_linked`      | `links`        | Renombrado al estilo moderno. |
| `retina_detect`    | `detectRetina` | De snake_case a camelCase.    |

## Load API

| API legacy                        | API actual                                |
| --------------------------------- | ----------------------------------------- |
| `tsParticles.load("id", options)` | `tsParticles.load({ id: "id", options })` |
| `particlesJS("id", options)`      | `tsParticles.load({ id: "id", options })` |
