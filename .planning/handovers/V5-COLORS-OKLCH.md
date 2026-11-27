# V5-COLOR — Adopt OKLCH as the canonical color model

Initial plan dated 2026-11-06 on branch `v5`, based on `4.5.2` source.
C1–C4 implementation and E5 acceptance are complete as of 2026-11-23; see
[the acceptance and explicit runtime exception](evidence/e5/closure/README.md).
C5 candidate-distribution verification remains assigned to E9/E10. Use the current checkout and the clean
measurement procedure in the [handover index](README.md) for execution.

## Required outcome

Use OKLCH for every resolved runtime color in v5, throughout the engine and
its extensions, including particle colors and color animation. `IOklch` /
`IOklcha` replace HSL/RGB as the persistent semantic color model. Options
continue to accept color manager formats, including arrays, ranges, index
selection, random values, and documented
precedence. HSL and RGB remain available for input and conversion. The pipeline
can resolve native OKLCH without an intermediate HSL or RGB conversion.

Preserve floating-point color until output. For colors outside a device's gamut,
retain the canonical value and apply a documented transform at the destination.
Avoid additional clipping, quantization, unnecessary conversions, and interpreting
RGB coordinates in the wrong space.

## E5 scope clarification — 2026-11-21

E5 owns this entire migration (C1–C4), not just particle fill/stroke. E6/E7
optimize the completed model; E8 audits ecosystem coverage; E9/E10 verify
packaging and release. None of those stages postpones unresolved canonical
runtime colors or the color-manager contract.

Apply the following boundary rules to every color-bearing field and API:

- Accepted user options, palettes, ranges, strings and source assets may retain
  their original syntax until selection/resolution. Resolve a selected color
  once into OKLCH plus alpha before it enters semantic runtime state. Preserve
  option ownership, random-call counts and refresh behavior.
- Particle and extension state, getters, modifiers, animation, link/bubble
  colors, gradient stops, emitter/absorber colors, backgrounds, masks, shadows,
  trails and recoloring must use canonical OKLCH. Review non-particle paths
  explicitly; a migrated particle getter or formatter does not prove closure.
- Temporary OKLab coordinates for mixing, XYZ/linear RGB for conversion, and
  destination RGB for rendering are allowed. They must not become a parallel
  semantic state model or overwrite canonical color/alpha.
- Raw decoded GIF/image palettes, pixel buffers and pixel-filter callbacks
  may use the source/API RGB format. Record the boundary and convert when a
  sampled pixel becomes an engine color (for example, an emitter spawn color).
- Derived CSS strings, mapped destination coordinates and raster caches are
  output artifacts. Key/invalidate them by canonical value and output settings;
  never reuse them as the source of animation or another destination's color.

### Source color-space and HDR interpretation

OKLCH is the canonical in-memory model, but converting an input to OKLCH still
requires knowing what its source channels mean. Treat source interpretation as
part of parsing/resolution, independently from the destination canvas and
`HDROptions`:

- Formats with an intrinsic space keep it: `oklch()`/`oklab()` are already
  defined, Lab/LCH use their declared white point and adaptation, and CSS
  `color(display-p3 …)` identifies Display-P3. Hex, named colors, ordinary
  `rgb()`/`hsl()` and existing untagged RGB objects retain their documented
  sRGB meaning.
- Channel-based RGB inputs use optional source metadata
  (`colorSpace: "srgb" | "display-p3"`); absent metadata remains sRGB for
  compatibility. `p3: true/false` is an input-only alias for Display-P3/sRGB
  and must agree with `colorSpace` when both are present. It does not request
  P3 output and cannot override a format that names its own space.
- HDR source colors are not currently supported. A generic `hdr: true/false`
  does not specify source transfer, channel scale, reference white or absolute
  luminance, so channel objects carrying `hdr` are rejected instead of being
  decoded as sRGB. Adding HDR source support requires a typed descriptor for
  those values and explicit conversion to canonical OKLCH plus any retained
  luminance metadata.
- Keep source metadata attached until resolution; resolve once, then discard
  it only when all appearance-relevant information is represented in canonical
  OKLCH plus alpha and any required luminance metadata. Ordinary relative
  OKLCH is not itself an HDR encoding and must not imply absolute nits.
