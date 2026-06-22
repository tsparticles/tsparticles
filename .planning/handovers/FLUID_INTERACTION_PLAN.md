# Fluid Particle Interaction - Deep Technical Specification (Draft v2)

## Summary

|                     |                                              |
|---------------------|----------------------------------------------|
| **Target**          | `@tsparticles/interaction-particles-fluid`   |
| **Steps**           | 10 (0–9)                                     |
| **Type**            | New package                                  |
| **Load function**   | `loadParticlesFluidInteraction(engine)`      |
| **Key constraints** | Don't touch engine; agent must NOT commit/PR |

### Progress

- [ ] Step 0: Repository alignment + constraints
- [ ] Step 1: Package skeleton (noop)
- [ ] Step 2: Options contract + loaders
- [ ] Step 3: Baseline DDR solver
- [ ] Step 4: Constraints + boundary behavior
- [ ] Step 5: Viscosity + pointer stirring
- [ ] Step 6: Interoperability hardening
- [ ] Step 7: Performance + soak validation
- [ ] Step 8: Docs, presets, release readiness
- [ ] Step 9: (optional) Advanced path

---

## Document status

- Scope: planning only (no implementation in this session)
- Target package: `interactions/particles/fluid`
- Engine policy: do not touch `engine` unless a missing extension point is proven
- Audience: implementation agent and maintainers
- Goal: convert a CodePen-style liquid behavior into a tsParticles-native interaction

## Execution governance (critical)

This plan is executed by an implementation agent under strict handoff control.

Mandatory rule:

- the implementation agent must NOT create commits;
- the implementation agent must NOT open PRs;
- the implementation agent must leave changes uncommitted so the maintainer can review and commit manually.

Reason:

- maintain full maintainer control over change review, commit boundaries, and final PR composition.

## Versioning gate (blocking)

Current baseline considered in this plan:

- current line: `4.1.3`
- candidate target: `4.2.0`

Semver assessment for this feature (default path):

- expected classification: **minor** (`4.2.0`) because it introduces a new optional interaction/package without requiring breaking API changes;
- expected non-breaking behavior: existing configs continue to work unchanged when `particles.fluid` is not enabled.

When this would become major instead:

- any required engine API break;
- removal/rename/incompatible change of existing public contracts;
- mandatory behavior changes that alter existing scenes without opt-in.

Blocking rule:

- implementation can proceed only under the approved target version line;
- if during implementation evidence suggests this is not suitable for `4.2.0`, work must stop and the agent must request explicit maintainer confirmation before continuing on a new minor/major strategy;
- no "implicit go" is allowed.

---

## Why this document exists

The requested feature is not just another visual mode. It changes how particles move and how they influence each other every frame. That means we need:

- simulation intent clearly defined;
- architectural boundaries (interaction vs plugin) explicit;
- constraints and fallback plans documented before coding;
- tuning ranges and test criteria ready to avoid endless trial-and-error.

This spec turns the initial idea (fluid-like particles from the referenced CodePen) into a concrete and staged implementation plan that can be executed by another agent with minimal ambiguity.

---

## Product intent

Create a new `fluid` interaction where particles exhibit cohesive liquid-like behavior:

- local clustering into blobs/streams;
- soft incompressibility (they should not collapse into one point);
- smooth collective motion under external forces;
- stable behavior with existing tsParticles interactions.

Non-goals:

- physically exact fluid dynamics;
- pressure projection on a continuous Eulerian grid;
- hard requirement for perfect determinism across all devices.

---

## Source inspiration and extraction

The provided CodePen sample is a particle-based visco-elastic fluid style simulation using:

- a spatial hashing grid,
- three passes (`pass1`, `pass2`, `pass3`),
- double density relaxation,
- boundary clamping,
- velocity reconstruction from corrected positions.

Important: we should **extract behavior**, not copy architecture blindly.

### What to keep from the example

- multi-pass frame approach;
- neighborhood-limited interactions (radius);
- pressure and near-pressure terms;
- symmetrical pair displacement;
- velocity rebuilt from position delta;
- optional pointer impulse.

### What to adapt for tsParticles

- use existing particle grid (`container.particles.grid`) instead of custom cell arrays;
- use existing interactor/plugin lifecycles;
- avoid per-frame re-allocation heavy buffers where possible;
- integrate with existing options model (`load` patterns, interfaces/classes);
- support compatibility with move/collisions/emitters/interactivity plugins.

---

## CodePen to tsParticles mapping

This section maps the conceptual phases from the source snippet to expected tsParticles behavior.

