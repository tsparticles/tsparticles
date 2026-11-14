# V5 bundle and runtime report

## E0 checkpoint — 2026-11-13

**Status: E0 complete; E1 retirement verified, factory migration pending.** Baseline measurements precede retirement. No singleton removal, performance gain or complete v5 compatibility is claimed. E11 is excluded.

Baseline: `1944fa0f5c202b8af82841b5de9b2315f758a258`, branch `v5`, initially clean. Package version 4.6.0. The preparation patch only corrects import ordering and a no-op logger mock in an existing BackgroundMask test; see `evidence/e0/baseline.patch`. No commit or publication.

Toolchain: Node 26.13.0, pnpm 12.20.0, Rollup 4.67.4, `@rollup/plugin-terser` 1.0.2 with default minifier options, gzip level 9 and Brotli quality 11. macOS 27.2 / Darwin arm64. Browser: Chrome 157.0.8103.52, headless, temporary profile, 800×600 CSS pixels, DPR 1. Dependency versions are captured in `evidence/e0/toolchain.json`; browser targeting data is in `browser-policy.json`.

Reproduction commands and limitations: [evidence README](evidence/README.md). Source runtime was unchanged for all measurements. Raw/minified graphs, module IDs and static/dynamic edges are stored in `evidence/e0/bundle-sizes.json`. Totals below include every emitted JavaScript chunk; compression is per response, then summed. Requests are graph-derived for consumer bundles, not network traces.

## Fresh build and test verification

| Check                                         | Outcome                                                                               | Evidence                                 |
| --------------------------------------------- | ------------------------------------------------------------------------------------- | ---------------------------------------- |
| Fresh engine build, cache disabled            | Passed, 20 tasks                                                                      | `engine-build.log`                       |
| Fresh basic/slim/full/all dependency build    | First attempt blocked by existing BackgroundMask lint; second exposed empty mock lint | `bundles-build.log`, `bundles-retry.log` |
| Corrected BackgroundMask build                | Passed, dependency outputs retained from fresh run                                    | `background-mask-build.log`              |
| Fresh all build after dependency correction   | Passed, cache disabled                                                                | `all-build.log`                          |
| Main package suite, no concurrent clean build | 49 files / 668 tests passed                                                           | `tests-final.log`                        |
| BackgroundMask suite                          | 16 tests passed                                                                       | `background-mask-test.log`               |
| Earlier main test run                         | Invalid baseline: clean build removed output during tests; 3 import failures          | `tests-initial-detail.log`               |
| Earlier direct test retry                     | Rejected by concurrent coverage lock                                                  | `tests-direct.log`                       |

The Nx build dependency traversal invoked some non-CI formatting scripts despite the requested CI configuration. The tracked diff was checked: only the two explicit test corrections changed. E10 still requires the complete workspace CI gate; these scoped baseline builds do not replace it.

## Consumer payloads and budgets

Budgets are engineering targets fixed from these measurements before size refactors: minimal scene and standalone slim must reduce gzip and Brotli by at least 5%; pure helper may not grow; other measured payloads may grow at most 2% with a documented reason. Factory acquisition remains unavailable and must be measured separately in E1; singleton acquisition is not a factory baseline. Missing scenarios have no invented byte budgets.

| Condition / scenario     | Raw graph B | Min graph B | Gzip B | Brotli B | Chunks | Gzip ceiling B | Brotli ceiling B |
| ------------------------ | ----------: | ----------: | -----: | -------: | -----: | -------------: | ---------------: |
| import / helper          |         644 |         314 |    189 |      166 |      1 |            189 |              166 |
| import / singleton       |      172550 |       68291 |  22665 |    20052 |      3 |          23118 |            20453 |
| import / initialization  |      172601 |       68308 |  22665 |    20072 |      3 |          23118 |            20473 |
| import / minimal         |      221359 |       86996 |  28451 |    25355 |      4 |          27028 |            24087 |
| import / singleton-lazy  |      172598 |       68327 |  22680 |    20069 |      3 |          23133 |            20470 |
| browser / helper         |         644 |         314 |    189 |      166 |      1 |            189 |              166 |
| browser / singleton      |      172550 |       68286 |  22676 |    20083 |      3 |          23129 |            20484 |
| browser / initialization |      172601 |       68303 |  22672 |    20083 |      3 |          23125 |            20484 |
| browser / minimal        |      221359 |       86997 |  28467 |    25375 |      4 |          27043 |            24106 |
| browser / singleton-lazy |      172560 |       68296 |  22686 |    20095 |      3 |          23139 |            20496 |

