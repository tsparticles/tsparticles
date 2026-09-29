# Plan: Absorber Splitting (contingency for PR #5923)

Status: **Executed in-house** — the decision gate triggered, PR #5923 is treated as abandoned and the
feature has been implemented following this plan, with all the R1–R8 review findings addressed.
**Phase 2 (multi-absorber correctness) added and executed** after the split work — see
[Phase 2 — Multi-absorber correctness](#phase-2--multi-absorber-correctness) and the R9–R14 findings.
Verified: `Absorbers.ts` + `AbsorbersSplit.ts` + `AbsorbersMulti.ts` = 52/52, full `utils/tests` suite
= 288/288, `@tsparticles/plugin-absorbers` build + lint clean.
Scope: `@tsparticles/plugin-absorbers`
Current base: v4 (4.5.0 in progress)

## Origin

This plan covers **absorber splitting** requested in
[issue #5320](https://github.com/tsparticles/tsparticles/issues/5320) ("Absorber Split on Click or Size
limit reached") and prototyped in
[PR #5923](https://github.com/tsparticles/tsparticles/pull/5923) (`feat(absorbers): add absorber
splitting`, branch `v4`, author **ascweb**, last activity 2026-09-13).

The PR is functionally close but has gone quiet while awaiting responses to maintainer + CodeRabbit
review. **This plan is the in-house fallback** in case the PR is abandoned. The 4.5.0 release must not
block on an external PR with unaddressed review findings.

### Decision gate (when the PR is treated as abandoned)

Treat the PR as abandoned and execute this plan in-house when **any** of:

- No new commit or comment from the author after **2 weeks** from the last activity (baseline
  2026-09-13 → trigger ~2026-09-27).
- The author closes the PR without merging.
- The author does not respond to the review threads (réouverture after a maintainer ping).

Before executing: `git fetch origin pull/5923/head:absorber-split` to salvage what is reusable, and
mirror the approach below. Credit the author (`ascweb`) and issue reporter (`RegiByte`) in the
release notes / changelog regardless of merge path.

## Goal

Give absorbers the ability to **split**:

1. **Auto-split** — when the absorber reaches a configured **radius** or **mass** limit, the absorber is
   removed, `quantity` particles spawn at its position, and a fresh absorber (original options) replaces it.
2. **Click split** — a new interactivity click mode (`absorber-split`) manually triggers the same behavior
   on the absorber under the cursor.

Splitting is opt-in via a new `absorbers.split` options block. Default behavior of existing absorbers
is unchanged.

## Requirements (from issue #5320 + PR intent)

- Absorber grows (`size` / `mass`) by absorbing; when `size.limit.radius` / `size.limit.mass` is
  reached, splitting occurs instead of simply stopping growth.
- Clicking an absorber with split enabled also splits it.
- On split: original absorber removed → configured `quantity` particles spawned at the absorber
  position → replacement absorber created using the original options.
- Absorber sizes reset on the replacement (it starts again at `size.value`).

## Review findings to incorporate (non-negotiable)

These are the findings that must be satisfied by the in-house implementation **before merge**:

| #   | Source                      | Finding                                                                                                                                                                                                                                                                                                           | Required resolution                                                                                                                                                                                                                                             |
| --- | --------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| R1  | matteobruni                 | `particle.destroyed` break removed from `AbsorbersInteractor.interact()` is a behavior regression                                                                                                                                                                                                                 | Restore the break; a destroyed particle must be ignored for the remaining absorbers                                                                                                                                                                             |
| R2  | matteobruni                 | Changing `.some()` → `.find()` in the click-to-add guard is unnecessary                                                                                                                                                                                                                                           | Keep `.some()` for the add-guard; use `.find()` only in the new split branch                                                                                                                                                                                    |
| R3  | matteobruni                 | Generic `mode: "split"` collides with potential future particle-splitting interactions                                                                                                                                                                                                                            | Use a qualified mode name: **`absorber-split`**                                                                                                                                                                                                                 |
| R4  | matteobruni                 | `clickPosition` is duplicated (new branch declares it again)                                                                                                                                                                                                                                                      | Single declaration hoisted above the mode branches                                                                                                                                                                                                              |
| R5  | CodeRabbit                  | `split.quantity` is unvalidated → `push(Infinity)` hangs, fractional/negative produce wrong counts                                                                                                                                                                                                                | Validate `quantity` in `AbsorberSplit.load()`: finite, floored, clamped to `[0, maxSplitQuantity]`                                                                                                                                                              |
| R6  | CodeRabbit                  | `splitAbsorber` removes the absorber **before** `addAbsorber`; if `addAbsorber` rejects, the absorber is permanently lost (unhandled rejection at both call sites)                                                                                                                                                | Create the replacement **first**; only then remove the old absorber and push particles; attach rejection handlers at both call sites                                                                                                                            |
| R7  | CodeRabbit                  | Valid configs can continuously create particles (replacement immediately re-meets the limit → per-frame split loop)                                                                                                                                                                                               | Growth guard: an absorber cannot split until it has actually grown (absorbed ≥ 1 particle) since creation                                                                                                                                                       |
| R8  | CodeRabbit / SonarQube      | 0% coverage on new code                                                                                                                                                                                                                                                                                           | Ship with unit tests (see Tests)                                                                                                                                                                                                                                |
| R9  | in-house audit (Phase 2)    | `AbsorberInstance.update()` is **never called** — the entire `life` block (`count`, `duration`, `delay`, `wait`) is dead code; absorbers never expire or respawn                                                                                                                                                  | Call `absorber.update(delta)` for every absorber from `AbsorbersPluginInstance.update()`                                                                                                                                                                        |
| R10 | in-house audit (Phase 2)    | `v.length = mass / distance²` has no guard: at `distance === 0` the particle velocity becomes `(Infinity, NaN)`, permanently corrupting the particle; at `distance === 1` the velocity is ~`3000`                                                                                                                 | Clamp the effective distance to the absorber radius and cap the force magnitude                                                                                                                                                                                 |
| R11 | in-house audit (Phase 2)    | With `orbits: true` and 2+ absorbers, `particle.absorberOrbit` is a **single** `Vector` slot, so every absorber overwrites the previous one's position in the same frame (measured 599px jumps)                                                                                                                   | One **attraction weighted orbit field** per particle: the center is the attraction weighted average of every `orbits` absorber, so the particle orbits the combined field instead of fighting over one slot. No owner, no nearest-wins rule                     |
| R12 | in-house audit (Phase 2)    | The orbit branch calls `particle.velocity.setTo(Vector.origin)`, **wiping** the velocity that non-orbit absorbers accumulated in the same frame, and `AbsorbersInteractor.interact()` re-applied the whole attraction (force _and_ absorber growth) on top of `particleUpdate`, doubling it after the first click | The orbit is a parametric circle, so the velocity is derived from it instead of accumulated, and the attraction of **every** absorber becomes the rate at which the orbit collapses. The interactor only drags                                                  |
| R13 | in-house audit (Phase 2)    | When the orbit radius collapses inside the absorber, the radius is reset to `min(canvas) * (1 ± 0.1)`, throwing the particle **outside the canvas** where it stays (reproduced with a single absorber)                                                                                                            | Recycle the particle to a random in-canvas position instead of inflating the orbit radius                                                                                                                                                                       |
| R14 | in-house audit (Phase 2)    | `needsNewPosition` is one shared boolean consumed immediately, so with multiple absorbers only the first one to reach it recycles the particle                                                                                                                                                                    | Route every recycle through one shared private helper                                                                                                                                                                                                           |
| —   | investigated, **dismissed** | "Attraction is not delta-scaled"                                                                                                                                                                                                                                                                                  | **Not a bug**: `particle.velocity` is a steering vector multiplied by `moveSpeed`, which already contains `deltaFactor` (`plugins/move/src/MovePluginInstance.ts:111`). Verified empirically: identical velocity for `delta.factor` 1 / 0.5 / 2. No change made |

## Current state analysis

Absorber plugin files that the PR touches, current line references (v4 base):

| File                                                    | Current state                                                                                                                             |
| ------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `plugins/absorbers/src/Options/Interfaces/IAbsorber.ts` | No `split` key (fields: `color`, `destroy`, `draggable`, `life`, `name`, `opacity`, `orbits`, `position`, `size`)                         |
| `plugins/absorbers/src/Options/Classes/Absorber.ts`     | No `split`; `load()` uses `loadProperty`/`isNull`/`OptionsColor.create` pattern                                                           |
| `plugins/absorbers/src/AbsorberInstance.ts`             | `limit` resolved in constructor (`IAbsorberSizeLimit`, defaults `radius/mass = 0`); `size`/`mass` grow in `attract()`; no `shouldSplit()` |
| `plugins/absorbers/src/AbsorbersInstancesManager.ts`    | `addAbsorber(s)`, `removeAbsorber`, `getArray`, `clear`; no `splitAbsorber`                                                               |
| `plugins/absorbers/src/AbsorbersPluginInstance.ts`      | `particleUpdate()` calls `attract` and keeps the `particle.destroyed` break; **does not** implement `update(delta)` today                 |
| `plugins/absorbers/src/AbsorbersInteractor.ts`          | `handleClickMode` handles only `absorbers`; `interact()` keeps the `particle.destroyed` break; no split mode                              |
| `engine/src/Core/ParticlesManager.ts`                   | `update(delta)` calls `plugin.update?.(delta)` once per frame **before** particle phase-1 update — ideal frame hook for auto-split        |

Notes / gotchas:

- `IAbsorberSizeLimit` defaults are `radius = 0`, `mass = 0` and `AbsorberInstance` stores them
  resolved (`radius * pixelRatio * reduceFactor`, `mass` as-is). A limit of `0` already means "no
  limit" in `attract()` (grows unconditionally), so `shouldSplit()` must only fire when the limit is
  explicitly configured (`> 0`).
- `AbsorbersInstancesManager.addAbsorber` is async (`await import("./AbsorberInstance.js")`), so the
  replacement push to the array lands in a later microtask — safe to mutate during the synchronous
  frame loop, but `removeAbsorber` is synchronous and must be followed by an immediate `break`.
- The plugin has a `draggable` interactor (`AbsorbersInteractor`) already; the new `absorber-split`
  mode will make `isEnabled()` true for that interactor too — acceptable, but the dragging path must
  be verified (acceptance AC4) so a click-to-split doesn't surprise users with drag interactions.
- There are currently **no** absorber unit tests. New tests follow the Feature E conventions under
  `utils/tests/src/tests/` (see `WORKSPACE_TEST_COVERAGE_PLAN.md`, Wave 4 — plugin option loaders).

## Design decisions

1. **Click mode name**: `absorber-split` (R3).
2. **Auto-split hook**: implement `AbsorbersPluginInstance.update(delta)` (once per frame) instead of
   checking inside `particleUpdate` — avoids mutating the absorber array while the per-particle
   `attract` loop runs and is not tied to a particle being present near the split trigger.
   `particleUpdate` keeps its current `attract` + `particle.destroyed` break.
3. **Order of operations in `splitAbsorber`** (R6):
   1. read `position` + `quantity`,
   2. `await addAbsorber(container, options, position)` (replacement) — if it rejects/fails, **keep the
      original absorber** and abort,
   3. `removeAbsorber(container, absorber)`,
   4. if `quantity > 0` → `container.particles.push(quantity, position)`,
   5. return the replacement.
4. **Growth guard (R7)**: `AbsorberInstance` records `#initialSize` / `#initialMass` in the
   constructor; `shouldSplit()` requires the absorber to have **grown** beyond those (absorbed ≥ 1
   particle) _and_ for a limit `> 0` to be reached.
5. **Quantity validation (R5)**: `AbsorberSplit.load()` only accepts finite numbers; floors
   fractional values and clamps to `[0, maxSplitQuantity]` (`maxSplitQuantity` constant, default
   proposal `1000`, documented). Rejects nothing — invalid input keeps the current/default value.
6. **Replacement properties**: original options object reused (same `Absorber` instance) + old
   position; size/mass recomputed from `size.value` in the constructor (fresh, small absorber).

## Implementation

### 1. Types and options contract

**New `plugins/absorbers/src/Options/Interfaces/IAbsorberSplit.ts`**

```ts
/** Absorber split options */
export interface IAbsorberSplit {
  /** Enables absorber splitting */
  enable: boolean;

  /** Number of particles generated when the absorber splits */
  quantity: number;
}
```

**New `plugins/absorbers/src/Options/Classes/AbsorberSplit.ts`**

```ts
import { type IOptionLoader, type RecursivePartial, isNull, loadProperty } from "@tsparticles/engine";
import type { IAbsorberSplit } from "../Interfaces/IAbsorberSplit.js";

const maxSplitQuantity = 1000;

export class AbsorberSplit implements IAbsorberSplit, IOptionLoader<IAbsorberSplit> {
  enable = false;
  quantity = 4;

  load(data?: RecursivePartial<IAbsorberSplit>): void {
    if (isNull(data)) {
      return;
    }

    loadProperty(this, "enable", data.enable);

    if (isNumber(data.quantity) && Number.isFinite(data.quantity)) {
      this.quantity = Math.min(Math.max(Math.trunc(data.quantity), 0), maxSplitQuantity);
    }
  }
}
```

(`isNumber` must be imported from `@tsparticles/engine`; the `Number.isFinite` guard keeps the
current/default value for `NaN`/`Infinity` instead of clamping them, so the hang/loop case from R5
cannot occur.)

**Modify `plugins/absorbers/src/Options/Interfaces/IAbsorber.ts`**

- `import type { IAbsorberSplit } from "./IAbsorberSplit.js";`
- Add `split: IAbsorberSplit;` (with a docstring, alphabetically between `size` and the end — match
  the current sorted member order).

**Modify `plugins/absorbers/src/Options/Classes/Absorber.ts`**

- `import { AbsorberSplit } from "./AbsorberSplit.js";`
- Add field `split;` (docstring "The absorber split options").
- Constructor: `this.split = new AbsorberSplit();`
- `load()`: `if (data.split !== undefined) { this.split.load(data.split); }` (placed consistently
  with the other `loadProperty` calls; Prettier formatting).

### 2. `AbsorberInstance` — split detection

**Modify `plugins/absorbers/src/AbsorberInstance.ts`**

- Constructor: after `this.mass = ...` / `this.size = ...`, store the initial values:

  ```ts
  this.#initialSize = this.size;
  this.#initialMass = this.mass;
  ```

- New private fields: `#initialSize`, `#initialMass` (default `0`).
- New public method:

  ```ts
  /**
   * Checks if the absorber reached a configured size/mass limit and should split.
   * The absorber must have grown since creation (split at creation would infinite-loop).
   */
  shouldSplit(): boolean {
    if (!this.options.split.enable) {
      return false;
    }

    const grown = this.size > this.#initialSize || this.mass > this.#initialMass,
      radiusLimitReached =
        this.limit.radius > minRadius && this.size >= this.limit.radius && grown,
      massLimitReached = this.limit.mass > minMass && this.mass >= this.limit.mass && grown;

    return radiusLimitReached || massLimitReached;
  }
  ```

  (`minRadius` / `minMass` are the existing engine constants already imported/set in this file.)

- The existing `attract()` growth code (`this.size += sizeFactor`, `this.mass += ...`) is unchanged —
  the growth guard is derived from `#initialSize`/`#initialMass`, no extra state to maintain.

### 3. `AbsorbersInstancesManager` — split execution

**Modify `plugins/absorbers/src/AbsorbersInstancesManager.ts`**

```ts
/**
 * Splits an absorber into particles and replaces it with a new absorber.
 * The replacement is created BEFORE the original is removed, so a failed
 * creation never loses the absorber.
 * @param container - the absorber container
 * @param absorber - the absorber to split
 * @returns the newly created absorber
 */
async splitAbsorber(
  container: AbsorberContainer,
  absorber: AbsorberInstance,
): Promise<AbsorberInstance | undefined> {
  if (!absorber.options.split.enable) {
    return;
  }

  const position = {
      x: absorber.position.x,
      y: absorber.position.y,
    },
    quantity = absorber.options.split.quantity;

  const replacement = await this.addAbsorber(container, absorber.options, position);

  if (!replacement) {
    return;
  }

  this.removeAbsorber(container, absorber);

  if (quantity > defaultIndex) {
    container.particles.push(quantity, position);
  }

  return replacement;
}
```

- Object-literal indentation must match Prettier output (CodeRabbit flagged this; run the formatter).
- Callers must handle the promise (see below) so a rejection cannot be unhandled.

### 4. `AbsorbersPluginInstance` — auto-split per frame

**Modify `plugins/absorbers/src/AbsorbersPluginInstance.ts`**

- Implement the frame hook (fired once per frame by `ParticlesManager.update`):

  ```ts
  update(_delta: IDelta): void {
    const array = this.#instancesManager.getArray(this.#container);

    for (const absorber of array) {
      if (absorber.shouldSplit()) {
        void this.#instancesManager
          .splitAbsorber(this.#container, absorber)
          .catch(() => {
            /* keep the loop alive; the absorber stays unsplit on failure */
          });

        break;
      }
    }
  }
  ```

- `particleUpdate()` keeps `attract` + the `particle.destroyed` break (R1) unchanged.

### 5. `AbsorbersInteractor` — click split mode

**Modify `plugins/absorbers/src/AbsorbersInteractor.ts`**

- New constant next to `absorbersMode`:

  ```ts
  const absorbersMode = "absorbers",
    absorberSplitMode = "absorber-split";
  ```

- `handleClickMode` rewrite (R4: hoist `clickPosition`):

  ```ts
  handleClickMode = (mode, interactivityData): void => {
    const container = this.container,
      { clickPosition } = interactivityData.mouse,
      absorbers = container.actualOptions.interactivity.modes.absorbers;

    if (mode === absorberSplitMode) {
      if (!clickPosition) {
        return;
      }

      // nearest absorber under the cursor, deterministic for overlaps
      const candidates = instancesManager
          .getArray(container)
          .filter(t => getDistance(t.position, clickPosition) < t.size)
          .sort((a, b) => getDistance(a.position, clickPosition) - getDistance(b.position, clickPosition)),
        target = candidates[0];

      if (target?.options.split.enable) {
        void this.#instancesManager.splitAbsorber(container, target).catch(() => {});
      }

      return;
    }

    if (mode !== absorbersMode || !absorbers) {
      return;
    }

    if (clickPosition) {
      const existingAbsorber = instancesManager
        .getArray(container)
        .some(t => getDistance(t.position, clickPosition) < t.size);

      if (existingAbsorber) {
        return;
      }
    }

    const absorbersModeOptions = itemFromArray(absorbers) ?? new Absorber();

    void this.#instancesManager.addAbsorber(container, absorbersModeOptions, clickPosition);
  };
  ```

  (R2: `.some()` restored for the click-to-add guard; `.find`-style logic only in the split branch.)

- `isEnabled()`:

  ```ts
  return isInArray(absorbersMode, events.onClick.mode) || isInArray(absorberSplitMode, events.onClick.mode);
  ```

- `interact()` keeps the `particle.destroyed` break (R1). Verify the drag path still behaves when only
  `absorber-split` is configured (see AC4).

### 6. Exports

- `AbsorberSplit` must be exported from the package entry (`plugins/absorbers/src/index.ts` / relevant
  `export-types` file) following the existing options-class export pattern. No engine changes are
  needed — the feature is fully contained in `@tsparticles/plugin-absorbers`.

### 7. Docs

- `markdown/Options/Plugins/Absorbers.md`: add `split` options table rows (`enable`, `quantity`),
  a usage snippet, and a note that splitting disables itself on the replacement until it grows again.
- Interactivity docs: document the `absorber-split` click mode.
- Website docs pull the canonical source from `markdown/Options/Plugins/Absorbers.md` — no per-language
  edits needed.

## Phase 2 — Multi-absorber correctness

Splitting landed first and made the existing multi-absorber behavior much more visible (a splitting
absorber multiplies the number of orbit absorbers over time). A follow-up audit confirmed the
suspicion that "only one absorber seems to apply". The loop is in fact correct, but the `orbits`
path is not.

### Audit findings

**The dispatch loop is correct.** `AbsorbersPluginInstance.particleUpdate()` iterates every absorber
and calls `attract()` once each (verified: `attract` calls `a0=1 a1=1`). The plain, non-orbit path
is also correct: forces are additive and weighted by `mass / distance²` — a symmetric two-absorber
setup nets `(0, ~1e-17)`, and boosting one absorber 4× biases the drift toward it.

**The `orbits` path is broken with 2+ absorbers** (R11). `particle.absorberOrbit` is a single
`Vector` field on the particle, not one per absorber. Each orbit absorber overwrites the shared
orbit and the particle position, so the last one in the array effectively owns the particle while
the previous one still fights for it. Traced with orbit absorbers at `x=200` and `x=800`:

```
f0: start=(500,500) afterA0=(130,792) afterA1=(729,791) jump=599px
f1: start=(729,791) afterA0=(128,791) afterA1=(727,791) jump=599px
```

A 599px teleport inside a single frame, every frame. The orbit radius/angle are measured relative
to one absorber and applied around another, `absorberOrbit.length` is decremented once per
absorber (shrinking N× too fast), and `absorberOrbitDirection` is `??=`-assigned once from the
particle's velocity sign and never re-evaluated.

This is invisible with a single absorber, which is why only `orbits` configs looked wrong.

### Phase 2 design decisions

7. **One attraction weighted orbit field** (R11). There is no orbit owner and no nearest-wins rule:
   the orbit is a single parametric circle built from _all_ the `orbits` absorbers, each one
   weighted by the attraction it exerts, so the mass, the size and the distance decide how much it
   bends the orbit. The field center is `Σ(wᵢ·pᵢ) / Σwᵢ` and the collapse size is the same weighted
   average of the absorber sizes, with `wᵢ = massᵢ / max(dᵢ, sizeᵢ)²` — the very same force used on
   the velocity. With a single absorber the field is exactly that absorber, so the behavior of
   existing configs is unchanged; with several ones the orbit sits on the combined field and follows
   it continuously as the absorbers grow or get replaced, with no handover and no teleport.
8. **The orbit starts from the real offset** (R11). The old code picked a **random** angle, which
   teleported every particle the first time it got captured. The orbit vector is now built from the
   offset the particle already has relative to the field center, so entering an orbit doesn't move
   the particle, and the tests are deterministic.
9. **The attraction is never discarded, and never overwritten** (R12). Forces are _composed as
   vectors_ by the plugin, once per particle, before the absorbers grow: `Σ(vᵢ·|Fᵢ|)` with `vᵢ` the
   unit vector from the particle to absorber `i`. An absorber on the opposite side therefore
   _cancels_ the previous one instead of adding up its magnitude, and no absorber can overwrite
   what another contributed. `AbsorberInstance.attract()` no longer writes the particle velocity at
   all: it only reports its own force (`getForce()`) and handles the contact (absorbing and
   growing), so the composition has a single owner, the plugin.
10. **A parametric circle resolves the composed force on its own axes** (R12). The velocity is
    derived from the orbit rather than accumulated (it is reset to let the move plugin know the
    position is driven from here), so the net force is projected instead of dropped: the **radial**
    component changes the orbit radius (outward grows it, inward shrinks it) and the **tangential**
    component changes how fast the particle turns. This is what makes the composition meaningful in
    orbit mode: an absorber pulling sideways speeds the particle up or slows it down instead of
    contributing a meaningless shrink. With a single absorber the result is bit-for-bit the previous
    one: the force is purely radial and the tangential term is null.
11. **The interactor only drags** (R12). `AbsorbersInteractor.interact()` used to loop every particle
    and every absorber calling `attract()`, on top of `AbsorbersPluginInstance.particleUpdate()`.
    Measured: **2 calls per particle per frame as soon as a single click had happened**, so the force
    and the absorber growth were doubled for the rest of the session. The loop is gone; the
    attraction is applied once, by the plugin, like every other force.
12. **Force clamping** (R10). `getAttraction()` is the single place computing the force: it clamps the
    effective distance to `max(distance, this.size, minRadius)` — modelling the absorber as a
    finite-radius body rather than a point mass, which removes the singularity — and caps the
    magnitude at `maxAttractForce`. It is used both for the velocity and as the orbit weight, so the
    two can never disagree.
13. **In-canvas recycle** (R13). The orbit-collapse branch no longer inflates the radius to
    `min(canvas) * (1 ± 0.1)`. The particle is recycled to a random position inside the canvas via a
    shared `#recycleParticle()` helper, which clears `absorberOrbit` / `absorberOrbitDirection` /
    `needsNewPosition` (R14). The recycle frame returns early instead of snapping the particle onto a
    brand new orbit, and the orbit-derived position is clamped to the canvas bounds, since an
    absorber takes over the particle movement and is therefore responsible for keeping it visible.
14. **Life management is reconnected** (R9). `update(delta)` calls `absorber.update(delta)` for
    every absorber in its own loop, separate from the split loop, so the "at most one split per
    frame" rule is preserved.

### Phase 2 implementation

**`AbsorberInstance.ts`**

- New constant: `maxAttractForce = 100` (documented).
- `getAttraction(point)` is the single source of the force: clamped effective distance, capped
  magnitude. Used by `attract()` for the velocity and by the plugin for the orbit weights.
- `attract(particle, delta)` — it no longer writes the particle velocity nor its position: it
  handles absorption and growing only, and the third `orbitDriven`/`owner` parameter is **gone**.
  The `absorberOrbitOwner` field is **removed** from `OrbitingParticle`.
- `getForce(point)` — new, returns the force as a vector pointing from the point to the absorber,
  with the capped magnitude of `getAttraction`. This is what the plugin sums up.
- `#updateParticlePosition()` and `#recycleParticle()` are gone from this class.

**`AbsorbersPluginInstance.ts`**

- `update(delta)` runs two loops: life updates for every absorber, then the existing single-split
  scan.
- `particleUpdate` sums `getForce()` of every absorber into a single `force` vector, builds the
  orbit field from the same snapshot, runs the `attract()` contact loop, then either adds `force` to
  the velocity or hands it to the orbit. One composition point, no per-absorber velocity write.
- `#getOrbitField()` builds the attraction weighted center and collapse size out of the `orbits`
  absorbers only; the non orbiting ones push the particle through `force` instead of moving the
  geometry.
- `#updateOrbit()` owns the orbit kinematics: creation from the real offset, collapse recycle, the
  parametric placement, the canvas clamp, and the radial / tangential decomposition of `force`.
- `#recycleParticle()` is the shared in-canvas recycle helper.

**`AbsorbersInteractor.ts`**

- `interact()` only handles dragging; the duplicate `attract()` loop is removed.

## Tests

Coverage lives in `utils/tests/src/tests/AbsorbersSplit.ts` (R1–R8) and
`utils/tests/src/tests/AbsorbersMulti.ts` (R9–R14), styled after the existing engine/plugin tests
using `TestWindow` + `createCustomCanvas` fixtures. Deterministic only — no timing assertions.

Covered behaviors:

1. **Option loader** — `AbsorberSplit` defaults (`enable = false`, `quantity = 4`); `load()` merge;
   quantity validation (R5): `Infinity`/`NaN`/negative/fractional → default/clamped, no loud failure.
2. **`Absorber.load()`** — `split` merges; defaults preserved when `data.split` absent.
3. **`AbsorberInstance.shouldSplit()`** — disabled → `false`; limits `0` → `false`; at-creation == limit
   → `false` (R7 growth guard); after simulated growth (radius and mass paths separately) → `true`.
4. **`AbsorbersInstancesManager.splitAbsorber()`** — disabled → no-op; disabled `quantity` → no push;
   order: replacement exists before removal (R6); `push(quantity, position)` called with the old
   position; replacement options equal the original (`split.enable` preserved → future re-split);
   rejection during `addAbsorber` keeps the original absorber (mock the dynamic import fail).
5. **`AbsorbersPluginInstance.update()`** — fires split once and `break`s; no split when guard false;
   `particleUpdate` keeps `attract` + `particle.destroyed` break (R1).
6. **`AbsorbersInteractor`** — `absorber-split` mode with no click nops; hits nearest absorber only
   when `split.enable`; `.some()` restored in add-guard (R2); `isEnabled` includes the new mode and
   does **not** break `absorbers` click-to-add.

Phase 2 additions (`utils/tests/src/tests/AbsorbersMulti.ts`):

7. **Force safety** (R10) — a particle exactly on the absorber centre keeps a finite velocity; the
   magnitude never exceeds `maxAttractForce` as the distance shrinks; no `NaN`/`Infinity` leaks into
   `particle.velocity`.
8. **Non-orbit additivity** (regression guard for the audit) — all absorbers receive `attract`;
   symmetric setups cancel; an asymmetric mass biases the result toward the stronger absorber.
9. **Weighted orbit center** (R11) — with two equidistant absorbers of different mass the orbit radius
   is the distance to the attraction weighted center (245), not to any absorber (300) nor to the
   midpoint, and it keeps shrinking without jumping back to another one.
10. **No capture teleport** (R11) — the first frame of an orbit leaves the particle exactly where it
    was, the orbit starts from its real offset instead of a random point of the circle.
11. **Mass beats distance** (R11) — the heavy absorber bends the orbit more than the closer light one.
12. **Opposing forces cancel** (R12) — an orbit absorber opposed by a symmetric non-orbiting one
    keeps its radius, where alone the orbit collapses: the forces add up as vectors, not magnitudes.
13. **Every absorber moves the orbit** (R12) — a second absorber on the same side of the particle
    shrinks the orbit faster, a closer one on the opposite side grows it, and a sideways one speeds
    the particle up through the tangential component.
14. **Attraction is never dropped** (R12) — all the forces accumulate, and `getAttraction()` is capped
    and falls off with the distance.
15. **In-canvas recycle** (R13, R14) — a collapsed orbit keeps the particle inside the canvas, and the
    stale orbit geometry is cleared and rebuilt.
16. **Life management** (R9) — `AbsorberInstance.update()` is invoked once per frame per absorber;
    an absorber with a `life.duration` really does move when it expires.
17. **Split invariants preserved** — Phase 1 behavior (R1–R8) still holds: max one auto-split per
    frame, replacement-before-removal, growth guard.

`utils/tests/src/tests/AbsorbersSplit.ts` also gained a regression test for the double attraction
(1 call per particle per frame, with and without a click) and a dragging test for the interactor.

## Verification

```bash
# build + lint for the touched package
pnpm --filter @tsparticles/plugin-absorbers run lint
pnpm --filter @tsparticles/plugin-absorbers run build

# full suite (absorber split tests + regression)
pnpm exec vitest
pnpm exec vitest run utils/tests/src/tests/AbsorbersSplit.ts

# rebuild downstream consumers that ship absorbers (affected bundles + demos)
pnpm nx affected -t build

# docs formatting (markdown changed)
pnpm run prettify:readme
```

Manual demo check (absorption.ts demo or a scratch config under `demo/vanilla`):

- auto-split with `size.limit.radius` reached → burst + fresh small absorber;
- auto-split disabled by dropping mass/radius limit to `0`;
- `interactivity.onClick.mode: ["absorber-split"]` splits under the cursor;
- `split.quantity: 0` → split produces no particles (just replacement);
- classic `mode: "absorbers"` click-to-add and dragging still work with the new code paths.

## Release tasks (v4.5.0)

- **Changelog** (`plugins/absorbers/CHANGELOG.md` under a 4.5.0 heading):

  - Added `absorbers.split` option (`enable`, `quantity`) for auto-splitting when the absorber reaches
    its `size.limit.radius` / `size.limit.mass`.
  - Added `absorber-split` click interactivity mode to manually split a clicked absorber.
  - On split the absorber is replaced by a fresh one and `quantity` particles spawn at its position.
  - Credit `#5320` (RegiByte) and PR #5923 (ascweb).
  - Phase 2: fixed `AbsorberInstance.update()` never being called, which left `life.count`,
    `life.duration`, `life.delay` and `life.wait` without effect.
  - Phase 2: fixed unbounded attraction force producing `Infinity`/`NaN` particle velocities.
  - Phase 2: fixed multiple `orbits` absorbers fighting over the same particle, they now build a
    single attraction weighted orbit field driven by their mass, size and distance.
  - Phase 2: fixed a click on the canvas making the interactor attract on top of the plugin, doubling
    both the attraction force and the absorbers growth.
  - Phase 2: fixed absorbed particles being pushed outside the canvas when their orbit collapsed.

- **Commits** (one Conventional Commit per logical change; do not bypass Husky hooks):

  - `feat(absorbers): add absorber split options`
  - `feat(absorbers): add absorber-split click mode`
  - `feat(absorbers): auto-split absorbers on size/mass limit`
  - `test(absorbers): add absorber split coverage`
  - `docs: document absorber splitting`
  - `fix(absorbers): call AbsorberInstance.update to restore absorber life options`
  - `fix(absorbers): bound absorber attraction force`
  - `fix(absorbers): drive the orbit from an attraction weighted field instead of a single absorber`
  - `fix(absorbers): compose the absorbers forces as vectors so they cancel instead of summing`
  - `fix(absorbers): apply the absorber attraction once per frame, the interactor only drags`
  - `fix(absorbers): keep recycled particles inside the canvas`
  - `test(absorbers): add multi-absorber coverage`

- **Version bump**: aligned by release tooling for `@tsparticles/plugin-absorbers` + bundles that ship
  it. If the merged PR is reverted first, note so in the changelog.

## Acceptance criteria

1. `absorbers.split.enable` (default `false`) + `absorbers.split.quantity` (default `4`) load through
   the config API (JSON string + object form) and validate safely.
2. An absorber with configured `size.limit.radius` (or `size.limit.mass`) splits automatically when the
   limit is reached **after** having absorbed (never at creation), spawning `quantity` particles and a
   fresh replacement absorber with the same options.
3. `interactivity.onClick.mode: "absorber-split"` splits the absorber under the cursor that has
   `split.enable` (no size/mass requirement); no-op without click or when no valid absorber is hit.
4. Existing behavior is preserved: `absorbers` click-to-add idempotency (`.some` guard), absorber
   dragging, and the `particle.destroyed` break in both `interact()` and `particleUpdate()`.
5. No unhandled promise rejections; a failed replacement creation keeps the original absorber
   (R6); invalid `quantity` never hangs or overshoots the particle count (R5).
6. No per-frame split loops for any valid config (R7 growth guard, verified in tests).
7. New coverage ships with the feature (R8); full suite green; lint/Prettier clean on all touched files.
8. Docs updated (`markdown/Options/Plugins/Absorbers.md` + interactivity mode).
9. (Phase 2) A particle at the exact centre of an absorber keeps a finite velocity, and the
   attraction magnitude is bounded as the distance shrinks (R10).
10. (Phase 2) With 2+ `orbits` absorbers there is no per-frame position fight: the particle orbits the
    attraction weighted field, which sits on the combined center and follows the masses (R11).
11. (Phase 2) Entering an orbit does not teleport the particle (R11).
12. (Phase 2) The attraction of every absorber is applied, exactly once per frame, orbiting or not
    (R12): a click no longer doubles the force and the absorber growth.
    12b. (Phase 2) The forces compose as vectors, not as magnitudes (R12): two equidistant absorbers
    pulling in opposite directions cancel out instead of collapsing the orbit twice as fast, and no
    absorber overwrites the contribution of another.
13. (Phase 2) Absorbing a particle whose orbit collapses keeps it inside the canvas (R13).
14. (Phase 2) `life.count` / `life.duration` / `life.delay` work again — `AbsorberInstance.update()`
    is called once per frame per absorber (R9).
15. (Phase 2) Non-orbit multi-absorber attraction stays additive and symmetric (regression guard).

## Rollback strategy

- Additive-only: all new options and the click mode are opt-in (`enable: false`, no `split` config → no
  behavior change). Reverting removes `AbsorberSplit`, `splitAbsorber`, the `absorber-split` branch and
  the `update()` hook without runtime impact on existing configs.
- `update()` is a new frame hook — removing it restores 4.4.0 frame behavior exactly.
- The new unit tests revert with the feature.
- Phase 2 is bug-fix-only and **not** purely additive: reverting it restores known-broken behavior
  (dead `life` options, `NaN` velocities, orbit thrashing, off-canvas particles). Revert it only
  together with a documented replacement.
- `attract()` gained a third parameter, so the change is source-compatible for external callers.

## Verification notes (Phase 2)

- The absorber `position` option resolves against `container.canvas.size`, which the test fixture
  reports as `0×0`. Absorber tests must therefore either force the canvas size
  (`container.canvas.size` + `container.canvas.resize()`) or set positions explicitly via
  `absorber.position.setTo(...)`, as `utils/tests/src/tests/Absorbers.ts` already does.
- With a `0×0` canvas every absorber sits at the origin; an absorber with the default `destroy: true`
  then destroys the particle on the first frame, so any multi-absorber test must either use
  `destroy: false` or place the particle away from the origin.

## Linkage

- Parent plan: `.planning/handovers/4.5.0_PLAN.md` (Feature F — contingency).
- Related: `WORKSPACE_TEST_COVERAGE_PLAN.md` Wave 4 (plugin option loaders — absorbers).
- Source of intent: issue #5320; prototype: PR #5923.
