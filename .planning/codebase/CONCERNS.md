# Codebase Concerns

**Analysis Date:** 2026-04-10

## Tech Debt

**Legacy SVG path compatibility layer (`polygonMask`):**

- Issue: The plugin ships and executes a large legacy `SVGPathSeg` polyfill, and the code itself documents unimplemented and unoptimized behavior.
- Files: `plugins/polygonMask/src/pathseg.js`, `plugins/polygonMask/src/PolygonMaskInstance.ts`, `plugins/polygonMask/src/utils.ts`
- Impact: High maintenance overhead, browser-compatibility edge cases, and harder debugging in modern SVG runtimes.
- Fix approach: Isolate the polyfill behind a capability gate, migrate path parsing away from `pathSegList`/`SVGPathSeg`, and remove `pathseg.js` from default execution path once modern parser coverage is in place.

**Global singleton and global namespace mutation:**

- Issue: Multiple bundles mutate `globalThis` directly for runtime API exposure.
- Files: `engine/src/index.ts`, `engine/src/bundle.ts`, `bundles/confetti/src/confetti.ts`, `bundles/fireworks/src/fireworks.ts`, `bundles/pjs/src/index.ts`
- Impact: Cross-bundle collisions and brittle embedding behavior when multiple builds are loaded on one page.
- Fix approach: Keep global assignment only in explicit legacy entrypoints, and prefer factory exports for modern module consumers.

**Inconsistent legacy error style in polyfill:**

- Issue: The polyfill throws string errors (`throw "INDEX_SIZE_ERR"`) instead of `Error` objects.
- Files: `plugins/polygonMask/src/pathseg.js`
- Impact: Lower-quality stack traces and inconsistent error handling across the codebase.
- Fix approach: Normalize throws to `Error` objects and include typed error codes.

**Asynchronous initialization without failure surface:**

- Issue: Critical async loading paths run in fire-and-forget closures without explicit error propagation.
- Files: `paths/svg/src/SVGPathGenerator.ts`, `plugins/polygonMask/src/PolygonMaskInstance.ts`
- Impact: Silent feature degradation when remote assets fail; behavior differs by timing.
- Fix approach: Route async failures through `getLogger().error(...)` and expose plugin/container readiness state before particle generation begins.

## Known Bugs

**Axis offset mismatch in bounds checks:**

- Symptoms: Boundary checks can use swapped offsets (`offset.x` in height/top check and `offset.y` in width/right check), producing incorrect inside/outside evaluation.
- Files: `engine/src/Utils/Utils.ts`
- Trigger: Any non-zero `offset` values passed into `areBoundsInside(...)` for directional checks.
- Workaround: Avoid non-zero asymmetric offsets until the axis usage is corrected.

**SVG path generator race on remote path load:**

- Symptoms: Path-following particles can initialize before remote SVG paths are loaded.
- Files: `paths/svg/src/SVGPathGenerator.ts`
- Trigger: `particles.move.path.options.url` configured and generation starts before async `fetch(url)` completes.
- Workaround: Prefer inline `options.path.data` or preload remote SVG before container start.

**Overlap plugin can hard-fail placement:**

- Symptoms: Particle creation can throw and abort placement when retries are exceeded.
- Files: `interactions/particles/collisions/src/OverlapPluginInstance.ts`
- Trigger: Dense scenes with `collisions.overlap.enable = false` and low retry budget.
- Workaround: Increase `collisions.overlap.retries` or reduce particle density/size.

## Security Considerations

**Unrestricted remote fetch inputs in runtime options:**

- Risk: Runtime config can trigger network fetches for arbitrary URLs (config JSON, SVG, images, audio, GIF), enabling untrusted remote content loading.
- Files: `engine/src/Core/Engine.ts`, `plugins/polygonMask/src/PolygonMaskInstance.ts`, `paths/svg/src/SVGPathGenerator.ts`, `shapes/image/src/Utils.ts`, `shapes/image/src/GifUtils/Utils.ts`, `plugins/sounds/src/SoundsPluginInstance.ts`
- Current mitigation: Response status checks exist in some paths; no URL allowlist/origin policy enforcement is present.
- Recommendations: Validate/allowlist URL origins at option load boundaries and add a documented secure-default policy for external asset loading.

**Prototype/global surface mutation in browser context:**

- Risk: The polyfill mutates `window.SVGPathElement.prototype` and global constructors.
- Files: `plugins/polygonMask/src/pathseg.js`
- Current mitigation: Guarded by `typeof window !== "undefined"`.
- Recommendations: Scope polyfill activation to explicit opt-in and isolate from non-polygon consumers.

## Performance Bottlenecks

**Path segment append rewrites full path string:**

- Problem: Appending one segment rewrites the entire `d` attribute (`_writeListToPath`) and includes a TODO acknowledging this.
- Files: `plugins/polygonMask/src/pathseg.js`
- Cause: Full serialization on every append/update.
- Improvement path: Apply incremental append logic for common operations and batch writes during path mutations.

