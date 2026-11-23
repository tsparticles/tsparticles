# V5-IMP-05 — Per-particle costs, options, and caches

Status: T1–T4 model/cache decisions complete; E5 accepted on 2026-11-23.
The user explicitly accepts the remaining M4/500 runtime deviation for E5,
with final E10 verification. No rejected prototype is shipped. See
`../evidence/e5/closure/README.md` and its quiet-pair investigation reports.
Handover 07 owns this plan, with support from 02/03/08.
Requires [IMP-01](V5-IMP-01-MEASUREMENT.md).

## Goal and starting point

Particle integrates options, vectors, color, animation state, modifiers,
and hooks. Retina contributes sizes and ranges. Separate construction and
reuse from getters and calculations that run every frame. Use call counts
and retained bundle dependencies to identify costly fields and helpers.

### T1 — Options and merges

In M6, measure per-particle construction and merging, precedence across
base/group/shape/effect, and dynamic overrides. Compare repeated full merges
with a normalized template for stable configuration and copying only mutable
fields. Define ownership first and keep mutable options separate per particle.

Caches and templates need invalidation for refresh/reset, themes, plugin option
loaders, and groups. Keep JSON.stringify out of hot-path keys. Verify whether
configuration identity or version is a sufficient key. Require a controlled
invalidation point for any mutable input.

### T2 — Getters, vectors, and color conversion

Profile repeated getPosition/bounds calls, color normalization and mixing, and
size access. Compare calculating once per phase with owner-local scratch
storage. Plugin updates during the frame can invalidate intermediate values.
Verify all consumers before replacing an independent result with a shared
mutable object. Distinguish public APIs from internal helpers.

Acceptance requires equivalent HDR/sRGB, animations, and plugin mutations,
fewer measured allocations or calculations, and no visual or aliasing regressions.

### T3 — State layout and optional capabilities

Compare per-particle heap, object count, and initialization cost in M3 and M8.
Evaluate lazy fields for rare features and consistent object initialization.
Compare branch and fragmentation costs against recovered memory. Avoid adding
an object or closure for every field extracted into a helper.

Pooling and reset must clear previous plugin and shape state, including
optional state. Typed arrays or a data-oriented rewrite are separate
experiments with significant plugin impact. Require profiles, a limited
prototype, and migration before making either an architectural requirement.

### T4 — Color and resource caches

The observed styleCache already has a limit of 2,000. Measure hits, misses,
cardinality, and churn in HDR animations. Check whether caching costs more
than conversion when reuse is low. Preserve precision and visual results
when evaluating further quantization of colors or coordinates.

Distinguish shareable immutable data from results that depend on the engine,
RNG/logger, or plugins. Specify scope, eviction, and cleanup for new caches.

## Deliverables

Provide measurements per particle and phase, new templates or caches and their
invalidation, affected API consumers, and bundle deltas. Test reset/pool,
overrides, modifiers, Retina, HDR, and two engines. Close T1–T4 in 07 and
verify extensions in 08.

### E5 measurement note — 2026-11-22

The supplementary M3 profile (five repetitions at 100, 500, 1,000, and 2,000
particles, with a forced-GC empty-container baseline) reports median retained
heap deltas of 1,197,336; 5,788,600; 11,542,976; and 23,009,048 bytes. The
estimated per-particle values are 11,973; 11,577; 11,543; and 11,505 bytes.
The profile includes per-container/renderer overhead and all registered
workspace extensions; it estimates neither allocation volume nor native canvas
memory and must not be compared with Chrome/CDP. No optimization is inferred
from these figures alone. Raw results and the reproducible harness are at
`../evidence/e5/node-particle-heap.json` and
`../evidence/tools/measure-e5-node-particle-heap.mjs`.

The companion runtime diagnostic covers M3/M4/M5/M7 at 100/500/1,000 particles
with three repetitions, 30 warm-up ticks, 60 measured ticks and a fixed seed.
RNG call counts match across repetitions. At 1,000 particles, median per-tick
update/draw p95 values are M3 2.60/8.87 ms, M4 19.17/85.50 ms, M5 25.00/31.54
ms and M7 2.77/9.52 ms. These Node+jsdom+`@napi-rs/canvas` CPU timings are
diagnostic only, not comparable with Chrome/GPU values, and do not close the
browser-based M3/M8 or allocation-profile requirements. Raw results and harness:
`../evidence/e5/node-runtime.json` and
`../evidence/tools/measure-e5-node-runtime.mjs`.