| Source phase | Source intent | tsParticles counterpart |
|--------------|---------------|--------------------------|
| `pass1`      | predict position from velocity + gravity + pointer force | pre-relaxation step in `FluidInteractor.interact(...)` or plugin-orchestrated frame step |
| `pass2`      | density/near-density + displacement + bounds | main fluid relaxation loop using `queryCircle` neighbors |
| `pass3`      | recalc velocity from corrected position | velocity correction pass; possibly integrated after displacement |

### Source logic excerpt (trimmed and annotated)

```js
// pass1: predict
particles_pprevx[n] = px;
particles_pprevy[n] = py;
particles_x[n] += particles_velx[n];
particles_y[n] += particles_vely[n];

// pass2: density and pressure
var q = 1 - (vlen / rad);
pressure += q * q;
presnear += q * q * q;

pressure = (pressure - 3) * 0.5;
presnear *= 0.5;

// pair displacement
var p = pressure + presnear * particles_q[np];
var dx = (particles_vxl[np] * p) * 0.5;
var dy = (particles_vyl[np] * p) * 0.5;
particles_x[np] += dx;
particles_y[np] += dy;
particles_x[n]  -= dx;
particles_y[n]  -= dy;

// pass3: velocity reconstruction
particles_velx[n] = particles_x[n] - particles_pprevx[n];
particles_vely[n] = particles_y[n] - particles_pprevy[n];
```

Interpretation:

- position-based correction is the heart of the fluid effect;
- velocity is derived from corrected positions, not only from forces;
- near-pressure makes short-range incompressibility feel "thicker".

---

## Architecture decision

### Preferred initial shape

Implement as an interaction package under:

- `interactions/particles/fluid`

Publishing target:

- `@tsparticles/interaction-particles-fluid`

Option key:

- `particles.fluid`

Loader:

- `loadParticlesFluidInteraction(engine)`

Rationale:

- semantically aligned with `interactions/particles/*` packages;
- lower integration burden for users;
- likely enough API surface in v4 already.

### Escalation strategy

If sequencing or shared frame-state becomes problematic:

1. keep package in `interactions/particles/fluid`,
2. add internal plugin instance for orchestration,
3. only then evaluate migration to `plugins/fluid`.

Escalate only with evidence (reproducible instability, persistent order artifacts, or inability to run required passes safely).

---

## v4 readiness check

Based on existing patterns (`collisions`, `attract`, `infection`, `move`), v4 appears ready for first implementation.

Capabilities already present:

- neighbor query via `container.particles.grid.queryCircle(...)`;
- particle mutation in interactors;
- container plugin `update(delta)` if needed;
- options loading and typed extension patterns.

Potential gap to watch:

- deterministic ordering between fluid correction and move integration.

Proposed rule:

- do not request engine changes up front;
- instrument first implementation;
- request minimal hook ordering support only if artifacts remain after interactor/plugin orchestration.

---

## Entry points and package contracts

### Must-have public API

```ts
export async function loadParticlesFluidInteraction(engine: Engine): Promise<void>;
```

### Must-have option contract

`particles.fluid` should support enable + tuning options with safe defaults.

### Should-have exports

- `IFluid` and sub-interfaces;
- enum/string union types if modes are introduced;
- option classes consistent with repo style.

---

## Proposed options model (detailed)

```ts
export type FluidPointerMode = "push" | "pull";

export interface IFluidGravity {
  enable?: boolean;
  acceleration?: number;
}

export interface IFluidPointer {
  enable?: boolean;
  radius?: number;
  strength?: number;
  mode?: FluidPointerMode;
}

export interface IFluidDebug {
  enable?: boolean;
  drawRadius?: boolean;
  drawDensity?: boolean;
  drawNeighbors?: boolean;
}

export interface IFluid {
  enable?: boolean;
  radius?: number;
  stiffness?: number;
  nearStiffness?: number;
  restDensity?: number;
  viscosity?: number;
  iterations?: number;
  maxForce?: number;
  maxNeighbors?: number;
  boundaryBounce?: number;
  boundaryClamp?: boolean;
  gravity?: IFluidGravity;
  pointer?: IFluidPointer;
  debug?: IFluidDebug;
}
```

### Defaults (candidate)

```json
{
  "particles": {
    "fluid": {
      "enable": false,
      "radius": 34,
      "stiffness": 0.45,
      "nearStiffness": 0.8,
      "restDensity": 3,
      "viscosity": 0.08,
      "iterations": 2,
      "maxForce": 2.5,
      "maxNeighbors": 64,
      "boundaryBounce": 0.2,
      "boundaryClamp": true,
      "gravity": {
        "enable": true,
        "acceleration": 0.01
      },
      "pointer": {
        "enable": false,
        "radius": 90,
        "strength": 0.45,
        "mode": "push"
      },
      "debug": {
        "enable": false,
        "drawRadius": false,
        "drawDensity": false,
        "drawNeighbors": false
      }
    }
  }
}
```

