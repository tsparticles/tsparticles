# V5-COLOR — Adopt OKLCH as the canonical color model

Initial plan dated 2026-11-06 on branch `v5`, based on `4.5.2` source.
Implementation and measurements are pending. Use the current checkout and the
clean measurement procedure in the [handover index](README.md) for execution.

## Required outcome

Use OKLCH for canonical particle color and color animation in v5. `IOklch`
replaces `IHsl` in runtime contracts. Options continue to accept color manager
formats, including arrays, ranges, index selection, random values, and documented
precedence. HSL and RGB remain available for input and conversion. The pipeline
can resolve native OKLCH without an intermediate HSL or RGB conversion.

Preserve floating-point color until output. For colors outside a device's gamut,
retain the canonical value and apply a documented transform at the destination.
Avoid additional clipping, quantization, unnecessary conversions, and interpreting
RGB coordinates in the wrong space.

## Evidence from the original checkout

| Area                                                              | Observed behavior                                                                                      | Implication                                                                                        |
| ----------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------- |
| `engine/src/Core/Interfaces/IColorManager.ts`                     | `handleColor` and `handleRangeColor` return `IRgb`, and `parseString` returns `IRgba`                  | All managers converge on RGB                                                                       |
| `engine/src/Utils/ColorUtils.ts`                                  | `rangeColorToHsl` uses `rangeColorToRgb` and `rgbToHsl`                                                | OKLCH is reconstructed from RGB                                                                    |
| `plugins/colors/oklch/src/utils.ts`                               | `oklchToRgb` clamps and rounds to 0–255                                                                | Gamut and precision are lost at input                                                              |
| `engine/src/Core/Interfaces/Colors.ts`                            | `IOklch`, `IOklcha`, and `IRangeOklch` exist. `IRangeColor.value` lacks a direct `IRangeOklch` member. | Reuse types and fill the coverage gap                                                              |
| `Particle.ts`, `IParticleHslAnimation.ts`, `IParticleModifier.ts` | Fill, stroke, back color, getters, and modifiers depend on HSL                                         | Cross-cutting public change                                                                        |
| `AnimatableColor.ts`, `HslAnimation.ts`, `updaters/paint`         | HSL h/s/l channels, bounds, and numeric speeds                                                         | Renaming `s` to `c` changes semantics                                                              |
| `CanvasManager.ts`                                                | The P3/float16 request is also gated by HDR, and effective P3 alone sets the `hdr` flag                | Wide-gamut SDR and HDR are conflated                                                               |
| `ColorUtils.ts`                                                   | The HDR path produces `color(display-p3 ...)` from an RGB/tone-mapping pipeline                        | Audit primaries, transfer functions, and units. A label change alone leaves coordinates unchanged. |
| Links, connect, bubble, and gradient                              | Mixing, conversion, and output depend on RGB/HSL                                                       | Migrate interpolation and caches too                                                               |

Recheck the evidence on the implementation commit and inventory uses per file.
Keep unrelated working-tree changes out of color migration comparisons.

## Target contract

```text
Supported input → color manager → OKLCH + alpha
                                      ↓
                           h/c/l state and animation
                                      ↓
                       modifiers / interpolation / mixing
                                      ↓
                            effective output adapter
                                      ↓
          conversion / tone mapping / gamut mapping → output
```

### Types, units, and precision

- Reuse `IOklch` (`l`, `c`, `h`) and `IOklcha` (`a`). Keep SDR `l` in **0–100**
  to match the existing API and normalize to 0–1 in math helpers that need it.
  CSS `oklch(0.7 …)` and `oklch(70% …)` both resolve to `l=70`.
- `c` is absolute chroma. Keep it independent of HSL percentages and avoid an
  sRGB clamp or a physical maximum of 0.4. Document any default animation
  maximum separately from color validity.
- Normalize `h` in degrees modulo 360, including negative values and multiple
  turns. Keep `a` in 0–1 separate from paint, particle, and stop opacity.
  Define how they combine and apply each alpha once.
