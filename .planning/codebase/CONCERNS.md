# Codebase Concerns

**Analysis Date:** 2026-03-03

This document enumerates technical debt, fragile areas, security and performance concerns, and maintenance risks found by scanning the repository. Each item includes the location (file paths), a severity rating, suggested mitigation, and tests/benchmarks required to validate the fix.

---

1. Global singletons & globalThis pollution

- Issue: Several packages attach public APIs or use globals on `globalThis`, creating implicit global state and potential collisions.
  - Files: `engine/src/index.ts`, `engine/src/bundle.ts` (`globalThis.tsParticles = tsParticles`),
    `bundles/fireworks/src/fireworks.ts` (sets `globalThis.fireworks`),
    `bundles/confetti/src/confetti.ts` (sets `globalThis.confetti`),
    `bundles/pjs/src/index.ts` (sets `globalThis.particlesJS`, `globalThis.pJSDom`, `globalThis.Particles`)
- Severity: Medium → High (library consumers can accidentally overwrite or depend on global state)
- Why it matters: Global exposure breaks encapsulation, makes testing harder, and risks conflicts when multiple versions or other libs define the same globals.
- Mitigation:
  - Prefer explicit exports from bundles and avoid writing to `globalThis` by default. If a global is required for browser UMD builds, gate the global assignment behind an explicit bundler/build-time flag or `if (typeof globalThis !== "undefined" && !globalThis.__TSPARTICLES_GLOBAL__)` guard.
  - Provide a small wrapper that conditionally assigns the global only when consumers opt into a global usage (e.g., UMD build or explicit init API).
- Tests/benchmarks:
  - Unit tests that import bundles in a node/jsdom environment and assert no new globals are created unless a new `createGlobal` flag is passed.

---

2. Memoization implementation: heavy default keyer & unbounded/stale cache

- Issue: `memoize` in `engine/src/Utils/Utils.ts` uses a default `stableStringify` keyer that deeply serializes arguments (including functions and symbols) and can be very expensive. Cache entries are only expired when accessed; TTL and maxSize defaults are absent which can lead to unbounded memory growth.
- Files: `engine/src/Utils/Utils.ts` (function `memoize`)
- Severity: High (CPU and memory pressure on hot-code paths if memoize used without options)
- Why it matters: Deep-serializing large objects on hot paths causes high CPU and memory churn. Unbounded caches leak memory in long-lived apps.
- Mitigation:
  - Make the default behavior conservative: either require an explicit `keyFn` or set a reasonable default `maxSize` (e.g. 1000) and TTL (e.g. 60s) for library-level memoize uses.
  - Provide documentation and clear examples showing when callers must pass a `keyFn` for complex objects.
  - Replace the deep stable stringify with a lighter-weight, deterministic keyer for common cases (e.g., arrays/primitive args), and keep deep serialization only when caller opts in.
  - Purge expired entries proactively (periodic sweep) or track insertion timestamps and evict on writes rather than only on read.
- Tests/benchmarks:
  - Microbenchmarks comparing `memoize` default keyer vs. `keyFn` for common call shapes (primitive args, options objects).
  - Memory/GC test that runs long-lived workload using default `memoize` without maxSize to show leak; then validate after mitigation.

---

3. deepExtend complexity & prototype-pollution edge-cases

- Issue: `deepExtend` in `engine/src/Utils/Utils.ts` includes protections for dangerous keys (`__proto__`, `constructor`, `prototype`) but performs recursive merging with `deepExtend(undefined, v)` which can be expensive and may hit recursion limits for deeply nested structures.
- Files: `engine/src/Utils/Utils.ts` (`deepExtend`)
- Severity: Medium
- Why it matters: Unbounded recursion can cause call-stack overflows with malicious or deeply nested user-provided option objects. The function tries to mitigate prototype pollution, but complex object shapes or unusual prototypes could still be a risk.
- Mitigation:
  - Add an explicit maximum recursion depth (configurable) and return/throw a clear error when exceeded.
  - Add unit tests that target malicious inputs and deep nesting to ensure defensive behavior.
  - Consider switching to an iterative merge algorithm for deep structures to avoid deep recursion on user inputs.
- Tests/benchmarks:
  - Tests that pass objects with > 10k nesting depth and assert predictable behavior (error or safe truncation).
  - Fuzz tests with keys containing `constructor`/`__proto__` to ensure no prototype pollution in real JS engines.

---

4. Use of DOM APIs without robust server-side checks (safeDocument semantics)

