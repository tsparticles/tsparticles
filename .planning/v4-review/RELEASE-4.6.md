# v4.6.0 — final v4 review closure

**Objective:** finish the issues already found in the v4 review, verify them against built packages and real browser consumers, and leave a recorded disposition for every item before v5 runtime work starts.

**Baseline:** branch `v4`, release `4.5.4`, dated 2026-11-11. The review's reproduction baseline remains commit `5d59d1dbbd` (`4.5.3`); use the current `v4` head for implementation and record the exact starting commit for each change.

## Scope and status

| Area                | Findings   | Current evidence                                                                                                                                                                                                                                  | 4.6.0 exit condition                                                                                                                     |
| ------------------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| Core correctness    | V4-B01–B09 | The shared suite passed 654 tests. Chrome also covered updater lifetimes, mixed-radius collisions, and repeated density updates at DPR 1 and 2.                                                                                                   | Repeat smoke checks on final release artifacts.                                                                                          |
| Wrappers            | V4-W01–W02 | jQuery covers anonymous hosts. React, Angular, Solid, Lit, Preact, Vue 2 and Qwik cover load rejection. Chrome covered lifecycle cases in jQuery, Lit, Preact, Vue 2, Vue 3, React, Solid, Angular, Svelte and Qwik.                              | Repeat lifecycle checks on release artifacts and finish remaining SSR and hydration coverage.                                            |
| CLI                 | V4-C01–C04 | The compiled CLI passed external-directory scaffolding, JSONC compilation and CI packaging. Verified ESM template lookup, forwarding the CI flag to the packaging subcommand, and CommonJS packaging.                                             | Confirm the installed CLI checks and distribution build for the final release artifacts.                                                 |
| MCP                 | V4-M01–M03 | All 263 tests passed. The five generated framework examples compiled and animated in both language variants with npm-installed dependencies.                                                                                                      | Repeat the checks with final release artifacts.                                                                                          |
| Bundle composition  | V4-S01–S03 | Qwik uses the consumer’s engine in both module formats. Browser ESM graphs cover a helper, circle, and Basic through All. Chrome traced first-scene downloads and confirmed that All fetches GIF and pathseg for a circle-only scene.             | Publish consumer graphs and compressed sizes for S01–S03; change composition only for demonstrated compatible savings.                   |
| Runtime performance | V4-P01–P03 | P01 now bounds wide scans on sparse grids without a predicate. Node and Chrome benchmarks cover sparse and dense cases. P02 removes temporary arrays from group counts. P03 compared two renderer variants in Chrome and retained live iteration. | Benchmark representative dense/sparse scenes and preserve ordering, hooks, and output; implement only improvements above measured noise. |

“Verify/fix” is deliberate: the older review records the original defect, while 4.5.4 has already addressed a subset. Confirm the current implementation and public artifact before marking an item complete. Do not count a source-only test as proof of package or browser behavior.

## Validation so far

- Nx build passed for engine, Basic, Slim, Full (`tsparticles` project), and All, including 151 dependent project tasks. Nx Cloud was unreachable; local builds succeeded.
- Focused wrapper and CLI tests passed after updating the jQuery expectation to the host-element API and adding anonymous host and load-rejection regressions.
- Workspace test run: 83 of 88 project targets passed. That run hit five environment/setup failures. The MCP target later passed with loopback enabled. The remaining failures were an Ember demo loopback bind, a missing Karma builder in the Angular and Ionic demos, and an unresolved `@riotjs/register` export in the Riot demo. The shared `@tsparticles/tests` target passed all 647 tests across 47 files.

### External CLI and MCP checks

- Baseline for these checks was `f8a119561f`. The CLI executable ran from a temporary consumer directory. App creation honored an absolute path containing a space, and shape creation honored a relative path. Repeating creation in a nonempty directory failed as expected. The app used `--skip-install`, and the shape fixture stubbed npm install and build.
- The TypeScript command emitted browser, CJS, ESM and declaration outputs from JSONC configurations with relative inheritance. The packaging command preserved the source hashes, binary asset and literal README token, resolved the distribution dependency version and produced identical outputs on the second run.
- The focused Nx checks passed for create-utils (31), build-tsc (3), build-distfiles (4), and the build CLI (4). The two changed command packages passed their CI builds. The create-utils tarball contained its template and copied it successfully after extraction, using the local lookpath dependency.
- The MCP HTTP cases passed in a run with loopback enabled. For the generated vanilla TypeScript example, each direct import was present in the install list. The consumer compiled against copied distribution files for the listed packages and their dependencies, and the generated scene started in Chrome. Later registry checks below supersede this copied-artifact check for vanilla and framework examples.

