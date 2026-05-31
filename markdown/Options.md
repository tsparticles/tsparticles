# Options

This page is the main map for root options.

Use it to choose where to start, then jump to the detailed guides for each option group. For full type details, use the API reference too:

- <https://particles.js.org/docs/interfaces/tsParticles_Engine.Options_Interfaces_IOptions.IOptions.html>

## Choose your configuration path

- **I want full manual control**: define `particles`, `interactivity`, and `background` yourself
- **I want a quick object to inspect and edit**: start from `@tsparticles/configs`
- **I want a ready effect first**: use a `preset` and then override only the fields you care about
- **I need responsive behavior**: add `responsive` rules after your base config is stable

## Minimal complete example

```json
{
  "background": {
    "color": "#0f172a"
  },
  "fpsLimit": 60,
  "detectRetina": true,
  "interactivity": {
    "events": {
      "onHover": {
        "enable": true,
        "mode": "repulse"
      }
    }
  },
  "particles": {
    "links": {
      "enable": true
    },
    "move": {
      "enable": true
    },
    "number": {
      "value": 80
    }
  }
}
```

## Most-used root options

| Property                 | Type                 | Example                             | Notes                                  |
| ------------------------ | -------------------- | ----------------------------------- | -------------------------------------- |
| `autoPlay`               | `boolean`            | `true` / `false`                    | Starts animation automatically         |
| `background`             | `object`             | `{ color: "#111" }`                 | See {@link IBackground}                |
| `backgroundMask`         | `object`             |                                     | See {@link IBackgroundMask}            |
| `detectRetina`           | `boolean`            | `true` / `false`                    | Replaces `retina_detect`               |
| `duration`               | `number` / `range`   | `60` / `{ min: 30, max: 90 }`       | Effect duration in seconds             |
| `fpsLimit`               | `number`             | `60`                                | Default: `60`; replaces `fps_limit`    |
| `fullScreen`             | `object` / `boolean` | `true` / `false`                    | See {@link IFullScreen}                |
| `interactivity`          | `object`             |                                     | See {@link IInteractivity}             |
| `manualParticles`        | `array`              |                                     | See {@link IManualParticle}            |
| `motion`                 | `object`             |                                     | See {@link IMotion}                    |
| `particles`              | `object`             |                                     | See {@link IParticlesOptions}          |
| `pauseOnBlur`            | `boolean`            | `true` / `false`                    | Pauses when the tab loses focus        |
| `pauseOnOutsideViewport` | `boolean`            | `true` / `false`                    | Pauses when canvas is outside viewport |
| `preset`                 | `string` / `array`   | `"links"` / `["links", "confetti"]` | Loads official or custom presets       |
| `responsive`             | `array`              |                                     | See {@link IResponsive}                |
| `themes`                 | `array`              |                                     | See {@link ITheme}                     |

## Plugin options (not included in slim)

| Property         | Type               | Example | Notes                                                     |
| ---------------- | ------------------ | ------- | --------------------------------------------------------- |
| `absorbers`      | `object` / `array` |         | See [Absorbers](./Options/Plugins/Absorbers.md)           |
| `backgroundMask` | `object`           |         | See [BackgroundMask](./Options/Plugins/BackgroundMask.md) |
| `blend`          | `object`           |         | See [Blend](./Options/Blend.md)                           |
| `canvasMask`     | `object`           |         | See [CanvasMask](./Options/Plugins/CanvasMask.md)         |
| `emitters`       | `object` / `array` |         | See [Emitters](./Options/Plugins/Emitters.md)             |
| `infection`      | `object`           |         | See [Infection](./Options/Plugins/Infection.md)           |
| `motion`         | `object`           |         | See [Motion](./Options/Plugins/Motion.md)                 |
| `poisson`        | `object`           |         | See [Poisson](./Options/Plugins/Poisson.md)               |
| `polygonMask`    | `object`           |         | See [PolygonMask](./Options/Plugins/PolygonMask.md)       |
| `sounds`         | `object`           |         | See [Sounds](./Options/Plugins/Sounds.md)                 |
| `themes`         | `array`            |         | See [Themes](./Options/Plugins/Themes.md)                 |
| `trail`          | `object`           |         | See [Trail](./Options/Plugins/Trail.md)                   |
| `zoom`           | `object`           |         | See [Zoom](./Options/Plugins/Zoom.md)                     |

## Deep links for option groups

