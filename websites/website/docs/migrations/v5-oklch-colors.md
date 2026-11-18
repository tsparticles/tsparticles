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
bounds. Color mixing interpolates rectangular OKLab coordinates; lightness and
chroma channel animation remain independent.

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

The particle keeps its floating-point OKLCH value through animation. SDR sRGB
output reduces chroma at constant lightness and hue when needed, without
rewriting the stored particle color. When the effective canvas color space is
Display-P3, SDR output maps into that gamut. HDR requests a float16 Display-P3
context only when the browser reports support; browser pixel checks and HDR
validation remain part of the E5 rollout. Canvas and browser color management
can produce small output differences from v4 HSL rendering.

## Custom color managers

The existing `IColorManager` RGB methods remain supported during the migration.
Built-in managers also implement `handleColorOklch`, `handleRangeColorOklch`
and `parseStringOklch`; custom managers can implement them to keep canonical
resolution out of the legacy RGB adapter. The engine falls back to the RGB
result for custom managers that omit these methods. Preserve alpha when
implementing the direct string method.