- Issue: `safeDocument()` currently returns `globalThis.document` without null-check. Many modules call `safeDocument().createElement(...)` and assume a Document will be present.
- Files: `engine/src/Utils/Utils.ts` (`safeDocument` and many uses), `plugins/trail/src/TrailPluginInstance.ts`, `plugins/backgroundMask/src/BackgroundMaskPluginInstance.ts`, `plugins/emittersShapes/path/src/EmittersPathShape.ts`, `shapes/image/src/ImageDrawer.ts`, `utils/canvasUtils/src/Utils.ts`, and many more (search results showed dozens).
- Severity: Medium
- Why it matters: Importing library code on the server (SSR, pre-rendering) will throw when `document` is undefined. Tests already rely on jsdom fixtures (mutating `globalThis.window`) to provide `document`; that pattern is fragile and can cause test order dependence.
- Mitigation:
  - Change `safeDocument()` to return a typed optional (Document | undefined) and make callers handle the undefined case gracefully.
  - For functions that _must_ access document (creating a canvas for offscreen work), add a defensive check and provide a clear error message instructing consumers to run under a DOM-like environment or to pass in a factory/helper.
  - Consider an explicit library bootstrap API that accepts a DOM factory (for non-browser environments) instead of relying on `globalThis.document` implicitly.
- Tests/benchmarks:
  - Add unit tests that import modules in a pure Node (no jsdom) environment and assert they either noop or throw a clear, documented error.

---

5. Global usage for optional feature flags / filters via `globalThis` lookups

- Issue: Several plugins accept a `filter` name (string) and look it up on `globalThis` (e.g. `plugins/emittersShapes/canvas/src/EmittersCanvasShape.ts`, `plugins/canvasMask`, `plugins/sounds`). This allows injecting external functions by populating the global scope.
- Files: `plugins/emittersShapes/canvas/src/EmittersCanvasShape.ts`, `plugins/canvasMask/src/Options/Classes/CanvasMaskPixels.ts`, `plugins/sounds/src/Options/Classes/SoundsEvent.ts`, `plugins/polygonMask/src/utils.ts` (accesses `globalThis.SVGPathSeg`)
- Severity: Medium
- Why it matters: The approach is brittle and encourages hidden dependencies via globals. It complicates bundling and breaks isolation; also it makes security auditing harder since global functions might be untrusted.
- Mitigation:
  - Replace `globalThis` lookups with explicit registration APIs (e.g., `registerPixelFilter(name, fn)`), or accept function references in options (instead of string keys).
  - Deprecate the global lookup pattern and log warnings when used.
- Tests/benchmarks:
  - Tests verifying that the new registration API works and that legacy `globalThis` lookups emit a deprecation warning.

---

6. Demo & playground code uses eval / innerHTML and user-controlled content

- Issue: Demo files (`demo/vanilla/public/javascripts/playground.js`, `demo/vanilla/public/javascripts/demo.js`) call `eval(editor.getValue())` and set `innerHTML` with user content.
- Files: `demo/vanilla/public/javascripts/playground.js`, `demo/vanilla/public/javascripts/demo.js` (multiple innerHTML assignments)
- Severity: Low → Medium (demos only, not core library) but still dangerous for users running demos and for contributors testing locally
- Why it matters: `eval` and direct innerHTML can execute arbitrary code and facilitate XSS in hosted demos. They also make the demo code potentially unsafe to run with live user input.
- Mitigation:
  - Replace `eval` with a safe sandbox or use Function constructors with clear scoping, or better, avoid running arbitrary user code. For demo code that must execute user input, run it inside an iframe with strict CSP.
  - Avoid innerHTML for user-controlled content; use textContent or DOM creation APIs.
- Tests/benchmarks:
  - Manual security review of demo pages; automated static analysis tools (for XSS) against demo files.

---

7. setInterval / setTimeout lifecycle risks and potential leaks

- Issue: Several modules use `setInterval`/`setTimeout` for short polling loops during initialization and for animations. If these timers are not cleared (race conditions or early returns), they may leak.
- Files: `bundles/fireworks/src/fireworks.ts` (initializing wait loop uses `setInterval`), `bundles/confetti/src/confetti.ts`, `interactions/external/particle/src/InteractivityParticleMaker.ts` (uses `_clearTimeout`), `plugins/polygonMask/src/PolygonMaskInstance.ts` (redrawTimeout), `plugins/poisson/src/PoissonDiscPluginInstance.ts` (redrawTimeout)
- Severity: Medium
- Why it matters: Leaked timers keep closures alive, cause memory leaks, and may cause behavior after components are destroyed.
- Mitigation:
  - Ensure all timer handles are stored on instances and always cleared in cleanup/destroy paths.
  - Replace polling `setInterval` initializing waits with Promise/async coordination where possible (e.g., wait for `initialized` via a Promise that resolves exactly once). If polling is required, add a timeout fallback and defensive cancellation.
  - Audit all `.redrawTimeout`, `_clearTimeout`, and similar fields to ensure clearTimeout is always called in `destroy()`.
