# Shape/Effect Bounds Ownership Plan

## Context

The current engine decides whether a particle is inside/outside the canvas with a generic check in `engine/src/Core/Particle.ts` (`isInsideCanvas()`), based on particle center + radius. This works for simple shapes, but it is insufficient for procedural shapes/effects whose visible geometry can extend far beyond the particle radius (for example `ribbon`).

Result: visual artifacts near canvas edges (late resets, flicker, chaotic exits), because lifecycle and out-of-canvas decisions are detached from real rendered geometry.

## Goal

Let **shape drawers** and **effect drawers** optionally define how canvas-bounds are evaluated for their particles, while keeping backward compatibility for all existing shapes/effects.

In short:

- engine keeps a default generic bounds check;
- shape/effect can override/extend that check with geometry-aware logic;
- engine uses the resolved result for visibility/out-mode/lifecycle decisions.

## Current Touchpoints

- `engine/src/Core/Particle.ts`
  - `isInsideCanvas()` is generic and radius-based.
  - `isVisible()` delegates to `isInsideCanvas()`.
- `engine/src/Core/Interfaces/IShapeDrawer.ts`
  - draw lifecycle exists, but no API for bounds ownership.
- `engine/src/Core/Interfaces/IEffectDrawer.ts`
  - effect lifecycle exists, but no API for bounds ownership.
- `engine/src/Core/ParticlesManager.ts`
  - update pipeline could consume a richer in/out-canvas status.

## Proposed Design

### 1) New shared type for bounds decisions

Add a new engine type (name can vary):

`IParticleCanvasBoundsResult`

Recommended fields:

- `inside: boolean` (required)
- `margin?: number` (optional, debug/telemetry)
- `reason?: "default" | "shape" | "effect" | "combined"` (optional)

And a callback context type:

`IParticleCanvasBoundsData<TParticle extends Particle = Particle>`

Suggested fields:

- `particle: TParticle`
- `canvasSize: { width: number; height: number }`
- `radius: number`

### 2) Extend shape drawer contract (optional)

In `IShapeDrawer` add optional callback:

- `isInsideCanvas?: (data: IParticleCanvasBoundsData<TParticle>) => boolean | IParticleCanvasBoundsResult`

Behavior:

- if missing, engine uses default radius check.
- if present, engine trusts it for shape-owned bounds semantics.

### 3) Extend effect drawer contract (optional)

In `IEffectDrawer` add optional callback:

- `isInsideCanvas?: (data: IParticleCanvasBoundsData<TParticle>) => boolean | IParticleCanvasBoundsResult`

Behavior:

- effect can refine bounds when visual footprint is effect-driven.

### 4) Resolution strategy in Particle

Refactor `Particle.isInsideCanvas()` into a resolver pipeline:

1. Compute default generic result (current behavior).
2. Read active shape drawer callback (if any).
3. Read active effect drawer callback (if any).
4. Resolve final value with deterministic precedence.

Recommended precedence:

- If only one override exists -> use it.
- If both exist -> combine with configurable policy.

Recommended default combine policy:

- `inside = shapeInside && effectInside` (conservative, avoids particles lingering offscreen).

Alternative policy can be introduced later via options if needed.

### 5) Keep backward compatibility strict

- Existing shapes/effects require **no changes**.
- If new callbacks are absent, behavior remains exactly as today.
- No public API removals.

## Implementation Plan (for the next plan/build agent)

### Phase A — Engine contracts

1. Add new bounds data/result types in engine exports.
2. Extend `IShapeDrawer` and `IEffectDrawer` with optional `isInsideCanvas` callback.
3. Update public type exports (`engine/src/export-types.ts` / `engine/src/exports.ts` if needed).

### Phase B — Particle resolver

1. In `Particle.isInsideCanvas()`, implement:
   - default check extraction to helper (`getDefaultInsideCanvasResult`).
   - callback discovery for active shape/effect drawers.
   - normalized return handling (`boolean` or object).
2. Add internal helper methods:
   - normalize callback result.
   - merge shape/effect results with deterministic policy.

### Phase C — First adopter (ribbon)

1. Implement `isInsideCanvas` in `shapes/ribbon/src/RibbonDrawer.ts`.
2. Compute bounds from ribbon geometry (head/points/thickness), not particle radius.
3. Remove ribbon-specific lifecycle hacks that duplicate this decision in update loop (only if safe after tests).

### Phase D — Tests and validation

1. Engine unit tests for resolver behavior:
   - no callbacks -> default logic.
   - only shape callback.
   - only effect callback.
   - both callbacks with combine policy.
2. Ribbon regression test scenario:
   - stable exit at canvas boundaries.
   - no flicker/jitter from late out-of-canvas decisions.
3. Optional visual smoke in demo config `shapeRibbon`.

## Acceptance Criteria

- Shapes/effects can optionally control in/out-canvas semantics.
- Engine default behavior remains unchanged for unchanged plugins.
- Ribbon no longer relies on ad-hoc edge reset logic to avoid chaotic exits.
- No regressions in standard shapes (`circle`, `square`, `polygon`, `image`, etc.).

## Risks and Mitigations

### Risk 1: conflicting shape/effect results

Mitigation:

- single documented merge policy (start with AND).
- explicit tests for conflict cases.

### Risk 2: performance impact per-particle per-frame

Mitigation:

- callbacks are optional and only called when present.
- keep callback payload minimal.
- avoid allocations in hot path.

### Risk 3: plugin ecosystem breakage

Mitigation:

- optional interface extension only.
- no mandatory implementation.
- changelog note + migration snippet.

## Suggested Task Breakdown (ready for planner)

1. Define new engine types for bounds callbacks.
2. Extend shape/effect drawer interfaces.
3. Implement particle bounds resolver with merge policy.
4. Add resolver unit tests.
5. Implement ribbon bounds callback using true ribbon geometry.
6. Remove redundant ribbon exit hacks where possible.
7. Validate with Nx build/lint/tests and `shapeRibbon` visual check.

## Notes for Build Agent

- Treat this as an engine-level contract change first, ribbon fix second.
- Keep API additions minimal and optional.
- Prefer explicit helper functions over inline logic in `Particle.isInsideCanvas()` to keep reviewability high.
