# E10 checkpoint — 2026-11-24, updated 2026-11-25

E10 remains open and does not authorize a release. The latest callback-free
renderer follow-up passes all 30 runtime rows against unchanged E0 ceilings.
The remaining closure gates are physical HDR verification, native-language
review of the migration drafts, and consumer checks for the ten CLI framework
templates not yet covered below. Frozen E0 budgets remain unchanged.

## Reproduction

Run from the repository root. The browser harness uses installed Chrome with a
temporary headless profile; this environment required running Chrome and the
MCP loopback tests outside the filesystem sandbox.

```sh
NX_DAEMON=false NX_ISOLATE_PLUGINS=false NX_NO_CLOUD=true pnpm run build:ci
NX_DAEMON=false NX_ISOLATE_PLUGINS=false NX_NO_CLOUD=true pnpm nx run-many -t lint:ci prettify:ci --skipNxCache --output-style=static
NX_DAEMON=false NX_ISOLATE_PLUGINS=false NX_NO_CLOUD=true pnpm nx run @tsparticles/tests:test:ci --skipNxCache --output-style=static
pnpm nx run @tsparticles/mcp-server:test --skipNxCache --output-style=static
node .planning/handovers/evidence/tools/measure-e7-bundles.mjs .planning/handovers/evidence/e10
node .planning/handovers/evidence/tools/measure-runtime-factory.mjs .planning/handovers/evidence/e10
node .planning/handovers/evidence/tools/measure-runtime-extended-factory.mjs --output-dir=.planning/handovers/evidence/e10 --bundle=bundles/all/dist/tsparticles.all.bundle.min.js
node .planning/handovers/evidence/tools/measure-runtime-extended-factory.mjs --force-hdr --output-dir=.planning/handovers/evidence/e10 --bundle=bundles/all/dist/tsparticles.all.bundle.min.js
node .planning/handovers/evidence/tools/measure-e10-installed-package.mjs
node .planning/handovers/evidence/tools/measure-e10-runtime-control.mjs .planning/handovers/evidence/e10 --bundle=.planning/handovers/evidence/e6/draw-all.bundle.min.js.gz --file=runtime-e6-control.json
mkdir -p .planning/handovers/evidence/e10/e6-control
node .planning/handovers/evidence/tools/measure-runtime-extended-factory.mjs --output-dir=.planning/handovers/evidence/e10/e6-control --bundle=.planning/handovers/evidence/e6/draw-all.bundle.min.js.gz
node .planning/handovers/evidence/tools/measure-runtime-extended-factory.mjs --force-hdr --output-dir=.planning/handovers/evidence/e10/e6-control --bundle=.planning/handovers/evidence/e6/draw-all.bundle.min.js.gz
node .planning/handovers/evidence/tools/compare-e10-runtime-control.mjs
node .planning/handovers/evidence/tools/confirm-e10-quiet-runtime.mjs
node .planning/handovers/evidence/tools/measure-e10-runtime-control.mjs .planning/handovers/evidence/e10 --bundle=bundles/all/dist/tsparticles.all.bundle.min.js --file=runtime-e10-confirmation.json --repetitions=9 --cases=M3:1000,M4:500,M4:1000,M5:1000,M6:500,M6:1000,M8:1000
node .planning/handovers/evidence/tools/measure-e10-runtime-control.mjs .planning/handovers/evidence/e10 --bundle=.planning/handovers/evidence/e6/draw-all.bundle.min.js.gz --file=runtime-e6-confirmation.json --repetitions=9 --cases=M3:1000,M4:500,M4:1000,M5:1000,M6:500,M6:1000,M8:1000
node .planning/handovers/evidence/tools/compare-e10-runtime-confirmation.mjs
node .planning/handovers/evidence/tools/measure-runtime-extended-factory.mjs --output-dir=.planning/handovers/evidence/e10 --file=runtime-extended-e10-confirmation.json --repetitions=9 --bundle=bundles/all/dist/tsparticles.all.bundle.min.js
node .planning/handovers/evidence/tools/measure-runtime-extended-factory.mjs --force-hdr --output-dir=.planning/handovers/evidence/e10 --file=runtime-extended-hdr-e10-confirmation.json --repetitions=9 --bundle=bundles/all/dist/tsparticles.all.bundle.min.js
node .planning/handovers/evidence/tools/measure-runtime-extended-factory.mjs --output-dir=.planning/handovers/evidence/e10/e6-control --file=runtime-extended-e6-confirmation.json --repetitions=9 --bundle=.planning/handovers/evidence/e6/draw-all.bundle.min.js.gz
node .planning/handovers/evidence/tools/measure-runtime-extended-factory.mjs --force-hdr --output-dir=.planning/handovers/evidence/e10/e6-control --file=runtime-extended-hdr-e6-confirmation.json --repetitions=9 --bundle=.planning/handovers/evidence/e6/draw-all.bundle.min.js.gz
node .planning/handovers/evidence/tools/compare-e10-extended-confirmation.mjs
node .planning/handovers/evidence/tools/screen-e10-budgets.mjs
NX_DAEMON=false NX_ISOLATE_PLUGINS=false NX_NO_CLOUD=true pnpm nx run-many -t test --skipNxCache --output-style=static
node .planning/handovers/evidence/tools/check-e10-generated-consumer.mjs
node .planning/handovers/evidence/tools/check-e10-cli-scaffold.mjs
node .planning/handovers/evidence/tools/check-e10-cli-scaffold.mjs --framework=react
node .planning/handovers/evidence/tools/check-e10-cli-scaffold.mjs --framework=vue3
node .planning/handovers/evidence/tools/check-e10-cli-scaffold.mjs --framework=solid
node .planning/handovers/evidence/tools/check-e10-cli-scaffold.mjs --framework=lit
node .planning/handovers/evidence/tools/check-e10-cli-scaffold.mjs --framework=jquery
node .planning/handovers/evidence/tools/check-e10-cli-scaffold.mjs --framework=svelte
node .planning/handovers/evidence/tools/check-e10-cli-scaffold.mjs --framework=webcomponents
node .planning/handovers/evidence/tools/check-e10-cli-scaffold.mjs --framework=riot
node .planning/handovers/evidence/tools/check-e10-cli-scaffold.mjs --framework=astro
node .planning/handovers/evidence/tools/measure-e10-runtime-control.mjs .planning/handovers/evidence/e10 --bundle=bundles/all/dist/tsparticles.all.bundle.min.js --file=runtime-callback-fastpath-confirmation.json --repetitions=9 --cases=M3:100,M3:500,M3:1000,M4:100,M4:500,M4:1000,M5:100,M5:500,M5:1000,M6:100,M6:500,M6:1000,M7:100,M7:500,M7:1000,M8:100,M8:500,M8:1000
node .planning/handovers/evidence/tools/measure-runtime-extended-factory.mjs --output-dir=.planning/handovers/evidence/e10 --file=runtime-extended-callback-fastpath-confirmation.json --repetitions=9 --bundle=bundles/all/dist/tsparticles.all.bundle.min.js
node .planning/handovers/evidence/tools/measure-runtime-extended-factory.mjs --force-hdr --output-dir=.planning/handovers/evidence/e10 --file=runtime-extended-hdr-callback-fastpath-confirmation.json --repetitions=9 --bundle=bundles/all/dist/tsparticles.all.bundle.min.js
node .planning/handovers/evidence/tools/compare-e10-extended-confirmation.mjs --candidate-sdr=.planning/handovers/evidence/e10/runtime-extended-callback-fastpath-confirmation.json --candidate-hdr=.planning/handovers/evidence/e10/runtime-extended-hdr-callback-fastpath-confirmation.json --output=.planning/handovers/evidence/e10/runtime-extended-callback-fastpath-comparison.json
node .planning/handovers/evidence/tools/summarize-e10-callback-fastpath.mjs
python3 -m http.server 8765 --bind 127.0.0.1
# In another terminal, run against the live built engine exposed at /engine/dist/esm:
node .planning/handovers/evidence/tools/check-e10-color-browser.mjs
```

