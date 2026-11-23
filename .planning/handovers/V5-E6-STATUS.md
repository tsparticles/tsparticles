# E6 — Collections and spatial index

**E6 complete — 2026-11-23.** The source/method review and P1–P4/S1–S4
evaluations are complete. Callback-safe drawing closes the final uncovered
collection traversal. See [completion evidence](evidence/e6/closure/README.md)
and the [method review](V5-E6-REVIEW.md).

Final checks: **926 primary tests / 85 test targets / 453 build tasks**;
135 matching matrix snapshots plus 108 matching confirmation snapshots;
18 extended samples per artifact and 30 stable retention cycles. Initial timing
flags and matched confirmations are retained. No new budget waiver; existing
E5/E10 exceptions remain open. E7 is next, and E8–E10 remain pending.

The sections below retain earlier checkpoint findings and measurements. Their
open status and earlier test counts are historical, superseded by the completion
evidence above. No new commit or publication performed in this continuation.

## Draw-pass continuation

The final method review found live bucket traversal still skipped or repeated
particles when a drawer removed/recycled entries, cleared the manager or caused
bucket migration. Five regressions fail on the previous implementation.
`drawParticles` now captures membership, IDs and order at entry in reusable,
depth-indexed buffers. Particle state stays live; additions wait for the next
draw, removed/recycled identities are skipped and clear retires the old pass.
Finally releases particle references without dropping buffer capacity; destroy
drops the buffers. Nested calls and exception recovery have a separate regression.

The [method review](V5-E6-REVIEW.md) records all manager/grid/range responsibilities,
retained code and boundaries. A real-manager phase test additionally specifies
that postUpdate movement changes geometry immediately while cell membership is
rebuilt at the next update. No fluid trajectory or neighbor order is changed.

Synthetic traversal with no-op drawers: at 1,000 particles, live traversal takes
approximately 0.0154 ms and the snapshot 0.0209 ms (+0.0055 ms); at 5,000,
0.0925/0.1301 ms. All diagnostic snapshot particle-reference counts are zero
after drawing. This establishes an explicit correctness cost, not an FPS claim.
Final artifact, build, browser and retention verification is recorded in the
[completion report](evidence/e6/closure/README.md). The quiet final-source
diagnostic adds approximately 0.0047 ms at 1,000 particles; the earlier
0.0055-ms result is retained separately.

## Initial production implementation (historical)

- Correct circle/rectangle intersection using the closest point on a top-left
  rectangle. Circle/rectangle tangency remains inclusive; circle/circle and
  rectangle/rectangle retain their existing strict overlap behavior. Negative
  radius or rectangle dimensions do not intersect in the corrected branch.
- Reject nonfinite/nonpositive grid cell sizes with `RangeError`, before
  changing pending state. Valid changes still apply only on clear.
- Use one cell lookup on insert. The quiet 15-sample diagnostic favors this
  candidate in all nine clear/insert workloads, with median changes from
  -0.8% to -7.6% versus the validated two-lookup grid. The earlier concurrent
  build run is mixed and retained as noisy evidence, not discarded.
- Evaluate live sparse predicate traversal. Select the next occupied cell in
  coordinate order after each processed cell, preserving callback mutations.
  Start only when query area exceeds a quadratic occupied-cell estimate;
  return to the remaining coordinate scan if callbacks make the grid denser.
  No revision counter, retained cell cache, numeric key encoding or adaptive
  cell size is introduced. Default no-predicate sparse traversal is retained.
- Evaluate one reusable deferred-removal Set per manager. Nested updates get
  a separate local Set; finally clears references and restores reentrancy state.
  The quiet fixture counts 20,000 Set creations versus 1 for 20,000 non-reentrant
  updates, at +168 retained bytes per manager. Median update changes at 1,000/
  10,000 particles are +0.43%/+0.62%; empty-manager overhead is ~0.011 microseconds.
  The 500-particle result is faster but variable and is not an FPS claim.
  The complete browser comparison and current lifecycle checks are recorded below;
  this does not close the remaining E6 collection/pool evaluations.

The live sparse diagnostic matches all 100 differential mutation cases (50
seeds, circles and rectangles). At radius 50,000 and 10 particles, median query
time is 511.169 ms versus 0.023 ms, with 2,446,096 versus 10 cell lookups. At
radius 1,000,000, a candidate-only live-insertion check visits two cells and
five keys. The 100/1,000-particle radius-10,000 workloads retain the coordinate
scan. These are synthetic costs, not M4/M5 browser acceptance.

Full-suite integration exposed the zero-distance sentinel in InteractionManager.
It now keeps valid size when no positive finite distance exists, ignores invalid
interactor distances and validates the Retina-scaled product. `InteractionGrid.ts`
tests the real manager against the validated source grid. The inherited
SpatialGrid fixture with rectangle right edge 509 and circle center 776/radius
200 had a false-positive expectation; the independently separated fixture now
expects no intersection in both directions.