### Option semantics

- `radius`: interaction support radius; larger means smoother but slower.
- `stiffness`: pressure response to density above `restDensity`.
- `nearStiffness`: near-field anti-compression; key for "liquid blob" feel.
- `restDensity`: target neighbor density equilibrium.
- `viscosity`: velocity blending/smoothing.
- `iterations`: correction loops per frame (1-4 reasonable).
- `maxForce`: hard clamp to avoid numerical explosions.
- `maxNeighbors`: perf safety cap.
- `boundaryBounce` + `boundaryClamp`: containment behavior near canvas edges.

---

## Package structure (target)

```text
interactions/particles/fluid/
  .browserslistrc
  .npmignore
  CHANGELOG.md
  LICENSE
  README.md
  eslint.config.js
  package.dist.json
  package.json
  rollup.config.js
  tsconfig.base.json
  tsconfig.browser.json
  tsconfig.json
  tsconfig.module.json
  tsconfig.types.json
  typedoc.json
  src/
    browser.ts
    index.lazy.ts
    index.ts
    Types.ts
    FluidInteractor.ts
    FluidMath.ts
    FluidState.ts
    Options/
      Classes/
        Fluid.ts
        FluidDebug.ts
        FluidGravity.ts
        FluidPointer.ts
      Interfaces/
        IFluid.ts
        IFluidDebug.ts
        IFluidGravity.ts
        IFluidPointer.ts
```

Optional only-if-needed additions:

```text
    FluidPlugin.ts
    FluidPluginInstance.ts
```

---

## Type design proposal

```ts
import type {
  IInteractivityParticlesOptions,
  InteractivityParticle,
  InteractivityParticlesOptions,
} from "@tsparticles/plugin-interactivity";
import type { Fluid } from "./Options/Classes/Fluid.js";
import type { IFluid } from "./Options/Interfaces/IFluid.js";

export type FluidParticle = InteractivityParticle & {
  options: ParticlesFluidOptions;
  fluid?: {
    prevX?: number;
    prevY?: number;
    density?: number;
    nearDensity?: number;
    neighborCount?: number;
  };
};

export type IParticlesFluidOptions = IInteractivityParticlesOptions & {
  fluid?: IFluid;
};

export type ParticlesFluidOptions = InteractivityParticlesOptions & {
  fluid?: Fluid;
};
```

Implementation note:

- keep per-particle temp state compact;
- avoid wide object graphs allocated each frame;
- consider typed scratch buffers if profile justifies.

---

## Loader and registration pattern

Follow collision-style interactor registration.

```ts
import { type InteractivityEngine, ensureInteractivityPluginLoaded } from "@tsparticles/plugin-interactivity";
import { type Engine } from "@tsparticles/engine";
import { FluidInteractor } from "./FluidInteractor.js";

declare const __VERSION__: string;

export async function loadParticlesFluidInteraction(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.pluginManager.register((e: InteractivityEngine) => {
    ensureInteractivityPluginLoaded(e);

    e.pluginManager.addInteractor?.("particlesFluid", container => {
      return Promise.resolve(new FluidInteractor(container));
    });
  });
}
```

If plugin orchestration is required, same loader can additionally register `FluidPlugin`.

---

## Simulation model

We model fluid cohesion with position-based relaxation inspired by DDR.

### Phase A - pre-step

For each eligible particle:

- store previous position (`prevX`, `prevY`);
- apply optional fluid gravity;
- apply optional pointer impulse;
- optionally predict position (`x += vx`, `y += vy`) when using explicit prediction mode.

### Phase B - density accumulation

For each particle `i`:

- query neighbors within `radius`;
- for each neighbor `j`:
  - `r = distance(i, j)`;
  - if `r < radius`, compute `q = 1 - r/radius`;
  - accumulate:
    - `density += q^2`
    - `nearDensity += q^3`

### Phase C - pressure solve

Compute:

- `pressure = stiffness * (density - restDensity)`
- `nearPressure = nearStiffness * nearDensity`

Apply symmetric displacement along normalized neighbor direction:

- displacement factor `D = pressure * q + nearPressure * q^2`
- split half-half between pair to preserve momentum-like behavior.

### Phase D - constraints

- clamp to canvas bounds when enabled;
- optional boundary bounce damping.

### Phase E - velocity reconstruction

- `vx = x - prevX`
- `vy = y - prevY`
- optional viscosity blend toward neighborhood average velocity.

### Phase F - iteration

Repeat phases B-E `iterations` times for improved stability.

---

## Detailed pseudo-code (implementation-grade)

