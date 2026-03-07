# Research — Features (synthesized)

**Analysis Date:** 2026-03-01

Table stakes (what users expect from a particle engine library):

- Stable core runtime with predictable lifecycle and API (`engine/src/exports.ts`).
- A set of feature modules (shapes, updaters, plugins) that are easy to register with the engine.
- Bundles that provide minimal, slim, and full builds for different footprint needs (`bundles/*`).
- Documentation and examples/demos to help adoption (`demo/vanilla`).

Differentiators (nice-to-have):

- Lightweight slim bundle optimized for minimal bytes.
- A curated set of performant, mobile-friendly shapes/updaters.

Anti-features (deliberately excluded for v1):

- Server-side real-time features or heavy analytics — out of scope.

Complexity notes

- Publishing multiple bundles adds CI complexity (lerna + nx orchestration).
- Tests involving canvas and jsdom are sensitive; expect flaky behavior without careful isolation.
