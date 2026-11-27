# E1 — Explicit engines and supported-consumer migration

Status: **accepted** (2026-11-17). E0, E1 and E2 are verified; E3–E10 remain
pending and optional plugin work (now E13) is excluded. No commit or publication performed.

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
- Supported wrappers use engine props/providers/service configuration.
  Application templates/demos and generation strings create explicit,
  application-owned engines. Supported wrapper, template, test, documentation
  and package checks are complete for this stage.
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
- Web Components now uses the element's explicitly assigned engine in load-error
  diagnostics; its README and English/Italian guide examples, plus the classic
  bundle demo, create and assign an engine without the removed default singleton.
  Wrapper tests (9), wrapper CI build, demo CI build and Prettier checks pass.
- Real browser smoke of the Web Components demo passes: the page defines one
  `<web-particles>` element and renders its canvas with the expected animated
  particle scene.
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

- E1 consumer, generated-code, installed ESM/CJS/browser, multi-bundle bootstrap
  and external/standalone Webpack checks are complete. The Webpack external test
  compiles a UMD consumer and invokes its factory against the classic
  `tsParticles.createEngine` namespace. Rollup and Rolldown use the shared
  external/global mapping and generated wrapper pipeline.
- E1 size and runtime comparisons against E0 are recorded in the evidence below.
  M6 at 500 particles exceeds the E0-derived frame-p95 ceiling in two repeated
  runs (1.90 ms vs 1.87 ms; E0 was 1.70 ms). This is a recorded E1 regression,
  not a budget pass. E1 verifies and reports the migration impact; E10 remains
  the release budget gate and must close or explicitly disposition this result.
- Review remaining supported template/docs and alternative-bundler bootstrap paths.
  The extended rebuild's reported failures were corrected and dependent demos pass.
  Ember emitted diagnostics despite an initial success exit; fixtures were migrated
  and its final rebuild has no TypeScript errors. The Electron client builds, but
  packaging skipped an existing output directory: no fresh packaging claim.
- Timing follow-up is assigned to E10: M6 extensions at 500 particles has frame
  p95 1.90 ms on both runs against the E0-derived ceiling 1.87 ms. Workload counts
  and random-call counts match E0 exactly. Preserve both measurements; do not
  treat this as a passing budget or tune the workload to erase the exceedance.
- E2 accepted RNG/logger/scheduler ownership and the lifecycle/mutation decisions
  recorded there. E1 does not claim that later v5 stages are complete.

## 2026-11-16 acceptance

- Root and basic/slim/full/all bundle README examples now create explicit engines
  and load bundle features into those engines. The obsolete claim that classic
  scripts restore the old default instance was removed.
- Webpack config generation now sets its `context` from the package directory and
  avoids generating the absent `bundle.lazy.js` entry. A temporary-package
  integration test compiles the standalone entry with Webpack. The CLI test target
  passes 4/4 and the Webpack plugin CI build passes.
- Browser smoke verified the Web Components demo renders a canvas and animated
  particle scene.
- Added execution coverage for a compiled external-engine Webpack UMD bundle;
  it resolves `createEngine` from the classic namespace and calls it successfully.
- Re-ran Webpack plugin and CLI CI builds; both pass. The CLI Webpack suite passes
  6/6 tests.
- The repeated M6 frame-p95 exceedance is assigned to the E10 budget gate, not
  marked as passing. See `runtime-comparison.json` and both source measurements.

## Remaining distribution finding

The standalone Webpack entrypoint matrix is corrected and its generated config
has a compilation smoke test. External engine composition now has both compile
and runtime coverage for the classic `tsParticles` namespace. Rollup and Rolldown
share the reviewed external/global mapping; full bundler-matrix and package
distribution closure remain assigned to E9.

Final checks recorded: all 23 test targets pass (1,099 tests), Webpack CLI tests
pass 6/6, Webpack plugin and CLI CI builds pass, the Web Components browser smoke
passes, changed-source format check passes using the Svelte workspace's declared
formatter plugin, and `git diff --check` passes. No commit, version bump or
publication performed.
