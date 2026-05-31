# Plugin Option: Sounds

`sounds` configures audio playback tied to particle events.

## Example

```ts
sounds: {
  enable: true,
  autoPlay: true,
  events: [
    { name: "burst", src: "sounds/burst.mp3" },
  ],
  volume: { value: 0.8 },
}
```

## Notes

- Supports per-event sound definitions with playback and trigger configuration.
- Volume and icon sub-options are available for UI elements.

## Source reference

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Plugins/Sounds.md>
