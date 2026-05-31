# Easings Plugin Options

The `plugins/easings/` directory contains easing functions used by particle animations. These plugins do not expose a top-level options object — they provide easing functions that can be selected by animation components.

## Available easing packages

| Package                                 | Easing function                                         |
| --------------------------------------- | ------------------------------------------------------- |
| `@tsparticles/plugin-easing-back`       | `easeInBack` / `easeOutBack` / `easeInOutBack`          |
| `@tsparticles/plugin-easing-bounce`     | `easeInBounce` / `easeOutBounce` / `easeInOutBounce`    |
| `@tsparticles/plugin-easing-circ`       | `easeInCirc` / `easeOutCirc` / `easeInOutCirc`          |
| `@tsparticles/plugin-easing-cubic`      | `easeInCubic` / `easeOutCubic` / `easeInOutCubic`       |
| `@tsparticles/plugin-easing-elastic`    | `easeInElastic` / `easeOutElastic` / `easeInOutElastic` |
| `@tsparticles/plugin-easing-expo`       | `easeInExpo` / `easeOutExpo` / `easeInOutExpo`          |
| `@tsparticles/plugin-easing-gaussian`   | Gaussian (normal distribution) easing                   |
| `@tsparticles/plugin-easing-linear`     | Linear easing                                           |
| `@tsparticles/plugin-easing-quad`       | `easeInQuad` / `easeOutQuad` / `easeInOutQuad`          |
| `@tsparticles/plugin-easing-quart`      | `easeInQuart` / `easeOutQuart` / `easeInOutQuart`       |
| `@tsparticles/plugin-easing-quint`      | `easeInQuint` / `easeOutQuint` / `easeInOutQuint`       |
| `@tsparticles/plugin-easing-sigmoid`    | Sigmoid easing                                          |
| `@tsparticles/plugin-easing-sine`       | `easeInSine` / `easeOutSine` / `easeInOutSine`          |
| `@tsparticles/plugin-easing-smoothstep` | Smoothstep / smootherstep easing                        |

Easing functions are selected in animation options via the `easing` property (e.g. `particles.move.speed.animation.easing`).