The first sandboxed `build:ci` run completed 455 of 457 tasks: Angular aborted
inside the sandbox, and Electron's `pnpx` command attempted a network fetch.
After changing Electron to use the installed local packager binary and fixing
the MCP TypeScript error found by the next run, the full workspace build passed
outside the sandbox: 457/457 tasks succeeded, 14 from cache, in 13m51s. The
Angular and Electron failures were environmental; the MCP TypeScript error was
corrected and rechecked in its target build.

## Results

- Main runtime: 54 runs across M3–M8 in Chrome 158.0.8127.38, seeded RNG,
  three repetitions and no browser errors.
- Extended runtime: 18 SDR runs and 18 forced-HDR runs. Each reports zero
  remaining containers, stable RNG counts and no listener or DOM growth during
  the measured lifecycle/retention checks. The canvas accepted Display-P3 and
  float16; this does not verify physical HDR luminance.
- The earlier bundle/runtime checkpoint in `budget-screen.json` evaluates
  unchanged E0 ceilings. Current absolute comparison: 2 size rows pass, 17
  fail (including all 3 CJS rows) and 0 are pending; 28 of 30 runtime rows pass
  and 2 fail. The initial
  three-repetition flags remain recorded alongside the nine-repetition
  confirmations. CJS sizes come from a fresh isolated install of the packed
  E10 engine. The callback-free renderer follow-up below supersedes that
  checkpoint's 28/30 runtime result.
- Matched runtime control covers all 30 rows in Chrome 158 using the preserved
  E6 bundle and the same harness as E10. The E6 artifact is a pre-E7 control,
  not the E0 source revision. The comparison records both control and candidate
  medians, dispersion samples, and unchanged E0 ceilings in
  `runtime-control-comparison.json`.
