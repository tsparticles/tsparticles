# V5-04 — Simplify Container while preserving its lifecycle

Status complete. E3 shared-contract gate is verified; lifecycle changes,
regressions, compressed-size results and matched headless runtime/retention
evidence pass. The small M6/500 and M8/500 p95 ceiling exceedances are carried
to the E10 performance verification gate. See [E4 evidence](evidence/e4/measurement-status.md).
See the [execution sequence](V5-EXECUTION.md).

## Lifecycle transition table

| Transition               | State/scheduling effect                                                                                                     | Hooks and events                                                                                                                                                            | Owned cleanup / cancellation                                                                                                   |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `start`                  | Increments the start generation; concurrent callers share the start promise. `init` runs before delay and `started` is set. | Plugin `getPlugin`/`preInit`, drawers/updaters, option hooks, plugin `init`, particles init/setup; after delay, listeners, plugin `start`, `containerStarted`, then `play`. | Stop/destroy invalidates the generation and settles the pending start. Late plugin initialization is stopped and disposed.     |
| delayed start            | Holds one timeout and resolver per active generation.                                                                       | No start event until timeout and plugin start hooks finish.                                                                                                                 | Cancellation clears the timeout and resolves the delay; stale generations cannot dispatch start/play.                          |
| `play` / `pause`         | Owns one scheduled animation frame; pause cancels it.                                                                       | Plugin hook before corresponding container event.                                                                                                                           | Resume forces a fresh frame timestamp; pause is idempotent.                                                                    |
| `stop`                   | Invalidates start work, removes event listeners, clears particles and stops canvas/plugins.                                 | For a started container: pause hook/event, plugin stop and destroy hooks, then `containerStopped`.                                                                          | Cleanup runs even if init failed before `started`; repeated stop is safe and refresh creates fresh container plugin instances. |
| `refresh`                | Stop followed by a new start generation with the current source options.                                                    | Repeats init/start ordering.                                                                                                                                                | Old listeners, motion registrations, Poisson timeout and path generator resources are stopped before replacement.              |
| `reset(options)`         | Replaces source options and loaded option instances, then refreshes.                                                        | Same ordering as refresh with new options.                                                                                                                                  | Mutable option instances remain container-owned; stale async work is generation-guarded.                                       |
| `destroy`                | Stop (including plugin stop/destroy), particle/canvas/drawer teardown, unregister, mark destroyed.                          | `containerDestroyed` follows unregister and resource teardown.                                                                                                              | Idempotent; pending init and timeout work is invalidated.                                                                      |
| delay/duration           | Delay gates `started`; duration advances from frame delta and destroys once expired.                                        | Existing start/destroy events.                                                                                                                                              | Stop cancels delay; destroy cancels frame and listener work.                                                                   |
| visibility/resize        | Visibility may pause/resume; resize observer or window fallback debounces canvas resize.                                    | Plugin resize hooks follow canvas resize.                                                                                                                                   | Listener removal disconnects observers and clears resize timeout.                                                              |
| async cancellation/error | Generation mismatch prevents stale completion from activating a replacement.                                                | Current rejected start rethrows after stop cleanup.                                                                                                                         | Pending plugin instances are stopped/disposed; late asset/plugin work is guarded by its owner.                                 |

Hook order above reflects current source and is the reference for E4 regression
tests. The table does not claim that external plugin promises can be forcibly
aborted; their late completion must observe owner state or generation checks.

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

Carry the startup contract verified in V4-B01–B04 into the state model. Each
engine's registry must complete before its concurrent
loads proceed. A canceled transition must leave no late events or rescheduled
frames. Verify one pending frame per container and smoke-test an explicit
OffscreenCanvas in a dedicated worker without DOM dependencies in the core path.
Reuse the v4 regression tests.

## Deliverables

Provide the lifecycle table, extracted components, before/after sizes, and
evidence. If measurements do not show a reduction, record that outcome. Update
architecture docs, the changelog for API changes, and index status.

## Performance and size plans

See [V5-IMP-06-RENDER-LIFECYCLE](improvements/V5-IMP-06-RENDER-LIFECYCLE.md).
Record assigned outcomes as specified in the [improvement plan](V5-IMPROVEMENTS.md).

## Source-review acceptance additions

Apply G2/G3/G4/G7 from the [source review](V5-CODE-REVIEW.md). Integrate path,
motion and Poisson cleanup, partial-init rollback and promise settlement. Add
clock/FPS/long-gap/error-recovery scenarios and preserve EventDispatcher snapshots.
Count listeners/handles across refresh, stop/start and destroy, including workers.
