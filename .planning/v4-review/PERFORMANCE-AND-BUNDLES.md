# v4 performance and bundle size

The goal is to preserve behavior and performance in existing scenes while reducing measured distribution, startup, or frame costs. These changes can proceed independently under the v4 compatibility contract in the [plan index](README.md).

## Local artifacts as a preliminary reference

These files were already in the checkout. Their correspondence to `5d59d1dbbd` has not been verified. Use their sizes to prioritize investigation and use clean builds to attribute differences to a patch.

| Minified standalone bundle | JS bytes | Gzip level 9 | Brotli quality 11 |
| -------------------------- | -------: | -----------: | ----------------: |
| Basic                      |   97,879 |       29,261 |            25,885 |
| Slim                       |  163,095 |       46,342 |            40,229 |
| Full                       |  207,862 |       57,735 |            49,674 |
| All                        |  419,079 |      114,230 |            93,343 |

Measured with `node:zlib` on `tsparticles*.bundle.min.js` in the four `bundles/*/dist` directories. Measure scripts with external dependencies as a complete page. Include the engine and plugins when calculating the cost of a minified script that depends on them.

## Current v4 artifacts

Measured on the locally rebuilt packages from `f8a119561f`. The generated scene uses the package exports of Basic, engine and polygon, bundled together by esbuild 0.28.2 with browser resolution and minification. The standalone rows are the minified CDN artifacts. All values are bytes.

| Artifact                        |      JS | Gzip level 9 | Brotli quality 11 |
| ------------------------------- | ------: | -----------: | ----------------: |
| Basic standalone                |  99,530 |       29,718 |            26,300 |
| Slim standalone                 | 164,779 |       46,849 |            40,676 |
| Full standalone                 | 209,565 |       58,266 |            50,150 |
| All standalone                  | 422,291 |      115,246 |            94,029 |
| Generated vanilla polygon scene |  93,981 |       30,007 |            26,439 |

The browser ESM consumer graphs below extend the S01 baseline.

## Bundle size reductions

### V4-S01 · Measure the consumer graph before changing bundle composition

Build a baseline from the reviewed commit with standard Rollup and verify any other supported backend the change affects. Collect graphs and sizes for a pure helper, engine + circle with minimal loaders, basic/slim/full/all, ESM/CJS consumers where lazy subpaths are supported, and CDN engine + feature. Distinguish the entry, first scene, all chunks, raw/minified/gzip/Brotli bytes, requests, and duplicates. For external chunks, sum compressed bytes as served and deduplicate only files actually shared. Pin toolchain versions, minification presets, and options.

**Browser ESM consumers.** esbuild 0.28.2 bundled local browser entry points with minification, ES2022, ESM splitting, and production diagnostics. The initial graph includes the entry and every statically imported output before the application calls its scene loader. The full graph includes all emitted JS, including dynamic branches. Each output is counted once and compressed separately. The graph was measured after adding the plugin registration guard.

| Consumer                          | Initial files | Initial JS | Initial gzip 9 | Initial Brotli 11 | Total files | Total JS | Total gzip 9 | Total Brotli 11 |
| --------------------------------- | ------------: | ---------: | -------------: | ----------------: | ----------: | -------: | -----------: | --------------: |
| Engine range helper               |             2 |     30,879 |         11,238 |             9,936 |           3 |   67,762 |       23,294 |          20,849 |
| Engine + circle and paint loaders |             2 |     39,319 |         13,954 |            12,414 |           3 |   76,205 |       26,009 |          23,356 |
| Basic                             |             3 |     50,256 |         17,315 |            15,375 |           6 |   91,753 |       31,356 |          28,124 |
| Slim                              |             5 |    110,787 |         34,593 |            30,319 |          12 |  163,282 |       52,927 |          46,905 |
| Full                              |             8 |    142,909 |         43,935 |            38,395 |          22 |  210,792 |       68,413 |          60,582 |
| All                               |            12 |    297,189 |         90,958 |            75,379 |          42 |  436,733 |      133,765 |         113,804 |

