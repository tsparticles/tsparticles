# E5 checkpoint — Particle/options and OKLCH

Status: in progress, not accepted. This checkpoint records the first coordinated
runtime and consumer migration. It does not satisfy the E5 exit gate in
[V5-EXECUTION.md](V5-EXECUTION.md).

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
   fallback behavior now has regression coverage. The OKLCH, Lab and LCH
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
   pass the destination through. Finish context edge-case coverage, remaining
   legacy RGB/HSL output paths and HDR validation. The engine-backed fixture
   `evidence/e5/browser-color.html` now runs through
   `evidence/tools/check-e5-color-browser.mjs` in headless Chrome 157. Its
   sRGB context/readback returns `[59, 81, 211]` for the CSS Color 4/WPT blue
   vector (maximum error 0.30, tolerance 2); its Display-P3 context/readback
   returns `[250, 144, 0]` for the CSS Color 4 §14.2 example (maximum error 5,
   tolerance 9). Both actual and readback color spaces match their requested
   spaces. A third case sends the engine's HDR style through Display-P3
   `float16` and reads back `[1.14355, 0.44946, -0.38965]`; maximum error is
   0.00021 against tolerance 0.001, confirming extended coordinates survive
   the browser canvas boundary. This does not validate HDR luminance or
   tone-mapping conformance. Full results are in
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
   now migrated to `particle.fillColor` h/c/l state. The file passes 67/67.
   The sRGB, Display-P3 SDR and Display-P3 float16 browser readbacks pass in
   Chrome 157 (see `evidence/e5/browser-color-results.json`). The remaining
   schema/custom-manager surface audit is still open.
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
   extended-coordinate readbacks pass in Chrome 157 with explicit color-space
   readback. HDR luminance/tone-mapping conformance, bundle/runtime comparison
   against E0 and the previous checkpoint, and particle memory, allocation,
   update and draw measurements remain open.
8. Run the final full suite, formatting/lint checks and all downstream builds
   after C1–C4 and Particle review are complete; then update the engine matrix,
   decision log, migration matrix and final color report.

## Current limitations

The canonical Particle model and built-in manager inputs are switched; custom
managers that omit the direct OKLCH methods still pass through their legacy RGB
results. P3/HDR context selection and destination mapping are implemented for
the migrated OKLCH consumers. Real-browser sRGB/P3 SDR output and extended
Display-P3 float16 style readback have been verified. That HDR check confirms
preservation of extended channel values but does not validate luminance or tone
mapping; those and the remaining E5 gates stay open.
