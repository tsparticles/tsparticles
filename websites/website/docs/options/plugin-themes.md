# Plugin Option: Themes

`themes` lets you define predefined themes with option overrides that can be applied automatically based on system preferences.

## Example

```ts
themes: [
  {
    name: "dark",
    default: {
      mode: "dark",
      value: true,
    },
    options: {
      background: { color: "#111" },
    },
  },
]
```

## Notes

- Themes can be applied automatically when the OS theme matches via `default.auto`.
- Theme options are merged with the base configuration.

## Source reference

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Plugins/Themes.md>
