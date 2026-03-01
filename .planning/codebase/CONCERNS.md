# Codebase Concerns

**Analysis Date:** 2026-03-01

## Summary

This document lists technical debt, fragile areas, security concerns, performance hotspots, flaky tests, and upgrade risks discovered in the repository. Each concern includes file paths, impact, and suggested next steps.

## 1) Potential Logic Bug — Bounds calculation

Issue: `areBoundsInside` and related comparisons in `engine/src/Utils/Utils.ts` appear to mix width/height with offset.x/offset.y leading to incorrect in/out calculations.

Where to look: `engine/src/Utils/Utils.ts` (functions `areBoundsInside` and `isPointInside`)

Impact: Particles may be considered inside/outside incorrectly causing wrong rendering, off-screen culling, or unexpected destroys.

Next steps:

- Add focused unit tests around `areBoundsInside` with explicit width/height/offset cases.
- Fix comparisons to use offset.x with width and offset.y with height consistently.
- Add property-based tests for random sizes and offsets.

## 2) Memoize implementation risks

Issue: `memoize` in `engine/src/Utils/Utils.ts` uses `JSON.stringify(args)` as a cache key and never bounds cache size.

Where to look: `engine/src/Utils/Utils.ts` (function `memoize`)

Impact: CPU/time spent serializing complex arguments; non-deterministic serialization order for objects; unbounded memory growth in long-lived processes (memory leak).

Next steps:

- Replace JSON.stringify with a more robust keying strategy or require callers to provide primitive keys.
- Limit cache size with an LRU or TTL.
- Add tests for memoized functions with objects and arrays as args.

## 3) Deep merge complexity and prototype safety

Issue: `deepExtend` in `engine/src/Utils/Utils.ts` recursively merges objects and filters "**proto**"/"constructor"/"prototype" but still uses untyped merges and can be expensive.

Where to look: `engine/src/Utils/Utils.ts` (function `deepExtend`)

Impact: Performance overhead for large option objects; possibility of unexpected behavior when merging arrays/objects; subtle security issues if untrusted input is merged.

Next steps:

- Add benchmarks covering typical options sizes.
- Replace with a well-tested library implementation or tighten expected input types.
- Harden by explicit type guards and avoid mutating destination when possible.

## 4) Global API usage and arbitrary function resolution

Issue: Code resolves function names from `globalThis` (e.g., `plugins/emittersShapes/canvas/src/EmittersCanvasShape.ts`), and uses `globalThis` to inject `tsParticles` (`engine/src/index.ts`).

Where to look: `plugins/emittersShapes/canvas/src/EmittersCanvasShape.ts`, `engine/src/index.ts`, and other plugins that reference `globalThis` or string-based function names.

Impact: Security risk if untrusted code defines names on `globalThis`. Makes sanitization and code isolation harder; increases coupling to global environment.

Next steps:

- Avoid using string-based global resolution; require function references in options.
- Document and validate allowed global function names before use.
- Consider namespacing injected globals (e.g., `globalThis.__tsparticles__`) or remove global injection.

## 5) Unsafe/unvalidated resource loading

Issue: Image and text-based particle sources are loaded from URLs or DOM elements without sanitization (`plugins/emittersShapes/canvas/src/EmittersCanvasShape.ts` uses `getImageData(url, ...)`).

Where to look: `plugins/emittersShapes/canvas/src/EmittersCanvasShape.ts`, `plugins/canvasMask` and `plugins/exports/*` where external resources are consumed.

Impact: Loading remote resources into canvas can cause CORS failures, tainted canvases, or unexpected exceptions; may affect export functionality and user experience.

Next steps:

- Add explicit error handling and retries for image loading.
- Document CORS expectations and failover behavior.
- Add tests mocking failing image loads.

## 6) Type-safety erosion and excessive "unknown" usage

Issue: Many interfaces use `Record<string, unknown>` and `unknown` in public option types (e.g., `engine/src/Options/Interfaces/*` and plugin option classes).

Where to look: `engine/src/Options/Interfaces/*`, `plugins/emitters/src/*` (e.g., `options: Record<string, unknown>`)

Impact: Reduced compile-time guarantees and potential runtime errors; harder to refactor safely.

Next steps:

- Incrementally tighten types for public option shapes.
- Add TypeScript tests and stricter linting rules for option files.

## 7) Test fragility and environment coupling

Issue: Tests run in jsdom and create custom canvas fixtures with various `any` casts (see `utils/tests/src/Fixture/CustomCanvas.ts` and `utils/tests/src/Fixture/Window.ts`). Vitest configured with `maxWorkers: 1`.

Where to look: `utils/tests/vitest.config.ts`, `utils/tests/src/Fixture/*.ts`, `utils/tests/src/tests/*.ts`

Impact: Tests may be flaky across environments and developers; single-worker config slows CI; canvas/JSDOM behavior can diverge from browsers.

Next steps:

- Add stable mocks for Canvas and Image loading.
- Run a subset of tests in a real browser environment (Playwright) for integration coverage.
- Consider parallelization of stable tests; isolate flaky tests and fix root causes.

## 8) Performance: per-frame allocations and heavy algorithms

Issue: Particle system contains many per-frame allocations and heavy math operations; utilities like `deepExtend`, `memoize(JSON.stringify)`, and recursive merges are used in hot paths.

Where to look: `engine/src/Utils/Utils.ts`, `engine/src/Utils/MathUtils.ts`, `engine/src/Core/Particle.ts`, `engine/src/Core/Particles.ts`

Impact: High CPU usage for large particle counts; garbage collection pauses; poor battery life on mobile.

Next steps:

- Benchmark hot loops with realistic particle counts (1000+).
- Reduce allocations (reuse objects, pool vectors).
- Optimize or memoize results with bounded caches and efficient keying.

## 9) Upgrade risks in monorepo tooling

Issue: Many devDependencies and Nx configuration pin versions (see `package.json`). Upgrading major tool versions (TypeScript, nx, pnpm) could require coordinated package updates across packages.

Where to look: `package.json` at project root, `pnpm-workspace.yaml`, `nx.json`, many per-package `package.json` files

Impact: Breaking developer workflows, CI failures, and merge conflicts during upgrades.

Next steps:

- Maintain an upgrade playbook (test matrix) and a dedicated upgrade branch.
- Use automated dependency upgrade PRs with CI runs.

## 10) Exposed globals and pollution

Issue: The engine writes to `globalThis.tsParticles` in `engine/src/index.ts`.

Where to look: `engine/src/index.ts`

Impact: Collisions with other libraries and tests; makes reentrancy and multiple instances more complex.

Next steps:

- Restrict global exposure behind a configuration flag.
- Provide an opt-in bootstrap API that returns the instance without mutating globalThis.

---

## Mapping Complete

**Focus:** concerns
**Documents written:**

- `.planning/codebase/CONCERNS.md` (144 lines)

Ready for orchestrator summary.
