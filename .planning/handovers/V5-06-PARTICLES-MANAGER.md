# V5-06 — Full ParticlesManager review

Status pending. Requires completion of 05. Review the entire area, including
work beyond changes required by Container or CanvasManager.

## Ownership

ParticlesManager and its collection/pool, groups, density, limits, Z-order
buckets, spatial index, and update/draw pipeline. Include
`Core/Utils/SpatialHashGrid.ts`, consumer contracts, and associated tests.
Original paths identify responsibilities after the moves in 03. Coordinate
Particle contract changes with 07 and preserve other contributors' changes.

## Work

1. Map all responsibilities, fields, and invariants in `ParticlesManager.ts`,
   including the active collection, pool, counters/IDs, groups, buckets, and
   grid. Evaluate each method for mandatory dependencies, duplication,
   allocation cost, and API exposure.
2. Review add/push/remove/removeAt/removeQuantity, clear/destroy/redraw, density,
   and limit modes. Simplify repeated paths while preserving groups and plugin
   hooks. Distinguish one-time initialization from per-frame work.
3. Review pool and reset. Group, plugin, and engine state must be cleared before
   incompatible reuse. Avoid global pools and retaining additional containers.
4. Review both update phases, deferred removal, Z ordering, and bucket/grid
   updates. Document observable updater/interactor/plugin order. Require
   equivalence tests before merging passes that depend on different snapshots.
5. Evaluate temporary allocations, including the set of particles to remove,
   array copies, and repeated iteration. Reuse structures only with correct
   cleanup and equivalent results when plugins add or remove particles.
6. Review SpatialHashGrid and its ranges and vectors, including queries,
   boundaries, reset/resize, and references returned to plugins. Measure costs
   and verify collisions, links, absorbers, and external interactions before
   changing contracts.
7. Extract cohesive internal helpers where they reduce actual inclusions and
   duplication. Measure bundle and runtime independently. Use measured costs
   to justify changes and avoid mandatory managers that hide complexity.

## Acceptance tests

- Adds, removals, and counts stay consistent with groups, density, limits, and
  resize. Check for duplicates, destroyed entries in the grid, and pool retention.
- Z order stays stable and buckets stay correct after depth changes and
  removals. Check spatial queries at boundaries and after resize/clear/redraw.
- Hooks that add or remove during updates neither skip nor double-update
  particles. Deterministic scenes retain baseline order and results.
- Test classic/fluid collisions, links, emitters, absorbers, groups, and
  interactivity, plus pool reuse across groups with different options and
  isolation across containers/engines.
- Benchmark several counts and densities for update, draw, allocations, and
  memory after repeated churn. Match the baseline scenario and RNG seed and
  report variance.
- Complete the full suite, lint/format, downstream builds, and min/gzip/Brotli deltas.

Carry the mixed-radius collision symmetry and fractional-density idempotence
checks from [V4-B08 and V4-B09](../v4-review/CORRECTNESS.md) into the tests.
Also compare the index in sparse scenes where the query area greatly exceeds
occupied cells, while preserving observable query order.

## Deliverables

List reviewed methods and invariants, applied simplifications, and retained
code with reasons. Report bundle/runtime results and contracts to verify in
07/08. Update the full engine coverage matrix and index status.

## Performance and size plans

See [V5-IMP-03-PARTICLE-COLLECTIONS](improvements/V5-IMP-03-PARTICLE-COLLECTIONS.md) and [V5-IMP-04-SPATIAL-INDEX](improvements/V5-IMP-04-SPATIAL-INDEX.md).
Record assigned outcomes as specified in the [improvement plan](V5-IMPROVEMENTS.md).
