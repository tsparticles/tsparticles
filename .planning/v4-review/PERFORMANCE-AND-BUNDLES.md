# v4 performance and bundle size

The goal is to preserve behavior and performance in existing scenes while reducing measured distribution, startup, or frame costs. These changes can proceed independently under the v4 compatibility contract in the [plan index](README.md).

## V4-D01 · P2 · The browser condition makes the `/lazy` subpath eager

The dist manifests for engine, basic, slim, full, and all point both `.` and `./lazy` to `browser/browser.js` under the `browser` condition. With esbuild 0.28.2, using the reviewed manifests and local artifacts as fixtures, imports from `/lazy` for basic, slim, and all include `browser/browser.js` and the static entry `browser/index.js`. Under neutral conditions they resolve to `esm/index.lazy.js`. The smoke test externalized the dependencies of the three packages to isolate resolution. It confirms entry selection. Measuring the cost of a scene requires a complete consumer bundle. [Slim manifest](../../bundles/slim/package.dist.json#L91), [browser entry](../../bundles/slim/src/browser.ts), [lazy entry](../../bundles/slim/src/index.lazy.ts#L13), [engine manifest](../../engine/package.dist.json#L94).

**Plan.** Add a packaged-artifact test and a root/lazy matrix for engine, basic/slim/full/all, and relevant transitive dependencies. Test a lazy browser wrapper that preserves exports, v4 globals, and singleton identity when root and lazy imports are mixed, then evaluate changing the mapping. Preserve the root mapping and CDN script infrastructure. Correct the existing subpath in a patch if parity holds. If the observable behavior cannot be preserved, retain the current mapping and consider an opt-in subpath in a minor release only if the benefit is measured.

**Acceptance.** Use clean packages in two production browser consumers (esbuild and Vite), Node ESM/CJS, and classic and module-script CDN smoke tests. Check the resolved path, entry/chunk graph, and requests before and after `loadSlim()` and at the first frame. Lazy loading can defer the same total download. Report deferred and eliminated bytes separately, along with requests, registration, and cold and warm time to first frame.

## Local artifacts as a preliminary reference

These files were already in the checkout. Their correspondence to `5d59d1dbbd` has not been verified. Use their sizes to prioritize investigation and use clean builds to attribute differences to a patch.

| Minified standalone bundle | JS bytes | Gzip level 9 | Brotli quality 11 |
| -------------------------- | -------: | -----------: | ----------------: |
| Basic                      |   97,879 |       29,261 |            25,885 |
| Slim                       |  163,095 |       46,342 |            40,229 |
| Full                       |  207,862 |       57,735 |            49,674 |
| All                        |  419,079 |      114,230 |            93,343 |

Measured with `node:zlib` on `tsparticles*.bundle.min.js` in the four `bundles/*/dist` directories. Measure scripts with external dependencies as a complete page. Include the engine and plugins when calculating the cost of a minified script that depends on them.

## Bundle size reductions

### V4-S01 · Measure the consumer graph before changing bundle composition

Build a baseline from the reviewed commit with standard Rollup and verify any other supported backend the change affects. Collect graphs and sizes for a pure helper, engine + circle with minimal loaders, basic/slim/full/all, a lazy consumer, and CDN engine + feature. Distinguish the entry, first scene, all chunks, raw/minified/gzip/Brotli bytes, requests, and duplicates. For external chunks, sum compressed bytes as served and deduplicate only files actually shared. Pin toolchain versions, minification presets, and options.

### V4-S02 · Remove duplicate payload identified in the graph

1. Check for duplicate engine and utility copies when the same consumer mixes root/lazy or ESM/browser paths. Inspect manifests and dependency resolution before changing imports. If the graph includes duplicate copies, align resolution while preserving exports, versions, and v4 identity. For CDN, measure both standalone bundles and pages with several external features.
2. `loadSlim` also registers Paint through `loadBasic` in both eager and lazy entries. Remove the redundant call only after verifying order, the direct dependency, and the final registry. The bundler may already retain a single module copy. Measure invocations, bytes, and startup time separately. [Basic](../../bundles/basic/src/index.ts#L24), [Slim](../../bundles/slim/src/index.ts#L67), [Slim lazy](../../bundles/slim/src/index.lazy.ts#L49).
3. In an npm consumer, check whether diagnostic catalogs and bootstrap code remain beyond what the format requires. Minified Rollup builds already replace `NODE_ENV` to strip development catalogs. Measure what remains in other paths before intervening and preserve error codes, development messages, and documented globals. [Rollup configuration](../../cli/utils/rollup-plugin/src/config/createSingleConfig.ts#L296).

### V4-S03 · Isolate heavy code for optional features

Use the All bundle graph to measure `polygonMask/pathseg.js` and the GIF decoder. Evaluate loading the code through the existing lazy loader or, where an async boundary already exists, when the feature activates. Account for the standalone CDN path and cold first use. Preserve feature availability and compatibility, polyfill initialization, assets, and fallbacks. Accept a patch only when the scene transfers fewer bytes without materially delaying first activation. Parser replacement and changes to global contracts belong outside this work item. [All composition](../../bundles/all/src/index.ts), [pathseg import](../../plugins/polygonMask/src/PolygonMaskInstance.ts#L1), [GIF](../../shapes/gif/src/GifDrawer.ts).

## Runtime performance

### V4-P01 · Bound grid work on large queries and sparse scenes

`query()` visits every cell coordinate in the search area, including empty cells. A microbenchmark with a cell size of 64, one indexed point, and a radius of 64,000 searched 4,004,001 coordinates to return one point. The local run took about one second. This synthetic edge case illustrates how work grows. Typical scene costs still need measurement. [Query](../../engine/src/Core/Utils/SpatialHashGrid.ts#L81), [per-frame rebuild](../../engine/src/Core/ParticlesManager.ts#L364).

**Experiment.** Compare the current path against scanning occupied cells only above a threshold based on the ratio of cells in range to occupied cells. Define terminating behavior for invalid inputs or indices outside integer precision. Preserve cell and particle order, the predicate, append semantics for `out`, and nested queries. Measure string keys, cell arrays, and rebuild allocations separately. Bound any memory reuse and release it on clear/destroy. Measure small and large queries and canvases, DPR 1 and 2, dense and sparse scenes, mixed-radius collisions, and warped links.

### V4-P02 · Reduce collection scans and moves

Group limits use `filter(...).length` before insertion. Removal repeats `indexOf` and `splice` in both the collection and Z buckets. First measure resize, push, and churn with emitters, short lifetimes, and active limits. Compare counting without a temporary array and maintaining a count per group at mutation points if the mutability contract allows it. For batch removal, measure stable compaction and verify semantics during reentrant callbacks. Preserve age ordering, Z order within each layer, particle IDs and identity, events, hooks, and `wait`/`delete` limits. [Limits](../../engine/src/Core/ParticlesManager.ts#L469), [removal and buckets](../../engine/src/Core/ParticlesManager.ts#L656).

### V4-P03 · Reduce repeated rendering work

The renderer already reuses style and transform buffers, and the position getter reuses one object per particle. The hot path still builds drawer payloads and visits the entire plugin list for `drawParticleTransform`. Measure allocations and hook cost first. Start by prefiltering transform hooks at the same lifecycle point as other hooks, after checking whether list mutations are supported. Keep observable payloads independent if plugins can retain them or use them in reentrant calls. Measure simple scenes and scenes with multiple plugins, zoom, effects, gradients, and HDR. V4-B05 addresses startup cost separately. [Renderer](../../engine/src/Core/RenderManager.ts#L592), [existing hook caches](../../engine/src/Core/RenderManager.ts#L762), [Particle](../../engine/src/Core/Particle.ts#L708).

## Measurement gates

- Use the same starting commit, browsers, hardware, viewport, DPR, seed, input sequence, and duration. Repeat cold and warm runs, separating warm-up from steady-state measurements. Record median and p95 frame time, update/draw cost, startup to first frame, heap, allocations, and GC. Prefer frame time when the scheduler's FPS limit masks differences.
- Minimum matrix includes basic with a single shape, slim with links/hover, mixed collisions, emitter churn, sparse scenes with large queries, and all with GIF or polygon mask. Test bundles with controlled network latency and an empty cache as well as warm runs.
- The improvement should exceed benchmark variability. Use a 3% increase in p95 frame time or time to first frame as an initial investigation threshold and calibrate it against the baseline before making it a gate. Fix reproducible regressions before release, even if bundle size falls. Preserve counts, draw order, events, and expected rendering.
- Report a reduction only when gzip/Brotli shows a measurable delta for the same scene and required chunks have been counted. Report deferred bytes, eliminated bytes, and total downloads separately. Include commands, graphs, and results with each PR.
