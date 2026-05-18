# Matrice de renommage des options

Reference rapide pour les renommages les plus frequents pendant les migrations.

## tsParticles

| Cle legacy         | Cle actuelle             | Notes                                                   |
| ------------------ | ------------------------ | ------------------------------------------------------- |
| `particles.color`  | `particles.paint.fill`   | La couleur principale a ete deplacee vers `paint.fill`. |
| `particles.stroke` | `particles.paint.stroke` | Le stroke a ete deplace vers `paint.stroke`.            |

## particles.js legacy

| Cle particles.js | Cle actuelle   | Notes                           |
| ---------------- | -------------- | ------------------------------- |
| `line_linked`    | `links`        | Renomme selon le style moderne. |
| `retina_detect`  | `detectRetina` | De snake_case vers camelCase.   |

## Load API

| API legacy                        | API actuelle                              |
| --------------------------------- | ----------------------------------------- |
| `tsParticles.load("id", options)` | `tsParticles.load({ id: "id", options })` |
| `particlesJS("id", options)`      | `tsParticles.load({ id: "id", options })` |
