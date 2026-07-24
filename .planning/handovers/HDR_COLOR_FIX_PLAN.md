# HDR Color Fidelity Fix & Rendering Modes — Technical Specification

## Status

HDR color implementation has reported fidelity issues from users.

The current approach multiplies RGB values by a headroom factor without tone mapping, causing color clipping and distortion on saturated/bright colors.

This document defines:
1. Technical fixes to the existing HDR algorithm
2. New HDR rendering mode presets for user control

---

## Table of Contents

0. [Problem statement](#0-problem-statement)
1. [Root cause analysis](#1-root-cause-analysis)
2. [Phase 1: Technical fixes](#2-phase-1-technical-fixes)
3. [Phase 2: HDR rendering modes](#3-phase-2-hdr-rendering-modes)
4. [Data model and options](#4-data-model-and-options)
5. [File-by-file specification](#5-file-by-file-specification)
6. [Integration matrix](#6-integration-matrix)
7. [Testing strategy](#7-testing-strategy)
8. [Implementation checklist](#8-implementation-checklist)
9. [Acceptance criteria](#9-acceptance-criteria)
10. [Default configurations](#10-default-configurations)

---

## 0. Problem statement

### 0.1 User reports

Users have reported that HDR colors look "washed out" or "distorted" compared to their SDR equivalents.

### 0.2 Current behavior

When `hdr = true` and the browser supports Display P3 + HDR:
- RGB values [0-255] are normalized to [0-1] and multiplied by `headroom = peakNits / sdrReferenceWhiteNits ≈ 1.97`
- Output as CSS `color(display-p3 R G B / A)`
- No tone mapping or perceptual adjustment is applied
- `colorMix` operates in gamma-encoded sRGB space

### 0.3 Expected behavior

HDR colors should:
- Preserve the visual intent of the original color definition
- Avoid clipping on saturated/bright values
- Provide perceptually correct color mixing
- Offer user-selectable rendering presets for different use cases

---

## 1. Root cause analysis

### 1.1 No tone mapping

**Location**: `engine/src/Utils/ColorUtils.ts:451-455`

Current formula:
```ts
const headroom = peakNits / sdrReferenceWhiteNits;
return `color(display-p3 ${(r/255)*headroom} ${(g/255)*headroom} ${(b/255)*headroom} / ${opacity})`;
```

Values above 255/1.97 ≈ 129 in any channel will produce display-p3 values > 1.0, which get clipped by the browser without perceptual mapping.

### 1.2 Gamma-encoded color mixing

**Location**: `engine/src/Utils/ColorUtils.ts:494-511`

`colorMix` performs weighted average in sRGB gamma space:
```ts
return {
    b: mix(rgb1.b, rgb2.b, size1, size2),
    g: mix(rgb1.g, rgb2.g, size1, size2),
    r: mix(rgb1.r, rgb2.r, size1, size2),
};
```

Where `mix` uses `Math.floor((comp1 * weight1 + comp2 * weight2) / (weight1 + weight2))`.

This produces incorrect perceptual results because sRGB is non-linear.

### 1.3 Hardcoded peakNits

**Location**: `engine/src/Core/Utils/Constants.ts:81`

```ts
maxNits = 400,
```

Real HDR displays range from 400 to 2000+ nits. The fixed value doesn't adapt to actual display capabilities.

### 1.4 No display capability re-evaluation

**Location**: `engine/src/Core/CanvasManager.ts:441-455`

HDR support is checked once at initialization via `matchMedia`. If display capabilities change (e.g., external HDR monitor connected), the canvas context is not re-initialized.

### 1.5 Integer precision loss in colorMix

`colorMix` uses `hslToRgb` (integer output via `Math.round`) instead of `hslToRgbFloat`, losing sub-integer precision needed for HDR.

---

## 2. Phase 1: Technical fixes

### 2.1 Tone mapping (ACES Filmic)

**File**: `engine/src/Utils/ColorUtils.ts`

Add ACES Filmic approximation function:
```ts
function acesFilmic(x: number): number {
    const a = 2.51, b = 0.03, c = 2.43, d = 0.59, e = 0.14;
    return clamp((x * (a * x + b)) / (x * (c * x + d) + e), 0, 1);
}
```

Apply in `getHdrStyleFromRgb` before CSS output:
```ts
function getHdrStyleFromRgb(color: IRgb, opacity?: number, peakNits = maxNits): string {
    const headroom = peakNits / sdrReferenceWhiteNits;
    const r = acesFilmic((color.r / rgbMax) * headroom);
    const g = acesFilmic((color.g / rgbMax) * headroom);
    const b = acesFilmic((color.b / rgbMax) * headroom);
    return `color(display-p3 ${r} ${g} ${b} / ${opacity ?? defaultOpacity})`;
}
```

### 2.2 Linear-space color mixing

**File**: `engine/src/Utils/ColorUtils.ts`

Add sRGB ↔ linear conversion functions:
```ts
function srgbToLinear(c: number): number {
    return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}

function linearToSrgb(c: number): number {
    return c <= 0.0031308 ? c * 12.92 : 1.055 * Math.pow(c, 1 / 2.4) - 0.055;
}
```

Update `colorMix` to accept `hdr` parameter:
```ts
export function colorMix(color1: IRgb | IHsl, color2: IRgb | IHsl, size1: number, size2: number, hdr?: boolean): IRgb {
    let rgb1 = color1 as IRgb,
        rgb2 = color2 as IRgb;

    if (!("r" in rgb1)) {
        rgb1 = hdr ? hslToRgbFloat(color1 as IHsl) : hslToRgb(color1 as IHsl);
    }

    if (!("r" in rgb2)) {
        rgb2 = hdr ? hslToRgbFloat(color2 as IHsl) : hslToRgb(color2 as IHsl);
    }

    if (hdr) {
        // Convert to linear space for mixing
        const lin1 = { r: srgbToLinear(rgb1.r / rgbMax), g: srgbToLinear(rgb1.g / rgbMax), b: srgbToLinear(rgb1.b / rgbMax) };
        const lin2 = { r: srgbToLinear(rgb2.r / rgbMax), g: srgbToLinear(rgb2.g / rgbMax), b: srgbToLinear(rgb2.b / rgbMax) };

        const mixed = {
            r: (lin1.r * size1 + lin2.r * size2) / (size1 + size2),
            g: (lin1.g * size1 + lin2.g * size2) / (size1 + size2),
            b: (lin1.b * size1 + lin2.b * size2) / (size1 + size2),
        };

        // Convert back to sRGB
        return {
            r: linearToSrgb(mixed.r) * rgbMax,
            g: linearToSrgb(mixed.g) * rgbMax,
            b: linearToSrgb(mixed.b) * rgbMax,
        };
    }

    return {
        b: mix(rgb1.b, rgb2.b, size1, size2),
        g: mix(rgb1.g, rgb2.g, size1, size2),
        r: mix(rgb1.r, rgb2.r, size1, size2),
    };
}
```

### 2.3 Configurable peakNits

**Files**: `engine/src/Options/Interfaces/IOptions.ts`, `engine/src/Options/Classes/Options.ts`

Add option:
```ts
// Interface
peakNits?: number;

// Class
peakNits = 400;
```

**File**: `engine/src/Utils/ColorUtils.ts`

Update `getHdrStyleFromRgb` to use container's peakNits value instead of constant.

### 2.4 Display capability listener

**File**: `engine/src/Core/CanvasManager.ts`

Add `matchMedia` listeners for `color-gamut: p3` and `dynamic-range: high`:
```ts
#initHdrListeners(): void {
    const p3Query = safeMatchMedia("(color-gamut: p3)");
    const hdrQuery = safeMatchMedia("(dynamic-range: high)");

    const handleChange = () => {
        this.#initContext();
    };

    p3Query?.addEventListener("change", handleChange);
    hdrQuery?.addEventListener("change", handleChange);
}
```

Call in constructor after initial context setup.

---

## 3. Phase 2: HDR rendering modes

### 3.1 Mode definitions

| Mode | ID | Description | Adjustments |
|------|----|-------------|-------------|
| Natural | `natural` | Faithful to original colors | Tone mapping only, no boost |
| Vivid | `vivid` | Saturated and bright | Saturation +15%, lightness +5% |
| Cinematic | `cinematic` | Warm tones, film look | Temperature shift (r×1.05, b×0.95), contrast +10% |
| Dynamic | `dynamic` | Auto-balanced | Weighted blend based on scene luminance |

### 3.2 Adjustment algorithm

**File**: `engine/src/Utils/ColorUtils.ts`

Add mode-specific adjustments after tone mapping in `getHdrStyleFromRgb`:

```ts
function applyHdrModeAdjustments(r: number, g: number, b: number, mode: HdrMode): { r: number, g: number, b: number } {
    switch (mode) {
        case HdrMode.natural:
            return { r, g, b };

        case HdrMode.vivid: {
            // Increase saturation by blending toward max channel
            const max = Math.max(r, g, b);
            const min = Math.min(r, g, b);
            const avg = (r + g + b) / 3;
            const saturationBoost = 1.15;
            const lightnessBoost = 1.05;

            return {
                r: clamp(avg + (r - avg) * saturationBoost, 0, 1) * lightnessBoost,
                g: clamp(avg + (g - avg) * saturationBoost, 0, 1) * lightnessBoost,
                b: clamp(avg + (b - avg) * saturationBoost, 0, 1) * lightnessBoost,
            };
        }

        case HdrMode.cinematic: {
            const temperatureR = 1.05;
            const temperatureB = 0.95;
            const contrast = 1.1;
            const avg = (r + g + b) / 3;

            return {
                r: clamp((avg + (r * temperatureR - avg) * contrast), 0, 1),
                g: clamp((avg + (g - avg) * contrast), 0, 1),
                b: clamp((avg + (b * temperatureB - avg) * contrast), 0, 1),
            };
        }

        case HdrMode.dynamic: {
            // Weighted blend based on luminance
            const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
            const vividWeight = Math.min(1, luminance * 2);
            const naturalWeight = 1 - vividWeight;

            // Natural path (no adjustment)
            const natural = { r, g, b };

            // Vivid path
            const max = Math.max(r, g, b);
            const avg = (r + g + b) / 3;
            const vivid = {
                r: clamp(avg + (r - avg) * 1.15, 0, 1) * 1.05,
                g: clamp(avg + (g - avg) * 1.15, 0, 1) * 1.05,
                b: clamp(avg + (b - avg) * 1.15, 0, 1) * 1.05,
            };

            return {
                r: natural.r * naturalWeight + vivid.r * vividWeight,
                g: natural.g * naturalWeight + vivid.g * vividWeight,
                b: natural.b * naturalWeight + vivid.b * vividWeight,
            };
        }

        default:
            return { r, g, b };
    }
}
```

---

## 4. Data model and options

### 4.1 New enum: HdrMode

**File**: `engine/src/Enums/Modes/HdrMode.ts` (new)

```ts
export enum HdrMode {
    natural = "natural",
    vivid = "vivid",
    cinematic = "cinematic",
    dynamic = "dynamic",
}
```

### 4.2 Extended IOptions

**File**: `engine/src/Options/Interfaces/IOptions.ts`

```ts
export interface IOptions {
    // ... existing fields
    hdr: boolean;
    hdrMode: HdrMode | keyof typeof HdrMode;
    peakNits?: number;
}
```

### 4.3 Extended Options class

**File**: `engine/src/Options/Classes/Options.ts`

```ts
export class Options extends OptionLoader<IOptions> implements IOptions {
    // ... existing fields
    hdr = true;
    hdrMode: HdrMode | keyof typeof HdrMode = HdrMode.natural;
    peakNits = 400;

    protected override doLoad(data: ISourceOptions): void {
        // ... existing loading
        loadProperty(this, "hdr", data.hdr);
        loadProperty(this, "hdrMode", data.hdrMode);
        loadProperty(this, "peakNits", data.peakNits);
    }
}
```

### 4.4 Container extension

**File**: `engine/src/Core/Container.ts`

```ts
export class Container {
    // ... existing fields
    hdrMode;

    // in start():
    const { hdrMode } = this.actualOptions;
    this.hdrMode = hdrMode;
}
```

---

## 5. File-by-file specification

### 5.1 `engine/src/Enums/Modes/HdrMode.ts` (new)

Create enum with `natural`, `vivid`, `cinematic`, `dynamic` values.

### 5.2 `engine/src/exports.ts`

Add export:
```ts
export * from "./Enums/Modes/HdrMode.js";
```

### 5.3 `engine/src/Options/Interfaces/IOptions.ts`

Add:
```ts
hdrMode: HdrMode | keyof typeof HdrMode;
peakNits?: number;
```

### 5.4 `engine/src/Options/Classes/Options.ts`

Add:
```ts
hdrMode: HdrMode | keyof typeof HdrMode = HdrMode.natural;
peakNits = 400;
```

Update `doLoad`:
```ts
loadProperty(this, "hdrMode", data.hdrMode);
loadProperty(this, "peakNits", data.peakNits);
```

### 5.5 `engine/src/Core/Container.ts`

Add `hdrMode` field, set in `start()` from `actualOptions.hdrMode`.

### 5.6 `engine/src/Utils/ColorUtils.ts`

Major changes:
- Add `acesFilmic()` function
- Add `srgbToLinear()` and `linearToSrgb()` functions
- Add `applyHdrModeAdjustments()` function
- Update `getHdrStyleFromRgb()` to use tone mapping and mode adjustments
- Update `colorMix()` to accept `hdr` parameter and mix in linear space when HDR
- Update `getStyleFromRgb()` to pass mode parameter
- Update `getStyleFromHsl()` to pass mode parameter

### 5.7 `engine/src/Core/CanvasManager.ts`

- Add HDR capability change listeners
- Pass `peakNits` to color functions

### 5.8 `engine/src/Core/RenderManager.ts`

Pass `container.hdrMode` to `getStyleFromHsl()` calls.

### 5.9 Consumer files (15+ files)

Update all files that call `getStyleFromRgb()` or `getStyleFromHsl()` to pass `hdrMode`:

| File | Function |
|------|----------|
| `updaters/gradient/src/GradientUpdater.ts` | `updateColor`, `getStyleFromHsl` |
| `updaters/twinkle/src/TwinkleUpdater.ts` | `getStyleFromRgb`/`getStyleFromHsl` |
| `updaters/paint/src/PaintUpdater.ts` | `updateColor` |
| `updaters/orbit/src/Utils.ts` | `getStyleFromRgb` |
| `interactions/external/connect/src/Utils.ts` | `getStyleFromRgb` |
| `interactions/external/grab/src/Utils.ts` | `getStyleFromRgb` |
| `interactions/particles/links/src/LinkInstance.ts` | `getStyleFromRgb` |
| `interactions/light/src/Utils.ts` | `getStyleFromRgb` |
| `plugins/absorbers/src/AbsorberInstance.ts` | `getStyleFromRgb` |
| `plugins/trail/src/TrailPluginInstance.ts` | `getStyleFromRgb` |
| `plugins/backgroundMask/src/BackgroundMaskPluginInstance.ts` | `getStyleFromRgb` |
| `plugins/polygonMask/src/PolygonMaskInstance.ts` | `getStyleFromRgb` |
| `effects/shadow/src/ShadowDrawer.ts` | `getStyleFromRgb` |
| `shapes/image/src/Utils.ts` | `getStyleFromRgb` |
| `shapes/ribbon/src/Utils.ts` | `getStyleFromRgb` |
| `shapes/cards/src/cards/CardDrawer.ts` | `getStyleFromRgb` |

---

## 6. Integration matrix

### 6.1 HDR modes and existing features

| Feature | natural | vivid | cinematic | dynamic |
|---------|---------|-------|-----------|---------|
| Links | ✓ | ✓ | ✓ | ✓ |
| Gradients | ✓ | ✓ | ✓ | ✓ |
| Twinkle | ✓ | ✓ | ✓ | ✓ |
| Paint | ✓ | ✓ | ✓ | ✓ |
| Orbit | ✓ | ✓ | ✓ | ✓ |
| Absorbers | ✓ | ✓ | ✓ | ✓ |
| Trail | ✓ | ✓ | ✓ | ✓ |
| Background mask | ✓ | ✓ | ✓ | ✓ |
| Polygon mask | ✓ | ✓ | ✓ | ✓ |
| Shadow | ✓ | ✓ | ✓ | ✓ |
| Images (SVG replace) | ✓ | ✓ | ✓ | ✓ |
| Cards | ✓ | ✓ | ✓ | ✓ |
| Ribbon | ✓ | ✓ | ✓ | ✓ |
| Light interaction | ✓ | ✓ | ✓ | ✓ |

### 6.2 Backward compatibility

| Current config | New behavior |
|----------------|--------------|
| `hdr: true` | `hdrMode: "natural"` (same as before + tone mapping fix) |
| `hdr: false` | Unchanged, HDR disabled |
| `hdr: true, hdrMode: "vivid"` | New vivid rendering |
| No `hdrMode` specified | Defaults to `"natural"` |

---

## 7. Testing strategy

### 7.1 Unit tests

1. `acesFilmic()` produces values in [0,1] for inputs in [0,∞)
2. `srgbToLinear()` and `linearToSrgb()` are inverses within tolerance
3. `colorMix()` with `hdr=true` produces linear-space results
4. `getHdrStyleFromRgb()` with each mode produces valid CSS `color()` strings
5. `peakNits` option loads correctly
6. `hdrMode` option loads correctly

### 7.2 Visual tests

1. Pure white (255,255,255) renders without clipping in natural mode
2. Saturated red (255,0,0) preserves hue in all modes
3. Mid-gray (128,128,128) looks identical in natural mode vs previous behavior
4. Vivid mode shows visibly increased saturation
5. Cinematic mode shows warm tone shift
6. Dynamic mode adapts to scene brightness

### 7.3 Regression tests

- All existing color utility tests pass
- SDR rendering unchanged when `hdr: false`
- No performance regression in color style generation

---

## 8. Implementation checklist

### Step 0 — Baseline

- [ ] Verify current HDR behavior and test baseline
- [ ] Document existing color utility tests

### Step 1 — Tone mapping fix

- [ ] Add `acesFilmic()` function to `ColorUtils.ts`
- [ ] Update `getHdrStyleFromRgb()` to apply tone mapping
- [ ] Add unit tests for tone mapping

### Step 2 — Linear color mixing

- [ ] Add `srgbToLinear()` and `linearToSrgb()` functions
- [ ] Update `colorMix()` with `hdr` parameter
- [ ] Update all `colorMix()` call sites to pass `hdr` flag
- [ ] Add unit tests for linear mixing

### Step 3 — Configurable peakNits

- [ ] Add `peakNits` to `IOptions` and `Options`
- [ ] Update `getHdrStyleFromRgb()` to accept peakNits parameter
- [ ] Thread `peakNits` through canvas initialization

### Step 4 — Display listener

- [ ] Add `matchMedia` change listeners in `CanvasManager`
- [ ] Test with HDR display connect/disconnect

### Step 5 — HdrMode enum and options

- [ ] Create `HdrMode.ts` enum
- [ ] Add `hdrMode` to `IOptions` and `Options`
- [ ] Export from `exports.ts`
- [ ] Add `hdrMode` to `Container`

### Step 6 — Mode adjustments

- [ ] Implement `applyHdrModeAdjustments()` function
- [ ] Integrate into `getHdrStyleFromRgb()`
- [ ] Add unit tests for each mode

### Step 7 — Consumer updates

- [ ] Update `RenderManager.ts`
- [ ] Update all 15+ consumer files to pass `hdrMode`
- [ ] Verify each consumer compiles and renders correctly

### Step 8 — Validation

- [ ] Run full test suite
- [ ] Visual validation with test configs
- [ ] Performance profiling

---

## 9. Acceptance criteria

1. HDR colors with `hdrMode: "natural"` look perceptually equivalent to SDR intent
2. No clipping on saturated colors (255,0,0) or bright colors (255,255,255)
3. `colorMix()` produces perceptually correct blends in HDR mode
4. All four modes (`natural`, `vivid`, `cinematic`, `dynamic`) produce visually distinct results
5. `peakNits` option correctly scales HDR output
6. Display capability changes are handled gracefully
7. All existing tests pass
8. No performance regression in color style generation

---

## 10. Default configurations

### 10.1 Natural mode (default, faithful to original)

```json
{
  "hdr": true,
  "hdrMode": "natural",
  "peakNits": 400
}
```

### 10.2 Vivid mode (saturated, bright)

```json
{
  "hdr": true,
  "hdrMode": "vivid",
  "peakNits": 400
}
```

### 10.3 Cinematic mode (warm, film look)

```json
{
  "hdr": true,
  "hdrMode": "cinematic",
  "peakNits": 400
}
```

### 10.4 Dynamic mode (auto-balanced)

```json
{
  "hdr": true,
  "hdrMode": "dynamic",
  "peakNits": 400
}
```

### 10.5 High-brightness display

```json
{
  "hdr": true,
  "hdrMode": "natural",
  "peakNits": 1000
}
```
