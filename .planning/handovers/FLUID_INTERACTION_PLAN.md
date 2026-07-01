# Fluid as Collision Mode — v5 Deep Technical Specification

## Status

The previous fluid direction (standalone interactor/package) is superseded.

The new architectural requirement is explicit:

- fluid must be implemented as a `particles.collisions.mode` value
- no dedicated fluid interactor package must exist
- no independent activation path must allow fluid + bounce to run simultaneously

This document keeps the deep analysis quality of the previous plan, but remaps implementation to the existing collisions interaction.

---

## Table of Contents

0. [Decision and constraints](#0-decision-and-constraints)
1. [Root-cause retrospective remapped to collisions](#1-root-cause-retrospective-remapped-to-collisions)
2. [Collision architecture mapping](#2-collision-architecture-mapping)
3. [Fluid-as-mode algorithm specification](#3-fluid-as-mode-algorithm-specification)
4. [Per-frame lifecycle and ordering](#4-per-frame-lifecycle-and-ordering)
5. [Data model, options, and runtime state](#5-data-model-options-and-runtime-state)
6. [Integration matrix with existing systems](#6-integration-matrix-with-existing-systems)
7. [Failure modes and mitigations](#7-failure-modes-and-mitigations)
8. [File-by-file specification (collisions package only)](#8-file-by-file-specification-collisions-package-only)
9. [Testing strategy](#9-testing-strategy)
10. [Implementation checklist](#10-implementation-checklist)
11. [Acceptance criteria](#11-acceptance-criteria)
12. [Migration notes from old fluid draft](#12-migration-notes-from-old-fluid-draft)
13. [Default configurations](#13-default-configurations)

---

## 0. Decision and constraints

### 0.1 Product decision

Fluid behavior is a **collision response mode**, not a separate interaction family.

Canonical selector:

```json
{
  "particles": {
    "collisions": {
      "enable": true,
      "mode": "fluid"
    }
  }
}
```

### 0.2 Non-negotiable constraints

1. Do not create `@tsparticles/interaction-particles-fluid`.
2. Do not add `loadParticlesFluidInteraction(engine)`.
3. Do not add `particles.fluid` as a top-level particle option namespace.
4. Do not allow concurrent execution of `fluid` and classic collision modes for the same particle pair.
5. Keep existing `bounce`, `absorb`, `destroy` behavior backward-compatible.

### 0.3 Design rationale

- Collision modes already model mutually exclusive particle-particle resolution semantics.
- DDR fluid is physically an alternative collision/contact solver.
- One mode field prevents invalid compositions by construction.
- Existing bundle/plugin load graphs stay minimal and consistent.

---

## 1. Root-cause retrospective remapped to collisions

The previous failure analysis remains valid in physics terms; only integration location changes.

### 1.1 Bug #1: no velocity reconstruction

Without feedback from corrected positions back into velocity, MovePlugin advection and DDR correction fight each frame.

Same issue applies if fluid runs inside collisions mode.

Required fix in collisions mode:

- save pre-advection position in `reset()`
- reconstruct velocity after fluid displacement in `interact()`

### 1.2 Bug #2: missing first `q` factor

Correct displacement term remains:

`dir * q * (P + Pnear * q) * 0.5`

Missing the first `q` introduces a force discontinuity at the kernel radius boundary (`r = h`), causing jitter/bounce artifacts.

### 1.3 Bug #3: delegating boundary to outModes

`outModes` (`bounce`/`clamp`/`none`) cannot replace DDR-compatible boundary handling.

Fluid mode still requires:

- soft spring near boundaries
- hard clamp after displacement

### 1.4 Bug #4: no per-particle transient state

`prevPos` is required for velocity reconstruction.

In collisions mode, this state belongs to collision particle runtime typing and is active only when mode is `fluid`.

### 1.5 Bug #5: solver incoherence

All fixes must be applied together (formula + boundary + state + velocity feedback). Partial fixes do not produce stable fluid behavior.

---

## 2. Collision architecture mapping

### 2.1 Current collisions flow (baseline)

Current implementation in `interactions/particles/collisions/src/Collider.ts`:

1. Query nearby particles by radius
2. Filter by collisions enabled + same mode
3. If overlap/contact detected, call `resolveCollision(p1, p2, ...)`
4. `resolveCollision` dispatches `bounce` / `absorb` / `destroy`

### 2.2 Target flow with `mode = fluid`

1. Keep classic branch for `bounce` / `absorb` / `destroy`
2. Add dedicated `fluid` branch in collider
3. Fluid branch performs DDR sequence per particle
4. Classic pair resolver and fluid branch are mutually exclusive by mode

### 2.3 Why fluid should not use `resolveCollision` pair switch directly

Classic resolver is pair-impact oriented. DDR fluid requires neighborhood-density accumulation, then neighborhood displacement. This is a particle-neighborhood solve, not a single pair impulse.

Therefore:

- `resolveCollision` remains for classic modes
- fluid branch should live in `Collider` or dedicated helper invoked by `Collider`

---

## 3. Fluid-as-mode algorithm specification

## 3.1 Kernel and pressure

For particle `i` with neighbors `j` inside radius `h`:

`q_ij = 1 - r_ij / h`

`rho_i = sum(q_ij^2)`

`rhoNear_i = sum(q_ij^3)`

`P_i = (rho_i - restDensity) * stiffness * 0.5`

`Pnear_i = rhoNear_i * nearStiffness * 0.5`

## 3.2 Displacement

For each neighbor `j`:

`dir = (pos_j - pos_i) / dist`

`force = clamp(P_i + Pnear_i * q_ij, -maxForce, maxForce)`

`d = dir * q_ij * force * 0.5`

Apply symmetric displacement:

- `pos_j += d`
- `pos_i -= d`

## 3.3 Boundary handling (fluid mode)

With `r2 = radius * wallMarginFactor` (recommended `0.15`):

1. Apply soft spring in X/Y when particle is within `r2` from walls
2. After displacement, apply hard clamp to `[r2, width-r2] x [r2, height-r2]`

## 3.4 Velocity reconstruction

After fluid solve:

`velocity = (position - fluidPrevPos) / effectiveSpeed`

`effectiveSpeed` should mirror MovePlugin advection factors (including delta/reduce factors) with safe minimum clamp.

## 3.5 Safety constraints

- skip `destroyed` and `spawning`
- guard `dist < epsilon`
- cap neighbors via `maxNeighbors`
- clamp force with `maxForce`
- avoid per-frame allocations in hot path

---

## 4. Per-frame lifecycle and ordering

### 4.1 Required ordering

1. `reset()` before MovePlugin advection (store pre-advection position)
2. MovePlugin updates velocity and position
3. External interactions may alter positions
4. `Collider.interact()` executes fluid mode solve
5. Velocity reconstructed from pre-advection snapshot and final corrected position

### 4.2 Ordering implications

- Fluid branch should run in the same interaction phase as collisions currently run.
- Since solver is single-pass Gauss-Seidel style over current order, mild order bias is expected and acceptable.
- Velocity feedback across frames compensates for single-pass limitations and improves convergence.

### 4.3 Mutual exclusivity guarantee

The branch must be decided by `p1.options.collisions.mode` (with same-mode filter against p2), so a particle in fluid mode cannot also execute bounce mode in the same collision pass.

---

## 5. Data model, options, and runtime state

## 5.1 Options shape

Target collisions options:

```json
{
  "particles": {
    "collisions": {
      "enable": true,
      "mode": "fluid",
      "fluid": {
        "radius": 30,
        "stiffness": 0.5,
        "nearStiffness": 0.5,
        "restDensity": 3,
        "maxNeighbors": 64,
        "maxForce": 2.5
      }
    }
  }
}
```

`enable` remains global for collisions subsystem.

## 5.2 New options types inside collisions package

Add fluid options under collisions options tree:

- `Options/Interfaces/ICollisionsFluid.ts`
- `Options/Classes/CollisionsFluid.ts`

Then wire into:

- `Options/Interfaces/ICollisions.ts` as `fluid: ICollisionsFluid`
- `Options/Classes/Collisions.ts` with loader/defaults

## 5.3 Collision mode enum

`CollisionMode` must include:

- `absorb`
- `bounce`
- `destroy`
- `fluid`

## 5.4 Runtime particle extension

Extend collision runtime type with fluid-only transient fields:

- `fluidPrevPos?: Vector`
- optional cached resolved fluid numeric options

State creation strategy:

- lazy init only when mode is `fluid`
- no overhead for classic modes

---

## 6. Integration matrix with existing systems

### 6.1 Collisions modes interaction

| Mode | Behavior family | Can combine with another collisions mode? |
|------|------------------|-------------------------------------------|
| `bounce` | pair impulse | no |
| `absorb` | pair mass transfer | no |
| `destroy` | pair removal | no |
| `fluid` | neighborhood DDR | no |

### 6.2 Move plugin

| Property | Effect in fluid mode |
|----------|----------------------|
| `move.gravity` | required for visible pooling |
| `move.speed` | keep moderate (1-3) for stability |
| `move.outModes` | should not conflict with fluid boundary (prefer `none`) |
| `move.decay` | high decay can damp fluid response too much |

### 6.3 Other systems

| System | Compatibility | Notes |
|--------|---------------|-------|
| External repulse | compatible | repulse injects disturbances, DDR redistributes pressure |
| Links | compatible | rendering only |
| Emitters | compatible | skip `spawning` particles in fluid solve |
| Wobble/path modifiers | partial | can introduce non-physical perturbations |

---

## 7. Failure modes and mitigations

### 7.1 NaN/Infinity instability

Causes:

- division by zero distance
- zero/invalid effective speed
- excessive pressure force

Mitigations:

- epsilon checks
- minimum denominator clamps
- force clamp

### 7.2 Bottom overlap artifacts

Causes:

- hard edge clamp without soft spring
- outModes fighting boundary logic
- insufficient near-pressure + wrong kernel scaling

Mitigations:

- soft spring + hard clamp sequence
- use correct displacement formula with first `q`
- configure gravity/speed/restDensity coherently

### 7.3 Jitter and explosive behavior

Common triggers:

- stiffness too high
- maxForce too high
- move speed too high
- too dense local clusters without neighbor cap

Mitigations:

- conservative defaults
- documented tuning ranges
- deterministic `maxNeighbors` cap

### 7.4 Performance degradation

Risk factors:

- large radius
- high particle count
- dense zones

Mitigations:

- spatial grid query reuse
- capped neighbors
- avoid per-frame array/object allocations

---

## 8. File-by-file specification (collisions package only)

## 8.1 `interactions/particles/collisions/src/CollisionMode.ts`

Add enum member:

```ts
fluid = "fluid"
```

## 8.2 `interactions/particles/collisions/src/Options/Interfaces/ICollisionsFluid.ts`

Introduce interface with fields:

- `radius`
- `stiffness`
- `nearStiffness`
- `restDensity`
- `maxNeighbors`
- `maxForce`

Use `RangeValue` where consistent with existing collisions option style.

## 8.3 `interactions/particles/collisions/src/Options/Classes/CollisionsFluid.ts`

Defaults (proposed):

- `radius = 30`
- `stiffness = 0.5`
- `nearStiffness = 0.5`
- `restDensity = 3`
- `maxNeighbors = 64`
- `maxForce = 2.5`

Implement loader with `loadRangeProperty`.

## 8.4 `interactions/particles/collisions/src/Options/Interfaces/ICollisions.ts`

Add:

```ts
fluid: ICollisionsFluid;
```

## 8.5 `interactions/particles/collisions/src/Options/Classes/Collisions.ts`

Add:

- `readonly fluid = new CollisionsFluid();`
- `this.fluid.load(data.fluid);`

## 8.6 `interactions/particles/collisions/src/Types.ts`

Extend `CollisionParticle` with fluid runtime state fields needed for solver.

## 8.7 `interactions/particles/collisions/src/Collider.ts`

Required updates:

1. Implement `reset()` behavior for fluid mode particles
2. In `interact()`, branch by mode
3. Keep classic resolution path unchanged
4. Add fluid DDR branch with:
   - density pass
   - pressure computation
   - boundary soft spring
   - displacement pass
   - hard clamp
   - velocity reconstruction

## 8.8 `interactions/particles/collisions/src/ResolveCollision.ts`

Keep focused on classic modes. Optional to include `fluid` case as explicit no-op guard, but DDR should not be driven from this pair-switch function.

## 8.9 Documentation markdown

Update:

- `markdown/Options/Particles/Collisions.md`

Must include:

- `mode: "fluid"` in mode list
- `collisions.fluid` options table
- note that fluid is mutually exclusive with other collision modes
- migration note from experimental `particles.fluid` drafts (if referenced elsewhere)

---

## 9. Testing strategy

## 9.1 Unit tests

1. `mode = fluid` enters fluid branch only
2. `mode = bounce|absorb|destroy` remains unchanged
3. Options load for `collisions.fluid` defaults and overrides
4. Velocity reconstruction updates velocity from pre-advection snapshot
5. No NaN/Infinity under dense neighborhoods
6. Neighbor cap respected
7. Boundary clamp/spring keep particles within expected limits

## 9.2 Visual/manual tests

1. 400 particles, gravity 0.01, `collisions.mode = fluid`
   - coherent pooling visible within ~3 seconds
   - no catastrophic bottom overlap
2. same scene switching to `bounce`
   - immediate behavior change to elastic collisions
   - no mixed fluid+bounce artifacts

## 9.3 Regression tests

- Existing collisions tests must pass without behavior drift for classic modes.

---

## 10. Implementation checklist

### Step 0 — Alignment

- [ ] Verify current collisions package architecture and test baseline
- [ ] Confirm no standalone fluid package remains in active release plan

### Step 1 — Contract

- [ ] Add `fluid` to `CollisionMode`
- [ ] Add `ICollisionsFluid`
- [ ] Add `CollisionsFluid` class with defaults/load
- [ ] Wire `fluid` into `ICollisions` and `Collisions.load()`

### Step 2 — Runtime

- [ ] Extend collision particle runtime type with fluid transient state
- [ ] Implement `Collider.reset()` pre-advection snapshot for fluid mode
- [ ] Implement fluid DDR path in `Collider.interact()`
- [ ] Keep classic resolver path intact

### Step 3 — Stabilization

- [ ] Add guards/clamps/neighbor caps
- [ ] Validate boundary behavior with gravity
- [ ] Verify no allocations regressions in hot path

### Step 4 — Docs

- [ ] Update collisions markdown with fluid mode and options
- [ ] Remove references to standalone fluid package/loader in planning docs

### Step 5 — Validation

- [ ] Run collisions build and tests
- [ ] Validate visual behavior with recommended config
- [ ] Confirm classic modes regression-free

---

## 11. Acceptance criteria

1. Fluid is configured via `particles.collisions.mode = "fluid"`.
2. No new plugin/package/interactor is introduced for fluid.
3. `fluid` cannot run simultaneously with `bounce`/`absorb`/`destroy` for the same particles.
4. Classic collision modes remain functionally unchanged.
5. Fluid mode produces observable cohesive pooling with recommended config.
6. Public docs present fluid under collisions options.

---

## 12. Migration notes from old fluid draft

## 12.1 Config migration

From:

```json
{
  "particles": {
    "fluid": {
      "enable": true,
      "radius": 30
    }
  }
}
```

To:

```json
{
  "particles": {
    "collisions": {
      "enable": true,
      "mode": "fluid",
      "fluid": {
        "radius": 30
      }
    }
  }
}
```

## 12.2 Loader migration

- Remove references to dedicated fluid loader.
- Use existing collisions interaction loading path only.

## 12.3 Package migration

- Any mention of `@tsparticles/interaction-particles-fluid` is invalid in this plan.
- Feature ships as extension of `@tsparticles/interaction-particles-collisions`.

---

## 13. Default configurations

### 13.1 Baseline fluid mode preset

```json
{
  "particles": {
    "number": { "value": 400, "density": { "enable": true } },
    "shape": { "type": "circle" },
    "size": { "value": 3 },
    "move": {
      "enable": true,
      "speed": 1,
      "outModes": { "default": "none" },
      "gravity": { "enable": true, "acceleration": 0.01 }
    },
    "collisions": {
      "enable": true,
      "mode": "fluid",
      "fluid": {
        "radius": 30,
        "stiffness": 0.5,
        "nearStiffness": 0.5,
        "restDensity": 3,
        "maxNeighbors": 64,
        "maxForce": 2.5
      }
    }
  },
  "interactivity": {
    "events": { "onClick": { "enable": true, "mode": "repulse" } },
    "modes": { "repulse": { "distance": 100, "duration": 2 } }
  }
}
```

### 13.2 Softer fluid variant

```json
{
  "particles": {
    "move": {
      "enable": true,
      "speed": 1,
      "outModes": { "default": "none" },
      "gravity": { "enable": true, "acceleration": 0.005 }
    },
    "collisions": {
      "enable": true,
      "mode": "fluid",
      "fluid": {
        "radius": 40,
        "stiffness": 0.3,
        "nearStiffness": 0.35,
        "restDensity": 2.5,
        "maxNeighbors": 64,
        "maxForce": 2
      }
    }
  }
}
```

### 13.3 Denser fluid variant

```json
{
  "particles": {
    "move": {
      "enable": true,
      "speed": 1,
      "outModes": { "default": "none" },
      "gravity": { "enable": true, "acceleration": 0.02 }
    },
    "collisions": {
      "enable": true,
      "mode": "fluid",
      "fluid": {
        "radius": 25,
        "stiffness": 0.8,
        "nearStiffness": 0.8,
        "restDensity": 3.5,
        "maxNeighbors": 64,
        "maxForce": 3
      }
    }
  }
}
```