- Use double-precision JS numbers and preserve precision through conversions.
  Test string precision and output quantization separately. Specify primaries
  and encoding for intermediate RGB, including P3 and linear RGB.
- Define a numerical achromatic threshold and stable hue near zero chroma.
  Keep animatable hue and distinguish missing hue during interpolation.
  Runtime state must contain finite values.
- Preserve extended out-of-gamut coordinates during conversion. Define and test
  invalid-input normalization separately.

### Color managers and input compatibility

Keep the roles of `accepts`, `handleColor`, `handleRangeColor`, and `parseString`.
Have all color resolution methods return `IOklcha | undefined`, with absent
input alpha equivalent to 1. Document the breaking change for custom managers
and give a full migration example. Use native conversion without implicit RGB
adaptation. An explicit legacy sRGB adapter may support external managers and
must document existing precision and gamut limitations.

1. Resolve OKLCH directly and convert OKLab to OKLCH without RGB.
2. Convert Lab/LCH with a declared white point and D50/D65 adaptation.
   Preserve historical sRGB meaning for hex/named/RGB/HSL/HSV/HWB without rounding.
3. Expose `colorToOklch`, `rangeColorToOklch`, `stringToOklcha`, and style helpers
   through selective color exports. Separate pure conversion, parsing, and
   rendering. Keep core canonical color independent of color plugins.
4. Keep optional input managers. Rendering resolved OKLCH must work when
   another manager supplies the color and `loadOklchColorPlugin` is absent.
5. Add `color(display-p3 …)` input at least through an optional manager and
   define a discriminated RGB object type with explicit space. Plan further
   profiles (`srgb-linear`, Rec.2020, XYZ, and others) separately and list
   implemented formats.
6. Preserve wrapped inputs such as `{ oklch: … }` and `{ lch: … }` and legacy
   bare inputs. OKLCH/LCH and OKLab/Lab share field names. Verify historical
   manager order and precedence, prefer explicit forms in new examples, and
   define a discriminator for new spaces.
7. Keep parsing deterministic and DOM-independent. Test channel percentages,
   alpha, signs, decimals, angle units, whitespace, and complete consumption.
   Publish the supported CSS subset and decide explicitly on `none`, relative
   colors, `var()`, and custom profiles.
8. Resolve ranges and random values once with the owning engine's RNG.
   Preserve `reduceDuplicates`, indices, supported nested arrays, and isolation.

### Animation, interpolation, and mixing

- Introduce `IOklchAnimation`, `OklchAnimation`, and `IParticleOklchAnimation`
  for h/c/l. Migrate `AnimatableColor`, fill/stroke state, and gradients.
  Rename HSL-specific helpers and update exports, signatures, and consumers together.
- Define speed and offsets in channel units per time and check the existing time
  factor. Preserve delay, count, decay, sync, ranges, and reduce factor. Measure
  periods with explicit ticks and use chroma-specific units and factors.
- Wrap hue on `[min,max)`, including multiple-turn overshoot, negative speed, and
  nonzero minimum. Define limits and bounce for `l` and `c`. Validate inverted or
  equal bounds and initial values outside animation bounds. Preserve valid
  static colors beyond the default animation maximum.
- Default to perceptual OKLCH interpolation with the `shorter` hue path.
  Define behavior at 180°, for achromatic colors, identical endpoints, and
  zero alpha. If exposed, other hue paths need typed options.
- Keep channel animation distinct from interpolation between colors. Cartesian
  operations may use OKLab to avoid spurious hue. Document those helpers and
  return canonical OKLCH.
- Distinguish perceptual mixing for bubble, transitions, and links from physical
  or luminous compositing in declared linear RGB. Preserve canvas blend modes.
- Preserve mixing weights, including radius-weighted links. Define zero total
  weight and premultiplied alpha. Keep hue unpremultiplied in polar methods.
  Check intermediate pixels as canvas and engine gradients may interpolate differently.

### Migration of animation options