```ts
for each particle p:
  if !isFluidEnabled(p): continue
  p.fluid.prevX = p.position.x
  p.fluid.prevY = p.position.y

  if fluid.gravity.enable:
    p.velocity.y += fluid.gravity.acceleration

  if fluid.pointer.enable and pointer.active:
    applyPointerForce(p)

for iter in [0..fluid.iterations):
  for each particle p:
    density = 0
    nearDensity = 0
    neighbors = queryCircle(p.position, fluid.radius)

    for each n in neighbors:
      if n === p or !isFluidEnabled(n): continue
      d = distance(p.position, n.position)
      if d <= 0 or d >= fluid.radius: continue
      q = 1 - d / fluid.radius
      density += q * q
      nearDensity += q * q * q
      cacheNeighbor(p, n, q, direction)

    pressure = fluid.stiffness * (density - fluid.restDensity)
    nearPressure = fluid.nearStiffness * nearDensity

    for each cached neighbor entry:
      q = entry.q
      dir = entry.direction
      force = pressure * q + nearPressure * q * q
      force = clamp(force, -fluid.maxForce, fluid.maxForce)
      dx = dir.x * force * 0.5
      dy = dir.y * force * 0.5
      entry.neighbor.position.x += dx
      entry.neighbor.position.y += dy
      p.position.x -= dx
      p.position.y -= dy

    applyBounds(p)

for each particle p:
  vx = p.position.x - p.fluid.prevX
  vy = p.position.y - p.fluid.prevY
  if fluid.viscosity > 0:
    [vx, vy] = blendWithNeighborVelocity(p, vx, vy, fluid.viscosity)
  p.velocity.x = vx
  p.velocity.y = vy
```

---

## Numerical stability rules

Hard constraints for implementation:

1. never divide by near-zero distance without epsilon checks;
2. clamp pressure displacement;
3. skip destroyed/spawning particles;
4. cap neighbors per particle with deterministic truncation;
5. avoid accumulating stale neighbor cache between frames.

Suggested constants:

- `epsilon = 1e-6`
- `maxNeighbors = 64` default
- `iterations = 2` default
- `maxForce = 2.5` default

---

## Interactions with existing tsParticles systems

### `particles.move`

Fluid should complement movement, not replace it.

- move gives baseline motion;
- fluid modifies local coherence;
- reconstruction step should not permanently zero stylistic move vectors.

### `particles.collisions`

Potential over-constraint when both are strong.

Recommendations:

- reduce collision aggressiveness when fluid enabled;
- keep `fluid.stiffness` conservative;
- document presets for coexistence.

### `particles.attract`

Attract can create macro-flow direction while fluid preserves body coherence.

Risk:

- high attract + high nearStiffness can produce jitter/compression spikes.

Mitigation:

- clamp force;
- increase radius moderately;
- lower attract rotation force.

### External interactivity (`repulse`, `grab`, `push`, `trail`)

- repulse should produce local wave-like deformation in blob;
- push (new particles) must not break solver when density spikes;
- trail visuals should still render from particle motion deltas.

### Emitters

Emitters can feed fluid streams. Need spawn stabilization:

- newly spawned particles may skip fluid for first frames (`spawning` guard);
- or start with reduced fluid influence ramp.

---

## Bounds behavior

From source snippet, boundary handling was critical.

Required behavior when `boundaryClamp` is true:

- keep particles inside canvas;
- apply soft displacement near edges;
- optional bounce damping on impact.

Proposed logic:

```ts
if (x < minX) {
  x = minX;
  vx *= -boundaryBounce;
}
if (x > maxX) {
  x = maxX;
  vx *= -boundaryBounce;
}
// same for y
```

Optional future option:

- `boundaryMode: "clamp" | "wrap"` (not required v1)

---

## Pointer coupling (fluid-specific)

The source sample used pointer force to "stir" the fluid.

We should support a fluid pointer mode independent from standard interactivity mode toggles, so users can get fluid stirring even without repulse config complexity.

Pointer impulse candidate:

```ts
const dx = p.x - pointer.x;
const dy = p.y - pointer.y;
const d = Math.hypot(dx, dy);

if (d > 1 && d < pointerRadius) {
  const inv = 1 / d;
  const signed = pointerMode === "pull" ? -1 : 1;
  p.velocity.x += signed * pointerStrength * dx * inv * (1 - d / pointerRadius);
  p.velocity.y += signed * pointerStrength * dy * inv * (1 - d / pointerRadius);
}
```

---

## Option loading classes (pattern)

Mirror existing packages:

- interface files in `Options/Interfaces/*`
- classes in `Options/Classes/*`
- `load(...)` methods with null checks and property loaders.

