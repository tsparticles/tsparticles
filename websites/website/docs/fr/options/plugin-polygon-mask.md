# Plugin Option: Polygon Mask

`polygonMask` constrains particles to SVG or polygon-based regions.

## Example

```ts
polygonMask: {
  enable: true,
  type: "inline",
  move: {
    radius: 10,
  },
  url: "https://particles.js.org/images/smalldeer.svg",
}
```

## Notes

- Use optimized SVG paths for better runtime performance.
- Validate path loading and fallback behavior.

## Source reference

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Plugins/PolygonMask.md>
