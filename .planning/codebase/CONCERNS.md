# Codebase Concerns

**Analysis Date:** 2026-02-17

## Tech Debt

**Over-extracted Constants:**

- Issue: `engine/src/Core/Utils/Constants.ts` (98 lines) defines ~90+ named constants for trivial numeric literals (`half = 0.5`, `double = 2`, `one = 1`, `none = 0`, `empty = 0`, `triple = 3`, `quarter = 0.25`, etc.). Many are semantically identical (`none = 0`, `empty = 0`, `minVelocity = 0`, `minCoordinate = 0`, `minZ = 0`, `defaultRadius = 0`). This obscures code intent rather than clarifying it.
- Files: `engine/src/Core/Utils/Constants.ts`
- Impact: Every file importing these constants has reduced readability. Contributors must memorize dozens of aliases for the same values. IDE auto-complete is polluted.
- Fix approach: Keep only semantically meaningful constants (e.g., `qTreeCapacity`, `millisecondsToSeconds`, `defaultFps`). Replace trivial numeric aliases with inline literals or a smaller curated set.

**Repetitive Plugin Array Management in Canvas:**

- Issue: `Canvas.ts` maintains 11 separate plugin arrays (`_canvasClearPlugins`, `_canvasPaintPlugins`, `_clearDrawPlugins`, `_colorPlugins`, `_drawParticlePlugins`, `_drawParticlesCleanupPlugins`, `_drawParticlesSetupPlugins`, `_drawPlugins`, `_drawSettingsCleanupPlugins`, `_drawSettingsSetupPlugins`, `_resizePlugins`), each initialized in 3 separate places (constructor, `clear()`, `initPlugins()`). The `initPlugins()` method has an if-chain checking each plugin capability.
- Files: `engine/src/Core/Canvas.ts` (lines 109–131, 169–179, 240–250, 455–510)
- Impact: Adding a new plugin hook requires changes in 3+ locations. High risk of forgetting to reset an array. Code is ~100 lines of boilerplate.
- Fix approach: Use a single `Map<string, IContainerPlugin[]>` keyed by capability name. Auto-populate from plugin interface method presence. Single initialization loop.

**Pervasive `eslint-disable` Suppression:**

- Issue: 97 `eslint-disable` comments across 56 files. Most common suppressions: `@typescript-eslint/no-magic-numbers` (file-level in ~20 easing/path/noise files), `@typescript-eslint/no-non-null-assertion` (file-level in noise/GIF utils), `@typescript-eslint/no-useless-constructor` (~8 interaction classes), `@typescript-eslint/no-deprecated` (pjs bundle).
- Files: `plugins/easings/*/src/easingsFunctions.ts`, `paths/*/src/*.ts`, `utils/simplexNoise/src/**/*.ts`, `utils/perlinNoise/src/*.ts`, `shapes/image/src/GifUtils/*.ts`, `bundles/pjs/src/*.ts`, `engine/src/Utils/LogUtils.ts`
- Impact: Lint rules are not protecting these files. File-level `eslint-disable` is especially dangerous as it silences ALL violations of that rule, including future ones.
- Fix approach: For magic numbers in easing functions, extract named constants (e.g., `const bounceCoefficient = 7.5625`). For `no-non-null-assertion`, add proper null checks. For `no-useless-constructor`, remove empty constructors or use composition.

**Outdated Security Policy:**

- Issue: `SECURITY.md` lists v2.7.x as the only supported version. The project is currently at v4.0.0-alpha.24. No mention of v3.x or v4.x.
- Files: `SECURITY.md`
- Impact: Security researchers have no guidance on which versions receive patches. Vulnerability reports may target the wrong version.
- Fix approach: Update `SECURITY.md` to reflect the current v4.0.0-alpha status and deprecation of v2.x.

## Known Bugs

**Coordinate Swap in `areBoundsInside`:**

- Symptoms: Bounds checking uses `offset.x` for vertical (top/bottom) comparisons and `offset.y` for horizontal (left/right) comparisons, which appears swapped. Bottom check: `bounds.top < size.height + offset.x` (should likely be `offset.y`). Right check: `bounds.left < size.width + offset.y` (should likely be `offset.x`).
- Files: `engine/src/Utils/Utils.ts` (lines 166–191)
- Trigger: Any particle movement using `OutModeDirection` bounds checking. May cause particles to disappear or persist at wrong edges, especially with non-square canvases or non-zero offsets.
- Workaround: Effect is only visible when `offset.x !== offset.y`, which may be rare in typical usage (symmetric offsets mask the bug).

## Security Considerations

**Unvalidated `fetch()` for External Resources:**

