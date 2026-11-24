# E9 — Distribution and support closure

Status: E9 verification complete on 2026-11-24. Installed consumers, three bundler builds,
real-browser HTTP/module runs, same-scene composition measurements, legacy
inventory, and cleanup are recorded. E9's source, installed-package, and local
browser-candidate gates pass. The public 4.6.0 CDN URLs still serve the earlier
legacy build; this is recorded as context and is not treated as the current
checkout's candidate behavior or as an E9/E10 gate. E10 remains open for final
budgets and the currently planned verification. Release and publication are
outside E0–E10.

## Support and legacy cleanup

- The E0 browser-policy snapshot uses Browserslist 4.29.5 and caniuse-lite
  1.0.30001819. Its `since 2021` query covers 97.079% usage. Applying the
  recorded `> 0.05%`, `not dead` candidate filter removes no current targets,
  so this increment keeps the existing browser policy.
- E1 retired the Vue 2, Nuxt 2, and Nuxt 3 wrappers, demos, and templates. The
  Chinese and Japanese demo indexes still advertised those variants; both
  active listings are corrected here. Historical references and migration
  guidance remain intentionally searchable.
- The package-level `@deprecated` symbols and their available replacements
  are inventoried in [deprecated-migrations.md](deprecated-migrations.md).
  Stencil's official v5 upgrade guide says to remove `applyPolyfills()` because
  the loader no longer exports it; callers that require registration before
  hydration await `defineCustomElements()` directly.

## Installed consumers

`installed-consumers.json` records an offline install of 13 local package
tarballs outside the workspace. Twelve installed-entry probes passed: engine
and Basic, root and `/lazy`, under ESM `import`, CJS `require`, and the
`browser` condition. The probes found no global writes, created independent
engines, registered a custom plugin, rejected a version mismatch, and compiled
strict TypeScript against installed declarations including module augmentation.
The PJS bundle intentionally has no `/lazy` export and was not used as a
consumer case.

## Bundlers and payloads

See [bundler-matrix.json](bundler-matrix.json) for raw, gzip, and Brotli
measurements and the comparison limits. Rollup and Rolldown both build the
Basic aggregate. Repeated script evaluation initially failed for Rollup and
Rolldown because the same IIFE redefined namespace properties, while Webpack
reassigned the public namespace object. Both issues are fixed: IIFEs use a
version-scoped `Symbol.for` marker to skip duplicate execution and Webpack
bundle entries preserve namespace identity. The initial check found Rolldown's
advertised minified output was not minified: 170,185 raw bytes versus Rollup's
120,609. Rolldown now uses its native output minifier. Final rebuilt files
measure 121,216 bytes for Rollup and 122,777 for Rolldown; the Rolldown delta
is 1,561 raw bytes (1.29%), 1,497 gzip bytes, and 1,247 Brotli bytes.

Webpack's generated bundle is split into an entry and chunks, so total page
cost includes each file. Both minified and unminified forms are measured in the
matrix. Chrome loaded the minified entry and all three emitted chunks over HTTP
and completed the same 100-particle scene. The analyzer warned that some
chunks could not be parsed. The external engine composition and complete
entry/chunk totals are included in [composition-comparison.json](composition-comparison.json).

## Browser and CDN checks

`browser-smoke.html` was run in desktop Chrome against local artifacts via
`file://` for Rollup, Rolldown, and Webpack. The rebuilt Rollup and Rolldown
outputs also passed the comprehensive browser script. It checks repeated
classic loads preserving the namespace, two engines remaining distinct, Basic and
Slim loaders work, each scene renders five particles, teardown leaves no
containers, version mismatch is rejected, and the page records no runtime
errors. Detailed results are in
[browser-smoke-results.json](browser-smoke-results.json). The IIFE changes were
made in response to failures observed in these real-browser checks.

`cdn-browser.json` records Chrome HTTP runs for the nine-file feature
candidate, the Rollup Basic module script, Webpack minified and unminified
standalone entries with every emitted chunk, and Webpack external Basic with a
shared engine and individual feature scripts. Each same-scene run returned 100
particles, destroyed its container, and reported no runtime errors. These runs
exposed missing `animation.utils` bootstrap namespaces for size and opacity;
Rollup and Rolldown now initialize them before evaluating IIFE dependencies.