**Recursive random-point search in polygon placement:**

- Problem: `_randomPoint()` recurses until it finds a valid point.
- Files: `plugins/polygonMask/src/PolygonMaskInstance.ts`
- Cause: Unbounded retry strategy on difficult polygon/option combinations.
- Improvement path: Replace recursion with bounded iterative retries and deterministic fallback.

**Poisson sampling can be expensive on large canvases:**

- Problem: `run()` loops until active set exhaustion and yields with `setTimeout` every 100 iterations.
- Files: `plugins/poisson/src/PoissonDisc.ts`, `plugins/poisson/src/PoissonDiscPluginInstance.ts`
- Cause: Computational complexity scales with area, radius, retries, and dimensions.
- Improvement path: Add progress/cancel hooks, cap work per frame, and document safe option envelopes for large scenes.

## Fragile Areas

**Polygon mask pipeline is brittle across browser APIs:**

- Files: `plugins/polygonMask/src/PolygonMaskInstance.ts`, `plugins/polygonMask/src/utils.ts`, `plugins/polygonMask/src/pathseg.js`
- Why fragile: Depends on polyfilled legacy path APIs, DOM parsing, remote fetch, and recursive point generation in one flow.
- Safe modification: Change one stage at a time (parse, transform, random placement) and verify with both inline SVG data and remote SVG URL flows.
- Test coverage: No dedicated tests detected for `polygonMask` behavior.

**Runtime behavior depends on global environment assumptions:**

- Files: `engine/src/Utils/Utils.ts`, `engine/src/index.ts`, `engine/src/bundle.ts`
- Why fragile: `safeDocument()` returns `globalThis.document` directly and entrypoints mutate globals.
- Safe modification: Add environment guards before DOM access and keep module exports usable without global side effects.
- Test coverage: Current tests are concentrated under `utils/tests/src/tests/*` and do not provide broad multi-package SSR/non-browser validation.

## Scaling Limits

**Collision placement retry ceiling:**

- Current capacity: Works while free placement exists within configured retry budget.
- Limit: Throws once `tryCount > retries` in dense overlap-restricted scenes.
- Scaling path: Introduce graceful degradation mode (skip particle instead of throw) and adaptive retries based on density.

**Audio asset preloading footprint:**

- Current capacity: Preloads configured sound sources into `_audioMap` buffers.
- Limit: Memory and startup latency increase with number/size of configured audio files.
- Scaling path: Add lazy loading, cache eviction, and per-event preload toggles.

## Dependencies at Risk

**Bundled `SVGPathSeg` polyfill implementation:**

- Risk: Legacy API shim (`pathseg.js`) has known TODO/FIXME markers and invasive prototype patching.
- Impact: Browser compatibility regressions and difficult long-term maintenance.
- Migration plan: Replace with a modern SVG path parser abstraction and deprecate `pathSegList` reliance in `polygonMask`.

## Missing Critical Features

**No centralized external-resource policy:**

- Problem: External resource loading is spread across modules with inconsistent error handling and no unified trust policy.
- Blocks: Secure-by-default deployments that need strict origin control for config/media/path resources.

**No dedicated plugin-level regression suite for high-risk integrations:**

- Problem: Critical plugins (`polygonMask`, `sounds`, `export video`, `svg path`) lack visible dedicated tests in the workspace test package.
- Blocks: Safe refactoring of browser integration boundaries and confidence in cross-browser behavior.

## Test Coverage Gaps

**High-risk plugins are under-tested:**

- What's not tested: `polygonMask` parsing/bounce flows, audio fetch/decode behavior, video export MIME selection/recording flow, async remote SVG path load timing.
- Files: `plugins/polygonMask/src/PolygonMaskInstance.ts`, `plugins/polygonMask/src/utils.ts`, `plugins/sounds/src/SoundsPluginInstance.ts`, `plugins/exports/video/src/ExportVideoPluginInstance.ts`, `paths/svg/src/SVGPathGenerator.ts`
- Risk: Regressions can land in runtime-only paths without early detection.
- Priority: High

**Tests are concentrated in a single package:**

- What's not tested: Cross-package integration behavior across `engine/`, `plugins/`, `paths/`, `shapes/`, and `interactions/` at workspace level.
- Files: `utils/tests/src/tests/Options.ts`, `utils/tests/src/tests/Particle.ts`, `utils/tests/src/tests/Particles.ts`, `utils/tests/src/tests/Utils.ts`, `utils/tests/src/tests/deepExtend.test.ts`, `utils/tests/src/tests/memoize.test.ts`
- Risk: Package-local changes can pass utility-focused tests while breaking integration flows.
- Priority: Medium

---

_Concerns audit: 2026-04-10_
