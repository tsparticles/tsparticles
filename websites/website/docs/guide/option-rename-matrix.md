# Option Rename Matrix

Use this page as a fast lookup when migrating configs across major versions.

## Core tsParticles option mappings

| Legacy key         | Current key              | Notes                                     |
| ------------------ | ------------------------ | ----------------------------------------- |
| `particles.color`  | `particles.paint.fill`   | Main color path moved under `paint.fill`. |
| `particles.stroke` | `particles.paint.stroke` | Stroke path moved under `paint.stroke`.   |

## Legacy particles.js compatibility mappings

These mappings are useful if your config still comes from old particles.js JSON.

| particles.js key | Current key    | Notes                                      |
| ---------------- | -------------- | ------------------------------------------ |
| `line_linked`    | `links`        | Same concept, renamed to modern key style. |
| `retina_detect`  | `detectRetina` | Snake case to camel case.                  |

## Load API migration quick map

This is not an option key rename, but it is one of the most common migration breakages.

| Legacy API                        | Current API                               |
| --------------------------------- | ----------------------------------------- |
| `tsParticles.load("id", options)` | `tsParticles.load({ id: "id", options })` |
| `particlesJS("id", options)`      | `tsParticles.load({ id: "id", options })` |

## See also

- [`/guide/migrate-from-v3`](/guide/migrate-from-v3)
- [`/guide/migrate-from-v2`](/guide/migrate-from-v2)
- [`/guide/migrate-from-v1`](/guide/migrate-from-v1)
- [`/migration/`](/migration/)
