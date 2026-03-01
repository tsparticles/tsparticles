# Research — Summary

**Analysis Date:** 2026-03-01

Key findings:

- Stack: TypeScript + pnpm + nx + webpack; Vitest for tests; Typedoc for docs.
- Table stakes: stable core engine, feature packages, published bundles, documentation and demos.
- Watch out: global exposure (`globalThis`), per-frame allocations, unbounded caches, and flaky canvas tests.

Recommendations for roadmap input:

- Phase 1: Stabilize core engine (tests, fix memoize/deep merge, remove unsafe globals).
- Phase 2: CI & publishing improvements (automated bundle builds, release workflows).
- Phase 3: Docs & demos (typedoc publish, demo deploy automation).
