# V5-07 — Full Particle review

Status in progress; the E5 acceptance gate remains open. Execute after E4 and
before the collection/pool optimizations
in E6. Coordinate color/output and consumers with 05/08. Verify reset against the
existing manager and establish invariants for 06. See the [execution sequence](V5-EXECUTION.md).

The current partial implementation and outstanding E5 evidence are tracked in
the [E5 checkpoint](V5-E5-STATUS.md). Do not treat the OKLCH migration as
accepted until C1–C4 and the Particle review pass their listed gates.

## Ownership

Particle, initialization and state helpers, integration with Retina, options,
modifiers, drawers, and updaters, plugin contracts, and related tests.
Preserve other contributors' changes and the E3/E4 contracts.

## Work

1. Inventory fields, methods, getters, and helpers across the file. Cover
   construction/init, options and group/shape/effect overrides, position and
   velocity, size and color, bounds, destruction, reset, and extension state.
   Distinguish required state from optional capabilities currently in core.
2. Review option construction and hook initialization in order, including
   defaults, presets/overrides, Retina, modifiers, shapes/effects, and
   updaters/plugins. Reduce redundant merges and work while preserving
   precedence and leaving shared inputs intact.
3. Review all Retina behavior at both container and particle level, including
   pixel ratio, reduce factor, dimensions, and random ranges. Verify resize updates.
4. Review repeated allocations and calculations in getters, updates, and
   rendering, vector handling, and color conversion. Require a benefit beyond
   extracting methods for any new per-particle closures or objects.
5. Evaluate extracting optional state or capabilities into helpers or plugins
   using bundle and memory evidence. For each change, provide a consumer
   migration and equivalent bundle defaults. Account for each feature.
6. Verify pool reuse and destroy/reset. Clear stale shape, effect, modifier,
   collision, and plugin data before incompatible reuse.
7. Preserve the minimal public access plugins need and their TypeScript
   extensions. Move internal implementations behind selective entrypoints.

## Source inventory and current lifecycle findings

The current `Particle` class groups state into these public fields:

- **Identity and lifecycle:** owning `container`, `id`, optional `group`,
  `destroyed`, `unbreakable`, `spawning`, and resize/warp/out-mode flags.
- **Resolved options and drawable selection:** `options`, `shape`/`shapeData`,
  `effect`/`effectData`, their close-path flags, and `sides`.
- **Motion and geometry:** `position`, `initialPosition`, `velocity`,
  `initialVelocity`, `direction`, `moveCenter`, `offset`, `zIndexFactor`, and
  path/rotation timing state. Bounds are computed by the private
  `#getInsideCanvasResult` path and the public `isInsideCanvas*` methods.
- **Appearance and animation:** `size`, `opacity`, `fillColor`, `fillEnabled`,
  fill/stroke opacity, `strokeColor`, `strokeWidth`, `backColor`, and `roll`.
  Public color/radius/transform getters apply the private ordered modifier list.
- **Retina and random sampling:** `retina`, `randomIndexData`, and `ignoresResizeRatio`.
  The `retina` object is rebuilt during each `init`; RNG sampling is delegated
  to the owning engine during option resolution and updater initialization.
- **Private retained state:** plugin manager reference, modifier array, and
  cached opacity, position, rotation, and transform result objects.

Initialization currently runs in this order: reset core flags/defaults; resolve
base, group, shape/effect, and explicit override options; initialize particle
Retina values; updater `preInit`; position and velocity; z-index and shape/effect
drawers; updater `init`; effect then shape `particleInit`; and finally
`particleCreated` plugins. Destruction is idempotent: set `destroyed`, clear
modifiers, call shape `particleDestroy`, container destroy plugins, updater
destroy hooks, then dispatch `particleDestroyed`. Removal dispatches
`particleRemoved` after destruction and then places the same object in the pool.
The focused regression for updater-before-event order and repeated-destroy
idempotence is in `utils/tests/src/tests/ParticlesEvents.ts`.

The pool reuses the entire `Particle` object, including public fields added by
plugins. Core rebuilds known options, motion, Retina and drawer state along the
initialization path, but it has no generic registry to clear arbitrary plugin
fields. Extension-state isolation therefore depends on plugin destroy/create
hooks today and remains an open acceptance item; do not claim arbitrary plugin
state is reset until representative extension tests cover it.

The Move extension had a concrete pooled-state leak: `pathGenerator`, `spin`,
and `retina.spinAcceleration` could survive when the next particle disabled
those options. `MovePluginInstance.particleCreated` now clears these fields
before applying the new options. `MoveTiming.ts` verifies a generator-and-spin
particle is removed and reused with both features disabled, leaving no stale
Move state.

The Roll updater had a similar extension-state leak: a pooled particle could
keep the previous `backColor` when reinitialized with roll disabled or without
a back color. `initParticle` now clears `backColor` before resolving roll
options, and `UpdaterMath.ts` covers enabled-to-disabled reuse.

