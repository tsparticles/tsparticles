# Plugin Option: Poisson

`poisson` provides Poisson-disc (blue-noise) sampling for particle placement with minimum separation.

## Example

```ts
poisson: {
  enable: true,
  dimensions: 2,
  radius: 20,
  retries: 30,
}
```

## Notes

- `radius` controls minimum distance between generated points.
- Higher `retries` values produce more uniform distribution at the cost of runtime.

## Source reference

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Plugins/Poisson.md>
