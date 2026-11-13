# V5 — Source-based planning coverage review

Reviewed on 2026-11-13 at `6ef62b21869b2e08de8f80911e1f9192c18d451c`.
This is a planning review, not a completed file-by-file engine audit, runtime
verification or benchmark. All implementation remains pending. Recheck evidence
on the implementation revision. The [execution sequence](V5-EXECUTION.md) remains
E0–E10, followed by an optional E11 backlog.

## Coverage assessment

The existing plan covers the major architectural changes: engine ownership,
services, options, Particle, collection/pool/index, rendering, color and packaging.
The missing detail is mostly explicit behavior and acceptance scenarios across
those boundaries. Generic instructions to review every file do not replace these
contracts. G1–G7 below are required review/verification additions to existing
stages; they do not mandate every proposed API or optimization.

Source inspection covered Engine/PluginManager, Container and frame scheduling,
Particle/Retina, ParticlesManager/grid/ranges, event dispatch, utility/option
boundaries, and selected movement, interaction, asset and lifecycle consumers.
Nx project discovery also verified the workspace inventory. Broad searches guided
inspection; untouched option classes and extension packages still require the
full audit specified by handovers 03/08.

Existing optimizations and tests must be retained, not reimplemented:

- PluginManager shares initialization, tracks in-flight loaders and supports
  retry. `LoadOrdering.ts` already covers nested loaders, failure/retry and stale
  loads. Add multi-engine/failure-boundary cases to that evidence.
- EventDispatcher replaces listener arrays on mutation. Existing
  `EventDispatcherLifecycle.ts` tests establish snapshot and nested-dispatch
  semantics; an allocation optimization must preserve them.
- SpatialHashGrid already has pooled ranges, caller-supplied output, finite-bound
  guards and an ordered sparse-query path. `SpatialHashGrid.ts` tests live
  predicates and reentrant queries. Updating only the old Map/key description
  would miss these newer invariants.
- `MoveTiming.ts`, `StartCancellation.ts`, `ResizeLifecycle.ts` and
  `ReviewRegressions.ts` already protect time integration, cancellation, queued
  resize and GIF reuse. Existing coverage is a starting point, not proof that
  every async resource and plugin lifetime is covered.

## Required additions to E0–E10

| ID  | Topic                                                  | Owner / stage              | Difficulty  | Impact                                             |
| --- | ------------------------------------------------------ | -------------------------- | ----------- | -------------------------------------------------- |
| G1  | Explicit ownership outside engine registries           | 01/02/08, E1–E2            | Medium      | Cross-engine plugin isolation                      |
| G2  | Resource lifetime and extension disposal               | 03/04/08, E3–E4; verify E8 | High        | Paths, motion, media and workers                   |
| G3  | Async failure, replacement and partial initialization  | 01/04/07/08, E1/E4/E5      | High        | Engine load, assets, pool reuse, exports           |
| G4  | Clock and numerical-domain contracts                   | 02/03/04/07/08, E2–E5      | High        | All timed updates and input-driven loops           |
| G5  | Geometry and spatial snapshot semantics                | 06/08, E6                  | High        | Collisions, fluid, links and external interactions |
| G6  | Sampling semantics and random-call budgets             | 02/07/08, E2/E5            | Medium      | Seeded reproducibility and spatial distributions   |
| G7  | Engine lifetime, mutation and public utility contracts | 01/03/04, E1/E3/E4         | Medium–high | Public API, plugins and resource retention         |

### G1 — Registries beyond PluginManager

Evidence: [emitters ShapeManager](../../plugins/emitters/src/ShapeManager.ts)
stores `shapeGenerators` in a module-level Map despite exposing instance methods.
Different managers therefore share registrations. This is a concrete isolation
migration target, already within V5-ENG/SVC/PLG, not optional E11 work.

Inventory mutable state in runtime utilities as well as plugin directories.
Classify immutable definitions separately from customized registrations and DOM
resources. Test two engines registering different generators under the same name,
reverse loading order and disposal of one owner. Include error-message registries
and noise seeds in the shared-state classification; do not duplicate immutable
lookup tables merely to eliminate every module-level variable.

