# V5-05 — CanvasManager, rendering, and other core costs

Status pending. Requires completion of 04.

## Ownership

Canvas and Rendering, closely related color/HDR/style helpers, changes to
shared contracts, and related tests. Handovers 06/07 review ParticlesManager,
Particle, and Retina in full. Add packages only for a substantive reason and
preserve other agents' changes.

## Work

1. Analyze `CanvasManager` and `RenderManager` together, covering resource/canvas
   management, styling/fullscreen, resize/zoom, contexts, color/HDR, the draw
   pipeline, and plugin hooks. Coordinate dependencies and measurements with
   `ParticlesManager` (06) and `Particle`/Retina (07).
2. Introduce private domain helpers where they remove duplication or
   dependencies. Require a benefit beyond shorter source for objects or closures
   allocated per particle or frame.
3. Separate DOM code and pure transforms where the graph allows real exclusion.
   An unconditional dynamic import still ships those bytes. Measure total
   chunks, startup, and runtime cost for lazy capabilities.
4. Preserve OffscreenCanvas, one-time transfer, ownership, and caller-supplied
   canvases. The transfer WeakMap is a browser resource cache. A per-engine
   design must still avoid transferring the same HTMLCanvasElement twice.
5. Preserve background/background mask, layers and hook order, blending,
   transforms/zoom, and source canvases used by export plugins. Keep HDR,
   P3, tone mapping, and fallbacks in the comparison.
6. Reduce mandatory dependencies only with a complete optional path that
   includes loader, options, an enabling bundle, explicit fallback, and tests.
   Keep enablement explicit and independent of global engines and import effects.
7. Measure the minimal entry and bundles, draw/update performance, and
   allocations. Compare like for like and report costs of the new boundaries.

## Acceptance tests

- Test DOM canvas and explicit OffscreenCanvas, resize/fullscreen/zoom, teardown,
  DOM reuse after destroy, and correct error codes for support/transfer failures.
- Define ownership for the same canvas across engines. Verify one-time transfer
  and correct cleanup of listeners, MutationObserver, and media listeners.
- Verify requested HDR against effective color space, P3/sRGB and fallback,
  tone mapping, alpha/blending, layers, and background/mask/export hooks.
- Smoke-test basic scenes, links/collisions, emitters/absorbers, HDR/background
  mask, and two simultaneous engines in a real browser. Record the environment
  and screenshots when helpful. Leave the gate open if tests cannot run.
- Pass the full suite, lint/format, downstream builds, and intermediate budgets.

Include a custom updater with private state in parity tests. Init, update, and
draw must use the same instance within each cycle, including after redraw and
refresh (V4-B05).

## Deliverables

Provide per-scenario measurements, browser evidence, and the final ownership
inventory. Record rejected optimizations when they explain a concrete tradeoff.
Update ARCHITECTURE/STRUCTURE, the changelog as needed, and the index.

## Performance and size plans

See [V5-IMP-02-BUNDLE-GRAPH](improvements/V5-IMP-02-BUNDLE-GRAPH.md) and [V5-IMP-06-RENDER-LIFECYCLE](improvements/V5-IMP-06-RENDER-LIFECYCLE.md).
Record assigned outcomes as specified in the [improvement plan](V5-IMPROVEMENTS.md).

## Required color migration

Follow [V5-COLOR — OKLCH](V5-COLORS-OKLCH.md). Complete C1/C2 and minimum C3
integration. Cover conversion without early clipping, OKLCH/P3 output and
fallbacks, separate gamut/precision/HDR capabilities, intermediate surfaces,
and numerical and browser tests. The full Particle review remains in 07.