Static color values and HSL animation have different compatibility requirements.
`s=50` has no direct equivalent in `c=0.2`, and HSL and OKLCH hue/lightness
have different meanings. Use explicit migration for saturation and other channels.

Use canonical `animation.h/c/l` and keep compact animation as hue shorthand.
In C0, choose an explicit importer for legacy h/s/l or a breaking migration with
clear diagnostics and guidance. Prefer a manual migration guide for HSL channels,
exact conversion of static colors, and a single canonical per-particle model.
Report legacy input rather than silently changing its perceptual meaning.
Apply the same rule to split offsets and trail coordinates.

### Rendering, gamut, and HDR

- Separate support for color syntax, effective canvas space (`srgb`/`display-p3`),
  precision (`unorm8`/`float16`), and HDR. P3 SDR must work when
  `(dynamic-range: high)` is false. Inspect actual attributes when available
  and verify media queries and requested options against effective behavior.
- Propose `auto | srgb | display-p3` gamut selection separately from HDR,
  with `auto` and a tested fallback as the recommended default. Define behavior
  for caller-supplied canvas, OffscreenCanvas, and existing contexts. A second
  `getContext` retains settings. Recreating or refreshing a context requires
  explicit lifecycle, ownership, and teardown.
- Serialize OKLCH directly where supported or convert to the destination's RGB
  coordinates. Verify fill/stroke, shadow, gradient, CSS backgrounds and masks,
  intermediate canvases, recolored images/SVG, export, and caches. Intermediate
  sRGB canvases can lose gamut before final composition.
- For reproducible output, choose explicit chroma reduction and perceptual error
  control and compare with CSS Color 4 algorithms. Select algorithm and
  tolerances in C0/C2 using reference vectors. Reserve channel clipping for
  cases where the output contract explicitly warrants it.
- Apply mapping at the destination and keep animated state intact. A color
  rendered in sRGB must still be drawable in P3. Document native browser
  mapping differences and compare browser output with the engine fallback.
- Treat wide gamut and HDR separately. Define absolute luminance, reference
  white, peak nits, tone mapping, and extended HDR representation in C0.
  Evaluate separate luminance metadata. Test extended linear RGB ↔ OKLab/OKLCH
  without clamping and revise the contract before rollout if HDR values are lost.
- Audit existing HDR modes for fidelity, creative enhancement, saturation boost,
  and tone mapping. Keep boost out of the fidelity path. Define HDR transform
  and final gamut mapping order to avoid repeated mapping/clipping or wrong primaries.

## Migration inventory and ownership

| Handover | Files and families                                                            | Outcome                                                         |
| -------- | ----------------------------------------------------------------------------- | --------------------------------------------------------------- |
| 03 + 05  | `Colors`, `IColorManager`, `ColorUtils`, constants, exports and facades       | Canonical contracts and pure conversions                        |
| 03 + 07  | `IAnimatableColor`, HSL animation class/interface, `Particle`, modifiers      | h/c/l state and schema                                          |
| 05       | `CanvasManager`, `RenderManager`, canvas/HDR utilities, intermediate surfaces | Consistent outputs and capabilities                             |
| 07 + 08  | `updaters/paint`, gradient, roll, orbit, twinkle, destroy                     | Animation, L adjustment, back color, inheritance, split offsets |
| 08       | All `plugins/colors/*` and tests                                              | Native resolution without forced sRGB                           |
| 08       | Bubble, connect, grab, links, external trail, light                           | Mixing, caches, coordinates, and auxiliary colors               |
| 08       | Emitters, absorbers, trail, polygonMask, backgroundMask                       | Spawn colors, decoration, and backgrounds without early loss    |
| 08       | `shapes/image`, cards, other drawers/effects, palettes, and custom consumers  | Verified SVG, raster, and legacy helpers                        |
| 09 + 10  | Bundles, wrappers, CLI/MCP/codegen, schema, demos, Markdown, changelog        | Published APIs, examples, and migration                         |

