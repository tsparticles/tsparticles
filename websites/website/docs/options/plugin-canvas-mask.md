# Plugin Option: Canvas Mask

`canvasMask` uses an HTML canvas (or image/text) as a mask for particle emission and drawing.

## Example

```ts
canvasMask: {
  enable: true,
  selector: "#my-mask-canvas",
  position: { x: 50, y: 50 },
  scale: 1,
}
```

## Notes

- Supports image masks, text masks, and pixel-based sampling.
- The mask position is expressed in percent by default.
- Pixel filter callbacks receive the RGBA pixel and an optional second `colorSpace` argument (`"srgb"` or `"display-p3"`). Readback uses RGBA-unorm8, so samples do not retain HDR headroom. Sampled colors retain their source space when converted to OKLCH for particles.
- If both color and opacity overrides are enabled, source pixel alpha is applied once through particle opacity.

## Source reference

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Plugins/CanvasMask.md>
