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
6. Check classic and module-script CDN URLs, minified and unminified outputs,
   and externals. Verify supported loader behavior and script ordering.
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
- Serve supported browser and CDN outputs from realistic paths. Check clear
  module/version errors, repeated imports, and duplicate scripts.
- Browser ESM and package conditions avoid global writes. Classic scripts expose
  only the documented bootstrap and required definitions.
- Verify consistent output and packaged artifacts across supported bundlers and
  formats. Test policies and mappings alongside smoke tests.
- Report full-page and selective-feature sizes, remaining duplication,
  entry/chunk bytes, gzip/Brotli, and startup cost.

Include an installed consumer with `browser`, `import`, and `require` conditions.
Verify each condition resolves to its documented entry, including the existing
package `/lazy` subpath where available. Verify browser entry resolution
separately from ESM/CJS lazy exports.

## Deliverables

Provide the format/entry/bundler matrix, final browser contract and examples,
real browser tests and results, manifest changes, and measurements. Gate 10
includes this matrix.

## Performance and size plans

See [V5-IMP-02-BUNDLE-GRAPH](improvements/V5-IMP-02-BUNDLE-GRAPH.md).
Record assigned outcomes as specified in the [improvement plan](V5-IMPROVEMENTS.md).

## Architecture evaluations

Verify [ARCH-02 — Engine packages](architecture/V5-ARCH-02-ENGINE-PACKAGES.md)
and [ARCH-04 — Extensions](architecture/V5-ARCH-04-EXTENSIONS.md) outcomes.
Check adopted packages/subpaths, selective loaders and capabilities, and
duplicate runtime copies and registries in browser/CDN/lazy composition.
Compare total payload for the same scene, including changed entries and chunks.

## Required color migration

Follow [V5-COLOR — OKLCH](V5-COLORS-OKLCH.md). In C5, verify bundles, loaders,
and facades. Canonical OKLCH rendering works without the OKLCH parser plugin
when another manager resolves the color. Test sRGB/P3 SDR/HDR in real contexts
and consumers installed from built packages.

## Legacy support retirement

Apply [V5-LEG](../REQUIREMENTS.md). Inventory Vue 2, Nuxt 2, and Nuxt 3 wrappers
and related demos, starter templates, installer detection, package references,
docs, and translations. Inventory APIs marked `@deprecated` with documented
supported replacements and record their migration paths.

Before changing shared browser configuration, record the Browserslist data
version, evaluated targets, and usage threshold for the agreed 5–6 year
window. Retain detection and fallbacks needed by supported browsers. Verify
browser outputs and hand off the removal inventory and evidence to 10.