- Tests/benchmarks:
  - Unit tests that create/destroy plugin instances and assert that no active timers remain (e.g., by spying on `setTimeout`/`setInterval` and `clearTimeout`/`clearInterval`).

---

8. Use of dynamic `import()` for plugin loading with no graceful failure path

- Issue: Bundles such as `bundles/fireworks` and `bundles/confetti` use dynamic `import()` to load optional plugins. If an import fails (missing package, networked ESM in some runtimes), the bundle rejects and higher-level APIs might not provide clear errors.
- Files: `bundles/fireworks/src/fireworks.ts`, `bundles/confetti/src/confetti.ts` (calls to `import("@tsparticles/...")`)
- Severity: Medium
- Why it matters: Dynamic imports make runtime behavior dependent on package resolution; failing to load optional plugin should degrade gracefully rather than throwing or blocking initialization.
- Mitigation:
  - Wrap dynamic imports in try/catch and provide informative error messages and fallback behavior.
  - Document the required peer packages or provide a single entry bundle that includes the common optional pieces for UMD consumers.
- Tests/benchmarks:
  - Tests that simulate missing dynamic imports (mock the import to throw) and assert the API rejects with a descriptive error and does not leave partial state.

---

9. Tests mutate global runtime and rely on shared global state (flaky test risk)

- Issue: Tests in `utils/tests` frequently set `globalThis.window`, `globalThis.devicePixelRatio`, or assign `globalThis` properties. Tests also suppress many eslint rules and use `any` castings.
- Files: `utils/tests/src/tests/*`, `utils/tests/src/Fixture/*` (e.g., `Fixture/Window.ts`, `CustomCanvas.ts`, `fixtures/canvas-fixtures.ts`)
- Severity: Medium
- Why it matters: Mutating globals makes tests order-dependent and fragile when run in parallel (Vitest workers). Global mutations can leak between tests and cause flakiness.
- Mitigation:
  - Use isolated jsdom per test file (Vitest supports per-file jsdom VMs) or reset global state in test setup/teardown (`beforeEach`/`afterEach`).
  - Avoid `as any` and add typed wrappers for fixtures where practical to reduce `any` usage.
  - Replace global devicePixelRatio mutation with a helper that saves/restores the original value.
- Tests/benchmarks:
  - Run the test suite in parallel multiple times (CI job) to detect flakiness; add CI gating that fails when tests are nondeterministic.

---

10. Large/minified legacy JS files and unmaintained shims (polygon pathseg)

- Issue: `plugins/polygonMask/src/pathseg.js` is a large legacy shim that references `SVGPathElement.pathSegList` (deprecated) and contains `FIXME`/`TODO` comments. It also relies on globals.
- Files: `plugins/polygonMask/src/pathseg.js`, `plugins/polygonMask/src/utils.ts` (usage of `globalThis.SVGPathSeg`)
- Severity: Low → Medium (feature correctness risk across browsers)
- Why it matters: Using deprecated DOM APIs (SVGPathSeg) will break in modern browsers; large legacy file is hard to maintain or audit for bugs.
- Mitigation:
  - Replace the legacy shim with a well-scoped modern implementation that uses current SVG path APIs, or detect and use alternate implementations.
  - Add feature-detection tests and a graceful fallback to a safe shape-path generator if the browser lacks API support.
- Tests/benchmarks:
  - Integration tests that exercise polygon mask behavior across browsers/renderer targets (headless chrome/jsdom equivalence checks).

---

11. Remote asset references in library bundles

- Issue: `bundles/fireworks/src/fireworks.ts` references audio files hosted at `https://particles.js.org/...`.
- Files: `bundles/fireworks/src/fireworks.ts` (audio URLs)
- Severity: Low → Medium (availability & privacy)
- Why it matters: Relying on remote assets at runtime introduces availability and privacy concerns and creates a runtime network dependency for demos and functionality that might be expected to be local.
- Mitigation:
  - Ship a local fallback or bundle small assets with the demo package; make remote audio optional and document requirement.
- Tests/benchmarks:
  - Unit tests that mock network fetches for audio and verify fallback paths.

---

12. Performance: per-frame allocations & hot-path object churn

