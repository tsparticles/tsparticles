# Engine Particle Add/Remove & Group Tests — Deep Technical Specification

## Status

**Requested** — add missing engine test coverage in `@tsparticles/tests`, focused on particle
addition/removal, with and without groups.

The group path of `ParticlesManager` is **entirely untested** today (zero `group` references in any
test file). Non-group add/remove has partial coverage in `utils/tests/src/tests/Particles.ts`, but
the numeric limit modes, pooling, lifecycle events, and density paths are untested even without
groups.

Ambition: make `ParticlesManager` add/remove behavior (ParticlesManager.ts) the best-tested public
engine surface, and lock the group contract with regression tests so future engine refactors are
safe.

Primary technical source for executed behavior: `engine/src/Core/ParticlesManager.ts`.

---

## Table of Contents

0. [Scope and constraints](#0-scope-and-constraints)
1. [Behavior under test (reference)](#1-behavior-under-test-reference)
2. [Current coverage vs gaps](#2-current-coverage-vs-gaps)
3. [File plan](#3-file-plan)
4. [Test case specification](#4-test-case-specification)
5. [Phases and checklist](#5-phases-and-checklist)
6. [Verification plan](#6-verification-plan)
7. [Acceptance criteria](#7-acceptance-criteria)

---

## 0. Scope and constraints

### 0.1 In scope

- Engine (`@tsparticles/engine`) behavior only, tested from `utils/tests` (`@tsparticles/tests`).
- `ParticlesManager.addParticle / push / remove / removeAt / removeQuantity / clear / setDensity`
- Particle group assignment, group-based initialization, group limits, group filtering on removal.
- Global and per-group `particles.number.limit` behavior (`LimitMode.delete` / `LimitMode.wait`).
- **Limit invariant**: `count` must never exceed the configured limit on ANY addition path — initial
  load, `reset()`, `addParticle`, `push`, group init, density-driven push. Efficient invariant:
  `limit = 100` ⇒ never `count === 101`.
- Pooling (`#pool` reuse), bucket/z-layer bookkeeping, `particleAdded` / `particleRemoved` events,
  `initializer` callback, density handling, out-of-range edge cases.

### 0.2 Out of scope

- No new test framework, no visual/E2E tests.
- No testing of plugins/updaters/interactions beyond what they contribute to `ParticlesManager`
  lifecycle events.
- Note: `engine/` source is NOT frozen. If a test proves the limit invariant is violated (e.g.
  initial load with `value > limit` yields `count > limit`), the engine bug MUST be fixed — see
  constraint 5.

### 0.3 Constraints

1. Tests live in `utils/tests/src/tests/` and follow existing patterns
   (`tsParticles.load`, `TestWindow`, `createCustomCanvas`, `container.reset`, chai-style asserts).
2. Keep tests deterministic: no timing assertions; drive `update()` with explicit `{ value, factor }`
   deltas as the existing `Particles.ts` update smoke test does.
3. Every test phase must run green before proceeding (phases are independently shippable).
4. Use the existing `describe(... async () => ...)` + `beforeEach(reset)` isolation pattern.
5. **Limit invariant is non-negotiable.** On every addition path (initial load, reset, `addParticle`,
   `push`, group init, density) the post-state must satisfy `count <= number.limit.value` for the
   global pool and `countPerGroup <= groupLimit` for each group, in BOTH `LimitMode.wait` and
   `LimitMode.delete`. A test that fails on this invariant is a bug report against the engine, NOT a
   test to weaken: fix the engine in a bug PR with a changelog entry, then re-run the test green.

---

## 1. Behavior under test (reference)

All executed behavior referenced from `engine/src/Core/ParticlesManager.ts`:

### 1.1 `addParticle(position?, overrideOptions?, group?, initializer?)` — lines 103-168

- Limit resolution: `limit = group === undefined ? #limit : (#groupLimits.get(group) ?? #limit)` (line 110).
- `LimitMode.delete`: removes `count + 1 - limit` particles if positive (lines 115-123).
- `LimitMode.wait`: returns `undefined` when `count >= limit` (lines 124-129).
- Particle taken from `#pool` (`pop()`) or constructed; `init(id, position, overrideOptions, group)`
  sets `particle.group` via `initParticleState` (Particle.ts:171-173).
- `initializer(particle)` returning `false` pushes particle back to pool and returns `undefined`
  (lines 141-151).
- On success: pushed to `#array`, inserted into z-bucket, `#nextId++`, dispatches
  `EventType.particleAdded` (lines 153-160).
- Errors are caught and logged, returns `undefined` (lines 163-167).

### 1.2 `push(nb, position?, overrideOptions?, group?)` — lines 266-275

- Loops `addParticle(position, overrideOptions, group)` `nb` times.

### 1.3 Removal — lines 291-324, 569-592

- `remove(particle, group?, override?)` → `removeAt(indexOf(particle), ...)`.
- `removeAt(index, quantity, group?, override?)`:
  - no-op when `index < 0 || index > count` (line 303);
  - loops while `deleted < quantity && i < count`, calls `#removeParticle(i, group, override)`,
    decrements `i` on success (lines 307-314).
- `removeQuantity(quantity, group?)` → `removeAt(0, quantity, group)`.
- `#removeParticle(index, group?, override?)`:
  - returns `false` when `particle.group !== group` (group filter, line 576);
  - splices array, removes from bucket, `particle.destroy(override)`, dispatches
    `EventType.particleRemoved`, returns particle to `#pool` (lines 580-591).

### 1.4 `clear()` — lines 173-177

- Resets array, clears `#particleBuckets`, resets z-buckets. Note: does NOT dispose particles nor
  touch `#pool` (current behavior — test documents it).

### 1.5 Group initialization — `#initPlugins` lines 504-521

- For each `particles.groups[group]` with `number.value > 0`, adds group particles first
  (`addParticle(undefined, groupOptions, group)`), while total stays under `particles.number.value`.
- Remaining slots filled with ungrouped particles (`addParticle()`).
- Group particle count counts toward the global `particles.number.value` total.

### 1.6 Limits & density — `#applyDensity` lines 394-429

- Density **is an add/remove engine**: when enabled, it either `push(...)` to reach the
  density-computed count or `removeQuantity(...)` when over (lines 424-428). Tests must exercise
  density through the same add/remove lens as every other path.
- Density disabled, no group: `#limit = numberOptions.limit.value` (only recorded — NO trimming of
  existing particles).
- Density disabled, group: `#groupLimits.set(group, groupOptions.number.limit.value ?? numberOptions.limit.value)`.
- Density enabled: limit scales by density factor; pushes or removes to match density-computed
  count (group-filtered count via `this.filter(t => t.group === group).length`, line 416).
- **Init-order risk (the reason the limit invariant must be pinned down):** `setDensity()` runs
  AFTER `particles.init()` in `Container.init()` (Container.ts:427 → 431) and on resize
  (CanvasManager.ts:457). On first load `#limit`/`#groupLimits` are still `0`/empty while
  `particles.init()` creates particles — so `value > limit` may overshoot on first load, and with
  density disabled no re-trim happens. Tests T23-T25 must lock this behavior (or expose it as a bug
  to fix per constraint 5).
- `setDensity()` iterates `options.particles.groups` first (group tops-up/trim per group), then
  global particles (lines 327-352).

### 1.7 Buckets

- z-bucket index from `particle.position.z` (lines 557-567); `particleBuckets` maps `id → index`.
- `#updateParticleBucket` moves particles between z-buckets on z change (lines 627-670).

### 1.8 Pooling

- Removed particles are pushed to `#pool` (line 589) and reused by `addParticle` (line 137).
- After pool reuse the particle is re-initialized: id, position, options and group are refreshed.

---

## 2. Current coverage vs gaps

### 2.1 Already covered (`utils/tests/src/tests/Particles.ts`)

| Behavior | Where |
|---|---|
| reset creates `particles.number.value` particles | `Particles.ts:52-56` |
| `addParticle(position)` increment count + membership | `Particles.ts:58-85` |
| `removeAt(index)` / `removeAt(index, quantity)` | `Particles.ts:87-133` |
| `removeQuantity(quantity)` | `Particles.ts:135-147` |
| `remove(particle)` | `Particles.ts:149-173` |
| `clear()` | `Particles.ts:175-183` |
| `push(nb, position)` positions | `Particles.ts:185-200` |
| `update(delta)` smoke | `Particles.ts:202-251` |
| `addParticle` shape/effect override options | `Particle.ts` |

### 2.2 Gaps (untested)

1. **Groups — everything.** `addParticle(..., group)` `particle.group` assignment; group init from
   `particles.groups` on reset; `ParticlesOptions.groups` loading; group limits; group-filtered
   removal (`removeAt` / `removeQuantity` / `remove` with group arg); group density paths.
2. **Limit modes (global)** — `LimitMode.delete` and `LimitMode.wait` with `number.limit.value`.
3. **Group limits** — `#groupLimits` per-group limits and the `?? #limit` fallback.
4. **Pooling** — `#pool` reuse after removal, re-init of pooled particles.
5. **Events** — `particleAdded` and `particleRemoved` dispatch (Payload: `{ particle }`).
6. **`initializer` callback** — `false` result rejects and returns particle to pool.
7. **Bucket/z-layer bookkeeping** — particles land in correct z-bucket; bucket updated on z change;
   removed from bucket on removal.
8. **Out-of-range removals** — `removeAt` with index `< 0` / `> count` and quantity extending past end.
9. **`setDensity()`** — density enabled (count scaled by canvas area), group + global density paths.
10. **`clear()` semantics** — pool untouched, buckets reset (documents current behavior).
11. **Limit invariant on every addition path** — initial load / `reset()` with `value > limit`
    (both modes), `push(n)` exceeding the limit, group init under a global limit, and density-driven
    add/remove (incl. resize). Density-disabled trimming and the init-order behavior of
    `setDensity()` vs `particles.init()` are untested — this is where an overshoot (`count > limit`)
    can hide.

---

## 3. File plan

| File | Action | Content |
|---|---|---|
| `utils/tests/src/tests/Particles.ts` | Extend | Numeric limits (delete/wait), out-of-range removals, clear semantics, pooling reuse across add→remove→add, `initializer` callback. |
| `utils/tests/src/tests/ParticleGroups.ts` | **New** | Group option loading, group init counts, `particle.group` assignment, group limits, group-filtered removal, group density. |
| `utils/tests/src/tests/ParticlesEvents.ts` | **New** | `particleAdded` / `particleRemoved` event dispatch + payload (grouped and ungrouped). |
| `utils/tests/src/Fixture/Utils.ts` | Extend (optional) | Shared group-options helpers (e.g. `buildGroupOptions`), mirroring `buildParticleWithDirection`. |

Naming follows the repo convention (file name maps to the concern under test, no `.test.ts` suffix —
the vitest `include: ["src/tests/*.ts"]` glob picks the files up).

---

## 4. Test case specification

### 4.1 Particle add/remove without groups (extend `Particles.ts`)

**T1 — Limit mode `wait`**
- Options: 5 particles, `number.limit = { value: 5, mode: "wait" }`.
- `addParticle()` returns `undefined`, count stays 5.

**T2 — Limit mode `delete`**
- Options: 5 particles, `number.limit = { value: 3, mode: "delete" }`.
- `addParticle()` returns a particle, count stays `<= 3` (deletes oldest to make room).
- Assert removed survivors are the first `count - (3 - 1)` particles of the original array.

**T3 — Out-of-range `removeAt`**
- `removeAt(-1)`, `removeAt(count)`, `removeAt(count + 1)`: count unchanged, no throw.

**T4 — Quantity past end**
- `removeQuantity(n)` with `n > count` removes all remaining particles, count becomes 0.

**T5 — Pooling reuse**
- reset with `number: 0`; `addParticle()` twice, collect ids, remove both, then `addParticle()` again.
- Assert the new particle reuses a pooled instance: id regenerated, count increments, particle is
  present in array, and `!particle.destroyed`.

**T6 — `initializer` callback**
- `initializer` returning `false`: `addParticle` returns `undefined`, count unchanged.
- `initializer` returning `true`: particle added as normal.
- Assert the rejected particle is not in the array but is returned to the pool (next `addParticle`
  with `true` still works).

**T7 — `clear()` semantics**
- After adding N + manually removing 1 earlier (pool non-empty): `clear()` keeps count 0 and leaves
  pool intact; next `addParticle()` works.

### 4.2 Groups (new `ParticleGroups.ts`)

**T8 — `particle.group` assignment**
- `particles.number.value = 0`; `addParticle(undefined, undefined, "g1")`.
- Assert returned particle `group === "g1"`, count 1, `filter(p => p.group === "g1").length === 1`.

**T9 — Group initialization on reset**
- Options: `particles.number.value = 8`, groups `{ g1: { number: { value: 3 } }, g2: { number: { value: 2 } } }`.
- After reset: total count 8; exactly 3 grouped `g1` and 2 grouped `g2`; remaining 3 ungrouped
  (`particle.group === undefined`).

**T10 — Group particle options override**
- Group `g1` with a distinct per-group option (e.g. shape/color) — assert the grouped particle's
  resolved options reflect the group override, not only the global particles options.

**T11 — Ungrouped `addParticle` with group limit set**
- Reset with group limit configured; `addParticle()` without group does not consume the group's limit
  (ungrouped uses global `#limit`, group-only particles do not block ungrouped adds).

**T12 — Group-filtered removal — `removeAt`**
- 6 particles: 3 in `g1`, 3 in `g2`. `removeAt(0, 2, "g1")` removes only `g1` particles.
- Assert `g2` count unchanged, `g1` count decreased by 2, returned/remaining array respects order.

**T13 — Group-filtered removal — `removeQuantity`**
- `removeQuantity(2, "g2")` removes 2 of `g2`, leaves `g1` intact.

**T14 — Group-filtered removal — `remove(particle, group)` mismatch**
- `remove(g1Particle, "g2")` returns no-op (count unchanged) because `particle.group !== group`.
- `remove(g1Particle, "g1")` removes it.

**T15 — Group limit enforcement (`LimitMode.wait`)**
- Group with `number.limit = { value: 2, mode: "wait" }`; adding a 3rd `g1` particle returns
  `undefined`; adding an ungrouped particle still succeeds.

**T16 — Group limit enforcement (`LimitMode.delete`)**
- Group with `number.limit = { value: 2, mode: "delete" }`; adding beyond 2 deletes oldest `g1`
  particle to make room while leaving ungrouped particles alone.

### 4.3 Density (add to `ParticleGroups.ts` / `Particles.ts`)

Density works through add/remove (`push` / `removeQuantity` in `#applyDensity`, lines 424-428), so
these tests assert both the resulting count and that the limit invariant is preserved.

**T17 — Global density**
- `particles.number.density.enable = true` with known canvas size (1920×1080) and
  `density.width/height` chosen to yield `Math.min(value, limit) * factor + pluginsCount === N`
  (compute expected N from `#initDensityFactor` formula: `(w*h) / (densityW * densityH * pxRatio^2)`).
- After reset assert exact count N; after `container.resize` with a known new size, assert count
  re-scaled (resize calls `setDensity()` again → new add/remove cycle).
- Assert the density-driven `push` path (undershoot: count raised to N) and the density-driven
  `removeQuantity` path (overshoot: count lowered to N) both fire the expected
  `particleAdded`/`particleRemoved` events.

**T18 — Group density**
- Group with density enabled: assert group count scaled by factor and `#groupLimits` scaled, other
  groups untouched. Push/remove imbalance: assert group undershoot topped up and overshoot trimmed
  (lines 424-428).
- Assert group density add/remove never moves particles of other groups and never exceeds the
  group's effective (scaled) limit.

**T18b — Density disabled, `value > limit` (no trimming)**
- `density.enable = false`, `value = 200`, `limit = { value: 100, mode: "wait" }`.
- This documents current behavior: on first load `setDensity()` only records `#limit` and does NOT
  trim existing particles (T23/T24 govern whether overshoot is acceptable or a bug to fix).

### 4.4 Events (new `ParticlesEvents.ts`)

**T19 — `particleAdded` dispatch**
- Register container listener; `addParticle()`; assert event fired with `data.particle` equal to the
  returned particle and `particle.group` correct. Also fires for group-initialized particles on
  reset.

**T20 — `particleRemoved` dispatch**
- `remove(particle)` / `removeAt(...)` / `removeQuantity(...)`; assert event fires once per removal
  with correct particle payload. Assert `clear()` does NOT fire `particleRemoved` (documents current
  behavior — reference method: `#removeParticle` is not called by `clear()`).

**T21 — Events fire per add/remove batch**
- `push(4, ...)`: 4 `particleAdded` events; `removeQuantity(2, "g1")` with mixed groups: only `g1`
  removals fire.

### 4.5 Buckets (add to `ParticleGroups.ts`)

**T22 — z-bucket placement**
- Add particles with explicit `z` values; assert bucket bookkeeping consistent: draw order counts
  (particles with higher z render above) and removal removes the particle from the correct bucket
  (verified indirectly through `drawParticles` smoke + count).
- Move a particle z (via `update` with a z-shifting updater or direct `position.z` change +
  `container.particles.update(delta)`) and assert bucket re-assignment does not break ordering/count.

### 4.6 Limit invariant — every addition path (global + group + density)

These tests are the core of this plan: the limit is a hard post-condition on EVERY way particles are
added. For `limit = 100` the assertion is always `container.particles.count <= 100` (never `101` in
any mode, any path). Any failure is an engine bug to fix (constraint 5), not a test to adjust.

**T23 — Initial load with `value > limit` (`LimitMode.wait`)**
- `tsParticles.load` with `number.value = 200`, `limit = { value: 100, mode: "wait" }`.
- After load + a `particles.update(delta)` frame: assert `count <= 100`.
- Sub-case: same but `value = limit` (100) → assert `count === 100`.

**T24 — Initial load with `value > limit` (`LimitMode.delete`)**
- Same as T23 with `mode: "delete"`: after load + update frame, assert `count === 100` and that only
  oldest particles were trimmed to make room.

**T25 — `reset()` never grows past the limit**
- Run `container.reset(options)` twice in a row with `value = limit`.
- Assert `count === limit` after EACH reset (limit persists across resets — do not reset to 0 and
  re-grow). Same for group-only resets: `count(group) === groupLimit`.

**T26 — `push(n)` with `n >> limit`**
- `particles.number.value = 0`, `limit = { value: 100, mode: "wait" }`; `push(500)`.
- Assert `count === 100` and all post-push `addParticle()` return `undefined`.

**T27 — Repeated single `addParticle()` beyond limit**
- `value = 0`, `limit = { value: 100, mode: "wait" }`; loop `addParticle()` 100 + 5 times.
- Assert first 100 return particles, next 5 return `undefined`, `count === 100`.
- Repeat with `mode: "delete"`: 105 adds → `count === 100`, never `101`.

**T28 — Group init under a global limit**
- `number.value = 200`, `limit = { value: 100 }`, groups `{ g1: { number: { value: 150 } } }`,
  `g2: { number: { value: 150 } }`.
- After reset: total `count <= 100` (group init must not blow through the global limit), while each
  group's own count never exceeds its own limit when set.
- Mixed with density disabled (T18b): this is the init-order risk area — assert the invariant, and
  if `count > limit` on first load, file the engine bug (see T23/T24 sub-case note).

**T29 — Per-group limit + add beyond it (`wait`/`delete`)**
- Global limit high (won't bite), `g1` with `number.limit.value = 2`.
- Add 5 `g1` particles: `wait` → only 2 admitted (`count(g1) === 2`, rest `undefined`);
  `delete` → `count(g1) === 2` with oldest `g1` trimmed; ungrouped adds unaffected.

**T30 — Density push/remove preserves the limit**
- Density enabled with a density factor < 1 (target below limit): count lands at
  `min(value, limit) * factor`, never above the effective limit, whether the target is reached by
  `push` (undershoot) or `removeQuantity` (overshoot).
- After `container.resize` to a larger canvas that raises the target: count scales up but still
  `<= limit`.

**T31 — Invariant across `update(delta)` frames**
- Mixed scene (grouped + ungrouped, limit set, density on): run 10 `update()` frames with explicit
  deltas; after every frame assert `count <= limit` globally and `count(group) <= groupLimit` per
  group. Guards against removal-then-re-add cycles (e.g. out-modes, destroy) inflating the count.

Every test above asserts the invariant as a post-condition; failures are engine bugs by definition.

---

## 5. Phases and checklist

### Phase 0 — Baseline

- [ ] Run `pnpm exec vitest` — confirm current suite green before adding tests.
- [ ] Record existing test list (`utils/tests/src/tests/*.ts`) as regression reference.

Exit criteria: baseline green, package scripts (`test`, `test:particle`) confirmed.

### Phase 1 — Non-group robustness + limit additions (extend `Particles.ts`)

- [ ] T1-T7 implemented (limit wait/delete, out-of-range, quantity past end, pooling, initializer, clear).
- [ ] T23-T27 implemented: initial load & reset with `value > limit` (both modes), `push(n) >> limit`,
      repeated `addParticle()` beyond limit — invariant `count <= limit` asserted after every step.
- [ ] Run `pnpm --filter @tsparticles/tests test:particle` (executes `Particles.ts`).
- [ ] If any invariant test fails (e.g. first-load overshoot): fix the engine bug, add a changelog
      entry, re-run green — do NOT weaken the test.

Exit criteria: `Particles.ts` fully green with new cases, limit invariant holds on all non-group
addition paths.

### Phase 2 — Group option loading + assignment (new `ParticleGroups.ts`)

- [ ] T8, T10: `particle.group` assignment + per-group option override.
- [ ] Assert `ParticlesOptions.groups` deep-extend loads from config — object form only. Config may
      already arrive parsed from a JSON file, so JSON string input is NOT a supported group-input path;
      no recursive JSON support.

Exit criteria: grouped `addParticle` contract locked.

### Phase 3 — Group initialization lifecycle (continue `ParticleGroups.ts`)

- [ ] T9: reset creates correct mix of grouped + ungrouped particles under `particles.number.value`.
- [ ] Verify interplay with phase-1 limit cases (global limit + groups).

Exit criteria: `#initPlugins` group path exercised on reset/init.

### Phase 4 — Group-filtered removal (continue `ParticleGroups.ts`)

- [ ] T12-T14: `removeAt`/`removeQuantity`/`remove` group filtering and mismatch no-op.

Exit criteria: `#removeParticle` group guard (ParticlesManager.ts:576) covered.

### Phase 5 — Limits (global + group, all addition paths)

- [ ] T11, T15, T16: group limit fallback (`?? #limit`), group `wait`/`delete`.
- [ ] T28-T29: group init under a global limit, per-group limit enforcement with global limit present.
- [ ] Re-run full suite to ensure global limit cases (T1-T2, T23-T27) still green.
- [ ] If group init overshoots the global limit on first load (init-order risk): fix engine, add
      changelog entry, re-run green.

Exit criteria: `#limit` / `#groupLimits` resolution fully covered; no path produces
`count > limit`.

### Phase 6 — Density (add/remove engine)

- [ ] T17, T18, T18b, T30: global + group density counts, limits and effective-limit cap; density
      under/overshoot via `push`/`removeQuantity`; resize re-scaling; events fired per add/remove.
- [ ] Assert the density-driven add/remove never violates `count <= limit` (global) nor the group
      cap, on reset and after resize.

Exit criteria: `#applyDensity` + `setDensity()` paths covered and limit-safe on the density paths.

### Phase 7 — Events, pooling, buckets

- [ ] T19-T21 in new `ParticlesEvents.ts` (incl. events from density-driven add/remove, T17 side-check).
- [ ] T5-T6 pooling / initializer regression re-run.
- [ ] T22 bucket placement + re-bucket smoke.
- [ ] T31: invariant across consecutive `update(delta)` frames.

Exit criteria: `particleAdded`/`particleRemoved` and pool/bucket behavior locked.

### Phase 8 — Verification, bug-fix cycle & coverage

- [ ] `pnpm exec vitest` full suite green.
- [ ] `pnpm nx run @tsparticles/tests:lint` (or package lint script) — new files conform to
      `sort-imports` rules and repo style.
- [ ] Run every limit-invariant test from scratch (fresh `tsParticles.load`, not warmed container)
      to make sure init-order behavior is what the tests assert.
- [ ] Coverage report: confirm new cases cover `ParticlesManager.addParticle/remove*/setDensity`
      group + limit branches (v8 provider in `utils/tests/vitest.config.ts`).
- [ ] Bug-fix cycle: every failing invariant test is either (a) engine fix + changelog entry, or
      (b) rejected only if the reviewer proves the asserted behavior is intended — with the
      expectation documented in the test name + a code comment.

Exit criteria: suite + lint green, invariant proven on all addition paths, coverage delta on
`ParticlesManager` documented.

---

## 6. Verification plan

- `pnpm exec vitest` — full suite (must be green; no flaky timing assertions).
- `pnpm --filter @tsparticles/tests test:particle` — quick iteration loop for `Particles.ts`.
- `pnpm --filter @tsparticles/tests run lint` — new files pass ESLint (sorted imports, style).
- `pnpm --filter @tsparticles/tests test:ci` for `NODE_ENV=test` parity.
- Coverage delta: run `pnpm exec vitest --coverage` and compare branch coverage of
  `engine/src/Core/ParticlesManager.ts` before/after (target >90% for add/remove/group/density).

Behavioral assertions (manual sanity):

1. Group mix on reset matches configured `particles.groups[g].number.value` exactly.
2. Group-filtered removal only ever removes particles of the requested group.
3. Limit `wait` refuses extra particles; `delete` trims oldest from the same group/global pool.
4. `addParticle` with a group never leaks into the ungrouped count when limits/density race.
5. **Limit invariant sweep** — with `limit = 100`, every scenario (load, reset, push, group init,
   density, resize, update frames) ends with `count <= 100`; greppable one-line assert
   `expect(container.particles.count).to.be.at.most(100)` used throughout the new tests.
6. Density add/remove is observable as events (`particleAdded`/`particleRemoved` fire exactly once
   per particle created/removed by `#applyDensity`).

---

## 7. Acceptance criteria

1. Groups are tested end-to-end: assignment, option override, init on reset, limits, filter removal,
   and density — previously 0% group coverage.
2. Global limit modes (`wait`/`delete`) are tested even without groups, with `value > limit` on
   initial load and `reset()`.
3. **Limit invariant proven on every addition path**: initial load, `reset()`, `addParticle`,
   `push`, group init, and density-driven add/remove (incl. resize) — with `limit = 100` the test
   suite never allows `count === 101` in either limit mode.
4. Density is tested as an add/remove engine: undershoot topped up via `push`, overshoot trimmed via
   `removeQuantity`, group + global, resize re-scaling, and matching `particleAdded`/`particleRemoved`
   events.
5. Pooling reuse, `initializer` rejection, `particleAdded`/`particleRemoved` events, bucket
   bookkeeping, out-of-range removals are covered by new tests.
6. Engine fixes are permitted (and expected) when a test proves a limit-invariant violation; such
   fixes ship as a bug PR with a changelog entry and the failing test goes green unchanged.
7. Full suite green, lint clean, new helpers added to `Fixture/Utils.ts` (if needed) reused by tests.
8. Coverage on `ParticlesManager` add/remove paths measurably increased vs the 4.5.0 baseline.