- Risk: 6 files use `fetch()` to load external URLs (configs, images, SVGs, audio, GIFs) with minimal validation. No URL allowlisting, no Content-Type verification, no size limits on responses. `Engine.ts` parses fetched JSON with `response.json()` directly. `GifUtils/Utils.ts` reads fetched response as `ArrayBuffer` without size checks.
- Files: `engine/src/Core/Engine.ts` (line 91), `shapes/image/src/Utils.ts` (line 133), `shapes/image/src/GifUtils/Utils.ts` (line 463), `plugins/sounds/src/SoundsPluginInstance.ts` (line 161), `plugins/polygonMask/src/PolygonMaskInstance.ts` (line 303), `paths/svg/src/SVGPathGenerator.ts` (line 162)
- Current mitigation: `Engine.ts` checks `response.ok` before parsing. Other files have varying levels of error handling.
- Recommendations: Add URL validation/sanitization. Enforce Content-Type checks. Set maximum response size limits for binary resources (images, GIFs, audio). Consider a centralized fetch wrapper with security defaults.

**Global Namespace Pollution:**

- Risk: The engine explicitly assigns itself to `globalThis.tsParticles` in both `engine/src/index.ts` and `engine/src/bundle.ts`. A `declare var tsParticles: Engine` in `Engine.ts` (line 57) enables this.
- Files: `engine/src/index.ts` (line 5), `engine/src/bundle.ts` (line 5), `engine/src/Core/Engine.ts` (line 57)
- Current mitigation: Standard practice for browser libraries. The `var` declaration is scoped to the module system.
- Recommendations: Document the global side-effect clearly. Consider making global assignment opt-in for module-only consumers.

**`deepExtend` Prototype Pollution Guard:**

- Risk: `deepExtend` checks for `__proto__` key and skips it, which is good. However, it does not guard against `constructor` or `prototype` keys, which are alternative prototype pollution vectors. Uses `for...in` loop which iterates inherited enumerable properties.
- Files: `engine/src/Utils/Utils.ts` (lines 214–255)
- Current mitigation: `__proto__` is blocked. The `isObject()` check filters some edge cases.
- Recommendations: Also skip `constructor` and `prototype` keys. Consider using `Object.keys()` or `Object.entries()` instead of `for...in` to avoid iterating inherited properties.

## Performance Bottlenecks

**QuadTree Rebuilt Every Frame:**

- Problem: `Particles.update()` creates a brand new `QuadTree` instance on every animation frame (`this.quadTree = new QuadTree(...)`). This allocates a new tree, inserts all particles, and discards the previous one — every single frame.
- Files: `engine/src/Core/Particles.ts` (line 435)
- Cause: No incremental update mechanism. The QuadTree is recreated from scratch because particle positions change each frame.
- Improvement path: Implement a `clear()` and `rebuild()` method on QuadTree that reuses the existing tree structure. Alternatively, use a spatial hash grid which has O(1) insert/update for moving particles.

**God Classes in Core:**

- Problem: Several core files are excessively large and handle too many responsibilities. `Particle.ts` (929 lines, ~50+ properties), `Canvas.ts` (876 lines, 11 plugin arrays), `Particles.ts` (622 lines), `Container.ts` (594 lines), `Engine.ts` (585 lines).
- Files: `engine/src/Core/Particle.ts`, `engine/src/Core/Canvas.ts`, `engine/src/Core/Container.ts`, `engine/src/Core/Engine.ts`, `engine/src/Core/Particles.ts`
- Cause: Organic growth without extraction. `Particle.ts` handles initialization, position calculation, velocity, color, opacity, size, rotation, tilt, wobble, orbit, and roll.
- Improvement path: Extract concerns into composition-based helpers (e.g., `ParticleMotion`, `ParticleAppearance`, `ParticleLifecycle`). Extract Canvas plugin management into a `PluginManager` class.

**`memoize` Uses `JSON.stringify` for Cache Keys:**

- Problem: The `memoize` utility serializes all arguments with `JSON.stringify(args)` to create cache keys. This is O(n) in argument size and allocates a new string each call. The cache also has no eviction policy — it grows unboundedly.
- Files: `engine/src/Utils/Utils.ts` (lines 39–55)
- Cause: Generic memoization approach. Currently only used for `getFullScreenStyle` (line 674), so the practical impact is limited right now.
- Improvement path: For single-argument functions, use the argument directly as the Map key. Add a `maxSize` parameter with LRU eviction. For the current single use case, consider a simpler caching approach.

**Color Style Cache with Bulk Eviction:**

- Problem: `ColorUtils.ts` uses a `Map` cache with `maxCacheSize = 1000`. When full, it deletes the first 500 entries (half) at once by iterating `.keys()` and slicing. This is not LRU — it evicts based on insertion order, so frequently-used colors may be evicted while rarely-used ones remain.
- Files: `engine/src/Utils/ColorUtils.ts` (lines 55–83)
- Cause: Simple cache implementation without proper eviction strategy.
- Improvement path: Use an LRU cache (e.g., move accessed entries to end on read). Alternatively, since color strings are finite in practice, increase cache size or profile to determine if eviction actually occurs.

## Fragile Areas

**Particle Position Calculation (`_calcPosition`):**

