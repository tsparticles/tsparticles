# Plugin Option: Blend

`blend` sets canvas composite/blend operations for particle rendering.

## Example

```ts
blend: {
  enable: true,
  mode: "source-over",
}
```

## Notes

- Valid `mode` values match Canvas `globalCompositeOperation`.
- `destination-out` unveils background below drawn elements.

## Source reference

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Blend.md>
