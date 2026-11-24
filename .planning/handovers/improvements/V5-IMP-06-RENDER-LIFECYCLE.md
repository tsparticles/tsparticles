# V5-IMP-06 — Rendering, hooks, and lifecycle costs

Status: R1–R4 technical review and verification complete in E7 (2026-11-24).
E7 is user-accepted on 2026-11-24 with final absolute-budget checks retained in
E10; see [E7 status](../V5-E7-STATUS.md). E8 retains independent extension
coverage and E10 retains original final-validation ceilings. Requires [IMP-01](V5-IMP-01-MEASUREMENT.md).

## Starting evidence

In the reviewed code, RenderManager.clear creates a set for visited plugins
and enumerates Object.values(DrawLayer). CanvasManager combines CSS keys in
a set during style setup. The first path may run per frame, and the second
runs at setup or resize. Use profiles to prioritize them.

### R1 — Hook execution

Map arrays per phase/layer, deduplication, and canvasClear hook order. Compare
building a deduplicated list at init/refresh and reusing a local buffer against
building the list on every clear. Preserve dedicated plugin precedence,
short-circuiting on the first true result, fallback, and the placement of
plugins that appear in several layers.

Check whether plugins/layers can change during start, a frame, or a callback.
If so, define invalidation or preserve the dynamic path. Preserve observable
mutability. Test refresh and plugin removal.

### R2 — Enumeration and per-frame work

Compare a constant list of numeric layers with Object.values on the numeric
enum, which includes reverse-mapped names. Preserve supported layer order and
behavior. Keep layer numbers defined in one place. Measure bytes and time
against the cost of any new abstraction. Require a measured reason for extra
iterators or closures on the per-particle path.

### R3 — Canvas state and repeated operations

Profile save/restore, transforms, styles, compositing, and clear in M8.
Reduce assignments only when context state is known, because shapes, effects,
custom drawing, and plugins can change it. A state cache requires invalidation
after external callbacks or a verified contract.

Batching by color/shape can change blending, Z order, and hooks. Treat it as
a separate experiment with comparable images and preserved order where
required. Validate the full scene before adopting general batching.

### R4 — Setup, resize, and teardown

In M6/M8/M9, measure load and resize separately from frame cost. Skip repeated
setup only when options, pixel ratio, and canvas are unchanged. Coalescing
resize or events must preserve results, plugin event expectations, and progress.

Check MutationObserver, HDR media listeners, and per-engine scheduling. Pause,
refresh, and destroy cancel or remove only owned resources. The
HTMLCanvas→OffscreenCanvas transfer cache follows browser resource constraints.
Preserve one-time transfer even when engines are independent.

## Verification and deliverables

Test basic scenes without plugins, trail/custom clear, multiple layers,
HDR/background mask, export, resize, and custom callbacks. Record callback
counts, allocations per frame, update/draw/startup, live listeners after
teardown, and bundle deltas. Smoke-test in browsers with the same configuration
and viewport, and document visual comparison tolerances. Close R1–R4 in 04/05
and carry results and limitations into gate 10.

## E7 outcomes — 2026-11-24

See the [method/ownership inventory](../V5-E7-REVIEW.md),
[measurement evidence](../evidence/e7/measurement-runs.json) and
[acceptance checkpoint](../V5-E7-STATUS.md).

| Item | Outcome                                                                                                                                    | Evidence and cost                                                                                                                                                                                                                                                                                                                                                                               |
| ---- | ------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| R1   | Retain live hook lookup and a fresh identity Set. Reject precompiled clear membership and pooled Sets.                                     | Deterministic precedence/late-hook/refresh/removal/nested/error tests preserve behavior. Nine alternating Node repetitions of 200,000 calls: numeric/fresh Set empty 39.29 ns versus pool 51.42; multi-layer 75.84 versus 89.71; dedicated true 27.63 versus 41.09. Pool sets are emptied in finally but add complexity and time.                                                               |
| R2   | Implement one module-local numeric enum sequence.                                                                                          | Empty clear 150.21 → 39.29 ns; multi-layer 190.11 → 75.84; late hook 187.42 → 74.94. Enum numbers stay defined once. Helper bytes are unchanged; minimal +130 gzip/+140 Brotli; All +164 gzip/+265 Brotli. Chunk counts unchanged. See clear-candidates.json and payload-comparison.json.                                                                                                       |
| R3   | Retain direct context assignments, draw ordering and escaping public draw records. Repair nested and exceptional state.                    | External style mutation/escaped record tests rule out generic caches/pooling without a new contract. M8's 60-frame/1,000-particle operation counts match baseline exactly, including 60 save/restore calls, 120,000 setTransform and 60,000 resetTransform calls. No ordinary per-particle save/restore is added. Full matrix includes sampled frame allocations; CPU traces remain diagnostic. |
| R4   | Retain setup CSS union and existing resize scheduling; repair zero-size axes, stale subscriptions/observers and destroy context ownership. | DOM/offscreen/fullscreen/Retina/zoom/export/reuse tests; 12 full-surface pixel matches; actual worker startup and teardown. M6/M8 SDR/HDR phase data and 30-cycle retention pass. Post-peak heap drift is 100,148/99,448 bytes (SDR/HDR); nine-repeat HDR confirmation 89,976 bytes. Two-engine lifecycle timings are recorded separately from frame cost.                                      |

The main Chrome 158 matrix matches 135 state snapshots. Its one relative p95
flag passes nine-repeat alternating confirmation; all seven investigated cases
pass relative update/draw/p95 screens with 189 additional matching snapshots.
The extended HDR update flag also passes nine repeats (54 matching samples).
Chrome for Testing 157 repeats the seven matched cases with another 189 matching
snapshots and passing relative screens. Original E0 absolute exceedances are
retained, including fresh E6 control exceedances: no original ceiling is silently
recalibrated or waived by these incremental results.

No package extraction, lazy capability split, batching or generic extension
scheduler is introduced. Setup work remains setup work; the clear microbenchmark
is not presented as an FPS gain. Physical HDR luminance and final release-time
budget/browser-policy acceptance remain outside this technical checkpoint.
