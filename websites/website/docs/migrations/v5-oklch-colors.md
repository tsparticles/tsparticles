# Migrate color animation to OKLCH

v5 uses OKLCH for particle color state and color animation. HSL, RGB and other
documented color formats remain valid static inputs. HSL animation channels are
not mapped automatically because HSL saturation and OKLCH chroma have different
units and perceptual meaning.

## Static colors

Existing CSS strings and HSL/RGB inputs continue to resolve as colors. For new
OKLCH objects, use the explicit `oklch` key to distinguish OKLCH from LCH:

```ts
paint: {
  fill: {
    color: {
      value: {
        oklch: { l: 65, c: 0.2, h: 285 },
      },
    },
  },
}
```

The object uses lightness in the `0`–`100` range, absolute OKLab chroma and hue
in degrees. CSS `oklch(0.65 0.2 285)` and `oklch(65% 0.2 285)` express the same
lightness. Input alpha is
preserved and composed with fill/stroke opacity at rendering.

## Animated colors

Replace the HSL `s` channel with an explicitly chosen OKLCH `c` animation, and
convert the base color to OKLCH before choosing channel bounds. Do not copy an
HSL saturation value directly into chroma.

```ts
paint: {
  fill: {
    color: {
      value: "oklch(65% 0.2 285)",
      animation: {
        h: { enable: true, speed: 12 },
        c: { enable: true, speed: 0.04, min: 0.08 },
        l: { enable: true, speed: 3, min: 45, max: 80 },
      },
    },
  },
}
```

Hue animates in degrees, chroma in OKLab units, and lightness in the `0`–`100`
range. The default chroma animation maximum is a convenience bound; it
does not limit valid static colors. Hue animation wraps within its configured
bounds. Color mixing interpolates rectangular OKLab coordinates with
premultiplied alpha; zero total weights split evenly. Lightness and chroma
channel animation remain independent.

Legacy `animation.s` input reports a migration error. For migration, resolve the
old static color to OKLCH and choose a chroma animation range and speed for the
new visual effect. There is no exact one-to-one conversion for an HSL saturation
animation.

## Split and trail colors

Split color offsets now use `h`, `c` and `l`. Lightness offsets are expressed in
the `0`–`100` scale; chroma offsets use OKLab units. Trail color
coordinates use `c` in place of `s`. Update those option objects explicitly.
The Fireworks bundle's `saturation` option is replaced by `chroma`, an absolute
OKLCH chroma offset (default range `-0.03` to `0.03`). Retune existing
`saturation` values manually: HSL saturation and OKLCH chroma have no exact
one-to-one conversion.

## Output and gamut

The engine keeps floating-point OKLCH through animation and serializes
`oklch(...)` directly for ordinary CSS/Canvas output, including Display-P3
contexts. Before serialization, it maps a copy into the effective destination
gamut by reducing chroma while preserving lightness and hue. The canonical
runtime color remains unchanged. HDR remains an explicit output path for
peak-nits and tone mapping. P3 input metadata is separate from output canvas
capabilities.

For RGB object inputs that are not sRGB, set `colorSpace` explicitly:

```ts
const p3Red = {
  value: { r: 255, g: 0, b: 0, colorSpace: "display-p3" },
};
```

For channel objects, `p3: true` is a shorthand for
`colorSpace: "display-p3"`, and `p3: false` means sRGB. If both are present,
they must agree. These flags describe input channels and do not choose the
output canvas space. The metadata and optional alpha also work in wrapped
`value.rgb` objects and ranged RGB channel objects.

Untagged RGB objects, hex and ordinary RGB/HSL strings continue to mean sRGB.
The source descriptor does not request P3 output. HDR source channels are not
supported and channel objects with an `hdr` property are rejected. A complete
HDR source descriptor would need to specify transfer function, scale, reference
white and absolute luminance before conversion.

## Custom color managers

Native `IColorManager` implementations resolve directly to `IOklcha` through
`handleColorOklch`, `handleRangeColorOklch` and `parseStringOklch`. RGB hooks are
not required. For an existing sRGB manager, wrap it explicitly with
`adaptLegacyColorManager`; this converts its RGB result to OKLCH and keeps the
legacy manager's precision and gamut limitations. Direct parsers must preserve
alpha.

```ts
const nativeManager: IColorManager = {
  accepts: (input) => input.startsWith("brand("),
  handleColorOklch: (color) => resolveBrandColor(color.value),
  handleRangeColorOklch: (color) => resolveBrandRange(color.value),
  parseStringOklch: (input) => parseBrandString(input),
};

engine.pluginManager.addColorManager("brand", nativeManager);

const compatibleManager = adaptLegacyColorManager(existingSrgbManager);

engine.pluginManager.addColorManager("legacy-brand", compatibleManager);
```

`resolveBrandColor`, `resolveBrandRange` and `parseBrandString` stand for the
format-specific parsers. They return `{ l, c, h, a }` directly; native managers
should not quantize through 8-bit RGB. Existing managers can implement
`ILegacyColorManager` and use the adapter while they are migrated.
