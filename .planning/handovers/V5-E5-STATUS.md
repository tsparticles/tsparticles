# E5 checkpoint — Particle/options and OKLCH

Status: in progress, not accepted. This checkpoint records the first coordinated
runtime and consumer migration. It does not satisfy the E5 exit gate in
[V5-EXECUTION.md](V5-EXECUTION.md).

## Planning correction — 2026-11-21 (implementation still open)

The [E5 scope clarification](V5-COLORS-OKLCH.md#e5-scope-clarification--2026-11-21)
is an acceptance requirement for all resolved engine/extension colors. Earlier
entries below describe partial implementation and test runs, not acceptance of
the final manager contract or a complete non-particle state audit.

### Agent entry checklist

Read this correction first, then the numbered output rules linked below. For
color architecture/output decisions, this correction and the current color
plan supersede historical implementation notes later in this checkpoint.
Those notes remain evidence of past work, not instructions to preserve old paths.

- [ ] Native managers resolve OKLCH; legacy RGB managers use an explicit adapter.
- [ ] Every resolved semantic runtime color is OKLCH, including extension state.
- [ ] Supported CSS/Canvas output defaults to `oklch(...)`, including P3 canvases.
- [ ] Each manual RGB output exception has a concrete need and regression test.
- [ ] Gamut mapping operates on a copy; HDR processing and alpha remain correct.
- [ ] Remaining RGB/HSL uses are classified per file, with no runtime migration left.
- [ ] Tests cover direct serialization, non-particle consumers, unchanged source
      state, real-browser sRGB/P3 output, fallback and HDR for the new path.

Complete these color gates AND the existing Particle lifecycle, consumer,
performance and verification gates before marking E5 accepted. Do not defer
color migration to E6–E10 or mark these boxes based on old test results alone.

### Implementation tasks

Required next work for E5c/E5d:

1. **C2 / 03+08 — Finish the native manager contract.** The current
   `IColorManager` still requires RGB `handleColor` / `handleRangeColor` and RGBA
   `parseString`, with optional OKLCH counterparts. Replace this transitional
   contract with canonical results and an explicit legacy sRGB input adapter.
   Migrate built-ins, exports, custom-manager examples and CLI generation in
   the same buildable increment; test a native manager with no RGB hooks.
2. **C4 / 07+08 — Inventory all semantic colors beyond Particle.** Start with
   `plugins/emitters/src/IRandomPositionData.ts` (`color?: IRgb`), the
   `IOklcha | IRgb` fill/stroke helpers in `EmitterInstance.ts`, and sampled
   colors from `plugins/emittersShapes/canvas`. Trace where raw pixels become
   spawn colors and establish a single canonical resolution boundary. Audit
   all other state, getters, caches and non-particle consumers listed in the
   color plan. These are review seeds, not an exhaustive inventory or a claim
   that every RGB occurrence is a defect.
3. **C1/C2 / 03+05 — Default to direct OKLCH output.** Follow the numbered
   [output implementation rules](V5-COLORS-OKLCH.md#output-rule-for-implementers).
   Use CSS `oklch(...)` for supported CSS/Canvas destinations, including P3
   contexts. The current HDR route (`getStyleFromOklch` →
   `oklchToDisplayP3Float` → `getHdrStyleFromRgb`) is not automatically the target
   design. Keep manual RGB output only for verified fallback/API/HDR needs;
   P3 capability alone is insufficient. Preserve explicit gamut mapping on a
   copy and isolate required HDR math. Add direct-format/no-unnecessary-conversion
   tests and rerun browser pixels, alpha, gamut and HDR tests for this path.
   Prior browser results validate the old implementation only.
4. **C4 acceptance — Record evidence.** Supply the per-file remaining-use
   classification, canonical manager tests, pixel-to-runtime boundary tests and
   non-particle state/output checks. E5 cannot close with unresolved semantic
   RGB/HSL state or implicit native-manager RGB fallback. E6/E7 optimization,
   E8 audit and E9/E10 release work do not own deferred color migration.

This update changes planning only. Existing implementation, browser evidence,
performance limits and other open E5 gates are unchanged.

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

## Open work required before E5 can close

### Latest continuation

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
- The custom color-manager project generator now scaffolds the three optional
  direct OKLCH methods alongside the legacy RGB methods. Its template regression
  passes, and the CLI create-utils build passes. A source audit confirms there
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
  custom color-manager scaffold already exposes all three optional direct
  OKLCH hooks and has a focused template regression. The `@tsparticles/tests`
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
2. **C2 manager contract:** legacy RGB/RGBA methods remain available for
   compatibility, and all built-in managers now implement the optional direct
   OKLCH methods for strings and range/object inputs. Continuous conversions
   keep floating-point RGB intermediates; OKLab maps directly to rectangular
   coordinates. Custom managers still use the RGB fallback; string/object
   fallback behavior now has regression coverage. Optional direct custom
   manager results are checked for finite values, lightness in 0–100,
   nonnegative chroma, valid alpha, and canonical hue before use; invalid outputs
   fall through to legacy RGB conversion. The OKLCH, Lab and LCH
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
   The standalone schema decision is recorded in ARCH-03; parser coverage and
   the custom-manager migration audit remain open.
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

The canonical Particle model and built-in manager inputs are switched; custom
managers that omit the direct OKLCH methods still pass through their legacy RGB
results. P3/HDR context selection and destination mapping are implemented for
the migrated OKLCH consumers. Real-browser sRGB/P3 SDR output, extended
Display-P3 float16 style readback and linear P3 HDR tone-mapped luminance have
been verified. Physical-display calibration, bundle/runtime comparison and the
remaining E5 gates stay open.

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
