# V5-IMP-04 — SpatialHashGrid and query cost

Status complete for E6; [completion evidence](../evidence/e6/closure/README.md) and [method review](../V5-E6-REVIEW.md); see the [E6 checkpoint](../V5-E6-STATUS.md) for validation, insertion and live sparse-query work. High priority. Handover 06 owns this plan, with
consumer verification in 08. Requires [IMP-01](V5-IMP-01-MEASUREMENT.md).

## Evidence and goal

The reviewed grid uses `Map<string, Particle[]>`, coordinate-derived keys,
a clear on every frame, and a `has` followed by `get` on insert. Queries already
accept an optional output array and pool Circle/Rectangle instances. Preserve
existing optimizations and nested-query safety. Measure the bottleneck.

### S1 — Lookups and keys

First try a single lookup and create the cell when absent. Then compare
string keys with nested maps or numeric encoding. For numeric encoding, define
bounds, negative coordinates, precision, and collisions. Guard against
bit-packing overflow. Support existing coordinates and resize scenarios.

Measure key generation, lookup, insertion, memory, and bundle cost. Nested
maps avoid strings and add objects and lookups. Keep the simplest solution
unless evidence supports a change.

### S2 — Cell reuse

Compare full clearing with bounded reuse of active cell arrays. Define which
cells belong to the frame and how they release particle references. A moving
or growing grid needs explicit, measured caps or eviction for visited cells.

Verify cellSize changes, resize, destroy, and two containers. Measure stable
scenes and movement across many cells, including cell count and heap after churn.

### S3 — Query output

Inventory queryCircle/queryRectangle consumers and check use of `out`.
Propose reusable buffers per caller only when results are neither retained nor
used by another query. Define append versus reset behavior and migrate consumers
before any public change.

Test nested queries from callbacks and plugins, retained output, empty queries,
and removed particles. Keep reusable buffers safe under reentrant calls.

### S4 — Cell size and result order

Measure visited cells and tested candidates in M4/M5 for uniform and clustered
distributions, small and large radii, and different pixel ratios. Evaluate the
current cellSize policy before making it adaptive. Dynamic tuning can cause
rebuilds and make results and timings less predictable.

Preserve the neighbor set, boundary handling, and result order where relevant.
Collisions and fluid with a maxNeighbors cap may change outcomes when order
changes. Compare deterministic results and visuals before adopting a variant.

## Deliverables

Provide an S1–S4 table with profiles, alternatives, bundle/heap/query time deltas,
and consumer tests. Include negative and distant coordinates, boundaries,
nested queries, resize/cellSize, and collisions/fluid/links. Validate a full
M3/M4/M5 scene alongside synthetic benchmarks before changing the default algorithm.

## Current-source additions

The 2026-11-13 checkout already optimizes sparse queries without predicates by
sorting occupied coordinates in scan order. Preserve that path and its tests.
[G5](../V5-CODE-REVIEW.md) adds predicate-driven sparse workloads and explicit
cell/position snapshots after updater and fluid movement. Candidate-count limits
do not necessarily bound traversal. Review geometry independently before using
it to prune cells; see G4 for input/cell-size validation.

## E6 continuation decisions — 2026-11-23

Evidence: `evidence/e6/storage-evaluation.json`, `collections-sparse.json` and
regressions in SpatialHashGrid, SpatialRanges, InteractionGrid and LinksWarp.

| Item | Decision and measured reason                                                                                                                                                                                                                                                                                                                                   |
| ---- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| S1   | Keep single-lookup string keys. Numeric encoding with a string fallback and nested maps improve isolated insertion/clear timings (1,000 uniform: 0.087/0.032/0.032 ms). The prototype checks bounded coordinate encoding and cell membership; it does not implement the full live-query contract. This is insufficient evidence to replace the tested default. |
| S2   | Keep fresh cell arrays. Bounded reuse with caps 32/256 has no consistent improvement: 1,000 uniform cells take 0.089/0.091/0.093 ms; moving cells 0.099/0.102/0.104 ms. Reuse also needs active-query bookkeeping and explicit retention bounds.                                                                                                               |
| S3   | Preserve caller-owned append-only output arrays and reentrant range pooling. Do not share result buffers across callbacks that can nest or retain results. Explicit removal tombstones active cells before object reuse; selected output references remain live objects, not immutable snapshots.                                                              |
| S4   | Retain distance-derived cell size and scan order. Validate finite positive cell sizes and scaled interactor distances. Sparse predicates use ordered occupied-cell traversal with a dense fallback when callbacks grow the grid. No adaptive policy or geometry pruning is introduced.                                                                         |

A raw grid clear preserves the existing live callback behavior. Manager clear
retires the old cohort, invalidates remaining query traversal and empties active
cells. Explicit removal also unlinks cells retained by a nested raw clear.
Tombstones avoid shifting the next entry past an active cursor. Predicate and
position callbacks are checked before committing a result; destroyed particles
are excluded unless the predicate revives them.
