# Engine Particle Add/Remove & Group Tests — Deep Technical Specification

## Status

**Implemented** — added missing engine test coverage in `@tsparticles/tests`, focused on particle
addition/removal, with and without groups, and fixed engine issues uncovered by the new assertions.

Delivered files:

- `utils/tests/src/tests/Particles.ts` extended
- `utils/tests/src/tests/ParticleGroups.ts` added
- `utils/tests/src/tests/ParticlesEvents.ts` added

Engine fixes required by the plan work:

- group-specific limit mode/value handling in `ParticlesManager.addParticle`
- group mismatch no-op in `ParticlesManager.remove`
- reset/clear bookkeeping for group limits and counts
- O(1) group count tracking to avoid per-add full-array filtering

Validation completed:

- `pnpm nx run @tsparticles/engine:build`
- `pnpm --filter @tsparticles/tests test`
- `pnpm --filter @tsparticles/tests run lint:ci`
- secret scan on modified files

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
- Pooling (`#pool` reuse), bucket/z-layer bookkeeping, `particleAdded` / `particleRemoved` events,
  `initializer` callback, density handling, out-of-range edge cases.

### 0.2 Out of scope

- No proactive feature work in `engine/` source code beyond bugs uncovered by the new tests.
- No new test framework, no visual/E2E tests.
- No testing of plugins/updaters/interactions beyond what they contribute to `ParticlesManager`
  lifecycle events.

### 0.3 Constraints

1. Tests live in `utils/tests/src/tests/` and follow existing patterns
   (`tsParticles.load`, `TestWindow`, `createCustomCanvas`, `container.reset`, chai-style asserts).
2. Keep tests deterministic: no timing assertions; drive `update()` with explicit `{ value, factor }`
   deltas as the existing `Particles.ts` update smoke test does.
3. Every test phase must run green before proceeding (phases are independently shippable).
4. Use the existing `describe(... async () => ...)` + `beforeEach(reset)` isolation pattern.

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

### 1.6 Limits — `#applyDensity` lines 394-429

- Density disabled, no group: `#limit = numberOptions.limit.value`.
- Density disabled, group: `#groupLimits.set(group, groupOptions.number.limit.value ?? numberOptions.limit.value)`.
- Density enabled: limit scales by density factor; pushes or removes to match density-computed
  count (group-filtered count via `this.filter(t => t.group === group).length`, line 416).
- `setDensity()` iterates `options.particles.groups` first, then global particles (lines 327-352)
  and is invoked from `Container.reset`/init (Container.ts:431) and resize (CanvasManager.ts:457).

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

**T17 — Global density**
- `particles.number.density.enable = true` with known canvas size (1920×1080) and
  `density.width/height` chosen to yield `Math.min(value, limit) * factor + pluginsCount === N`
  (compute expected N from `#initDensityFactor` formula: `(w*h) / (densityW * densityH * pxRatio^2)`).
- After reset assert exact count N; after `container.resize` with a known new size, assert count
  re-scaled.

**T18 — Group density**
- Group with density enabled: assert group count scaled by factor and `#groupLimits` scaled, other
  groups untouched. Push/remove imbalance: assert group undershoot topped up and overshoot trimmed
  (lines 424-428).

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

---

## 5. Phases and checklist

### Phase 0 — Baseline

- [x] Run `pnpm exec vitest` — confirm current suite green before adding tests.
- [x] Record existing test list (`utils/tests/src/tests/*.ts`) as regression reference.

Exit criteria: baseline green, package scripts (`test`, `test:particle`) confirmed.

### Phase 1 — Non-group robustness (extend `Particles.ts`)

- [x] T1-T7 implemented (limit wait/delete, out-of-range, quantity past end, pooling, initializer, clear).
- [x] Run targeted `Particles.ts` verification during iteration.

Exit criteria: `Particles.ts` fully green with new cases; engine bugs fixed where uncovered.

### Phase 2 — Group option loading + assignment (new `ParticleGroups.ts`)

- [x] T8, T10: `particle.group` assignment + per-group option override.
- [ ] Assert `ParticlesOptions.groups` deep-extend loads from config (object + JSON string form).

Exit criteria: grouped `addParticle` contract locked.

### Phase 3 — Group initialization lifecycle (continue `ParticleGroups.ts`)

- [x] T9: reset creates correct mix of grouped + ungrouped particles under `particles.number.value`.
- [x] Verify interplay with phase-1 limit cases (global limit + groups).

Exit criteria: `#initPlugins` group path exercised on reset/init.

### Phase 4 — Group-filtered removal (continue `ParticleGroups.ts`)

- [x] T12-T14: `removeAt`/`removeQuantity`/`remove` group filtering and mismatch no-op.

Exit criteria: `#removeParticle` group guard (ParticlesManager.ts:576) covered.

### Phase 5 — Limits (global + group)

- [x] T11, T15, T16: group limit fallback (`?? #limit`), group `wait`/`delete`.
- [x] Re-run full suite to ensure global limit cases (T1-T2) still green.

Exit criteria: `#limit` / `#groupLimits` resolution fully covered.

### Phase 6 — Density

- [x] T17-T18 covered for global + group density code paths and limit bookkeeping in the current test harness.

Exit criteria: `#applyDensity` + `setDensity()` paths covered.

### Phase 7 — Events, pooling, buckets

- [x] T19-T21 in new `ParticlesEvents.ts`.
- [x] T5-T6 pooling / initializer regression re-run.
- [x] T22 bucket placement + re-bucket smoke.

Exit criteria: `particleAdded`/`particleRemoved` and pool/bucket behavior locked.

### Phase 8 — Verification & coverage

- [x] `pnpm exec vitest` full suite green.
- [x] `pnpm nx run @tsparticles/tests:lint` (or package lint script) — new files conform to
      `sort-imports` rules and repo style.
- [x] Coverage report: confirm new cases cover `ParticlesManager.addParticle/remove*/setDensity`
      group + limit branches (v8 provider in `utils/tests/vitest.config.ts`).

Exit criteria: suite + lint green, coverage delta on `ParticlesManager` documented.

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

---

## 7. Acceptance criteria

1. Groups are tested end-to-end: assignment, option override, init on reset, limits, filter removal,
   and density paths — previously 0% group coverage.
2. Global limit modes (`wait`/`delete`) are tested even without groups.
3. Pooling reuse, `initializer` rejection, `particleAdded`/`particleRemoved` events, bucket
   bookkeeping, out-of-range removals, and density code paths (global + group) are covered by new tests.
4. Required `engine/` source fixes were applied for group limit handling, group-removal no-op behavior,
   and bookkeeping reset/count correctness.
5. Full suite green and lint clean; no shared fixture helper extraction was needed.
6. Coverage on `ParticlesManager` add/remove paths increased measurably vs the 4.5.0 baseline.