Evidence tools: `measure-e6-grid.mjs`, `measure-e6-sparse.mjs`, and
`measure-e6-removals.mjs` under `evidence/tools`. Exact pre-change grid and
manager sources are archived under `evidence/e6/baseline`; outputs include raw
samples, variance, module sizes and diagnostic limits. Browser scene acceptance
is separate from these synthetic Node measurements.

## Initial production source findings (historical)

- P1: `#countGroup` already counts without a temporary array. The original
  `filter(...).length` starting evidence is historical. Public mutable `group`
  still prevents assuming incrementally cached counts remain correct.
- P2: baseline phase 1 allocates a Set per update, phase 2 adds to the same Set,
  and deferred removal follows phase 2. The reuse experiment keeps phase order;
  arbitrary array mutation and pooled identity reuse need further review.
- P3: bucket migration sorts by ID only when the appended ID is below its
  predecessor. Measure actual sorting frequency before replacing this path.
- P4: the pool belongs to the manager; clear retains it and destroy empties it.
  E5 reset/rollback tests remain the starting lifecycle contract. A cap needs
  matched churn/retention measurements, not an arbitrary constant.
- S1: insertion now uses one lookup; see the matched diagnostic above. Retain
  string keys for negative coordinates without bit-packing bounds or collisions.
- S2: clear drops cells each frame and applies the pending cell size. Constructor
  and setter now require finite positive size. Reusing arrays immediately on
  clear would change current-cell iteration during a predicate; do not add cell
  reuse without preserving that retained-array behavior and measuring a cap.
- S3: output arrays append, remain caller-owned, and can be retained across clear.
  Range pools are depth-indexed for nested queries, with finally-based release.
- S4: no-predicate queries retain sorted occupied-cell snapshots. Sparse predicate
  queries evaluate a live rescan; a one-time snapshot would miss newly inserted
  cells and is not an equivalent replacement.

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

## Query consumer inventory (S3)

The current direct query callsites are in external bounce/attract/connect/pop/
destroy/grab/bubble/repulse, particle infection/repulse/attract/collisions/links,
InteractionManager click dispatch and CircleWarp. `FluidSolver.#queryNeighbors`
already supplies its instance-local `#neighbors` array, after resetting its
length. The remaining consumers use fresh results; CircleWarp also aggregates
wrapped regions with deduplication. Retain append semantics, caller ownership
and reentrant range pools. No shared output-buffer migration is justified by
the current measurement; in particular, do not give nested callbacks the same
array or replace Fluid's existing buffer with another allocation.

## Geometry issue corrected before pruning experiments

Independent diagnostic on the existing compiled engine:
`new Circle(0, 0, 1).intersects(new Rectangle(1000, 0, 1, 1))` returns true
in both directions, although the shapes are separated by 999 units.
The old formula had an axis-only acceptance branch. `SpatialRanges.ts` adds
independent separated, tangent, corner, containment, translation and degenerate
fixtures. `LinksWarp.ts` covers the inherited wrapped intersection behavior.
No geometry-based cell pruning is introduced by the sparse predicate candidate.

## Initial review and measurement queue (superseded by continuation below)

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

## Initial verification (contract-only increment)

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

## Production increment verification — 2026-11-23

- Final primary suite: **58 files / 872 tests pass** (55 more cases than accepted
  E5). Source and test lint/format pass in builds; changed-document/tool formatting
  and `git diff --check` pass separately.
- Rebuilt all 235 non-CLI/non-website/non-palette requested projects, including
  218 dependencies: **453 tasks**. The final sandbox run passes 451 and fails two
  environment-sensitive demos. Angular and Electron both pass in failed-only
  runs outside the sandbox. Initial runs and failures are preserved in evidence.
- All **85 test targets** are verified across the main run and failed-only
  reruns: 81 pass in the sandbox; MCP/Ember require local server/Chrome access;
  Angular/Ionic pass outside with `--reporters=progress`, avoiding the unrelated
  Jasmine 7 HTML reporter initialization problem. No test or assertion is skipped.
- Chrome 157.0.8103.79: 45 samples per artifact, same seed and scenario settings,
  **135/135 initial/warm/measured snapshots match**, with geometry, links and RNG.
  The full matrix initially flags M8/1000 p95 3.20 versus a 3.19-ms screen and
  update 1.50 versus the original 1.43-ms E0 ceiling (29/30 original checks pass).
  Matched nine-repetition confirmation gives baseline/candidate update 1.40/1.40,
  draw 1.10/1.10 and p95 3.00/3.00 ms; all 27 confirmation snapshots match.
  Keep the original flags and the confirmation, rather than overwriting results.
  E5's accepted M4/500 and inherited M6 release exceptions still belong to E10.
- Current extension/lifecycle harness: **18 samples**, stable RNG in all six
  scenario/count groups; all containers removed; DOM stable at nine nodes;
  no live media listeners. After the measured peak, 30 retention cycles add
  103,104 bytes of forced-GC heap, with stable DOM/listeners. This does not measure
  the retained pool in a still-live container after an arbitrary larger peak.
