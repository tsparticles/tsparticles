# E4 verification status — 2026-11-17

Lifecycle implementation, focused regressions, and matched headless runtime
and forced-GC retention measurements are complete. Cleanup gates pass. Two
500-particle frame p95 measurements sit slightly above their recorded E0
ceilings and are carried to the E10 release performance gate. Compressed size
comparisons stay within the 2% growth allowance.

## Verified

- `@tsparticles/tests:test`: 52 files, 698 tests passed.
- `@tsparticles/noise-field:test`: 1 file, 4 tests passed.
- Builds passed for `@tsparticles/engine`, `@tsparticles/plugin-motion`,
  `@tsparticles/plugin-move`, `@tsparticles/plugin-poisson-disc`,
  `@tsparticles/noise-field`, and `@tsparticles/all` (155 dependency tasks).
- `@tsparticles/tests:lint:ci` and `@tsparticles/tests:prettify:ci` passed;
  Prettier also passes for every changed file.
- No per-frame allocation was introduced by the lifecycle changes.
- `measure-factory-bundles.mjs` captured the current payloads in
  [bundle-sizes.json](bundle-sizes.json), using gzip level 9 and Brotli quality 11. Compared with the E3 report, deltas are:

  | Artifact                     |      Raw |   Gzip | Brotli |
  | ---------------------------- | -------: | -----: | -----: |
  | Factory consumer             |   +335 B |  +87 B |  +68 B |
  | Minimal consumer             |   +598 B | +165 B | +148 B |
  | Engine minified distribution |   +334 B |  +87 B |  +97 B |
  | Slim minified bundle         |   +601 B | +180 B | +126 B |
  | All minified bundle          | +1,200 B | +310 B | +385 B |

  Each listed compressed delta is below 2% of its E3 artifact. The helper-only
  consumer is unchanged. The comparison captures the working tree after E4
  against the recorded E3 artifact; it is a checkpoint delta, not attribution
  to individual source lines.

- The headed Chrome harness completed 18 samples (three repetitions for M6 and
  M8 at 100, 500, and 1,000 particles) and a second 30-cycle retention run.
  The compact aggregates are in
  [runtime-extended-headed-summary.json](runtime-extended-headed-summary.json).
  All sampled runs had zero remaining containers and zero long frames. The 30
  retention cycles also removed all 30 containers; reduced-motion, P3 and HDR
  media listener counters stayed at zero, and DOM nodes stayed at 11.
- The five non-forced heap snapshots were all 11.2 MB. This is an indicative
  `performance.memory` reading, not the forced-GC retained heap measure.
- Chrome DevTools Memory's **Collect garbage** action completed twice after the
  30-cycle run. Immediately afterward, the page Console returned
  `performance.memory.usedJSHeapSize === 86,400,000` bytes on both reads, with
  11 DOM nodes. This manual value uses the page Performance API, whereas E0's
  retained heap uses CDP `Runtime.getHeapUsage`; it is not a comparable heap
  result and does not close the retention gate. The manual observation is
  recorded in [manual-gc-check.json](manual-gc-check.json).
- Fixed the extended benchmark runner to set deterministic RNG on the created
  engine instance (`sceneEngine.setRandom`). The older namespace-based call did
  not address that instance's API.

## Matched headless result

The Puppeteer harness completed 18 samples and 30 additional retention cycles
in headless Chrome 157.0.8103.79. E0 used headless Chrome 157.0.8103.52 on the
same machine. The patch versions differ; both runs use the same headless mode.
The raw report and derived aggregates are in
[runtime-extended.json](headless-2026-11-17/runtime-extended.json) and
[runtime-extended-summary.json](headless-2026-11-17/runtime-extended-summary.json).

- All six scenario/count groups had stable RNG counts across three repetitions;
  there were no page errors, all 18 containers were removed, and no sample
  exceeded the long-frame threshold.
- DOM stayed at 9 nodes after each forced-GC sample and all three retention
  batches. Reduced-motion, P3 and HDR media listener counts were all zero.
- Forced-GC retained heap across the three 10-cycle batches was 5,160,948,
  5,228,144 and 5,265,000 bytes. Post-warm-up drift was 104,052 bytes, below
  the 1 MiB allowance.
- Frame p95 medians are compared against E0 and its +10% / +0.1 ms ceilings:

  | Scenario             | Particles | E0 p95 | E4 headless p95 | Ceiling | Result       |
  | -------------------- | --------: | -----: | --------------: | ------: | ------------ |
  | M6 extensions        |       100 | 0.6 ms |          0.6 ms |  0.7 ms | Pass         |
  | M6 extensions        |       500 | 1.7 ms |          2.0 ms | 1.87 ms | Carry to E10 |
  | M6 extensions        |     1,000 | 3.7 ms |          3.6 ms | 4.07 ms | Pass         |
  | M8 HDR/layers/resize |       100 | 0.4 ms |          0.4 ms |  0.5 ms | Pass         |
  | M8 HDR/layers/resize |       500 | 1.5 ms |          1.7 ms | 1.65 ms | Carry to E10 |
  | M8 HDR/layers/resize |     1,000 | 3.0 ms |          3.3 ms |  3.3 ms | Pass         |

Update and render medians are within their ceilings. M6/500 and M8/500 are
small p95 exceedances (0.13 ms and 0.05 ms); retain the per-repetition values
in the summary for E10 review. No workload tuning was applied.

Indicative median frame p95 against E0:

| Scenario             | Particles | E0 headless | E4 headed |   Delta |
| -------------------- | --------: | ----------: | --------: | ------: |
| M6 extensions        |       100 |      0.6 ms |    0.5 ms | −0.1 ms |
| M6 extensions        |       500 |      1.7 ms |    1.9 ms | +0.2 ms |
| M6 extensions        |     1,000 |      3.7 ms |    3.5 ms | −0.2 ms |
| M8 HDR/layers/resize |       100 |      0.4 ms |    0.3 ms | −0.1 ms |
| M8 HDR/layers/resize |       500 |      1.5 ms |    1.5 ms |  0.0 ms |
| M8 HDR/layers/resize |     1,000 |      3.0 ms |    3.1 ms | +0.1 ms |

E4 lifecycle acceptance is complete. The two p95 exceptions remain visible in
the release performance gate; they are not represented as passing.