### Lit and Preact lifecycle checks

- The Lit and Preact Nx test targets passed 6 tests each, and both packages built successfully. Lit tests covered recovery after a rejected load and disposal of a result from an earlier connection. Preact tests covered disposal after unmount and separate reporting for load and callback failures.
- A Chrome 157 consumer bundled the built Lit and Preact entry points with Basic. Lit created a distinct container after reconnection and disposed of both containers on disconnect. Preact loaded four particles and destroyed its container on unmount. This check used local built artifacts.

### Vue 2 and Qwik lifecycle checks

- A fresh Nx run passed all six Vue 2 tests and five Qwik tests and rebuilt both packages. Vue 2 mounted from built artifacts in Chrome, loaded four particles, replaced the scene on an ID change and disposed of both containers. Qwik task cancellation was exercised with mocked lifecycle hooks.
- The initial Qwik engine duplication experiment exposed V4-C04. After the CommonJS fix, Qwik reused the consumer’s engine in both ESM and CommonJS and registered Basic on that instance.

### Real browser runtime check

- Chrome 157.0.8103.50 loaded the compiled Basic bundle from localhost and used its public loader. The page mounted a five-particle scene and removed the canvas on destruction. Dedicated workers drew changing pixels for four particles and destroyed their containers on both a worker-created OffscreenCanvas and one transferred from the page.

### CommonJS packaging checks

- C04 now builds CommonJS from packages declared as ESM. The CLI regression verifies NodeNext conditional dependency resolution, a relative dynamic import, and source manifest preservation. All four build-tsc tests passed.
- Engine, Basic, Slim, Full and All passed the CI builds, covering 156 distinct tasks. A consumer outside the workspace used copies of the built packages to start and destroy scenes with Basic, Slim, Full and All through the root and `/lazy` exports with both `require()` and `import()`. The Node fixture used a canvas shim, jsdom for the bundles that need DOM globals, and a video capability stub for All. The shared suite passed all 647 tests, and Chrome passed the Basic page and worker checks again.
- Qwik now uses the existing engine peer in both formats. The built wrapper files total 3,879 bytes for ESM and 4,044 bytes for CommonJS. The engine remains a separate dependency.

### Spatial query checks

- The engine skips empty coordinates for wide queries without a predicate. Tests cover output and insertion order, nested queries, mutations during predicate traversal and unsafe bounds.
- In Chrome, the controlled sparse scene with fixed grid sizing went from 10.5 ms to 0.5 ms median per animation callback. The adaptive grid scene stayed near 0.3 ms. The dense cases kept p95 near the baseline. See the [measurement details](PERFORMANCE-AND-BUNDLES.md).
- The broad Nx run completed 455 tasks. Electron, Next.js and Angular demo builds encountered a pnpm cache permission error, an unavailable Google Fonts fetch and an esbuild deadlock respectively. After fixing lint errors in the new fixture, the shared test build passed lint, formatting and all 650 tests across 48 files.

### Group limits and generated framework examples

- P02 counts current group membership without creating a filtered array. The Chrome median fell from 18.4 ms to 3.6 ms for 1,000 blocked additions and from 7.9 ms to 4.6 ms for 200 group replacements. The density timings stayed near baseline. Final particle counts and group ID order matched. See the [measurement details](PERFORMANCE-AND-BUNDLES.md).
- The downstream CI build passed all 456 tasks with the three previously blocked demo builds excluded. The shared test build passed all 651 tests, including a regression for a particle changing group at runtime.
- The generated React, Vue 3, Svelte and Angular TypeScript examples compiled in external fixtures and started in Chrome. The fixtures used copied tsParticles distribution files and local framework dependencies. Angular strict template compilation exposed the missing `NgxParticlesModule` import, now included in both generated variants. The Angular example uses standalone APIs.

### Plugin registration and renderer checks

