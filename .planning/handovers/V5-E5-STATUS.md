# E5 checkpoint — Particle/options and OKLCH

Status: **accepted on 2026-11-23**. C1–C4 and the Particle/options review are
complete. The user explicitly accepts the remaining M4/500 runtime deviation
for E5, with final verification in E10. Bundle growth is also waived for E5.
These exceptions do not mark the original budgets as passing.

Read the [final acceptance and evidence](evidence/e5/closure/README.md) first.
All earlier checkpoints below are historical; statements that E5 is open are
superseded by the final acceptance entry. Next stage: **E6**.

## Planning correction — 2026-11-21 (implementation still open)

The [E5 scope clarification](V5-COLORS-OKLCH.md#e5-scope-clarification--2026-11-21)
is an acceptance requirement for all resolved engine/extension colors. Earlier
entries below describe partial implementation and test runs, not acceptance of
the final manager contract or a complete non-particle state audit.

Latest outcome: 457 build:ci projects, all 85 workspace test targets and 817
primary tests pass. Eight formatter pixel cases and four exact link pixel
scenes pass. T1–T4 and ARCH-01/03 decisions are recorded. M4/500's quiet
nine-repetition update/p95 deviation remains explicit in E10, under the user's
acceptance exception. No E5 color implementation is deferred.

### Agent entry checklist

Read this correction first, then the numbered output rules linked below. For
color architecture/output decisions, this correction and the current color
plan supersede historical implementation notes later in this checkpoint.
Those notes remain evidence of past work, not instructions to preserve old paths.

- [x] Native managers resolve OKLCH; legacy RGB managers use an explicit adapter.
- [x] Input color-space metadata is distinct from output P3/HDR capabilities;
      supported HDR source encodings have explicit transfer/scale/luminance data.
- [x] Every resolved semantic runtime color is OKLCH, including extension state.
- [x] Supported CSS/Canvas output defaults to `oklch(...)`, including P3 canvases.
- [x] Each remaining manual RGB output is an explicit compatibility or pixel
      boundary with tests; runtime extension output uses the OKLCH formatter.
- [x] Gamut mapping operates on a copy; HDR processing and alpha remain correct.
- [x] Remaining RGB/HSL uses are classified per file, with no runtime migration left.
- [x] Unit/integration tests cover direct serialization, non-particle consumers,
      unchanged source state, output fallback and HDR math for the current path.
- [x] Refresh real-browser sRGB/P3/HDR pixel readback for the mapped OKLCH
      formatter; eight current Chrome cases pass (see the numeric-hue continuation below).

Complete these color gates AND the existing Particle lifecycle, consumer,
performance and verification gates before marking E5 accepted. Do not defer
color migration to E6–E10 or mark these boxes based on old test results alone.
The current file-by-file RGB/HSL classification is in
[V5-COLOR-INVENTORY.md](V5-COLOR-INVENTORY.md). The structural source search is
complete for workspace TypeScript, including dynamically loaded pixel filters
and browser-only color examples. The current mapped-output browser pixel
fixture passes after the numeric-hue correction recorded below.

### Historical implementation tasks

The tasks below describe the migration checkpoints. They are completed by the
final acceptance; retain them as implementation history:

1. **C2 / 03+08 — Verify the native manager contract.** `IColorManager` now
   requires direct OKLCH results; legacy sRGB managers use the explicit
   `adaptLegacyColorManager` adapter. Built-ins, exports, migration examples and
   CLI generation use the native contract. Full workspace tests cover managers
   without RGB hooks, P3 aliases/conflicts and rejection of underspecified HDR
   channel metadata. HDR source decoding remains unsupported until transfer,
   scale, reference white and luminance are defined.
2. **C4 / 07+08 — Finish dynamic and browser consumer review.** The per-file
   inventory and structural TypeScript search found no remaining semantic RGB/
   HSL runtime state. Raw sampled pixels convert at emitter/canvas-mask adoption;
   RGBA-unorm8 readback preserves sRGB/P3 primaries but drops HDR headroom.
   The pixel-format, Float16 fallback, alpha-composition and sampled-emitter
   source-primary regressions now pass. Dynamic canvas-mask/emitter callbacks
   receive raw pixel channels plus source-space metadata and return only a
   boolean filter decision; the browser-only config examples likewise inspect
   pixels without returning or storing semantic colors. The source color is
   converted at emitter particle-state adoption. This callback/example review
   is complete; current mapped-output browser pixel verification also passes.
3. **C1/C2 / 03+05 — Verify output mapping.** SDR output serializes CSS
   `oklch(...)` after reducing chroma on a copy for the effective sRGB or P3
   gamut. The HDR route remains isolated from ordinary P3 output. Verify the
   mapped style in both destinations, unchanged canonical state, alpha and HDR
   behavior have unit coverage. Current Chrome pixel verification passes with
   the corrected numeric-hue formatter, including mapped sRGB/P3 alpha and HDR
   float16 output (see the browser output correction below).
4. **C4 acceptance — Record remaining evidence.** Dynamic callback and browser-
   only config review and the current mapped-output browser fixture pass.
   Close the existing Particle lifecycle, consumer and performance gates.
   The canonical manager, sampled-pixel conversion helper and unit-level
   non-particle output paths are covered; E5 stays open until the remaining
   evidence passes.

### Verification update — 2026-11-21

- The complete `@tsparticles/tests:test` target passes: 797 tests across 52
  files. This caught and fixed `rangeColorToOklch()` skipping string-valued
  `IColor.value`, which left paint, effect, roll/orbit and gradient colors
  unresolved. Untagged RGB objects now resolve as sRGB, including nested
  `value.rgb`, and ranged alpha is sampled with the engine RNG.
- `@tsparticles/engine:build` passes, and `@tsparticles/tests:build` passes all
  187 tasks, including downstream compile, lint and formatting targets in its
  dependency graph. The follow-up emitter, cannon and bubble builds pass 24/24
  tasks; the basic/slim/full/all bundle rebuild passes 156/156 tasks.
- Added/updated regressions for nested source metadata and alpha, sRGB/P3
  mapped serialization, alpha-aware link mixing, canvas RGBA-unorm8 readback,
  normalized legacy Float16 pixel fallback, and emitter sampled-pixel conversion
  with both sRGB and P3 primaries. The cannon interactor now resolves its input
  once to canonical OKLCH, and the bubble highlight uses the shared output
  formatter. No HDR source decoding is enabled; ambiguous `hdr`-tagged RGB
  inputs are rejected.
- The refreshed browser fixture could not run in this sandbox: Puppeteer Chrome
  exited during startup, and binding the local fixture server was denied. The
  old browser report predates mapped OKLCH output and is not valid evidence for
  the current formatter. The fixture now includes a Display-P3 highlight that
  is outside sRGB and exercises the mapped style. Re-run
  `evidence/tools/check-e5-color-browser.mjs` in an environment that can launch
  Chrome and bind localhost before closing the browser-output gate.
- E5 remains in progress: browser pixel verification and existing
  performance/bundle-size gates still need evidence. The dynamic callback and
  browser-only example review is complete: callbacks return filter decisions
  only, and sampled colors are converted when adopted into particle state. Nx also
  reported remote-cache `ENOTFOUND`; local task results above completed
  successfully.
- Refreshed bundle measurements after the emitter/cannon/bubble changes. The
  factory consumer is +1,985 gzip / +1,599 Brotli bytes (+8.58% / +7.77%) from
  E4; the minimal scene is +2,189 / +1,847 bytes (+7.49% / +7.06%). The engine
  minified distribution is +14.90% gzip / +13.68% Brotli. Rollup attribution
  shows the new canonical animation and conversion modules (`OklchAnimation`
  and `OklchUtils`) in both factory and minimal consumers. No redundant
  compatibility module was found to remove without changing the E5 contract;
  the 2% budget remains open for further optimization or explicit budget review.
  Refreshed details are in `evidence/e5/bundle-delta-vs-e4.json` and
  `evidence/e5/bundle-sizes.json`.
- The Particle pool audit found that the Infection plugin did not clear its
  stage/delay/timer object when a pooled particle began a new lifetime. Its
  `particleCreated` hook now resets that field; a regression confirms same-object
  reuse starts without prior infection data. A review of Life, Opacity, Rotate,
  and Tilt found their per-particle option loaders recreate defaults during
  initialization, so no extra reset hooks were needed. Infection and the
  affected updater builds pass; the full test suite passes 797/797 across 52
  files.
- Closed the workspace custom-manager migration audit: every concrete
  `IColorManager` implementation resolves the direct OKLCH contract; RGB-only
  custom manager support is isolated to the explicit legacy adapter. The CLI
  manager template and tests also expose the direct-only contract.

## Implementation increment — 2026-11-21

- `IColorManager` now requires direct OKLCH resolution; RGB hooks are no longer
  part of its contract. Existing sRGB managers can be registered through the
  exported `adaptLegacyColorManager` adapter.
- Non-HDR style output now serializes canonical `oklch(...)` directly for either
  effective canvas gamut. The explicit HDR output path remains separate.
- Added tagged RGB object input for `srgb` and `display-p3` primaries, including
  ranged channels and alpha. Output canvas capabilities do not reinterpret the
  source values.
- Emitter sampled-pixel RGB remains a raw source boundary; it now converts to
  OKLCH at the point where that pixel becomes particle fill state.
- Updated the CLI manager template, color migration guide and color format docs.
  Focused regressions were updated/added; they have not been run in this
  increment. Full non-particle inventory and real-browser output verification
  remain open, so E5 is still not accepted.
- SDR `getStyleFromOklch()` now uses its effective output gamut: it reduces
  chroma on a copy while retaining lightness and hue, then serializes that
  mapped value as `oklch(...)`. This prevents the style cache from conflating
  sRGB and Display-P3 output and leaves canonical runtime state unchanged.
  The migration guide now documents this boundary behavior. No regression or
  browser verification was run for this follow-up; the mapping gate remains
  open pending focused output-space assertions.
- A follow-up workspace search for structurally typed RGB and color-bearing
  runtime state found no additional persistent semantic RGB/HSL fields beyond
  those classified in `V5-COLOR-INVENTORY.md`. PJS inputs and sampled pixel
  buffers remain explicit source boundaries. The later dynamic-callback audit
  confirms canvas-mask/emitter filters return booleans only; browser-only config
  examples do not return or retain semantic RGB colors.
- Deprecated the OKLCH plugin's package-local CSS formatter in its API docs;
  it does not know the active canvas gamut. New callers should use the engine's
  output-aware formatter. Existing consumers remain source-compatible.
- Marked the engine's RGB/HSL CSS style helpers as deprecated compatibility
  APIs, directing new engine output through the canonical OKLCH formatter.
  Workspace source search found no runtime consumers of these legacy helpers
  outside their own compatibility implementations.
- Marked the HSV plugin's package-local CSS formatter deprecated as well; it
  delegates to the legacy HSL formatter and has no runtime workspace callers.
- Fixed the canonical RGB manager's ranged-object path to sample an optional
  alpha range after the RGB channels, preserving the shared RNG call order and
  returning alpha for canonical validation.
- Extended the input types and source-space resolver to accept `colorSpace`,
  `p3` and alpha in wrapped `value.rgb` objects. The resolver now applies P3
  primaries before manager fallback and rejects ambiguous/HDR tags in both
  wrapped and direct channel-object forms.
- Canvas pixel extraction now explicitly requests RGBA-unorm8 while retaining
  the `ImageData` color space. If a legacy browser returns Float16 data instead,
  the compatibility boundary clamps and quantizes those samples to 8-bit SDR
  channels rather than passing unit-scale values into RGB-to-OKLCH conversion.
  The public pixel docs now state that this sampling path does not retain HDR
  headroom. Pixel-format and Float16 fallback regressions remain open.

## Implemented in this checkpoint

- Added floating-point sRGB ↔ OKLCH math, a constant-lightness/hue sRGB SDR
  chroma mapper, rectangular OKLab mixing, and independent-alpha output.
- Switched Particle fill/stroke/back colors, modifiers, paint and gradient
  animation state to h/c/l. Hue uses configured-bound wrapping. Legacy
  `animation.s` now throws with a migration hint.
- Migrated output and color state for canvas backgrounds, shadows, absorbers,
  emitters, trails, polygon/background masks, images, ribbons, cards, links,
  bubble/connect/grab/trail interactions, and light interaction.
- Added an OKLCH animation migration page and updated the matrix/fireworks
  presets and color-animation config sample.
- Added OKLCH conversion, alpha, gamut mapping, channel-speed/wrap, and legacy
  animation diagnostic tests. Updated the shadow expectation to canonical state.

## Verification completed

- Targeted `ColorUtils.ts`, `Configs.ts`, `Effects.ts`, and `OptionsLoad.ts`:
  102 tests passed.
- Full `@tsparticles/tests` suite after the light/cards/emitter output edits:
  705 tests across 52 files passed.
- Nx builds passed for the initial 19 changed runtime/consumer projects, then
  for configs plus matrix/fireworks presets, and for light/cards/emitters after
  fixing a duplicate import. The last run reported only existing Nx socket and
  Nx Cloud environment warnings; local tasks succeeded.
- Prettier was run on changed code and migration docs. Package builds run each
  package's lint and TypeScript checks.
- Follow-up builds passed for the engine, all nine color-manager packages and
  16 affected runtime/consumer projects after the direct-manager and effective
  color-space changes. The latest `prettier --check` and `git diff --check` pass.
- Added independent WPT/CSS Color 4 reference checks for the sRGB OKLCH vector
  and Display-P3 gamut mapping, plus Display-P3 input parsing, direct manager
  precision/alpha, hue wrapping, and indexed color-array parsing. The P3 input
  conversion and P3 output mapper now share the 0–255 encoded-channel contract.
- Added neutral black/white/gray references, extended sRGB round-trip coverage,
  and rejection checks for malformed alpha and trailing input. The expanded
  ColorUtils file passes 47/47 tests.
- Aligned canonical OKLCH `l` and its animation channel to the plan's 0–100
  contract. Conversion math normalizes only at its mathematical boundary;
  CSS unitless and percentage inputs now resolve to the same canonical scale,
  and the migration guide/config sample use percent-point values.
- Fixed the OKLCH direct parser's unitless/percentage lightness conversion and
  alpha capture, and routed selected array strings back through canonical
  parsing. After the 0–100 scale change, focused tests pass: ColorUtils 47/47,
  OKLab 10/10, and OKLCH 19/19.
- Full no-cache `@tsparticles/tests` suite after building its preset dependencies:
  712 tests across 52 files passed. Engine, OKLab and OKLCH package builds and
  the tests package lint pass. Nx still emits its existing local
  socket and remote-cache network warnings; these do not fail successful local
  tasks.
- Corrected CSS Lab/LCH to use the D50 reference white and Bradford D50→D65
  adaptation. Added direct floating-point Lab/LCH→OKLCH conversions so manager
  canonical output avoids an sRGB round trip; updated six RGB primary reference
  vectors and added direct Lab/LCH alpha/conversion checks. Lab and LCH package
  builds and all 18 package tests pass.
- Expanded independent Display-P3 input checks to red, green and blue primary
  vectors. Added legacy custom-manager string/object fallback coverage and
  deterministic hue tests for positive/negative multi-turn wrapping and hue
  progression at zero chroma. The full tests package now passes 716 tests over
  52 files; focused Lab/LCH tests pass 9/9 each. Prettier and `git diff --check`
  pass for the changed sources.
- Added the CSS Color 4 extended/out-of-gamut Display-P3 reference
  `color(display-p3 -0.5782 1.067 -0.2363)`, including equivalent percentage
  syntax. This exposed that negative encoded sRGB channels were incorrectly
  treated as linear by the extended transfer function. Updated both OKLCH
  conversion and HDR output transfer helpers to apply the CSS sign-reflected
  curve; expanded the sRGB extended round trip to include a negative channel
  beyond the linear toe. The W3C vector, percentage equivalence and all 52
  `ColorUtils` tests pass; the full test suite passes 717 tests across 52 files.
- Rebuilt the non-CLI/non-website/non-palette downstream graph after the
  signed-transfer update: 451 tasks ran, 21 were cache hits, and only Electron
  and Angular demos failed. Electron completed Webpack then packaging failed
  with `fetch failed`; Angular's `ng build` exited with `Abort trap: 6`. The
  tests build, all package builds and their local lint/TypeScript checks passed.
- Rebuilt all non-CLI/non-website/non-palette projects per the engine impact
  instructions: 451 tasks succeeded, 22 came from cache, and 2 demo builds
  failed. Electron completed its webpack bundle but the packaging step ended
  with `fetch failed`; Angular's `ng build` exited with `Abort trap: 6`.
- The website build was started through Nx, but it expanded into the full
  dependency graph and was cancelled before the VitePress target ran. The new
  migration page and planning notes pass Prettier checks.
- Expanded deterministic animation coverage for one-time delay, per-tick decay,
  configured hue loop count, supplied RNG sampling, and static-alpha composition
  with particle opacity. The delay contract is now documented and asserted in
  milliseconds. Fixed hue wrap termination at the configured loop count while
  preserving the non-wrapping channel limit behavior. `ColorUtils.ts` passes
  56/56 tests; Lab and LCH each pass 9/9, and the complete tests package passes
  (721 tests across 52 files).
- Rebuilt the non-CLI/non-website/non-palette graph after the animation change:
  235 projects and 218 dependency tasks were included. All package builds and
  the tests build passed; Electron failed during packaging with `fetch failed`,
  Angular `ng build` exited with `Abort trap: 6`, and Nx Cloud artifact storage
  was unavailable (`ENOTFOUND`).
- Added C3 integration regressions for stroke inheriting the fill color and for
  paint animation state being reinitialized when a removed particle is reused
  from the pool. The reuse check also verifies the new id/group and cleared
  destroyed flag. The first draft expected disabled paint to erase its static
  color object; the option model intentionally retains that resolved color, so
  the regression now checks that mutable animation state is replaced and
  restored from the configured color. Full tests pass: 723 tests across 52
  files.
- Added a deterministic full-period limit test for an oscillating chroma
  channel, complementing the hue wrap count test. The complete tests package
  passes 724 tests across 52 files.
- Added Display-P3 output-boundary fixtures from the CSS Color 4 primary
  OKLCH references, with a 0.5 encoded-channel tolerance and a 0.0002 chroma
  tolerance for rounded coordinates. Extended the out-of-P3 CSS Color 4 sample
  through P3 gamut mapping and asserted constant lightness/hue plus finite,
  in-range output. `ColorUtils.ts` passes 58/58 tests and the full tests package
  passes 727 tests across 52 files.
- Tightened the OKLCH manager parser: it now requires a complete function,
  accepts case-insensitive CSS function names, validates finite lightness,
  chroma, hue and alpha bounds, and preserves alpha in its RGB compatibility
  parser. This fixes the legacy parser's incorrect alpha capture index. The
  plugin tests pass 21/21, its build passes lint/type/bundle, and the full tests
  package passes 727/727. The standalone plugin bundle grew 5 bytes; the
  generated package size grew 239 bytes.
- Applied matching complete-input, finite-channel, lightness and alpha checks
  to CSS Lab/LCH managers. Lab now accepts signed a/b axes, and LCH accepts a
  signed hue; both parsers accept case-insensitive function names and preserve
  alpha through their direct OKLCH and RGB parsing paths. Lab and LCH tests pass
  10/10 each, both package builds pass lint/type/bundle, and the full tests
  package passes 727/727.
- Applied complete-input and channel/alpha range checks to RGB, HSL and HSV
  string parsers. Function names are case-insensitive, signed HSL/HSV hues are
  accepted, and tests cover trailing text, invalid channels and alpha, plus
  alpha preservation. The RGB/HSL/HSV package builds pass lint/type/bundle, and
  the full tests package passes 729/729.
- Applied complete-input and finite/range checks to HWB parsing, including
  alpha validation. HWB now converts CSS `deg`, `rad`, `grad` and `turn` hue
  units correctly; integration tests cover each unit, alpha preservation,
  trailing input and out-of-range whiteness/blackness/alpha. Added the HWB
  workspace dependency with pnpm. Its package build passes lint/type/bundle and
  the full tests package passes 729/729.
- Added deterministic range-resolution checks for RGB/HSL/HSV/HWB using the
  engine's replaceable RNG provider, and verified all four sample exactly once
  per ranged channel. Added a custom-manager contract test proving direct OKLCH
  string/object methods take precedence over legacy RGB conversion while the
  prior fallback test remains in place. The full tests package passes 731/731.
- Added deterministic high-chroma boundary sweeps across six hues and three
  lightness levels for both sRGB and Display-P3 output mapping. They assert
  constant lightness/hue, reduced chroma, finite in-range channels, and stable
  neutral colors. `ColorUtils.ts` passes 63/63 tests and the full suite passes
  732/732.
- Continued the supported-syntax audit in the OKLab manager. Its parser now
  anchors the complete function, handles case-insensitive names and signed or
  leading-decimal numeric channels, and rejects invalid alpha in both RGBA and
  direct OKLCH parsing. It also rejects out-of-range alpha on programmatic
  OKLab inputs. The package tests and its 21-task package build pass, including
  lint, type checking, and bundling. The remaining manager audit is still open.
- Extended CSS hue-unit parsing to HSL, LCH, and OKLCH for unitless degrees,
  `deg`, `°`, `rad`, `grad`, and `turn`. HSL also accepts fractional saturation
  and lightness plus modern slash alpha while retaining legacy comma alpha.
  Its previous whitespace-separated alpha form remains accepted as well.
  These parsers explicitly reject the CSS missing-component keyword `none`;
  the remaining manager and syntax audit is still open. HSV now has explicit
  legacy integer syntax, default/percentage alpha, and malformed/range rejection
  coverage in both RGB and direct OKLCH parsing. Named colors now include CSS
  `transparent` with zero alpha and test case-insensitive keywords, unknown
  names, and trailing input. HSV and named-color package suites pass 10/10 each.
  Hex parsing now covers shorthand and alpha forms plus invalid lengths,
  digits, and trailing text; the hex suite passes 10/10. Lab/LCH and OKLab/
  OKLCH now accept CSS percentage scales for axes/chroma, and Lab/LCH accept
  unitless lightness. Their targeted parser tests cover equivalent numeric and
  percentage inputs. The four manager suites pass 59 tests total, and their
  package builds pass lint, type checking, and bundling.
  HSL, LCH, and OKLCH package tests pass, all three package builds pass
  lint/type/bundle, and the full tests package passes 733/733.
- Added an independent CSS Color 4 §14.2 high-chroma Display-P3 mapping example
  at `oklch(76% 0.27 60)`, with a tolerance matching the spec's illustrative
  output. The regression verifies constant lightness/hue and in-boundary
  channels after chroma reduction.
- Extended RGB parsing to accept CSS percentage channels (including decimals)
  and modern slash alpha while retaining comma and the previously accepted
  whitespace alpha forms. Invalid percentages and trailing text are rejected.
  RGB package tests/build pass; the full tests package passes 733/733 after
  rebuilding the changed color-manager packages.
- Added group paint precedence coverage: group color overrides the container
  paint color while the base particle retains the container value; a new
  regression verifies an explicit per-particle paint override while retaining
  the requested group identity. `addParticle` accepts one options object and
  does not merge group options automatically.
  The stale async image completion fix remains covered: colorized SVG loading
  checks that the
  particle is alive and retains the captured id and shape data before assigning
  the result. A deferred-load regression reuses the particle before resolving
  the SVG; the image is not attached to the new particle state. The image shape
  package build passes, and the full tests package passes 726 tests across 52
  files.

## C2 parser subset and rejection rules

These parsers accept the listed subset; they are not general CSS tokenizers.
Inputs must be complete, finite values. `calc()`, exponent notation, and the
missing-component keyword `none` are unsupported. Values outside the manager's
documented channel ranges are rejected, and alpha must be in [0, 1].

| Manager | Accepted syntax                                                                                                                                             |
| ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| RGB     | Integer/decimal channels in 0–255 or 0–100%; comma/space channel separators; numeric or percentage alpha.                                                   |
| HSL     | Unitless degree, `deg`, `°`, `rad`, `grad`, or `turn` hue; percentage S/L; slash, comma, or legacy whitespace alpha.                                        |
| HSV     | Legacy `hsv()`/`hsva()` syntax with integer degree-sign hue and integer percentage S/V; comma or space separators and optional numeric or percentage alpha. |
| HWB     | Unitless degree or CSS hue units; percentage W/B; optional numeric or percentage alpha.                                                                     |
| Lab     | Unitless or percentage L; signed numeric or percentage a/b axes; slash alpha. Axis percentages use the CSS ±125 reference scale.                            |
| LCH     | Unitless or percentage L; numeric or percentage C; CSS hue units; slash alpha. C percentages use a 150 reference value.                                     |
| OKLab   | Unitless L in 0–1 or percentage L in 0–100%; signed numeric or percentage a/b axes; slash alpha. Axis percentages use a 0.4 reference value.                |
| OKLCH   | Unitless L in 0–1 or percentage L in 0–100%; numeric or percentage C; CSS hue units; slash alpha. C percentages use a 0.4 reference value.                  |
| Hex     | `#rgb`, `#rgba`, `#rrggbb`, or `#rrggbbaa`.                                                                                                                 |
| Named   | Case-insensitive CSS color keywords and `transparent`; context-dependent `currentColor` is unsupported.                                                     |

CSS Color 4 `lab()`/`lch()` permit unitless lightness and percentage axes or
chroma. Those input scales are now converted to the canonical numeric values
before the existing range checks and color conversion.

## Historical open work before E5 acceptance

### Latest continuation

- Made the RGB object source-space shorthand explicit: `p3: true/false` now
  selects Display-P3/sRGB input primaries and must agree with `colorSpace` when
  both are present. Objects carrying a generic `hdr` field are rejected before
  manager fallback, so legacy RGB parsers cannot silently reinterpret HDR-tagged
  channels as SDR sRGB. Updated the color guide and C0 decision log; focused
  conversion regressions and engine/downstream builds pass. HDR source decoding
  remains unsupported until a transfer/scale/reference-white descriptor is
  defined.
- Added `colorMixOklch()` as the canonical public wrapper over the existing
  rectangular-OKLab mixer. The RGB-returning `colorMix()` remains available as
  a deprecated compatibility helper; no runtime workspace call sites use it.
  The migration guide now includes native-manager and explicit legacy-adapter
  examples; the color-format guides no longer describe the deprecated RGB
  helper as the canonical perceptual mixer. Canonical mixer tests and public API
  documentation are still open.
- Updated the shared rectangular-OKLab mixer to weight color coordinates by
  input alpha while interpolating output alpha separately. Zero total weights
  split evenly; if both alphas are zero, finite deterministic coordinates remain
  available under zero output alpha. Focused tests cover transparent endpoints,
  unequal alpha and zero weights.
- Preserved the effective `ImageData` color space in canvas pixel buffers and
  passed it through canvas-mask and emitter filter callbacks. Canvas-mask pixel
  colors now enter particle options with their source primaries; emitter samples
  convert through the matching sRGB or Display-P3 path at spawn-state adoption.
  Canvas-mask color/opacity overrides no longer apply pixel alpha twice when
  both are enabled. Pixel-readback, P3 emitter, and alpha-composition
  regressions pass. The end-to-end mapped-output browser fixture remains open.

- Full `@tsparticles/tests` suite passes 752/752 across 52 files after rebuilding
  the engine, destroy updater and Fireworks dependency graph.
- Updated Destroy split offsets to the canonical OKLCH `h/c/l` ranges. Offset
  lightness now uses the 0–100 scale, chroma is no longer truncated at 0.4,
  and hue offsets wrap across negative and multi-turn values. The new integration
  regression verifies a parent chroma above 0.4, a lightness offset, and hue wrap.
- Renamed Fireworks' split offset option from HSL `saturation` to OKLCH `chroma`,
  with a default range of −0.03 to 0.03. Updated the config, README, migration
  guide and breaking changelogs; the FireworkOptions regression passes 1/1.
- `git diff --check` passes. The isolated Fireworks Vitest run used an explicit
  config because the workspace tests config only includes `utils/tests/src`.
  pnpm reports the existing node_modules store mismatch while dispatching the
  run; Vitest itself executes and passes.
- Extended the live-particle ownership regression to compare nested `paint`,
  `fill`, and `stroke` instances and mutate fill opacity/stroke width on one
  particle. It also confirms per-particle `shapeData` isolation, including its
  nested shape-specific particle options, and verifies those options override
  base particle values. The sibling retains its original values. The complete
  suite passes 752/752 across 52 files; `OptionsLoad.ts` passes 42/42.
- Added optional `particleDestroy` cleanup to effect drawers and invoke it after
  the shape drawer cleanup. Errors from either callback are captured while all
  later particle-destroyed hooks still run. Trail releases its retained history
  and per-particle settings when the particle enters the pool. Regressions cover
  Trail cleanup and effect-hook execution even when shape cleanup throws; the
  full suite passes 753/753 across 52 files. Engine and Trail's 21-task build
  passes.
- Consolidated the sRGB and Display-P3 chroma searches behind one gamut mapper.
  The shared loop reuses a single probe color instead of allocating a new color
  object for each of its 24 iterations; existing independent cusp vectors still
  pass, and a new test checks input immutability and bounded output for both
  gamuts. The complete suite passes 776/776 across 52 files, the engine build
  passes (20 tasks, 19 cached), and the focused ColorUtils suite passes 72/72.
  Refreshed E5 bundle evidence after the change: the E4→E5 factory and minimal
  consumers remain +7.82%/+6.87% gzip and +7.04%/+6.40% Brotli, respectively,
  above the 2% target. The extracted mapper reduces raw consumer output by 207
  bytes against the prior E5 measurement, while compressed sizes are effectively
  unchanged (+10 gzip, +39 Brotli); this does not close the size gate.
- Closed another options-ownership alias: `Options.preset` now copies incoming
  `SingleOrMultiple<string>` arrays instead of retaining the caller's array.
  `OptionsLoad.ts` verifies independence in both mutation directions. The
  focused file passes 44/44, the complete suite passes 777/777 across 52 files,
  the engine build passes (20 tasks, 19 cached), and tests lint, Prettier, and
  `git diff --check` pass. Root option-array ownership is covered; audit other
  nested mutable families as part of the remaining Particle acceptance work.
- Rebuilt the non-CLI/non-website/non-palette graph after the engine changes:
  453 tasks ran, 450 succeeded and 22 were cache hits. The three failures are
  environment-bound demos: Electron Webpack completed but pnpm packaging could
  not write its DLX cache, Next.js could not fetch Inter from Google Fonts, and
  Angular exited with `Abort trap: 6`. Refreshed the bundle evidence afterward;
  the minimal/factory consumers remain above the 2% growth target.
- Tightened the optional custom-manager contract: direct OKLCH values with
  lightness outside 0–100 are rejected alongside non-finite channels, negative
  chroma, and invalid alpha; hue is normalized before acceptance. New string
  and object regressions exercise both the upper and lower lightness bounds and
  verify RGB fallback. `ColorUtils.ts` passes 73/73, the full suite passes
  778/778, and the engine build passes all 20 tasks. Rebuilt basic, slim, full,
  and all bundles (156 tasks, 20 cache hits) and refreshed size evidence. The
  factory/minimal consumers remain +7.87%/+6.89% gzip and +7.08%/+6.59% Brotli,
  so the 2% size gate remains open.
- Fixed a nested ownership alias in `OptionsColor`: loaded color values are now
  deep-copied, including arrays containing explicit OKLCH objects. A regression
  mutates the caller value and loaded value in both directions. `OptionsLoad.ts`
  passes 45/45; the full suite passes 779/779 across 52 files. The engine build
  passes, tests lint and targeted engine ESLint pass, and basic/slim/full/all
  rebuilds succeed (156 tasks, 20 cache hits). Bundle evidence is refreshed.
- Unified the OKLCH manager's canonical and legacy string parsers behind one
  parser/validator, so RGBA conversion and direct OKLCH resolution cannot drift
  on percentages, hue units, alpha or rejection rules. The plugin suite passes
  24/24 and its build passes (21 tasks, 20 cached). Added a real-container
  `OptionsColor` ownership regression; `OptionsLoad.ts` passes 46/46 and the
  full suite passes 780/780. The four main bundles build (156 tasks, 155 cached).
  The all-bundle minified output is down 271 raw, 6 gzip and 109 Brotli bytes
  from the previous E5 measurement; factory/minimal payloads are unchanged.
- Fixed `addParticle()` when a `particleAdded` listener throws: the particle has
  already been inserted at that point, so the manager now logs the listener
  error and returns the live particle instead of reporting `undefined` for a
  successful insertion. The regression verifies event delivery, collection
  count, return identity, and pool reuse. The focused event suite passes 8/8,
  the full suite passes 781/781 across 52 files, and the engine build passes all
  20 tasks.
- Rebuilt basic, slim, full, and all after the manager change (156/156 tasks;
  20 cache hits) and refreshed E5 payloads and the E4 comparison. The measured
  factory/minimal consumers are now +7.90%/+6.92% gzip and +7.15%/+6.31%
  Brotli; minified engine/all distributions are +12.70%/+11.65% and
  +5.22%/+4.32%. The 2% size gate remains open.
- Hardened asynchronous image-shape loading for custom loaders: a rejected load
  is now reported through the owning engine logger rather than becoming an
  unhandled rejection, and both success/error continuations check container,
  particle ID, and shape-data identity before acting. Regressions cover active
  rejection, rejection after pool reuse, and late successful completion after
  replacement. The image package build passes (21 tasks, 20 cached),
  `ShapeGeometry.ts` passes 48/48, and the full suite passes 784/784 across 52
  files.
- Rebuilt basic, slim, full, and all after the image-loader change (156/156
  tasks; 153 cache hits) and regenerated E5 payloads and E4 deltas. Factory and
  minimal consumers and the engine distribution are unchanged; the minified
  full/all bundles now measure +7.33%/+5.25% gzip and +6.43%/+4.47% Brotli
  versus E4. The all bundle increased 209 raw, 36 gzip, and 144 Brotli bytes
  from the previous E5 measurement. The size gate remains open.
- Closed the standalone-schema decision after a workspace search found no
  consumer for `engine/schema/options.schema.json`. MCP Zod schemas validate
  tool arguments and leave plugin-extensible particle options open; they are
  not a complete options schema. Removed the two engine scripts that referenced
  the absent file and recorded the decision in ARCH-03. Do not generate a
  replacement without a concrete consumer and plugin-coverage contract.
- The repository-wide non-CLI/non-website/non-palette build did not complete in
  this environment. It reached demo tasks, including the known Angular
  `Abort trap: 6`, then stopped producing output; I interrupted it after it
  remained stalled. The focused engine/Trail dependency build passed.
- The custom color-manager project generator now scaffolds the three required
  canonical OKLCH methods only. Its template regression covers the direct
  contract, and the CLI create-utils build passes. A source audit confirms there
  are no migrated runtime calls to legacy RGB/HSL style helpers and no remaining
  `particle.color` property references; standalone conversion utilities and the
  HSL color-input plugin remain intentionally available.
- Fixed the HDR context fallback: when P3 `float16` creation fails, CanvasManager
  now retries Display-P3 SDR before falling back to sRGB. The regression simulates
  a rejected float16 request and confirms the effective context stays Display-P3
  with HDR disabled. The focused lifecycle file passes 11/11; the full tests
  package passes 755/755 across 52 files. The engine build passes.
- Added a media-query change regression for an already-created sRGB context.
  When the surface returns that same context after a later P3 HDR request,
  CanvasManager reports the effective sRGB space and keeps HDR disabled. The
  expanded lifecycle file passes 12/12.
- Extended particle pool cleanup to release copied card/path data, text layout,
  and per-particle image references from their shape drawers. Focused
  `ShapeGeometry.ts` passes 42/42, the four shape package builds pass, and the
  full suite passes 759/759 across 52 files.
- Closed another pool cleanup path: a fully initialized particle rejected by a
  custom `addParticle` initializer now runs `Particle.destroy()` before being
  returned to the pool, so shape/effect/plugin cleanup hooks run consistently.
  `Particles.ts` verifies the rejected object is marked destroyed before reuse.
  The engine build passes (20 tasks), the focused Particles suite passes 23/23,
  the full suite passes 759/759 across 52 files, tests lint passes, and Prettier
  plus `git diff --check` pass. The engine project has no Nx lint target.
- Improved the HDR luminance regression: it now decodes extended Display-P3
  transfer values, applies the Display-P3 linear-light Y coefficients, and
  expresses the result against the 203-nit reference white. The natural-mode
  color fixture measures 41.83 nits at a 400-nit setting and 82.38 nits at
  1000 nits, with a monotonicity assertion. `ColorUtils.ts` passes 67/67; this
  checks generated-color luminance, while display/device peak calibration and
  end-to-end tone-mapping conformance remain open.
- Validated direct OKLCH results from optional custom color-manager methods
  before accepting them: non-finite channels, negative chroma and alpha outside
  0–1 are rejected, and finite hue is wrapped into 0–360. Invalid direct
  results continue through the legacy RGB fallback. Regressions cover wrapped
  multi-turn hue and malformed string/object results. Engine build passes
  (20 tasks), `ColorUtils.ts` passes 68/68, and full-suite verification is next.
- Completed CSS hue-angle parsing in the engine's built-in OKLCH fallback, so
  `deg`, degree symbol, `grad`, `rad` and `turn` inputs work even without the
  OKLCH color plugin. A no-plugin regression covers equivalent 180° values.
  Engine build passes (20 tasks), `ColorUtils.ts` passes 69/69, and the full
  suite passes 761/761 across 52 files. Tests lint, ESLint, Prettier, and
  `git diff --check` pass.
- Completed initializer-exception rollback for pooled particles: if a custom
  initializer throws after Particle initialization, the manager invokes normal
  destroy hooks and returns the object to the pool, then preserves the
  initializer error. If cleanup also throws, it is logged without replacing
  the original failure. `Particles.ts` verifies destruction and object reuse.
  Engine build passes (20 tasks), focused tests pass 24/24, and the full suite
  passes 762/762 across 52 files; tests lint, ESLint, Prettier and diff checks
  pass.
- Extended rollback to partial `Particle.init()` failures. The manager now
  destroys and pools the object if an updater/drawer throws during init, even
  if it marked the particle unbreakable; the destroy callback and reuse are
  covered. Cleanup-hook errors are logged without replacing the original init
  exception. Engine build passes (20 tasks), Particles tests pass 25/25, and
  the full suite passes 763/763 across 52 files; lint and format checks pass.
- `ParticlesManager.clear()` now destroys and pools active particles, clears
  the spatial grid, and continues through all particles if one cleanup hook
  throws (logging the first error after the pass). It still omits
  `particleRemoved`; `particleDestroyed` fires. `destroy()` uses the same
  cleanup before dropping the pool. Regressions cover destroy events, grid
  clearing, reuse, and continuing after a hook error. Engine build passes
  (20 tasks), focused tests pass 32/32, and the full suite passes 764/764 across
  52 files; lint, ESLint, Prettier, and diff checks pass.
- Extended the shape cleanup regression audit to Ribbon, Emoji, and GIF drawers:
  tests verify ribbon geometry/timing deletion, emoji key clearing, and release
  of GIF frame/canvas/compositing references. `ShapeGeometry.ts` passes 45/45;
  the full suite passes 767/767 across 52 files, tests lint and ESLint pass,
  and Prettier plus `git diff --check` pass.
- Updated both the website page and repository-source paint guide for canonical
  OKLCH `h`/`c`/`l` animation, units, and the rejected legacy HSL `s` channel.
  Expanded the MCP resource with per-channel limits and shared animation
  properties, and added a resource regression. Extended `OptionsLoad.ts` to
  verify independent channel bounds/speeds and the default sync behavior. The
  custom color-manager scaffold exposes the three required direct OKLCH methods
  and has a focused template regression. The `@tsparticles/tests`
  suite passes 767/767; the focused MCP options-guide test passes 1/1. The full
  MCP suite has four existing HTTP-server cases blocked by sandbox `listen
EPERM`; its other 266 tests pass. All ten published paint-option locales now
  state the OKLCH units and HSL `s` migration behavior. The migration guide is
  currently English-only. The architecture note previously referenced
  `engine/schema/options.schema.json`, but that file is absent; MCP Zod schemas
  describe MCP tool inputs, not particle options. The standalone-schema
  disposition is now recorded in ARCH-03. MCP build passes;
  package-wide lint still reports unrelated baseline errors (271 errors and 115
  warnings). Targeted ESLint, Prettier, and `git diff --check` pass for the
  changed files.
- Added a Particle initialization regression for caller position ownership and
  independent `position`/`initialPosition` and `velocity`/`initialVelocity`
  snapshots, including a per-add movement override. Added a custom updater
  regression that clears extension-owned state in `particleDestroyed` and
  proves the same pooled Particle can be reused without stale extension data.
  Arbitrary extension reset still depends on extension destroy hooks. The full
  `@tsparticles/tests` suite passes 769/769 across 52 files.
- Corrected HDR output-space conversion: `getStyleFromRgb` now converts its
  sRGB input to encoded Display-P3 coordinates, and `getStyleFromOklch` formats
  HDR colors from direct floating-point OKLCH→P3 conversion. The high-chroma
  float16 browser case now reads `[1.0615234, 0.4953613, -0.3112793]` against
  the independent unquantized P3 vector `[1.0623358, 0.4954130, -0.3113957]`
  (max channel error 0.000813; tolerance 0.001). The sRGB and P3 SDR fixtures
  remain passing. `ColorUtils.ts` passes 71/71, the full suite passes 771/771,
  and the engine build passes all 20 tasks. Browser HDR luminance checks are
  recorded below; physical-display calibration remains open.
- HDR tone mapping now decodes Display-P3 channels to linear light, computes
  luminance with Display-P3 coefficients, applies mode adjustments and
  headroom limits in linear space, then re-encodes for CSS. Tests verify the
  per-channel headroom in linear coordinates and compare 400/1000-nit output
  luminance for a bright color. Focused ColorUtils tests pass 71/71 and the
  full suite passes 771/771; engine ESLint, Prettier and `git diff --check`
  pass. Chrome 157 float16 canvas readback passes for both 400 and 1000 nits,
  measuring 155.8023 and 183.8342 nits respectively; max channel error is
  0.000985 against the generated CSS values. Evidence is in
  `evidence/e5/browser-color-results.json`.
- Particle option ownership audit found `shape.type` and `effect.type`
  arrays were assigned by reference from caller options into the container and
  then into each per-particle options object. The Shape and Effect loaders now
  copy those arrays on load. A regression mutates one particle's arrays and
  confirms the sibling, container and caller input stay unchanged. Focused
  OptionsLoad tests pass, the engine build passes all 20 tasks, and the full
  test suite passes 772/772. Other mutable option families and plugin-owned
  references remain under review.
- Particle pool review found the Filter effect retained its eleven CSS filter
  fields when a particle was removed and reused without an effect. FilterDrawer
  now clears those fields in `particleDestroy`; an integration regression
  confirms a Filter-to-no-effect pool transition releases every field. The
  effect-filter build passes all 21 tasks, focused Effects tests pass 23/23,
  and the full suite passes 773/773. Tilt and Life were checked as suspected
  cases but already overwrite their state from default option classes on every
  initialization, so they required no change.
- Continued the effect drawer pool-state audit. ParticlesDrawer retained its
  spawn data, deadline, rate and quantity after removal; ShadowDrawer retained
  its resolved color, blur and offset. Both drawers now delete their extension
  fields in `particleDestroy`, with integration regressions proving the pooled
  object is reused without stale effect state. The focused Effects suite passes
  25/25, the full suite passes 775/775 across 52 files, and builds for both
  effect packages pass lint, type checking and bundling. Bubble has no
  particle-specific state; Filter and Trail already release theirs. The wider
  plugin-owned state audit remains open.
- Captured matched E5 M6/M8 runtime evidence after rebuilding `@tsparticles/all`
  from the working tree (155 Nx tasks passed). Headless Chrome 157.0.8103.79
  completed 18 samples at 100/500/1,000 particles with deterministic RNG,
  zero page errors, all containers removed and no long frames. Across 30
  retention cycles, forced-GC heap drift was 88,852 bytes (1 MiB limit), DOM
  stayed at 9 nodes and media listener counts returned to zero. M6 frame p95
  medians were 0.5/2.0/3.7 ms; M8 was 0.4/1.6/3.2 ms. M6/500 remains above
  its 1.87 ms ceiling at 2.0 ms, matching the pre-existing E4 exception; all
  other sampled frame p95 values meet their E0 ceilings. Init medians were
  5.6/13.8/22.6 ms (M6) and 5.1/12.4/21.9 ms (M8); E0 has no init-time budget.
  Raw runs and E4 comparison are in
  [runtime-extended.json](evidence/e5/runtime-extended.json) and
  [runtime-extended-summary.json](evidence/e5/runtime-extended-summary.json).
- Measured factory bundle payloads against E4 with the same Rollup/minifier and
  gzip/Brotli settings. The pure helper is unchanged. At that measurement, the minimal consumer grew
  2,013 gzip / 1,722 Brotli bytes (+6.89% / +6.59%); the factory consumer grew
  1,822 / 1,456 bytes (+7.87% / +7.08%). The minified engine grew 3,376 gzip /
  2,611 Brotli bytes (+12.67% / +11.54%), and the minified all bundle grew
  6,162 / 4,216 bytes (+5.21% / +4.38%). These exceed the 2% growth target for
  other measured payloads. The bundle-size gate stays open for attribution and
  optimization; no budget revision is assumed. Full deltas are in
  [bundle-delta-vs-e4.json](evidence/e5/bundle-delta-vs-e4.json), with current
  payloads in [bundle-sizes.json](evidence/e5/bundle-sizes.json).
- Rebuilt the non-CLI/non-website/non-palette downstream graph after the
  Particle option ownership fix: 453 tasks were included, 450 succeeded and
  20 were cache hits. Electron compiled its Webpack bundle, then failed because
  pnpm could not create a dlx cache directory; Angular `ng build` exited with
  `Abort trap: 6`; Next.js could not fetch its Google Font. The remaining
  package builds passed.

1. **C1 evidence:** the CSS Color 4 extended P3 example and three primaries now
   have input fixtures, with P3 output-boundary checks for the primary OKLCH
   references. The out-of-P3 sample also verifies finite gamut-mapped output.
   High-chroma sweeps now cover six hues and three lightness levels for both
   target gamuts. The CSS Color 4 high-chroma P3 mapping example now supplements
   the WPT fixture. `ColorUtils.ts` now checks four cusp references per gamut,
   with maxima computed independently using Color.js 0.7.1 across lightness
   for four hues. Continue defining invalid-input rules across supported
   syntax, including colors outside both target gamuts.
2. **C2 manager contract:** the current `IColorManager` requires canonical
   OKLCH results; old RGB/RGBA managers are supported only through the explicit
   `adaptLegacyColorManager` adapter. Built-in managers retain RGB methods as
   compatibility APIs while resolving their native values directly to OKLCH.
   Continuous conversions keep floating-point RGB intermediates; OKLab maps
   directly to rectangular coordinates. An older implementation note below
   records the transitional implicit RGB fallback; that behavior has since been
   removed. The OKLCH, Lab and LCH
   string parsers reject trailing input and invalid alpha, handle
   case-insensitive function names, and preserve alpha through legacy RGB
   parsing. RGB/HSL/HSV/HWB now have complete-input and channel/alpha parsing
   coverage; RGB accepts percentages and slash alpha, and HSL accepts CSS hue
   angles/fractional channels. Deterministic RNG/preference behavior is now
   covered for RGB/HSL/HSV/HWB and custom direct-vs-legacy managers. OKLab
   complete-input, numeric, case, and alpha parsing is now covered. CSS hue
   angles are supported in HSL, HWB, LCH, and OKLCH; `none` remains rejected
   because the runtime model has no missing-component representation. HSV
   legacy parsing and named-color keyword/transparent behavior now have focused
   tests. Lab/LCH and OKLab/OKLCH percentage scales and unitless lightness are
   covered; `calc()` and exponent notation are explicitly rejected by
   regression tests across RGB, HSL, HSV, HWB, Lab, LCH, OKLab, and OKLCH
   managers. The accepted subset and rejection policy are listed above. Check
   any remaining gaps against the migration's supported consumer inputs. After
   adding the explicit rejection cases, all eight focused manager suites pass
   (105 tests total).
3. **C2 output:** the container now tracks effective sRGB/Display-P3 separately
   from HDR, requests P3 for capable contexts, and uses float16 HDR only when
   supported. OKLCH SDR output maps to the selected destination gamut, and the
   main renderer, backgrounds, gradients and migrated effect/shape consumers
   pass the destination through. When the requested P3 float16 context fails,
   CanvasManager now retries P3 SDR before sRGB; mocked context regressions
   verify this fallback and the effective sRGB space when an existing context
   ignores a later P3 request. Remaining context attribute edge cases stay
   open. HDR tone mapping now computes luminance and applies mode/headroom
   adjustments in linear Display-P3, with unit and float16 canvas readback
   coverage at two peak settings; physical display/device calibration remains
   open. The
   engine-backed fixture
   `evidence/e5/browser-color.html` now runs through
   `evidence/tools/check-e5-color-browser.mjs` in headless Chrome 157. Its
   sRGB context/readback returns `[59, 81, 211]` for the CSS Color 4/WPT blue
   vector (maximum error 0.30, tolerance 2); its Display-P3 context/readback
   returns `[250, 144, 0]` for the CSS Color 4 §14.2 example (maximum error 5,
   tolerance 9). Both actual and readback color spaces match their requested
   spaces. A third case sends the engine's HDR style through Display-P3
   `float16` and reads back `[1.06152, 0.49536, -0.31128]`; maximum error is
   0.000813 against tolerance 0.001, confirming extended coordinates survive
   the browser canvas boundary. Natural tone-mapped HDR colors also read back
   at 155.8023 nits and 183.8342 nits for 400- and 1000-nit peaks. Full results are in
   `evidence/e5/browser-color-results.json`. Reproduce by starting
   `python3 -m http.server 8765 --bind 127.0.0.1` from the workspace root and
   running `pnpm exec node .planning/handovers/evidence/tools/check-e5-color-browser.mjs`.
4. **C3 validation:** deterministic tests now cover hue wrapping with positive
   and negative multi-turn speed, hue progression at zero chroma, one-time delay,
   per-tick decay, configured hue loop count, supplied RNG sampling, static
   alpha composition with particle opacity, full-period chroma limits,
   fill-to-stroke and group/container color inheritance, color-state reset on
   Particle pool reuse, and stale SVG completion after reuse. Particle
   plugin-state coverage now verifies Move `pathGenerator`, `spin`, and
   `spinAcceleration` are cleared when a pooled particle is reinitialized with
   those features disabled. Roll `backColor` is also cleared and covered across
   enabled-to-disabled pool reuse; Gradient animation data and Orbit extension
   fields are reset on pooled reuse without those effects. Destroy bounds,
   explosion state, split count, and cooldown timestamp are also reset and
   verified across reuse.
   Destruction now has regressions for updater-before-event ordering,
   idempotence, and cleanup/pool reuse when shape, container-plugin, updater,
   and event-listener hooks throw. Event dispatch continues through its
   listener snapshot. Particle destroy/removal attempt remaining hooks and
   events before rethrowing the first error. The focused event, particle
   lifecycle, Move timing, updater math and general updater suites pass (50
   tests total). The focused Updaters suite now passes 19/19 with the explicit
   particle paint precedence regression. Tests lint, engine build, Move plugin build and Roll, Gradient,
   Orbit and Destroy updater builds pass.
   Continue broader callback, extension-state, and
   pool lifecycle review in the Particle acceptance work below.
5. **C4 closure:** inventory and resolve every remaining output/input path,
   including manager plugins, custom managers, card/image/SVG surfaces, gradient
   pixels and canvases. `ColorUtils.ts` now has an independent unequal-radius
   `mid` link test for lightness, rectangular OKLab chroma/hue and alpha; it
   also verifies the LinkInstance style cache distinguishes sRGB from P3 output.
   A workspace source audit found the migrated runtime consumers use the
   canonical OKLCH style formatter and pass their container's destination
   color space; no migrated particle/draw consumer call sites use the legacy
   RGB/HSL style helpers. Standalone legacy color-manager utilities remain,
   and the OKLCH plugin retains its CSS `oklch()` formatter as a compatibility
   utility. The vanilla click demo's remaining `particle.color.s` accesses are
   now migrated to `particle.fillColor` h/c/l state. The file passes 71/71.
   The sRGB, Display-P3 SDR, Display-P3 float16 and HDR luminance browser
   readbacks pass in Chrome 157 (see `evidence/e5/browser-color-results.json`).
   The standalone schema decision is recorded in ARCH-03; the custom-manager
   migration audit is complete. Accepted parser syntax and rejection cases are
   covered by the manager suites; the current mapped-output browser fixture
   remains a separate closure gate.
6. **Particle review:** the current field inventory and init/destroy/remove order
   are recorded in V5-07, and repeated-destroy ordering has a focused test.
   `ContainerLifecycle.ts` verifies Retina-scaled particle motion is recomputed
   after a device-pixel-ratio change and refresh (2× to 3×), and checks canvas
   bitmap dimensions and proportional particle position scaling after the
   initial tick clears `ignoresResizeRatio`.
   `OptionsLoad.ts` confirms the caller-owned nested options remain unchanged
   after loading, grouped particle creation, and refresh; it also verifies that
   live particles do not share their nested `move`, `paint`, `fill`, or `stroke`
   option objects, nor `shapeData` and its nested shape-specific particle
   options; changing values on one particle leaves the sibling unchanged.
   Shape-specific move options also override base particle options. New regressions cover grouped
   shape/effect resolution and clearing `randomIndexData` on Particle pool
   reuse; the full 752-test suite passes these regressions. Additional
   shape/effect combinations and ownership in other mutable option families
   and plugin state still need explicit review.
   Complete precedence, Retina/resize, mutable ownership, bounds, reset/pool,
   plugin extension-state isolation, asynchronous completion after reuse, and
   the remaining V5-07 acceptance regressions.
7. **Browser and cost evidence:** sRGB, Display-P3 SDR and Display-P3 float16
   extended-coordinate and tone-mapped HDR luminance readbacks pass in Chrome
   157 with explicit color-space readback. Bundle/runtime comparison against
   E0 and the previous checkpoint, and particle memory, allocation,
   update and draw measurements remain open.
8. Run the final full suite, formatting/lint checks and all downstream builds
   after C1–C4 and Particle review are complete; then update the engine matrix,
   decision log, migration matrix and final color report.

## Current limitations

The canonical Particle model and native manager contract are switched; legacy
custom managers require the explicit sRGB adapter. RGB channel source-space
metadata supports `colorSpace` and the `p3` alias; generic HDR-tagged channel
objects are rejected because HDR source decoding is not implemented. P3/HDR
context selection and destination mapping are implemented for migrated OKLCH
consumers. Earlier browser readback verified the previous style path; the mapped
OKLCH formatter has unit coverage, but its sRGB/P3 pixels and HDR output still
need a refreshed browser run. Physical-display calibration, bundle/runtime
comparison and the remaining E5 gates stay open.

### G3 follow-up — video export settlement

The video export plugin now returns no Blob when `MediaRecorder` is unavailable
or recording fails, rejects non-finite/non-positive durations, and treats the
configured duration as seconds. Recorder stop, recorder error, startup failure,
and plugin destruction all settle the pending export and release the timeout
and stream tracks. `destroy()` cancels concurrent exports. `Exports.ts` covers
these cases, including timing and resource cleanup. The video-export portion of
G3 is addressed; engine-load rollback and fetch cancellation remain open. The
focused export suite passes, and the full suite passes 787/787 tests across 52
files. Tests lint, Prettier, targeted video-plugin ESLint, plugin build, and
`git diff --check` pass.

### G2 follow-up — asynchronous resource teardown

Motion callbacks captured before listener removal now check a lifecycle
generation and container state before applying reduced-motion changes or
refreshing. Added regressions for stale motion callbacks, replacement/removal of
the NoiseField global resize listener, and Poisson initialization completing
after `stop()`. The focused review suite passes 9/9; the full suite passes
789/789 tests across 52 files. Motion, NoiseField and Poisson builds pass (24
Nx tasks, 23 cached); test lint, Prettier, targeted ESLint and `git diff --check`
pass.

### Particle follow-up — option precedence

Expanded `OptionsLoad.ts` to cover group-selected shape/effect types, the
container → group → effect → shape layering of particle options, separate
shape/effect close flags, and explicit shape/effect overrides of container
defaults. The focused file passes 47/47 and the full suite passes 790/790 tests
across 52 files. Test lint, Prettier and `git diff --check` pass. Other
plugin-specific shape/effect combinations and Retina precedence remain open.

### G3 follow-up — container teardown failures

Container stop/destroy now attempt all remaining resource and plugin cleanup
hooks if an earlier cleanup throws, then report the first cleanup error.
Container start and engine load preserve the original startup error if cleanup
also fails; failed load candidates are removed from `engine.items`. Added
`ContainerLifecycle.ts` regressions for multiple throwing cleanup hooks, a
failed plugin start with failing cleanup, and a plugin resolving after container
destruction. The focused lifecycle suite passes 15/15 and the full suite passes
793/793 tests across 52 files. Engine build passes (20 tasks, 19 cached); test
lint, Prettier and `git diff --check` pass. Late plugin instances are disposed
safely after cancellation, even when their cleanup hook throws. Old-scene
retention during replacement and fetch cancellation remain open G3 questions.

### E5 follow-up — direct Display-P3 conversion

`displayP3ToOklch()` now transforms decoded Display-P3 channels into linear-sRGB
coordinates and feeds those directly to the shared OKLCH matrix conversion. It
no longer re-encodes those intermediate channels to sRGB, allocates a temporary
RGB object, and decodes the channels again. Existing Display-P3 primary and
out-of-sRGB reference-vector tests pass. `OptionsLoad.ts` now also checks that
the complete loaded option/shape/effect object graphs for two particles share
no mutable references. `@tsparticles/tests:build` passes with 798/798 tests and
all 186 dependency tasks; test lint, Prettier and `git diff --check` pass. The
M6/M8 runtime evidence shows no regression against E4, zero long frames, and
88,852 bytes of retained-heap drift after 30 churn cycles. M6/500 remains at the
same 2.0 ms p95 as E4, above the original 1.87 ms E0 ceiling; this is recorded
as a baseline deviation rather than an E5 regression. The user has explicitly
waived bundle growth as an E5 blocker; measurements remain in
`evidence/e5/bundle-delta-vs-e4.json`. The mapped-output browser pixel readback
and detailed per-particle heap/allocation plus M3–M5/M7 runtime comparisons
remain unverified.

### E5 closure pass — 2026-11-22

- The full-bundle ownership regression loads all extensions, traverses two
  particles' complete options, shape data, and effect data, and verifies they
  share no mutable object references.
- `@tsparticles/tests:build` passes: 798 tests across 52 files and all 186
  dependency tasks. The engine and direct downstream graph build; test lint,
  formatting, and `git diff --check` pass.
- The existing M6/M8 measurements show no regression from E4, zero long frames,
  and 88,852 bytes of retained-heap drift after 30 churn cycles. M6/500 stays at
  2.0 ms p95 in E4 and E5, against the 1.87 ms E0 ceiling; it is recorded as an
  inherited baseline deviation, not an E5 regression.
- Bundle growth is waived as an E5 blocker per the user's instruction; the
  measured deltas remain recorded.
- A supplementary forced-GC Node profile estimates M3 retained JavaScript
  heap at 11,505–11,973 bytes per particle across 500–2,000 particles, using
  five repetitions and an empty-container baseline. Raw samples and harness
  are in `evidence/e5/node-particle-heap.json` and
  `evidence/tools/measure-e5-node-particle-heap.mjs`. This is not comparable
  with Chrome/CDP heap, excludes allocation volume and native canvas memory,
  and does not replace the M8 or M3–M7 browser cost comparison.
- A Node+jsdom runtime diagnostic now covers M3/M4/M5/M7 at 100, 500, and
  1,000 particles (three repetitions, 30 warm-up and 60 measured ticks, fixed
  seed). RNG call counts match across repetitions. At 1,000 particles, median
  per-tick update/draw p95 values are M3 2.60/8.87 ms, M4 19.17/85.50 ms,
  M5 25.00/31.54 ms, and M7 2.77/9.52 ms. These `@napi-rs/canvas` CPU timings
  are diagnostic only and must not be compared with browser/GPU timing or E0;
  the full sample set is `evidence/e5/node-runtime.json`.
- A separate V8 allocation-sampling pass recorded update and draw profiles for
  the same matrix (512-byte sampling interval, three repetitions). At 1,000
  particles, estimated sampled JS allocation bytes/tick for update/draw are
  M3 1,915/1,908; M4 29,165/29,424; M5 1,721/1,866; and M7 1,957/1,775. These
  are sampling estimates, not exact object/allocation counts; profile samples
  and limits are in `evidence/e5/node-allocations.json`.
- Native Skia canvas readback also exercised the mapped formatter in sRGB and
  Display-P3 with alpha. The high-chroma source rendered as RGBA [255,145,20,51]
  and [250,145,0,51], each within one 8-bit channel value of the mapped
  reference. This confirms native canvas parsing/readback only: Skia required
  the equivalent unitless hue because it rejects the formatter's valid CSS
  degree suffix. The check is automated in
  `utils/tests/src/tests/ColorPixelReadback.ts`. It is not browser pixel
  evidence; see `evidence/e5/node-color-pixels.json`.
- The mapped-OKLCH browser pixel fixture could not run under this environment's
  browser policy. Browser-comparable M3–M5/M7 runtime and allocation profiles
  remain unmeasured. E5 remains in progress until the mapped browser-output gate
  is verified; the previous browser report does not verify the new mapped output
  path. Bundle growth is the only gate waived by the user.

### E5 HDR numeric verification — 2026-11-22

- Added canonical OKLCH HDR regressions for all non-standard tone-map modes:
  output channels stay within the selected peak headroom, source color state is
  unchanged, and color alpha composes with particle opacity.
- Added an absolute-luminance check using linear Display-P3 coordinates for
  canonical OKLCH output: the natural mode measures 140.497 nits at 400-nit
  peak and 175.260 nits at 1,000-nit peak.
- Added CanvasMask consumer regressions for raw P3 metadata reaching the pixel
  filter and pixel alpha being applied once whether opacity override is on or
  off. The inventory now reflects the verified manager and callback coverage.
- Added an emitter canvas-shape regression for P3 pixels: the filter receives
  source-space metadata, spawn data retains it, and the sampled color resolves
  to canonical OKLCH at adoption.
- `NX_DAEMON=false pnpm nx run @tsparticles/tests:test --output-style=static`
  passes 805 tests across 55 files. Nx Cloud was unavailable (`ENOTFOUND`), but
  the local test task succeeded.
- `NX_DAEMON=false pnpm nx run @tsparticles/tests:build --output-style=static`
  also passes across its 186-task dependency graph; the test package reran lint,
  Prettier and all 805 tests. Nx reused 186 cached tasks and executed the test
  build locally. Nx Cloud could not store artifacts (`ENOTFOUND`).
- This closes the unit-level HDR headroom/alpha/luminance math gate. Real-browser
  mapped pixels and browser-comparable runtime/allocation profiling remain open.

### E5 downstream workspace build — 2026-11-22

- `pnpm nx show projects --json | jq -r '.[]' | grep -vE 'cli|website|palette' | xargs pnpm nx run-many -t build --projects`
  completed 453 targets: 450 succeeded and three demo targets failed outside
  the migrated package graph. Electron's build reached webpack but could not
  prepare its `pnpm dlx` cache under the user Library path because sandbox file
  access was denied. Next.js failed to fetch Inter from Google Fonts because
  network access is unavailable. Angular's `ng build` reported `Abort trap: 6`.
  Core engine, color managers, plugins, bundles and other downstream
  packages succeeded. Nx Cloud was unavailable; local task execution completed.
- Re-ran `@tsparticles/angular-demo:build` in isolation. The `angular-fireworks`
  library and its dependency graph build successfully, but `ng build` again
  aborts with signal 6 immediately after starting and emits no Angular or
  TypeScript diagnostic. The local Node 26.13.0 version satisfies the installed
  Angular CLI/build engine constraints, so the demo failure remains an
  unexplained tool-process crash rather than a confirmed E5 source error.

### E5 sequential output immutability — 2026-11-22

- Added a regression that formats the same alpha-bearing canonical OKLCH value
  sequentially for sRGB SDR, Display-P3 SDR, Display-P3 HDR and sRGB SDR again.
  It verifies direct `oklch(...)` SDR output, P3 `color(...)` HDR output,
  composed alpha, identical repeated sRGB output and unchanged canonical state.
- Added an engine-to-Particle integration regression with all built-in color
  managers loaded. Hex, named, RGB, HSL, HSV, HWB, Lab, LCH, OKLab and OKLCH
  inputs now each verify their resolved canonical value survives paint option
  loading and Particle fill-state initialization.
- `NX_DAEMON=false pnpm nx run @tsparticles/tests:test --output-style=static`
  passes 807 tests across 55 files; `@tsparticles/tests:lint:ci` passes.
- These close the unit regressions for sequential multi-destination formatting
  and the input-format-to-Particle boundary; browser mapped-pixel and
  browser-comparable performance gates remain open.

### E5 G3 engine-load recovery — 2026-11-22

- Configuration fetches now receive an `AbortSignal`; a newer load for the
  same id cancels the older request, and stale results are discarded before
  container creation.
- Same-id replacement retains the existing container until candidate canvas
  setup and start succeed. The previous canvas resources are stopped while the
  candidate takes ownership; a failed candidate is cleaned up, then the previous
  container, canvas ownership, observers and animation state are restored.
- Added regressions for superseded fetch cancellation and failed canvas setup
  and plugin-start failure preserving the prior container. Anonymous-host and
  sequential same-id load coverage also passes.
- `engine:build` passes across browser, CJS, ESM and type builds. The complete
  Nx test target passes 810 tests across 55 files with Vitest 5.1.0; test lint
  and Prettier checks pass. Nx Cloud was unavailable (`ENOTFOUND`), but local
  tasks completed.
- G3 engine-load retention and fetch-cancellation items are closed. Real-browser
  mapped pixels and browser-comparable runtime/allocation profiles remain open
  E5 acceptance gates.

### E5 browser output correction — 2026-11-22

- Running the current fixture in real Chrome exposed an invalid output token:
  the formatter emitted a degree sign (`270°`), which CSS rejects. Canvas kept
  its black default fill, so all three SDR pixel cases failed. A unit test had
  removed the sign before sending the style to Skia and concealed this error.
- The engine and deprecated OKLCH plugin formatter now emit a numeric hue,
  accepted by CSS Color 4. Parser compatibility with degree-sign input remains
  unchanged. Skia pixel tests and the native pixel harness now draw the original
  formatter string without rewriting it.
- The refreshed Chrome 157 fixture passes eight cases: sRGB blue, two mapped
  Display-P3 references, extended-P3 float16, sRGB/P3 alpha composition using
  the same canonical source, and canonical OKLCH natural HDR at 400/1,000 nits.
  Every case verifies unchanged source state. `CSS.supports` rejects invalid
  formatter output before drawing; the runner verifies actual context and
  readback primaries, float16 HDR storage, and increasing HDR luminance.
- The report in `evidence/e5/browser-color-results.json` now records the tested
  formatter SHA-256, revision, working-tree flag and browser version. Failed
  pixel reports are also saved before assertions so their diagnostics survive.
- This closes the current mapped-output browser pixel gate. Earlier claims
  that the degree-sign formatter was valid CSS, or that stripping its suffix
  verified the original output, are superseded by this correction. Physical
  HDR display appearance is not inferred from headless float16 readback.
- Browser particle profiling and final build/test verification continue below;
  E5 is not yet accepted.

### E5 current downstream verification — 2026-11-22

- The complete non-CLI/non-website/non-palette workspace selection passes:
  453/453 build targets, with 186 cache hits. Transitive palette/config
  dependencies still belong to that graph. Engine, all color managers,
  extensions, wrappers, bundles and demos build successfully. The earlier
  Electron cache, Next.js font-download and Angular build failures did not
  recur when the build ran outside the sandbox.
- The main suite passes 810 tests across 55 files, including native canvas
  readback without style rewriting. The OKLCH plugin suite passes 25 tests,
  including legacy-helper numeric-hue output. Tests-package build steps include
  lint and Prettier; the OKLCH package lint and build pass as well.
- A wider `pnpm nx run-many -t test --output-style=static` checks 85 projects.
  Two demo targets fail: Ember cannot resolve `@tsparticles/particlesEngine`
  from the application controller; Riot's Node ESM loader cannot resolve its
  extensionless `particlesEngine` import. Their source files were not changed
  by this continuation. Record these demo-import failures separately from the
  passing core/color tests; the complete workspace test run is not green.
- Build/test commands, results and Nx run links are recorded in
  `evidence/e5/verification-2026-11-22.json`; the compact downstream build log is
  `evidence/e5/downstream-build-2026-11-22.txt`.
- Initial overlapping build invocations were stopped after they removed each
  other's generated outputs. They are not used as verification evidence; the
  single subsequent downstream graph above is the authoritative build result.
- No commit or publication performed.

### E5 current Chrome particle profiles — 2026-11-22

- `evidence/tools/profile-e5-browser.mjs` records 45 samples: M3/M4/M5/M7/M8,
  100/500/1,000 particles, three repetitions, fixed RNG, 30 warm-up and 60
  measured ticks, 800×600 at DPR 1. Chrome 157.0.8103.79 reports no page errors;
  RNG call counts match across repetitions and every container is destroyed.
- `evidence/e5/browser-profile.json` includes unsampled update/draw timings,
  forced-GC retained heap relative to an empty container in the same scenario,
  and separate update/full-frame allocation sampling. The report identifies
  the exact bundle SHA-256. Its M8 scene is the background-mask baseline;
  HDR/layers/resize remain the separate extended workload.
- At 1,000 particles, median estimated retained JS bytes per particle are
  M3 6,267; M4 7,228; M5 6,335; M7 6,318; M8 6,251. These estimates include
  renderer/realm cache overhead and exclude native canvas/GPU memory.
- Sampling uses a 512-byte interval and includes objects collected by both
  minor and major GC. At 1,000 particles, estimated update/full-frame bytes
  per tick are M3 727,633/1,777,800; M4 16,521,416/25,098,354;
  M5 20,919,150/22,777,492; M7 724,716/1,974,608; M8 723,846/1,943,570.
  These are sampled JS byte estimates, not exact object counts. A full frame
  includes update; do not describe it as isolated draw allocation. Earlier
  Node sampling used different collection behavior and is not an allocation
  baseline for these numbers. Minified allocation sites need source attribution
  before choosing an optimization.
- Screening the timings against E0 ceilings finds M3/1,000 update at 1.50 vs
  1.43 ms; M4/500 update at 3.60 vs 3.52 ms and draw at 3.50 vs 2.53 ms;
  M4/1,000 draw at 12.30 vs 9.02 ms. See
  `evidence/e5/browser-profile-budget-screen.json`. E0 used Chrome patch .52,
  while these profiles use .79; E4 has no matching M3–M5/M7 matrix. This limits
  attribution and does not explain or waive the exceedances. A matched baseline
  and investigation are still required before performance acceptance.
- Refreshed M6/M8 with the corrected bundle: 18 samples, zero long frames,
  zero remaining containers, stable nine-node DOM and zero live media listeners
  after 30 retention cycles. Post-warm-up forced-GC heap drift is 116,168 bytes
  (<1 MiB). The same-Chrome E4 comparison is in
  `evidence/e5/post-numeric-hue/runtime-extended-summary.json`. M6/500 frame p95
  is 2.10 ms (E4 2.00; E0 ceiling 1.87); the other five frame medians pass their
  E0 ceilings. M8/500 now measures 1.50 ms (E4 1.70).
- Browser pixels, actual browser heap/allocation capture, and downstream builds
  are now verified. E5 remains open for the budget investigations, matched
  particle-cost comparisons and IMP-05 T1–T4 decisions, plus the two recorded
  demo-import test failures. Bundle growth remains the only user-waived gate.

### E5 recovered matched E4 baseline — 2026-11-22

- Recovered a self-contained E4 all-bundle from local Nx cache entry
  `1299484874123005961`. Both normal and minified files match all six raw,
  gzip-9 and Brotli-11 sizes in the recorded E4 bundle report. The original
  report did not contain cryptographic hashes, so this is identification by
  the recorded size fingerprint, not proof against an original SHA-256.
- The recovered minified bytes are preserved as
  `evidence/e5/matched-baseline/e4-all.bundle.min.js.gz`; SHA-256 and the size
  checks are in `matched-baseline/provenance.json`. The working-tree baseline
  is not represented as a clean build of its recorded Git revision.
- Extended `profile-e5-browser.mjs` to accept an explicit bundle (including
  gzip), hash the exact bytes loaded, and capture initial/warm/measured scene
  fingerprints. The snapshots include every particle's position, velocity,
  radius and link count, plus the engine RNG call count.
- Fresh E4 and pre-optimization E5 runs use Chrome 157.0.8103.79 and the same
  45-case matrix. All 135 scene snapshots match exactly. See `e4-profile.json`,
  `e5-before-profile.json`, and `e4-vs-e5-before.json` in `matched-baseline/`.
  The comparison is reproducible with `evidence/tools/compare-e5-profiles.mjs`.
- M3/1,000 update is 1.30 ms in E4 and 1.40 in E5, within the 1.43 ms E0
  ceiling in this run. M4/500 update is 3.60 ms in both; its draw grows from
  2.50 to 3.40 ms. M4/1,000 update is 13.40 vs 13.60; draw grows from 8.60
  to 12.40 ms. The M4 drawing regression is real for these matched scenes;
  the Chrome patch difference no longer prevents attribution.
- A local bounded-cache/value-fast-path prototype and mutation/HDR/gamut/churn
  regressions are under verification. Do not treat the prototype as accepted
  or the M4 performance gate as closed before the post-change profiles pass.

### E5 cache and consumer verification — 2026-11-22

- The link style cache now retains at most 2,000 entries. A separate last-value
  entry compares canonical coordinates, alpha and all output settings before
  constructing a string key. It owns a copy of the color values, reuses that
  copy on misses, and resets on plugin initialization. It neither quantizes
  canonical colors nor changes draw ordering or alpha composition.
- Fixed the shared engine style-cache boundary to clear before an insertion
  would exceed 2,000 entries. A 5,000-color churn regression observes cache
  cardinality and checks the final output. The link-style regression now uses
  an out-of-gamut source and verifies distinct sRGB/P3 output, in-place color
  mutations and HDR enable/mode/peak changes.
- Moved Ember's application engine module into `app/utils/particles-engine.ts`,
  where Ember includes it in the application module graph. Riot now uses its
  explicit `.js` import and exposes the imported engine on the component;
  the component regression checks that the bound engine is the intended owner.
  The existing Ember canvas acceptance test also passes.
- The full downstream graph now passes 453/453 tasks (final confirmation is
  cached after actual uncached execution); the main suite passes 811 tests
  across 55 files with lint and Prettier. All 85 workspace test targets pass,
  including the previously failing Ember and Riot demos. Build and test run
  links and results are in `evidence/e5/matched-baseline/verification.json`.
- The initial cache prototype needed an optional-chain lint adjustment and
  explicit descriptions of the test geometry no-ops/borrowed Map method.
  The passing results above supersede those failed verification attempts and
  the earlier demo-import failures. No commit or publication performed.

### E5 absorber RNG correction — 2026-11-22

- Two supplemental post-cache M6/M8 runs failed the within-run RNG stability
  assertion: M6/1,000 recorded 10,113/10,113/10,114 calls, and a fresh repeat
  recorded 5,580/5,581/5,580 at M6/500. Both reports are preserved in
  `matched-baseline/post-cache/runtime-extended-rng-failed*.json` and are not
  passing timing evidence.
- The absorber recycle path called `calcPositionOrRandomFromSize` without its
  owning engine RNG, so particle relocation used ambient `Math.random`. The
  same omission exists in the recovered E4 bundle. Matching engine-RNG call
  counts in old M6 reports was therefore insufficient to prove deterministic
  trajectories. Those old observations remain historical, not a causal M6
  regression comparison after the correction.
- Absorber initial/ranged/resized placement likewise omitted its RNG argument.
  Both paths now pass the owning engine provider. New regressions deliberately
  give ambient randomness and two engines different values; they verify
  placement, resize, recycling and cleared orbit/velocity state.
- The main tests-package build now passes 813 tests across 55 files, lint and
  formatting. The recovered E4/E5 M3/M4/M5/M7/background-mask-M8 comparison is
  unaffected by this issue: those scenes configure no absorbers, and the
  absorber plugin does not instantiate without them. The saved cache-stage
  artifact and its SHA-256 identify exactly the code measured there.

### E5 cache outcome and next work — 2026-11-22

- The bounded link-cache/value fast path is accepted as a measured increment:
  at 1,000 particles M4 draw falls from 12.40 to 9.60 ms (22.6%) and sampled
  full-frame allocation from 25.08 to 18.53 MB/tick (26.1%). At 500 particles,
  draw falls from 3.40 to 2.70 ms and sampled frame allocation falls 24.0%.
  All 135 scene snapshots still match E4 and pre-change E5 exactly. See the
  preserved cache-stage artifacts and comparisons in `matched-baseline/`.
- M3/1,000 update is now 1.30 ms, within its 1.43 ms E0 ceiling. The remaining
  M4 draw values (2.70/9.60 ms at 500/1,000) exceed E0 ceilings (2.53/9.02);
  M4/1,000 also exceeds the matched-E4 10% screen (9.46). No threshold is
  waived. M7/500 frame p95 screens at 2.00 vs a 1.98 ms allowance, but its
  repetition range overlaps E4 (2.0–2.1 vs 1.7–2.2 ms); investigate dispersion
  before attributing a regression.
- After the absorber RNG correction, all 18 M6/M8 samples pass their RNG,
  page-error, container removal and DOM assertions. Thirty retention cycles
  keep nine DOM nodes, zero live media listeners and 114,876 bytes of
  post-warm-up heap drift (<1 MiB), with zero long frames. M6/500 p95 is
  1.90 ms vs the 1.87 E0 ceiling; the other five extended frame medians pass.
  See `matched-baseline/post-cache/summary.json` and its final bundle archive.
- Final source verification passes 453 build targets and all 85 test targets;
  the primary suite passes 813 tests across 55 files with lint/format checks.
  The eight passing browser pixel cases still match the current formatter's
  SHA-256. Earlier failed RNG reports and demo tests are retained as history,
  superseded by the corrected final runs.
- All-bundle cache/final increment bytes (raw/gzip/Brotli) are recorded in
  `matched-baseline/bundle-impact.json`; earlier factory/minimal reports remain
  historical.
- Next work: investigate residual M4 drawing/formatter costs and M7 dispersion,
  complete T1 normalized-options and T3 optional-state comparisons, and finish
  the remaining T2 getter/source attribution and T4 HDR cache hit/miss/churn
  cost decisions. Do not replace these decisions with an unmeasured state
  rewrite or mark E5 accepted. The M6/500 release-budget item remains recorded.
  Bundle growth is still the only user-waived gate; no commit or publication.

### E5 model and runtime closure work — 2026-11-23

- Closed the T1–T4 architecture evaluations: retain typed loaders, independent
  options, live owner scratch and the class facade; reject incompatible cloning,
  lazy warm-state savings and a snapshot API without a consumer. ARCH-01/03 and
  IMP-05 now record measurements and compatibility limits.
- Added a last-value formatter fast path and adaptive exact HDR cache policy.
  Links avoid redundant canvas assignments and temporarily neutralize unused
  fill paint with exact native save/restore, including exceptional exits.
  Regression coverage passes: 55 files / 817 tests; the dependent build passes
  187 targets. All eight current formatter pixel cases pass. Three link scenes
  retain byte-identical pixel hashes, geometry and RNG.
- The 45-sample final matrix matches all 135 E4 scene snapshots. All 30 E0
  update/draw ceilings pass; M4 draw is 2.40/8.30 ms at 500/1000 particles.
  M7's previous frame-p95 screen no longer flags. The M4/500 frame-p95 screen
  does flag: 7.70 vs 6.70 ms. A separate nine-repetition comparison confirms
  7.70 vs 6.60 ms, over the 7.26 ms screen. Confirmation update medians are
  3.70 vs 3.60 ms, both above E0's original 3.52 ms ceiling. These results are
  retained rather than replaced by the passing first matrix.
- Instrumented full-frame profiles explain the current cost boundary; an
  alpha-in-paint prototype doubles total time and is rejected. The unsampled
  p95 still needs a supported disposition before E5 acceptance.
- Fresh M6/M8: 18 samples, all RNG checks stable, zero long frames, 30 retention
  cycles, stable 9 DOM nodes / zero media listeners, 113380-byte heap drift.
  M6/500 frame p95 is 2.10 ms vs E0's 1.87; a fresh prior-E5 corrected-RNG
  control measures 2.30 ms. The inherited release-budget issue is still open.
- Final all-bundle increment over the prior checkpoint is +791 raw / +354 gzip /
  +234 Brotli bytes. Full E4 delta and exact bundle/formatter hashes are in
  `evidence/e5/closure/bundle-impact.json`. Bundle-growth waiver remains limited
  to size. The earlier complete consumer payload reports are historical.
- Full `build:ci` has been started, then restarted with eight parallel targets
  and static output; final outcome is pending. No commit or publication.

### Final E5 acceptance — 2026-11-23

E5 is accepted. The user explicitly chose: “Accettare lo scostamento e chiudere
E5, con verifica finale in E10”. This applies to the remaining M4/500 runtime
deviation; it does not change measured values or close E10.

- Full build:ci passes 457 projects, with 364 cache hits. All 85 workspace test
  targets pass; the primary suite passes 55 files / 817 tests.
- Eight current formatter pixel cases and four link scenes pass. The latter
  have exact pixel, geometry and RNG identity, including HDR stroke-only.
- C1–C4, the file inventory, Particle/Retina/reset/option ownership and the
  T1–T4 model decisions are complete. No source migration is deferred to E6.
- The full 45-sample matrix matches 135 E4 scenes and passes all 30 E0 update/
  draw checks; M4 draw is 2.40/8.30 ms at 500/1000. Quiet nine-repetition
  confirmation still has M4/500 update 3.70 ms vs ceiling 3.52, and frame p95
  7.50 vs E4 6.50 (screen 7.15). These are the explicitly accepted E5 exception.
- M6/500's inherited release item remains: p95 2.10 vs E0 ceiling 1.87, with
  fresh prior-E5 control 2.30. All other extended frame ceilings pass.
  RNG, zero long frames, stable DOM/listeners and 113380-byte heap drift pass.
- Rejected paint/getter prototypes are preserved as diagnostics, never shipped.
  Current complete consumer payloads and exact compiled artifacts are archived.

See `evidence/e5/closure/README.md`, `verification.json`, `investigation/`, and
the explicit E10 follow-up in V5-10-SIZE-MIGRATION-RELEASE.md. E0–E5 are
accepted; E6–E10 remain open. No commit or publication performed.
