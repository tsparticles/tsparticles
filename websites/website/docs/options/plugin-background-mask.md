# Plugin Option: Background Mask

`backgroundMask` draws a cover or mask over the canvas using compositing operations.

## Example

```ts
backgroundMask: {
  enable: true,
  composite: "destination-out",
  cover: {
    color: { value: "#000000" },
    opacity: 1,
  },
}
```

## Notes

- Use `cover.image` to use an image as the mask cover.
- The plugin extends the built-in `backgroundMask` with additional compositing features.

## Source reference

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Plugins/BackgroundMask.md>
