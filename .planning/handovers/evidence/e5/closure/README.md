# E5 acceptance — 2026-11-23

**E5 accepted.** C1–C4 and the Particle/options review are complete. The user
explicitly accepted the remaining M4/500 runtime deviation for E5, with final
verification in E10: “Accettare lo scostamento e chiudere E5, con verifica finale
in E10”. This is an E5 exception, not a passing performance result or E10 release
acceptance. The earlier bundle-growth exception also remains limited to E5.

## Gates and verification

| Gate                         | Decision and evidence                                                                                                                                                                                        |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| E5a — Particle/options       | Retain typed loaders, independent mutable ownership, live getters and class facade. Reset, rollback, modifiers, Retina, hooks and two-engine regressions pass; ARCH-01/03 record the evaluated alternatives. |
| E5b / C1 — Pure math         | Canonical OKLCH, independent conversion references, alpha-aware mixing, mapping and HDR luminance tests pass.                                                                                                |
| E5c / C2–C3 — Runtime/output | Native managers resolve OKLCH; legacy managers use an explicit input adapter. Canonical runtime state and direct mapped CSS OKLCH output are migrated, with isolated pixel/API/HDR boundaries.               |
| E5d / C4 — Consumers/costs   | Per-file color inventory has no unresolved runtime migration. Source/consumer builds, T1–T4 decisions and browser checks are complete. Runtime exception is explicit below.                                  |

