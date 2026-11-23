# V5-IMP-03 — Groups, deferred removal, pooling, and ordering

Status in progress; see the [E6 checkpoint](../V5-E6-STATUS.md) for current-source findings and the measured P2 candidate. High priority. Handover 06 owns this plan, with
Particle contracts in 07 and plugins in 08. Requires
[IMP-01](V5-IMP-01-MEASUREMENT.md) and stable state and lifecycle contracts.

## Starting evidence

ParticlesManager uses `filter(...).length` for density and group limits,
a set created in the first update phase to collect removals, and ID sorting
on some bucket insertions. Profile these paths after earlier handovers.

### P1 — Group counts

In M6, distinguish add/remove and density costs from per-frame work. Compare
counting without a temporary array, incrementally maintained group counts,
and one aggregate count per bulk operation. The filtered array is avoidable
when only its length matters. A map adds memory and invalidation costs.

For incremental counters, define one update path covering add/remove,
init/redraw/clear/destroy, pool reuse, and rejected insertions. Check whether
plugins can mutate `group`. Support mutation or revise and document the
contract before relying on potentially stale counters.

Acceptance requires correct interactions between groups and the global limit,
preserved wait and delete modes, no negative counts or double decrements, and
churn throughput improvement beyond noise. Justify any per-frame cache with
measurable benefit, especially when it serves rare setup work.

### P2 — Deferred removal

Compare a per-frame set, a reusable set, and a reusable deduplicated list.
Define exactly when a particle leaves the collection, grid, and buckets before
changing data structures. Preserve both update phases and dependent hook order.

Handle early returns, exceptions, callbacks that create or destroy particles,
and pool reuse. Flags or generation stamps add per-particle state. Measure
memory and bytes as well as GC. Reusable buffers must release references even
on error and belong to a container or engine.

Acceptance requires no duplicate removals, skipped particles, or extra destroy
callbacks, plus fewer per-frame allocations without increased retention or update time.

### P3 — Buckets and Z order

In M7, measure actual sort frequency, skewed buckets, reused IDs, and particles
that change depth. Compare sorted insertion, deferred sorting of dirty buckets,
and the current approach. Sort before any consumer can observe ordering,
including APIs that run before draw.

Preserve stability at equal depth and current ID semantics. Measure traversal,
removal, memory, and consumer costs before replacing arrays with linked lists
or more complex structures. Keep the current path if sorting is rare.

### P4 — Pool and retention

Measure heap after peaks and repeated M6/M9 cycles. Identify reused objects
and retained state, plugins, and assets. Evaluate a pool cap or shrink policy
only if peaks retain significant memory. Measure new allocation cost when
the scene returns to its peak.

## Verification and deliverables

Run regressions for counts, groups, density, limits, reset, lifecycle, hook
order, and emitter/absorber/collision consumers. Benchmark identical M3, M6,
M7, and M9 scenarios. Attach operation counts, allocations, heap, timings,
and bundle deltas. Document rejected alternatives with data. Handover 06
closes P1–P4 in E6 using the Particle/reset invariants from 07 in E5 and
passes integration evidence to 08.

## E6 continuation decisions — 2026-11-23

Evidence: `evidence/e6/collection-order.json`, `collection-order-final.json`,
`storage-evaluation.json`, `live-pool.json` and `live-pool-final.json`.
The source hashes and frozen manager variants identify each experiment; these
synthetic measurements do not replace matched browser scenes.

| Item | Decision and measured reason                                                                                                                                                                                                                                                                                                                              |
| ---- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| P1   | Keep allocation-free live group scans. At 1,000 particles, ten group queries take approximately 0.044 ms versus 0.099 ms with filtered arrays. Aggregation takes 0.011 ms but becomes stale when callbacks mutate the public group or add particles. No per-frame counter cache is introduced.                                                            |
| P2   | Reuse an ID-to-particle Map, with a separate buffer for nested updates and finally cleanup. An ID snapshot prevents removal of a recycled object. A deduplicated list reaches 0.389 ms versus Map 0.163 ms at 1,000 removals in the synthetic fixture; retain Map.                                                                                        |
| P3   | Use binary insertion when IDs arrive out of order, with a fast append for the usual case. At 1,000 particles in the skewed-depth fixture, repeated sorting takes 2.429 ms versus sorted insertion 0.477 ms. Dirty sorting is faster (0.344 ms), but postpones ordering and adds state. Immediate observable ID ordering is retained.                      |
| P4   | Retain the owner-local pool without an automatic cap. A live 5,000-particle trough retains approximately 57.5 MB, versus 2.9 MB with cap 256. Returning to peak constructs 0 versus 4,744 particles; cap 256 also worsens some churn tails. The tradeoff is explicit, and destroy releases the pool. No automatic shrink policy is claimed as beneficial. |

Traversal uses an owner-local cursor stack rather than per-frame copies. Structural
removal adjusts active cursors; clear replaces the cohort. Callback boundaries
check identity after a structural mutation so recycled objects do not continue the
old particle's phase. IDs are reserved before initialization hooks. A rejected
last reservation rolls back; a committed nested insertion can leave an ID gap.
Limits are checked again using the final group before insertion, and listener
refills cannot force an over-limit commit or an unbounded eviction loop.

Cleanup remains idempotent after direct destruction, including rejected initializers.
Explicit removal clears collision immunity before disposing and pooling a particle.
Invalid nonfinite or unsafe addition targets become zero before entering loops;
positive fractions retain their existing ceiling behavior. Removal quotas are
bounded by the starting active count even when listeners refill the collection.
