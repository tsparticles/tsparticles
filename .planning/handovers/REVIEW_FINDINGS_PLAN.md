# Plan: CodeRabbit Review Findings — Triage & Follow-up

Status: **All items closed** (fixes done; two false-positive items rejected "won't fix") — v4.5.0 in progress
Scope: engine core, emitter/absorber feature work, configs, plugin-interactivity, plugin-move, tests
Current base: v4 @ `e7be08b68b` + follow-up commit

## How this was produced

`coderabbit review` was run **per folder** because the whole working diff of `v4` vs `main` is ~1341
files (19374 insertions / 13836 deletions) — above the review size limit. Two feature bases were
used:

| Review base | Folders |
| ----------- | ------- |
| `d9c4b07949` (HEAD~7, start of emitters draw/drag work) | `plugins/emitters`, `plugins/emittersShapes`, `plugins/absorbers`, `plugins/interactivity`, `utils/configs`, `utils/tests` |
| `d5bac26aa1` (parent of container-Plugin refactor) | `engine/src`, `plugins/move` |

Pipeline: 9 reviews → 22 reported findings (8 major / 14 minor). The commit `46b687eb10`
("format fix and fixed tests", 343 files) was excluded — it is pure Prettier churn that would drown
out real findings.

**Every finding was then manually re-checked against the current source.** CodeRabbit analyzed
`utils/configs` against the *published* `@tsparticles/plugin-emitters` types (resolved from
`node_modules`), producing several false positives on the `draw`/`draggable` config fields — those
are marked below. Findings that survived manual verification are grouped in the task list as
"recommended", "needs decision", or "skip".

## Task list

Recommended fixes (low-risk, do these):

- [x] **Fix emitter draw honoring disabled fill** — `EmitterInstance.draw()` still fills the shape when `spawn.fill.enable` is `false` but a color is set (`plugins/emitters/src/EmitterInstance.ts:265-304`). Mirror the effective-fill logic used in `#emitParticles` (`.enable ?? ??color` → `fillEnabled = spawn.fill?.enable ?? true`).
  - Done: draw now only sets `fillStyle`/calls `fill()` when `fillEnabled`. Default (no `spawn.fill`) still fills black. Regression test added (`emitters-draw-no-fill`).
- [x] **Stabilize drag selection when objects overlap** — the same loop bug exists in both interactors: a stationary overlapping emitter/absorber takes over a drag after the grabbed one moves away.
  - `plugins/absorbers/src/AbsorbersInteractor.ts:105-115` — only start a drag when `!this.#dragging`.
  - `plugins/emitters/src/EmittersInteractor.ts:138-150` — same guard (identical pattern).
  - Done: pick is now gated on `!this.#dragging` while the cancel branch still runs only on release. Regression tests added (`emitters-drag-overlap`, `absorbers-drag-overlap`).
- [x] **Destroy test containers in `try/finally`** — `utils/tests/src/tests/Emitters.ts` (all `it` blocks after `loadEmitterContainer`) and `utils/tests/src/tests/Absorbers.ts:56,94,123` leave containers in the global tsParticles registry, making tests order-dependent. This is explicitly required by the repo guideline (`.coderabbit.yaml` + AGENTS.md).
  - Done: every container-based test now destroys its container in `finally`.
- [x] **Replace real-time `setTimeout(…, 20)` waits** — `utils/tests/src/tests/Emitters.ts:314`, `utils/tests/src/tests/Absorbers.ts:153` make the click-mode assertions scheduler-dependent. Prefer awaiting the async add directly (or a next-tick/microtask flush) instead of a fixed delay.
  - Done: switched to `vi.waitFor(...)` (polls until the async add lands; no fixed sleep).

Decisions (behavioral semantics):

