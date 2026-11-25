## Session status — 2026-11-25 — E10 in progress

- A focused renderer optimization caches only plugins that implement
  `drawParticleTransform` (1 of 13 container plugins), removing the 13-plugin
  scan from each particle draw. The matched 21-repetition Chrome 158 M6/500
  result improves median frame p95 from 1.8 to 1.7 ms SDR and 2.2 to 1.9 ms
  forced HDR; SDR meets 1.87 ms, HDR remains 0.03 ms over. Candidate and control
  artifacts are in `handovers/evidence/e10/drawhook-ab/`.
- The focused rendering lifecycle tests pass (15). The full Nx test run has 946
  passing tests across 61 files; four server-based targets passed when retried
  with local-port access. The broad build succeeded for 232 of 235 projects;
  the three Electron, Angular and Next.js demo targets then passed with their
  91 dependency tasks on retry. Angular reported its existing component-style
  budget warning. Bundle and installed-package evidence has been refreshed
  after the engine build. E10 remains open pending the HDR row and remaining
  release gates.
- Repeated the packed-template retirement check after the rebuild: all nine
  template archives still contain zero retired Vue 2/Nuxt 2/Nuxt 3 variants,
  matching the existing E10 evidence byte-for-byte. Engine and test-project
  lint pass after the renderer change.
- Re-ran both vanilla generated consumers against the fresh package builds:
  the MCP consumer type-checks and mounts one canvas from 13 packed packages;
  the CLI scaffold type-checks, production-builds and mounts one canvas in
  Chrome without browser or console errors. Added a parameterized React CLI
  scaffold check; its type-check, production build and Chrome one-canvas smoke
  also pass without browser or console errors. Other generated framework
  outputs remain open.
- Tested a semantically equivalent Canvas2D transform reset in a 21-run HDR
  comparison. The variant's 1.9 ms median did not establish a stable win over
  the current 2.0 ms run or clear the 1.87 ms limit; it is archived and not
  adopted. The reset preserves renderer state across plugin/shape hooks and
  thrown draws, so no further source change was justified by this experiment.

- Removed the deprecated engine RGB/HSL CSS helpers, HSV formatter and OKLCH
  plugin-local formatter after confirming no workspace runtime callers. The
  migration guide and package changelogs document the replacements. Color plugin
  suites pass (35 tests total), the primary suite passes 946 tests across 61
  files, and the engine bundle fell 854 bytes. A 420-task package build found
  three missing `override` modifiers, now fixed and rebuilt. The initial
  sandboxed Next.js demo build could not fetch Google Fonts; its authorized
  retry passed, as did the Electron and Angular demo build retries.

