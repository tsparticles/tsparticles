# V5-IMP-05 — Per-particle costs, options, and caches

Status pending analysis. Medium to high priority according to profiles.
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