Example class skeleton:

```ts
export class Fluid implements IFluid, IOptionLoader<IFluid> {
  enable = false;
  radius = 34;
  stiffness = 0.45;
  nearStiffness = 0.8;
  restDensity = 3;
  viscosity = 0.08;
  iterations = 2;
  maxForce = 2.5;
  maxNeighbors = 64;
  boundaryBounce = 0.2;
  boundaryClamp = true;
  readonly gravity = new FluidGravity();
  readonly pointer = new FluidPointer();
  readonly debug = new FluidDebug();

  load(data?: RecursivePartial<IFluid>): void {
    if (isNull(data)) {
      return;
    }

    loadProperty(this, "enable", data.enable);
    loadNumeric(this, "radius", data.radius);
    loadNumeric(this, "stiffness", data.stiffness);
    loadNumeric(this, "nearStiffness", data.nearStiffness);
    loadNumeric(this, "restDensity", data.restDensity);
    loadNumeric(this, "viscosity", data.viscosity);
    loadNumeric(this, "iterations", data.iterations);
    loadNumeric(this, "maxForce", data.maxForce);
    loadNumeric(this, "maxNeighbors", data.maxNeighbors);
    loadNumeric(this, "boundaryBounce", data.boundaryBounce);
    loadProperty(this, "boundaryClamp", data.boundaryClamp);

    this.gravity.load(data.gravity);
    this.pointer.load(data.pointer);
    this.debug.load(data.debug);
  }
}
```

---

## `FluidInteractor` responsibilities

The interactor should do exactly these things:

1. `isEnabled(particle)` checks `particle.options.fluid?.enable`.
2. `loadParticlesOptions(...)` merges fluid options.
3. `interact(...)` executes fluid pass logic.
4. `maxDistance` returns active radius max for optimization.
5. `clear/init/reset` remain no-op unless internal caches require reset.

Avoid adding rendering concerns here (no drawing), except debug hooks if plugin architecture requires it.

---

## Per-frame orchestration decision tree

### Path A (preferred): interactor-only

Use interactor callbacks with local pass loops.

Use when:

- no frame-order artifact is visible;
- performance remains acceptable.

### Path B: interactor + plugin instance

Add plugin instance `update(delta)` to manage shared frame state and coordinated passes.

Use when:

- we need one global "frame pre-step" and "frame finalize" across all particles;
- interactor call order creates bias.

### Path C: dedicated plugin package

Use only when package needs persistent cross-system hooks not fitting interactions domain.

---

## Engine extension policy

Engine must remain untouched unless a concrete blocker exists.

Possible blocker patterns:

- no reliable pre-move/post-move ordering;
- no safe way to run one global fluid phase per frame;
- lifecycle missing for reset/resize coordination.

If blocker confirmed, propose minimal extension only:

- deterministic hook ordering labels, or
- one optional frame callback phase.

No broad refactor request.

---

## Performance budget and profiling plan

Target scenarios:

1. 300 particles, desktop: excellent (> 100 fps where possible)
2. 600 particles, desktop: smooth (~60 fps)
3. 1000 particles, desktop: acceptable with low iterations
4. 300 particles, mobile-ish profile: still fluid and stable

Profile metrics:

- average frame time;
- 95th percentile frame time;
- neighbor checks per frame;
- allocations per frame;
- NaN incidence (should be zero).

Guardrails:

- if `neighborsAvg > 50`, suggest lower radius;
- if frame time spikes > 16ms at 600 particles, degrade via iteration fallback.

Potential adaptive fallback (optional):

- dynamic `iterations` reduction when frame load exceeds threshold.

---

## Memory and allocation policy

Avoid these anti-patterns:

- creating new arrays inside every neighbor loop;
- storing full neighbor objects for all particles persistently;
- repeated object literal allocation for vector temp math.

Prefer:

- reusable scratch arrays;
- fixed temporary vector structs reused per function;
- compact per-particle fluid state fields.

---

## Compatibility matrix (expanded)

| Feature | Expected status | Notes |
|---------|------------------|-------|
| `move.enable` | Required | Fluid is most meaningful with baseline movement |
| `collisions.enable` | Supported with caveats | May over-constrain; tune both systems |
| `attract.enable` | Supported | Useful for directional flow |
| `links.enable` | Visual only | Can reveal structure, may look non-fluid if too rigid |
| `emitters` | Supported | Great for fluid streams, validate spawn bursts |
| `infection` plugin | Untested initially | Should not conflict logically, but both mutate behavior |
| `trail` plugin | Supported | Good visual enhancement |
| `poisson` plugin | Depends | Sampling pattern may change initial fluid convergence |

---

## Risks and mitigations (expanded)

