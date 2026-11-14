# E1 — Explicit-engine implementation in progress

Status: **implementation verified in part; E1 acceptance remains open** (2026-11-14).
E0 and the retirement increment remain verified. E1 factory/consumer work now
changes runtime; the earlier 680-test retirement result does not validate it.
E2–E10 are pending and E11 is excluded. No commit or publication performed.

## Implemented, verification still in progress

- Synchronous `createEngine()` replaces the singleton in root/lazy exports;
  engine remains type-only. Module browser resolution points to pure ESM entries.
- Classic bootstrap exposes factory definitions; `tsParticles.createEngine()`
  creates an application-owned instance. Rollup/Rolldown public exposure supports
  factory exports and the `tsParticles` namespace. No default engine is retained.
- Canvas ownership is attached to the canvas with a shared symbol so independent
  CDN module copies cannot control the same resource. Concurrent owners, including
  different IDs within one engine, are rejected. Destruction releases ownership.
  Canvas setup now shares start's cleanup boundary. Acquisition failure retains
  the existing scene; failure after replacement destroys the failed replacement.
- Confetti/fireworks/particles/ribbons expose `createX(engine)` callables; init
  promises belong to each callable and failures permit retry. `initPjs(engine)`
  returns compatibility APIs instead of writing globals. `loadConfigs(engine)`
  explicitly registers configs/palettes.
- Emitter ShapeManager registrations are instance-local (G1).
- Supported wrappers are migrating to engine props/providers/service configuration.
  Application templates/demos are migrating to explicit, application-owned engines.
  Generation strings, remaining wrappers/tests/docs and package checks are ongoing.
- Wrapper waiters are scoped by engine and wait for explicit application
  initialization; mounting before the registrar no longer initializes an empty
  engine and silently suppresses that registrar. New tests cover this ordering.
  Applications must call their wrapper initialization API, even when loaders were
  registered separately. React/Vue providers and Angular services own this call.

## Verified so far

- Engine, Rollup tooling, basic/slim/full/all/PJS and convenience builds pass.
- Final combined run: **23 projects, 1,099 tests passed**, including 20 wrappers,
  MCP and create-app. Main suite: **51 files, 686 tests passed** on the current canvas ownership
  implementation. React: 10 tests. Angular confetti/fireworks: 10/6 tests,
  including engine replacement while the previous request is pending.
- Supported wrapper suites passed at the preceding factory increment; wrappers
  changed since that run are retested separately. Full final closure remains open.
- Installed package: six root/lazy ESM, CJS and browser-condition probes pass,
  with poisoned ambient getters and distinct factory instances. See
  [installed measurements](evidence/e1/installed-package.json).
- Real Chrome, separate basic and slim bundle copies: distinct factories/engines,
  same-ID scenes on different canvases, occupied-canvas rejection, ownership
  release, reuse of the transferred OffscreenCanvas, and unaffected second scene
  on destroy/refresh all pass. See [browser evidence](evidence/e1/factory-browser.json).
- Extended rebuild executed 436 tasks and exposed seven failures. Generator import
  corruption, test lint, Electron extension and Lit source placement are corrected.
  Generator/Lit and Angular component rebuilds pass. Electron client build passes.
- Preact demo passes after restoring the declared native canvas dependency with
  `pnpm rebuild canvas`. Angular demo passes with `CI=true`; local cache mode
  aborts in native LMDB environment teardown on Node 26.13.0. This is recorded as
  an environment limitation, not a passing local-cache check.

The transferred OffscreenCanvas is cached on its source HTML canvas using a
shared symbol. A module-local WeakMap cannot support sequential ownership across
separate CDN copies because an HTML canvas can only be transferred once.
Both source and render canvas carry the active owner, which destruction releases.

## Open acceptance work

- Finish supported consumer and generated-code migration, including custom-element
  engine property binding and wrapper regression suites with distinct engines.
- Installed ESM/CJS/browser purity, multi-bundle bootstrap and external/standalone
  checks on final artifacts; remeasure E1 size/runtime against E0.
- Review remaining supported template/docs and alternative-bundler bootstrap paths.
  The extended rebuild's reported failures were corrected and dependent demos pass.
  Ember emitted diagnostics despite an initial success exit; fixtures were migrated
  and its final rebuild has no TypeScript errors. The Electron client builds, but
  packaging skipped an existing output directory: no fresh packaging claim.
- Timing investigation remains open: M6 extensions at 500 particles has median
  frame p95 1.90 ms on both runs against the E0 ceiling 1.87 ms. Workload counts
  and random-call counts match E0 exactly. Preserve both measurements; do not
  treat this as a passing budget or tune the workload to erase the exceedance.
- Finalize lifetime/mutation decisions and migration documentation. RNG/logger
  remain shared until E2; do not claim service isolation or full v5 completion.

## Remaining distribution finding

Source review of the opt-in Webpack helper found an unresolved contract gap:
`getEntry.ts` requests `dist/browser/bundle.lazy.js`, but the current basic bundle
only emits `index.lazy.js`; `getConfig.ts` uses unnamed UMD exports and engine
externals resolve from `window`. The tested Rollup namespace cannot be assumed
for this path. Engine/bundle package directories do not currently provide the
`webpack.config.js` required by the CLI command. Define and smoke-test supported
Webpack configuration/entrypoint composition before accepting its migration.
Rolldown tooling builds, but final runtime composition still needs a dedicated
probe. Keep E1 open; E9 remains responsible for complete distribution closure.

Final checks recorded: all 23 test targets pass (1,099 tests), changed-source
format check passes using the Svelte workspace's declared formatter plugin, and
`git diff --check` passes. No commit, version bump or publication performed.
