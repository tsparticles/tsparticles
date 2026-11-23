# E6 — Collections and spatial index

Started 2026-11-23 on the accepted E5 working tree. **In progress; not accepted.**
This first increment establishes spatial regression fixtures and the source
review map. No production algorithm or public contract changes in this increment.

## Current-source findings

- P1: `#countGroup` already counts without a temporary array. The original
  `filter(...).length` starting evidence is historical. Public mutable `group`
  still prevents assuming incrementally cached counts remain correct.
- P2: phase 1 allocates a Set per update, phase 2 adds to the same Set, and
  deferred removal follows phase 2. Reuse must handle exceptions, reentrancy,
  and pooled identity reuse before it is a valid candidate.
- P3: bucket migration sorts by ID only when the appended ID is below its
  predecessor. Measure actual sorting frequency before replacing this path.
- P4: the pool belongs to the manager; clear retains it and destroy empties it.
  E5 reset/rollback tests remain the starting lifecycle contract. A cap needs
  matched churn/retention measurements, not an arbitrary constant.
- S1: insert currently does has/set/get; a single-lookup candidate remains to
  measure. String keys preserve negative coordinates without bit-packing limits.
- S2: clear drops cells each frame and applies the pending cell size. Constructor
  and setter do not validate finite positive size; numerical policy is open.
- S3: output arrays append, remain caller-owned, and can be retained across clear.
  Range pools are depth-indexed for nested queries, with finally-based release.
- S4: only queries without predicates use occupied-cell sorting in sparse scenes.
  Predicate queries use live coordinate scans. A snapshot of occupied cells
  would miss cells inserted by a predicate and is not an equivalent replacement.

## Phase and spatial contracts

Current `update` order: clear grid; plugin update; per-particle resize/reset/
particleUpdate and grid insert; plugin postUpdate; per-particle updater/
postParticleUpdate/bucket migration; deferred removal; clear resize factor.
Both particle phases traverse the live array. Do not merge these phases without
tests for hook mutation, additions, removals and identity reuse.

Cell membership is captured at insert, while geometry is read live at query.
Movement inside the same cell is visible immediately. Movement to a different
cell is not found by a query visiting only the destination cell until rebuild;
a wider query visiting the insertion cell can still return that particle.
This is a characterization, not approval of all fluid/updater behavior. Consumer
snapshot semantics and destroyed entries still need integration review.

Predicates run before containment, can append to the current cell, insert into
future cells, clear the grid, and execute nested queries. Current-cell iteration
continues on its array after clear, while later cells use fresh map lookups.
Result order is x cell, then y cell, then insertion order within the cell.

## Geometry issue to resolve before pruning experiments

Independent diagnostic on the existing compiled engine:
`new Circle(0, 0, 1).intersects(new Rectangle(1000, 0, 1, 1))` returns true
in both directions, although the shapes are separated by 999 units.
The current circle/rectangle formula has an axis-only acceptance branch.
Add independent intersection fixtures and resolve tangent/degenerate semantics
before using intersects to skip cells. Query membership fixtures added here
exercise contains behavior and do not validate intersects.

## Review and measurement queue

| Area               | Methods/responsibilities                                                                                                           | Remaining evidence                                                        |
| ------------------ | ---------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| Collection/API     | constructor, count/grid, filter/find/get, addParticle/push, remove/removeAt/removeQuantity/removeAny                               | Mutation during hooks, counts, limits, rejected insertions                |
| Density/limits     | setDensity, applyDensity/applyLimits/checkAndApplyLimits/countGroup/initDensityFactor                                              | Fractional density idempotence, mutable groups, global/group modes, M6    |
| Lifecycle/pool     | init/redraw/clear/destroy, addToPool/destroyAndPool/destroyAndPoolAfterError, initPlugins/initPluginsArrays/initDrawersAndUpdaters | E5 reset invariants, peak retention, two owners, M6/M9                    |
| Ordering/phases    | update, phase1/phase2, setResizeFactor, drawParticles, create/get/reset/insert/remove/update bucket helpers                        | Hook order/mutations, depth changes, equal-depth stability, M7            |
| Grid               | constructor/accessors/clear/insert, query/queryCircle/queryRectangle, range acquisition, bounds/key/queryCell helpers              | Validation, live sparse predicates, cell reuse, candidate counters, M4/M5 |
| Geometry/consumers | BaseRange/Circle/Rectangle, collision/fluid, links/warp, absorbers and external interactions                                       | Independent intersection fixtures, mixed-radius symmetry, integration     |

P1–P4 and S1–S4 remain open. Capture matched E5 baselines before production
changes; compare runtime, allocations, heap and min/gzip/Brotli independently.
Full acceptance still requires consumer tests, downstream builds and browser
scene evidence. See [handover 06](V5-06-PARTICLES-MANAGER.md).

## Verification

Six additional direct-source grid regressions cover independent dense/sparse
membership and boundaries, delayed resize/clear, live geometry versus insertion
cells, predicate mutation, retained outputs and owner isolation. Existing sparse
order, future-cell insertion, nested query and invalid-bounds tests are retained.
Primary suite: **55 files / 823 tests pass** via Nx (817 inherited + 6 new).
Test-package `lint:ci` passes after naming the fixture cell-size constants.
Nx initially failed on sandboxed Unix sockets; the successful runs use
`NX_DAEMON=false NX_ISOLATE_PLUGINS=false NX_NO_CLOUD=true`.
Test-package `prettify:ci` and changed-document Prettier checks pass.
No production changes, commit or publication.