- Nine-repetition confirmations measured the seven first-pass main-runtime
  flags against E0 and a same-browser E6 control. All seven candidate medians
  now pass their original E0 rows; the first-pass samples and `initialStatus`
  remain in `budget-screen.json`, with the confirmation source linked per row.
  The separate quiet M4/500 check reports candidate/control update 3.70/3.70
  ms, draw 2.40/2.40 ms, and frame p95 7.60/7.60 ms. Update remains over E0
  3.52 ms and frame p95 remains over the recorded E4/E5 6.50/7.15 ms references.
  See `runtime-quiet-confirmation.json`.
  The extended SDR/HDR confirmation measured all 12 rows with nine repetitions
  per candidate/control case and repeated retention checks. Two M6/500 frame
  p95 medians remain above E0: SDR 1.90 ms and HDR 2.20 ms against 1.87 ms.
  The matched E6 values are 1.90/2.30 ms, so the candidate ties SDR and improves
  HDR but does not pass either absolute ceiling. The final runtime screen is 28
  pass, 2 fail, 0 pending; no threshold is waived.
  An additive 21-repetition candidate-only confirmation reproduced the same
  M6/500 medians: 1.90 ms SDR and 2.20 ms HDR. HDR again used a Display-P3,
  float16 context; both runs had no page errors, removed all containers, stable
  DOM counts and stable RNG counts. The individual samples are in
  `runtime-21/runtime-extended-e10-21.json` and
  `runtime-21/runtime-extended-hdr-e10-21.json`; this does not alter the fixed
  E0 limits or clear either runtime row.
- Full Nx test matrix: all 85 projects passed with cache disabled. This includes
  the primary suite (61 files / 959 tests), MCP suite (11 files / 270 tests),
  CLI generators, wrappers and browser-based demos. The first sandboxed matrix
  had four `listen EPERM` failures; all passed on the unsandboxed rerun.
- MCP server build passed after the final TypeScript fix; the full `build:ci`
  also passed for all 457 tasks.
- Nx `lint:ci` and `prettify:ci`: 38 projects passed. Remaining ESLint output
  contains 115 warnings in MCP TSDoc and three warnings in the CLI create-app
  prompts; there are no lint errors. The MCP build target passes after the
  final type correction.
