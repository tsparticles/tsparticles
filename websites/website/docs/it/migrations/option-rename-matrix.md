# Matrice rename opzioni

Riferimento rapido per le rinomine piu comuni durante le migrazioni.

## tsParticles

| Chiave legacy      | Chiave attuale           | Note                                        |
| ------------------ | ------------------------ | ------------------------------------------- |
| `particles.color`  | `particles.paint.fill`   | Colore principale spostato in `paint.fill`. |
| `particles.stroke` | `particles.paint.stroke` | Stroke spostato in `paint.stroke`.          |

## particles.js legacy

| Chiave particles.js | Chiave attuale | Note                         |
| ------------------- | -------------- | ---------------------------- |
| `line_linked`       | `links`        | Rinominata in stile moderno. |
| `retina_detect`     | `detectRetina` | Da snake_case a camelCase.   |

## Load API

| API legacy                        | API attuale                               |
| --------------------------------- | ----------------------------------------- |
| `tsParticles.load("id", options)` | `tsParticles.load({ id: "id", options })` |
| `particlesJS("id", options)`      | `tsParticles.load({ id: "id", options })` |