The same browser check loaded the existing jsDelivr classic engine and Basic
URLs for version 4.6.0; both returned HTTP 200. That earlier runtime exposes
only `tsParticles.pluginManager`, not the checked-in `createEngine` factory.
Chrome also imported the existing engine and Basic `+esm` URLs; both returned
HTTP 200, but the engine module likewise lacks `createEngine`, and importing
it writes `tsParticles.pluginManager` onto `globalThis`. These URLs describe the
pre-existing release, not the candidate from this checkout. Candidate behavior
was verified from local HTTP outputs, installed tarballs, and browser runs.
Public delivery of the candidate is not part of E9/E10. Any future online-delivery
verification must be scoped in a separate plan after E10 and before a release
is considered. The standard Rollup product intentionally has no classic
lazy IIFE (`includeLazy: false` in E0 decision D0.7); package `/lazy` import,
require, and browser conditions passed the installed-consumer checks.

The local Basic IIFE was also loaded through a real `<script type="module">`
tag over HTTP; its factory was available and its 100-particle scene cleaned up.
The candidate and Basic runtime startup observations are recorded alongside
the matched payload sizes in [composition-comparison.json](composition-comparison.json).

Installed package condition tests pass. Browser evidence covers classic script
loading, a local module-script tag, and remote jsDelivr classic and `+esm`
entrypoints. The published remote formats fail the explicit factory contract;
the remote ESM import also writes a global. Startup samples are low-resolution
local observations per composition and exclude transfer and script evaluation;
they are not budgets.

## Verification run

- Basic Rollup build completed, including TypeScript, lint, circular dependency
  checks, and artifact generation. Basic Rolldown and Webpack bundle commands
  also completed; Webpack emits an entry plus three chunks.
- Nx build passed for eight bundle projects plus dependencies (153 dependency
  tasks; 161 total tasks including the selected projects).
- Nx CLI tests for Rollup, Rolldown, and Webpack passed after the fixes
  (3 files, 11 tests).
- The extended Chrome browser script passed two-engine isolation and lifecycle,
  repeated bundle loads, canvas transfer reuse, shared feature installation on
  both engines, and confetti/fireworks/particles/ribbons factories. See
  the [smoke summary](browser-smoke-results.json),
  [Rollup result](bundle-browser-rollup.json), and
  [Rolldown result](bundle-browser-rolldown.json).
- Nx build passed for Rollup and Rolldown plugins plus size/opacity updater
  packages after the animation namespace fix (4 projects, 19 dependency tasks).
- Desktop Chrome smoke passed for Rollup, Rolldown, and Webpack using local
  `file://` artifacts.
- Desktop Chrome HTTP smoke passed for the nine-artifact candidate in cold and
  warm runs (18 local HTTP 200 responses, 2 scenes, no runtime errors).
- Desktop Chrome loaded the local Basic bundle as a module script and completed
  the scene with cleanup.
- Desktop Chrome loaded the minified Webpack Basic entry and all three chunks
  over local HTTP; the same 100-particle scene passed and cleaned up.
- Desktop Chrome loaded the unminified Webpack Basic entry and all three chunks
  over local HTTP; the same scene passed and cleaned up.
- Desktop Chrome passed Webpack's external Basic loader with the standalone
  engine and all ten individual feature scripts (13 HTTP 200 requests).
- The documented remote jsDelivr classic and `+esm` engine and Basic URLs
  returned HTTP 200. The published engine fails the current contract
  (`createEngine` absent); classic and ESM formats expose or write the old
  `pluginManager` global. See [cdn-browser.json](cdn-browser.json).
- A same-scene payload/startup comparison is in
  [composition-comparison.json](composition-comparison.json). For this case the
  nine-file selective set is 20.51% larger than the Basic aggregate under gzip;
  measured runtime observations are diagnostic and exclude script transfer/eval.
- Installed-consumer verification passed again after the bundle source changes
  (13 package tarballs, 12 resolution/runtime conditions, strict TypeScript).
- The Rolldown plugin target built successfully after the fix; its build
  includes source formatting and linting.
- The installed-consumer probe passed (12 resolution/runtime conditions and
  strict TypeScript compile).

The complete workspace test suite and release budgets were not run as part of
this E9 checkpoint; the full suite and budgets remain in E10. CDN
cache/version behavior for future public delivery and any further supported
page combinations must be scoped before considering a release. These items are
outside the current E9/E10 gates.

## Remaining E9 gates

- Candidate classic, module-script, installed-package and browser paths are
  verified with local built artifacts. The existing public 4.6.0 classic and
  ESM URLs serve a different legacy artifact; their result is contextual only.
  Local HTTP classic, local module-script, and package `/lazy` conditions pass;
  classic CDN lazy is unsupported by the product policy.
- Extend the measured scene comparison only if additional bundle combinations
  become supported targets. E10 owns final budget acceptability.
- Stencil `applyPolyfills()` migration is resolved from the official v5 upgrade
  guide and recorded in the deprecated API inventory.
- E10 reconciles the browser outputs, package matrix, legacy inventory, and
  remaining budget items. After E10, define and agree any further pre-release
  validation before release is considered.
