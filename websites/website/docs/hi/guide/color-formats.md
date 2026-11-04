# Color Formats

tsParticles accepts multiple color formats across options such as `background`, `particles.paint`, and plugin settings.

## Common formats

```ts
color: "#60a5fa";
```

```ts
color: {
  value: {
    r: 96,
    g: 165,
    b: 250,
  },
}
```

```ts
color: {
  value: "hsl(220, 90%, 70%)",
}
```

## High dynamic range (HDR)

When the display and browser support the Display P3 gamut and high dynamic range, the `hdr` option renders colors with extended brightness and tone mapping instead of clipping to the standard sRGB range:

```ts
hdr: {
  enable: true,
  mode: "natural",
  peakNits: 400,
},
```

The option also accepts a plain boolean (`hdr: true` enables HDR with the defaults).

Properties:

- `enable` (default `true`) - enables HDR rendering when the display supports it. On unsupported displays the renderer falls back to SDR output automatically.
- `mode` (default `standard`) - the HDR rendering mode preset:
  - `standard` - no tone mapping, colors as-is in the Display P3 gamut
  - `natural` - ACES Filmic tone mapping only, faithful to the original colors
  - `vivid` - saturated and bright colors
  - `cinematic` - warm tones, film look
  - `dynamic` - auto-balanced based on scene luminance
- `peakNits` (default `400`) - the assumed display peak brightness; higher values widen the tone-mapped luminance range. SDR reference white is fixed at 203 nits.

```ts
hdr: {
  enable: true,
  mode: "cinematic",
  peakNits: 1000,
},
```

Note that `mode` and `peakNits` only take effect when `enable` is `true` and rendering is actually HDR; the SDR path ignores them. Colors produced by `colorMix()` and color gradients are mixed in linear space in HDR mode for perceptually correct blends.

## Practical guidance

- Prefer hex for readability in docs and examples.
- Use arrays of colors for richer randomized scenes.
- Keep contrast high when effects are used behind text.

## Source reference

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Color.md>
- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Particles/Color.md>
