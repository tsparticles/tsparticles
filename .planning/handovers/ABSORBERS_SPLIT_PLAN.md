# Plan: Absorber Splitting (contingency for PR #5923)

Status: **Prepared as contingency** — v4.5.0 candidate
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

| # | Source | Finding | Required resolution |
|---|--------|---------|---------------------|
| R1 | matteobruni | `particle.destroyed` break removed from `AbsorbersInteractor.interact()` is a behavior regression | Restore the break; a destroyed particle must be ignored for the remaining absorbers |
| R2 | matteobruni | Changing `.some()` → `.find()` in the click-to-add guard is unnecessary | Keep `.some()` for the add-guard; use `.find()` only in the new split branch |
| R3 | matteobruni | Generic `mode: "split"` collides with potential future particle-splitting interactions | Use a qualified mode name: **`absorber-split`** |
| R4 | matteobruni | `clickPosition` is duplicated (new branch declares it again) | Single declaration hoisted above the mode branches |
| R5 | CodeRabbit | `split.quantity` is unvalidated → `push(Infinity)` hangs, fractional/negative produce wrong counts | Validate `quantity` in `AbsorberSplit.load()`: finite, floored, clamped to `[0, maxSplitQuantity]` |
| R6 | CodeRabbit | `splitAbsorber` removes the absorber **before** `addAbsorber`; if `addAbsorber` rejects, the absorber is permanently lost (unhandled rejection at both call sites) | Create the replacement **first**; only then remove the old absorber and push particles; attach rejection handlers at both call sites |
| R7 | CodeRabbit | Valid configs can continuously create particles (replacement immediately re-meets the limit → per-frame split loop) | Growth guard: an absorber cannot split until it has actually grown (absorbed ≥ 1 particle) since creation |
| R8 | CodeRabbit / SonarQube | 0% coverage on new code | Ship with unit tests (see Tests) |

## Current state analysis

Absorber plugin files that the PR touches, current line references (v4 base):

| File | Current state |
| ---- | ------------- |
| `plugins/absorbers/src/Options/Interfaces/IAbsorber.ts` | No `split` key (fields: `color`, `destroy`, `draggable`, `life`, `name`, `opacity`, `orbits`, `position`, `size`) |
| `plugins/absorbers/src/Options/Classes/Absorber.ts` | No `split`; `load()` uses `loadProperty`/`isNull`/`OptionsColor.create` pattern |
| `plugins/absorbers/src/AbsorberInstance.ts` | `limit` resolved in constructor (`IAbsorberSizeLimit`, defaults `radius/mass = 0`); `size`/`mass` grow in `attract()`; no `shouldSplit()` |
| `plugins/absorbers/src/AbsorbersInstancesManager.ts` | `addAbsorber(s)`, `removeAbsorber`, `getArray`, `clear`; no `splitAbsorber` |
| `plugins/absorbers/src/AbsorbersPluginInstance.ts` | `particleUpdate()` calls `attract` and keeps the `particle.destroyed` break; **does not** implement `update(delta)` today |
| `plugins/absorbers/src/AbsorbersInteractor.ts` | `handleClickMode` handles only `absorbers`; `interact()` keeps the `particle.destroyed` break; no split mode |
| `engine/src/Core/ParticlesManager.ts` | `update(delta)` calls `plugin.update?.(delta)` once per frame **before** particle phase-1 update — ideal frame hook for auto-split |

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
   particle) *and* for a limit `> 0` to be reached.
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

    if (isNumber(data.quantity)) {
      this.quantity = Math.min(Math.max(Math.trunc(data.quantity), 0), maxSplitQuantity);
    }
  }
}
```

(`isNumber` must be imported from `@tsparticles/engine`; `Math.trunc(NaN/Infinity)` guards the
hang/loop case from R5.)

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
  return (
    isInArray(absorbersMode, events.onClick.mode) || isInArray(absorberSplitMode, events.onClick.mode)
  );
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

## Tests

No absorber tests exist today; add coverage following repository conventions (new file(s) under
`utils/tests/src/tests/`, e.g. `AbsorbersSplit.ts`, styled after the existing engine/plugin tests using
`TestWindow` + `createCustomCanvas` fixtures). Deterministic only — no timing assertions.

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

- **Commits** (one Conventional Commit per logical change; do not bypass Husky hooks):

  - `feat(absorbers): add absorber split options`
  - `feat(absorbers): add absorber-split click mode`
  - `feat(absorbers): auto-split absorbers on size/mass limit`
  - `test(absorbers): add absorber split coverage`
  - `docs: document absorber splitting`

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

## Rollback strategy

- Additive-only: all new options and the click mode are opt-in (`enable: false`, no `split` config → no
  behavior change). Reverting removes `AbsorberSplit`, `splitAbsorber`, the `absorber-split` branch and
  the `update()` hook without runtime impact on existing configs.
- `update()` is a new frame hook — removing it restores 4.4.0 frame behavior exactly.
- The new unit tests revert with the feature.

## Linkage

- Parent plan: `.planning/handovers/4.5.0_PLAN.md` (Feature F — contingency).
- Related: `WORKSPACE_TEST_COVERAGE_PLAN.md` Wave 4 (plugin option loaders — absorbers).
- Source of intent: issue #5320; prototype: PR #5923.