- E9 installed-package and browser/CDN evidence remains the recorded evidence
  for framework/package conditions and real-browser distribution. The MCP
  vanilla TypeScript example has been compiled and run from 13 extracted
  package tarballs in an isolated consumer. The CLI Vanilla scaffold was
  generated, type-checked, production-built, and started in Chrome from 41
  extracted package tarballs. All ten checked framework scaffolds pass the same
  consumer checks from their packed local package graphs. See
  `generated-consumer.json` and `cli-*-scaffold.json`. The checked frameworks
  are Astro, jQuery, Lit, React, Riot, Solid, Svelte, Vanilla, Vue 3 and Web
  Components. The remaining scaffold templates are Angular, Angular Confetti,
  Angular Fireworks, Ember, Inferno, Next.js, Nuxt 4, Preact, Qwik and Stencil.
  Their generated-consumer checks and native-language migration-draft review
  remain open. G1–G7 source review dispositions were collected and closed in
  E8.
  The [architecture reconciliation](../../V5-ARCHITECTURE-DECISIONS.md#e10-evidence-reconciliation--2026-11-24)
  links the four decisions to their consumer evidence. The
  color report is recorded. At this checkpoint C5 remained open for two
  extended runtime E0 exceedances and broader browser/hardware gates; the
  callback-free follow-up below clears the runtime rows. Physical HDR remains
  open. Size ceilings remain
  diagnostic references under the updated E10 acceptance criterion.

## Legacy retirement and translation review

- The source scan found no tracked Vue 2, Nuxt 2 or Nuxt 3 wrapper, demo or
  starter directories. The remaining Vue 2 issue contact was removed. The
  installer retains an upgrade message for applications that already depend on
  `vue2-particles`; WordPress retains its historical changelog entry.
- A rerun of `check-retired-templates.mjs` passed for
  [all nine packed template families](template-packages.json). The built engine
  and bundle scan found the retired integration name only in the installer's
  upgrade message. The built engine still checks for
  `transferControlToOffscreen`; the recorded E0/E9 Browserslist policy remains
  in force.
- The English documentation and nine locale trees were searched for legacy
  wrapper names and engine initialization patterns. The wrapper-name scan is
  clear. Wrapper API examples outside the guides verified below still require
  migration review.
- Documentation disposition: the default and nine localized Vanilla guides
  are byte-identical copies, and their CDN examples explicitly pin the still
  published v4 packages (`@4`). The generated TypeDoc site also identifies a
  v4 prerelease. These examples document the current v4 API and are preserved
  until v5 is published; they must not be mistaken for v5 consumer validation.
  The planning migration guide remains a draft and has no translated or
  published v5 counterpart yet, so that release-documentation gate stays open.
- The React Confetti example now registers the preset through
  `ParticlesProvider` on the explicit engine. The replacement is identical and
  transpiles as JSX in all ten locale copies. The snippet also passes strict
  TypeScript checking against the built engine, React wrapper and preset
  declarations. The rebuilt preset passed its 43-task Nx dependency build after
  correcting missing `override` modifiers in the emitter interactor. A Chrome
  158 run of the guide example mounted one canvas, started 50 particles and
  recorded no page or console errors. Reproduce the package build with
  `NX_DAEMON=false NX_ISOLATE_PLUGINS=false NX_NO_CLOUD=true pnpm nx run @tsparticles/preset-confetti:build --skipNxCache --output-style=static`,
  then run `node .planning/handovers/evidence/tools/check-e10-react-confetti.mjs`.
  The browser result is in `react-confetti.json`.
- The maintained React demo passed its Nx production build (62 tasks, 13
  cached). A headless Chrome smoke test against the built static artifact
  mounted exactly one particle canvas and recorded no page or console errors.
  Reproduce with `NX_DAEMON=false pnpm nx run @tsparticles/react-demo:build`
  followed by `node .planning/handovers/evidence/tools/check-e10-react-demo.mjs`;
  the result is in `react-demo.json`. This verifies the React wrapper demo; it
  complements the Confetti example run recorded above.
- The Web Components demo passed its Nx CI build (21 tasks). Chrome 158 loaded
  the full bundle and wrapper, assigned the explicit engine to `<web-particles>`,
  and mounted one canvas without page or console errors. The smoke test maps
  both `webcomponentsjs` CDN scripts to the installed local package and
  records zero external requests. Reproduce with
  `NX_DAEMON=false NX_ISOLATE_PLUGINS=false NX_NO_CLOUD=true pnpm nx run @tsparticles/webcomponents-demo:build:ci --skipNxCache --output-style=static`
  followed by `node .planning/handovers/evidence/tools/check-e10-webcomponents.mjs`;
  the result is in `webcomponents-demo.json`.
  The wrapper's Nx test target also passes all 9 tests with cache disabled.
- E10 removed the deprecated engine `getStyleFromRgb()` and `getStyleFromHsl()`
  helpers, HSV `getStyleFromHsv()`, and the OKLCH plugin's local
  `getStyleFromOklch()` formatter. Workspace source had no runtime callers.
  Consumers now resolve to canonical OKLCH and use the engine's destination-
  aware formatter. The clean engine build reduced its measured bundle by 854
  bytes. Both color plugin targets pass (24 OKLCH tests, 11 HSV tests), and the
  primary Nx suite passes 946 tests across 61 files. The selected full package
  build passed 420 tasks; three interactor failures were fixed and rebuilt.
  The first sandboxed Next.js build could not fetch Google Fonts; its authorized
  retry passed. After rebuilding the publishable packages, the installed
  engine probe passed all six ESM/CJS/browser root and
  lazy conditions. The E10 bundle report and budget screen were regenerated
  from these artifacts: 2 size rows pass, 17 remain over the diagnostic E0
  ceilings, and none are pending; runtime was 28 pass and 2 fail at that
  checkpoint. `budget-screen-callback-fastpath.json` records the later 30/30
  runtime follow-up.
- All eight Qwik guide examples now create and initialize their explicit engine
  in a client task and keep it in a `noSerialize` signal. The lazy example
  imports Full inside that task, and the callback example uses the wrapper's
  `loaded` prop. All ten locale copies match and the eight snippets pass
  strict TypeScript checking against the built Qwik, engine and Full package
  declarations. The lazy example also passed a Qwik/Vite production build and
  mounted its canvas in headless Chrome over local HTTP without page errors.
- The Riot and Ember web guides now supply an explicit engine to the
  initializer and component in all ten locale copies. All six Riot examples
  compile; the full example passed a Vite production build and mounted its
  canvas in headless Chrome without page errors. The six Ember TypeScript
  snippets pass strict checking against the addon initializer and built engine
  and Full declarations. All five Ember templates parse with Glimmer.
  The Ember demo also passes its production build and Chrome 158 smoke test: two
  canvases render initially; switching configuration and theme works; enabling
  Confetti creates a third canvas; no page or console errors occur. Reproduce
  with `NX_DAEMON=false NX_ISOLATE_PLUGINS=false NX_NO_CLOUD=true pnpm nx run @tsparticles/ember-demo:build:ci --skipNxCache --output-style=static`
  followed by `node .planning/handovers/evidence/tools/check-e10-ember-demo.mjs`.
  The result is in `ember-demo.json`. The individual guide snippets have not
  all been exercised as a generated Ember app.
- Removed the deprecated Confetti `particleCount`/normalized `origin` aliases
  and the Ribbons `particleCount`/`origin`/`position` aliases, including loader
  fallbacks and class accessors. Migrated the vanilla demo, maintained English
  guides and all translated active examples to `count`, percent-based
  Confetti `position`, and Ribbons `positionX`. E9's deprecated API inventory
  now records these removals and migration paths. Nx builds passed for the
  Confetti and Ribbons packages, and the two existing bundle test files passed
  all four tests. Generated declarations contain none of the removed aliases.
  A broader local test run passed 816 tests but could not load six files because
  their unrelated workspace packages were not built; the earlier full E10 Nx
  matrix remains recorded above. Ribbons' generated minified bundle decreased
  by 916 bytes from the previous build; Confetti's clean build had no previous
  artifact available for a like-for-like size comparison. V5-LEG remains open for the retained deprecated PJS compatibility API and
  the Stencil v4 loader declaration; the Stencil wrapper must move to v5 before
  `applyPolyfills()` can be removed from generated output.
- Migrated the Confetti website examples from deprecated `particleCount` and
  normalized `origin` to `count` and percent-based `position`, preserving their
  coordinates with a conversion helper. The Confetti website Nx CI build passed
  all 284 tasks in 6m51s. A local Chrome 158 run rendered a canvas, exercised
  cannon, fireworks, snow and continuous modes, and recorded no page errors.
  A repeatable smoke check now serves only the built local artifact and aborts
  every external request before dispatch. It exercised cannon, fireworks, snow
  and continuous modes with one or two canvases, no page errors and no app
  console errors. The blocked origins were Google Fonts, Google Ads, Google
  Analytics and the external particles.js.org favicon; no navigation data was
  sent to them. Reproduce the build with
  `NX_DAEMON=false NX_ISOLATE_PLUGINS=false NX_NO_CLOUD=true pnpm nx run @tsparticles/confetti-website:build:ci --skipNxCache --output-style=static`,
  then run `node .planning/handovers/evidence/tools/check-e10-confetti-website.mjs`.
  The result is in `confetti-website.json`.

## Budget status

### Interactor lifecycle optimization

A Chrome CPU profile of 12 M6/500 runs found repeated work in the
particle reset dispatcher, including enablement checks for built-in
interactors with empty reset hooks. The manager now selects reset and
external clear hooks after initialization and reuses those lists each
frame. Custom hooks still run in the original order and evaluate live
enablement. The light interactors retain their reset-phase checks because
those checks sample colors.

The table compares the previous and rebuilt production All bundles in
Chrome 158, with nine repetitions per case and stable DOM and RNG checks.
The E0 ceiling applies to frame p95.

| Scenario   | Control update | Candidate update | Control p95 | Candidate p95 | E0 p95 ceiling |
| ---------- | -------------: | ---------------: | ----------: | ------------: | -------------: |
| M6/500 SDR |           0.90 |             0.60 |        2.00 |          1.70 |           1.87 |
| M6/500 HDR |           0.90 |             0.60 |        2.40 |          1.90 |           1.87 |
| M8/500 SDR |           0.70 |             0.40 |        1.50 |          1.20 |           1.65 |
| M8/500 HDR |           0.70 |             0.50 |        1.50 |          1.40 |           1.54 |

All times are milliseconds. Candidate M6/500 HDR p95 samples were 1.80,
1.90, 1.90, 1.90, 1.90, 2.00, 2.00, 2.00 and 2.20 ms. The median is
0.03 ms over the original E0 ceiling.
The other 11 extended runtime rows meet all three of their E0 ceilings.

The nine-repetition quiet M4/500 run against the archived E6 control measured
3.40 ms update and 2.50 ms draw, within E0's 3.52 and 2.53 ms ceilings,
respectively. Frame p95 was 7.10 ms against the E4 reference of 6.50 ms and
the E5 screening value of 7.15 ms. The archived E5 scope exception remains
recorded.

Reproduce using `measure-runtime-extended-factory.mjs` with
`--repetitions=9` for both bundles, once with `--force-hdr` and once without.
Use `confirm-e10-quiet-runtime.mjs` for M4/500, writing its output separately
from the archived checkpoint.

The interactivity plugin and 22 affected interaction packages built
successfully, followed by Slim, Full and All. The primary Nx suite passed
960 tests across 61 files, including a regression test for hooks installed
during initialization and for live enablement.

The local color fixture now has interactive runs in Firefox 138.0.1 and
Safari 27.2. Firefox passed 4/8 strict cases; four P3/HDR cases failed because
requested Display-P3 contexts reported sRGB and float16 was unavailable. Safari
passed 5/8: P3 SDR cases passed, while the three float16 HDR cases failed. The
fixture's Firefox HDR luminance comparison is not valid for its sRGB readback.
A separate end-to-end smoke loads the All bundle in both browsers and verifies
that the engine creates one canvas with `outputColorSpace: "srgb"` and
`hdr: false` when the host reports neither P3 gamut nor high dynamic range. The
engine-level fallback passes in Firefox and Safari; extended-range output and
physical HDR presentation remain unverified. Exact observations are recorded in
`browser-color-matrix.json`; reproduce with a local HTTP server and
`color-context-fallback.html`.

### Size disposition under the updated criterion

The user accepts payload growth attributable to required functionality. The
absolute E0 size comparisons below remain as recorded diagnostics. Runtime and
retention have their existing acceptance criteria.

- Minimal ESM emits four chunks and retains 104 unique module identities,
  the same module count as the baseline. The factory and lazy factory each
  emit three chunks with 73 unique modules. The minimal graph contains no
  All bundle or preset package. Browser consumer sizes match ESM.
- Standalone Slim includes one engine plus its selected features. E4 to E5 is
  the largest observed growth interval. The packed CJS module comparison
  points to canonical color conversion and rendering as material contributors
  (`OklchUtils` adds 1,877 gzip bytes and `ColorUtils` adds 1,748), alongside
  the spatial grid and engine-scoped registration. Those per-file figures
  characterize the installed CJS graph.
- Installed CJS keeps both root and lazy entrypoints at 70 acquired modules.
  The full shipped graph went from 153 to 161 modules. The deprecated RGB
  mixer removal saves 200 gzip bytes in each packed CJS scenario.
- The refreshed minimal CDN composition still uses nine requests and totals
  44,733 gzip / 38,668 Brotli bytes, up from E0's 35,441 / 31,633 and down
  188 / 140 from the original E10 checkpoint. Rollup reports no repeated
  rendered module identities across the nine scripts. The report tracks
  module identities. The known duplicated Display-P3 conversion was removed
  separately in source.

The measured shapes and identified contributors satisfy the current size
criterion. See [the E9 composition report](../e9/composition-comparison.json)
and the follow-up measurements below.

The pure helper remains unchanged. The import/browser factory, initialization,
minimal scene, lazy entry, engine, Basic, Slim, Full, All and minimal CDN page
currently exceed their frozen gzip and Brotli ceilings. The measured candidate
sizes, byte deltas, ratios and scenario-level status are in `budget-screen.json`
and `bundle-sizes.json`. No budget is waived by this checkpoint.

### Size growth across checkpoints

Archived sizes in bytes (gzip / Brotli). The factory column uses E0 singleton
acquisition as the original budget reference and explicit factory acquisition
from E1 onward. All rows use Node 26.13.0, Rollup 4.67.4, gzip level 9 and
Brotli quality 11.

| Checkpoint                 | Import factory  | Import minimal  | Engine distribution | Slim distribution |
| -------------------------- | --------------- | --------------- | ------------------- | ----------------- |
| E0                         | 22,665 / 20,052 | 28,451 / 25,355 | 24,671 / 21,953     | 47,524 / 41,231   |
| E1                         | 22,673 / 20,091 | 28,547 / 25,465 | 24,816 / 22,063     | 47,705 / 41,364   |
| E3                         | 23,059 / 20,504 | 29,045 / 25,995 | 26,627 / 22,969     | 48,225 / 41,758   |
| E4                         | 23,146 / 20,572 | 29,210 / 26,143 | 26,714 / 23,066     | 48,405 / 41,884   |
| E5 closure                 | 25,613 / 22,617 | 31,899 / 28,418 | 31,190 / 26,655     | 53,704 / 46,210   |
| E7 candidate               | 26,904 / 23,755 | 33,182 / 29,534 | 32,496 / 27,741     | 55,000 / 47,202   |
| E10 checkpoint             | 26,904 / 23,755 | 33,182 / 29,534 | 32,578 / 27,776     | 55,103 / 47,284   |
| E10 excess over E0 ceiling | +3,786 / +3,302 | +6,154 / +5,447 | +7,414 / +5,384     | +9,956 / +8,115   |

E4 to E5 closure is the largest interval in each column. The archived
checkpoints include multiple source changes per interval, so the table
locates the growth without assigning a byte cost to any single feature.
The matched E7 source-override experiment isolates a smaller increase of
144 gzip bytes for factory acquisition and 130 for the minimal consumer.
The override applies only to consumer bundles. See the [E5 closure payloads](../e5/closure/payloads/),
[E7 control](../e7/payloads-baseline/bundle-sizes.json), and
[E7 candidate](../e7/payloads-candidate/bundle-sizes.json).

### Terser compression probe

Ran the existing consumer harness twice on the same local compiled artifacts,
first with the default Terser options and then with `compress.passes: 3`.
The default run reproduced the archived E10 consumer totals. Import and
browser totals were identical within each run. The table shows the change
from default options, in bytes, summed over every emitted chunk.

| Consumer       | Minified | Gzip | Brotli |
| -------------- | -------: | ---: | -----: |
| Pure helper    |        0 |    0 |      0 |
| Factory        |     −103 |  −29 |    −66 |
| Initialization |     −103 |  −31 |    −43 |
| Minimal scene  |     −132 |  −20 |    +16 |
| Lazy factory   |     −103 |  −28 |    −49 |

Every previously failing consumer still exceeds its E0 ceilings. The
experiment covers consumer bundles only. The production minifier settings
stay at their defaults. To reproduce the probe without overwriting evidence:

```sh
probe_dir=$(mktemp -d)
harness=.planning/handovers/evidence/tools/measure-e7-bundles.mjs
sed 's/terser()/terser({ compress: { passes: 3 } })/' "$harness" > "$probe_dir/passes3.mjs"
node "$harness" "$probe_dir/default"
node "$probe_dir/passes3.mjs" "$probe_dir/passes3"
```

Compare `consumers[].minTotal` in the two generated `bundle-sizes.json` files.

### Engine color changes after the checkpoint

The engine now reuses its sRGB-to-P3 conversion for OKLCH output, keeping the
original transfer functions and extended channel values. The deprecated
RGB-returning `colorMix()` export was removed. Its replacement and output
conversion are documented in the [migration guide](../../V5-MIGRATION.md#deprecated-apis).

A matched Rollup/Terser probe of the built engine browser entrypoint swapped
only the two color utility modules for their TypeScript source, stripped with
Node. Both IIFEs exposed `colorMixOklch()`; only the control exposed
`colorMix()`. The candidate shrank from 98,021 to 97,526 bytes minified, from
32,536 to 32,350 gzip, and from 27,714 to 27,617 Brotli. This probe uses its
own IIFE wrapper. The archived distribution and consumer budget screen above
remains the original checkpoint.

The production Rollup rebuild of Engine, Basic, Slim, Full and All and a fresh
offline engine install measured the following compressed sizes. Deltas are
relative to the archived E10 checkpoint. Root and lazy acquisitions share the
same measured CJS size, with different E0 ceilings.

| Scenario               | New gzip | New Brotli | Delta gzip / Brotli | E0 ceiling gzip / Brotli |
| ---------------------- | -------: | ---------: | ------------------: | -----------------------: |
| Import/browser factory |   26,894 |     23,743 |           −10 / −12 | 23,118 / 20,453 (import) |
| Import/browser minimal |   33,169 |     29,524 |           −13 / −10 | 27,028 / 24,087 (import) |
| Engine                 |   32,390 |     27,636 |         −188 / −140 |          25,164 / 22,392 |
| Basic                  |   37,103 |     32,381 |         −174 / −115 |          30,873 / 27,283 |
| Slim                   |   54,916 |     47,158 |         −187 / −126 |          45,147 / 39,169 |
| Full                   |   66,912 |     56,972 |         −179 / −220 |          60,133 / 51,734 |
| All                    |  127,837 |    103,526 |           −191 / −9 |         118,266 / 96,434 |
| CJS root               |   34,999 |     30,489 |         −200 / −158 |          30,594 / 26,477 |
| CJS lazy               |   34,999 |     30,489 |         −200 / −158 |          30,606 / 26,483 |
| CJS shipped            |   60,641 |     52,245 |         −200 / −158 |          54,213 / 46,456 |

Of the 18 rows in the table's consumer, distribution and installed graphs,
both pure-helper rows meet the E0 reference and the other 16 exceed it. The
CDN composition was also remeasured above. All six
installed root/lazy ESM, CJS and browser probes passed and verified the retired
export is absent, its replacement is available, and the engine version is
resolved. The engine compiled for ESM, CJS, browser and declarations. The
primary Nx test suite passed all 959 tests across 61 files after generating
the distribution metadata and substituting the version placeholder.

A separate prototype converted directly through linear light. Across 720
sample colors, the largest channel difference was below 2e-13 and mapped
chroma was identical. Despite a roughly twofold improvement in the isolated
mapping loop, a three-repetition Chrome 158 forced-HDR run showed median
frame p95 increasing from 1.40 to 1.60 ms for M8/500 and from 2.10 to 2.30 ms
for M6/500. The prototype was dropped. These exploratory measurements use
matched temporary All bundles and do not replace the existing E0 budget rows.

The rebuilt production All bundle also completed the extended Chrome 158
run in SDR and forced HDR, with no page errors, retained containers or DOM
growth. Median M6/500 frame p95 was 2.10 ms SDR and 2.40 ms HDR against the
1.87 ms ceiling. Median M8/500 was 1.50 ms in both modes, within its SDR/HDR
ceilings of 1.65/1.54 ms. There were three repetitions per case; these results
are a follow-up to the archived nine-repetition confirmation. The forced-HDR
run exercises Display-P3 and float16 Canvas2D rendering.

The original three-repetition screen flagged nine runtime rows. Selective
nine-repetition confirmation clears the seven main-matrix flags; both remaining
M6/500 SDR/HDR extended frame p95 rows exceed E0. The per-row first-pass values,
confirmation samples, matched E6 values, and fixed ceilings are in
`budget-screen.json`, `runtime-confirmation-comparison.json`, and
`runtime-extended-confirmation-comparison.json`. E0 used Chrome 157; candidate
and matched controls use Chrome 158. The E6 comparison informs attribution but
does not replace E0 acceptance thresholds.

### M6 particle-transform hook dispatch

The M6/500 profile found 13 container plugins but only one plugin implementing
`drawParticleTransform`. `RenderManager` now builds a transform-hook list during
plugin initialization and visits that list in the per-particle draw path,
avoiding the previous scan of all container plugins for every particle. The
focused `RenderingLifecycle.ts` suite passes (15 tests), and the rebuilt All
bundle SHA-256 is `ba134cd8979b8b17a4b506560098592ee98a3d64f42d9e40e23cfdd992dbf615`.

A matched 21-repetition Chrome 158 comparison changes only that dispatch loop;
all other built candidate code is identical. Median M6/500 frame p95 improved
from 1.8 to 1.7 ms in SDR and from 2.2 to 1.9 ms in forced HDR. The SDR median
is within the fixed 1.87 ms E0 ceiling; HDR remains 0.03 ms over it. Candidate
and control raw results are in `drawhook-ab/`; the sampled Chrome profile is in
`m6-cpu-profile.json` with its compressed DevTools profile alongside it. This
does not close the M6 HDR performance gate.

A follow-up Chrome 158 experiment replaced only the renderer's
`resetTransform()` call with the equivalent identity `setTransform(...)` call.
Across 21 forced-HDR repetitions, the current bundle median was 2.0 ms and the
variant median was 1.9 ms; both sample ranges overlap broadly and the variant
does not clear 1.87 ms. The profile identifies transform reset as a hot path,
but it restores the context contract after shape/plugin callbacks and exceptions.
The experiment is not adopted; bundle hashes, raw samples, and the compressed
variant are in `drawhook-ab/reset-transform-ab/`.

After the engine change, all 85 Nx test targets were attempted: the 61 Vitest
files passed (946 tests), and the four local-server Karma/MCP targets that
could not bind inside the sandbox passed on an authorized retry. In the broad
build, 232 of 235 project targets passed. Electron, Angular and Next.js demo
builds passed with an authorized retry across those projects and 91 dependency
tasks; Angular reported its existing component-style budget warning. The
refreshed engine package probes all pass; current distribution and
installed-package sizes are recorded in `bundle-sizes.json` and
`installed-package.json`.

The vanilla MCP-generated consumer and CLI scaffold were re-extracted from the
fresh package builds and rechecked after the renderer change. The MCP consumer
passed strict TypeScript and mounted one canvas in headless Chrome from 13
package tarballs. The CLI scaffold check now covers Vanilla, React, Vue 3, Solid,
Lit, Svelte, Web Components, Riot, Astro and jQuery. All ten pass framework-appropriate
type checking, production build and headless Chrome initialization with one
canvas and no browser or console errors. Vue 3 uses `vue-tsc`; Svelte uses
`svelte-check`; Astro uses `astro check`; other frameworks use TypeScript. The
Web Components consumer check found and fixed a scaffold issue: its custom
element had no options, so it initialized without a canvas. Riot's consumer
check found missing public TypeScript declarations and missing scaffold
component registration/engine state. The wrapper now ships declarations, and
the scaffold registers the component with its owning engine. The Astro check
found a missing component in its scaffold and that the wrapper failed to pass
its host element to the engine, resulting in a duplicate canvas; both are
fixed. The Riot and Astro wrapper Nx test targets pass. Results are in
`cli-*-scaffold.json`. The jQuery check exposed an ESM/UMD global mismatch:
the generated app imported jQuery as an ES module but loaded a wrapper bundle
that expects `window.jQuery`. The scaffold now binds that instance before
dynamically importing the plugin. Its isolated typecheck, production build and
Chrome smoke pass; the result is in `cli-jquery-scaffold.json`. Other generated
framework combinations remain open.

First-pass drafts for all nine supported locales are in `migration-drafts/`.
`check-migration-draft-alignment.mjs` confirms each section hierarchy and all
five code examples match the English source exactly and that local Markdown
links resolve. Native-language review remains open; no translated guide was
added to the published website.

All three CJS size scenarios exceed their original ceilings:

| CJS package graph      |  Raw B |  Min B | Gzip B | Brotli B | Gzip ceiling B | Brotli ceiling B |
| ---------------------- | -----: | -----: | -----: | -------: | -------------: | ---------------: |
| Root acquisition       | 153063 |  97004 |  35199 |    30647 |          30594 |            26477 |
| Lazy acquisition       | 153063 |  97004 |  35199 |    30647 |          30606 |            26483 |
| Full shipped CJS graph | 287481 | 159646 |  60841 |    52403 |          54213 |            46456 |

The root acquisition is +4,605 gzip / +4,170 Brotli bytes over the E0 ceiling;
lazy is +4,593 / +4,164; full shipped CJS is +6,628 / +5,947. The earlier
two extended runtime failures and quiet M4/500 sample are archived above; the
current callback-free follow-up below passes all E0 runtime rows. The original
ceilings and E5/E7 acceptance scope remain in force.

### Callback-free per-particle drawing follow-up

The sampled profile also showed per-particle calls passing a fresh callback to
`draw()`. `RenderManager.drawParticle` now reads its owned context directly,
retaining the missing-context return, nested context save/restore and
`try/finally` cleanup. This removes one callback allocation per drawn particle.

The rebuilt All bundle has SHA-256
`6c904d8a18208395e00c457fb84305b4caaf46059fa68bc6dff4af960fda52d4`. Its
nine-repetition Chrome 158 follow-up passes 18/18 main runtime rows and 12/12
extended rows against unchanged E0 ceilings. M6/500 frame p95 is 1.5 ms SDR
and 1.8 ms forced HDR against 1.87 ms; the matched E6 medians are 1.9 and 2.3
ms. M8/500 is 1.1 ms SDR and 1.2 ms forced HDR, within 1.65/1.54 ms. The
current per-row summary is `budget-screen-callback-fastpath.json`; raw samples
are in `runtime-callback-fastpath-confirmation.json`,
`runtime-extended-callback-fastpath-confirmation.json` and
`runtime-extended-hdr-callback-fastpath-confirmation.json`. All validation
flags pass: no page errors, stable RNG counts and DOM, and no retained
containers.

The fresh quiet M4/500 comparison also passes E0 update (3.30 ms / 3.52 ms)
and render (2.40 ms / 2.53 ms) ceilings. Its frame p95 is 7.20 ms, 0.05 ms
above the historical E5 reference of 7.15 ms. E10 remains open for physical
HDR verification, native-language migration-guide review and the remaining
generated framework consumers. Size references remain diagnostic under the
accepted E10 criterion; no budget threshold was changed.

No version bump, commit, publication, deployment or release was performed.