### Risk 1 - instability explosions

Symptoms:

- particles shoot to infinity;
- velocity spikes and NaN.

Mitigation:

- epsilon checks;
- force clamp;
- conservative defaults;
- iterative correction instead of one huge correction.

### Risk 2 - mushy/no-fluid look

Symptoms:

- particles just look like attract/repulse;
- no blob coherence.

Mitigation:

- increase near-pressure role;
- add velocity reconstruction;
- tune restDensity and radius balance.

### Risk 3 - over-clumping

Symptoms:

- one giant rigid blob;
- no dynamic deformation.

Mitigation:

- lower stiffness/nearStiffness;
- increase baseline move speed slightly;
- add mild viscosity only.

### Risk 4 - order-dependent anisotropy

Symptoms:

- flow bias in iteration order direction.

Mitigation:

- pairwise symmetric displacement;
- optional pass randomization or alternate traversal;
- plugin-level orchestration if needed.

### Risk 5 - perf collapse at high density

Symptoms:

- sudden frame drops with emitters or large radius.

Mitigation:

- `maxNeighbors` cap;
- reduce iterations;
- optional adaptive degradation.

---

## Test strategy

### Unit tests

1. option class loading:
   - defaults;
   - partial load merge;
   - nested gravity/pointer/debug load.
2. helper math:
   - `q` computation boundaries;
   - force clamp;
   - epsilon-safe normalization.
3. guard behavior:
   - disabled fluid returns early;
   - destroyed/spawning skipped.

### Integration tests

1. fluid-only baseline scene:
   - no NaN after N frames;
   - visible local clustering metrics.
2. fluid + move + emitters:
   - stable stream behavior.
3. fluid + collisions:
   - no catastrophic jitter.
4. fluid + pointer stirring:
   - localized deformation and recovery.

### Soak test

- run 20k+ frames simulation in headless mode (where feasible);
- assert no memory trend growth and no invalid values.

---

## Acceptance criteria

Feature is acceptable for first release when:

1. visual effect clearly resembles fluid clustering (not plain attraction);
2. no NaN/Infinity positions or velocities under standard presets;
3. defaults are stable with 300-600 particles on common desktop browser;
4. docs include tuning guidance and caveats;
5. no engine changes required, or minimal engine change is justified by reproducible issue.

---

## Suggested presets

### Water-like

```json
{
  "particles": {
    "fluid": {
      "enable": true,
      "radius": 30,
      "stiffness": 0.32,
      "nearStiffness": 0.62,
      "restDensity": 2.8,
      "viscosity": 0.06,
      "iterations": 2,
      "maxForce": 2.1
    }
  }
}
```

### Gel-like

```json
{
  "particles": {
    "fluid": {
      "enable": true,
      "radius": 36,
      "stiffness": 0.52,
      "nearStiffness": 1.0,
      "restDensity": 3.4,
      "viscosity": 0.14,
      "iterations": 3,
      "maxForce": 2.8
    }
  }
}
```

### Performance-first

```json
{
  "particles": {
    "fluid": {
      "enable": true,
      "radius": 24,
      "stiffness": 0.28,
      "nearStiffness": 0.45,
      "restDensity": 2.2,
      "viscosity": 0.04,
      "iterations": 1,
      "maxNeighbors": 32,
      "maxForce": 1.8
    }
  }
}
```

---

## Example usage in tsParticles config

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadInteractivityPlugin } from "@tsparticles/plugin-interactivity";
import { loadParticlesFluidInteraction } from "@tsparticles/interaction-particles-fluid";

await loadInteractivityPlugin(tsParticles);
await loadParticlesFluidInteraction(tsParticles);

