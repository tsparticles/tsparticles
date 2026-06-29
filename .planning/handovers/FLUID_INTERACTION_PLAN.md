# Fluid Particle Interaction — v4 Deep Technical Specification

## Status

Implementation v3 was completed, built, integrated into `@tsparticles/all` + demo, and **fully reverted**.
The code did not produce fluid-like behavior under any parameter configuration.

**This document is the v4 plan incorporating all lessons from v3.**

---

## Table of Contents

0. [v3 Retrospective: root cause analysis](#0-v3-retrospective-root-cause-analysis)
1. [Reference code line-by-line mapping](#1-reference-code-line-by-line-mapping)
2. [DDR algorithm — complete math specification](#2-ddr-algorithm--complete-math-specification)
3. [Per-frame lifecycle — timing window analysis](#3-per-frame-lifecycle--timing-window-analysis)
4. [Velocity feedback loop analysis](#4-velocity-feedback-loop-analysis)
5. [Memory layout and allocations](#5-memory-layout-and-allocations)
6. [Spatial hash grid integration](#6-spatial-hash-grid-integration)
7. [Failure mode catalog and mitigations](#7-failure-mode-catalog-and-mitigations)
8. [Integration matrix with existing systems](#8-integration-matrix-with-existing-systems)
9. [File-by-file specification](#9-file-by-file-specification)
10. [Testing strategy](#10-testing-strategy)
11. [Implementation checklist](#11-implementation-checklist)
12. [Acceptance criteria](#12-acceptance-criteria)

---

## 0. v3 Retrospective: root cause analysis

### 0.1 What was implemented

| Component | v3 Status | Why insufficient |
|-----------|----------|-----------------|
| DDR solver (density→pressure→displacement) | ✅ | Single-pass G-S with no velocity feedback |
| Boundary spring (added retroactively) | ✅ | Not tested together with the rest |
| Velocity reconstruction in reset()+interact() (added retroactively) | ✅ | Not tested together with the rest |
| Integration in all bundle + demo | ✅ | — |
| Configurable options | ✅ | — |

### 0.2 Why it failed: 5 independent bugs, each lethal

#### Bug #1 — No velocity reconstruction in the baseline

v3 assumed DDR was "position-only like particle repulse". This analogy is **wrong** for a fundamental reason:

Particle repulse modifies `p2.position` ONCE (when the mouse moves). The next frame, without mouse input, nothing happens. DDR must CORRECT positions EVERY FRAME because MovePlugin re-applies the old velocity every frame.

Without velocity reconstruction:
```
Frame N:
  MovePlugin: pos += vel_old        → pos = A
  DDR:        position corrected    → pos = B (where B = A + correction)
  vel = vel_old                     ← NOT updated!

Frame N+1:
  MovePlugin: pos += vel_old        → pos = (B + leftover_from_previous_frame_vel + vel_old)
                                     = (B + something_that_undoes_DDR_correction)
  DDR: correct again                → infinite fight, jitter
```

This is NOT analogous to repulse, because repulse is a discrete event, not sustained physics.

#### Bug #2 — Missing `q` factor in displacement formula

Reference code:
```javascript
// In density accumulation loop:
particles_vxl[pn] = (vx / vlen) * q    // = dir * q

// In displacement loop:
var dx = particles_vxl[np] * p * 0.5   // = dir * q * P * 0.5
var dy = particles_vyl[np] * p * 0.5
```

The complete formula:
```
dx = (vx / dist) * q * (P + Pnear * q) * 0.5
   = dir * q * (P + Pnear * q)
```

The `q` factor has a crucial PHYSICAL role: it makes displacement go SMOOTHLY to zero as `dist → radius`. Without `q`:
- At `dist = radius * 0.99`, q ≈ 0.01 but without the q factor the force is still `(P + Pnear * q)` ≈ P
- This creates a force step at the interaction radius boundary
- Particles "bounce" at the radius boundary instead of sliding smoothly

With `q`: when dist ≈ radius, q ≈ 0, so `dir * q * (P + Pnear * q) ≈ 0` — smooth transition.
Without `q`: when dist ≈ radius, force is still `dir * P` — discontinuity.

v3 used `dir * (P + Pnear * q) * 0.5` (without the first q). This is a mathematical bug.

#### Bug #3 — Boundary handling delegated to outModes

| outModes | What it does | Why it fails for fluid |
|----------|-------------|------------------------|
| `"bounce"` | Reverses velocity on wall contact | Particles bounce away, NEVER pool. A fluid does not bounce — it settles. |
| `"clamp"` | Truncates position at boundary | Dry clamp = overlap. Particle reaches wall, clamp stops it, but DDR doesn't know about the clamp. Next frame gravity pushes again, clamp stops again → accumulation. |
| `"none"` | Lets particles escape | Particles leave the canvas |

The reference code does NOT use outModes. It uses soft spring + hard clamp INSIDE pass2:

```javascript
// Soft spring:
if (py > screen.height - r2) {
  var q = 1 - Math.abs((screen.height - py) / r2);
  particles_y[n] -= q * q * 0.5;  // push UPWARD
}

// Hard clamp (AFTER spring):
if (py > screen.height - r2) particles_y[n] = screen.height - r2;
```

The soft spring creates a "cushion wall" that accumulates particles: gravity pushes them down, spring pushes them up, DDR spreads them horizontally. The equilibrium between these three forces creates the fluid pool.

outModes cannot replicate this behavior because it is a purely kinematic system (velocity → position), not a force-based system.

#### Bug #4 — No per-particle state (no prevPos)

Velocity reconstruction requires saving the pre-advection position. Without `prevPos`:
```
Frame N:
  pos_pre_advection = ?             ← not saved anywhere
  MovePlugin: pos = pos + vel       ← position updated
  DDR: position corrected
  vel = (pos - ?) / speed           ← impossible, prevPos doesn't exist
```

The only alternative would be reading `pos` BEFORE MovePlugin modifies it, but ParticlesManager calls `particleReset` (where we can save) BEFORE `particleUpdate` (MovePlugin). So the mechanism exists — just needs to be used.

v3 didn't use it because the architectural decision was "no per-particle state".

#### Bug #5 — Lack of cohesion

These 4 bugs together prevented any fluid-like behavior. This is not a matter of "wrong parameters": even with perfect parameters, without velocity reconstruction, without the q factor, and without boundaries, the fluid cannot form.

---

## 1. Reference code line-by-line mapping

### 1.1 The original code (Grant Kot)

```javascript
const doublePI = Math.PI * 2,
  hdrFactor = 400 / 203;  // display-p3 HDR color scaling — irrelevant for physics

var rad = 30;        // interaction radius (pixels)
var maxParticles = 2000;
var nParticles = 0;

// Buffer layout: 10 arrays * 8 bytes * maxParticles
// particles_x, particles_y          → current position
// particles_pprevx, particles_pprevy → pre-advection position (prevPos)
// particles_velx, particles_vely     → velocity
// particles_vxl, particles_vyl       → temporary buffer for neighbor displacement
// particles_q                        → temporary buffer for q values

function pass1(n) {
  // 1. Insert into spatial grid
  // 2. Mouse interaction (velocity impulse)
  // 3. Gravity: particles_vely[n] += 0.01
  // 4. Save prevPos: pprev = pos
  // 5. Advection: pos += vel
}

function pass2(n) {
  // 1. Query neighbors from grid
  // 2. Density accumulation (ρ += q², ρ̃ += q³)
  // 3. Pressure: P = (ρ - 3) * 0.5, Pnear = ρ̃ * 0.5
  // 4. Boundary: soft spring + hard clamp
  // 5. Displacement: dx = dir * q * (P + Pnear * q) * 0.5
}

function pass3(n) {
  // 1. Velocity reconstruction: vel = pos - pprev
  // 2. Draw particle
}
```

### 1.2 Mapping to tsparticles

```
Reference pass1:
  gravity → vel → pos advection
  save prevPos

  ↓

tsparticles Phase 1:
  MovePlugin.particleUpdate():
    vel.y += gravity * deltaFactor / (60 * moveSpeed)    ← gravity
    position += vel * moveSpeed * reduceFactor * zFactor  ← advection
  Fluider.reset():
    fluidPrevPos = position.clone()                       ← save prevPos
```

Note: `reset()` in Fluider is called BEFORE `particleUpdate` (MovePlugin) because the order in ParticlesManager Phase 1 is:
```
line 665: particleReset plugins    → InteractionManager.reset(particle) → Fluider.reset()
line 669: particleUpdate plugins   → MovePlugin.particleUpdate()
```

So `reset()` saves the PRE-advection position. Same as the reference.

```
Reference pass2:
  neighbors grid query
  density accumulation
  boundary soft spring + hard clamp
  displacement

  ↓

tsparticles Phase 2 (postParticleUpdate):
  Fluider.interact(particle, data, delta):
    grid.queryCircle()                    ← neighbors
    density accumulation                  ← ρ, ρ̃
    P = (ρ - restDensity) * stiffness * 0.5
    Pnear = ρ̃ * nearStiffness * 0.5
    boundary soft spring + hard clamp
    displacement: dir * q * (P + Pnear * q) * 0.5
```

```
Reference pass3:
  vel = pos - pprev
  draw particle

  ↓

tsparticles Phase 2 (same interact() call):
  vel = (pos - fluidPrevPos) / effectiveSpeed
  (draw is separate, handled by RenderManager)
```

### 1.3 Equivalence table

| Operation | Reference | tsparticles | Order | Same result? |
|-----------|-----------|-------------|-------|-------------|
| Gravity | pass1: `vel += 0.01` | Phase1: `vel.y += gravity * deltaFactor / (60 * speed)` | Same (before advection) | ✅ |
| Advection | pass1: `pos += vel` | Phase1: `position += vel * speed * ...` | Same (after gravity) | ✅ |
| Save prevPos | pass1: `pprev = pos` | Phase1 reset(): `fluidPrevPos = pos` | Same (before advection) | ✅ |
| DDR | pass2 | Phase2 interact() | Same (after advection) | ✅ |
| Boundary | pass2 | Phase2 interact() | Same (after density, before displacement) | ✅ |
| Velocity reconstruction | pass3: `vel = pos - pprev` | Phase2 interact(): `vel = (pos - prevPos) / speed` | Same (after DDR) | ✅ |
| Draw | pass3: `ctx.drawImage(...)` | RenderManager.drawParticle() | After all phases | ✅ |

---

## 2. DDR algorithm — complete math specification

### 2.1 Kernel density

The reference code uses two kernels:

**Quadratic kernel (density ρ)**:
```
ρᵢ = Σⱼ qᵢⱼ²    where qᵢⱼ = 1 - rᵢⱼ / h
```

Where `h = radius` and `rᵢⱼ = |posᵢ - posⱼ|`.

Properties:
- ρ = 0 when a particle has no neighbors (r > h)
- ρ increases quadratically when neighbors are close
- ρ → max when r → 0

**Cubic kernel (near-density ρ̃)**:
```
ρ̃ᵢ = Σⱼ qᵢⱼ³
```

Properties:
- Weighs VERY CLOSE neighbors much more heavily (q³ ≫ q² for q → 1)
- Creates strong local repulsion that prevents overlap
- This is the term that guarantees particles do not interpenetrate

### 2.2 Pressure

```
Pᵢ = k · (ρᵢ - ρ₀)    [hydrostatic pressure]
P̃ᵢ = k̃ · ρ̃ᵢ           [near-pressure anti-overlap]
```

Where:
- `k = stiffness` (default 0.5)
- `k̃ = nearStiffness` (default 0.5)
- `ρ₀ = restDensity` (default 3)

The reference uses hardcoded `0.5`. We use `k * 0.5` for consistency:
```
P = (ρ - ρ₀) * stiffness * 0.5
Pnear = ρ̃ * nearStiffness * 0.5
```

The `0.5` factor (half) scales the force for numerical stability. In the reference code it's hardcoded. We make it multiplicative relative to stiffness/nearStiffness.

### 2.3 Displacement force

```
Fᵢⱼ = dirᵢⱼ · qᵢⱼ · (Pᵢ + P̃ᵢ · qᵢⱼ) · 0.5
```

Where `dirᵢⱼ = (posⱼ - posᵢ) / |posⱼ - posᵢ|`.

Dimensional analysis of each factor:

| Factor | Role | Typical range |
|--------|------|---------------|
| `dirᵢⱼ` | Direction (from i to j) | [-1, 1] |
| `qᵢⱼ` | Kernel weight (0 to 1) | [0, 1] — goes to 0 smoothly as r→h |
| `Pᵢ + P̃ᵢ · qᵢⱼ` | Pressure intensity | [−maxForce, maxForce] |
| `0.5` | Symmetry factor | 0.5 — splits force between partners |

Why the EXTRA `qᵢⱼ` factor (not included in P̃ · q):

Expanded formula:
```
F = dir · q · (P + Pnear · q) · 0.5
  = dir · (q · P + q² · Pnear) · 0.5
```

If we remove the first q (like v3):
```
F_v3 = dir · (P + Pnear · q) · 0.5
```

Difference for various q values:
```
q=0.0 (r=h):     F_correct = 0,         F_v3 = dir · P · 0.5    ← DISCONTINUOUS!
q=0.5 (r=h/2):   F_correct = dir · (0.5P + 0.25Pnear) · 0.5
                 F_v3 = dir · (P + 0.5Pnear) · 0.5
q=1.0 (r=0):     F_correct = dir · (P + Pnear) · 0.5
                 F_v3 = dir · (P + Pnear) · 0.5                 ← same only here
```

The critical difference at q=0 (r=h): the correct formula gives F=0 (smooth transition), v3 gives F=dir·P·0.5 (discontinuity). This discontinuity at the interaction radius boundary causes bouncing, jitter, and prevents fluid cluster formation.

### 2.4 Symmetric displacement

Reference code:
```javascript
particles_x[np] += dx;
particles_y[np] += dy;
particles_x[n] -= dx;
particles_y[n] -= dy;
```

This guarantees momentum conservation: every displacement of one particle is balanced by an opposite displacement of the partner. The vector sum of all displacements is ZERO.

```
Δposᵢ = -Σⱼ dxᵢⱼ
Δposⱼ = +dxᵢⱼ

So Σᵢ Δposᵢ = 0   [total momentum conserved]
```

### 2.5 Boundary handling

Reference code (in pass2, AFTER density accumulation, BEFORE displacement):
```javascript
// Soft spring X
if (px < r2) {
  var q = 1 - Math.abs(px / r2);
  particles_x[n] += q * q * 0.5;    // shift rightward
} else if (px > screen.width - r2) {
  var q = 1 - Math.abs((screen.width - px) / r2);
  particles_x[n] -= q * q * 0.5;    // shift leftward
}

// Soft spring Y
if (py < r2) {
  var q = 1 - Math.abs(py / r2);
  particles_y[n] += q * q * 0.5;    // shift upward
} else if (py > screen.height - r2) {
  var q = 1 - Math.abs((screen.height - py) / r2);
  particles_y[n] -= q * q * 0.5;    // shift downward
}

// Hard clamp
if (px < r2) particles_x[n] = r2;
else if (px > screen.width - r2) particles_x[n] = screen.width - r2;
if (py < r2) particles_y[n] = r2;
else if (py > screen.height - r2) particles_y[n] = screen.height - r2;
```

Soft spring analysis:

`q = 1 - wallDistance / r2`

Where `wallDistance = |particlePos - wallPos|`, and `r2 = radius * 0.15`.

- When particlePos = wallPos (touching wall): q = 1, F = 1² * 0.5 = 0.5
- When particlePos = wallPos + r2 (at limit): q = 0, F = 0
- It is a NON-LINEAR force (q²) that grows quadratically as the wall is approached

Why `r2 = radius * 0.15`? With radius=30: r2=4.5px. The soft spring only acts within 4.5px of the wall. Beyond that, the wall is effectively invisible (for that frame).

The relationship between this value and the fluid interaction radius: interaction radius / ~6.67, empirically determined. It works because it places the "fluid accumulation zone" (at the bottom) within a distance comparable to the interaction radius, so particles at the base remain in contact with the fluid above.

### 2.6 Velocity reconstruction

Reference pass3:
```javascript
particles_velx[n] = particles_x[n] - particles_pprevx[n];
particles_vely[n] = particles_y[n] - particles_pprevy[n];
```

What `vel` represents after pass3:
```
vel = pos_DDR - pos_pre_advection
    = (pos_pre_advection + advection + gravity + DDR_correction) - pos_pre_advection
    = advection + gravity + DDR_correction
```

So `vel` now includes:
- The base movement component
- Gravity
- The DDR correction (including boundary + displacement)

When pass1 of the next frame does `pos += vel`:
```
pos_New = pos_Old + vel
        = pos_Old + (advection + gravity + previous_DDR_correction)
```

The PREVIOUS DDR correction is preserved because it was embedded in the velocity. This is the feedback loop.

In the tsparticles implementation, we must scale `vel` by MovePlugin's `moveSpeed` and `delta.factor`:

MovePlugin advects with:
```
moveSpeed = particle.retina.moveSpeed * sizeFactor * slowFactor * delta.factor * 0.5
velocity_for_advection = particle.velocity * moveSpeed * zFactor * reduceFactor
position += velocity_for_advection
```

So the relationship between `particle.velocity` and position displacement is:
```
displacement = particle.velocity * moveSpeed * zFactor * reduceFactor
```

For velocity reconstruction:
```
particle.velocity.x = displacement.x / (moveSpeed * zFactor * reduceFactor)
```

With `zFactor ≈ 1` for particles without z-index velocity rate, and `sizeFactor ≈ 1`, `slowFactor ≈ 1`:
```
effectiveSpeed = particle.retina.moveSpeed * delta.factor * 0.5 * container.retina.reduceFactor
particle.velocity.x = (particle.position.x - prevPos.x) / effectiveSpeed
```

NOTE: `container.retina.reduceFactor` is a variable factor depending on pixel ratio and resize. Used throughout the MovePlugin pipeline.

---

## 3. Per-frame lifecycle — timing window analysis

### 3.1 Exact timeline (microscopic)

```
Frame N:

  RenderManager.drawParticles(delta)
  │
  ├── clear() canvas
  │
  ├── particles.update(delta)
  │   │
  │   ├── grid.clear()
  │   │
  │   ├── plugin.update?.(delta)    [path generators update — irrelevant for fluid]
  │   │
  │   ├── Phase 1: FOR EACH particle (in array order):
  │   │   │
  │   │   ├── resizeFactor adjustment (rare)
  │   │   │
  │   │   ├── particleReset plugins
  │   │   │   └── InteractionManager.reset(particle)
  │   │   │       ├── externalInteractors[i].reset()     [noop for fluid]
  │   │   │       └── particleInteractors[i].reset()
  │   │   │           └── Fluider.reset(data, particle):
  │   │   │               if !particle.fluidPrevPos:
  │   │   │                   particle.fluidPrevPos = Vector.origin  (lazy init)
  │   │   │               particle.fluidPrevPos.setFrom(particle.position)
  │   │   │               // ↑ saves PRE-advection position
  │   │   │
  │   │   ├── particleUpdate plugins
  │   │   │   └── MovePluginInstance.particleUpdate(particle, delta):
  │   │   │       ├── applyPath(): path generator → particle.velocity
  │   │   │       ├── gravity: vel.y += gravity * deltaFactor / (60 * moveSpeed)
  │   │   │       ├── decay: vel.multTo(particle.moveDecay)
  │   │   │       ├── velocity = particle.velocity.mult(moveSpeed) * zFactor * reduceFactor
  │   │   │       └── position.addTo(velocity)
  │   │   │           // ↑ ADVECTION COMPLETE
  │   │   │
  │   │   └── grid.insert(particle)
  │   │       // ↑ particle now in spatial grid for queries
  │   │
  │   ├── plugin.postUpdate?.(delta)
  │   │   └── InteractionManager.externalInteract(delta)
  │   │       └── ExternalInteractors: repulse, attract, push, etc.
  │   │           // ↑ mouse/DOM interactions modify positions
  │   │
  │   ├── Phase 2: FOR EACH particle (in array order):
  │   │   │
  │   │   ├── particleUpdaters[i].update(particle, delta)
  │   │   │   // life, opacity, size, outModes, wobble, rotate, etc.
  │   │   │   // ↑ NO POSITION MODIFICATION (except wobble, but minimal)
  │   │   │
  │   │   └── postParticleUpdate plugins
  │   │       └── InteractionManager.particlesInteract(particle, delta)
  │   │           ├── externalInteractors[i].clear()
  │   │           └── particleInteractors[i].interact(particle, data, delta)
  │   │               └── Fluider.interact(particle, data, delta):
  │   │                   1. Read options from particle (lazy cache)
  │   │                   2. calcR2(): r2 = radius * 0.15
  │   │                   3. grid.queryCircle(position, radius) → neighbors array
  │   │                   4. Density accumulation loop
  │   │                   5. Pressure computation
  │   │                   6. Boundary soft spring + hard clamp
  │   │                   7. Displacement loop (apply to particle + neighbors)
  │   │                   8. Velocity reconstruction
  │   │                   // ↑ ALL DDR COMPLETE
  │   │
  │   └── Remove destroyed particles
  │
  └── Draw layers 0-7 (Particles layer draws via RenderManager)
```

### 3.2 Data validity windows

```
FLUID PREVPOS: valid from reset() (Phase 1) to interact() (Phase 2)
                = stable for the entire frame

SPATIAL GRID:  valid from grid.insert() (Phase 1) through Phase 2
                = contains ALL particles during interact()

NEIGHBORS DATA: valid only DURING interact() for the current particle
                = do not reuse between frames or different particles
```

### 3.3 Implications of Gauss-Seidel ordering

Since Phase 2 iterates particles in array order (spatial grid index order):
- Particle 0 interacts with particles 1..N (all in the grid)
- Particle 1 interacts with particles 2..N, BUT particle 0 may have already been displaced
- ...and so on

This is EXACTLY Gauss-Seidel: each particle sees displacements from already-processed particles. Convergence is faster than Jacobi (where all see original positions), but iteration order introduces a bias.

The bias is acceptable because:
1. Array order has no spatial correlation (nearby particles are not necessarily consecutive in the array)
2. Velocity reconstruction between frames "mixes" the order further
3. The system reaches a steady state after a few frames

---

## 4. Velocity feedback loop analysis

### 4.1 Loop dynamics

```
Frame N (momentum phase):
  pos_N[0] = pos_pre[0]
  vel_N[0] = vel_N-1[1] + gravity_N

  pos_N[1] = pos_pre[1] + vel_N[0] * speed    ← adv pos
  + DDR correction                             ← DDR
  vel_N[1] = (pos_N[1] - pos_pre[1]) / speed   ← vel reconstruction

Frame N+1 (momentum phase):
  pos_N+1[0] = pos_N+1_pre[0] = pos_N[1]      ← inherits corrected position
  vel_N+1[0] = vel_N[1] + gravity_N+1          ← inherits reconstructed velocity
  pos_N+1[1] = pos_N+1_pre[1] + vel_N+1[0] * speed
  + DDR correction
  vel_N+1[1] = (pos_N+1[1] - pos_N+1_pre[1]) / speed
```

The DDR correction propagates through `vel` (which is `pos_DDR - pos_pre`). When MovePlugin advects using `vel`, it is effectively applying the PREVIOUS FRAME'S DDR correction as the base velocity.

### 4.2 Why single-pass Gauss-Seidel converges

The "memory" of the correction is in the velocity. In the absence of external forces:
```
Frame 1: DDR displaces particles by +d. vel = d
Frame 2: advection displaces by +d. DDR detects they are now +d apart.
         If still too close, displaces by +d'. vel = d + d'
Frame 3: advection displaces by d + d'. DDR displaces by d''. vel = d + d' + d''
...
Converges when DDR correction is 0 → equilibrium positions reached
```

With gravity:
```
Frame 1: gravity accelerates by g. DDR displaces by d - g. vel = d - g
Frame 2: gravity accelerates by g. advection displaces by d - g + g = d.
         DDR displaces by d'. vel = d' - g + ...
```

Gravity is applied every frame, but the reconstructed velocity INCLUDES gravity. So next frame's advection reproduces the gravity-corrected movement from the previous frame. This is normal Euler integration behavior.

### 4.3 Comparison with traditional methods

| Method | Pressure propagation | Cost per frame |
|--------|---------------------|---------------|
| Jacobi multi-pass (N iterations) | N · radius per frame via multiple iterations | N · O(particles · neighbors) |
| Gauss-Seidel single-pass + vel reconstruction | radius per frame via velocity + multi-frame accumulation | O(particles · neighbors) |
| Position-based dynamics (PBD) | Instant via constraint projection | O(particles · constraints) |

Our approach has the same cost as pure single-pass Gauss-Seidel, but converges faster thanks to velocity feedback. For weakly compressible fluids, it is equivalent to 3-5 Jacobi iterations.

---

## 5. Memory layout and allocations

### 5.1 Data structures

**Per-particle (extending InteractivityParticle)**:
```typescript
export type FluidParticle = InteractivityParticle & {
  options: ParticlesFluidOptions;
  fluidPrevPos?: Vector;     // OPTIONAL, created lazily in reset()
};
```

`fluidPrevPos` is the ONLY per-particle state. Created in `reset()` when `isEnabled()` first returns true.

Cost: 1 Vector = 2 Float64 = 16 bytes per particle (typical particle size: ~300 bytes → +5%).

**Per-interactor (no per-frame allocations)**:
```typescript
export class Fluider extends ParticlesInteractorBase {
  #maxDistance: number = 0;
  // No temporary arrays — use grid.queryCircle() which returns a pre-allocated array

  get maxDistance(): number { return this.#maxDistance; }
}
```

**Temporary buffers**: grid.queryCircle() uses a range (Circle) with object pooling (SpatialHashGrid#query reuse). No critical allocations in the hot loop.

**Lazy initialization of fluidPrevPos**:
```typescript
reset(interactivityData: IInteractivityData, particle: FluidParticle): void {
  if (!particle.fluidPrevPos) {
    particle.fluidPrevPos = Vector.origin;  // Vector.origin = {x:0, y:0}, reusable
  }
  particle.fluidPrevPos.setFrom(particle.position);
  // setFrom = copy x,y without reallocation
}
```

`Vector.origin` is a static constant in `engine/src/Core/Utils/Vectors.ts`. `setFrom` copies values without allocation.

### 5.2 Zero allocations in the main loop

| Operation | Allocation | Notes |
|-----------|-----------|-------|
| grid.queryCircle() | 0 | Reuses grid's internal array |
| Density loop | 0 | Local variables, no neighbor array |
| Displacement loop | 0 | Same data as density loop, no intermediate storage |
| Boundary | 0 | Local variables |
| Velocity reconstruction | 0 | Direct assignment to particle.velocity |

Difference from reference code: the reference allocates `neighbors[]` for each particle (array of indices). We DO NOT need this array because we process neighbors in a single pass (two iterations on grid.queryCircle, no intermediate storage).

The reference has TWO loops on neighbors: one for density, one for displacement. This requires two arrays: `particles_vxl/vyl` and `particles_q` for neighbor data, and `neighbors[]` for indices.

We MERGE the two loops on the same query for both density and displacement:

```
For each neighbor (first iteration on query):
  1. Accumulate density (ρ += q², ρ̃ += q³)
  (do NOT apply displacement yet)

After density: compute P, Pnear

NEW LOOP on the same query (second iteration):
  2. Recompute q, dir
  3. Apply displacement: dir * q * (P + Pnear * q) * 0.5
```

This means TWO iterations on the grid query. Double the cost but ZERO allocations.

Alternative: use `Float64Array` as buffer like the reference code? No — we don't have a buffer pool and creating one per-frame would cost allocations.

So: two iterations on the query. Grid query is on spatial hash, O(neighbors) per particle. Double is still O(neighbors), with a 2x factor.

For N=400, avg neighbors ≈ π·30² / (canvas/density) ≈ 25, two loops = 50 ops per particle = 20k ops/frame. Negligible.

### 5.3 Lazy strategy for fluid data

```typescript
interact(particle: FluidParticle, _interactivityData: IInteractivityData, delta: IDelta): void {
  const fluidOpt = particle.options.fluid;
  if (!fluidOpt?.enable) return;

  // Cache on the particle (optional, avoids getRangeValue every frame)
  if (!particle.fluidData) {
    particle.fluidData = {
      radius: getRangeValue(fluidOpt.radius),
      stiffness: getRangeValue(fluidOpt.stiffness),
      nearStiffness: getRangeValue(fluidOpt.nearStiffness),
      restDensity: getRangeValue(fluidOpt.restDensity),
      maxNeighbors: getRangeValue(fluidOpt.maxNeighbors),
      maxForce: getRangeValue(fluidOpt.maxForce),
    };
  }

  const data = particle.fluidData!;
  // ... use data.radius, data.stiffness, etc.
}
```

`FluidData` is a non-optional interface, lazily initialized and never recreated. RangeValue resolved once.

---

## 6. Spatial hash grid integration

### 6.1 How the query works

`Engine/src/Core/Utils/SpatialHashGrid.ts`:
```typescript
queryCircle(position: ICoordinates, radius: number, check?: (particle: Particle) => boolean): Particle[] {
  const circle = RangePool.getCircle(position, radius);
  // circle = { position, radius, type: "circle" }
  return this.query(circle, check);
}
```

`RangePool` is an object pool that avoids allocations. `query()` iterates intersecting cells and tests each particle.

In our case:
```typescript
const query = container.particles.grid.queryCircle(p1Pos, data.radius) as FluidParticle[];
```

`query` is a reusable array from the grid's internal pool. **We cannot keep the reference** — the content may be overwritten on the next query or frame.

### 6.2 Why it works in Phase 2

In Phase 1, all active particles are inserted into the grid (line 683 of `ParticlesManager.ts`). When Phase 2 starts, the grid contains ALL particles with their updated positions (post-advection).

So `queryCircle()` in Phase 2 finds all valid neighbors.

### 6.3 Max distance

`maxDistance` is a property on `ParticlesInteractorBase` that the interaction system uses to determine the grid's optimal cell size. It should be set to the maximum interaction radius.

```typescript
get maxDistance(): number {
  return this.#maxDistance;
}

// In interact(), when reading options for the first time:
if (data.radius > this.#maxDistance) {
  this.#maxDistance = data.radius;
}
```

---

## 7. Failure mode catalog and mitigations

### 7.1 NaN / Infinity

| Cause | Where it happens | Mitigation |
|-------|-----------------|------------|
| Division by distance = 0 | `dir = (vx/dist, vy/dist)` | `if (dist < epsilon) continue` |
| Division by effectiveSpeed = 0 | Velocity reconstruction | `if (effectiveSpeed > epsilon) vel = displacement / effectiveSpeed` |
| effectiveSpeed NaN | delta.factor = 0 or reduceFactor = 0 | Minimum clamp |
| Excessive displacement force | `dx = dir * q * force * 0.5` with giant P | `clamp(force, -maxForce, maxForce)` |

General: after interact(), validation:
```typescript
if (!isFinite(particle.position.x)) particle.position.x = 0;
if (!isFinite(particle.position.y)) particle.position.y = 0;
```

### 7.2 Particles leaving the canvas

| Scenario | Cause | Mitigation |
|----------|-------|------------|
| Gravity + boundary fails | Soft spring not strong enough | Hard clamp is MANDATORY after soft spring |
| outModes interference | outModes !== "none" moves particles | Document that outModes: "none" is required |
| External repulse pushes out | Mouse pushes particle beyond edge | Boundary clamp after external interactions (not controllable — document) |

Recommendation: the soft spring uses `0.5 * q²` but if gravity is very high, a higher coefficient might be needed. Document that if particles leave the canvas, increase gravity acceleration or reduce move speed.

### 7.3 Jitter (vibrating particles)

| Cause | Diagnosis | Solution |
|-------|-----------|----------|
| maxForce too high | Force clamped too late | Lower maxForce |
| restDensity too high | ρ ≫ ρ₀, P huge, particles explode | Lower restDensity or raise stiffness |
| stiffness too high | Correction too violent | Lower stiffness |
| Too few neighbors | ρ too low, P < 0, particles collapse | Increase radius or particle count |
| MovePlugin speed too high | Advection moves too far before DDR corrects | Speed 1-3 recommended |

### 7.4 Performance degradation

| Scenario | Cause | Mitigation |
|----------|-------|------------|
| Large N, large radius | O(N · neighbors) explosion | maxNeighbors cap |
| Many particles at same position (emitter burst) | ρ huge, P huge, explosive forces | `spawning` skip + maxForce clamp |
| queryCircle slow | Too many cells to iterate | maxDistance limits grid cell size |

### 7.5 Bottom overlap — in-depth analysis

The specific problem the user reports: particles overlapping at the bottom of the canvas.

**Why it happens in systems without correct DDR**:
1. Gravity pushes particles downward
2. Clamp/bounce stops them at the edge (outModes: bounce or clamp)
3. More particles arrive and stop ON TOP
4. Gravity presses all particles down → they all stack in the same pixel row
5. DDR tries to separate them but clamp pushes them back down → overlap

**Why it does NOT happen in the reference code**:
1. Soft spring at bottom: when a particle is within 4.5px of the edge, it receives an upward force
2. Gravity and spring balance out: the particle settles at an equilibrium distance from the edge
3. DDR spreads particles horizontally: the vertical force is balanced, nearby particles push each other sideways
4. Final hard clamp: if something (e.g. DDR-pushed particle) pushes below r2, the clamp returns it to r2

The static equilibrium at the bottom is:
```
gravity_force - soft_spring_force_sum + DDR_pressure_vertical_component = 0
```

Where `soft_spring_force = q² * 0.5` (with q = 1 - wallDistance/r2) grows quadratically as the wall is approached. Particles arrange themselves at different distances from the wall depending on how many there are (hydrostatic pressure). Those lower down feel more gravity + more weight from particles above, so they get closer to the wall before the spring balances them out.

---

## 8. Integration matrix with existing systems

### 8.1 MovePlugin

| Property | Relationship |
|----------|-------------|
| move.speed | Must be 1-3. Speed > 5 causes too much advection before DDR corrects → jitter |
| move.gravity | Required for fluid pooling. Typical acceleration: 0.005-0.05 |
| move.outModes | MUST be `"none"` (or any mode that does NOT modify position). If outModes bounce/clamp, conflict with fluid boundary handling |
| move.decay | 1 (no decay). Decay < 1 slows particles, killing fluid dynamics |
| move.direction | Not relevant (overwritten by DDR) |
| move.path | Compatible but NOT recommended — path generator modifies velocity, DDR reconstructs it, potential conflict |

**Test case**: Speed=1, Gravity=0.01, outModes=none, 400 particles, radius=30 → visible fluid pool within 3 seconds.

### 8.2 Collisions plugin

| Scenario | Effect | Recommendation |
|----------|--------|---------------|
| Fluid + collisions (bounce) | Both push particles → over-constraint | Not recommended. If needed, use collisions.mode = "absorb" for merging particles |
| Fluid + collisions (absorb) | Compatible. Fluid maintains density, absorb removes close particles | OK, but watch particle count decreasing |
| Fluid + collisions (destroy) | Destroys particles, count decreases | Not recommended |

In general: DDR already handles incompressibility. Collisions adds bounce/absorb/destroy that duplicate the logic. `collisions.enable = false` recommended.

### 8.3 Links plugin

| Scenario | Effect |
|----------|--------|
| Fluid + links | Compatible. Links draws connections between nearby particles, DDR keeps them at fluid distance |

Links does not modify positions (rendering only), so no conflict.

### 8.4 Particle-particle repulse

| Scenario | Effect | Recommendation |
|----------|--------|---------------|
| Fluid + repulse | Both push particles apart → over-constraint | Not recommended. DDR + repulse together push too much |

### 8.5 External repulse

| Scenario | Effect |
|----------|--------|
| Mouse repulse + fluid | Mouse pushes particles, DDR reacts by distributing pressure. Natural fluid viscosity dampens the effect |

This is exactly the desired behavior. The reference code implements mouse push INSIDE pass1 (modifies velocity). With external repulse, the modification is to position (in postUpdate between Phase 1 and 2). The difference:

Reference: mouse modifies velocity → advection + DDR in current frame → pressure distribution
External repulse: mouse modifies position → DDR in current frame → pressure distribution

Similar result, but the reference gives a more "impulsive" effect (pushes velocity, which then advects). External repulse gives a more "magnetic" effect (directly moves position). Both work for fluid interaction.

### 8.6 Emitters

| Scenario | Effect |
|----------|--------|
| Emitter + fluid | Spawned particles have `spawning = true`. Fluider skips these → not processed until next frame |

Particles with `spawning = true` are skipped by DDR for one frame, giving them time to "settle" after creation. This prevents explosive forces when an emitter burst creates 10 particles at the same position.

### 8.7 Wobble updater

| Scenario | Effect |
|----------|--------|
| move.wobble + fluid | Wobble modifies position.x/y in Phase 2 updaters (BEFORE interact). DDR then corrects. Wobble effect is partially canceled by DDR |

Wobble can be used to add micro-turbulence to the fluid, but the effect is attenuated by DDR. Not recommended for realistic fluid simulation.

---

## 9. File-by-file specification

### 9.1 `package.json`

```json
{
  "name": "@tsparticles/interaction-particles-fluid",
  "version": "4.4.0",
  "description": "tsParticles fluid particle interaction — double density relaxation for incompressible fluid behavior",
  "homepage": "https://particles.js.org",
  "scripts": {
    "build": "tsparticles-build",
    "version": "tsparticles-build -d && git add package.dist.json && tsparticles-build -p -l && git add .",
    "prepack": "pnpm run build"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/tsparticles/tsparticles.git",
    "directory": "interactions/particles/fluid"
  },
  "keywords": [
    "front-end", "frontend", "tsparticles", "particles", "particle",
    "canvas", "animation", "web", "html5", "css3",
    "tsparticles-interaction", "interaction", "fluid", "simulation",
    "liquid", "physics", "ddr", "double-density-relaxation"
  ],
  "author": "Matteo Bruni <matteo.bruni@me.com>",
  "license": "MIT",
  "bugs": { "url": "https://github.com/tsparticles/tsparticles/issues" },
  "funding": [
    { "type": "github", "url": "https://github.com/sponsors/matteobruni" },
    { "type": "github", "url": "https://github.com/sponsors/tsparticles" },
    { "type": "buymeacoffee", "url": "https://www.buymeacoffee.com/matteobruni" }
  ],
  "prettier": "@tsparticles/prettier-config",
  "files": ["dist"],
  "sideEffects": false,
  "browser": "dist/browser/index.js",
  "main": "dist/cjs/index.js",
  "module": "dist/esm/index.js",
  "types": "dist/types/index.d.ts",
  "exports": {
    ".": {
      "types": "./dist/types/index.d.ts",
      "browser": "./dist/browser/index.js",
      "import": "./dist/esm/index.js",
      "require": "./dist/cjs/index.js",
      "default": "./dist/esm/index.js"
    },
    "./lazy": {
      "types": "./dist/types/index.lazy.d.ts",
      "browser": "./dist/browser/index.lazy.js",
      "import": "./dist/esm/index.lazy.js",
      "require": "./dist/cjs/index.lazy.js",
      "default": "./dist/esm/index.lazy.js"
    },
    "./package.json": "./dist/package.json"
  },
  "peerDependencies": {
    "@tsparticles/engine": "workspace:*",
    "@tsparticles/plugin-interactivity": "workspace:*"
  },
  "devDependencies": {
    "@tsparticles/cli-build": "workspace:*",
    "@tsparticles/engine": "workspace:*",
    "@tsparticles/plugin-interactivity": "workspace:*"
  },
  "publishConfig": {
    "access": "public",
    "directory": "dist",
    "linkDirectory": true
  },
  "type": "module"
}
```

### 9.2 `src/Options/Interfaces/IFluid.ts`

```typescript
import type { RangeValue } from "@tsparticles/engine";

export interface IFluid {
  /**
   * Enable fluid interaction
   * @default false
   */
  enable: boolean;

  /**
   * Interaction radius in pixels.
   * Controls how far particles look for neighbors.
   * Larger radius = smoother fluid but more expensive.
   * Recommended: 20-50
   * @default 30
   */
  radius: RangeValue;

  /**
   * Pressure stiffness k.
   * Controls how strongly the fluid resists compression.
   * Higher = stiffer fluid (less compressible).
   * Too high leads to jitter/explosion.
   * Recommended: 0.3-1.0
   * @default 0.5
   */
  stiffness: RangeValue;

  /**
   * Near-pressure stiffness k̃.
   * Controls local anti-overlap force (cubic kernel).
   * Higher = stronger particle separation at close range.
   * Recommended: 0.3-1.0
   * @default 0.5
   */
  nearStiffness: RangeValue;

  /**
   * Rest density ρ₀.
   * Target neighbor density. Higher = more compressed fluid (particles closer).
   * Density ρ at a particle counts how many neighbors are within radius,
   * weighted by the quadratic kernel (q²).
   * For evenly spaced particles with radius 30: ρ ≈ 3-5.
   * Recommended: 2-5
   * @default 3
   */
  restDensity: RangeValue;

  /**
   * Maximum neighbors to process per particle per frame.
   * Safety cap to prevent O(N²) in dense regions.
   * @default 64
   */
  maxNeighbors: RangeValue;

  /**
   * Maximum force clamp for displacement.
   * Prevents numerical explosions.
   * Recommended: 1.0-5.0
   * @default 2.5
   */
  maxForce: RangeValue;
}
```

### 9.3 `src/Options/Classes/Fluid.ts`

```typescript
import {
  type IOptionLoader,
  type RangeValue,
  type RecursivePartial,
  ValueWithRandom,
  isNull,
  loadProperty,
  loadRangeProperty,
} from "@tsparticles/engine";
import type { IFluid } from "../Interfaces/IFluid.js";

export class Fluid extends ValueWithRandom implements IFluid, IOptionLoader<IFluid> {
  enable = false;
  radius: RangeValue = 30;
  stiffness: RangeValue = 0.5;
  nearStiffness: RangeValue = 0.5;
  restDensity: RangeValue = 3;
  maxNeighbors: RangeValue = 64;
  maxForce: RangeValue = 2.5;

  override load(data?: RecursivePartial<IFluid>): void {
    super.load(data);

    if (isNull(data)) return;

    loadProperty(this, "enable", data.enable);
    loadRangeProperty(this, "radius", data.radius);
    loadRangeProperty(this, "stiffness", data.stiffness);
    loadRangeProperty(this, "nearStiffness", data.nearStiffness);
    loadRangeProperty(this, "restDensity", data.restDensity);
    loadRangeProperty(this, "maxNeighbors", data.maxNeighbors);
    loadRangeProperty(this, "maxForce", data.maxForce);
  }
}
```

### 9.4 `src/Types.ts`

```typescript
import type {
  IInteractivityParticlesOptions,
  InteractivityParticle,
  InteractivityParticlesOptions,
} from "@tsparticles/plugin-interactivity";
import type { Fluid } from "./Options/Classes/Fluid.js";
import type { IFluid } from "./Options/Interfaces/IFluid.js";
import type { Vector } from "@tsparticles/engine";

export type IParticlesFluidOptions = IInteractivityParticlesOptions & {
  fluid?: IFluid;
};

export type ParticlesFluidOptions = InteractivityParticlesOptions & {
  fluid?: Fluid;
};

export type FluidParticle = InteractivityParticle & {
  options: ParticlesFluidOptions;
  /** Previous frame position for velocity reconstruction. Set in reset(), used in interact() */
  fluidPrevPos?: Vector;
  /** Cached fluid interaction data (RangeValue resolved once). Undefined until first interact() call. */
  fluidData?: FluidDataCache | undefined;
};

export interface FluidDataCache {
  radius: number;
  stiffness: number;
  nearStiffness: number;
  restDensity: number;
  maxNeighbors: number;
  maxForce: number;
}
```

### 9.5 `src/Fluider.ts` — complete implementation

```typescript
import type { IFluidParticlesOptions, FluidParticle, FluidDataCache } from "./Types.js";
import { Fluid } from "./Options/Classes/Fluid.js";
import {
  clamp,
  getRangeValue,
  identity,
  isNull,
  loadOptionProperty,
  type RecursivePartial,
  Vector,
} from "@tsparticles/engine";
import {
  type InteractivityContainer,
  type IInteractivityData,
  type IDelta,
  ParticlesInteractorBase,
} from "@tsparticles/plugin-interactivity";

const epsilon = 1e-6;
const half = 0.5;
const wallSpringCoeff = 0.5;
const wallMarginFactor = 0.15;
const pressureHalf = 0.5;
const minSpeed = 1e-10;

export class Fluider extends ParticlesInteractorBase {
  #maxDistance: number;

  constructor(container: InteractivityContainer) {
    super(container);
    this.#maxDistance = 0;
  }

  get maxDistance(): number {
    return this.#maxDistance;
  }

  clear(): void {
    // noop
  }

  init(): void {
    // noop
  }

  reset(_interactivityData: IInteractivityData, particle: FluidParticle): void {
    if (!this.#isFluidEnabled(particle)) return;

    if (!particle.fluidPrevPos) {
      particle.fluidPrevPos = Vector.origin;
    }
    // Save PRE-advection position (called before MovePlugin)
    particle.fluidPrevPos.setFrom(particle.position);
  }

  interact(particle: FluidParticle, _interactivityData: IInteractivityData, delta: IDelta): void {
    if (!this.#isFluidEnabled(particle)) return;

    const opts = this.#getOrCreateCache(particle);
    const pos = particle.getPosition();
    const radius = opts.radius;
    const r2 = radius * wallMarginFactor;

    // 1. Query neighbors
    const neighbors = this.container.particles.grid.queryCircle(
      pos, radius
    ) as FluidParticle[];

    const maxN = opts.maxNeighbors;

    // 2. Density accumulation (first pass)
    let density = 0;
    let nearDensity = 0;
    let neighborCount = 0;

    for (const other of neighbors) {
      if (other === particle || other.destroyed || other.spawning) continue;

      const dx = other.position.x - pos.x;
      const dy = other.position.y - pos.y;
      const distSq = dx * dx + dy * dy;

      if (distSq >= radius * radius || distSq < epsilon * epsilon) continue;

      const dist = Math.sqrt(distSq);
      const q = identity - dist / radius;

      density += q * q;
      nearDensity += q * q * q;

      neighborCount++;
      if (neighborCount >= maxN) break;
    }

    // 3. Pressure computation (with half factor like reference)
    const P = (density - opts.restDensity) * opts.stiffness * pressureHalf;
    const Pnear = nearDensity * opts.nearStiffness * pressureHalf;

    // 4. Boundary soft spring (before displacement, matches reference)
    const canvasSize = this.container.canvas.size;
    const w = canvasSize.width;
    const h = canvasSize.height;

    if (pos.x < r2) {
      const qw = identity - Math.abs(pos.x / r2);
      pos.x += qw * qw * wallSpringCoeff;
    } else if (pos.x > w - r2) {
      const qw = identity - Math.abs((w - pos.x) / r2);
      pos.x -= qw * qw * wallSpringCoeff;
    }
    if (pos.y < r2) {
      const qw = identity - Math.abs(pos.y / r2);
      pos.y += qw * qw * wallSpringCoeff;
    } else if (pos.y > h - r2) {
      const qw = identity - Math.abs((h - pos.y) / r2);
      pos.y -= qw * qw * wallSpringCoeff;
    }

    // 5. Displacement (second pass on neighbors)
    //    Correct formula: dir * q * (P + Pnear * q) * 0.5
    const maxForce = opts.maxForce;
    neighborCount = 0;

    for (const other of neighbors) {
      if (other === particle || other.destroyed || other.spawning) continue;

      const dx = other.position.x - pos.x;
      const dy = other.position.y - pos.y;
      const distSq = dx * dx + dy * dy;

      if (distSq >= radius * radius || distSq < epsilon * epsilon) continue;

      const dist = Math.sqrt(distSq);
      const q = identity - dist / radius;
      const force = clamp(P + Pnear * q, -maxForce, maxForce);
      const dirX = dx / dist;
      const dirY = dy / dist;

      // dir * q * force * 0.5  ← the EXTRA q factor missing in v3
      const dx2 = dirX * q * force * half;
      const dy2 = dirY * q * force * half;

      // Symmetric displacement (momentum conserving)
      other.position.x += dx2;
      other.position.y += dy2;
      pos.x -= dx2;
      pos.y -= dy2;

      neighborCount++;
      if (neighborCount >= maxN) break;
    }

    // 6. Hard clamp boundary (AFTER displacement, matches reference)
    if (pos.x < r2) pos.x = r2;
    else if (pos.x > w - r2) pos.x = w - r2;
    if (pos.y < r2) pos.y = r2;
    else if (pos.y > h - r2) pos.y = h - r2;

    // 7. Velocity reconstruction (MISSING in v3 — primary cause of failure)
    const prevPos = particle.fluidPrevPos;
    if (prevPos) {
      const moveSpeed = particle.retina.moveSpeed;
      const deltaFactor = delta.factor || identity;
      const reduceFactor = this.container.retina.reduceFactor;
      const effectiveSpeed = Math.max(moveSpeed * deltaFactor * half * reduceFactor, minSpeed);

      particle.velocity.x = (pos.x - prevPos.x) / effectiveSpeed;
      particle.velocity.y = (pos.y - prevPos.y) / effectiveSpeed;
    }
  }

  isEnabled(particle: FluidParticle): boolean {
    return particle.options.fluid?.enable ?? false;
  }

  loadParticlesOptions(
    options: ParticlesFluidOptions,
    ...sources: (RecursivePartial<IParticlesFluidOptions> | undefined)[]
  ): void {
    loadOptionProperty(options, "fluid", Fluid, ...sources);
  }

  #isFluidEnabled(particle: FluidParticle): boolean {
    return !particle.destroyed && !particle.spawning && (particle.options.fluid?.enable ?? false);
  }

  #getOrCreateCache(particle: FluidParticle): FluidDataCache {
    if (particle.fluidData) return particle.fluidData;

    const opt = particle.options.fluid!;
    const cache: FluidDataCache = {
      radius: getRangeValue(opt.radius),
      stiffness: getRangeValue(opt.stiffness),
      nearStiffness: getRangeValue(opt.nearStiffness),
      restDensity: getRangeValue(opt.restDensity),
      maxNeighbors: getRangeValue(opt.maxNeighbors),
      maxForce: getRangeValue(opt.maxForce),
    };

    if (cache.radius > this.#maxDistance) {
      this.#maxDistance = cache.radius;
    }

    particle.fluidData = cache;
    return cache;
  }
}
```

### 9.6 `src/index.ts`

```typescript
import { type InteractivityEngine, ensureInteractivityPluginLoaded } from "@tsparticles/plugin-interactivity";
import { type Engine } from "@tsparticles/engine";
import { Fluider } from "./Fluider.js";

declare const __VERSION__: string;

export async function loadParticlesFluidInteraction(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.pluginManager.register((e: InteractivityEngine) => {
    ensureInteractivityPluginLoaded(e);

    e.pluginManager.addInteractor?.("particlesFluid", container => {
      return Promise.resolve(new Fluider(container));
    });
  });
}
```

### 9.7 `src/index.lazy.ts`

```typescript
import { type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

export async function loadParticlesFluidInteraction(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  const { Fluider } = await import("./Fluider.js");
  await (await import("@tsparticles/plugin-interactivity")).ensureInteractivityPluginLoaded(
    await engine.pluginManager.register((e) => {
      e.pluginManager.addInteractor?.("particlesFluid", container => {
        return Promise.resolve(new Fluider(container));
      });
    })
  );
}
```

### 9.8 `src/browser.ts`

```typescript
import { type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

export async function loadParticlesFluidInteraction(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  const { Fluider } = await import("./Fluider.js");
  const { ensureInteractivityPluginLoaded } = await import("@tsparticles/plugin-interactivity");

  await ensureInteractivityPluginLoaded(
    await engine.pluginManager.register((e) => {
      e.pluginManager.addInteractor?.("particlesFluid", container => {
        return Promise.resolve(new Fluider(container));
      });
    })
  );
}
```

### 9.9 tsconfig files

Identical to `collisions/` — extend `@tsparticles/tsconfig/dist/tsconfig.base.json`.

---

## 10. Testing strategy

### 10.1 Unit tests (Vitest + jsdom)

```
1. Fluider.isEnabled() → true/false based on fluid.enable
2. Fluider.reset() → fluidPrevPos saved correctly
3. Fluider.interact() → no NaN/Infinity in output
4. Density accumulation: single particle → density=0, no position modification
5. Two close particles (< radius) → symmetric displacement, momentum conserved
6. Two distant particles (> radius) → no interaction
7. Boundary soft spring → particle outside canvas returns after interact()
8. Boundary hard clamp → particle never goes beyond r2 from edge
9. Velocity reconstruction → particle.velocity updated after interact()
```

### 10.2 Visual tests (vanilla demo)

```
1. 400 particles, radius 30, stiffness 0.5, restDensity 3, gravity 0.01
   → visible fluid pool at bottom within 3 seconds
   → no visible overlap at bottom
   → particles uniformly distributed

2. 200 particles, radius 40, stiffness 0.3, gravity 0.005
   → "softer" fluid, wider waves

3. 600 particles, radius 25, stiffness 0.8, gravity 0.02
   → "denser" fluid, less compressible

4. Mouse repulse + fluid → pushing with mouse moves the fluid
   → after release, returns to equilibrium

5. Emitter + fluid → newly created particles do not cause explosions
```

### 10.3 Performance tests

```
1. 200 particles @ 60fps → < 2ms per frame (DDR only)
2. 400 particles @ 60fps → < 4ms per frame
3. 800 particles @ 30fps → acceptable on desktop
4. Zero allocations in main loop verified via Performance.memory
```

---

## 11. Implementation checklist

### Step 0 — Repository alignment
- [ ] Read AGENTS.md — pnpm + nx workspace rules
- [ ] Read `interactions/particles/collisions/` as exact template
- [ ] Build collisions: `pnpm nx build interaction-particles-collisions`
- [ ] Verify that naming `particlesFluid`, `@tsparticles/interaction-particles-fluid`, `loadParticlesFluidInteraction` is consistent

### Step 1 — Package skeleton
- [ ] `interactions/particles/fluid/package.json` (copy from collisions, change name/description)
- [ ] `interactions/particles/fluid/package.dist.json`
- [ ] Copy tsconfig.* from collisions
- [ ] `src/index.ts` — noop loader that registers Fluider
- [ ] `src/index.lazy.ts`
- [ ] `src/browser.ts`
- [ ] `src/Fluider.ts` — noop class extending ParticlesInteractorBase
- [ ] Build: `pnpm nx build interaction-particles-fluid`

### Step 2 — Options + Types
- [ ] `src/Options/Interfaces/IFluid.ts` — 7 fields
- [ ] `src/Options/Classes/Fluid.ts` — load() with loadProperty/loadRangeProperty
- [ ] `src/Types.ts` — FluidParticle, IParticlesFluidOptions, ParticlesFluidOptions, FluidDataCache
- [ ] Fluider.loadParticlesOptions() — loadOptionProperty
- [ ] Build

### Step 3 — DDR solver
- [ ] Fluider.reset() — save prevPos with lazy init
- [ ] Fluider.interact() — density accumulation (first loop only, verify ρ computed)
- [ ] Fluider.interact() — displacement loop (symmetric, momentum conserved)
- [ ] Fluider.interact() — velocity reconstruction
- [ ] Test: no NaN/Infinity

### Step 4 — Boundary + stabilization
- [ ] Fluider.interact() — soft spring X/Y
- [ ] Fluider.interact() — hard clamp X/Y
- [ ] Fluider.interact() — clamp(maxForce)
- [ ] Test: particles do not leave canvas
- [ ] Test: no overlap at bottom

### Step 5 — Demo integration
- [ ] demo/vanilla: add fluid preset
- [ ] demo/vanilla: script tag for loading the interaction
- [ ] Test recommended configuration

### Step 6 — Bundle integration
- [ ] `bundles/all/` — add `@tsparticles/interaction-particles-fluid` as dependency
- [ ] `bundles/all/src/index.ts` — import loadParticlesFluidInteraction
- [ ] Build all bundle: `pnpm nx build all`

---

## 12. Acceptance criteria

1. **Visible fluid behavior**: 400 particles with default config form a fluid pool at the bottom within ~3 seconds of load. Particles flow and move cohesively.

2. **Zero bottom overlap**: zooming in with browser zoom, no particle completely covers another. Particles are evenly spaced.

3. **Parameter stability**: changing stiffness (0.3-1.0), restDensity (2-5), radius (20-40), the system remains stable (no explosion, no NaN).

4. **Performance**: 400 particles > 60fps, 800 particles > 30fps on modern hardware.

5. **No engine modifications**: all functionality in an external plugin.

6. **Compatibility**: works with external repulse (mouse pushes fluid), emitters (spawned particles integrated), links (draws fluid connections).

---

## Appendix: Default configuration

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
    "fluid": {
      "enable": true,
      "radius": 30,
      "stiffness": 0.5,
      "nearStiffness": 0.5,
      "restDensity": 3,
      "maxNeighbors": 64,
      "maxForce": 2.5
    }
  },
  "interactivity": {
    "events": { "onClick": { "enable": true, "mode": "repulse" } },
    "modes": { "repulse": { "distance": 100, "duration": 2 } }
  }
}
```
