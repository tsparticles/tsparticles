# V5 color decisions — C0 checkpoint

Recorded 2026-11-17 for E3/C0. The decisions below set the implementation
target for C1–C4; they do not claim those stages or real-browser output checks
are complete. Preserve the E0 fixtures as compatibility references and reopen
any decision that fails numerical, consumer, or browser evidence.

## Canonical runtime model

- All resolved engine and extension colors, including particle color and
  color animation, use `IOklch` / `IOklcha` as the canonical runtime model.
  `IOklch.l` uses the 0–100 OKLab/OKLCH scale, `c` uses the standard OKLab
  scale, and `h` is degrees normalized to `[0, 360)`.
  RGB, HSL, HSV, HWB, Lab, LCH, OKLab, CSS strings, arrays, ranges, and
  color-manager extensions remain supported inputs.
- Runtime coordinates remain floating point. Do not quantize or clamp during
  parsing, animation, or conversion through OKLab. Gamut handling happens once
  at the output boundary. Invalid/non-finite option values are diagnosed at
  load/parse boundaries rather than silently entering hot loops.
- Alpha stays an independent opacity channel in `[0, 1]`; it is never folded
  into lightness or chroma. Color parsing preserves explicit alpha from strings
  and alpha-bearing objects. Particle opacity/fill/stroke opacity continue to
  compose at their existing output boundary; animation of alpha is not added by
  C0.

The [E5 scope clarification](V5-COLORS-OKLCH.md#e5-scope-clarification--2026-11-21)
extends this invariant to non-particle state and defines permitted input,
temporary-math and output representations. Direct CSS `oklch(...)` is the
default supported output, including P3 canvases; the browser performs destination
conversion. Engine-side RGB output requires a documented boundary need.

## Input and compatibility

- Existing color-manager extension points remain the input adapter. Built-in
  managers convert supported formats directly to the canonical model; custom
  managers remain supported through an adapter that does not introduce an
  engine-to-plugin import cycle. The final native manager contract returns
  `IOklcha | undefined`; RGB compatibility belongs to an explicit legacy input
  adapter. Required RGB methods plus optional OKLCH hooks are transitional and
  cannot close E5/C2.
- Preserve array/range selection, random sampling order, `reduceDuplicates`,
  alpha, and the currently characterized input-format precedence. Do not add a
  new precedence for objects containing multiple model keys until a test
  captures existing behavior.
- CSS hue-bearing functions HSL, HWB, LCH, and OKLCH accept unitless degrees
  and `deg`, `°`, `rad`, `grad`, or `turn` angles. The `none` missing-component
  keyword is rejected at the parser boundary because the canonical model has no
  missing-component representation. RGB accepts numeric or percentage channels;
  RGB and HSL accept modern slash alpha and retain legacy comma alpha.
- Source interpretation is independent from output capabilities. Keep intrinsic
  spaces from formats such as `color(display-p3 …)`; untagged hex/named/RGB/HSL
  inputs continue to mean sRGB. New channel-object inputs must identify their
  primaries explicitly (for example `space: "display-p3"`) rather than infer
  them from the selected canvas. A `p3: true/false` shorthand is acceptable only
  if it has the same unambiguous input-only meaning and cannot override an
  intrinsically tagged format.
- Do not accept a generic `hdr: true/false` as sufficient HDR source metadata.
  HDR source decoding must identify its transfer function (such as PQ, HLG, or
  linear), scale, reference white and any required absolute luminance. A boolean
  can only be a shorthand for one fully specified encoding contract. The current
  `HDROptions` remain output controls and must not reinterpret input channels.
- Keep HSL and RGB conversion helpers as compatibility inputs/outputs where
  used by consumers. Remove `IHsl` from particle runtime animation contracts,
  not from accepted option syntax or conversion APIs. Legacy animation options
  migrate to `h`, `c`, and `l`; the C1/C2 integration change must provide the
  documented migration and all wrapper/plugin examples together.

## Animation, interpolation, and mixing

- Animate OKLCH `l`, `c`, and `h` independently. Interpolate hue by the
  shortest angular path; when one endpoint is effectively neutral, retain the
  chromatic endpoint's hue to avoid an arbitrary gray hue spin. Alpha remains
  separate.
- For operations that mix arbitrary colors (links, gradients, and plugin
  color mixing), use linear interpolation in rectangular OKLab with alpha
  handled separately. This avoids the hue singularity at neutral colors.
  Preserve existing timing, random samples, and interpolation endpoints.
- Tests must establish tolerances against independent reference calculations;
  the chosen model is not a claim of pixel identity with the old HSL pipeline.

## Output gamut and precision

- Prefer Display-P3 only when the actual canvas/context accepts it; otherwise
  use sRGB. Serialize `oklch(...)` directly on supported CSS/Canvas destinations
  in either gamut. Convert through D65 XYZ and the target linear RGB space only
  for required conversion math, explicit HDR processing, pixel APIs or verified
  syntax fallbacks. P3 alone does not require manual RGB serialization. Keep
  canonical color unchanged when a target cannot reproduce it.
- Map out-of-gamut output by reducing chroma at constant OKLCH lightness and
  hue with a bounded deterministic search on a copy. The direct style path
  serializes that mapped OKLCH copy; RGB gamut probes are temporary math. Apply
  target transfer encoding only on a justified RGB output path. Do not
  independently clamp RGB channels as the gamut mapper.
- Keep full floating-point intermediates. Quantization is allowed only at the
  final API/pixel format boundary. Document browser-native canvas mapping and
  compare it with the engine fallback using explicit color-space readback.

## HDR contract

- Wide gamut and HDR remain separate capabilities. The canonical OKLCH input
  uses the D65 relative scale and does not itself encode absolute luminance.
  `HDROptions.peakNits` and the negotiated canvas format control output range;
  203 nits remains the SDR reference white in the existing conversion path.
- Relative OKLCH plus alpha does not carry absolute luminance. If HDR source
  colors are supported, retain their required luminance metadata alongside the
  canonical color until the output path consumes it; otherwise document that
  inputs resolve as relative SDR colors. Do not silently clamp HDR input to
  ordinary OKLCH or imply that output HDR support reverses lost source data.
- Keep extended linear values until the destination boundary. Use the chosen
  P3/float16 or supported HDR context when available and keep a natural sRGB
  fallback. Apply the HDR transfer/tone mapping once, after color conversion
  and before the target's final format encoding; keep the existing HDR mode
  names as output treatments, not alternate canonical color models.
- E0 headless luminance limitations remain: a P3/float16 context proves the
  format path, not physical display luminance. E5 requires real-browser pixel
  checks for sRGB/P3 and capable HDR output; E10 records any hardware coverage
  that cannot be automated.

## C0 evidence and gates

E0 color fixtures and HDR/browser evidence are retained under
`evidence/e0/`; E1 bundle/runtime evidence records the current 4.6.0 build.
Before C1 implementation, add independent reference vectors for conversion,
neutral hue, alpha, gamut edges, and extended linear values. Before C2/C3, add
characterization tests for input precedence, range/random call counts, and
existing HSL animation inputs. C0 is a contract decision, not color rollout
acceptance; C1–C4 and C5 remain open.