- The user prioritizes runtime performance and accepts justified v4-to-v5
  payload growth. The size review is complete under that criterion. E0 payload
  ceilings remain recorded as diagnostics, and runtime, allocation and retention
  criteria remain in effect. [Acceptance update](handovers/V5-10-SIZE-MIGRATION-RELEASE.md#e10-acceptance-criteria-update--2026-11-24).
- Removed no-op interactor lifecycle work from the hot path. In nine
  repetitions on the rebuilt production bundle, M6/500 frame p95 improved to
  1.70 ms SDR and 1.90 ms HDR. The HDR row still exceeds its 1.87 ms ceiling.
  Quiet M4/500 update and draw meet E0. [Runtime evidence](handovers/evidence/e10/README.md#interactor-lifecycle-optimization).
- Repeated the extended M6/500 candidate check 21 times per output mode. The
  medians remain 1.90 ms SDR and 2.20 ms HDR against 1.87 ms; HDR used
  Display-P3/float16. Lifecycle, DOM and RNG checks pass, but both E0 runtime
  rows stay open. Raw samples are under
  `handovers/evidence/e10/runtime-21/`.
- Reused the existing sRGB-to-Display-P3 path and removed the deprecated
  `colorMix()` engine export. The rebuilt Engine saves 188 gzip and 140 Brotli
  bytes. The 16 previously failing rows that were remeasured remain over
  budget. [Probe and migration evidence](handovers/evidence/e10/README.md#engine-color-changes-after-the-checkpoint).

- Added local Firefox 138.0.1 and Safari 27.2 color fixture evidence. Firefox
  passed 4/8 strict cases because P3 contexts fell back to sRGB; Safari passed
  5/8, with its P3 SDR cases passing and three HDR cases lacking an effective
  float16 context. The All-bundle fallback smoke passes in both browsers, with
  one canvas, sRGB output, and HDR disabled when the host reports no P3/high
  dynamic range. Physical HDR remains open. See
  `handovers/evidence/e10/browser-color-matrix.json`.
- Reconciled the four architecture decisions with their implementation and
  consumer evidence. The engine audit inventory matches all 161 tracked source
  paths. Repacked all nine template families and confirmed the retired framework
  variants are absent. Removed the remaining Vue 2 issue contact.
- Updated the React Confetti example across all ten locale trees and checked it
  against the built package declarations. Migrated all eight Qwik examples in
  the same ten locale trees and verified their types. The lazy example builds
  and mounts its canvas in Chrome. The Riot and Ember web guides now use the
  explicit engine in all ten locale trees. The full Riot example runs in
  Chrome; Ember passes strict TypeScript, template parsing and its production
  demo browser check. The Ember demo renders two scenes and adds a third when
  Confetti is enabled. Other wrapper documentation and generated framework
  consumers still need verification. Deprecated API retirement and
  browser/hardware coverage also remain open.
- The maintained React demo production build passed (62 tasks, 13 cached), and
  Chrome 158 mounted one canvas from the built artifact without page or console
  errors. Reproduction and output are recorded in the E10 evidence README and
  `react-demo.json`.
- The React Confetti guide example now passes in Chrome 158: one canvas, 50
  particles after emitter start, and no page or console errors. Its 43-task
  preset build exposed two missing `override` modifiers in `EmittersInteractor`;
  adding them restored the package build. See `react-confetti.json` and the
  reproduction steps in the E10 evidence README.
- The Web Components demo passed its 21-task Nx CI build. Chrome 158 mounted
  one canvas with the explicit engine assigned, no page or console errors, and
  no external requests. The wrapper target passes all 9 tests. Reproduction
  and output are in the E10 checkpoint.
- The Confetti website examples now use `count` and percent-based `position`;
  its 284-task Nx CI build passed. A local Chrome run exercised cannon,
  fireworks, snow and continuous effects. A repeatable browser check now allows
  only localhost and blocks all external requests before dispatch; Chrome 158
  reports no page or application console errors. See
  `handovers/evidence/e10/confetti-website.json` and the E10 evidence README.
- Removed deprecated Confetti and Ribbons option aliases, loader fallbacks, and
  accessors; updated active demos, English docs, all nine translations, README,
  migration inventory, and v5 changelog. Both bundle builds and all four bundle
  tests pass; generated declarations no longer expose the aliases. Ribbons'
  minified output fell 916 bytes. The retained PJS compatibility API and Stencil
  v4 loader declaration still carry deprecations; the broader E10 gates remain
  open. See [E10 evidence](handovers/evidence/e10/README.md).
- The frozen budget screen records 17 size failures, including three CJS graphs,
  and two extended runtime failures after confirmation. The separate quiet
  M4/500 check also records exceedances. See the
  [E10 checkpoint](handovers/evidence/e10/README.md).

## Session status — 2026-11-24 — E9 accepted; E10 open

- Installed engine/Basic package checks pass for ESM, CJS, browser, and lazy
  conditions, including types, augmentation, custom plugin registration, and
  independent engines. Basic bundle builds pass for Rollup, Rolldown, and
  Webpack. See [E9 evidence](handovers/evidence/e9/README.md).
- Rolldown's Terser compatibility plugin did not minify its generated `.min.js`
  artifact. Native Rolldown output minification fixed the output from 170,185
  to 122,777 raw bytes; final Rollup is 121,216 bytes. Chrome passed the same
  100-particle scene through Rollup, Rolldown, minified/unminified Webpack, and
  external Webpack compositions. Selective, standalone, and external totals are
  in [composition evidence](handovers/evidence/e9/composition-comparison.json).
- Retired Vue 2, Nuxt 2, and Nuxt 3 names were removed from active Japanese and
  Chinese demo indexes. Deprecated API migration paths are inventoried;
  Stencil v5's official guide resolves `applyPolyfills()` by removing the call
  and awaiting `defineCustomElements()` when registration must precede hydration.
- Desktop Chrome passed repeated-load/two-engine, local HTTP classic, and local
  module-script checks. Browser findings fixed duplicate IIFE execution,
  Webpack namespace replacement, and missing `animation.utils` bootstrap
  scopes. The documented jsDelivr URLs return 200, but published 4.6.0 exposes
  only the legacy singleton ABI without `createEngine`. Chrome also imported
  both existing jsDelivr `+esm` URLs (HTTP 200); that earlier engine build has
  no `createEngine` and writes the legacy `tsParticles.pluginManager` global.
  These URLs are not the candidate tested from the current checkout. E9 closes
  on local HTTP candidate, installed-package and browser evidence. E10 remains
  open; after E10, additional pre-release checks and a follow-up plan must be
  agreed. No release or publication is included in E0–E10.

## Session status — 2026-11-24 — E8 accepted

- E8 ecosystem audit closed. The 349-manifest inventory was reconciled to Nx
  build targets; family source scans, G1–G7 findings, and ARCH-04 decision are
  recorded in [V5-PLUGIN-AUDIT.md](handovers/V5-PLUGIN-AUDIT.md#e8-closure--2026-11-24).
- Custom extension registrations, concurrent/reversed two-engine loading,
  optional path isolation, background-context state, and seeded Fisher–Yates
  order have regressions. `@tsparticles/tests:build` passes with **959 tests / 61 files**.
- The workspace compatibility run covered 457 build tasks; Electron and Angular
  demo sandbox/network failures passed on authorized retries. E8 deltas were
  rebuilt in the tests package. A redundant, silent workspace rerun was stopped.
- E9 browser/CDN and matched payload composition, and E10 final budget/release
  checks remain open. No commit, merge, or publication was performed.

## Session status — 2026-11-24 — E7 accepted (before E8 start)

- The user accepts E7 closure: “sì va bene che E10 faccia i check finali”.
  Rendering/lifecycle implementation, full review and matched incremental checks
  are complete. **953 primary tests / 85 test targets / 453 build tasks** pass.
- Final absolute-budget checks are explicitly retained in E10. Original E0
  ceilings, recorded exceedances and earlier E5/E10 obligations remain unchanged;
  no release-budget waiver, release or publication is authorized.
- See [E7 acceptance](handovers/evidence/e7/closure/README.md) and
  [checkpoint](handovers/V5-E7-STATUS.md). E0–E8 are complete; E9 is next.
  E9–E10 remain pending. This update changes acceptance records only.

## Session status — 2026-11-24 — E7 technical work complete; acceptance pending

- Full CanvasManager/RenderManager method and ownership review is complete.
  Numeric layers retain live hooks; stale canvas callbacks, exceptional/nested
  drawing, zero-size resize, worker DOM guards and invalid zLayers are repaired.
- **953 primary tests / 85 workspace test targets / 453 build tasks** pass.
  Twelve full-surface pixel matches, eight color cases, 135 matrix snapshots,
  two 189-snapshot confirmations and extended HDR/retention checks pass.
- All grows **164 gzip / 265 Brotli bytes**; minimal **130 / 140**. Helper and
  chunk counts are unchanged. Relative runtime screens pass after confirmation.
- Original E0 absolute ceilings still have exceedances, including fresh E6
  control exceedances under Chrome 158 and Chrome for Testing 157. No new waiver
  or automatic extension of the E5 exceptions is inferred. The user's decision
  on technical E7 acceptance with absolute checks retained in E10 is pending.
- See [E7 technical completion](handovers/evidence/e7/closure/README.md),
  [review](handovers/V5-E7-REVIEW.md), [status](handovers/V5-E7-STATUS.md).
  E7 remains formally open; E8–E10 remain pending. No commit/merge/publication.

## Session status — 2026-11-23 — E7 started

- E7's first repair prevents nonfinite particle coordinates when resizing a
  previously zero-size DOM canvas. Five regression cases cover zero-size axes;
  the initial three reproduce the defect on the pre-repair compiled engine.
- Checks: **59 files / 931 primary tests** pass; downstream build targets pass
  across the broad run and successful outside-sandbox retries of Electron and
  Angular demos. Engine build, test lint and changed-file formatting pass.
- See [E7 checkpoint](handovers/V5-E7-STATUS.md) for the review queue and checks.
  Full rendering review, browser evidence and performance acceptance remain open.
- Existing E6 edits and evidence are preserved; no commit/publication.

## Session status — 2026-11-23 — E6 complete; E7 next

- E6 completes the manager/grid/range method review and P1–P4/S1–S4 decisions.
  The final source repair freezes draw membership/ID order, preserving live
  particle state while preventing callback skips, duplicates and recycled entries.
- Current merged-tree checks: **59 files / 926 primary tests**, all **85 test
  targets** and **453 downstream build tasks** pass. A stale v4 test import was
  adapted; missing local dependency files were restored without lockfile changes.
- Chrome: **135 matrix + 108 confirmation snapshots match**. All relative
  timing screens pass. Four initial E0 update flags pass nine-repeat matched
  confirmation; originals remain recorded. Extended RNG/counts and 30-cycle
  retention pass, with **114,908-byte** post-peak heap drift.
- Full bundle delta vs accepted E5: **+1,144 gzip / +956 Brotli bytes**; final
  draw repair vs preceding E6: **+109 gzip / +84 Brotli bytes**. Existing E5
  M4/500, bundle and inherited M6 follow-ups remain E10 obligations.
- See [E6 completion](handovers/evidence/e6/closure/README.md) and
  [method review](handovers/V5-E6-REVIEW.md). E7 is next; E8–E10 remain pending.
  No commit/publication by this continuation. Earlier checkpoints are historical.

## Session status — 2026-11-23 — E5 accepted; E6 started

- E0–E5 are accepted. C1–C4 and the Particle/options review are complete;
  ARCH-01/03 and IMP-05 record the measured model/cache decisions.
- E5 verification: full build:ci passes 457 projects; all 85 workspace test targets pass,
  including 817 primary tests. Eight formatter pixel cases and four exact
  link scenes pass on the archived compiled artifact.
- The 45-sample matrix matches 135 E4 scenes and passes all 30 E0 update/draw
  checks. M4 draw is 2.40/8.30 ms at 500/1000 particles. Quiet confirmation
  still finds M4/500 update 3.70 vs 3.52 ceiling and frame p95 7.50 vs E4
  6.50 (screen 7.15). The user explicitly accepts this deviation for E5,
  with final verification in E10. No runtime budget is reported as passing
  because of that exception. The earlier bundle-growth exception also persists.
- M6/500's inherited release issue remains: p95 2.10 vs 1.87 ceiling; fresh
  prior-E5 control 2.30. Final M6/M8 RNG and 30-cycle retention checks pass.
- E6 includes geometry/cell-size fixes, live sparse queries, callback-safe
  traversal and pooled identity tracking, nested initialization admission,
  ordered buckets and bounded invalid-count handling. The continuation passes
  910 primary tests, all 85 test targets and a fresh 453-task downstream build.
  P1–P4/S1–S4 tradeoffs and live-pool retention are measured and documented.
  The browser matrix matches 135 snapshots; initial M7 and E0 timing flags
  have matched nine-repeat confirmations (81 further snapshots). Extended RNG,
  counts and 30-cycle retention pass, with 116,744-byte post-peak heap drift.
  The earlier increment remains historical; E6 acceptance is open.
  See [E6 checkpoint](handovers/V5-E6-STATUS.md). E7–E10 follow in order.
  No commit/publication. See [E5 acceptance](handovers/evidence/e5/closure/README.md).
  Earlier checkpoints below retain their original historical measurements.

## Session status — 2026-11-22 — E5 cache/RNG increments verified; acceptance open

- Recovered the recorded E4 all-bundle and captured matched E4/pre/post-cache
  E5 profiles. All 135 scene snapshots agree. M4/1,000 draw improves from 12.40
  to 9.60 ms and sampled frame allocation falls 26.1%; residual M4 draw budgets
  and M7 dispersion still need investigation. T1–T4 cost decisions remain open.
- Bounded color-style caches and verified color mutations, gamut, alpha, HDR
  mode and peak. Corrected Ember/Riot engine imports and absorber placement/
  recycling that had used ambient randomness instead of the owner's RNG.
- Final build passes 453 targets; all 85 test targets pass, including 813
  primary tests. Eight browser pixel cases pass and match the current formatter.
- Fresh M6/M8 runs pass RNG stability and lifecycle assertions across 18 samples
  and 30 retention cycles: stable DOM/listeners, 114,876-byte heap drift. M6/500
  p95 remains 1.90 ms vs its 1.87 ceiling; old unseeded M6 runs are historical.
- See [current E5 checkpoint](handovers/V5-E5-STATUS.md) and matched evidence.
  E5 remains open. Bundle growth is waived; no commit or publication performed.

## Session status — 2026-11-17 — E4 accepted

- E0–E4 are accepted. E4 lifecycle cleanup has focused regressions, compressed
  sizes within the 2% allowance, and matched headless Chrome timing plus CDP
  forced-GC retention evidence. Across 30 retention cycles the DOM remains at
  9 nodes, media listener counters remain zero, and post-warm-up heap drift is
  104,052 bytes (<1 MiB). See [E4 measurements](handovers/evidence/e4/measurement-status.md).
- Headless frame p95 is slightly over the E0-derived ceiling for M6/500 (2.0
  vs 1.87 ms) and M8/500 (1.7 vs 1.65 ms); both are carried to E10's release
  performance gate. After the final WeakMap cleanup adjustment, the primary
  suite, test-package lint, CI formatting, and changed-file Prettier checks all
  pass. E5–E10 remain open and the optional plugin backlog (now E13) is excluded.
- Corrected the root and basic/slim/full/all bundle READMEs to describe explicit
  engine creation and avoid claiming that classic bundles expose the old default
  singleton. The root CDN example now creates an engine and loads Basic before
  starting the scene.
- Fixed Webpack config generation to use the package directory and omit the
  nonexistent `bundle.lazy.js` entry. Added standalone and external-engine UMD
  compile/runtime regressions; the Webpack CLI tests pass 6/6. Webpack plugin
  and CLI CI builds pass.
- The Web Components demo browser smoke passes: its custom element rendered a
  canvas and animated particles.
- Repeated M6 extension frame p95 is 1.90 ms vs the E0-derived 1.87 ms ceiling
  (E0 measured 1.70 ms). This is documented as a regression and carried to E10's
  release budget gate, not reported as passing. No workload tuning was used.
- No commit or publication performed. See [E1 acceptance](handovers/V5-E1-ENGINE.md).

> Historical checkpoint (superseded 2026-11-17): E1 factory and consumer migration are implemented in
> the working tree, with acceptance still open. Main suite: 686 tests; installed
> ESM/CJS/browser purity and real Chrome two-bundle canvas ownership pass.
> Final combined tests pass: 23 projects / 1,099 tests. Rebuild failures were
> corrected; consumer/distribution closure and one repeated timing exceedance
> remain open before accepting E1.
> At that 2026-11-14 checkpoint, E2 was complete and E1 acceptance and E3–E10
> were still open; the optional plugin backlog (then E11, now E13) was excluded.
> No commits or publications.
> See [current engine work](handovers/V5-E1-ENGINE.md). Earlier retirement-only
> results below describe the preceding verified checkpoint.

## Session status — 2026-11-15 — E2 accepted

- Completed E2 engine-owned runtime services after the ongoing E1 consumer migration. RNG, logging and animation scheduling now resolve from the owning engine; runtime callsites across core, plugins, shapes, paths, updaters and interactions were migrated.
- Updated migration guidance and all localized plugin-customization pages. Added targeted engine-isolation, logger, scheduler, boundary and consumer regressions.
- Engine build passes and direct builds succeeded for all 75 changed library packages, the Lit/Angular/Web Components wrappers and demo, and website docs. The primary suite passes (51 files / 688 tests), including 127 focused E2 tests and async logger ownership coverage. Installed ESM/CJS/lazy/browser package probes passed; changed package lint/format checks and final changed-file Prettier passed. Nx stalls before task output, so direct package builds were used. The engine-only bundle delta is recorded. See [E2 acceptance](handovers/V5-02-ENGINE-SERVICES.md).
- Shared caches/registries were classified. The sounds user-activation latch is intentionally realm-scoped browser state, shared by engines in one window and isolated across windows. E2 is complete. No commits or publications.
- Downstream Nx follow-up fixed remaining framework wrappers using the removed global logger. The requested build graph passed 199/199 tasks; wrapper tests passed 10/10 targets and the primary suite remained green at 688 tests. See the follow-up in [E2 acceptance](handovers/V5-02-ENGINE-SERVICES.md).

## Project Reference

See: .planning/PROJECT.md (initialized)

**Core value:** Provide a small, high-performance, and extensible particle engine that developers can integrate into web projects with minimal configuration.

**Current focus.** v5 E6 collections and spatial index on branch `v5`, with package version `4.6.0`.

## Session status — 2026-11-14 — E0 closed, E1 retirement verified

- Resumed at `f17e249212` (the preceding checkpoint was committed outside this
  execution). No commits or publications performed by this agent.
- Closed E0 with installed-tarball/CJS accounting, 18 additional runtime runs,
  30 retention cycles and inspected SDR/P3/float16 color fixtures. Recorded the
  absent classic lazy product and fixed payload/runtime budgets.
- Confirmed one leaked reduced-motion listener per container lifecycle and
  corresponding retained heap; assigned to E4/G2. Alpha fixtures record the
  v4 parser-alpha loss for required E5 migration.
- E1 first increment removes Vue 2/Nuxt 2/Nuxt 3 integrations: six Nx projects,
  24 starter variants and active references. pnpm removes 493 package versions;
  no new package-version entries. Nine packed template archives retain supported
  variants and exclude retired ones.
- Main suite: 50 files / 680 tests passed; create-app: 11 tests, CI build passed;
  primary test-package lint passed. New installer tests cover semver prefixes,
  retired frameworks, existing wrappers and continued detection.
- Next: factory/entrypoint and supported-consumer migration in E1. The singleton
  is still present. E1 is not complete; E2–E10 pending; optional plugin work
  (now E13) excluded.

## Session status — 2026-11-13 — E0 execution checkpoint

- Started from clean `1944fa0f5c202b8af82841b5de9b2315f758a258` after reading
  AGENTS, the handover index, execution sequence, source review and E0 owners.
- Captured fresh Rollup artifacts, ten consumer graphs, numeric payload budgets,
  six package-condition checks, classic-CDN cold/warm HTTP checks, 54 seeded
  runtime runs and an inspected SDR color reference. See
  [the report and exit checklist](handovers/V5-BUNDLE-REPORT.md).
- Created inventories for 153 engine source files and 349 extension/utility
  manifests, the consumer matrix, migration draft and decisions including G1–G7,
  retirement scope and browser age/usage policy. Inventory is not completed audit.
- Fixed import ordering and an empty logger mock in the existing BackgroundMask
  test to unblock baseline builds. No library runtime changes. Main suite:
  49 files / 668 tests passed; BackgroundMask: 16 tests passed. Earlier overlapping
  build/test runs are explicitly invalidated and their logs retained.
- E0 remains open: finish CJS/installed-consumer accounting and lazy-CDN
  disposition, emitter/absorber/retention, HDR/layers/resize and broader visual
  baseline evidence. E1–E10 have not started; do not skip the evidence gate.
- No commits, version bumps, publications or optional plugin backlog work
  (now E13).

## Session status — 2026-11-13 — source-based coverage check

- Reviewed current source at `6ef62b21869b2e08de8f80911e1f9192c18d451c`, with
  Nx project discovery and selected existing regression tests. Added
  [G1–G7](handovers/V5-CODE-REVIEW.md) to the mandatory stage acceptance checks.
- Concrete ownership targets include the shared emitter-shape registry and
  noise/motion listeners. Added explicit async failure, time/numeric, sampling,
  spatial-snapshot and public-lifetime decisions, preserving existing tests.
- Appended [optional E13](handovers/V5-13-OPTIONAL-PLUGINS.md) after E10 for
  measured plugin improvements. Mandatory fixes remain in E1–E8/E10.
- Source review and planning only; no implementation, runtime verification or
  performance result claimed. Full per-file audit and E0 baseline remain pending.

## Session status — 2026-11-13 — v5 execution reordering

- Added the authoritative [E0–E10 sequence](handovers/V5-EXECUTION.md), with
  dependencies, difficulty, impact, implementation increments and exit gates.
  Handover 01–10 filenames remain stable topic/ownership references.
- Baseline and retirement/browser scope precede runtime changes. Explicit engines
  remain first, immediately followed by isolated services. Shared contracts and
  lifecycle precede Particle/options plus the complete OKLCH migration; collections
  and rendering optimizations follow the resulting model.
- Plugin and browser migration now explicitly accompany every breaking change;
  final ecosystem/distribution stages close coverage rather than postpone repairs.
- Next action: E0 baseline and inventories. All runtime stages remain pending.
  Documentation-only revision; no runtime tests, builds or measurements claimed.

## Session status — 2026-11-13 — v4.6.0 merge

- Merge `201b8e8d33` brought `main` at `eab131e13a`, including the
  `v4.6.0` tag at `8c572f3f97` and subsequent publishing fixes. The first
  major runtime handover and its clean measurement baseline remain pending.
- The 4.6.0 release is complete. Collect the outstanding V4-S01 Rollup and CDN
  measurements in the v5 baseline. V4-S03 remains deferred under its first-use
  and standalone All compatibility criteria.

## Session status — 2026-11-08 — Post-merge documentation review

- Merge `e9c7a7378d` brought v4 tip `5aba15652a` into `v5`. Both root and engine
  manifests report `4.5.3`. The engine still exports the singleton, so the first
  major runtime handover remains pending.
- Aligned the current roadmap, requirements, handover sequence, and release gates.
  The original `4.5.1` reconnaissance and `4.5.2` architecture/color review remain
  historical. Capture a clean measurement baseline from the implementation
  starting commit before any major runtime changes.
- Translated the v5-only architecture and OKLCH plans and their handover
  additions into English. This pass checked documentation and source references.
  Runtime tests and measurements were not rerun.

## Session Status — 2026-11-06 — v5 OKLCH color planning

- Added [V5-COLOR detailed plan](handovers/V5-COLORS-OKLCH.md), phases C0–C5,
  runtime/input contracts, migration matrix and numerical/browser/performance gates.
- Confirmed early sRGB clipping/8-bit rounding in the current OKLCH manager and
  RGB → HSL normalization for particle state; also identified P3/HDR coupling.
- Proposed canonical IOklch, h/c/l animation, explicit alpha and gamut/HDR handling;
  old color values remain supported, HSL animation semantics need explicit migration.
- Integrated with handovers 03/05/07/08/09/10 and V5 requirements/roadmap.
- Documentation only: no runtime changes, test runs, builds or benchmark claims.

## Session Status — 2026-11-06 — v5 architecture planning

- Added [four dedicated architecture evaluations](handovers/V5-ARCHITECTURE.md)
  with source evidence, alternatives, initial recommendations, ownership,
  experiments, acceptance criteria and migration considerations.
- Particle: evaluate explicit snapshots and separation of state/behavior without
  moving every method into ParticlesManager. Full runtime serialization is not assumed.
- Engine: compare internal domains, selective subpaths and publishable packages.
- Options: separate input, resolved configuration and mutable runtime state;
  investigate normalization, extension contributions and cache invalidation.
- Extensions: evaluate common registration/lifecycle with typed capabilities and
  specialized frame pipelines, including all extension families in the audit.
- Integrated evaluations with handovers 03/06/07/08/09/10 and IMP plans; final gate
  requires a decision and evidence for each theme. Runtime experiments remain pending.
- Source/package baseline inspected today is `4.5.2`; original `4.5.1` plan
  evidence below remains historical. No runtime change, build or benchmark performed.

## Session Status — 2026-11-03 — v5 planning

- Prepared [ten ordered implementation handovers](handovers/README.md): explicit
  engines first, per-engine services, core boundaries, Container, canvas/render,
  ParticlesManager, Particle/Retina, ecosystem plugin audit, browser/CDN refinement
  and size/migration gate, plus measured performance/bundle-size candidates in
  [V5-IMPROVEMENTS.md](handovers/V5-IMPROVEMENTS.md). Mandatory file-level review covers all of engine/src.
  No runtime implementation was performed in this session.
- Verified singleton creation/global reuse, module-level random/logger state,
  type-only core class exports and current build CLI behavior against source.
- Expanded the performance/size plan into six linked technical documents under
  `handovers/improvements/`, integrated into the relevant handovers and final gate.
  Runtime experiments and measurements remain pending.
- Baseline bundle measurement and numeric budgets are deliberately pending until
  the implementation agent builds the unmodified baseline. No size reduction claimed.
- Updated PROJECT, REQUIREMENTS, ROADMAP and relevant architecture/structure/stack
  notes. Other April codebase/research audits remain historical and require verification.
- Nx project discovery succeeded using `NX_DAEMON=false NX_ISOLATE_PLUGINS=false`;
  default discovery was blocked by sandbox socket permissions.
- Next action: start V5-01 with baseline capture, then remove the singleton and
  migrate all active consumers. See individual handovers for tests and exit gates.
- Historical “v5 fluid plan” below means solver revision 5, not product major v5.

## Session Status — 2026-11-03

### 4.5.0 / 4.5.1 — Final plan re-check & website gate

- **Re-checked every handover against `v5`**: all 4.5.0 features are implemented and shipped — fluid as
  `collisions.mode`, MCP `generate_code`, emitters draw/drag, absorber split + multi-absorber, engine
  particle/group tests, workspace test coverage (waves 1–6), error codes/messages,
  code review fixes. No feature work is left over; the only open items are the ones listed
  at the end of this section.
- **Tests:** `pnpm --filter @tsparticles/tests test` → **45 files / 612 tests green** (2026-11-03).
- **Error-code bundles:** every `bundles/*/dist/*.min.js` ships `TSP-xxxx` codes with no full message
  sentence; `engine/dist/tsparticles.engine.js` keeps the full message. This closes the previously
  blocked error-code bundle spot-check.
- **Website gate (executed last):** all three sites resolve the 4.5.1 workspace packages; the EN docs
  already covered fluid, absorber split, emitter draw/drag, error codes and the MCP tool. Found and
  fixed one drift caused by 4.5.1: `emitters.draw` default flipped `true` → `false`, but the site still
  documented `true`.
  - `websites/website/docs/options/plugin-emitters.md` — default `false`, notes reworded.
  - `websites/website/docs/options/plugin-emitter-shapes.md` — draw no longer described as default.
  - `markdown/Options/Plugins/EmittersShapes.md` — same correction.
  - Verified: `vitepress build docs` green (108.95s) and Prettier clean on the touched pages.

### Still open (not blocking release)

- **Fluid visual validation in a real browser** — never done (same limitation recorded on 2026-10-02).
- **Deployment** of the websites — external to this workspace, not run.
- **Localized docs** (zh, ja, hi, ru, pt, fr, de, es, it): **all** localized pages are now in sync
  with the EN source. Beyond the 4.5.x pages and the missing `errors/index.md`, the following were
  aligned too: `migrations/particles-js`, `migrations/option-rename-matrix`, `migrations/from-v1/v2/v3`,
  `showcase/index`, `demos/shapes`, `demos/palettes`, `guide/color-formats` and `guide/wrappers`
  (missing sections translated, heading levels/structure aligned, `gaming` palette group added,
  "see also"/checklist/references sections added). Verified with a heading-structure audit across all
  9 locales: **zero mismatches**; `vitepress build docs` green.

## Session Status — 2026-10-02

### 4.5.0 — Fluid settling rework

**Goal:** make the fluid actually come to rest instead of endlessly bouncing on the pool bottom.

- **Energy blowup fixed.** Velocity reconstruction from the pre-advection snapshot was the source: it fed the solver's own positional corrections back as velocity (`~1255 px/frame`). Removed, together with the `FluidParticleData` / `prevPos` state it needed. Mean speed fell to `~5 px/frame`.
- **OutMode.clamp added, then rejected and fully removed.** It reduced the movement but never settled the pool (`1142/1500` still moving at 400 frames), and the user did not want a new out mode for it. Reverted from engine, updater, config, tests, docs and the tests dependency; `bounce` is back in the fluid config.
- **Contact damping added.** `#dampContacts()` bleeds off the velocity of a particle supported by enough neighbors, since the non-penetration projection only corrects positions and gravity would otherwise keep accumulating velocity on a resting particle. Damping is isotropic: removing velocity along contact normals sums one push per neighbor and launched the cloud across the canvas.
- **`supportContacts = 5` chosen empirically.** The contact count cannot distinguish a falling cloud from a resting pool, both hold a similar number of neighbors, so the value balances the two failure modes. Measured over 1500 particles at 2000 frames:

  | `supportContacts` | pool height          | mean speed | calm    |
  | ----------------- | -------------------- | ---------- | ------- |
  | 2                 | 1130 (suspended)     | 0.45       | 1200    |
  | 4                 | 600 (half suspended) | 1.65       | 580     |
  | **5**             | **240 (pooled)**     | **3.58**   | **365** |
  | 6                 | 220 (pooled)         | 4.55       | 362     |
  | no damping        | 238 (pooled)         | 4.91       | 251     |

  `restDensity` was verified not to affect the suspension (1 / 3 / 8 all behave the same), so attraction is not the cause.

- **Residual overlap accepted.** ~3400 overlapping pairs of ~1.1M in the densest region, handled by per-pair hard projection; the test thresholds were relaxed to `0.008` / `0.7` and the docs state it honestly. A global relaxation pass in `IContainerPlugin.postUpdate` was considered and rejected by the user.
- **Validation:** tests package 302/302, `Successfully ran target build for 463 projects`. The 6 failing `lint` tasks (`ember`, `svelte-kit`, `ionic`, `nuxt2/3/4` demos) fail identically on a clean tree: a broken `demo/ionic/eslint.config.mjs`.
- **Not verified:** behavior in a real browser.

## Session Status — 2026-06-29

### 4.5.0 — Feature A implemented (fluid as collision mode)

**Fluid-as-collision-mode runtime shipped** inside `@tsparticles/interaction-particles-collisions`, no new package/interactor:

- `CollisionMode.fluid`, `ICollisionsFluid` / `CollisionsFluid` (radius 30, stiffness 0.5, nearStiffness 0.5, restDensity 3, maxForce 2.5, maxNeighbors 64), wired in `Collisions.load()`
- `src/Fluid.ts`: `FluidSolver` DDR neighborhood solver (q²/q³ density, focal-only pair displacement, `maxForce` clamp, `maxNeighbors` cap), soft wall spring + hard boundary clamp, contact damping, wall velocity cancellation
- `Collider`: `reset()` snapshots the position for fluid particles, `interact()` branches on the mode (classic path untouched), `maxDistance` tracks the fluid radius
- `CollisionParticle.fluid` lazy runtime state, `ResolveCollision` explicit fluid no-op
- Docs: `markdown/Options/Particles/Collisions.md` (mode list, `collisions.fluid` table, mutual exclusivity, migration from the old `particles.fluid` draft)
- Tests: 8 new tests in `utils/tests/src/tests/Collisions.ts` (defaults, partial load, repulsion, bounds, pre-advection snapshot, classic-mode isolation, neighbor cap, disabled collisions)
- Validation: collisions build green, tests package 301/301 green, `@tsparticles/all` + `@tsparticles/slim` bundles green

### 4.5.0 — In progress (Feature B implemented)

**MCP `generate_code` tool — implemented.** Deterministic codegen for `@tsparticles/mcp-server`:

- `src/tools/generateCode.ts` (keyword extraction, priority-ordered bundle matching, template+override options, 5-framework codegen, HTML + install command)
- Types/validation added (`src/types.ts`, `src/validation.ts`); tool registered in `src/index.ts`
- 44 new tests in `src/tools/generateCode.test.ts` — full mcp-server suite green (146 tests, 8 files); build passes
- README tools table updated (`generate_code` + `diagnose_issues`)
- Checklists and Feature B phases recorded as completed

Remaining for 4.5.0: nothing pending for Feature A (fluid-as-collision-mode). All 4.5.0 features are
now shipped — see the 2026-11-03 session above for the final re-check.

### 4.3.0 — Released ✅

All 6 features implemented and gate checks passed:

- A: GIF Shape — new `@tsparticles/shape-gif` package
- B: Background Canvas — layered background pipeline
- C: Background Mask Dynamic — `cover.element` + `cover.draw`
- D: Draw Layer System — 8 named layers replacing 11 arrays
- E: Particle Modifier System — generic `IParticleModifier` API
- F: HDR Precision — floating-point RGB pipeline

Build: 461 projects ✅ | Tests: 152/152 ✅ | No blocking issues.

### 4.4.0 — HDR Color Fix & Rendering Modes ✅

4.4.0 scope re-assigned: HDR color fidelity fixes (tone mapping, linear-space mixing, `peakNits`, `hdrMode` presets) + code review fixes.

**Status: implemented.** Engine HDR pipeline (ACES tone mapping, linear-space `colorMix`, `HdrMode` presets, display listeners) fully threaded through all consumer packages. Code review fixes verified applied, including the remaining `ribbons.lazy.ts` fallback bug. Full suite green (168/168 tests). Remaining verification step re-run clean.

Fluid-in-collisions work moved to 4.5.0.

**v5 fluid plan drafted** (fluid as collision mode). Key changes from v3:

- Velocity reconstruction added (critical fix)
- Correct `q` factor in DDR displacement formula
- Explicit boundary handling (soft spring + hard clamp) instead of outModes
- Per-particle `prevPos` state for velocity reconstruction
- Confirmed ParticlesInteractorBase is the correct integration point with these fixes

**MCP `generate_code` tool** drafted for 4.5.0: deterministic codegen for `@tsparticles/mcp-server`, specialized-bundle-first selection.

### Outcome

**S1 (Vue 3 wrapper) completed**: wrapper reactivity implemented (`id`/`options`/`url` → destroy+reload, `theme` → safe `loadTheme`), demo aligned with reactive config switching, README fully documented.

**S2 (Vue 2 wrapper) completed**: wrapper reactivity + `tsParticles.init()` fix in event-bus + `theme` prop + fixed `particlesLoaded` type + removed stale `IParticlesProps` export.

**S3 (Angular wrapper) completed**: added `OnChanges` for `id`/`options`/`url`/`theme` reactivity, `theme` `@Input()`, fixed `particlesLoaded` type to `Container | undefined`, added `tsParticles.init()` in service, demo has config switch button, README fully documented with API table and theme caveat.

**S4 (Solid wrapper) completed**: wrapper reactivity with `createEffect`/`on` tracking `id`/`options`/`url`; `theme` prop added; `particlesLoaded` callback signature fixed to `(container?: Container) => void`; demo aligned removing conditional mount.

**S5 (Qwik wrapper) completed**: wrapper reactivity implemented with `useVisibleTask$` + `track()` for prop changes; `theme` prop added; demo aligned (conditional removed, `initParticlesEngine` moved to module level); README fully documented with theme caveat.

**S6 (Astro wrapper) completed**: wrapper rewritten from constructor-only to `connectedCallback` + `attributeChangedCallback` + `disconnectedCallback` pattern with `observedAttributes` (`data-id`, `data-options`, `data-url`, `data-theme`). Race-condition guard via `#loadId` counter. `theme` prop added with safe `loadTheme` call. Demo has interactive "Switch Config" button demonstrating attribute-driven reactivity. README updated with `theme` prop, reactivity contract, and optional theme plugin caveat. Build passes.

**S11 (React docs) completed**: README props table updated with `particlesLoaded`, demo/template alignment verified.

**S12 (Preact wrapper) completed**: wrapper reactivity (`theme` prop, `loadTheme` in `loadParticles` + selective `componentDidUpdate` without refresh for theme-only changes), `container` ref type fixed to `Container | undefined`, `particlesLoaded` callback fixed with optional container param, demo keeps original constructor init + conditional render (module-level init + unconditional render causes Preact page freeze — Preact-specific limitation), README updated with `theme` prop and plugin caveat. Build passes.

### Key Findings (S22)

- `Container` type in `@tsparticles/engine` does not declare `loadTheme()` — it is injected at runtime by optional `@tsparticles/plugin-themes`. Any
  theme-prop implementation must use a type cast (`as unknown as { loadTheme?: ... }`) or bracket access.
- `tsParticles.load()` returns `Container | undefined`. All `particlesLoaded` callbacks and
  container-access code must guard against undefined.
- Six wrappers need modification: Vue 3 (Composition API), Vue 2 (class component + decorators), Angular (OnChanges), Solid (createEffect), Qwik (useVisibleTask$), Astro (custom element).
- Vue 3 guide (`websites/website/docs/guides/vue3.md`) references `:init`, `@particles-init`, and
  `particlesInit` that do not exist on the wrapper component — these must be removed from both the English source and all 9 translations.
- `export type IParticlesProps = ISourceOptions` in `vue-particles.vue` (Vue 2) causes `TS2528: multiple default exports` in the SFC compiler context — must be removed or inlined.
- **S22 findings**: All 16 wrapper guide pages lack `theme` prop documentation (even though all wrappers now support it). Reactivity contracts (id/options/url → destroy+reload) are missing from 15/16 guides. Cleanup/teardown docs missing from 15/16 guides. Nuxt guide still documents stale `@particles-init`/`@particles-destroy` events removed in S18. Solid and Svelte guides describe reactivity incorrectly (as "targeted updates" or "without recreating the instance" vs actual destroy+reload).

### Next Steps

1. ✅ **S1 Vue 3** — done
2. ✅ **S2 Vue 2** — done
3. ✅ **S3 Angular** — done
4. ✅ **S4 Solid** — done
5. ✅ **S5 Qwik** — done
6. ✅ **S6 Astro** — done: wrapper rewritten from constructor-only to `connectedCallback` + `attributeChangedCallback` + `disconnectedCallback` + `observedAttributes`, `theme` prop added, demo has reactive config switch button, README has reactivity docs.
7. ✅ **S7 Inferno** — done (callback invocation + theme support)
8. ✅ **S8 Lit** — done (theme property + particlesLoaded event + selective reactivity in update())
9. ✅ **S9 Riot** — done (onUpdated/onUnmounted lifecycle hooks, theme support, loadId race guard, demo with config switch, README aligned)
10. ✅ **S10 WebComponents** — done (`data-id`/`data-theme` added to `observedAttributes`, `attributeChangedCallback` handles both, `id` setter syncs to `data-id`, deprecated `particlesInit` event removed, README documented with observed attributes table and theme caveat, build passes)
11. ✅ **S11 React docs** — README props table updated with `particlesLoaded`, demo/template check passed
12. ✅ **S12 Preact** — wrapper (theme prop, loadTheme, selective componentDidUpdate without refresh for theme-only changes), demo (constructor init + conditional render — the original pattern was retained because module-level initialization froze Preact), README aligned
13. ✅ **S13 Svelte** — wrapper reactivity (`theme` prop, `afterUpdate` → reactive `$:` statements with `loadKey`, `loadTheme` on initial load + theme change), demo alignment (`particlesInit` → `initParticlesEngine`, Svelte 5 `mount()` API, SSR-safe dynamic imports), README with props table, reactive behavior docs, theme plugin docs. Svelte demo + SvelteKit demo both verified working by the user.
14. ✅ **S14 Stencil** — done (`theme` prop + `particlesLoaded` event + `@Watch("theme")` + demo with theme toggle + `@tsparticles/plugin-themes` installed, build passes).
15. ✅ **S15 Ember** — done (`theme` prop, `#container` instance tracking for memory leak fix, `registerDestructor` called once, `particlesLoaded` type fixed to `(container?: Container)`, template `particles.hbs` updated with `theme=@theme`, demo with config switch + theme toggle buttons, README with args table and optional plugin caveat, build passes).
16. ✅ **S16 jQuery** — done (`setTheme` method added to `ParticlesResult` type, `WeakMap<Element, Container>` for per-element container tracking, `load`/`ajax` track containers, `setTheme` method with safe `loadTheme?.()` optional plugin invocation, README updated with `setTheme` docs and theme plugin caveat, build passes).
17. ✅ **S17 Angular-fireworks** — done: `OnChanges` implemented for `id`/`options` reactivity, `#destroyed` guard prevents post-destroy execution, `#startFireworks` stops previous instance before creating new one, `ngOnDestroy` calls `.destroy()` (not `.stop()`), demo N/A (no standalone demo dir), templates N/A (no templates dir), README updated with `OnChanges` behavior docs, build passes.
18. ✅ **S18 EN docs (vue3.md)** — done: removed stale `:init`, `@particles-init`, `particlesInit` from EN guide (all examples + API table); removed Component-Level Init section; fixed `useParticles` → `useParticlesProvider`; added `theme` prop to API table with optional plugin caveat; added `theme` prop docs in Theme Switching section. File reduced from 622→575 lines.
19. ✅ **S19 9 translations (vue3.md)** — done: mirrored all S18 changes across zh, ja, hi, ru, pt, fr, de, es, it. Each file reduced from 622→~576 lines. Zero stale patterns remaining across all 10 files.
20. ✅ **S20 Validation** — done: all 13 affected wrappers build successfully, stale-pattern grep on Vue3 guides (EN + 9 translations) returns zero hits for `:init`/`@particles-init`/`particlesInit`; README consistency scan completed. All contract points documented in all 16 wrapper READMEs.
21. ✅ **S21 Final handoff** — done: README documentation gaps fixed for preact (reload contract + cleanup), stencil (safe no-op + reactivity + cleanup), ember (cleanup), jquery (reload + loaded callback + cleanup), angular-fireworks (lifecycle). All builds pass.
22. ✅ **S22 EN wrapper guide audit** — completed: all 16 EN wrapper guide pages audited against wrapper READMEs. Gap matrix produced: all 16 guides have missing `theme` prop docs, missing reactivity contracts, missing cleanup docs, or stale patterns (see S22 gap matrix in conversation). Vue3.md already clean from S18. Nuxt guide has stale `@particles-init`/`@particles-destroy` events. Solid and Svelte guides have misleading reactivity descriptions.
23. ✅ **S23 Translation alignment** — completed: all 16 EN wrapper guides fixed with `theme` prop docs, reactivity contract, cleanup docs, fixed `Container | undefined` callback types, stale Nuxt events removed, misleading Solid/Svelte descriptions corrected. Changes mirrored to all 9 translation directories (zh, ja, hi, ru, pt, fr, de, es, it) — 144 translation files updated.

## Session status — 2026-11-17 — E0–E3 accepted; E4 next

- E1 is accepted (see `handovers/V5-E1-ENGINE.md`); the M6 p95 exceedance remains an E10 budget issue. E0 and E2 are accepted.
- E3 accepted: recorded ARCH-01–04 and C0 decisions, moved Core files into five logical domains, added selective type barrels and import rules, synchronized the 159-file audit inventory, and documented option/registry mutation matrices.
- Public consumer type/runtime checks pass, including root and lazy ESM/CJS imports, browser-condition import, and rejection of consumer deep imports. Engine CI passed (20 tasks); representative consumer builds passed (158 Nx tasks, cached); the full tests passed (52 files, 695 tests); tests-package lint and format checks passed.
- The full workspace `build:ci` command was stopped after six minutes without further output. Representative Nx consumer builds and the engine CI build passed; Nx Cloud remote cache was unavailable (`ENOTFOUND`). No commit or publication.
