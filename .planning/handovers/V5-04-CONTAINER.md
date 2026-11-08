# V5-04 — Simplify Container while preserving its lifecycle

Status pending. Requires completion of 03.

## Ownership

The Container domain, its option, lifecycle, and event helpers, container tests,
and consumers of any affected contracts. Limit canvas/rendering changes to
necessary signature adaptations and preserve other contributors' changes.

## Work

1. Start with a state transition table for init/start/play/pause/stop/destroy,
   refresh/reset, delay/duration, visibility/resize, and async cancellation.
   Map event and plugin hook order before changing code.
2. Profile bundle contributions from option loading, plugin/drawer/updater init,
   callback dispatch, the frame loop, exports, and branches. Use the report to
   identify duplication or avoidable dependencies.
3. Extract cohesive internal helpers into Container where responsibilities warrant
   it. Reduce repeated work and give lifecycle state a single owner. Avoid
   mandatory managers that increase code, allocations, or teardown complexity.
4. Preserve dynamic Container loading from Engine and access to the per-engine
   services defined in 02. Test references and cleanup after refresh.
5. Evaluate retained optional branches. Use existing hooks where they allow code
   to be excluded. Moves into plugins require compatible standard bundles,
   loaders and options, tests, and a migration note.
6. Measure after each cohesive change. Revert extractions that make results worse
   unless a separate architectural reason justifies them.

## Acceptance tests

- Repeated start/stop/destroy, play/pause, and refresh/reset preserve event order,
  hooks, effective options, and cleanup, with no duplicate listeners or plugins.
- Destroy during delay or async start/init and concurrent refresh leave no timers,
  frames, or registered containers. Promises settle according to the contract.
- With two engines and several containers, actions, logging, and RNG remain local.
- Test timing with a fake scheduler and deterministic assertions.
- Pass relevant group, particle, background, export, and optional theme tests.
- Compare gzip/Brotli and benchmark the same scene against 03 and the baseline.
  Require evidence of benefit for any added per-frame allocation.
- Complete the suite, lint/format checks, and downstream builds.

## Regressions to carry forward from v4

Carry the startup contract verified in [V4-B01–B04](../v4-review/CORRECTNESS.md)
into the state model. Each engine's registry must complete before its concurrent
loads proceed. A canceled transition must leave no late events or rescheduled
frames. Verify one pending frame per container and smoke-test an explicit
OffscreenCanvas in a dedicated worker without DOM dependencies in the core path.
Reuse v4 regression tests once available.

## Deliverables

Provide the lifecycle table, extracted components, before/after sizes, and
evidence. If measurements do not show a reduction, record that outcome. Update
architecture docs, the changelog for API changes, and index status.

## Performance and size plans

See [V5-IMP-06-RENDER-LIFECYCLE](improvements/V5-IMP-06-RENDER-LIFECYCLE.md).
Record assigned outcomes as specified in the [improvement plan](V5-IMPROVEMENTS.md).