`helper` re-exports clamp; `singleton` re-exports the acquired singleton; `initialization` calls init; `minimal` retains an async scene loader with exactly seven required loaders and 100 moving circle particles. The scene uses `paint.fill.color`, not the obsolete top-level particle color fixture. Seeded runtime uses the same paint structure. The full consumer source and options are saved with each graph.

| Standalone distribution                              |  Min B | Gzip B | Brotli B | Gzip ceiling B | Brotli ceiling B |
| ---------------------------------------------------- | -----: | -----: | -------: | -------------: | ---------------: |
| `engine/dist/tsparticles.engine.min.js`              |  78941 |  24671 |    21953 |          25164 |            22392 |
| `bundles/basic/dist/tsparticles.basic.bundle.min.js` | 100635 |  30268 |    26749 |          30873 |            27283 |
| `bundles/slim/dist/tsparticles.slim.bundle.min.js`   | 165941 |  47524 |    41231 |          45147 |            39169 |
| `bundles/full/dist/tsparticles.bundle.min.js`        | 210807 |  58954 |    50720 |          60133 |            51734 |
| `bundles/all/dist/tsparticles.all.bundle.min.js`     | 423465 | 115948 |    94544 |         118266 |            96434 |

Unminified counterparts and external-loader distributions are also recorded in the raw JSON. These standalone files are one script each; do not compare an external loader alone against a complete scene.

## Package and CDN evidence

- Root and `/lazy` resolve under import, require and browser conditions without DOM globals. The actual paths and global writes are recorded in `package-conditions.json`. Root ESM/CJS create the singleton without adding globals; ESM/CJS lazy add `tsParticles`; browser adds the singleton plus service globals. These are observed v4 behaviors to remove in E1/E2, not passing v5 purity checks.
- Classic engine-plus-features minimal scene: 9 scripts, 123376 raw bytes, 35441 gzip bytes, 31633 Brotli bytes. Cold and warm smoke tests both load 100 particles, render and leave zero containers. Nine warm responses came from browser cache. See `cdn-candidate.json` and `cdn-browser.json`.
- Representative Rollup reports contain 112 retained module identities across that closure and zero duplicated identities. This does not detect copied algorithm text; the identity scope and reports are in `cdn-modules.json`.
- Standard Rollup currently sets `includeLazy: false` in both branches of `createParticlesBuild.ts`. There is no freshly built classic lazy CDN entry to measure from the standard command. Package `/lazy` is measured separately. Do not fabricate a CDN lazy baseline or compare stale artifacts. The completion evidence below records the product disposition and installed CJS accounting.

## Runtime baseline

54 runs: M3–M8, N=100/500/1000, three repetitions, 30 warm-up ticks and 60 measured ticks at an explicit 60 Hz delta. Seed 123456789, LCG recurrence and draw counts saved in the harness. Update is instrumented separately; render excludes measured update and includes CPU submission only. No page errors. Every run leaves zero engine containers after destroy. RNG call counts match across all three repetitions of each scenario/count.

The table reports median across the three per-run medians, in milliseconds. Individual p95, min/max, init/teardown and RNG counts remain in `runtime.json`. Timing precision is coarse for small scenes; no improvement claim may be based on a zero/near-zero timing.