Inventory `IRgb`, `IHsl`, `colorMix`, `rangeColorToRgb/Hsl`, style helpers,
`.s` accesses, h/s/l, color min/max/offsets, and cache keys. Classify remaining
uses as intentional input/conversion, output boundary, or migration work.
Preserve semantically valid HSL/RGB converters or document removals and replacements.

## Implementation sequence and gates

Follow the [execution sequence](V5-EXECUTION.md): C0 decisions in E3, C1–C4
in the coordinated E5 model/color migration, C5 distribution in E9 and closure
in E10. Numbers below identify technical handover owners, not execution order.
C2/C3 share a buildable integration checkpoint: migrate all directly affected
consumers with the signature switch. Complete Particle review and C4 in E5
before collection and rendering optimizations in E6/E7.

1. **C0 — Baseline and decisions (03, before shared changes).** Capture the
   commit and working-tree diff, APIs/types, color and scene fixtures, images,
   and v4 benchmarks. Set units, alpha, manager contracts, ambiguous-input
   handling, legacy animation, mixing, gamut algorithm and selection, and HDR.
   Record alternatives, evidence requirements, and open questions in
   `V5-COLOR-DECISIONS.md`. Block the affected rollout on unresolved HDR behavior.
2. **C1 — Math and types (03/05).** Implement pure bidirectional conversion using
   verified matrices and coefficients, signed extended transfer functions, and
   white adaptation. Share the minimum code and avoid engine → plugin cycles.
   Update exports and accuracy tests before consumers.
3. **C2 — Managers and end-to-end output (05 with 08).** Migrate all managers
   with parsing and alpha tests. Complete capability detection, gamut mapping,
   and fallbacks. Demonstrate a static OKLCH/P3 scene through pixel output.
   Require a path free of quantized HSL/RGB fallback before closing C2.
4. **C3 — Particles and animation (05/07).** Migrate options/runtime,
   fill/stroke, getters, modifiers, reset/pool, paint, and gradient. Test ticks
   and periods, achromatic colors, hue wrapping, color inheritance, and alpha.
   Keep one persistent color model.
5. **C4 — Ecosystem (08).** Complete the consumer matrix, including hidden
   surfaces, links/gradient/cache, and representative external plugins.
   Update helpers, schema, generators, and tests. Verify perceptual behavior.
6. **C5 — Performance, distribution, and release (09/10).** Compare measurements,
   built bundles, and real browsers. Complete the guide, changelog, and migration
   fixtures. Close `V5-COLOR-REPORT.md` with commands, outcomes, limitations,
   and final decisions.

## Tests and acceptance

### Numerical and contract tests

- Use independent CSS Color 4/WPT reference vectors and bidirectional conversion
  for black, white, grays, sRGB/P3 primaries, P3 outside sRGB, and colors outside
  both. Compare coordinates and deltaE OK against fixed tolerances. Round trips
  alone can hide errors shared by both conversions.
- Proposed in-gamut float tolerances are absolute error ≤ 1e-6 for normalized
  RGB and deltaE OK ≤ 1e-5 with OKLab L in 0–1. Confirm against coefficients and
  references before fixing them. Exclude numerical hue checks below the
  achromatic threshold and define a separate 8-bit output tolerance.
- Keep native OKLCH free of RGB converters and preserve chroma until rendering.
  Compare the same canonical value before and after sRGB/P3 output.
- Test mapping near boundaries and cusps, extreme lightness, and blue/purple
  hues. Require finite output within the target gamut and an independent reference.
- Test parsers and types for all managers, zero and percentage alpha, ranges and
  arrays, invalid/ambiguous inputs, custom managers, and RNG isolation.
- For link `mid`, use two colors and nonzero, unequal radii. Compare against an
  independent calculation with the radius weights and C0 interpolation.
- Update `utils/tests/src/tests/ColorUtils.ts`, `EngineUtils.ts`, `HDROptions.ts`,
  Particle/Updaters/Emitters/Options/Configs/Exports tests, and manager
  `conversion.spec.ts` files. Add missing reference fixtures and targeted tests.

### Real rendering

