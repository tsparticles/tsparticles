# Matched E4/E5 browser profiles — 2026-11-22

Chrome 157.0.8103.79, 800×600 at DPR 1, fixed seed 123456789, three repetitions per scenario/count, 30 warm-up and 60 measured ticks. Each run has 45 samples. All 135 initial/warm/measured scene snapshots agree in both comparisons: particle geometry, link counts and RNG are unchanged.

The recovered E4 artifact is identified by six raw/gzip/Brotli sizes matching the recorded working-tree E4 report. No original SHA-256 existed; see [provenance](provenance.json). The archived E5 artifacts match their measured SHA-256 exactly.

| Scenario / count | E4 draw ms | E5 before ms | E5 after ms | E0 draw ceiling ms |
| --- | ---: | ---: | ---: | ---: |
| M3 / 500 | 0.70 | 0.60 | 0.60 | 0.70 |
| M3 / 1000 | 1.30 | 1.20 | 1.20 | 1.32 |
| M4 / 500 | 2.50 | 3.40 | 2.70 | 2.53 |
| M4 / 1000 | 8.60 | 12.40 | 9.60 | 9.02 |

M4/1,000 draw improves 22.6% (12.40 → 9.60 ms). Full-frame sampled JS allocation falls 26.1% (25.08 → 18.53 MB/tick, decimal MB); M4/500 falls 24.0% (6.89 → 5.24 MB/tick). Sampling includes collected objects and estimates bytes, not exact object counts. A full frame includes update.

M4 remains over the E0 draw ceilings at 500 and 1,000 particles. M4/1,000 also remains above the 10% matched-E4 screen (9.60 vs 9.46 ms). M7/500 frame-p95 screening is slightly over its matched-E4 allowance: the E4 repetitions span 1.7–2.2 ms and the after repetitions 2.0–2.1 ms, so this needs dispersion review rather than a causal regression claim. E5 is not accepted and no performance threshold is waived.

## Reproduce

Run from the workspace root, in an environment allowed to launch Chrome. Keep build/test jobs stopped during measurement. Preserved bundles allow rerunning all three versions on the same installed Chrome patch:

```sh
node .planning/handovers/evidence/tools/profile-e5-browser.mjs /tmp/e4-profile.json .planning/handovers/evidence/e5/matched-baseline/e4-all.bundle.min.js.gz
node .planning/handovers/evidence/tools/profile-e5-browser.mjs /tmp/e5-before-profile.json .planning/handovers/evidence/e5/matched-baseline/e5-before-all.bundle.min.js.gz
node .planning/handovers/evidence/tools/profile-e5-browser.mjs /tmp/e5-after-profile.json .planning/handovers/evidence/e5/matched-baseline/e5-after-all.bundle.min.js.gz
node .planning/handovers/evidence/tools/compare-e5-profiles.mjs /tmp/e4-profile.json /tmp/e5-after-profile.json /tmp/e4-vs-e5.json
```

See the raw profiles and generated comparison JSON files in this directory. Timings measure CPU submission, not GPU completion. Retained heap subtracts a forced-GC empty container in the same scenario and includes realm/renderer overhead. M8 in this matrix covers background mask; the separate extended harness covers M6/M8 layers, resize and retention.


## Final consumer and RNG verification

The cache-stage profiles precede the absorber RNG fix; those five scenarios
configure no absorbers, so they do not execute the corrected placement/recycle
methods. `e5-final-all.bundle.min.js.gz` preserves the final source build.
`post-cache/summary.json` identifies that bundle and records the fresh M6/M8 run:
18 samples with stable engine RNG counts, zero long frames, and 30 retention
cycles with stable DOM/listeners and 114,876 bytes of post-warm-up heap drift.
M6/500 frame p95 remains 1.90 ms vs the 1.87 ms E0 ceiling. Two failed pre-fix
RNG runs are preserved separately and are not passing benchmark evidence.

Final source verification passes 453 build targets, all 85 test targets and
813 primary tests. The eight browser pixel cases still match the current
formatter SHA-256. See `verification.json` and `bundle-impact.json`; the latter
measures this increment's all-bundle delta, without regenerating the earlier
factory/minimal payload reports. E5 remains open for residual performance and
option/state/cache-cost decisions.