- All standalone versus the archived accepted E5 artifact: **+854 raw/minified,
  +349 gzip (level 9), +433 Brotli bytes** (+0.28% gzip / +0.42% Brotli).
  Exact artifact and source hashes are in `evidence/e6/payloads.json`.

This increment has production fixes and measured changes; **E6 remains open**.
Still required: finish collection mutation/identity review across hook additions
and removals, compare group/bulk-count alternatives, quantify bucket sort frequency
and alternative costs, measure live peak/trough pool retention, and complete the
remaining S1–S4 alternatives/consumer audit. Do not mark those evaluations done
from this increment's broad green regression/build checks alone. No commit or
publication performed by this agent.

## Collection and spatial continuation — 2026-11-23

The continuation changes production behavior beyond the initial 872-test
checkpoint. Primary verification now passes **58 files / 910 tests**. Seven
new numeric-count cases fail on the previous compiled engine and pass after
normalization; regression logs also demonstrate the earlier cursor, identity,
limit and cleanup failures before their fixes.

The manager keeps active traversal cursors synchronized with structural removals,
checks callback identity after removal/recycling, reserves IDs before nested
initialization, rechecks final-group admission and prevents listener refill from
exceeding limits. Deferred removals store the queued ID as well as the object.
Binary bucket insertion preserves immediate ID ordering without repeated full
sorts. Cleanup is idempotent, and explicit removal disposes collision-immune
particles before reuse. Finite safe count normalization prevents invalid
allocation loops; fractional additions retain their ceiling behavior and bulk
removal work is bounded by its starting count.

Grid removal tombstones old entries before pool reuse, including cells held by
nested queries after a raw clear. Manager clear retires the old query cohort;
raw grid clear retains the existing live-predicate behavior. Result arrays still
append and remain caller-owned; already selected particles are live references.
No per-particle spatial metadata, immutable output snapshots, or global state
is introduced.

P1–P4 and S1–S4 alternatives are now evaluated with explicit decisions in
[IMP-03](improvements/V5-IMP-03-PARTICLE-COLLECTIONS.md) and
[IMP-04](improvements/V5-IMP-04-SPATIAL-INDEX.md). Data and source hashes are in
`collection-order*.json`, `storage-evaluation.json`, `live-pool*.json` and
`collections-sparse.json`. Earlier measurements remain intact. Numeric-key
prototypes cover insertion/clear, not the complete live-query implementation;
they are not evidence of full compatibility. Pool caps substantially reduce
live trough retention but incur allocation and churn costs, so no cap is adopted.

Consumer inspection preserves fresh results in classic collisions, links/warp,
attraction/repulsion/infection and external interaction queries. Fluid already
clears its owner-local neighbor buffer before each synchronous query; preserve
that path and max-neighbor ordering. CircleWarp retains its deduplicated union of
shifted queries. No shared caller buffer is added across callbacks. Existing
collision symmetry, fluid, links, emitter, absorber, group, density and
interactivity regressions run in the full primary suite. Full plugin lifecycle
review remains owned by E8; this checkpoint does not claim arbitrary owner
teardown during every plugin hook has been audited.

### Final continuation verification

- **58 files / 910 primary tests**, all **85 workspace test targets**, and a
  fresh **453-task downstream build** pass. Angular/Ionic use the documented
  progress reporter; no assertions are skipped. CI source/test lint and format pass.
- Chrome matrix: 45 samples per artifact and **135 matching snapshots**. Initial
  M7/1000 p95 is 3.6 vs 3.1 ms (screen 3.41); nine-repeat confirmation is 3.6 vs
  3.5 ms, with 27 matching snapshots and all relative screens passing. Confirmed
  update/draw are about 0.1 ms higher (1.6/1.5 vs 1.5/1.4 ms), not an improvement.
- Initial E0 update/draw budgets pass 28/30: M3/M8 at 1,000 particles measure
  1.5 vs 1.43-ms update ceilings. Matched nine-repeat confirmation gives both
  artifacts 1.4-ms update and 1.1-ms draw in both scenes, 54 matching snapshots
  and p95 3.1 vs 3.0 ms. Preserve the original flags and confirmation separately.
- Extended runs: 18 samples per artifact, matching RNG/final counts, all
  containers removed, stable DOM/listeners and 30 retention cycles. Post-peak
  forced-GC heap drift is **116,744 bytes**. Live pool trough retention is
  separately quantified in P4; teardown stability does not imply a bounded pool.
- Full all-bundle versus accepted E5: **+2,926 minified / +1,035 gzip / +872
  Brotli bytes**. Artifact SHA-256:
  `4254165a851ee7559f70e91843702a82020ebcef2dfe521490173cebf414f52c`.
  The preserved archive is `collections-all.bundle.min.js.gz`.

Exact hashes, results, limitations and compressed logs are recorded in
`evidence/e6/collections-verification.json`. Source and measurement work for
this continuation is verified; **E6 acceptance remains open**, with E7–E10
still pending. No commit or publication. Existing E5/E10 exceptions are
unchanged; no new waiver is inferred from confirmation runs.