V8 allocation sampling (512-byte sampling interval, three repetitions) records
estimated update/draw JS allocation bytes per tick at 1,000 particles: M3
1,915/1,908; M4 29,165/29,424; M5 1,721/1,866; M7 1,957/1,775. Treat these as
sampling estimates rather than exact allocation totals or object counts. The
sampling profile is Node-only, excludes native canvas/GPU work and does not
replace matched browser profiles. See `../evidence/e5/node-allocations.json`
and `../evidence/tools/profile-e5-node-allocations.mjs`.

## Related architecture contracts

See [ARCH-01 — Particle](../architecture/V5-ARCH-01-PARTICLE-MODEL.md) and
[ARCH-03 — Options](../architecture/V5-ARCH-03-OPTIONS.md). Use T1–T3 to
compare classes, snapshots, plain state, normalization pipelines, and
resolved templates. Define serializability and immutability as explicit
contracts before relying on them.

### Matched cache increment — 2026-11-22

The link cache is bounded at 2,000 entries and has one value-checked last-style
entry, reset on initialization. It copies canonical values and checks alpha,
gamut, HDR mode and peak; it does not quantize input or change rendering order.
The engine style-map boundary is likewise strictly bounded. A 5,000-color churn
regression and output mutation/HDR/gamut tests pass. On identical scenes the
M4/1,000 frame allocation estimate falls from 25.08 to 18.53 MB/tick. The
increment is accepted; T4's animated HDR hit/miss/cardinality cost comparison is
still needed. Measurements and preserved artifacts are in `matched-baseline/`.

## T1–T4 decisions — 2026-11-23

- **T1:** retain typed option constructors/loaders, a container-resolved base,
  and per-particle ownership. Prototype and plain clone probes fail private
  brands or lose load methods; a source mutation invalidates a reused normalized
  template. Do not treat their timings as valid production improvements.
- **T2:** retain live getter scratch objects because supported plugin mutation
  makes a phase-local snapshot stale. Optimize repeated style lookup and native
  link canvas state instead. Three browser scenes retain byte-identical pixels,
  geometry and RNG, including mixed alpha and P3/HDR triangles.
- **T3:** retain the runtime class and eager scratch objects. Every tested lazy
  scratch field exists after warming; warm heap changes by only +1/+3/+7 B per
  particle in M3/M8/M6-options. Inspection snapshots add about 76–82 B per
  particle without a consumer. No serializer, clone protocol or ECS API is adopted.
- **T4:** retain a strict 2000-entry output map and a single copied last-value
  entry. After 64 consecutive HDR misses, bypass keys/map for 64 calls between
  probes until reuse returns. Scope is derived primitive output only, without
  engine or particle references. Link-local maps reset at init. No quantization
  or canonical state mutation is introduced.

The instrumented 16384-call cache diagnostic gives raw/cached median ms of
41.1/0.8 (static sRGB), 94.8/0.4 (static P3), 7.7/0.8 (static HDR),
8.1/3.5 (32-color HDR palette), and 7.8/8.7 (8192-color HDR stream). The latter
has 15019 bypasses, 1243 misses and 122 hits, with 1321 maximum entries. The
prior always-cache HDR stream took 13.1 ms against 7.7 raw. The adaptive choice
reduces that overhead while retaining palette/static reuse. Animated sRGB/P3
remain near raw conversion cost (54.9/56.1 and 91.6/92.7 ms); all outputs match
exactly and the maps remain bounded. Instrumentation favors the raw reference;
these are policy diagnostics, not production budget measurements.

See `../architecture/V5-ARCH-01-PARTICLE-MODEL.md`, ARCH-03, and
`../evidence/e5/closure/{model-evaluation,style-cache-evaluation,link-pixels}.json`.
The earlier cache increment and profiles above remain historical comparisons.
