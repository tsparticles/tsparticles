# Option Rename Matrix

Migration के दौरान सबसे common renames के लिए quick reference.

## tsParticles

| Legacy key         | Current key              | Notes                                       |
| ------------------ | ------------------------ | ------------------------------------------- |
| `particles.color`  | `particles.paint.fill`   | मुख्य color path `paint.fill` में moved है। |
| `particles.stroke` | `particles.paint.stroke` | stroke path `paint.stroke` में moved है।    |

## particles.js legacy

| particles.js key | Current key    | Notes                        |
| ---------------- | -------------- | ---------------------------- |
| `line_linked`    | `links`        | modern key style में rename। |
| `retina_detect`  | `detectRetina` | snake_case से camelCase.     |

## Load API

| Legacy API                        | Current API                               |
| --------------------------------- | ----------------------------------------- |
| `tsParticles.load("id", options)` | `tsParticles.load({ id: "id", options })` |
| `particlesJS("id", options)`      | `tsParticles.load({ id: "id", options })` |
