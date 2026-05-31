# Plugin Option: Trail

`trail` creates a trailing effect by retaining particle states for a number of frames.

## Example

```ts
trail: {
  enable: true,
  length: 20,
  fill: { color: { value: "#ffffff" } },
}
```

## Notes

- `length` controls trail persistence; higher values create longer trails.
- The `fill` option defines trail color and opacity.

## Source reference

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Plugins/Trail.md>