- Issue: The engine performs many object allocations in frequently-called utility functions (e.g., collision math, vector rotations, memoize stable stringify), and some path/shape generators create temporary canvases/images via `createElement`.
- Files: `engine/src/Utils/Utils.ts` (e.g., `circleBounce`, `circleBounceDataFromParticle`), `engine/src/Utils/MathUtils.ts`, `utils/canvasUtils/src/Utils.ts`, various updaters/drawers
- Severity: Medium → High for high particle counts
- Why it matters: Per-frame allocations lead to GC pressure and jank at high particle counts or on low-end devices.
- Mitigation:
  - Introduce object pooling for hot objects (Vectors, temporary bounds, collision data). The AGENTS.md already mentions pooling as a guideline — follow it for concrete hot-paths.
  - Audit hot functions with a profiler and optimize expensive operations (avoid Math.hypot where micro-optimizations matter or reuse distance squared where possible).
  - Avoid allocating DOM elements in render loops; reuse offscreen canvas instances per container instead of recreating them repeatedly.
- Tests/benchmarks:
  - Add performance benchmarks that run typical particle configurations at varying counts (1k, 5k, 10k particles) and measure frame time and GC events.
  - Use browser performance API or headless Chrome traces to validate reductions.

---

13. Dependency & monorepo maintenance risks

- Issue: The workspace uses many internal packages and dynamic plugin-loading expectations. Updating or removing internal workspace packages can break dynamic imports and bundles.
- Files: workspace root `package.json`, `pnpm-workspace.yaml`, dynamic imports in bundles/plugins
- Severity: Medium
- Why it matters: A monorepo with many packages requires coordinated dependency updates and clear deprecation policies; otherwise CI and published bundles risk breakage.
- Mitigation:
  - Keep a clear compatibility matrix in docs for bundles and plugin package versions.
  - Add CI checks that validate that dynamic imports referenced by bundles are present in the workspace or in published dependencies.
- Tests/benchmarks:
  - CI job that builds all bundles and simulates missing peer packages to ensure graceful failures.

---

14. Test coverage gaps and fragile visual/canvas tests

- Issue: Canvas-heavy features and rendering behaviors are tested in `utils/tests` using jsdom and `canvas`/`canvas` package, but testing determinism for rendering is challenging. The repository's research notes already call out "flaky canvas tests".
- Files: `utils/tests/*`, `utils/tests/src/Fixture/*`
- Severity: Medium
- Why it matters: Rendering regressions are easy to introduce and hard to detect via unit tests; flakiness undermines developer confidence.
- Mitigation:
  - Stabilize canvas tests: avoid timing-based assertions, prefer deterministic input and snapshot-based comparisons where feasible.
  - Use fixtures and factories that isolate environmental differences (devicePixelRatio, window sizes) and ensure tests reset any global mutations.
  - Add headless integration tests in CI (Chromium) that run a small set of deterministic rendering scenarios and capture golden images.
- Tests/benchmarks:
  - CI image snapshot comparison job with tolerances for minor antialias differences.

---

Priority summary (short-term):

- High priority: Memoize default behavior (CPU/memory), Global `safeDocument` checks (SSR/test stability), Per-frame allocation hotspots (performance), Test isolation (flakiness)
- Medium priority: Global exposure via `globalThis`, dynamic import error handling, setInterval/timeouts cleanup, deepExtend recursion limits
- Low priority: Demo `eval`/innerHTML hardening, legacy pathseg file replacement, remote asset bundling

---

If desired, I can generate a prioritized remediation plan with concrete code changes, test updates, and micro-benchmarks for the top 4 high-priority items.

_Concise mapping of mentioned files (for quick navigation):_

- `engine/src/Utils/Utils.ts` (memoize, deepExtend, safeDocument, many helpers)
- `engine/src/Utils/MathUtils.ts` (animation loop abstraction, random, animate/cancel)
- `engine/src/Core/Utils/EventListeners.ts` (event listener lifecycle)
- `engine/src/index.ts`, `engine/src/bundle.ts` (globalThis exports)
- `bundles/fireworks/src/fireworks.ts`, `bundles/confetti/src/confetti.ts` (dynamic imports, globals, remote assets)
- `plugins/polygonMask/src/pathseg.js`, `plugins/polygonMask/src/utils.ts` (legacy SVGPathSeg usage)
- `plugins/*` and `shapes/*` (numerous safeDocument.createElement calls)
- `utils/tests/src/Fixture/*` and `utils/tests/src/tests/*` (fragile tests, global mutations)