| Scenario |    N | Update median ms | Render excluding update median ms |
| -------- | ---: | ---------------: | --------------------------------: |
| M3       |  100 |            0.100 |                             0.200 |
| M3       |  500 |            0.600 |                             0.600 |
| M3       | 1000 |            1.300 |                             1.200 |
| M4       |  100 |            0.300 |                             0.200 |
| M4       |  500 |            3.200 |                             2.300 |
| M4       | 1000 |           12.700 |                             8.200 |
| M5       |  100 |            0.200 |                             0.100 |
| M5       |  500 |            4.200 |                             0.700 |
| M5       | 1000 |           16.200 |                             1.500 |
| M6       |  100 |            0.100 |                             0.100 |
| M6       |  500 |            0.600 |                             0.600 |
| M6       | 1000 |            1.200 |                             1.300 |
| M7       |  100 |            0.100 |                             0.200 |
| M7       |  500 |            0.700 |                             0.800 |
| M7       | 1000 |            1.500 |                             1.600 |
| M8       |  100 |            0.100 |                             0.100 |
| M8       |  500 |            0.700 |                             0.700 |
| M8       | 1000 |            1.300 |                             1.300 |

M3 is moving circles, M4 links/classic collisions, M5 fluid, M6 manual add/remove churn, M7 randomized depth, M8 background mask. The additional emitter/absorber, retention, HDR/layers/resize and color scenarios are recorded in the continuation evidence below. M9 cannot use a public factory on the baseline and has no invented result.

Chrome reports P3/float16 2D context attributes and OffscreenCanvas support; this is capability evidence, not proof of physical HDR output. `color-reference.png` was visually inspected after correcting the fixture: red/green/blue/yellow circles on a dark background. It is an initial SDR reference, not complete color/gamut/alpha/HDR coverage.

## E0 exit-gate checklist

- [x] Revision, initially clean diff, preparation patch and toolchain captured.
- [x] Fresh standard Rollup engine/basic/slim/full/all artifacts captured after lint repairs.
- [x] Pure helper, singleton, explicit init, minimal and package lazy browser/import graphs measured.
- [x] Basic/slim/full/all standalone size budgets recorded before any runtime refactor.
- [x] Classic engine-plus-feature closure exercised via local HTTP, cold/warm cache and module identity report.
- [x] Initial runtime timings and SDR visual fixture recorded with limitations.
- [x] Engine file, package and consumer ownership matrices created; G1–G7 assigned, not closed.
- [x] Retirement list and browser age/share policy recorded without performing removals.
- [x] Factory, loader, wrapper and bootstrap contract outline recorded.
- [x] Complete missing CJS payload, documented CDN lazy disposition and installed-package baseline checks.
- [x] Complete M6 emitter/absorber/retention and M8 HDR/layers/resize baseline fixtures, memory/GC and long-frame evidence; set applicable runtime budgets after valid measurements.
- [x] Complete color/visual baseline coverage beyond the initial SDR reference.

The initial evidence gaps above are closed by the additive continuation evidence below. Later stages and their exit criteria remain pending.

## E0 completion evidence — continuation at `f17e249212`

The continuation commit contains the prior evidence checkpoint and test-only lint correction; engine and extension runtime sources still match the original baseline. New artifacts are additive and the earlier payload/runtime records remain intact.

