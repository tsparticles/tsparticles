# V5-IMP-03 — Groups, deferred removal, pooling, and ordering

Status pending analysis. High priority. Handover 06 owns this plan, with
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