- Queue plugin loaders before initializing the engine or loading the first scene. Registered loaders compose during initialization so that bundle dependencies can register. After initialization, `register` rejects and the manager's `add*` methods throw `TSP-1003`. `addPlugin` also rejects direct calls outside the loader phase. Engine and container plugin lists are read-only.
- Chrome 157 verified the production CDN Basic bundle. A custom plugin registered before load was installed. Late registration and direct additions reported `TSP-1003`. Attempts to push into either plugin list threw `TypeError`. The page scene and both OffscreenCanvas workers passed their startup and teardown checks.
- All 16 combinations of Basic, Slim, Full, and All, root and `/lazy` entries, and ESM and CommonJS initialized from built artifacts and rejected subsequent registration in Node with jsdom.
- The downstream CI build passed all 456 tasks with Electron, Next.js and Angular demo builds excluded. The shared suite passed all 653 tests across 48 files, including registration and immutable-list regressions. Workspace retries passed fractal noise and Angular Fireworks after their dependencies rebuilt. Angular and Ionic demo tests still need the Karma builder, Riot cannot resolve its register export, and Ember’s Chrome runner timed out after the demo built.
- Transform hook caching and indexed iteration produced matching rendering in Chrome and showed no consistent p95 gain. The [measurements](PERFORMANCE-AND-BUNDLES.md) include the browser ESM bundle graph and optional feature attribution.

### Browser lifecycle and jQuery checks

- The V4-B01 regression reproduced a loader starting a second initialization before the first call published its promise. The shared promise is now installed before loaders run. The Chrome 157 Basic consumer waited for one loader across two first loads, including a nested call to `init()`, and both containers received the same plugins.
- The same consumer cancelled startup during `preInit`, saw no late start event, and released its generated canvas. Repeated `play()` calls left one frame scheduled. Pause and destroy cancelled it. A caller-owned DOM canvas remained attached after destroy.
- The built jQuery plugin used one engine with two anonymous hosts and one explicit host. A real localhost JSON request supplied options, and an older held response for the same anonymous host settled without replacing the newer scene. The other host kept its original scene.

### Installed CLI and remote SVG checks

- Two CLI binaries installed into a clean project from local package tarballs. Third-party dependencies resolved from npm. The binaries passed path handling, nonempty-directory rejection, JSONC compilation, and repeatable `distfiles --ci` packaging from an external directory.
- The generated vanilla app installed from the local tarballs and npm, compiled with TypeScript and Vite, and animated in Chrome. A clean shape build under pnpm exposed a missing Prettier plugin and lint errors for all-type inline imports. The feature generator now declares the plugin and emits top-level type imports for those cases. The updated installed CLI generated a fresh shape, which passed its isolated CI build and registered from both ESM and CommonJS. Installation and build ran explicitly in the fixture.
- The compiled All bundle continued updating while an SVG request was pending and after a separate HTTP 404. When the held request completed, the surviving particle followed the path without a refresh.
- The engine change passed 456 downstream build tasks with the three previously blocked demo builds excluded. The shared engine suite passed 654 tests across 48 files. The workspace test run passed all 84 selected projects, including 263 MCP tests. The Angular, Ionic, Riot, and Ember demo tests were excluded for the recorded environment and tooling failures.

### Browser runtime and registry consumers

- The All bundle passed the updater lifecycle, mixed-radius collision, and repeated density checks in Chrome 157 at DPR 1 and 2. The [runtime review](CORRECTNESS.md) records the cases and why the two initializer calls at startup were retained.
- Vanilla, React, Vue 3, Svelte, and Angular examples from MCP compiled and animated a canvas in Chrome in both JavaScript and TypeScript. The install command supplied tsParticles 4.5.4 packages from npm. Each fixture installed its framework peers separately.

- React and Solid now isolate canvases when the component ID changes during a pending load. Chrome verified recovery, reverse completion order, and rejection after unmount from both compiled packages. The React, Solid, and Next.js build ran 23 tasks successfully. The workspace suite passed all 84 selected test targets with the four previously blocked demo tests excluded.

- Preact, Vue 2, Vue 3, Lit, Angular, Svelte and Qwik also reused a pending canvas when the scene ID changed. Their built consumers now keep separate canvases. All seven passed startup rejection and recovery, reverse completion order, and rejection after unmount in Chrome.

- The Angular and Next.js demo builds passed a separate Nx run covering 93 tasks. The Angular retry limited its worker count, and the Next.js build fetched its fonts. The Electron build passed, and a separate packaging command wrote a fresh macOS arm64 app into a temporary directory. Chrome smoke tests started and animated the built Angular, Ember and Riot demos, and the Next.js production page hydrated and animated. That workspace run passed 84 selected targets, with four demo test targets excluded. The subsequent full run below includes all four.

### Full demo tests and SSR checks

