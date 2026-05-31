# Sounds Plugin Options

The `sounds` plugin configures audio playback tied to particle events. It exposes autoplay controls, per-event sound definitions, and volume/icon sub-options.

Properties (summary)

| Property   |            Type | Default | Description                                           |
| ---------- | --------------: | ------: | ----------------------------------------------------- |
| `autoPlay` |       `boolean` |  `true` | Whether to auto-play sounds on init.                  |
| `enable`   |       `boolean` | `false` | Enable the sounds plugin.                             |
| `events`   | `SoundsEvent[]` |    `[]` | Array of sound event definitions (see `SoundsEvent`). |
| `icons`    |   `SoundsIcons` |    `{}` | Icon configuration for UI elements.                   |
| `volume`   |  `SoundsVolume` |    `{}` | Global/default volume options.                        |

Notes

- `events` contains per-event definitions (source, playback behavior, triggers). See `plugins/sounds/src/Options/Classes/SoundsEvent.ts` for fields.
- `icons` and `volume` are nested option objects with their own defaults and loaders.

Example

```json
{
  "sounds": {
    "enable": true,
    "autoPlay": true,
    "events": [{ "name": "burst", "src": "sounds/burst.mp3" }],
    "volume": { "value": 0.8 }
  }
}
```

Refer to `plugins/sounds/src/Options/Classes/Sounds.ts` and related classes for complete option shapes and defaults.