Gradient and Orbit initializers also previously returned early while leaving
the previous particle's extension fields attached. Gradient now clears its
animation data before resolving current options; Orbit clears its particle and
Retina fields before checking `enable`. `UpdaterMath.ts` covers both disabled
reuse paths.

`DestroyUpdater` retained per-side destroy bounds and split cooldown data on
the pooled object. It now resets `destroyBounds`, `exploding`, `splitCount`,
and `unbreakableUntil` before loading the next particle's destroy options.
`Updaters.ts` verifies a particle with two bounds is reused without any stale
destroy state.

Destroy now attempts the shape hook, every destroy plugin and updater, and the
`particleDestroyed` event even if one of them throws. It rethrows the first
captured error after those attempts. Removal likewise dispatches
`particleRemoved` and returns the particle to the pool before rethrowing the
first error. The shared `EventDispatcher` now also runs the full listener
snapshot and rethrows its first listener error. Regressions cover an updater
throwing, shape and container-plugin failures, later updater and event
listeners, removal notification, and reuse of the pooled object. The first
shape error is preserved even when later hooks also throw.

## Acceptance tests

- Deterministically test option/group precedence, position and velocity init,
  random ranges and colors, Retina, bounds, destruction, and pool reset/reuse.
- Paint precedence has regressions for container → group and explicit
  per-particle color over the container default while retaining group identity.
  `addParticle` receives one options object and does not merge group options
  automatically. `OptionsLoad.ts` now covers the manager path that supplies a
  group's resolved options explicitly, verifying the selected shape, effect,
  and group identity. It also covers clearing `randomIndexData` on pooled
  Particle reuse; the complete 752-test suite passes these regressions.
  Additional shape/effect combinations remain open.
- `OptionsLoad.ts` verifies the caller's nested options remain unchanged after
  container loading, grouped particle creation, and refresh. Per-particle
  `move`, `paint`, `fill`, and `stroke` option objects are independent between
  live particles; nested fill-opacity and stroke-width mutations do not leak to
  siblings. `shapeData` and its shape-specific nested particle options are also
  isolated. The shape's `move` override takes precedence over base particle
  options. Check remaining mutable option families and plugin-owned references
  as part of the ownership review.
- Container lifecycle coverage now changes `devicePixelRatio` from 2 to 3,
  refreshes, and verifies newly initialized particles get the corresponding
  Retina-scaled move speed. A DOM-canvas resize test verifies bitmap dimensions
  and proportional particle position scaling after the initial tick clears
  `ignoresResizeRatio`; shape/effect and Retina option precedence remain open.
- Document and preserve hook/modifier/updater/drawer order. Verify that error
  paths and restarts do not duplicate destroy or particleCreated callbacks.
- Check representative consumers including move/outModes,
  size/opacity/color/rotate, collisions, links, emitters/absorbers, custom
  shapes/effects, and plugins with extended state.
- Measure memory per particle and allocations as well as update/draw cost.
  Verify isolation across groups, containers, and engines with different RNG/loggers.
- Compare min/gzip/Brotli for the same scene against the preceding verified checkpoint and the E0 baseline.
- Reuse the 4.6.0 `MoveTiming.ts` regressions for decay, gravity and
  speed limits when changing particle movement state or its update contract.
  Run the full suite, lint/format, and downstream builds.

## Deliverables

Provide a field/method map, review decisions, changed APIs and migrations, and
measurements. Update the engine matrix from 03 with ownership and evidence for
every area.

## Performance and size plans

See [V5-IMP-05-PARTICLE-STATE](improvements/V5-IMP-05-PARTICLE-STATE.md).
Record assigned outcomes as specified in the [improvement plan](V5-IMPROVEMENTS.md).

## Architecture evaluations

Apply [ARCH-01 — Particle model](architecture/V5-ARCH-01-PARTICLE-MODEL.md),
[ARCH-03 — Options](architecture/V5-ARCH-03-OPTIONS.md), and
[ARCH-04 — Extensions](architecture/V5-ARCH-04-EXTENSIONS.md).
Compare the class, explicit snapshots, and plain state. Specify useful,
supported serialization and distinguish moving methods from separating
dependencies. Coordinate mutable state, option templates, optional codecs,
and reset with 06/08. Record the disposition of alternatives.

## Required color migration

Follow [V5-COLOR — OKLCH](V5-COLORS-OKLCH.md). Complete C3 for `IOklch`,
`IParticleOklchAnimation`, fill/stroke/back color, modifiers, reset/pool,
paint/gradient, and h/c/l animation. Use explicit legacy animation migration
and the C0 alpha contract, with one persistent particle color model.

## Source-review acceptance additions

Apply G3/G4/G6/G7 from the [source review](V5-CODE-REVIEW.md). Cover asynchronous
asset completion after particle reuse, numeric domains and RNG sampling lifetime.
Preserve drawable/callback references and option semantics; extend existing
movement/shape/option regressions rather than treating them as absent.
