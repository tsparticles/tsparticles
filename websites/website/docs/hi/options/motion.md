# Motion

`motion` is useful when you need animation-level control, including reduced-motion behavior.

## Basic structure

```ts
motion: {
  disable: false,
  reduce: {
    factor: 4,
    value: true,
  },
}
```

- `disable`: stops motion-related behavior.
- `reduce`: allows softer animation on constrained devices or reduced-motion contexts.

## Practical guidance

- Keep this at defaults unless you have accessibility/performance requirements.
- Test with reduced-motion preferences and low-end devices.

## Source reference

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Motion.md>
