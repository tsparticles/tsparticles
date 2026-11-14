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

| Plan   | Current status      | Evidence / next gate                                        |
| ------ | ------------------- | ----------------------------------------------------------- |
| IMP-01 | Under analysis      | E0 baseline and budgets complete; final comparisons pending |
| IMP-02 | Pending measurement | Consumer graph and CDN totals before E9 changes             |
| IMP-03 | Pending measurement | Collections after E5 model contracts                        |
| IMP-04 | Pending measurement | Spatial fixtures and predicate/snapshot measurements in E6  |
| IMP-05 | Pending measurement | Particle state after canonical OKLCH in E5                  |
| IMP-06 | Pending measurement | Lifecycle E4 and rendering E7                               |

G1–G7 remain open in `V5-ENGINE-AUDIT.md` and apply to the package matrix.
ARCH-01–04 and C0–C5 have no implementation decision or completion claim yet.

## Continuation decisions — 2026-11-14

- **D0.7 — E0 closure.** Installed tarball conditions/CJS accounting and extended
  runtime/color evidence close E0. Classic CDN lazy is unavailable in the current
  standard Rollup product (`includeLazy: false`); preserve package `/lazy`, do not
  introduce a classic lazy product during E1, and recheck documentation/artifacts
  in E9. Physical HDR luminance is outside headless measurement capability;
  actual P3/float16 rendering and natural sRGB fallback are both recorded.
- **D0.8 — Observed defects are not acceptable budgets.** The measured listener
  growth is the Motion reduced-motion query, not the HDR queries. E4/G2 must
  close its lifetime/reset behavior. Parser alpha versus fill opacity fixtures
  capture v4 behavior for E5; they are not a v5 visual-parity requirement.
- **D1.1 — Retire before adaptation.** Remove the six framework/demo projects,
  24 template variants, obsolete docs/navigation/marketing claims, Vue 2 patches
  and dependency overrides. Preserve historical changelogs and E0 inventories.
  The installer retains only Vue 3/Nuxt 4 suggestions, handles common semver
  prefixes, and no longer contains the malformed duplicate Vue wrapper entry
  that interrupted subsequent framework detection.
- **D1.2 — Dependency synchronization.** Refresh the lockfile through pnpm:
  493 package-version entries removed, none introduced. Existing peer-context
  combinations are recalculated. Offline metadata was in the old pnpm layout;
  registry metadata access and a frozen-lockfile install restored the workspace.
  Installation scripts were disabled; no release/version/commit hooks were run.
  Test/build runs resumed only after installation completed.

E1 remains open: the factory and engine/browser/wrapper APIs are being migrated;
see V5-E1-ENGINE.md for current verification. E2–E10 and all corresponding acceptance gates remain pending.

- **D1.3 — Explicit ownership.** `createEngine()` is synchronous; no default engine.
  Keep `Engine` type-only. Applications own engine lifetime: destroy their containers
  and await pending loads before releasing an engine; no new engine disposal API in E1.
  Preserve the existing items array contract for now; direct mutation is not a
  cleanup operation and does not release browser resources. E3/G7 reviews mutability.
- **D1.4 — Convenience and wrappers.** `createConfetti`, `createFireworks`,
  `createParticles`, `createRibbons` bind to a supplied engine. `initPjs` returns
  compatibility APIs. Providers/props/service initialization require caller-owned
  engines. Same-engine wrapper initialization shares the first pending registrar;
  retry after rejection is supported. Separate engines never share init promises.
  Nuxt imports the application's `engine` export from its configured init module;
  custom elements receive an engine property, Qwik receives a client-only value.
- **D1.5 — Canvas failures.** Reject an occupied canvas before replacing a scene;
  destruction releases its symbol ownership. Once replacement begins, failed setup
  or start destroys/removes the new scene; the old scene is not resurrected. A shared
  symbol on the canvas handles duplicate CDN module copies without a default engine.

- **D1.6 — Wrapper registration ordering.** A mounted component waits for its
  explicitly supplied engine's wrapper initialization. It must not initialize
  an empty engine and suppress a later application registrar. Waiting before
  initialization, concurrent calls, independent engines and retry are tested.
- **D1.7 — Transferred canvas lifetime.** Cache the transferred OffscreenCanvas
  on its source HTML canvas with a shared symbol; module-local caches fail across
  independent CDN copies. Release active ownership on both resources on destroy;
  retain the transfer association for the browser resource's lifetime.
