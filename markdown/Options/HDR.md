# HDR

High dynamic range rendering options. When `enable` is `true` and the display supports it (P3 color gamut plus high dynamic range), particles are rendered with extended brightness and tone mapping.

## Properties

| Key        | Type      | Default    | Notes                                           |
| ---------- | --------- | ---------- | ----------------------------------------------- |
| `enable`   | `boolean` | `true`     | Enables HDR rendering when the display supports |
| `mode`     | `HdrMode` | `standard` | Rendering mode preset                           |
| `peakNits` | `number`  | `400`      | Peak brightness in nits                         |

## enable

When `true`, HDR rendering is used only if the browser and display support the P3 color gamut and high dynamic range. On unsupported displays the renderer falls back to standard SDR output.

A plain boolean shorthand is also accepted: `"hdr": true` enables HDR with the defaults (`mode: "standard"`, `peakNits: 400`), `"hdr": false` disables it.

```json
{
  "hdr": {
    "enable": true
  }
}
```

## mode

The rendering mode preset:

- `standard` - SDR colors as-is in the P3 gamut, no tone mapping
- `natural` - faithful to original colors, tone mapping only
- `vivid` - saturated and bright colors
- `cinematic` - warm tones, film look
- `dynamic` - auto-balanced based on scene luminance

```json
{
  "hdr": {
    "enable": true,
    "mode": "vivid"
  }
}
```

## peakNits

The peak brightness in nits assumed for the display. Higher values produce a wider luminance range after tone mapping.

```json
{
  "hdr": {
    "enable": true,
    "peakNits": 1000
  }
}
```

## Related docs

- Options root: [Options](../Options.md)
