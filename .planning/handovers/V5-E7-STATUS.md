# E7 accepted — 2026-11-24

E7 implementation, full source review and matched incremental verification are
complete. The user accepts E7 on 2026-11-24 with final absolute-budget checks
retained in E10. E6’s accepted baseline is preserved. Original ceilings and
recorded exceedances remain unchanged; release readiness is not established.

## Initial review and repair

Read CanvasManager and RenderManager together with handover 05 and IMP-06.
The first correctness repair covers a canvas whose previous DOM width or height
was zero. Dividing the new size by that axis produced Infinity (or NaN for a
still-zero axis), which ParticlesManager applied to current and initial particle
positions. Keep a neutral factor on a previously zero axis; retain proportional
scaling on each previously nonzero axis. Canvas dimensions still update, and an
unchanged second resize still returns false.

Five ContainerLifecycle regressions cover zero width, zero height and both,
including an axis remaining zero while the other resizes. The initial three
recovery cases fail with Infinity against the pre-repair compiled engine.

## Verification

- Engine build and its 19 prerequisite tasks pass, including lint and dependency
  validation. ContainerLifecycle passes all 22 tests; test-package lint and
  changed-file format checks pass.
- The downstream build's primary test target passes **59 files / 931 tests**,
  including all five new regressions. This completed after the downstream
  libraries were rebuilt, resolving the earlier import failures.
- The broad build requested 235 projects plus 218 dependency tasks. It initially
  reports two failures: Electron's client webpack build passes, but packaging
  reports `fetch failed`; Angular's `ng build` aborts with signal 6. Both failed
  targets pass outside the sandbox, together with 88 prerequisite tasks. All
  requested targets succeeded across the original run and the targeted retry;
  this is not a single all-green build invocation.
- The initial overlapping full-suite attempt passed 859 tests but three files
  could not resolve imports while builds recreated dist outputs. A duplicate
  direct Vitest attempt was rejected by the coverage-directory lock. Both failed
  attempts are superseded for primary-suite validation by the 931-test run,
  not counted as passing runs themselves.

See the durable [validation record](evidence/e7/initial/verification.json) and
compressed logs beside it. No browser or rendering performance gate is closed.

## Closure continuation

The [complete method and ownership review](V5-E7-REVIEW.md) now covers both
managers, the draw-layer numeric policy and the adjacent interactivity worker
path. Fixes add stale observer/media rejection, context release on destroy,
exception-safe alpha/transforms, isolated nested particle draws and finite
positive zLayers validation. Hook lookup and state mutation remain observable.

Final runtime build: **453 tasks pass**. A later type-comment-only engine rebuild
also passes. Final workspace checks: **85/85 targets**, **61 files / 953 primary
tests**, including production support/transfer error codes. Eight formatter/pixel
cases and tone mapping pass. The first complete-surface browser comparison has
four exact pixel/PNG matches, zero media listeners/observers after teardown,
private updater identity across redraw/refresh and a passing full All worker.
The repeated comparison and quiet runtime/size evidence are being finalized.

Clear microbenchmark (9 alternating repetitions of 200,000 calls, Node 26.13):
empty **150.21 → 39.29 ns**, multi-layer **190.11 → 75.84 ns**, late clear
**187.42 → 74.94 ns**; dedicated true **27.72 → 27.63 ns**. The pooled Set variant
is slower than the numeric sequence with a fresh Set and is rejected. These are
isolated submission costs, not FPS measurements.

## Final technical verification — 2026-11-24

- **453 downstream build tasks pass**. A subsequent type-comment-only engine
  rebuild passes. **85 workspace test targets / 61 files / 953 primary tests**
  pass; lint, formatting and diff checks are recorded with final evidence.
- Chrome 158: **135 state snapshots match**. Initial relative screens pass 44/45;
  M8/500 p95 is 1.80 vs 1.76-ms screen. Nine alternating repeats of seven
  investigated cases pass all 21 relative update/draw/p95 screens, with **189**
  further matching snapshots. Original results remain recorded.
- Extended SDR/HDR: **18 samples per artifact/mode**, stable RNG/counts/DOM and
  zero media listeners after teardown, **30 retention cycles** per mode, and
  **100,148/99,448-byte** post-peak heap drift. An initial HDR M6/1000 update
  flag passes nine-repeat confirmation: both artifacts **1.70 ms**, with **54**
  matching extended samples and **89,976-byte** drift.
- **12 full-surface pixel comparisons** match exactly. HDR/P3 float16, sRGB
  fallback, mask/trail, Retina/zoom, image export, private updater identity after
  redraw/refresh, two-engine ownership, one-time transfer, CSS restoration and
  explicit OffscreenCanvas pass. The full All worker fails in E6 on document
  access and passes in E7. Eight color/tone-mapping cases pass.
- **All +382 minified / +164 gzip / +265 Brotli bytes** versus accepted E6;
  minimal consumer **+293 / +130 / +140**. Helper bytes and chunk counts are
  unchanged. All intermediate byte deltas are below 2%; original release size
  ceilings remain open under the existing E5/E10 process.
- Chrome for Testing **157.0.8103.79**, downloaded from the official public
  archive into /tmp, repeats all seven investigated cases with passing relative
  screens and **189** further matching state snapshots. It is a different
  browser product from the original Google Chrome binary, and its fresh E6
  control also exceeds several original E0 absolute ceilings. Do not treat it
  as a passing absolute-budget run or attribute the difference to E7 alone.

## Explicit acceptance — 2026-11-24

[Execution policy](V5-EXECUTION.md) keeps gates open for unmet mandatory budgets.
The original E0 absolute checks do not all pass in the current environment,
including on fresh archived E6 controls. The matched E7 comparisons pass; this
is evidence of no measured incremental regression, not a waiver of absolute
limits. Existing E5 M4/500 and bundle exceptions and the inherited M6 obligation
remain unchanged. New environment-sensitive absolute flags are explicitly
recorded for final E10 verification; they are not reported as passing or
automatically covered by the E5 exception.

The user explicitly accepts technical E7 closure with final checks in E10:
“sì va bene che E10 faccia i check finali”. E7 is complete; E8 is next. Every
original absolute ceiling and release-time check remains an E10 obligation.
This authorizes stage closure, not release, publication or a release-budget waiver.
No commit, merge or publication is performed.
