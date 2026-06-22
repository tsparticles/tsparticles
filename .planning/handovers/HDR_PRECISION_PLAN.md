# Feature G: HDR Precision Enhancement

**Target:** `@tsparticles/engine`

## Design

Currently HDR mode uses `display-p3` color space with `float16` precision, but the color pipeline still uses **integer RGB (0-255)** internally. The bottleneck is `hslToRgb()` which does `Math.round()` on each channel, losing precision before the display-p3 conversion. This creates visible banding in the wider P3 gamut, especially during color animations.

The fix: when HDR is active, the color pipeline should use **floating-point RGB** end-to-end, generate more granular random colors, and use higher-precision cache keys.

### Current Pipeline (lossy)

```
HSL (float) → hslToRgb() → integer RGB ✔ → getHdrStyleFromRgb() → display-p3 string
                ^
          Math.round() ← precision lost here
```

### HDR Pipeline (high-precision)

```
HSL (float) → hslToRgbFloat() → float RGB (0.0-255.0) → getHdrStyleFromRgb() → display-p3 string
                ^
          No rounding ← precision preserved
```

### Changes Required

#### 1. New `IRgbFloat` type

```typescript
// engine/src/Core/Interfaces/Colors.ts
export interface IRgbFloat {
  r: number;  // 0.0 — 255.0 (floating, not integer)
  g: number;  // 0.0 — 255.0
  b: number;  // 0.0 — 255.0
}
```

Or simpler: widen `IRgb` to accept float. Currently `IRgb` uses `number` for r/g/b already, but downstream code treats them as integers. Since Typescript can't enforce this at runtime, the approach is:
- Add `hslToRgbFloat()` that skips `Math.round()`
- `getHdrStyleFromRgbFloat()` that accepts float RGB
- `getStyleFromHsl` for HDR → use `hslToRgbFloat()` instead of `hslToRgb()`

#### 2. New conversion function `hslToRgbFloat()`

```typescript
export function hslToRgbFloat(hsl: IHsl): IRgb {
  // Same as hslToRgb but WITHOUT Math.round() at the end
  const h = ((hsl.h % hMax) + hMax) % hMax,
    s = Math.max(sMin, Math.min(sMax, hsl.s)),
    l = Math.max(lMin, Math.min(lMax, hsl.l)),
    hNormalized = h / hMax,
    sNormalized = s / sMax,
    lNormalized = l / lMax;

  if (s === sMin) {
    const grayscaleValue = lNormalized * rgbMax;  // ← no round
    return { r: grayscaleValue, g: grayscaleValue, b: grayscaleValue };
  }

  const temp1 =
      lNormalized < half
        ? lNormalized * (sNormalizedOffset + sNormalized)
        : lNormalized + sNormalized - lNormalized * sNormalized,
    temp2 = double * lNormalized - temp1,
    phaseThird = phaseNumerator / triple,
    red = Math.min(rgbMax, rgbMax * hslChannel(temp2, temp1, hNormalized + phaseThird)),
    green = Math.min(rgbMax, rgbMax * hslChannel(temp2, temp1, hNormalized)),
    blue = Math.min(rgbMax, rgbMax * hslChannel(temp2, temp1, hNormalized - phaseThird));

  return { r: red, g: green, b: blue };  // ← float, no Math.round
}
```

#### 3. Update HDR style functions

`getStyleFromHsl` for HDR path:
```typescript
// Currently at ColorUtils.ts line 428-436:
export function getStyleFromHsl(color: IHsl, hdr: boolean, opacity?: number): string {
  ...
  hdr
    ? getStyleFromRgb(hslToRgb(color), true, opacity)  // ← loses precision
    : `hsla(...)`;
}
```

Change HDR path to use `hslToRgbFloat`:
```typescript
  hdr
    ? getStyleFromRgb(hslToRgbFloat(color), true, opacity)  // ← preserves precision
    : `hsla(...)`;
```

