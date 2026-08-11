# Матрица переименования опций

Быстрый справочник по самым частым переименованиям во время миграции.

## tsParticles

| Старый ключ        | Текущий ключ             | Примечания                              |
| ------------------ | ------------------------ | --------------------------------------- |
| `particles.color`  | `particles.paint.fill`   | Основной цвет перенесен в `paint.fill`. |
| `particles.stroke` | `particles.paint.stroke` | Stroke перенесен в `paint.stroke`.      |

## particles.js legacy

| Ключ particles.js | Текущий ключ   | Примечания                         |
| ----------------- | -------------- | ---------------------------------- |
| `line_linked`     | `links`        | Переименовано в современный стиль. |
| `retina_detect`   | `detectRetina` | Переход с snake_case на camelCase. |

## Load API

| Legacy API                        | Текущий API                               |
| --------------------------------- | ----------------------------------------- |
| `tsParticles.load("id", options)` | `tsParticles.load({ id: "id", options })` |
| `particlesJS("id", options)`      | `tsParticles.load({ id: "id", options })` |