### G2 — Dispose resources at the correct lifetime

Evidence:

- [NoiseFieldGenerator](../../utils/noiseField/src/NoiseFieldGenerator.ts) installs
  an anonymous global resize listener in `#setup()` without a matching removal.
- [IMovePathGenerator](../../plugins/move/src/IMovePathGenerator.ts) has particle
  `reset`, but no container disposal hook. MovePluginInstance discards generator
  maps on destroy/reinitialization; particle reset cannot own shared listeners.
- [MotionPluginInstance](../../plugins/motion/src/MotionPluginInstance.ts) adds a
  media-query listener during init without a corresponding teardown method.
- [PoissonDiscPluginInstance](../../plugins/poisson/src/PoissonDiscPluginInstance.ts)
  owns a resize timeout and checks destruction in its callback, but `stop()` only
  deletes sampler data. Stopping and restarting also need generation/cancellation
  coverage, not just a destroyed-container check.

In E3 decide a container-level cleanup contract for generators and other
extensions, including optional hooks or an owner-managed disposer. Avoid a broad
new framework unless justified. Integrate it in E4 with motion/noise/Poisson
consumers. Test repeated refresh, stop/start, destroy during pending work,
multiple containers/engines, media changes and OffscreenCanvas without global DOM
listeners. Resource counts must return to baseline; old callbacks must not revive
or mutate a replacement scene. Preserve reduced-motion behavior and zero motion.

### G3 — Failure paths are part of the loading contract

Evidence: [Engine.load](../../engine/src/Core/Engine.ts) guards superseded loads,
but canvas acquisition/setup occurs outside the `newItem.start()` cleanup catch.
[Configuration fetching](../../engine/src/Utils/Utils.ts) has fallback handling
but no cancellation signal. [ImageDrawer](../../shapes/image/src/ImageDrawer.ts)
has asynchronous particle work; pool reuse requires identity/generation checks,
not only a `destroyed` flag. GIF already has related guards and regressions.
[Video export](../../plugins/exports/video/src/ExportVideoPluginInstance.ts)
creates a recorder, stream and timeout and resolves on stop, without an explicit
plugin teardown/error-settlement path in that class.

Define rollback/retention of the old scene for failures in canvas setup,
initializers, plugin init and start. Decide whether fetch cancellation is exposed
or superseded results are only ignored; neither should install stale state.
Specify how pending asset/export promises settle on error or destruction and
which owner releases URLs, image resources, audio contexts and media tracks.
Test rejected loaders with partial side effects, simultaneous loads, failure
before start, late image completion after reuse, unavailable MediaRecorder,
recorder errors and concurrent exports. Reuse the existing load/cancellation tests.
Fix mandatory failure/isolation behavior in the owning stage; optional decode or
cache optimizations may wait for E11.

### G4 — Time, units and finite numeric domains

