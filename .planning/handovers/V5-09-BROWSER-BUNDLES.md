# V5-09 — Refine browser distribution without a singleton

Status pending. Define the minimum contract and make migration work in 01.
Refine and verify distribution after 08. Fix build failures when they arise.

## Ownership

Browser, bundle, and lazy entries for engine, bundles, and features,
package exports and browser conditions, dist/CDN manifests,
`cli/utils/{rollup-plugin,rolldown-plugin,webpack-config}/`, generators and
tests, and classic and module-script CDN examples. Preserve other
contributors' changes and supported formats unless an explicit decision
justifies a change.

## Starting evidence

Rollup has dedicated policies in `config/iifePolicy.ts` and `config/entry.ts`
covering global scopes under `__tsParticlesInternals`, external mapping,
namespace/Proxy bootstrap, and browser, bundle, and lazy entries. Feature browser
source also exposes global loaders. Review this infrastructure alongside
`globalThis.tsParticles` removal and check the other bundlers.

## Work

1. Inventory supported products, including browser ESM consumers, classic
   IIFE/UMD scripts where provided, standalone bundles, engine with external
   features, and lazy loading. Separate the public bootstrap API from the
   internal module namespace.
2. Define the namespace, factory, loader, and convenience APIs in 01 and
   finalize them here. Script loading makes definitions available. Applications
   create and retain their engines and pass the selected engine to each loader.
   Keep minimal and two-engine examples simple and creation explicit on CDN.
3. Review global registries, externals, and bootstrap. Keep infrastructure
   needed for module resolution and exclude global instances, services, or
   registration flags that would prevent a second engine from working.
4. Analyze duplicate core and helpers across engine, slim/full/all, and
   standalone features. Compare standalone and external builds by total page
   cost. Define supported combinations and script order, with clear errors
   for unsupported orderings.
5. Define repeated loads, multiple bundles on a page, namespace collisions,
   and version mismatches. Keep existing engines intact and reject incompatible
   plugin wiring. Test documented script orders.
6. Check lazy CDN chunk URLs/base paths, minified and unminified outputs,
   dynamic imports, and externals. Measure chunks loaded for the same scene
   and account for bytes moved into chunks.
7. Align Rollup (standard), Rolldown, and Webpack for supported outputs.
   Check entry selection, global names, externals, minification, exports, and
   `sideEffects`. Keep standard module resolution in browsers pure.
8. Update README, CDN guides, templates, and generators. Document the breaking
   change to automatic bootstrap and test the published examples.

## Acceptance tests

- In a real browser, exercise standalone bundle → factory → loader → load,
  engine with individual features, two engines with different plugin sets,
  and installation of the same feature on both engines.
- Load slim and full or two supported bundles on the same page. Verify explicit
  creation, preservation of existing engines, and correct deduplication.
- Serve lazy output from a realistic CDN path. Check chunks, clear module/version
  errors, repeated imports, and duplicate scripts.
- Browser ESM and package conditions avoid global writes. Classic scripts expose
  only the documented bootstrap and required definitions.
- Verify consistent output and packaged artifacts across supported bundlers and
  formats. Test policies and mappings alongside smoke tests.
- Report full-page and selective-feature sizes, remaining duplication,
  entry/chunk bytes, gzip/Brotli, and startup cost.

Include an installed consumer with `browser`, `import`, and `require` conditions.
Check resolved root and `/lazy` entries, including transitive lazy subpaths, and
measure requests before invoking the loader and at the first frame.
[V4-D01](../v4-review/PERFORMANCE-AND-BUNDLES.md) shows that manifests can select
an eager entry even when lazy source is correct. Reuse the v4 fixture when available.

## Deliverables

Provide the format/entry/bundler matrix, final browser contract and examples,
real browser tests and results, manifest changes, and measurements. Gate 10
includes this matrix.

## Performance and size plans

See [V5-IMP-02-BUNDLE-GRAPH](improvements/V5-IMP-02-BUNDLE-GRAPH.md).
Record assigned outcomes as specified in the [improvement plan](V5-IMPROVEMENTS.md).