- Background: [Options/Background](./Options/Background.md)
- Background Mask: [Options/BackgroundMask](./Options/BackgroundMask.md)
- Full Screen: [Options/FullScreen](./Options/FullScreen.md)
- Interactivity: [Options/Interactivity](./Options/Interactivity.md)
- Motion: [Options/Motion](./Options/Motion.md)
- Particles: [Options/Particles](./Options/Particles.md)
- Themes: [Options/Themes](./Options/Themes.md)

## Detailed guides for the most updated sections

### Interactivity

- [Click](./Options/Interactivity/Click.md)
- [Hover](./Options/Interactivity/Hover.md)
- [Div](./Options/Interactivity/Div.md)

### Particle visuals and behavior

- [Bounce](./Options/Particles/Bounce.md)
- [Collisions](./Options/Particles/Collisions.md)
- [Color](./Options/Particles/Color.md)
- [Destroy](./Options/Particles/Destroy.md)
- [Effect](./Options/Particles/Effect.md)
- [Fill](./Options/Particles/Fill.md)
- [Gradient](./Options/Particles/Gradient.md)
- [Group](./Options/Particles/Group.md)
- [Life](./Options/Particles/Life.md)
- [Links](./Options/Particles/Links.md)
- [Move](./Options/Particles/Move.md)
- [Number](./Options/Particles/Number.md)
- [Opacity](./Options/Particles/Opacity.md)
- [Orbit](./Options/Particles/Orbit.md)
- [Out Modes](./Options/Particles/OutModes.md)
- [Paint](./Options/Particles/Paint.md)
- [Palette](./Options/Particles/Palette.md)
- [Repulse](./Options/Particles/Repulse.md)
- [Roll](./Options/Particles/Roll.md)
- [Rotate](./Options/Particles/Rotate.md)
- [Shadow](./Options/Particles/Shadow.md)
- [Shape](./Options/Particles/Shape.md)
- [Size](./Options/Particles/Size.md)
- [Stroke](./Options/Particles/Stroke.md)
- [Tilt](./Options/Particles/Tilt.md)
- [Twinkle](./Options/Particles/Twinkle.md)
- [Wobble](./Options/Particles/Wobble.md)
- [ZIndex](./Options/Particles/ZIndex.md)

### Plugin-powered options

- [Absorbers](./Options/Plugins/Absorbers.md)
- [Background Mask](./Options/Plugins/BackgroundMask.md)
- [Blend](./Options/Blend.md)
- [Canvas Mask](./Options/Plugins/CanvasMask.md)
- [Colors](./Options/Plugins/Colors.md)
- [Easings](./Options/Plugins/Easings.md)
- [Effects (drawers)](./Options/Plugins/Effects.md)
- [Emitters](./Options/Plugins/Emitters.md)
- [Emitter Shapes](./Options/Plugins/EmittersShapes.md)
- [Exports](./Options/Plugins/Exports.md)
- [Infection](./Options/Plugins/Infection.md)
- [Interactions](./Options/Plugins/Interactions.md)
- [Motion](./Options/Plugins/Motion.md)
- [Path Generators](./Options/Plugins/PathGenerators.md)
- [Poisson](./Options/Plugins/Poisson.md)
- [Polygon Mask](./Options/Plugins/PolygonMask.md)
- [Responsive](./Options/Plugins/Responsive.md)
- [Shapes](./Options/Plugins/Shapes.md)
- [Sounds](./Options/Plugins/Sounds.md)
- [Themes](./Options/Plugins/Themes.md)
- [Trail](./Options/Plugins/Trail.md)
- [Updaters](./Options/Plugins/Updaters.md)
- [Zoom](./Options/Plugins/Zoom.md)

## Recommended starting sources

- Config objects: <https://github.com/tsparticles/tsparticles/blob/main/utils/configs/README.md>
- Official presets: <https://github.com/tsparticles/presets>
- Official palettes: <https://github.com/tsparticles/palettes>
- Main getting-started guide: [Pages/index](./Pages/index.md)

## Common pitfalls

- Enabling plugin options (`emitters`, `absorbers`, `polygonMask`) without loading their packages
- Setting very high particle counts before validating performance
- Mutating runtime options without a container refresh
- Migrating old configs without converting snake_case keys

## Next steps

- Color values and formats: [Color](./Color.md)
- Runtime container management: [Container](./Container.md)
- Official presets: <https://github.com/tsparticles/presets>
- Config package: <https://github.com/tsparticles/tsparticles/blob/main/utils/configs/README.md>