`getStyleFromRgb` for HDR — `getHdrStyleFromRgb` already accepts float (doesn't round internally):
```typescript
function getHdrStyleFromRgb(color: IRgb, opacity?: number, peakNits = maxNits): string {
  const headroom = peakNits / sdrReferenceWhiteNits;
  return `color(display-p3 ${((color.r / rgbMax) * headroom)} ${((color.g / rgbMax) * headroom)} ${((color.b / rgbMax) * headroom)} / ${(opacity ?? defaultOpacity)})`;
}
```
This already works with float RGB since `(color.r / rgbMax)` with float r produces finer granularity.

#### 4. Cache key precision for HDR

Currently:
```typescript
const rgbFixedPrecision = 2,   // 2 decimal places
  hslFixedPrecision = 2;       // 2 decimal places
```

For HDR, these should increase to 4 decimal places to avoid cache collisions:
```typescript
// When HDR is active, precision should be higher:
function getRgbCachePrecision(hdr: boolean): number {
  return hdr ? 4 : 2;
}
```

The cache key functions `getStyleFromRgb` and `getStyleFromHsl` should use precision based on HDR flag.

#### 5. HDR-aware random color generation

Currently `getRandomRgbColor()` generates **integer** RGB values:
```typescript
export function getRandomRgbColor(min?: number): IRgb {
  const fixedMin = min ?? defaultRgbMin,
    fixedMax = rgbMax + identity,
    getRgbInRangeValue = (): number => Math.floor(getRandomInRange(fixedMin, fixedMax));
  return { r: ..., g: ..., b: ... };
}
```

For HDR mode, add `getRandomRgbColorHdr()` that generates float RGB:
```typescript
export function getRandomRgbColor(min?: number, hdr?: boolean): IRgb {
  if (hdr) {
    const fixedMin = min ?? defaultRgbMin;
    // Float values for HDR: more granularity in display-p3
    return {
      r: getRandomInRange(fixedMin, rgbMax),
      g: getRandomInRange(fixedMin, rgbMax),
      b: getRandomInRange(fixedMin, rgbMax),
    };
  }
  // ... existing integer logic
}
```

#### 6. Constants for HDR precision

Add to `Constants.ts`:
```typescript
hdrRgbPrecision = 4,       // Decimal places for HDR color cache keys
sdrRgbPrecision = 2,       // Existing precision (explicit)
hdrHslPrecision = 4,       // Decimal places for HDR HSL cache keys
sdrHslPrecision = 2,       // Existing precision (explicit)
hdrRgbSteps = 1000,        // Granularity steps for HDR random colors
sdrRgbSteps = 255,         // Existing granularity
```

#### 7. HDR in color animation

`updateColorValue()` (ColorUtils.ts line 632):
- The `velocityFactor = 3.6` constant may need to be slightly higher for HDR to ensure smooth transitions across the wider gamut
- No changes needed to the algorithm itself (HSL values are already float), but verify:

```typescript
// In getHslAnimationFromHsl - ensure min/max for H color animation:
// Currently: hMin = 0, hMax = 360
// For HDR: keep same range (hue is still 0-360), but animation steps should
// use float velocity which they already do (velocity = speed / 100 * reduceFactor)
```

The key insight: HSL values are already floating point. The precision loss was ONLY in the `hslToRgb` → `Math.round()` step. Fixing that is the main deliverable.

#### 8. `alterHsl` for HDR

`alterHsl()` (ColorUtils.ts line 718) modifies the `l` channel by adding/subtracting a value. Currently operates on float — fine for HDR.

---

## Implementation Phases

### Phase 0: Constants
- Add HDR precision constants to `Constants.ts`

### Phase 1: hslToRgbFloat
- Create `hslToRgbFloat()` function (copy of `hslToRgb` without `Math.round()`)
- Export it

### Phase 2: HDR color pipeline
- Update `getStyleFromHsl` to use `hslToRgbFloat` when `hdr` is true
- Update cache key precision based on HDR flag
- Add `getRandomRgbColor` HDR mode (float generation)

### Phase 3: Verify color output
- Ensure `getHdrStyleFromRgb` works correctly with float RGB
- Verify cache key uniqueness with higher precision
- Test that all downstream color consumers work with float RGB

### Phase 4: Animation verification
- Verify `updateColorValue` produces smooth HDR transitions
- Ensure no regression in non-HDR mode
- Verify HSL→float RGB→display-p3 produces correct colors

---

## Files to Modify

| File | Change |
|------|--------|
| `engine/src/Utils/ColorUtils.ts` | `hslToRgbFloat()`, update `getStyleFromHsl`, `getRandomRgbColor`, cache precision |
| `engine/src/Core/Utils/Constants.ts` | Add HDR precision constants |
| `engine/src/export-types.ts` | Export `hslToRgbFloat` |

## Verification

- [ ] `pnpm exec vitest run` passes
- [ ] `pnpm run build:ci` passes
- [ ] HDR mode produces smoother color gradients than before (visible in demo)
- [ ] Non-HDR mode produces identical output to before (no regression)
- [ ] Color animations in HDR show no banding
- [ ] Random colors in HDR use full float precision
- [ ] Cache key collision rate same as before (high precision keys are unique enough)
