# Plugin Option: Motion

`motion` provides rendering behavior settings based on the user's `prefers-reduced-motion` preference.

## Example

```ts
motion: {
  disable: true,
  reduce: {
    factor: 4,
    value: true,
  },
}
```

## Notes

- When `disable` is `true`, animations are fully disabled for users who request reduced motion.
- The `reduce` settings control how much motion is reduced when not fully disabled.

## Source reference

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Plugins/Motion.md>