- **Installed package and CJS:** `check-installed.mjs` packs the built engine with pnpm, installs its tarball offline outside the workspace, and verifies six root/lazy import/require/browser resolutions. No repository symlinks or lifecycle hooks are used by the installed consumer. `installed-package.json` records archive SHA-256, pack contents and paths. Root and lazy require/init each retain 67 CJS modules. Root totals: raw 125392 B; per-file minified 81861 B, gzip 29995 B, Brotli 25958 B. Lazy totals: raw 125430 B; minified 81896 B, gzip 30006 B, Brotli 25964 B. Complete shipped CJS: raw 239326 B; minified 137213 B, gzip 53150 B, Brotli 45546 B. Per-file CJS compression is intentionally distinct from browser tree-shaken bundles.
- **Classic CDN lazy disposition:** the standard Rollup factory explicitly disables classic lazy generation; the targeted current engine/bundle/template documentation search found no `.lazy.js` CDN product. Mark this baseline scenario unavailable, retain package ESM/CJS `/lazy` support, and do not introduce a new classic lazy product in E1. E9 must verify that no stale generated/documented classic lazy URLs survive. This is a supported-product disposition, not a measured zero-byte result.
- **Extended M6/M8:** 18 measured runs, plus two warm-up and 30 retention cycles, exercise emitters, absorbers, grouped churn, HDR-requested fallback, background callback/mask layers and resize from 800×600 to 640×480. Real contexts, explicit ticks and zero remaining engine containers verified. Per-run init/update/render/frame p95, long-frame counts and resize costs are in `runtime-extended.json`. Media-listener instrumentation uses only query-string counters and stores no listener or container references.

| Scenario             |    N | Median update ms | Median render ms | Median frame p95 ms |
| -------------------- | ---: | ---------------: | ---------------: | ------------------: |
| M6-extensions        |  100 |            0.200 |            0.200 |               0.600 |
| M6-extensions        |  500 |            0.800 |            0.700 |               1.700 |
| M6-extensions        | 1000 |            1.700 |            1.500 |               3.700 |
| M8-hdr-layers-resize |  100 |            0.100 |            0.100 |               0.400 |
| M8-hdr-layers-resize |  500 |            0.600 |            0.700 |               1.500 |
| M8-hdr-layers-resize | 1000 |            1.300 |            1.300 |               3.000 |

**Observed baseline defect (G2 / E4):** after warm-up, 18 scene lifecycles increase live DOM listeners from 5 to 23. Three further batches of ten increase them to 33, 43 and 53. The counters identify `(prefers-reduced-motion: reduce)` registrations (2 → 20 → 30 → 40 → 50) while HDR/P3 listeners return to zero. Forced-GC heap grows from about 4.5 MB to 63.9 MB after the varied workloads and another ~7.15 MB per ten M6 cycles. DOM nodes grow by one per lifecycle. This corroborates MotionPluginInstance’s unpaired listener and is an E4 correctness target, **not** a permitted regression budget. E0 captures the defect; E4 must demonstrate cleanup and refresh behavior before its gate can close.

**Color/visual evidence:** `color-matrix.png` was inspected and `color-matrix.json` contains input values, particle colors, actual context attributes and pixel readback for hex, HSL, RGB, in-gamut/wide OKLCH, parser alpha and separate fill opacity. The baseline ignores the RGBA/OKLCH alpha in particle fill while separate fill opacity visibly blends; retain this as an E5 migration fixture, not a desired v5 result. Natural HDR detection falls back to sRGB on this display. Forced media-capability detection exercises real display-p3/float16 Canvas2D output; screenshot/readback remains SDR and makes no physical HDR luminance claim. E5/E7 must repeat both detection/fallback and real-context paths.

**Runtime budgets:** compare three repetitions on the same machine/browser, including p95 and dispersion. Median update/render and frame p95 ceilings are baseline ×1.10 or baseline +0.1 ms, whichever is larger, to accommodate timer resolution. Values are saved in `runtime-budgets.json` for original and extended scenarios. After E4, the 30-cycle retention check must add zero live media listeners and zero detached scene nodes; allow at most 1 MiB post-warm-up heap drift, with investigation required above that threshold. Forced-GC values are retention signals, not allocation volume or conclusive leak proofs.

**E0 exit: complete.** Reproducible size/runtime/visual evidence, numeric budgets, owner matrices, retirement/support scope and unavailable-product dispositions are recorded. Known runtime defects remain assigned to E1–E8/G1–G7; no mandatory fix is deferred to E11. E1 consumer retirement is now verified; next is explicit engine creation and cohesive consumer migration.

