# V5-IMP-02 — Import graph, optional features, and browser distribution

Status pending analysis. High priority. Owners are 03 and 09, with support from
01, 05, 07, and 08. Requires the [IMP-01 protocol](V5-IMP-01-MEASUREMENT.md)
and the factory contract from 01.

## Starting evidence and hypotheses

In the reviewed checkout, `exports.ts` re-exports utilities, enums, and option
classes. `Engine.load()` imports Container dynamically. Manifests expose browser
and lazy conditions, while browser entries and IIFE policies define namespaces
and loaders. Check the produced artifacts to see which of these retain bytes.

### B1 — Pure helpers and the package root

Compare M1 with M2/M3. Identify modules retained by runtime imports, cycles,
side effects, or browser entry selection. Verify whether selective entrypoints
remove dependencies from the bundle. Compare root imports with a documented
subpath only where a real consumer needs it. Keep subpaths selective.
Tree shaking can eliminate `export *` dependencies, so check the output graph
before changing the API.

Acceptance requires a pure helper without engine or DOM creation, a factory
without scene startup, and fixtures built with actual browser conditions.
Keep plugin APIs and types reachable and preserve type-only class exports.

### B2 — Separate optional features

Map the transitive cost of options, color/HDR, fullscreen/style, and background
in M3 and M8. Distinguish always-required code from feature-specific code.
Compare simplifying the existing branch, extracting a tree-shakable pure
helper, and making a plugin or capability explicitly lazy.

Before extraction, list loaders, options, defaults, fallbacks, and enabling
bundles. Account for hook cost, latency, and added shared code. Extract only
where the minimal bundle can omit code. Preserve HDR, OffscreenCanvas,
and public features, and document integration changes.

Acceptance requires fewer bytes in the minimal consumer, comparable total M8
size, a documented path to re-enable the feature, and tests of standard and
custom bundles.

### B3 — Package entry conditions

Verify that package conditions select their documented entries. Measure the
existing ESM/CJS `./lazy` exports as package entrypoints where consumers use
them. Verify browser entry resolution separately. Smoke-test distributed
ESM/CJS/browser packages before changing formats or conditional exports.

### B4 — Browser duplication and bootstrap

In M10, inventory duplicate engine and helper code in full bundles and
standalone features, namespace bootstrap, any Proxy, and external mappings.
Compare standalone bundles, shared engine with external plugins, and multiple
bundle combinations. A shared runtime can reduce full-page cost at the
expense of script ordering and version constraints. Record that tradeoff.

Acceptance requires two app-created engines, independent registrations,
explicit engine selection, and handling of repeated scripts and version
mismatches. Count full-page savings with equivalent feature coverage.

## Sequence and deliverables

Analyze B1 and B3 in 03, refine B2 with 05/07 and B4 with 09. Validate runtime,
package exports, and generators through 08/09. Attach before/after graphs,
build settings, budgets, a feature matrix, and migration notes. Update the
shared report and gate 10.