- `pnpm run build:ci --parallel=8 --output-style=static`: **457 projects pass**,
  364 cache hits ([Nx run](https://cloud.nx.app/runs/V8MmU5tvOH)). The earlier
  three-way attempt was stopped and restarted; it is not counted as a success.
- `pnpm nx run-many -t test --output-style=static`: **85 projects pass**.
  Primary suite: **55 files / 817 tests**, including cache churn, mutation,
  canvas state restoration and exceptional exits. Source lint/format pass in
  the package builds. Final planning/tool formatting and syntax are checked.
- Eight current formatter cases pass in Chrome 157.0.8103.79: sRGB/P3/HDR, alpha,
  float16 and source immutability. `../browser-color-results.json` identifies
  the exact formatter SHA. Four link scenes retain byte-identical pixels,
  geometry and RNG: white, mixed alpha, P3/HDR triangles and HDR stroke-only.
- M6/M8: 18 deterministic samples, zero long frames, 30 retention cycles,
  stable 9 DOM nodes and zero live media listeners, 113380-byte post-warm-up
  forced-GC heap drift. See `post-final/summary.json`.

`verification.json` and `bundle-impact.json` identify the exact source build.
The release minified bundle is archived as `final-all.bundle.min.js.gz`; the
unminified source used by diagnostics is in `final-all.bundle.js.gz`.

## Runtime outcome and explicit exception

The 45-sample full matrix matches all 135 E4 initial/warm/measured snapshots
and passes all 30 original E0 update/draw checks. M4 draw is 2.40/8.30 ms at
500/1000 particles, below the 2.53/9.02 ceilings; M7's earlier screening flag
is resolved. Sampled M4/1000 frame allocation is 18.23 MB/tick versus 25.08 MB
in the pre-cache checkpoint. This is a sampling estimate, not an exact total.

The separate nine-repetition quiet pair runs after builds/tests, writes only
to /tmp during both measurements, and makes no repository changes between
runs. It still finds the following deviation, which must remain visible:

| M4 / 500          | E4 quiet control | E5 quiet candidate |    Budget or screen |
| ----------------- | ---------------: | -----------------: | ------------------: |
| Median update, ms |             3.50 |               3.70 |     E0 ceiling 3.52 |
| Median draw, ms   |             2.40 |               2.40 |     E0 ceiling 2.53 |
| Frame p95, ms     |             6.50 |               7.50 | Matched screen 7.15 |

The earlier full matrix gives update 3.50 and frame p95 7.70 ms; a prior
nine-repetition confirmation gives 3.70/7.70. These runs are retained, not
replaced by the most favorable result. The user accepts the deviation for E5;
**E10 owns final runtime verification** against unchanged budgets and matched
controls. M6/500's inherited E4 release item also remains: current p95 2.10 ms
vs 1.87 ceiling, fresh prior-E5 corrected-RNG control 2.30 ms.

See `accepted-profile.json`, `budget-screen.json`, `accepted-comparison.json`,
the `m4-500-*confirmation*.json` reports and `investigation/quiet-*.json`.
The accepted-profile filename identifies the production artifact; it does not
mean every timing screen passed. E4 provenance is qualified in
`../matched-baseline/provenance.json`: six recorded size fingerprints match
the recovered artifact, but E4 did not originally record a SHA.

## T1–T4 decisions

**T1:** retain typed constructors/loaders, a container-resolved base and
independent particle options. Prototype-preserving normalized copies fail
private-brand loading; plain copies lose load methods. Source mutation
invalidates an identity-only normalized template. Their timings are not
compatible production speedups. No clone protocol, validator, schema or freeze
requirement is added without a consumer and an invalidation contract.

**T2:** retain live owner-local getter scratch; a phase-local snapshot becomes
stale after supported plugin mutation. Accepted output changes avoid repeated
formatter keys and redundant link canvas assignments. Stroke-only links
neutralize unused fill paint temporarily and restore exact native state even
on exceptions. Triangles, twinkle and unresolved color paths preserve their
ordinary behavior. Pixel, geometry, ordering, alpha and RNG checks pass.

**T3:** retain the class facade and eager scratch. Lazy construction avoids
load-time objects, but all four exist after warming each tested workload.
Median warm heap is 6305/6306 B (M3), 6300/6303 B (M8), 6220/6227 B
(M6-options), eager/lazy. Numeric inspection snapshots add approximately
76–82 B per particle without a consumer. Plain copies alias mutable state and
lose methods/private brands. No public serializer or resume contract is added.

**T4:** retain a strict 2000-entry derived-style map and one copied last-value
entry. After 64 consecutive HDR map misses, bypass exact formatting keys/map
for 64 calls between probes until reuse returns. Entries hold primitive color/
output values and strings, without engine/particle/context/RNG references.
Link-local caches reset at initialization. Precision, alpha, gamut, peak and
HDR mode remain part of output selection. No quantization is introduced.
The 16384-call HDR stream improves from the earlier 13.1 ms cached diagnostic
to 8.7 ms (7.8 uncached), while palette and static reuse still benefit.

`model-evaluation.json` contains 18 instrumented unminified samples and
characterization probes; its M6-options workload is not the production M6
benchmark. `style-cache-evaluation.json` measures hit/miss/churn and exact
output equivalence. These diagnostics do not establish production budgets.
Model source and loader layout are unchanged by the final formatter/link work.

## Rejected experiments and payloads

Full-frame CPU profiles, alpha-in-paint, neutral-stroke ordering, constant
gradient paint and getter variants are diagnostic only. The gradient improves
timing but changes visible channels beyond tolerances (up to 10–11 unorm8
steps at alpha >= 0.25); it is rejected. Empty-modifier branches, shared
selectors and inline radius do not establish sufficient benefit under the
equivalent reminified control. **None of these prototypes is shipped.** Raw
results, per-repetition values, source hashes and limitations are preserved in
`investigation/`; report-only gradient pixels are not a passing correctness
check. Default production pixel comparisons remain exact.

`payloads/` contains current helper/factory/minimal/lazy graphs, distributions,
all chunks, compressed sizes and E4/prior deltas. The pure helper is unchanged
(314 minified / 189 gzip / 166 Brotli bytes). The final all-bundle increment
over the prior E5 checkpoint is +791 raw / +354 gzip / +234 Brotli bytes.
Full E4 delta is +25156 / +8394 / +6013 bytes. These are reported measurements;
the size exception does not assert that the original budgets pass.

## Reproduction and limits

Run builds/tests before browser timings; keep the timing phase free of
repository writes and competing work. Full-matrix defaults are three
repetitions, seed 123456789, 30 warm-up and 60 measured ticks at 800×600/DPR1.
For the quiet pair, use the following for each archived bundle in sequence,
then compare and copy /tmp outputs into evidence after both runs finish:

```sh
E5_PROFILE_SCENARIOS=M4 E5_PROFILE_COUNTS=500 E5_PROFILE_REPETITIONS=9 node .planning/handovers/evidence/tools/profile-e5-browser.mjs /tmp/e5-profile.json BUNDLE_PATH
node .planning/handovers/evidence/tools/compare-e5-profiles.mjs /tmp/e4-profile.json /tmp/e5-profile.json /tmp/comparison.json
```

The `profile-e5-browser`, `evaluate-e5-model`, `evaluate-e5-style-cache` and
`compare-e5-link-pixels` helpers reproduce the associated reports. Headless
timings measure CPU submission, not GPU completion or physical HDR display
appearance. Forced-GC retention does not prove absence of every leak. E9
distribution and E10 final release checks remain open. No commit/publication.
