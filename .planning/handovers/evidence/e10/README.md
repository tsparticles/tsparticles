# E10 checkpoint — 2026-11-24

E10 has started and remains open. This checkpoint records the first fresh
candidate measurements and workspace checks. It does not authorize a release.
Frozen E0 budgets remain unchanged.

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
- Bundle/runtime comparison is generated in `budget-screen.json`. It evaluates
  unchanged E0 ceilings. Current absolute comparison: 2 bundle rows pass, 17
  fail and 0 are pending; 28 of 30 runtime rows pass and 2 fail. The initial
  three-repetition flags remain recorded alongside the nine-repetition
  confirmations. CJS sizes come from a fresh isolated install of the packed
  E10 engine.
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
  package tarballs in an isolated consumer; the CLI vanilla scaffold has been
  generated, type-checked, production-built, and started in Chrome from 41
  extracted package tarballs. See `generated-consumer.json` and
  `cli-scaffold.json`. Other framework outputs and translation review remain
  open. G1–G7 source review dispositions were collected and closed in E8; the
  separate ARCH and legacy closure checks still need their E10 outcomes. The
  color report is recorded, but C5 remains open for its E0 budget and broader
  browser/hardware gates.

## Budget status

The pure helper remains unchanged. The import/browser factory, initialization,
minimal scene, lazy entry, engine, Basic, Slim, Full, All and minimal CDN page
currently exceed their frozen gzip and Brotli ceilings. The measured candidate
sizes, byte deltas, ratios and scenario-level status are in `budget-screen.json`
and `bundle-sizes.json`. No budget is waived by this checkpoint.

The original three-repetition screen flagged nine runtime rows. Selective
nine-repetition confirmation clears the seven main-matrix flags; both remaining
M6/500 SDR/HDR extended frame p95 rows exceed E0. The per-row first-pass values,
confirmation samples, matched E6 values, and fixed ceilings are in
`budget-screen.json`, `runtime-confirmation-comparison.json`, and
`runtime-extended-confirmation-comparison.json`. E0 used Chrome 157; candidate
and matched controls use Chrome 158. The E6 comparison informs attribution but
does not replace E0 acceptance thresholds.

All three CJS size scenarios exceed their original ceilings:

| CJS package graph      |  Raw B |  Min B | Gzip B | Brotli B | Gzip ceiling B | Brotli ceiling B |
| ---------------------- | -----: | -----: | -----: | -------: | -------------: | ---------------: |
| Root acquisition       | 153063 |  97004 |  35199 |    30647 |          30594 |            26477 |
| Lazy acquisition       | 153063 |  97004 |  35199 |    30647 |          30606 |            26483 |
| Full shipped CJS graph | 287481 | 159646 |  60841 |    52403 |          54213 |            46456 |

The root acquisition is +5,204 gzip / +4,689 Brotli bytes over E0; lazy is
+5,193 / +4,683; full shipped CJS is +7,691 / +6,857. These are measured
failures, not missing data. The E6 matched runtime control is complete, but it
does not replace the E0 absolute ceilings and the candidate still has 9 runtime
rows beyond them. Existing E5/E7 acceptance exceptions remain exceptions; they
are not passing measurements or new budget waivers.

No version bump, commit, publication, deployment or release was performed.