Evidence: [Container.#nextFrame](../../engine/src/Core/Container.ts) distinguishes
smooth/non-smooth delta, advances lifetime before skipping gaps above one second,
and logs frame exceptions. [Move Utils](../../plugins/move/src/Utils.ts) uses
`delta.factor || 1`, fractional decay and logarithmic integration. The existing
movement tests cover important FPS cases, but not the entire scheduling contract.

Record first-frame/zero-delta behavior, pause/resume, tab suspension, long gaps,
FPS caps, smooth mode, lifetime and error recovery. Test equal elapsed time with
30/60/120 Hz and irregular explicit timestamps across movement, animation,
emission and life; document intentional frame-dependent effects. Decide how a
throwing hook affects scheduling and cleanup. Do not impose a fixed-step solver
or silently change trajectories as part of a micro-optimization.

Add a numeric-domain matrix at normalization boundaries: NaN/Infinity from RNG
or options; zero/negative canvas dimensions, radii, cell sizes and divisors;
reversed ranges, particle counts, retries and finite work limits. For example,
[PoissonDisc](../../plugins/poisson/src/PoissonDisc.ts) floors radius/sqrt(dimensions)
to a cell size before dividing dimensions and allocating its grid. A small
positive radius can yield zero; zero dimensions and invalid values also require
a defined result. Validate before allocation/iteration, with explicit error or
normalization policy and deterministic tests. Keep checks out of every hot-loop
iteration when the input can be validated once. Verify worker pixel-ratio inputs
in Retina rather than assuming a window global exists.

### G5 — Spatial correctness before faster queries

Evidence: [ParticlesManager](../../engine/src/Core/ParticlesManager.ts) builds the
grid in its first update phase; later updaters/interactors can move particles.
[FluidSolver](../../interactions/particles/collisions/src/Fluid.ts) re-queries after
pressure displacement and performs iterative separation. Its capped selection
uses a predicate; the grid's sparse optimization intentionally excludes predicates.
A new query does not by itself rebuild cell membership after position changes.

Specify which positions/cells each phase observes and test particles crossing cell
boundaries during solving or callbacks. Evaluate reindexing, conservative search
or preserved snapshot semantics only with evidence and explicit behavior changes.
Measure predicate-driven sparse queries as well as the already optimized no-check
path. Preserve append semantics, order, reentrancy and max-neighbor selection.

Audit [Ranges](../../engine/src/Core/Utils/Ranges.ts) with independent geometry
fixtures: circle/rectangle argument order, top-left versus center conventions,
tangency, zero extents, distant aligned shapes, negative coordinates and custom
range types. `Circle.intersects` has axis-only acceptance terms while Rectangle
uses top-left extents; characterize the intended contract before relying on it.
Keep mixed-radius collision and fluid wall/non-penetration regressions. Do not
replace necessary square roots in normalized forces with squared distances.

### G6 — Sampling is observable behavior

Evidence: [grid maze generation](../../paths/grid/src/GridPathGenerator.ts) sorts
with a random comparator. [Canvas-mask shuffle](../../plugins/canvasMask/src/utils.ts)
chooses an index below `currentIndex`, excluding the current position for a
nontrivial swap. These are not standard uniform Fisher–Yates sampling. RNG
isolation alone will not define distribution or cross-runtime reproducibility.

Record whether each sampling API promises uniform selection, weighted choice or
legacy visual behavior. Choose a deterministic algorithm when needed, document
seed/output changes, and test small enumerated cases without flaky statistics.
Track random draw count/order for ranges, masks, emitters, fluid radius and paths.
Caching a sampled value changes semantics if it was intentionally sampled each
frame; decide before optimizing. E11 may optimize sampling storage only after
these correctness/migration decisions are closed.

### G7 — Engine lifetime and public mutability

Evidence: [Engine](../../engine/src/Core/Engine.ts) exposes its mutable `items`
array, owns listeners/registries and provides no engine-wide disposal method.
Multiple engines make ownership more visible. Decide whether explicit engine
disposal is necessary or application-owned cleanup is the contract; document and
test the chosen behavior without inventing a mandatory new API. Define pending
loads and shared assets at that boundary. Reuse EventDispatcher snapshot tests
for listeners that add/remove/reenter or throw.

Options/utility changes must preserve existing `deepExtend` forbidden-key guards,
undefined/array semantics, function references and externally owned canvas/image
resources. Use `deepExtend.test.ts`, `OptionsLoad.ts`, `Options.ts` and drawable
reference regressions. Document treatment of cyclic/non-plain input rather than
silently broadening JSON normalization. Review mutable public maps/arrays before
adding derived indexes or caches; define invalidation or intentional API changes.

## Completion and handoff

In E0 add G1–G7 to the engine/package audit matrices. Each owner records affected
files, existing tests reused, missing scenarios, decisions and verified results.
E8 verifies extension coverage; E10 collects dispositions and keeps unresolved
mandatory correctness/isolation gates open. This review does not mark any item
fixed. Detailed performance experiments on existing extension packages are in
[E11 — optional plugin improvements](V5-11-OPTIONAL-PLUGINS.md).
