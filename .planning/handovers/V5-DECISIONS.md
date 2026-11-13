# V5 implementation decisions

## E0 checkpoint — 2026-11-13

- **D0.1 — Evidence before runtime.** Baseline revision is
  `1944fa0f5c202b8af82841b5de9b2315f758a258` on `v5`, initially clean.
  The only source preparation so far is import ordering and replacing an empty
  logger mock with `mockReturnValue(undefined)` in an existing BackgroundMask
  test, required by the baseline CI build. It changes no runtime
  behavior. Exact patch is in `evidence/e0/baseline.patch`.
- **D0.2 — Consumer scope.** Retire Vue 2, Nuxt 2 and Nuxt 3 and their related
  demos/templates/installers/docs in E1, with reference closure in E9. Retain
  remaining integrations. The complete initial manifest inventory is in
  `V5-MIGRATION-MATRIX.md`; its rows are not compatibility certifications.
- **D0.3 — Browser policy.** Evaluate the six-calendar-year window beginning
  2021 against the installed Browserslist/caniuse dataset at this checkpoint.
  Use 0.05% worldwide per-version share as the negligible-usage threshold:
  a target older than the window may be retired only below that threshold.
  Keep `not dead` and all feature detection required by retained targets.
  `evidence/e0/browser-policy.json` records current and candidate queries,
  resolved targets and dataset versions. No browser config has been changed.
  E9 must re-evaluate with the same frozen data for comparisons, then separately
  record any release-time dataset update. Worldwide share is a policy choice,
  not a claim about actual tsParticles users.
- **D0.4 — E1 contract outline.** `createEngine()` is synchronous, allocates a
  distinct engine without DOM work, and is a runtime export; Engine stays a
  type export. Async initialization remains explicit. Loaders receive the engine.
  Wrappers receive an engine prop/provider and own only their containers.
  CDN bootstrap exposes factory/loaders, never a default engine. The concrete
  namespace, same-canvas arbitration and engine lifetime decisions remain E1
  tasks and need consumer tests before closure. Shared RNG/logger isolation
  remains E2; E1 alone must not claim full independence.
- **D0.5 — Baseline validity.** Never run clean package builds concurrently with
  tests or consumer measurements that read those outputs. The first test run
  overlapped engine rebuilding and is invalid as a regression baseline.
  A direct retry also collided with Vitest's coverage lock. Preserve both logs
  and rerun sequentially after all build work completes.
- **D0.6 — Conditional optimization.** No candidate is accepted or rejected
  without measurements. Missing runtime/browser measurements keep E0 open and
  prevent E1. E11 is excluded from this execution.

## Experiment register

| Plan   | Current status      | Evidence / next gate                                          |
| ------ | ------------------- | ------------------------------------------------------------- |
| IMP-01 | Under analysis      | Fresh builds, inventories, measurement harness; E0 not closed |
| IMP-02 | Pending measurement | Consumer graph and CDN totals before E9 changes               |
| IMP-03 | Pending measurement | Collections after E5 model contracts                          |
| IMP-04 | Pending measurement | Spatial fixtures and predicate/snapshot measurements in E6    |
| IMP-05 | Pending measurement | Particle state after canonical OKLCH in E5                    |
| IMP-06 | Pending measurement | Lifecycle E4 and rendering E7                                 |

G1–G7 remain open in `V5-ENGINE-AUDIT.md` and apply to the package matrix.
ARCH-01–04 and C0–C5 have no implementation decision or completion claim yet.
