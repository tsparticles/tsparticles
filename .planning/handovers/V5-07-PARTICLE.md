# V5-07 — Full Particle review

Status pending. Execute in E5 after E4, before the collection/pool optimizations
in E6. Coordinate color/output and consumers with 05/08. Verify reset against the
existing manager and establish invariants for 06. See the [execution sequence](V5-EXECUTION.md).

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

## Acceptance tests

- Deterministically test option/group precedence, position and velocity init,
  random ranges and colors, Retina, bounds, destruction, and pool reset/reuse.
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
