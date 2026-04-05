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

| Property      | Type               | Example | Notes                    |
| ------------- | ------------------ | ------- | ------------------------ |
| `absorbers`   | `object` / `array` |         | See {@link IAbsorber}    |
| `emitters`    | `object` / `array` |         | See {@link IEmitter}     |
| `polygonMask` | `object`           |         | See {@link IPolygonMask} |

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

- [Color](./Options/Particles/Color.md)
- [Bounce](./Options/Particles/Bounce.md)
- [Collisions](./Options/Particles/Collisions.md)
- [Destroy](./Options/Particles/Destroy.md)
- [Group](./Options/Particles/Group.md)
- [Life](./Options/Particles/Life.md)
- [Orbit](./Options/Particles/Orbit.md)
- [Repulse](./Options/Particles/Repulse.md)
- [Roll](./Options/Particles/Roll.md)
- [Rotate](./Options/Particles/Rotate.md)
- [Shadow](./Options/Particles/Shadow.md)
- [Stroke](./Options/Particles/Stroke.md)
- [Tilt](./Options/Particles/Tilt.md)
- [Twinkle](./Options/Particles/Twinkle.md)
- [Wobble](./Options/Particles/Wobble.md)
- [ZIndex](./Options/Particles/ZIndex.md)

### Plugin-powered options

- [Absorbers](./Options/Plugins/Absorbers.md)
- [Emitters](./Options/Plugins/Emitters.md)
- [Infection](./Options/Plugins/Infection.md)
- [Polygon Mask](./Options/Plugins/PolygonMask.md)

## Recommended starting sources

- Config objects: <https://github.com/tsparticles/tsparticles/blob/main/utils/configs/README.md>
- Official presets and palettes: <https://github.com/tsparticles/presets>
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