### Supplemental E0 forced-HDR timing

Captured before the first engine runtime edit: `runtime-extended-hdr.json` adds
18 runs using forced media capability detection and actual display-p3/float16
contexts in both M6 and M8. Each group has three repetitions with identical RNG
counts, zero remaining engine containers and no page errors. This measures real
canvas CPU submission, not physical display luminance. Separate `forceHdr: true`
budgets prevent comparison with the natural SDR fallback as if they were one mode.

| Scenario             |    N | Update median ms | Render median ms | Frame p95 ms |
| -------------------- | ---: | ---------------: | ---------------: | -----------: |
| M6-extensions        |  100 |            0.200 |            0.200 |        0.500 |
| M6-extensions        |  500 |            0.800 |            0.700 |        1.700 |
| M6-extensions        | 1000 |            1.500 |            1.400 |        3.200 |
| M8-hdr-layers-resize |  100 |            0.100 |            0.100 |        0.400 |
| M8-hdr-layers-resize |  500 |            0.600 |            0.600 |        1.400 |
| M8-hdr-layers-resize | 1000 |            1.400 |            1.300 |        2.900 |

Retention again reaches 53 DOM listeners/57 nodes after the measured workloads
and 30 further lifecycles, with ~85.3 MB retained heap. Reduced-motion listener
counts rise to 50; HDR/P3 listeners return to zero. The E4/G2 defect remains open.

## E1 factory checkpoint — working tree, acceptance in progress (2026-11-14)

The factory increment follows the verified retirement checkpoint. Retirement did
not change runtime artifacts, so E0 is also the preceding runtime baseline.
Current evidence is under `evidence/e1`; measurements explicitly identify the
working tree. Artifact hashes are recorded separately. No release/commit made.

| Consumer, import condition                        | E0 gzip | E1 gzip | Delta |
| ------------------------------------------------- | ------: | ------: | ----: |
| Pure clamp helper                                 |     189 |     189 |     0 |
| Engine acquisition (singleton → explicit factory) |  22,665 |  22,673 |    +8 |
| Explicit initialization                           |  22,665 |  22,682 |   +17 |
| Minimal scene                                     |  28,451 |  28,547 |   +96 |
| Lazy engine acquisition                           |  22,680 |  22,680 |     0 |

Source: `evidence/e1/bundle-sizes.json`. Root/lazy installed ESM/CJS/browser
probes pass; `installed-package.json` records physical CJS closure separately.
Classic external CDN composition loads 100 particles at cold and warm cache,
then returns to zero containers. Separate basic/slim copies reject simultaneous
canvas owners and reuse a transferred canvas after destruction. All four
convenience bundles initialize two separate engines and accept an external emoji
plugin without a preceding engine script. See `factory-browser.json` and
`cdn-browser.json`. No service isolation is claimed before E2.

Runtime: 54 main runs, 18 extended SDR runs, 18 forced-HDR runs, no browser
errors. `runtime-comparison.json` compares three-repetition medians with frozen
E0 ceilings. One first-pass exceedance requires investigation: SDR M6 extensions,
500 particles, frame p95 1.90 ms vs 1.87 ms ceiling (E0 1.70 ms). A second independent run also measures 1.90 ms; deterministic particle counts
and RNG-call counts match E0. The first run is retained in
`runtime-extended-first.json`; the repeat is in `runtime-extended.json`.
Remaining measured timing ceilings pass. This is not an E10 performance acceptance.

Retention remains open for E4: reduced-motion listeners rise 2 → 50 through
workloads and retention cycles, total listeners 5 → 53. Heap reaches about
85.3 MB. DOM nodes reach 107; the new canvas ownership closure retains both
canvas resources while the existing Motion listener retains the container.
Fixing the root listener lifetime and verifying resource return to baseline are
mandatory; the extra retained DOM nodes are not dismissed as an optimization.
