# Options

This page is a quick map of root options. For full type details, use the API reference too:

- <https://particles.js.org/docs/interfaces/tsParticles_Engine.Options_Interfaces_IOptions.IOptions.html>

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

## Choose your configuration path

- **I want a fast visual result**: start with `preset` and then override only key fields
- **I want full control**: define `particles`, `interactivity`, and `background` manually
- **I need responsive behavior**: add `responsive` rules after your base config is stable

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

## Common pitfalls

- Enabling plugin options (`emitters`, `absorbers`, `polygonMask`) without loading their packages
- Setting very high particle counts before validating performance
- Mutating runtime options without a container refresh
- Migrating old configs without converting snake_case keys

## Next steps

- Color values and formats: [Color](./Color.md)
- Runtime container management: [Container](./Container.md)
- Official presets: <https://github.com/tsparticles/presets>