Chrome 157 requested these files through initialization of a four-circle scene. Each entry used a fresh browser context and an HTTP server with caching disabled. The compressed columns sum the standalone compression of the fetched JS bodies and exclude HTTP overhead. The helper-only page requested its two initial files.

| Consumer                          | Files through first scene | JS bytes | Gzip level 9 | Brotli quality 11 |
| --------------------------------- | ------------------------: | -------: | -----------: | ----------------: |
| Engine + circle and paint loaders |                         3 |   76,205 |       26,009 |            23,356 |
| Basic                             |                         6 |   91,753 |       31,356 |            28,124 |
| Slim                              |                        12 |  163,282 |       52,927 |            46,905 |
| Full                              |                        20 |  200,444 |       64,824 |            57,335 |
| All                               |                        39 |  424,099 |      129,199 |           109,661 |

### V4-S02 · Remove duplicate payload identified in the graph

1. Check for duplicate engine and utility copies when the same consumer mixes root/lazy or ESM/browser paths. Inspect manifests and dependency resolution before changing imports. If the graph includes duplicate copies, align resolution while preserving exports, versions, and v4 identity. For CDN, measure both standalone bundles and pages with several external features.
2. `loadSlim` also registers Paint through `loadBasic` in both eager and lazy entries. Remove the redundant call only after verifying order, the direct dependency, and the final registry. The bundler may already retain a single module copy. Measure invocations, bytes, and startup time separately. [Basic](../../bundles/basic/src/index.ts#L24), [Slim](../../bundles/slim/src/index.ts#L67), [Slim lazy](../../bundles/slim/src/index.lazy.ts#L49).
3. In an npm consumer, check whether diagnostic catalogs and bootstrap code remain beyond what the format requires. Minified Rollup builds already replace `NODE_ENV` to strip development catalogs. Measure what remains in other paths before intervening and preserve error codes, development messages, and documented globals. [Rollup configuration](../../cli/utils/rollup-plugin/src/config/createSingleConfig.ts#L296).

**Qwik distribution.** The built Qwik ESM entry passed a separate engine instance to its initialization callback. Treating the existing engine peer dependency as external made the ESM entry pass the consumer's instance. The figures below count only wrapper files. The external engine still contributes to the full consumer graph.

| Qwik output              | JS bytes | Gzip level 9 | Brotli quality 11 |
| ------------------------ | -------: | -----------: | ----------------: |
| ESM with embedded engine |  187,294 |       38,248 |            32,885 |
| ESM with external engine |    3,879 |        1,145 |             1,001 |
| CJS with embedded engine |  189,743 |       37,822 |            32,581 |
| CJS with external engine |    4,044 |        1,206 |             1,043 |

After the CommonJS packaging fix, both built Qwik entries use the consumer’s engine and register Basic on the same instance. The current build uses the existing peer dependency for both formats.

**Slim Paint registration.** Removing the direct Slim call left one Paint module in each graph and reduced two registrations to one. In a single minified esbuild output, gzip and Brotli moved by at most 19 bytes. Startup samples varied between formats. The browser entry kept updater order, while ESM `/lazy` moved Paint from before Rotate to after Rotate. Both entries retain the current call for v4 compatibility.

### V4-S03 · Isolate heavy code for optional features

Use the All bundle graph to measure `polygonMask/pathseg.js` and the GIF decoder. Evaluate loading the code through the existing lazy loader or, where an async boundary already exists, when the feature activates. Account for the standalone CDN path and cold first use. Preserve feature availability and compatibility, polyfill initialization, assets, and fallbacks. Accept a patch only when the scene transfers fewer bytes without materially delaying first activation. Parser replacement and changes to global contracts belong outside this work item. [All composition](../../bundles/all/src/index.ts), [pathseg import](../../plugins/polygonMask/src/PolygonMaskInstance.ts#L1), [GIF](../../shapes/gif/src/GifDrawer.ts).

In the measured All graph, the GIF modules contributed 10,472 minified JS bytes to the initial graph. The 39,838 bytes attributed to `pathseg.js` were on dynamic edges and Chrome fetched them on first load with polygon masking disabled. These figures attribute code from individual inputs and exclude compression effects. A candidate that defers the code to first use still needs cold activation and standalone All measurements.

## Runtime performance

### V4-P04 · Replace `Math.hypot` for two-dimensional lengths

The engine uses `hypot(x, y)`, implemented as `Math.sqrt(x * x + y * y)`, for canvas-scale lengths in zoom, attraction, and hover repulsion. The public `getDistances` helper keeps `Math.hypot` so it continues to handle extremely large and small deltas. Runtime interactions now work directly with coordinate deltas or squared distances.

Node 26.13.0 microbenchmark with 8,192 deterministic coordinate pairs in a 1,200 × 800 range. Each sample made 819,200 calls, after warmup, in 15 runs per implementation. The median was 12.95 ms for `Math.hypot` and 11.70 ms for the custom helper (1.11× throughput). P95 was 27.43 ms and 16.58 ms respectively. This is a focused microbenchmark, not a full-scene frame measurement.

### V4-P05 · Compare squared distances without computing lengths

When a caller only needs a threshold or nearest-item comparison, the square root can be removed without changing ordering for finite coordinates and nonnegative radii. Use `getDistanceSq` and compare it with `radius * radius`; keep actual lengths where they feed opacity, force, normalization, or rendering. Squares are written inline at call sites rather than routed through a `square()` helper, avoiding extra calls and making threshold semantics visible. Circle-circle intersections, circle-rectangle corner checks, particle collision and overlap checks, Poisson spacing, absorber click selection and contact/force calculations, drag hit testing, and link range/warp selection now compare squared distances. The linker calculates a square root only for a pair that passes the configured range, since opacity still depends on the actual length. Paths that only need the signed X/Y deltas now subtract coordinates directly, skipping the unused length and its square root.

Click repulsion compares the squared distance and normalizes only accepted points, using a square root in place of angle and trigonometric calculations. Particle repulsion uses the squared distance for falloff. Collision energy uses squared vector lengths, and fluid collision rejection, polygon mask bounce, and click bubble range checks defer or skip the square root. Wrapped circle membership checks the shortest squared delta on each axis. Absorber split selection computes each candidate distance once and preserves insertion order for ties.

Node 26.13.0 microbenchmark with 8,192 deterministic coordinate pairs and nonnegative radii. Each sample made 819,200 threshold checks, with 15 alternating samples per implementation after warmup. Comparing `Math.sqrt(dx * dx + dy * dy) <= radius` took 12.44 ms median and 20.30 ms p95; comparing `dx * dx + dy * dy <= radius * radius` took 11.63 ms median and 19.81 ms p95. The median improvement was about 6.9%. This focused microbenchmark does not predict full-scene gains.

Chrome 157.0.8103.52 measured the click repulse calculation on 8,192 deterministic points around the click, with 819,200 point evaluations in each of 15 alternating samples after warmup. The median went from 20.8 ms to 4.9 ms, and p95 went from 21.4 ms to 5.6 ms. Both implementations selected the same 4,078 points, and their velocity checksums differed by less than `1e-10`. The benchmark measures range and force calculations independently of frame rendering.

### V4-P01 · Bound grid work on large queries and sparse scenes

`query()` visits every cell coordinate in the search area, including empty cells. A microbenchmark with a cell size of 64, one indexed point, and a radius of 64,000 searched 4,004,001 coordinates to return one point. The local run took about one second. This synthetic edge case illustrates how work grows. Typical scene costs still need measurement. [Query](../../engine/src/Core/Utils/SpatialHashGrid.ts#L81), [per-frame rebuild](../../engine/src/Core/ParticlesManager.ts#L364).

**Experiment.** Compare the current path against scanning occupied cells only above a threshold based on the ratio of cells in range to occupied cells. Define terminating behavior for invalid inputs or indices outside integer precision. Preserve cell and particle order, the predicate, append semantics for `out`, and nested queries. Measure string keys, cell arrays, and rebuild allocations separately. Bound any memory reuse and release it on clear/destroy. Measure small and large queries and canvases, DPR 1 and 2, dense and sparse scenes, mixed-radius collisions, and warped links.

**Implemented.** For a query without a predicate, when its bounding box covers more than 64 cells and more than 16 times the occupied cell count, inspect the occupied cells and sort matches by numeric X then Y. Particle order within each cell and the caller’s output prefix are preserved. Queries with a predicate keep live coordinate lookups so that nested queries and insertions from callbacks still work. Nonfinite or unsafe cell bounds terminate with the existing output intact.

Node 26.13.0 microbenchmark against the pre-change grid with cell size 64, a fixed seed, warmup and 13 alternating before/after samples. Values are milliseconds per batch. The dense batches used 4,000 particles and 256 queries; the sparse batch used 32 particles and 16 queries. Each query returned the same ordered particle identities in both builds.

| Query batch                            | Before median | After median | Before p95 | After p95 |
| -------------------------------------- | ------------: | -----------: | ---------: | --------: |
| Dense, radius 64                       |        0.6269 |       0.6306 |     0.8438 |    0.6516 |
| Dense at DPR 2 dimensions, radius 128  |        1.1212 |       1.1191 |     1.1631 |    1.1770 |
| Dense with predicate                   |        0.7174 |       0.6929 |     0.7362 |    0.7010 |
| Sparse, radius 8,192                   |      106.0790 |       0.1069 |   114.3216 |    0.1371 |
| One particle, one query, radius 64,000 |    1,006.5952 |       0.0145 | 1,076.1898 |    0.0488 |

Chrome 157 headless used locally built Slim bundles, the same seed and a 1,200 × 800 canvas. Each case ran three alternating before/after pairs with 45 animation callbacks per run after 15 warmup callbacks. These are milliseconds spent inside the animation callback.

| Scene                                          | Before median | After median | Before p95 | After p95 |
| ---------------------------------------------- | ------------: | -----------: | ---------: | --------: |
| 500 particles, links radius 55, DPR 1          |           3.5 |          3.3 |        4.2 |       4.0 |
| 500 particles, links radius 55, DPR 2          |           3.1 |          3.5 |        4.1 |       4.0 |
| 12 particles, links radius 6,000, 100 px cells |          10.5 |          0.5 |       11.4 |       1.6 |

Slim normally adapts the grid to the link radius. With adaptive sizing the sparse scene measured about 0.3 ms median in both builds. The fixed cell case represents a wide query on a grid that stays fine. The dense DPR 2 median varied between runs, while the isolated run kept its p95 within 0.1 ms.

### V4-P02 · Reduce collection scans and moves

Group limits use `filter(...).length` before insertion. Removal repeats `indexOf` and `splice` in both the collection and Z buckets. First measure resize, push, and churn with emitters, short lifetimes, and active limits. Compare counting without a temporary array and maintaining a count per group at mutation points if the mutability contract allows it. For batch removal, measure stable compaction and verify semantics during reentrant callbacks. Preserve age ordering, Z order within each layer, particle IDs and identity, events, hooks, and `wait`/`delete` limits. [Limits](../../engine/src/Core/ParticlesManager.ts#L469), [removal and buckets](../../engine/src/Core/ParticlesManager.ts#L656).

**Implemented.** Count group membership directly during density and limit checks. The scan reads each particle’s current group because plugins can change it at runtime. Removal still processes each particle and dispatches its event in order. Batch compaction remains open because callbacks can observe the collection between removals.

Chrome 157 headless compared the locally built Slim bundles with a fixed seed and a 1,200 × 800 canvas. Each case ran four alternating before/after pairs with nine measured batches per load after four warmup batches. The fixture used the live particle manager with autoplay off to measure these operations separately from rendering. Values are milliseconds per batch.

| Operation                                                | Before median | After median | Before p95 | After p95 |
| -------------------------------------------------------- | ------------: | -----------: | ---------: | --------: |
| 1,000 blocked additions, group wait limit                |          18.4 |          3.6 |       18.9 |       3.8 |
| 200 replacements, group delete limit                     |           7.9 |          4.6 |        9.1 |       5.8 |
| Four density resize cycles from 1,200 to 900 px and back |          35.2 |         35.1 |       36.5 |      37.2 |

The wait and delete scenes ended with 2,000 particles, including 1,000 in the capped group. The density scene ended with 4,000 particles, including 1,000 in the capped group. Final group counts and the oldest and newest particle IDs matched between builds. The density timings show no clear gain.

### V4-P03 · Reduce repeated rendering work

The renderer already reuses style and transform buffers, and the position getter reuses one object per particle. The hot path still builds drawer payloads and visits the entire plugin list for `drawParticleTransform`. Measure allocations and hook cost first. Start by prefiltering transform hooks at the same lifecycle point as other hooks, after checking whether list mutations are supported. Keep observable payloads independent if plugins can retain them or use them in reentrant calls. Measure simple scenes and scenes with multiple plugins, zoom, effects, gradients, and HDR. V4-B05 addresses startup cost separately. [Renderer](../../engine/src/Core/RenderManager.ts#L592), [existing hook caches](../../engine/src/Core/RenderManager.ts#L762), [Particle](../../engine/src/Core/Particle.ts#L708).

**Renderer experiment.** Chrome 157 headless ran four alternating sequences per scene with 15 warmup draws and 30 measured draws per variant. Each scene used 600 particles, a fixed seed, and a 1,200 × 800 canvas. The table reports milliseconds per draw call. The candidates cached the plugins with transform hooks at renderer initialization or switched to live indexed iteration.

| Scene                                    | Baseline median / p95 | Cached median / p95 | Indexed median / p95 |
| ---------------------------------------- | --------------------: | ------------------: | -------------------: |
| Basic circles                            |             1.1 / 1.3 |           1.0 / 1.3 |            1.0 / 1.3 |
| Slim links                               |             2.8 / 3.5 |           2.9 / 3.5 |            2.9 / 3.6 |
| All with zoom, shadows and gradients     |             2.9 / 3.5 |           2.8 / 3.5 |            2.7 / 3.6 |
| All with HDR capability forced in Chrome |             3.5 / 4.2 |           3.6 / 4.2 |            3.6 / 4.1 |

The test matched particle counts and pixel hashes. The HDR run overrides Chrome’s media-query responses to exercise the HDR code path. The renderer retains live iteration because neither candidate consistently improved p95. The release now protects plugin-list membership through the registration API. Draw payloads stay independent and heap and GC costs remain unmeasured.

## Measurement gates

- Use the same starting commit, browsers, hardware, viewport, DPR, seed, input sequence, and duration. Repeat cold and warm runs, separating warm-up from steady-state measurements. Record median and p95 frame time, update/draw cost, startup to first frame, heap, allocations, and GC. Prefer frame time when the scheduler's FPS limit masks differences.
- Minimum matrix includes basic with a single shape, slim with links/hover, mixed collisions, emitter churn, sparse scenes with large queries, and all with GIF or polygon mask. Test bundles with controlled network latency and an empty cache as well as warm runs.
- The improvement should exceed benchmark variability. Use a 3% increase in p95 frame time or time to first frame as an initial investigation threshold and calibrate it against the baseline before making it a gate. Fix reproducible regressions before release, even if bundle size falls. Preserve counts, draw order, events, and expected rendering.
- Report a reduction only when gzip/Brotli shows a measurable delta for the same scene and required chunks have been counted. Report deferred bytes, eliminated bytes, and total downloads separately. Include commands, graphs, and results with each PR.
