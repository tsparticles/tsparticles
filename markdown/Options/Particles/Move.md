# Particles Move

Controls how particles move across the canvas — direction, speed, gravity, noise, and boundary behavior.

## Core properties

| Key         | Type               | Example                             | Notes                                                                                      |
| ----------- | ------------------ | ----------------------------------- | ------------------------------------------------------------------------------------------ |
| `enable`    | `boolean`          | `true` / `false`                    | Activates movement                                                                         |
| `speed`     | `number` / `range` | `4` / `{ min: 1, max: 6 }`          | Movement speed (relative units)                                                            |
| `direction` | `string`           | `"none"` / `"top"` / `"bottom"` / … | Initial direction; full list below                                                         |
| `random`    | `boolean`          | `true` / `false`                    | Randomizes initial speed per particle                                                      |
| `straight`  | `boolean`          | `true` / `false`                    | When `true`, particles move in a fixed straight line                                       |
| `vibrate`   | `boolean`          | `true` / `false`                    | Adds a vibration tremor effect                                                             |
| `warp`      | `boolean`          | `true` / `false`                    | Particles reappear on the opposite edge                                                    |
| `size`      | `boolean`          | `true` / `false`                    | Speed scales with particle size                                                            |
| `outModes`  | `object`           |                                     | Behavior when particles reach canvas boundary — see [Out Modes](#particles-move-out-modes) |
| `angle`     | `object`           |                                     | Spread angle offset — see [Angle](#particles-move-angle)                                   |
| `attract`   | `object`           |                                     | Attract toward a center point — see [Attract](#particles-move-attract)                     |
| `gravity`   | `object`           |                                     | Gravity acceleration — see [Gravity](#particles-move-gravity)                              |
| `noise`     | `object`           |                                     | Perlin/Simplex noise path — see [Noise](#particles-move-noise)                             |
| `trail`     | `object`           |                                     | Trailing ghost effect — see [Trail](#particles-move-trail)                                 |
| `spin`      | `object`           |                                     | Spin around a center point — see [Spin](#particles-move-spin)                              |

## Direction values

`"none"` · `"top"` · `"top-right"` · `"right"` · `"bottom-right"` · `"bottom"` · `"bottom-left"` · `"left"` · `"top-left"`

## Quick examples

### Basic random movement

```json
{
  "move": {
    "enable": true,
    "speed": 2
  }
}
```

### Falling particles (snow-like)

```json
{
  "move": {
    "enable": true,
    "direction": "bottom",
    "speed": 1.5,
    "straight": false
  }
}
```

### Rising particles (fire-like) with gravity off-screen destroy

```json
{
  "move": {
    "enable": true,
    "direction": "top",
    "speed": 3,
    "outModes": {
      "default": "destroy",
      "bottom": "none"
    }
  }
}
```

### Gravity + bounce

```json
{
  "move": {
    "enable": true,
    "gravity": {
      "enable": true,
      "acceleration": 9.81,
      "maxSpeed": 50
    },
    "outModes": {
      "default": "bounce",
      "top": "none"
    }
  }
}
```

### Noise path (organic wandering)

```json
{
  "move": {
    "enable": true,
    "noise": {
      "enable": true,
      "delay": { "value": 0 }
    }
  }
}
```

## Particles Move Out Modes

Controls what happens when a particle exits the canvas boundary.

| Value                 | Behavior                         |
| --------------------- | -------------------------------- |
| `"out"`               | Wraps to the opposite side       |
| `"destroy"`           | Removes the particle             |
| `"bounce"`            | Bounces off the boundary         |
| `"bounce-horizontal"` | Bounces only on horizontal edges |
| `"bounce-vertical"`   | Bounces only on vertical edges   |
| `"none"`              | No special behavior              |
| `"split"`             | Splits the particle on exit      |

```json
{
  "outModes": {
    "default": "out",
    "top": "destroy",
    "bottom": "bounce"
  }
}
```

`default` applies to all sides not explicitly overridden. You can set `top`, `bottom`, `left`, `right` independently.

## Particles Move Angle

Applies a spread offset angle to particle direction.

| Key      | Type     | Example | Notes                             |
| -------- | -------- | ------- | --------------------------------- |
| `value`  | `number` | `90`    | Spread angle in degrees           |
| `offset` | `number` | `45`    | Angular offset added to direction |

## Particles Move Attract

Pulls particles toward a virtual center defined by rotation axes.

| Key        | Type      | Example          | Notes                  |
| ---------- | --------- | ---------------- | ---------------------- |
| `enable`   | `boolean` | `true` / `false` | Activates attract      |
| `rotate.x` | `number`  | `3000`           | X-axis rotation factor |
| `rotate.y` | `number`  | `1500`           | Y-axis rotation factor |

## Particles Move Gravity

Simulates gravitational acceleration pulling particles downward.

| Key            | Type      | Example          | Notes                      |
| -------------- | --------- | ---------------- | -------------------------- |
| `enable`       | `boolean` | `true` / `false` | Activates gravity          |
| `acceleration` | `number`  | `9.81`           | Gravity acceleration value |
| `maxSpeed`     | `number`  | `50`             | Caps falling speed         |

## Particles Move Noise

Applies Perlin/Simplex noise for organic non-linear paths.

| Key           | Type               | Example                        | Notes                              |
| ------------- | ------------------ | ------------------------------ | ---------------------------------- |
| `enable`      | `boolean`          | `true` / `false`               | Activates noise movement           |
| `delay.value` | `number` / `range` | `1` / `{ min: 0.5, max: 1.5 }` | Delay before noise kicks in        |
| `clamp`       | `boolean`          | `true` / `false`               | Clamps noise to canvas bounds      |
| `generator`   | `string`           | `"simplexNoise"`               | Name of the noise generator plugin |

## Particles Move Spin

Rotates particles around a center point.

| Key            | Type      | Example                | Notes                       |
| -------------- | --------- | ---------------------- | --------------------------- |
| `enable`       | `boolean` | `true` / `false`       | Activates spin              |
| `acceleration` | `number`  | `2`                    | Angular acceleration        |
| `position`     | `object`  | `{ "x": 50, "y": 50 }` | Center point as % of canvas |

## Particles Move Trail

Renders a fading trail behind each particle.

| Key         | Type                  | Example          | Notes                        |
| ----------- | --------------------- | ---------------- | ---------------------------- |
| `enable`    | `boolean`             | `true` / `false` | Activates trail              |
| `length`    | `number`              | `10`             | Number of trail frames       |
| `fillColor` | color object / string | `"#000000"`      | Color used to fade the trail |

## Particles Move Distance

Limits how far a particle can travel from its origin.

| Key          | Type     | Example | Notes                           |
| ------------ | -------- | ------- | ------------------------------- |
| `horizontal` | `number` | `50`    | Max horizontal travel in pixels |
| `vertical`   | `number` | `50`    | Max vertical travel in pixels   |

## Common pitfalls

- Setting `enable: false` and expecting particles to animate — all movement is disabled
- Using `gravity` with `outModes: "out"` — particles will fall off the bottom and wrap to the top, which looks wrong; use `"destroy"` or `"bounce"` for gravity scenarios
- Enabling `noise` without loading the noise plugin
- Combining `straight: true` with a non-`"none"` noise generator — `straight` overrides noise

## Related docs

- Particles root: [Particles](../Particles.md)
- Out Modes: covered above
- Options root: [Options](../../Options.md)
