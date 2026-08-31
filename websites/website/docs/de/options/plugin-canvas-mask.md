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

## Source reference

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Plugins/CanvasMask.md>
