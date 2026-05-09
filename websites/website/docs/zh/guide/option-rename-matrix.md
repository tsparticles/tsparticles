# 选项重命名矩阵

迁移过程中最常见重命名的快速对照。

## tsParticles

| 旧键               | 当前键                   | 说明                          |
| ------------------ | ------------------------ | ----------------------------- |
| `particles.color`  | `particles.paint.fill`   | 主颜色已迁移到 `paint.fill`。 |
| `particles.stroke` | `particles.paint.stroke` | 描边已迁移到 `paint.stroke`。 |

## particles.js legacy

| particles.js 键 | 当前键         | 说明                           |
| --------------- | -------------- | ------------------------------ |
| `line_linked`   | `links`        | 改为现代命名风格。             |
| `retina_detect` | `detectRetina` | 从 snake_case 改为 camelCase。 |

## Load API

| 旧 API                            | 当前 API                                  |
| --------------------------------- | ----------------------------------------- |
| `tsParticles.load("id", options)` | `tsParticles.load({ id: "id", options })` |
| `particlesJS("id", options)`      | `tsParticles.load({ id: "id", options })` |