- The full Nx test run passed all 88 targets, including 654 shared tests and 263 MCP tests. Angular and Ionic now run their existing Jasmine specs with the installed Angular Karma builder in Chrome Headless and without the legacy Zone test bootstrap. The run passed three Angular and six Ionic specs. Karma still logs a Jasmine module-loading deprecation.
- Riot's three specs run with Node's ESM loader and the installed Riot register hook. Ember now has a Testem page and a QUnit acceptance test that visits the demo and waits for a nonzero particle canvas. All four demo targets are part of the full test run.
- A consumer using the compiled Vue 3 package reused the server-rendered host on hydration. Changing the ID mounted a new canvas and destroyed the old scene, and unmount released the new scene. The Qwik demo built its client and server outputs, resumed from SSR markup, and animated its canvas in Chrome.

### Distance calculations

- The distance review for V4-P04 and V4-P05 moved runtime callers off `getDistances` and deferred square roots until actual lengths are needed. The [Chrome microbenchmark](PERFORMANCE-AND-BUNDLES.md#v4-p05--compare-squared-distances-without-computing-lengths) measured a median of 4.9 ms after the click repulse change, down from 20.8 ms.
- Chrome 157 verified wrapped link opacity and diagonal click repulse velocity at the cutoff using the rebuilt All bundle.
- The downstream Nx build passed 454 tasks. The shared suite passed all 660 tests across 48 files. In the full workspace run, 87 of 88 targets passed, and the CLI TypeScript build tests passed on an isolated retry after a timeout during the concurrent build.

## Finding disposition at the current head

| Findings   | Disposition                   | Evidence or remaining condition                                                                                                                                                                                          |
| ---------- | ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| V4-B01–B09 | Fixed                         | 4.5.4 regressions plus current-head browser checks recorded in [correctness](CORRECTNESS.md).                                                                                                                            |
| V4-W01–W02 | Fixed                         | Wrapper regressions, built-consumer lifecycle checks, and Vue 3/Qwik SSR checks are recorded in [integration review](WRAPPER-CLI-MCP.md).                                                                                |
| V4-C01–C04 | Fixed                         | CLI regressions and external installed-package checks are recorded in [integration review](WRAPPER-CLI-MCP.md).                                                                                                          |
| V4-M01–M03 | Fixed                         | MCP tests and generated examples installed from the registry, compiled, and animated in Chrome.                                                                                                                          |
| V4-S01     | Open (measurement incomplete) | CDN engine-plus-feature page measurements and a Rollup baseline remain incomplete; record them in [bundle measurements](PERFORMANCE-AND-BUNDLES.md).                                                                     |
| V4-S02     | Fixed (no composition change) | Qwik duplication was fixed; removing Slim's extra Paint registration did not meet the size or startup gate, so both entries retain it.                                                                                   |
| V4-S03     | Deferred                      | No candidate has passed cold first-use and standalone All measurements. Moving feature loading could change first-activation behavior, so preserve current availability and loading until a measured candidate is ready. |
| V4-P01–P02 | Fixed                         | Sparse-query and group-count changes passed parity checks and measured benchmarks. Batch compaction is deferred because callbacks observe each removal in sequence; changing that order risks plugin behavior.           |
| V4-P03     | Fixed (no renderer change)    | Candidates matched output but showed no consistent p95 gain, so live iteration remains.                                                                                                                                  |
| V4-P04–P05 | Fixed                         | Runtime callers now avoid redundant general-purpose distance work; the focused Chrome comparison is recorded in [performance review](PERFORMANCE-AND-BUNDLES.md).                                                        |

The source validation gate for PR preparation is complete. Package metadata still identifies the workspace as 4.5.4, so these checks validate current local build artifacts and do not claim a published 4.6.0 package. The release/publish gate remains separate: record CI results, then the maintainer can run `pnpm run version:minor` to start versioning and publishing after deciding the release is ready. Registry checks above used the then-current 4.5.4 packages; current local artifacts are covered by the checks below.

**Current-head build.** `NX_DAEMON=false NX_ISOLATE_PLUGINS=false pnpm nx run @tsparticles/all:build --skipNxCache --parallel=6` passed locally, rebuilding All and all 155 dependent tasks from source. Nx Cloud was unavailable; the local build completed in 2m32s. This confirms the fresh All package graph, but does not replace the release-tarball consumer gate.

The 13 changed package targets for Angular, jQuery, Lit, Preact, Qwik, React, Solid, Svelte, Vue 2, Vue 3, the CLI TypeScript builder, CLI create utilities, and MCP server also built successfully without cache in 12.9s. These direct package builds used the freshly built engine graph above; Nx dependencies were excluded from this second invocation.

The CLI build and create entrypoints and their dependencies passed a fresh Nx build of 91 tasks. A consumer smoke from a temporary external working directory passed app and feature scaffolding, JSONC compilation to browser/CJS/ESM/types, source-manifest preservation, binary and README preservation, version substitution, and repeatable `distfiles --ci`. The fixture invoked the freshly built workspace CLI through symlinks, so this verifies external working-directory behavior but is not an isolated tarball installation.

**Current-head workspace tests.** The full Nx run passed all 88 targets, including 660 shared tests and 263 MCP tests. The first sandboxed run passed 84 targets; MCP, Ember, Angular, and Ionic then passed on retry with localhost listener access, and the full matrix passed in a single follow-up run with that access. Angular emitted the known Jasmine ESM deprecation warning; all six specs passed.

**Current-head external bundle consumer.** A temporary consumer outside the workspace loaded and destroyed a four-particle scene using the freshly built All package in all four combinations: ESM and CommonJS, root and `/lazy` exports. The consumer resolved the workspace's built dependencies through temporary package symlinks and used jsdom with a canvas shim. It verifies the built entry points and scene lifecycle; it is not an isolated registry install.

**Current-head wrapper consumers.** Chrome consumers bundled the current local build outputs for React, Solid, Preact, Vue 2, Vue 3, Lit, Svelte, Angular, and Qwik. Each passed startup rejection, recovery, reverse completion order with distinct canvases, and rejection after unmount without a late callback, unhandled rejection, or leftover canvas. The Solid consumer used its `solid` export condition and Solid JSX compiler; the Qwik consumer used the Qwik optimizer. The current built jQuery plugin also passed the anonymous-host and stale-request browser checks recorded above.

**Current-head MCP consumers.** A consumer launched the freshly built MCP stdio entry point from an external working directory, listed all five tools, generated vanilla TypeScript, and suggested the heart-shape loader for a shape nested in a particle group. That generated vanilla TypeScript compiled against copied local package artifacts. The generated Angular TypeScript example also compiled with strict templates against copied local package artifacts.

## Execution order

1. **Inventory — complete.** Current-head code, regression coverage, and disposition for every V4-B/W/C/M/S/P finding are summarized above and detailed in the review documents.
2. **Integration defects — implementation complete.** W01–W02, C01–C04, and M01–M03 have source, tests, package checks, and consumer evidence recorded above. Repeat the required checks against the 4.6.0 artifacts at the release gate.
3. **Runtime and browser checks — implementation complete.** Core regressions, worker OffscreenCanvas, lifecycle cancellation, cleanup, and representative browser scenes have recorded evidence. Repeat artifact-dependent checks at the release gate.
4. **Distribution and performance — S01 measurement incomplete.** S02–S03 and P01–P05 have measurements or a documented no-change/deferred outcome, but S01 remains open until the Rollup baseline and CDN engine-plus-feature page measurements are recorded. Do not change bundle composition without a candidate that passes its consumer and first-use gates.
5. **PR preparation gate — complete.** The current-head full workspace tests, affected package builds, format checks, All and wrapper browser consumers, CLI smoke, and MCP consumers passed. CI is the remaining shared review step. **Release/publish gate — pending maintainer action.** Do not run `pnpm run version:minor` during PR preparation; the maintainer will use it to start the version and publish flow after approving the release.

## Release acceptance

- Every V4-B/W/C/M/S/P item has evidence and a final status. `Deferred` requires a reason, the compatibility risk, and a link to the v5 handover when the concern belongs there.
- No v4 public API, export, global, CDN artifact name, registration order, or successful-path behavior changes without a compatibility-preserving test. Any optional API addition must be opt-in and have a measured consumer benefit.
- Regression cases pass from built artifacts; browser-visible changes have real-browser evidence. Record unresolved environment-only checks rather than treating them as passes.
- All affected workspace projects and clean external consumers pass their required validation. No source files are rewritten by CI-style packaging builds.
- Update the v4 review status, this plan, [ROADMAP](../ROADMAP.md), and release notes with the result. Then resume the v5 sequence in [the v5 handovers](../handovers/README.md).

## Tracked source plans

- [Review index and release contract](README.md)
- [Runtime correctness](CORRECTNESS.md)
- [Wrappers, CLI, and MCP](WRAPPER-CLI-MCP.md)
- [Performance and bundle size](PERFORMANCE-AND-BUNDLES.md)