- Record Chromium/Firefox/WebKit versions. Cover HTML canvas and OffscreenCanvas,
  sRGB SDR, P3 SDR, HDR where available, ignored attributes/fallbacks, preexisting
  contexts, and display/capability changes. Use real browsers for gamut and HDR.
- Cover equivalent static colors across formats, saturated P3, hue sweeps at fixed
  L/C, L/C changes, gray ↔ color, fill/stroke alpha, bubble, links/connect,
  gradient, roll/twinkle, split, emitters/trail, background/mask, SVG, and export.
- Read pixels with explicit space and format where supported. Retain screenshots
  and color metadata. Verify P3/HDR separately from sRGB PNGs and SDR displays.
  Characterize browser color management before requiring exact pixel matches.

### Performance and workspace verification

- Benchmark deterministic parse/init, h/c/l update, drawing, and link mixing in
  static and animated scenes at the same density. Record frame time, allocations,
  heap, and cache hit rate. Avoid repeated static-color trig and conversion.
- Bound caches and invalidate for color, alpha, effective capabilities, gamut,
  tone mapping, and precision. Evaluate per-value or per-particle-version caches.
  Keep `JSON.stringify` out of the frame and preserve chroma precision.
- Measure min/gzip/Brotli for a pure helper, minimal scene, basic/slim/full/all,
  and lazy with total chunks. Use IMP-01/02 and set budgets after the baseline.
  Measure cost and check license before adding general-purpose dependencies.
- Discover targets with `pnpm nx show project <name> --json`. Run targeted Nx
  tests, the full suite, and lint/format. Before proposing a commit, run
  `pnpm exec vitest` as specified in AGENTS and finish a finite run if it watches.
  Rebuild downstream packages outside CLI/website/palette and affected CLI,
  schema, and generators. Finish with `pnpm run build:ci`. Use the local Nx
  workarounds in the index if needed.

## Documentation and completion

- [ ] `IOklch` and h/c/l animation are the sole canonical particle model.
      Remaining HSL/RGB uses are intentional and classified.
- [ ] Managers cover historical color value formats. Document the new schema,
      alpha, and migration or conversion of external managers.
- [ ] Preserve wide gamut through parsing, state, modifiers, and output.
      Verify P3 SDR independently from HDR and float16.
- [ ] Implement and verify HDR and gamut mapping decisions, including actual
      coordinate conversions and absolute luminance.
- [ ] Complete the package matrix with verification results beyond compilation.
- [ ] Pass numerical and browser tests, benchmarks, and budgets. Record open
      checks with reproduction and required environment.
- [ ] Update `markdown/Color.md`, paint/color options, color plugin docs, API docs,
      schema, affected demos, presets, wrappers, generators, breaking changelog,
      and the v4 → v5 guide with before/after examples for managers, animation, and offsets.
- [ ] Gate 10 collects `V5-COLOR-DECISIONS.md` and `V5-COLOR-REPORT.md`.

The proposed APIs and improvements remain pending implementation and verification.

## Technical references

Originally consulted on 2026-11-06. Pin the revision used for implementation fixtures.

- [CSS Color 4 — Oklab/OKLCH](https://www.w3.org/TR/css-color-4/#ok-lab),
  [conversions](https://www.w3.org/TR/css-color-4/#color-conversion-code),
  [interpolation](https://www.w3.org/TR/css-color-4/#interpolation), and
  [gamut mapping](https://www.w3.org/TR/css-color-4/#gamut-mapping).
- [WHATWG HTML — Canvas color spaces](https://html.spec.whatwg.org/multipage/canvas.html#colour-spaces-and-colour-space-conversion)
  and [context settings](https://html.spec.whatwg.org/multipage/canvas.html#concept-canvas-settings).
- [Web Platform Tests — CSS color](https://github.com/web-platform-tests/wpt/tree/master/css/css-color)
  and [wide gamut canvas](https://github.com/web-platform-tests/wpt/tree/master/html/canvas/element/wide-gamut-canvas).
