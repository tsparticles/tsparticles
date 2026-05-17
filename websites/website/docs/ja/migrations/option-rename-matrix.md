# オプション改名マトリクス

移行時によく使う改名対応の早見表です。

## tsParticles

| 旧キー             | 現在のキー               | メモ                                 |
| ------------------ | ------------------------ | ------------------------------------ |
| `particles.color`  | `particles.paint.fill`   | メイン色は `paint.fill` に移動。     |
| `particles.stroke` | `particles.paint.stroke` | ストロークは `paint.stroke` に移動。 |

## particles.js legacy

| particles.js キー | 現在のキー     | メモ                           |
| ----------------- | -------------- | ------------------------------ |
| `line_linked`     | `links`        | モダンなキー名に改名。         |
| `retina_detect`   | `detectRetina` | snake_case から camelCase へ。 |

## Load API

| 旧 API                            | 現在の API                                |
| --------------------------------- | ----------------------------------------- |
| `tsParticles.load("id", options)` | `tsParticles.load({ id: "id", options })` |
| `particlesJS("id", options)`      | `tsParticles.load({ id: "id", options })` |