await tsParticles.load({
  id: "tsparticles",
  options: {
    fpsLimit: 120,
    particles: {
      number: { value: 600 },
      color: { value: "#6ec6ff" },
      size: { value: 2 },
      move: { enable: true, speed: 1.2 },
      collisions: { enable: false },
      fluid: {
        enable: true,
        radius: 32,
        stiffness: 0.4,
        nearStiffness: 0.75,
        restDensity: 3,
        viscosity: 0.1,
        iterations: 2,
        maxForce: 2.4,
        gravity: { enable: true, acceleration: 0.01 },
        pointer: { enable: true, radius: 100, strength: 0.4, mode: "push" }
      }
    },
    interactivity: {
      events: {
        onHover: { enable: true, mode: "repulse" }
      }
    }
  }
});
```

---

## Implementation sequence (execution roadmap, non-monolithic)

This section is intentionally task-oriented so an implementation agent can execute in small, reviewable chunks.

### Step 0 - repository alignment and constraints

Goal:

- confirm package conventions before writing code.

Actions:

1. inspect one mature interaction package under `interactions/particles/*` and mirror its file/layout conventions;
2. confirm required build/lint/test commands for that project in Nx;
3. capture exact naming (`particlesFluid`, package name, loader export) and freeze it;
4. confirm semver target remains `4.2.0` under non-breaking assumptions.

Done when:

- a short checklist is written in the implementation PR description and naming is no longer changing.
- a short semver note states why the change is still minor and does not require major.

Stop condition (hard gate):

- if this step reveals probable breaking changes, STOP before Step 1 and request explicit maintainer confirmation for version strategy change.

### Step 1 - package skeleton only (no behavior)

Goal:

- create package scaffolding and registration entry points without simulation logic.

Actions:

1. scaffold `interactions/particles/fluid` with standard package files;
2. add `src/index.ts`, `src/index.lazy.ts`, `src/browser.ts`;
3. implement `loadParticlesFluidInteraction(engine)` with interactor registration;
4. add a noop `FluidInteractor` that compiles and returns early.

Files expected:

- package metadata/config files;
- loader files;
- `src/FluidInteractor.ts` placeholder.

Verification gate:

- package build passes;
- no runtime errors when loader is called in a minimal demo.

### Step 2 - options contract and loaders

Goal:

- establish stable typed options before solver work.

Actions:

1. add interfaces under `Options/Interfaces/*`;
2. add classes under `Options/Classes/*` with `load(...)` semantics aligned to repo patterns;
3. wire `particles.fluid` option merge path in interactor option loading;
4. add unit tests for defaults + partial loading behavior.

Verification gate:

- option loader tests pass;
- options are reachable from particle options at runtime.

### Step 3 - baseline fluid solver (DDR core)

Goal:

- implement the minimal useful fluid effect.

Actions:

1. add per-particle transient fluid state (`prevX`, `prevY`, density fields);
2. implement density/near-density accumulation with neighbor query radius;
3. implement pressure + near-pressure pair displacement (symmetric split);
4. reconstruct velocity from corrected position deltas.

Hard rules for this step:

- epsilon-safe normalization;
- clamp force by `maxForce`;
- skip invalid particles (`destroyed`/`spawning` guards).

Verification gate:

- visual blob coherence appears in a simple scene;
- no NaN/Infinity in short run (manual + automated assertion).

### Step 4 - constraints and boundary behavior

Goal:

- make solver robust at edges and under high local density.

Actions:

1. add `boundaryClamp` and `boundaryBounce` behavior;
2. apply deterministic `maxNeighbors` cap;
3. ensure stale neighbor data is not reused between frames/iterations;
4. add tests for boundary handling and neighbor cap behavior.

Verification gate:

- edge collisions do not explode;
- behavior remains stable under emitter bursts near boundaries.

### Step 5 - viscosity and pointer stirring

Goal:

- improve fluid feel and user interaction controls.

Actions:

1. add viscosity blend path (configurable by `viscosity`);
2. add fluid-specific pointer push/pull impulse;
3. ensure pointer logic is independent from standard interactivity mode complexity;
4. add integration test scenarios for pointer stirring.

Verification gate:

- stirring produces local deformation and smooth recovery;
- default settings remain stable with pointer disabled.

### Step 6 - interoperability hardening

Goal:

- verify coexistence with existing systems and avoid regressions.

Actions:

1. validate combinations: fluid+move, fluid+emitters, fluid+repulse, fluid+collisions;
2. document known caveats and safe tuning ranges;
3. if ordering artifacts appear, document evidence and evaluate Path B (plugin instance orchestration).

Verification gate:

- compatibility matrix is validated and updated with real observations (not assumptions).

### Step 7 - performance and soak validation

Goal:

- prove first-release viability under target particle counts.

Actions:

1. benchmark target scenarios (300/600/1000 desktop, 300 mobile-ish profile);
2. collect frame time, p95, neighbor counts, and allocation trends;
3. run long soak test and assert no NaN + no memory trend drift;
4. tune defaults only after measurements.

Verification gate:

- default preset meets acceptance thresholds or documented fallback tuning is provided.

### Step 8 - docs, presets, and release readiness

Goal:

- make feature consumable and maintainable.

Actions:

1. finalize README (install/load/options/presets/troubleshooting);
2. include three tested presets (water-like, gel-like, performance-first);
3. update changelog/package metadata as required by repo policy;
4. ensure examples compile with the published loader name.

Verification gate:

- docs match implemented options exactly;
- no undocumented options remain.

### Step 9 - optional advanced path (only with evidence)

Goal:

- handle architecture escalation without destabilizing v1.

Actions:

1. introduce plugin-level orchestration only if Step 6 shows reproducible ordering bias;
2. consider adaptive iterations if Step 7 proves necessary;
3. keep engine changes as last resort with minimal, reproducible justification.

Verification gate:

- escalation PR includes before/after evidence and does not change public options unexpectedly.

---

## Logical slicing strategy (recommended)

To avoid monolithic changes, implementation should be split into clearly isolated logical slices aligned with the steps above.

Important:

- these slices are planning/review units only;
- the implementation agent must not commit them and must not open a PR.

Suggested slices:

1. `feat(fluid): scaffold package and loader`
2. `feat(fluid): add options contracts and loader tests`
3. `feat(fluid): implement baseline DDR solver`
4. `feat(fluid): add boundaries, caps, and stability tests`
5. `feat(fluid): add viscosity and pointer stirring`
6. `docs(fluid): presets, compatibility notes, troubleshooting`

Each slice must include:

- what changed;
- how it was verified;
- measurable impact (visual/perf/stability) when relevant.

---

## Debug and observability proposal

Optional debug mode (off by default):

- draw support radius around selected particles;
- color by local density;
- show neighbor count in dev logs (sampled);
- periodic warning when clamps trigger excessively.

Possible internal counters (dev only):

- `framesWithClampOveruse`
- `maxNeighborsObserved`
- `nanRecoveries`

---

## Documentation deliverables

When implementation happens, README should include:

1. package intro and purpose;
2. install/load snippets (CDN + ESM/CJS pattern used in repo);
3. option reference table;
4. three presets;
5. compatibility caveats;
6. troubleshooting guide:
   - jitter,
   - no fluid effect,
   - low performance.

---

## Open technical questions (to validate during implementation)

1. Is interactor callback order stable enough for multi-pass behavior?
2. Should velocity reconstruction happen every iteration or only final pass?
3. Do we need per-particle temporary arrays, or can we compute on the fly cheaply?
4. Is z-layer filtering required to avoid cross-depth fluid coupling?
5. Does collisions + fluid need an explicit "integration mode" option?

These are not blockers for starting, but should be tracked during implementation.

---

## Migration fallback criteria to `plugins/fluid`

Move from interaction package to plugin package only if one or more is true after prototyping:

1. interactor-only path cannot enforce stable frame sequencing;
2. shared state lifecycle is awkward/impossible in interaction boundary;
3. solver quality strongly depends on global pre/post passes unavailable in current setup.

If migration is needed, maintain compatibility:

- keep same option key (`particles.fluid` where possible);
- keep same loader name if feasible;
- provide clear changelog migration notes.

---

## Final considerations and improvement ideas

This section lists forward-looking enhancements beyond v1.

### Improvement 1 - adaptive solver quality

Automatically reduce/increase `iterations` based on frame time budget.

Benefit:

- keeps interaction smooth under variable load.

### Improvement 2 - viscosity kernels

Introduce selectable viscosity kernels (`linear`, `quadratic`) for different liquid feel.

Benefit:

- broader artistic control without major architecture changes.

### Improvement 3 - flow fields coupling

Integrate fluid correction with move path generators (where available).

Benefit:

- fluid streams can follow custom paths naturally.

### Improvement 4 - vorticity-style enhancement

Add optional swirl preservation term to avoid over-damped look.

Benefit:

- richer visual turbulence at low extra cost.

### Improvement 5 - density-aware rendering hooks

Expose local density for color/opacity modulation in compatible plugins.

Benefit:

- more convincing liquid visuals without changing physics core.

### Improvement 6 - deterministic benchmark scene pack

Ship internal benchmark configs to validate regressions quickly.

Benefit:

- easier long-term maintenance and tuning.

---

## Go/No-Go for implementation start

### Go now if

- we accept interaction-first architecture;
- we accept DDR-inspired approximation over full fluid sim;
- we prioritize stability and integration over perfect physical accuracy.

### Pause and redesign if

- requirement changes to physically accurate CFD-like behavior;
- hard deterministic sync across environments becomes mandatory;
- engine-level ordering guarantees are required before any prototype.

Current recommendation: **Go with `interactions/particles/fluid` prototype path immediately**.

---

## Quick checklist for the implementing agent

1. Build package skeleton matching existing interactions conventions.
2. Add options contracts and loaders with conservative defaults.
3. Implement baseline DDR-inspired solver with clamps and epsilon safety.
4. Verify with move + emitters + repulse + collisions scenarios.
5. Add README docs and presets.
6. Add tests for loading, guards, and numeric stability.
7. Profile and tune radius/iterations/maxNeighbors defaults.
8. Escalate architecture only if measurable blockers remain.

This spec intentionally front-loads analysis so implementation can proceed with fewer architectural reversals.
