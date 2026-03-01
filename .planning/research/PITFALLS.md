# Research — Pitfalls (synthesized)

**Analysis Date:** 2026-03-01

Common mistakes and warnings observed in this codebase type:

- Mixing global state and `globalThis` exposure (search: `engine/src/index.ts`) — risk of collisions in host pages and tests.
- Heavy per-frame allocations in hot loops — profile `engine/src/Core/Particles.ts` under realistic particle counts.
- Unbounded memoize/cache patterns (see `engine/src/Utils/Utils.ts`) — potential memory growth.
- Flaky canvas tests due to environment differences (jsdom + canvas). Keep deterministic fixtures.

Prevention strategies

- Avoid mutating `globalThis` by default; provide opt-in bootstrapping.
- Add benchmarks and object pooling strategies for hot paths.
- Replace ad-hoc memoize with bounded caches and clear TTL/size limits.
