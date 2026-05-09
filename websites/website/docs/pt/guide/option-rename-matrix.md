# Matriz de renomeacao de opcoes

Referencia rapida para os renomes mais comuns durante migracoes.

## tsParticles

| Chave legacy       | Chave atual              | Notas                                   |
| ------------------ | ------------------------ | --------------------------------------- |
| `particles.color`  | `particles.paint.fill`   | Cor principal movida para `paint.fill`. |
| `particles.stroke` | `particles.paint.stroke` | Stroke movido para `paint.stroke`.      |

## particles.js legacy

| Chave particles.js | Chave atual    | Notas                          |
| ------------------ | -------------- | ------------------------------ |
| `line_linked`      | `links`        | Renomeado para estilo moderno. |
| `retina_detect`    | `detectRetina` | De snake_case para camelCase.  |

## Load API

| API legacy                        | API atual                                 |
| --------------------------------- | ----------------------------------------- |
| `tsParticles.load("id", options)` | `tsParticles.load({ id: "id", options })` |
| `particlesJS("id", options)`      | `tsParticles.load({ id: "id", options })` |