- [x] **Silently-discarded post-init registrations (engine)** — `PluginManager.add*` now `return`s without registering after `#initialized` (`engine/src/Core/Utils/PluginManager.ts:186`), a regression introduced by the container-Plugin refactor (`ca0c9be8f9`): a plugin/color/easing added *after* the first instance silently never reaches later containers, with no error surfaced. Options: (a) keep a pending list and apply on next load, (b) throw a documented lifecycle error like `register` already does, or (c) accept + document.
  - **Decided (won't change)**: the `#initialized` guard is intentional, to stay consistent with `register`. Keeping as-is (option c). No code change made.
- [x] **Dragged position lost on resize** — `EmitterInstance.resize()` resets `position` to `#initialPosition`/`#calcPosition()`, discarding a drag made before a canvas resize (`plugins/emitters/src/EmitterInstance.ts:379-382`). Accept as-is or store a drag override.
  - Done: added a `#positionOverride` flag set by `setPosition()`; `resize()` keeps the current position when set. Regression test added (`emitters-resize-drag`).

Rejected (won't fix, false positives / non idiomatic):

- [ ] **Won't fix — `utils/configs` "implement draw/draggable before publishing" × 3** — false positives: CodeRabbit resolved `@tsparticles/plugin-emitters` from `node_modules` (published types), where `IEmitter` lacks `draw`/`draggable`. On the workspace `v4` source both options are implemented and loaded (`Emitter.ts:115,117`); the proposed "fix" would delete working configs. Confirmed by user: ignore.
- [x] `utils/configs` click `mode: "emitters"` vs `"emitter"` — **resolved by user decision**: the public enum `EmitterClickMode.emitter = "emitter"` is the source of truth, so everything was aligned to `"emitter"` (not the other way round, which would be a breaking change to the enum). Files: `EmittersInteractor.ts` now uses `EmitterClickMode.emitter`, and configs `m/multipleClickEmitters`, `c/clickConfetti`, `e/emitter`, `e/emittersDrag`, `e/emittersDrawDrag` + the click-mode tests use `mode: "emitter"`. Note: existing custom configs relying on the undocumented `"emitters"` string would no longer match (behavior change on the unreleased dev branch).
- [ ] **Won't fix — `utils/configs/src/e/index.ts` named-exports suggestion** — the repo convention is default imports (all sibling `*/index.ts` files do the same); changing letter `e` alone would be inconsistent and provide no functional gain. Confirmed by user: ignore.

Clean folders (no findings): `plugins/emittersShapes`, `plugins/interactivity`, `plugins/move`.

## Completion notes (this session)

- All recommended fixes + the resize/drag decision are implemented and tested.
- Full `@tsparticles/tests` suite green: **223 tests passed** (was 219; +4 new regression tests: `emitters-draw-no-fill`, `emitters-drag-overlap`, `absorbers-drag-overlap`, `emitters-resize-drag`).
- ESLint + Prettier clean on changed files: `plugins/emitters`, `plugins/absorbers`, `utils/tests`.
- Rebuilt `@tsparticles/plugin-emitters` + `@tsparticles/plugin-absorbers` (tests import built `dist`).
- (Follow-up) Click-mode alignment to `"emitter"` (interactor + 5 configs + tests) — 223 tests still
  green, ESLint + Prettier clean, `@tsparticles/plugin-emitters` + `utils/configs` rebuilt.

## Findings detail

### 1. `plugins/emitters` (base `d9c4b07949`) — 2 minor, both real

**F-1. `EmitterInstance.draw` ignores a disabled spawn fill** — `plugins/emitters/src/EmitterInstance.ts:265-304` (`minor`, functional correctness).

`draw()` fills the shape whenever `spawnFillColor` is set; it does not look at `spawn.fill.enable`.
Particle emission *does* honor it: `#emitParticles` computes `fillEnabled = this.options.spawn.fill?.enable ?? !!this.options.spawn.fill?.color` (line 571) and `spawnFillEnabled` is only assigned during emission (line 599). So with
`spawn: { fill: { color: "#f00", enable: false } }` the emitted particles are hollow but the emitter
shape is still painted. Fix draft: derive the effective fill from `options.spawn.fill` in `draw()`
(`enable ?? !!color`) and skip `context.fill()`/`fillStyle` when disabled, mirroring `#emitParticles`.

**F-2. Dragged position discarded on resize** — `plugins/emitters/src/EmitterInstance.ts:379-382` (`minor`, behavior).

`resize()` rebuilds `position` from `#initialPosition`/`#calcPosition()`. A canvas resize happening
after an emitter was dragged snaps it back. Suggested approaches: store the last dragged position and
reapply it inside `resize()`, or track a "dragged" offset applied on top of `resize()`.

**F-3 (found during verification, mirrors F-4). Overlapping draggable emitters steal the drag** —
`plugins/emitters/src/EmittersInteractor.ts:138-150`.

Identical loop to the absorber one: each frame, every ray-cast hit re-assigns `#draggingEmitter`, and
the `else` branch clears it as soon as the grabbed emitter moves off `mouse.downPosition`. With two
overlapping draggable emitters the stationary one takes over mid-drag. Same guard as F-4.

### 2. `plugins/absorbers` (base `d9c4b07949`) — 2 minor (duplicated), real

**F-4. Drag selection can jump between overlapping absorbers** — `plugins/absorbers/src/AbsorbersInteractor.ts:105-115`.

When two draggable absorbers contain `mouse.downPosition`, the per-frame loop assigns
`#draggingAbsorber` for each match, and re-evaluates every frame while `mouse.clicking && downPosition`.
Once the grabbed absorber moves beyond its `size`, the `else` branch clears the drag, then the
stationary overlapping absorber re-grabs. CodeRabbit's proposed fix — only pick at drag start:
`if (!this.#dragging && mouse.clicking && mouse.downPosition)` — is correct. (Finding was reported
twice; it is one issue.)

### 3. `engine/src` (base `d5bac26aa1`, container-Plugin refactor) — 2 major (duplicated), needs decision

**F-5. `add*` registrations silently dropped after init** — `engine/src/Core/Utils/PluginManager.ts:186` (and all sibling `add*` methods).

The refactor added `if (this.#initialized) return;` guards. Before `ca0c9be8f9`, `addPlugin`,
`addShape`, `addEasing`, `addColorManager`, `addConfig`, `addPreset`, `addPalette`,
`addParticleUpdater`, `addEffect` accepted calls at any time. Now a caller registering a plugin after
the first container loads gets a silent no-op: the next container never loads the plugin and no error
is surfaced. `register` already reports this lifecycle problem explicitly — the `add*` API should give
the same signal (throw a documented error) or keep working (apply pending registrations on the next
load). Needs a product decision, hence not fixed blind.

### 4. `utils/tests` (base `d9c4b07949`) — 2 major + 3 minor, all real

**F-6. Containers not destroyed → global registry polluted.** `utils/tests/src/tests/Emitters.ts`
(every `it` that calls `loadEmitterContainer`, e.g. lines 102, 115, 132, 154, 175, 192, 229, 258, 286)
and `utils/tests/src/tests/Absorbers.ts:56, 94, 123` never call `container.destroy()`. Later tests can
receive polluted state and become order-dependent. Violates the repo guideline; wrap each test body in
`try/finally` calling `container.destroy()`.

**F-7. Real-time `setTimeout` waits.** `Emitters.ts:314` and `Absorbers.ts:153` use
`await new Promise(resolve => setTimeout(resolve, 20))` after `handleClickMode(...)` to wait for the
async emitter/absorber creation. Subject to scheduler jitter. Preferred: await the creation promise
directly, or flush via a microtask/`Promise.resolve()` tick, keeping tests deterministic.

### 5. `utils/configs` (base `d9c4b07949`) — 9 findings, mostly false positives

Reviewed against the published plugin package, not the workspace source — so the "option is ignored"
findings are wrong on `v4`:

- **Won't fix** — `emittersDraw.ts:31`, `emittersDrag.ts:45`, `emittersDrawDrag.ts:39,40`: "implement draw /
  draggable before publishing". Both options *are* loaded: `Options/Classes/Emitter.ts:115,117` loads
  `draggable` and `draw`; `EmitterInstance.draw()` (F-1) renders; `EmittersInteractor` drags (F-3).
  False positive (reviewed against the published package). Confirmed by user: ignore.
- **Resolved** — `emittersDrag.ts:39`, `emittersDrawDrag.ts:33` (also `emitter.ts:49`, clickConfetti,
  multipleClickEmitters): `mode: "emitters"` should be `"emitter"`. User decision: the public enum
  `EmitterClickMode.emitter = "emitter"` is the source of truth, so the implementation and all configs
  were aligned to `"emitter"` (`EmittersInteractor.ts` now references `EmitterClickMode.emitter`).
  Changing the *enum* the other way would be a breaking change, hence this direction.
- **Won't fix** — `index.ts:16`: named-exports style suggestion. All sibling per-letter `index.ts`
  files use default imports (e.g. `p/index.ts`), so this change would be inconsistent; no functional
  gain. Confirmed by user: ignore.

No config-content bug found on `v4`.

No config-content bug found on `v4`.

### 6. Clean folders

- `plugins/emittersShapes` (4 files) — 0 findings.
- `plugins/interactivity` (`InteractivityEventListeners.ts` diff) — 0 findings.
- `plugins/move` (5 files) — 0 findings.

## Recommended execution order

Executed this session:

1. ✅ F-1 (emitter draw fill) — isolated, testable; regression test `emitters-draw-no-fill`.
2. ✅ F-4 + F-3 (drag selection guard) — same `!this.#dragging` gate in both interactors; regression
   tests `emitters-drag-overlap` + `absorbers-drag-overlap`.
3. ✅ F-6 + F-7 (test hygiene) — every container-based test destroys its container in `finally`;
   click-mode waits use `vi.waitFor`.
5. ✅ F-2 (resize vs drag) — `setPosition` sets a `#positionOverride` flag that `resize()` honors;
   regression test `emitters-resize-drag`.

Not executed (intentional):

4. ⏸️ F-5 (engine late registration) — the `#initialized` guard is kept to stay consistent with
   `register`; no behavior change (user-confirmed option c).

Rejected (won't fix, user-confirmed):

- "implement draw/draggable before publishing" × 3 (`utils/configs`) — false positive.
- named-exports suggestion for `utils/configs/src/e/index.ts` — non idiomatic, no functional gain.

## Verification plan

- ✅ Full `@tsparticles/tests` suite: **223 tests passed** (13 files).
- ✅ Added regression tests: `emitters-draw-no-fill` (no `fill()` when `spawn.fill.enable=false`),
  `emitters-drag-overlap` + `absorbers-drag-overlap` (grabbed object keeps being dragged),
  `emitters-resize-drag` (dragged position survives `resize()`).
- ✅ Click-mode configs + interactor + tests aligned to `"emitter"`.
- ✅ ESLint + Prettier clean on changed files.
- ✅ Rebuilt `@tsparticles/plugin-emitters`, `@tsparticles/plugin-absorbers`, `utils/configs` (tests
  import built `dist`).