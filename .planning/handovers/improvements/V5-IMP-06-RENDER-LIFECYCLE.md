# V5-IMP-06 — Rendering, hooks, and lifecycle costs

Status pending analysis. Medium priority. Owners are 04/05, with plugin
consumers verified in 08. Requires [IMP-01](V5-IMP-01-MEASUREMENT.md).

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