- Add fixtures showing equivalent sRGB and Display-P3 colors resolve to the
  same appearance where representable, that P3-only colors retain their gamut,
  and that HDR decoding differs correctly for each supported transfer/scale.
  Test that changing output P3/HDR capabilities never reinterprets source
  channels or mutates canonical runtime state.

This source-descriptor/API decision is an E5 input-contract item, not a change
to the direct-OKLCH output default below. Record the selected representation,
defaults, invalid combinations and migration behavior in the C0 decision log
before implementing ambiguous RGB/HDR inputs.

### Output rule for implementers

**Default: canonical OKLCH → destination gamut mapping on a copy → CSS
`oklch(...)` → browser output conversion.** This applies to supported CSS/Canvas
color-string destinations, including a Canvas2D context configured as
`display-p3`. OKLCH represents colors inside and outside the P3 gamut; selecting
P3 does not require engine-side conversion to `color(display-p3 ...)`. Syntax
support and actual canvas gamut/precision must still be detected independently.
See [CSS Color 4](https://www.w3.org/TR/2026/CRD-css-color-4-20261027/).

Implement this decision in E5c/C2:

1. Make direct `oklch(L% C H / A)` serialization the normal style path. Internal
   `l` is 0–100, so serialize it as a percentage; preserve chroma/hue precision
   and apply input alpha and paint opacity exactly once. Do not require the
   optional OKLCH input-parser plugin to render canonical colors.
2. Keep source-space metadata separate from effective canvas gamut selection.
   Pass the destination gamut (`srgb`/`display-p3`) to the output formatter.
   Test both contexts, including colors inside P3 but outside sRGB, gradients,
   shadows and auxiliary surfaces.
3. Apply the explicit chroma-reduction policy at the output boundary: map a
   copy in OKLCH and serialize the mapped OKLCH value. Temporary RGB probes may
   test gamut membership; RGB serialization is not required. Do not add another
   engine mapping pass or mutate the canonical source. Record browser mapping
   differences in pixel tests.
4. Retain manual RGB conversion only for a demonstrated boundary requirement:
   unsupported OKLCH syntax, a pixel/binary API requiring RGB, or an explicit
   HDR/linear-light operation. For each retained path record the caller,
   capability/operation requiring it, primaries, encoding, scale and regression
   test. Wide-gamut/P3 support alone is not a justification.
5. Audit `oklchToDisplayP3Float` and `getHdrStyleFromRgb` under that rule. Their
   current use is implementation evidence, not a requirement to preserve the
   route. Remove unnecessary normal-style conversions; retain/rework helpers
   only for verified math, compatibility or output needs and update exports
   and callers if their API changes. An unclipped RGB intermediate is permitted
   math, never the persistent semantic color model.
6. Keep the HDR tone-mapping contract and its tests. Direct OKLCH syntax does
   not by itself implement peak-nits handling or HDR tone mapping. Isolate the
   manual linear-light path to modes that require it; prove its need and output
   with reference/pixel tests rather than routing every P3 color through it.

Acceptance: verify normal style generation emits `oklch(...)` without invoking
RGB conversion/serialization unless a documented mapping/fallback operation
requires conversion math. Test alpha, precision, sRGB/P3 pixel output, fallback,
HDR modes and unchanged canonical state. Existing RGB-output browser results
must be rerun for the new path; they do not validate direct OKLCH automatically.

The final manager contract must resolve to `IOklcha | undefined`. Required
legacy RGB methods plus optional OKLCH hooks are an intermediate migration,
not C2 completion. Move old custom-manager support behind an explicit legacy
sRGB input adapter; built-in and native v5 managers must not require RGB methods
or silently fall back to them. Update exports, CLI templates, examples and
contract tests together, preserving the supported input formats.

Before closing E5, attach a per-file inventory of remaining RGB/HSL fields,
signatures, conversions and call sites to the checkpoint. Classify each as
source/input compatibility, temporary math, output artifact, or unresolved
runtime migration; name its owner and test. The unresolved category must be
empty. Test that native managers need no RGB hooks, sampled input colors become
OKLCH before runtime use, and sequential sRGB/P3/HDR output leaves the same
canonical color and alpha intact. Include representative non-particle consumers.

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
   define a discriminated RGB object type with explicit space. Apply the source
   color-space/HDR interpretation rules above; do not silently treat output
   capability flags as input metadata. Plan further profiles (`srgb-linear`,
   Rec.2020, XYZ, and others) separately and list implemented formats.
6. Preserve wrapped inputs such as `{ oklch: … }` and `{ lch: … }` and legacy
   bare inputs. OKLCH/LCH and OKLab/Lab share field names. Verify historical
   manager order and precedence, prefer explicit forms in new examples, and
   define a discriminator for new spaces.
7. Keep parsing deterministic and DOM-independent. Test channel percentages,
   alpha, signs, decimals, angle units, whitespace, and complete consumption.
   Implement the supported CSS subset and decide explicitly on `none`, relative
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
- Serialize OKLCH directly where supported, following the output rule above.
  Manual RGB output requires a documented boundary need. Verify fill/stroke, shadow, gradient, CSS backgrounds and masks,
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
6. **C5 — Performance and candidate-distribution verification (09/10).** Compare measurements,
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

- [x] `IOklch` / `IOklcha` and h/c/l animation are the sole canonical runtime
      color model throughout engine and extensions, not only particles.
      The per-file RGB/HSL inventory has no unresolved runtime migration.
- [x] Native v5 managers resolve to OKLCH without required RGB methods; legacy
      custom managers use an explicit input adapter with documented limitations.
- [x] Managers cover historical color value formats. Document the new schema,
      alpha, and migration or conversion of external managers.
- [x] Preserve wide gamut through parsing, state, modifiers and mapped output.
      Eight current Chrome formatter cases and four exact link scenes pass,
      including P3/HDR float16, alpha, immutability and stroke-only HDR.
      Physical display certification remains part of the final currently scoped verification.
- [x] Direct `oklch(...)` is the default supported CSS/Canvas output; every
      retained manual RGB output path has a documented need and regression test.
- [x] Implement and verify HDR and gamut mapping decisions, including actual
      coordinate conversions and absolute luminance through deterministic unit
      references for canonical OKLCH output. Real-browser output remains a
      separate unchecked pixel-readback gate.
- [x] Complete the color-manager and runtime-consumer package matrix with unit
      and integration results beyond compilation; the downstream `tests:build`
      graph passes 186 dependency tasks.
- [x] Complete IMP-05 T1–T4 option/state/getter/cache comparisons and record
      retained class/loaders/live scratch and bounded/adaptive cache decisions.
      M4 draw now meets E0 ceilings at 500/1000 (2.40/8.30 ms).
- [x] Close E5 runtime acceptance with the user's explicit 2026-11-23 exception:
      quiet M4/500 update 3.70 vs 3.52 ceiling; frame p95 7.50 vs E4 6.50
      (screen 7.15). Final verification remains E10. The exception does not
      make these budgets pass. Bundle growth is also waived for E5; current
      complete payload measurements and attribution are retained.
- [x] Update `markdown/Color.md`, paint/color options, color plugin docs, API docs,
      schema, affected demos, presets, wrappers, generators, breaking changelog,
      and the v4 → v5 guide with before/after examples for managers, animation, and offsets.
- [x] Gate 10 collects `V5-COLOR-DECISIONS.md` and
      `V5-COLOR-REPORT.md`; the E10 report records the 8/8 Chrome 158 pixel
      result and keeps C5 open for budget and broader browser/hardware gates.

The canonical manager contract, color parsing/conversion APIs, OKLCH runtime
state, gamut mapper, output formatter, consumer migration and Particle review
are accepted for E5. Numerical, tick, current browser and complete downstream
verification pass; T1–T4 decisions are measured. The user explicitly accepts
the remaining M4/500 runtime deviation for E5 with final verification in E10.
The inherited M6/500 release-budget item and the bundle-growth measurements
remain visible. No C1–C4 source migration is deferred. C5 budget and physical
HDR/final distribution checks remain open in E10. See the
[final acceptance](evidence/e5/closure/README.md), including limitations and
rejected prototypes; the historical checkpoints retain their original results.

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