- Files: `engine/src/Core/Particle.ts` (lines 757–813)
- Why fragile: Uses `while (!signal.aborted)` loop with an `AbortController` that is **never aborted**. The only exit paths are: (1) a plugin returns a position, (2) the calculated position passes all plugin validation checks, or (3) `posVec` is set to `undefined` after a failed try, causing the next iteration to generate a random position. If ALL random positions fail plugin validation (e.g., a restrictive plugin), this loop runs indefinitely.
- Safe modification: Add a maximum retry count (e.g., 100 iterations) as a safety valve. Log a warning if the limit is reached. The `tryCount` variable increments but is only passed to plugins — it's never used for loop termination.
- Test coverage: No tests exist for this method.

**Animation Loop Error Swallowing (`_nextFrame`):**

- Files: `engine/src/Core/Container.ts` (lines 554–593)
- Why fragile: The entire animation frame logic is wrapped in `try/catch` that only calls `getLogger().error()`. If an error occurs (e.g., WebGL context lost, plugin exception), the animation continues silently on the next frame. Repeated errors generate log spam but no recovery or user notification.
- Safe modification: Add error counting. After N consecutive errors, pause the animation and emit an error event. Consider differentiating recoverable errors (e.g., skip this frame) from fatal errors (e.g., canvas destroyed).
- Test coverage: No tests exist for the animation loop.

**GIF Parser:**

- Files: `shapes/image/src/GifUtils/Utils.ts` (777 lines), `shapes/image/src/GifUtils/ByteStream.ts`
- Why fragile: File-level `eslint-disable` for both `no-magic-numbers` and `no-non-null-assertion`. The file is a complex binary parser with hardcoded byte offsets and bit manipulation. Any change to parsing logic risks breaking GIF rendering.
- Safe modification: Do not modify without comprehensive GIF test fixtures. Consider wrapping in an integration test that loads known GIF files and verifies frame extraction.
- Test coverage: No tests exist for GIF parsing.

## Scaling Limits

**Particle Count vs. QuadTree Performance:**

- Current capacity: Reasonable up to ~5,000–10,000 particles on modern hardware.
- Limit: QuadTree rebuild is O(n log n) per frame. Combined with Canvas2D draw calls (one per particle), frame rate degrades significantly above ~10,000 particles.
- Scaling path: WebGL/WebGPU renderer for drawing. Spatial hash grid for collision/proximity queries. Instanced rendering for identical particles.

## Dependencies at Risk

**Alpha Version (v4.0.0-alpha.24):**

- Risk: The entire library is in alpha. All ~91 packages share the same alpha version. Any breaking API change affects the entire ecosystem of plugins, shapes, interactions, and bundles.
- Impact: External consumers cannot rely on API stability. Framework integrations (React, Vue, Angular, Svelte, etc.) must track alpha changes.
- Migration plan: Establish API freeze milestones. Consider semantic versioning for individual packages once stable.

## Missing Critical Features

**No Lint Script in Packages:**

- Problem: Only the root workspace and `utils/tests` have lint configurations. Individual packages do not have lint targets. There is no workspace-wide `nx run-many --target=lint` capability.
- Blocks: Consistent code quality enforcement across the monorepo. CI cannot catch lint violations in individual packages.

## Test Coverage Gaps

**Near-Zero Test Coverage:**

- What's not tested: The entire codebase outside `utils/tests/` has zero test files. No `.test.ts` or `.spec.ts` files exist anywhere. The only tests are in `utils/tests/src/tests/`:
  - `Utils.ts` — tests for utility functions
  - `ColorUtils.ts` — tests for color conversion
  - `Options.ts` — tests for options parsing
  - `Particle.ts` — tests for particle creation
  - `Particles.ts` — tests for particle collection (file-level `eslint-disable` — all rules suppressed)
  - `QuadTree.ts` — tests for spatial indexing
- Files: `utils/tests/src/tests/*.ts` (6 test files total), supported by `utils/tests/src/Fixture/CustomCanvas.ts` and `utils/tests/src/Fixture/Window.ts`
- Risk: Any refactoring of core engine, plugins, shapes, interactions, effects, paths, or updaters has zero regression safety net. The animation loop, Canvas rendering, event handling, and all 70+ plugins are completely untested.
- Priority: **High** — Core engine classes (`Container.ts`, `Particle.ts`, `Particles.ts`, `Canvas.ts`, `Engine.ts`) and utility functions (`Utils.ts`, `ColorUtils.ts`, `MathUtils.ts`) need unit test coverage first. Plugin interfaces need contract tests. Integration tests needed for the animation lifecycle.

**No Integration/E2E Tests:**

- What's not tested: Full particle lifecycle (create → animate → interact → destroy). Plugin loading and initialization. Canvas rendering output. Event system. Container lifecycle (init → start → pause → resume → destroy).
- Files: No integration or E2E test infrastructure exists.
- Risk: System-level bugs (plugin interaction conflicts, memory leaks in lifecycle, rendering glitches) cannot be caught automatically.
- Priority: **Medium** — After unit test coverage improves, add integration tests for container lifecycle and plugin loading.

---

_Concerns audit: 2026-02-17_
