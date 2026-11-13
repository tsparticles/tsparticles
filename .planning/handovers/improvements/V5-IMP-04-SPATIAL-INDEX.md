# V5-IMP-04 — SpatialHashGrid and query cost

Status pending analysis. High priority. Handover 06 owns this plan, with
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
