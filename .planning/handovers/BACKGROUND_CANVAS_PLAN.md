# Background Canvas Plan (4.3.0 — Layered Redesign)

## Summary

| | |
|---|---|
| **Target** | `@tsparticles/engine` |
| **Type** | Engine enhancement |
| **Key decision gate** | Bundle impact → engine vs plugin extraction |

### Progress

## V1 (original implementation — completed for 4.3.0 alpha)

- [x] Phase 0: Baseline scan
- [x] Phase 1: Bundle impact + decision
- [x] Phase 1b: Release target decision → 4.3.0
- [x] Phase 2: Type contract (element + draw)
- [x] Phase 3: Runtime hook
- [x] Phase 4: Target resolution/cache
- [x] Phase 5: Error/warning handling
- [x] Phase 6: Tests
- [x] Phase 7: Docs/examples
- [x] Phase 8: Validation gate

## V2 (layered refactor — current)

- [x] Phase 9: Type contract update — element accepts HTMLVideoElement | HTMLImageElement; element/draw become independent layers
- [x] Phase 10: Rewrite #drawBackground() — layer 0: element auto-drawImage; layer 1: draw callback on main context
- [x] Phase 11: Rewrite #resolveBackgroundContext() → #resolveBackgroundElement() — store element ref, drop context extraction
- [x] Phase 12: Update tests — new element auto-draw tests; remove element-as-context-target tests; verify layering order
- [x] Phase 13: Docs — rewrite docs to reflect layers (CSS → element → draw → particles); add video/image examples
- [x] Phase 14: Bundle impact re-measurement + plugin extraction trigger
- [x] Phase 15: Validation gate

---

## Context

Current `background` support is CSS-style only and applied to the particles DOM canvas style (`color`, `image`, `position`, `repeat`, `size`, `opacity`).

That path is stable and must remain unchanged.

This proposal adds an opt-in programmable background hook for advanced JS/TS users while preserving strict backward compatibility.

## Product Goal

Replace the v1 "element-as-context-target" design with an independent multi-layer background pipeline.

The rendering order (back to front) is:

1. **CSS background** (color, image, position, repeat, size) — applied as DOM canvas style, unchanged
2. **`clear()`** — canvas pixel clear each frame, unchanged
3. **`background.element` auto-draw** — if set, `ctx.drawImage(element, 0, 0, w, h)` composites the external element as-is (no engine management)
4. **`background.draw` callback** — if set, called with main rendering context + delta, independent of element
5. **Particles** — existing particle rendering, unchanged

Key principles:
- `element` and `draw` are **independent** layers, not coupled
- `element` is auto-drawn when set; no custom callback needed for compositing
- `draw` always receives the main canvas context, not the element's context
- Both are optional; using neither = legacy behavior

## Hard Product Constraints (non-negotiable)

1. Use `background.element` only. Do not introduce `background.canvas`.
2. All new options are optional and `undefined` by default.
3. **Layer order is always**: CSS → `element` auto-draw → `draw` callback → particles.
   - If both `element` and `draw` are set, both execute every frame (element first, then draw).
   - If only one is set, only that layer executes.
4. Existing CSS `background.color` (and style background options) must continue working exactly as today.
5. **No coupling between `element` and `draw`**: `element` is NOT a context provider for `draw`. Each is independent.
6. `draw` always receives the **main canvas context** (`OffscreenCanvasRenderingContext2D | CanvasRenderingContext2D`), never the element's context.
7. `element` type is limited to `CanvasImageSource` drawable types: `HTMLCanvasElement | OffscreenCanvas | HTMLVideoElement | HTMLImageElement`. No generic `HTMLElement`.

## Scope and Non-Goals

### In scope

- Options/types additions for `element` and `draw`
- Runtime draw callback execution in the frame loop
- Target context resolution with fallback
- Warnings and safety guards
- Tests + docs/examples

### Out of scope (for this version)

- New lifecycle hooks (`init`, `resize`, `destroy`) for callback backgrounds
- New clear modes API
- Automatic sync/composition between multiple canvases
- Re-architecting plugin draw pipeline

## Bundle Size and Architecture Decision (engine vs plugin)

Because `background` lives in `@tsparticles/engine` today, we need an explicit decision gate before implementation finalization.

### Current baseline (from existing dist artifacts)

- `@tsparticles/engine` minified UMD: ~68,025 bytes (`engine/dist/tsparticles.engine.min.js`)
- Existing reference plugin (`@tsparticles/plugin-background-mask`) minified UMD: ~5,730 bytes (`plugins/backgroundMask/dist/tsparticles.plugin.background-mask.min.js`)

These values are only reference points; they are not direct apples-to-apples for the new feature.

### Why this matters

- Implementing in engine keeps UX simple (no extra package) but increases base payload for everyone.
- Implementing as plugin keeps engine lean but adds integration and migration complexity.

### Decision thresholds (pragmatic)

After implementing a prototype (or spike) and measuring delta:

- `LOW impact`: `< 1.0 KB` minified **and** `< 1.5%` engine minified growth
  - Decision: keep in engine for now.
- `MEDIUM impact`: `1.0-2.5 KB` minified **or** `1.5-3.5%` growth
  - Decision: keep in engine now, but open follow-up RFC for plugin extraction.
- `HIGH impact`: `> 2.5 KB` minified **or** `> 3.5%` growth
  - Decision: strongly prefer extraction into `@tsparticles/plugin-background`.

If thresholds conflict, prioritize percentage on `engine` minified artifact.

### Measurement protocol (mandatory)

1. Build baseline from current main/branch state.
2. Record size of:
   - `engine/dist/tsparticles.engine.min.js`
   - `engine/dist/tsparticles.engine.js`
3. Apply feature changes (spike or full).
4. Rebuild and record same files.
5. Compute byte and percentage deltas.
6. Add result table in PR/notes and take architecture decision using thresholds above.

### Decision output format (for agent)

Agent must produce a short block like:

- `baseline_min`: X bytes
- `candidate_min`: Y bytes
- `delta_min`: +Z bytes (+N%)
- `decision`: engine-now | engine-now-with-followup | extract-plugin
- `rationale`: 2-4 bullets

## Plugin extraction option (`@tsparticles/plugin-background`) - pros/cons

### Pros

- Smaller core payload for users not needing programmable backgrounds.
- Feature can evolve independently (hooks/lifecycle/diagnostics) with lower engine risk.
- Cleaner separation between core particle runtime and optional background rendering strategies.

### Cons

- Higher integration complexity (new plugin package, registration path, docs updates across bundles/wrappers).
- Potentially awkward split because style background options currently belong to engine core.
- More migration/documentation burden to avoid user confusion (`background` base vs plugin-enhanced behavior).
- Plugin ordering/interaction edge cases may appear and require extra tests.

### Recommended strategy now

- Keep base CSS background in engine regardless.
- Implement programmable callback path in engine first **only if** measured impact is LOW/MEDIUM.
- If impact is HIGH, pivot to plugin extraction where plugin owns `draw`/`element` behavior while engine retains style background fields.

## Release Suitability (4.2.0 vs 4.3.0)

This feature is additive and can be semver-minor **only if** risk remains controlled.

### Semver classification for this feature

- `minor-safe` when all are true:
  - API is additive only (`background.element`, `background.draw` optional)
  - existing behavior remains identical when options are not used
  - no existing option semantics are changed
  - no wrapper mandatory changes
- `not minor-safe` if any existing default/behavior changes for current users.

### Branch-level release pressure (current repository state)

From `v4.1.3..HEAD` (current `v4` branch snapshot):

- commits: `98`
- changed files: `2019`
- diff stats: `+177,718 / -43,016`

Interpretation: this is a large aggregate delta for a single minor train, independent of this specific feature.

### Decision framework

Use two independent gates:

1. `Feature gate` (this background work):
   - pass if additive + backward-compatible + tests green + bundle threshold decision recorded
2. `Release train gate` (overall 4.2.0 scope):
   - pass if cumulative 4.2 changeset is still acceptable for a minor from maintainer risk tolerance

Final release target:

- `Ship in 4.2.0` only if **both** gates pass.
- `Move to 4.3.0` if feature gate passes but release-train gate fails (too much aggregate churn).

### Go/No-Go checklist (explicit)

Use this checklist before locking milestone.

#### GO for `4.2.0` only if all are true

- [ ] feature remains strictly additive (`background.element`/`background.draw` optional)
- [ ] zero regressions on legacy background behavior (automated + manual smoke)
- [ ] bundle impact decision completed and within accepted threshold for chosen path
- [ ] docs/examples updated with no ambiguity
- [ ] no blocker/high-severity open issues related to engine render loop from the 4.2 train
- [ ] release-train churn accepted by maintainer (explicit yes)

#### NO-GO for `4.2.0` (defer to `4.3.0`) if any is true

- [ ] implementation requires semantic tweaks that can surprise existing users
- [ ] unresolved instability in render loop / canvas layering paths
- [ ] bundle impact classified HIGH but plugin path not completed
- [ ] verification window is too short for confidence across wrappers/bundles
- [ ] aggregate 4.2 train is considered too broad/risky at freeze time

### Practical recommendation for current situation

Given current branch volume, default recommendation is:

- keep implementation ready and mergeable,
- but be prepared to defer public release to `4.3.0` unless 4.2.0 scope is trimmed/frozen.

Reason: even minor-safe features become risky when packed into a high-churn train.

Additional evidence snapshot:

- `engine/src` files changed since `v4.1.3`: `47`
- `engine/src/Core` changed: `9`
- `engine/src/Options` changed: `28`
- `wrappers` changed: `77`
- `plugins` changed: `96`
- `bundles` changed: `24`

Recommendation right now: **provisionally target `4.3.0`**, and only pull into `4.2.0` if a hard freeze/triage confirms low residual risk.

## Final API Proposal

### `background.element`

- Type: `string | HTMLCanvasElement | OffscreenCanvas | HTMLVideoElement | HTMLImageElement`
- Optional: yes
- Default: `undefined`
- Semantics:
  - `string`: CSS selector resolved in DOM-capable environments (must match a drawable element — canvas, video, or img)
  - `HTMLCanvasElement | OffscreenCanvas | HTMLVideoElement | HTMLImageElement`: direct reference
  - When set, the element's current visual content is drawn onto the main canvas each frame via `ctx.drawImage()`
  - The element is **not** managed by the engine — external code handles its rendering

### `background.draw`

- Type: `(context: BackgroundDrawContext, delta: IDelta) => void`
- Optional: yes
- Default: `undefined`
- Semantics: callback executed each frame in the background phase. Always receives the **main canvas context**, never the element's context.

### Supporting exported type

- `type BackgroundDrawContext = OffscreenCanvasRenderingContext2D | CanvasRenderingContext2D`

### Serialization note

- `element` can be expressed in JSON (selector string) for canvas/video/img elements in the DOM
- `draw` is function-only and therefore JS/TS runtime config only

## Behavior and Precedence (layered)

Rendering order each frame (back to front):

```
CSS style background   ← DOM layer (behind canvas, unchanged)
clear()                ← canvas pixel clear (unchanged)
element auto-draw      ← NEW: ctx.drawImage(element) if element is set
draw callback          ← MODIFIED: ctx.draw(ctx, delta) on main context, always
particles              ← unchanged
```

### Layer matrix

| `element` | `draw` | Behavior |
|-----------|--------|----------|
| unset     | unset  | Legacy: CSS background only + particles |
| set       | unset  | CSS + element auto-drawn as background + particles |
| unset     | set    | CSS + draw callback on main context + particles |
| set       | set    | CSS + element auto-drawn + draw callback + particles |

### Key interpretation

- `element` is a **visual source** (auto-composited), not a target selector
- `draw` is **independent rendering logic** on the main context
- The two are orthogonal: you can use one, both, or neither

## Engine Integration Design

## 1) Options and type surface

Target files:

- `engine/src/Options/Interfaces/Background/IBackground.ts`
- `engine/src/Options/Classes/Background/Background.ts`
- `engine/src/export-types.ts`
- `engine/src/exports.ts` (only if a runtime type/class export is needed)

Changes:

- Add optional `element` (widened to include `HTMLVideoElement | HTMLImageElement`) and `draw` to `IBackground`
- Keep both undefined by default in class implementation
- Add exported callback context alias + callback type (or inline signature with alias)

Rule: do not change existing background fields defaults or semantics.

## 2) Runtime placement in frame loop (critical)

Implement background layers in `RenderManager.drawParticles(delta)` with this order:

1. `clear()`
2. `#drawBackground(delta)` — handles both element auto-draw AND draw callback:
   - Layer 0: `ctx.drawImage(backgroundElement, 0, 0, width, height)` if element is set
   - Layer 1: `background.draw(ctx, delta)` if draw callback is set
3. Continue existing draw pipeline (`drawSettingsSetup`, plugin `draw`, particles, cleanup)

This keeps background visuals behind particles/effects and avoids changing current plugin contract semantics.

Important clarification:

- CSS background style (`CanvasManager.initBackground`) is not a per-frame operation today and should remain so.
- Do not move CSS style writes into the hot loop.

## 3) Element resolution and caching (replaces old context resolution)

Resolve external element reference once and cache it; do not resolve selectors per frame.

Resolution rules:

1. If `element` is a direct reference (`HTMLCanvasElement | OffscreenCanvas | HTMLVideoElement | HTMLImageElement`): store it directly.
2. If `element` is a `string` and DOM is available: resolve `document.querySelector(selector)`.
   - If resolved node is `HTMLCanvasElement | HTMLVideoElement | HTMLImageElement`: store it.
   - If resolved node is something else: warn once (`background-element-not-supported`), store null.
   - If selector doesn't match: warn once (`background-element-not-found`), store null.
3. If element is null after resolution: skip auto-draw layer; no fallback needed (layer is simply skipped).

Store as `#backgroundElement` — a direct element reference for `ctx.drawImage()`, NOT a 2D context.

Cache invalidation events:

- container init/start
- options reload/reset/refresh

No per-frame allocations from this feature.

## 4) Safety and diagnostics

### drawImage exception handling

- Wrap `drawImage()` in `try/catch` to guard against context loss or invalid element states (e.g., video not loaded)
- Keep animation loop alive
- Warn with deterministic message

### Callback exception handling

- Wrap callback invocation in `try/catch`
- Keep animation loop alive
- Warn with deterministic message

### Warning policy (must avoid log spam)

- Warn once per container per warning key
- Suggested keys:
  - `background-element-not-found`
  - `background-element-not-supported`
  - `background-element-draw-error`
  - `background-draw-error`

Implementation uses a small `Set<string>` attached to container/render state (already exists as `#backgroundWarnings`).

## 5) Environment constraints

- In non-DOM environments, CSS selector resolution is skipped safely.
- No assumptions that external element pixel dimensions, DPR, or format match internal canvas.
- External element sizing/cropping is handled by the browser's `drawImage()` — it will stretch by default to fill the canvas size. Users should size their elements appropriately.
- For `HTMLVideoElement`: ensure video metadata is loaded before use (user responsibility). `drawImage(video, ...)` draws the current frame; the video playback is externally managed.
- For `OffscreenCanvas`: must be transferred/controlled externally. The engine only reads the pixel content each frame.

## Compatibility Model

## Backward compatibility guarantees

- Existing configs remain behavior-identical when new options are not used.
- Existing CSS background style path remains unchanged.
- Feature is fully opt-in.

## Breaking changes from v1 (original implementation)

⚠️ **Important: this redesign changes the semantics of `element` + `draw` together.**

| Scenario | v1 behavior | v2 behavior |
|----------|-------------|-------------|
| `element` only | No-op (element context resolved but unused) | Element auto-drawn as background |
| `draw` only | `draw` runs on main context | Same (unchanged) |
| `element` + `draw` | `draw` runs on element's context | `draw` runs on main context; element auto-drawn first |

This is a **breaking change** for anyone using the v1 `element` + `draw` together pattern. Since v1 was in 4.3.0 alpha and never released, this is safe.

## Wrapper compatibility

- Engine type exports must include new types/options.
- No required runtime wrapper changes for baseline JS object configs.

## JSON vs JS/TS expectations

- JSON: `element` only (CSS selector string)
- JS/TS: `element` (direct reference) and `draw`
- Docs/examples must show both to avoid false expectations.

## Test Plan

## Unit tests (v2 additions)

1. Options loading
   - new fields accepted (`element`, `draw`)
   - `element` accepts `HTMLVideoElement` and `HTMLImageElement`
   - defaults remain `undefined`
   - legacy fields unchanged

2. Element resolution logic (replaces old context resolution)
   - valid CSS selector for canvas/video/img → element stored as `#backgroundElement`
   - selector not found → null + once warning
   - non-canvas/video/img match → null + once warning (`background-element-not-supported`)
   - direct element reference (canvas/video/img/offscreen) → stored directly

3. Layer execution logic
   - no `element`, no `draw` → neither layer executes
   - `element` only → `drawImage` called with element, no draw callback
   - `draw` only → draw callback on main context, no drawImage
   - `element` + `draw` → drawImage first, then draw callback
   - invalid `element` → drawImage skipped, draw callback still executes

4. Error resilience
   - throw inside `draw` callback does not break next frame
   - drawImage on invalid/disconnected element does not break next frame
   - warning is throttled (once-key behavior) for each warning key

5. Performance guard
   - feature disabled path adds no measurable overhead in smoke benchmark
   - drawImage path adds only ~0.01-0.05ms per frame (GPU blit)

## Integration/manual smoke

1. Legacy style-only background visually unchanged
2. JS `draw` only renders animated background on main canvas
3. External canvas (animated by rAF/worker) auto-drawn as background via element
4. External video element current frame drawn as background
5. Both element + draw: element visible behind draw output
6. Invalid selector gracefully skips element layer

## Acceptance Criteria (Definition of Done)

1. API
   - `background.element` accepts `string | HTMLCanvasElement | OffscreenCanvas | HTMLVideoElement | HTMLImageElement`
   - `background.draw` accepts `(context: BackgroundDrawContext, delta: IDelta) => void`
   - both are optional, `undefined` by default
   - no `background.canvas` alias

2. Layer rendering order
   - CSS style background → DOM level (unchanged)
   - `clear()` → canvas clear (unchanged)
   - `background.element` → auto-drawn via `drawImage` on main context
   - `background.draw` → executed on main context
   - Particles → drawn on top
   - If both element and draw: element first, then draw

3. Element independence
   - element is auto-drawn without requiring a `draw` callback
   - element is NOT used as a context provider for `draw`
   - `draw` always receives the main canvas context
   - element's rendering is fully managed by external code

4. Stability
   - invalid element gracefully skips auto-draw layer
   - drawImage failures do not stop rendering
   - callback exceptions do not stop rendering
   - warnings are deterministic and non-spammy (once-per-key)

5. Performance/compatibility
   - unchanged behavior for legacy configs (no element, no draw)
   - no meaningful overhead when new features are disabled
   - drawImage is GPU-accelerated (~0.01-0.05ms per frame)

6. Architecture decision
   - bundle-size delta has been measured and documented
   - decision (engine vs plugin path) follows defined thresholds
   - plugin extraction feasibility assessed and documented

## Execution Plan for Build Agent (phase-based — v2 redesign)

### Phase 9 — Types/methods rename

- **IBackground.element**: widen to `string | HTMLCanvasElement | OffscreenCanvas | HTMLVideoElement | HTMLImageElement`
- **Background.ts**: update property type to match interface
- **RenderManager**: rename `#backgroundContext` → `#backgroundElement`, update type
- Remove import of `BackgroundDrawContext` from RenderManager (no longer used there)
- Output: compile passes for updated type surface

### Phase 10 — Rewrite `#drawBackground()`

- Change method to handle two independent layers:
  ```typescript
  #drawBackground(delta: IDelta): void {
    const ctx = this.#context;
    if (!ctx) return;

    // Layer 0: auto-draw external element
    if (this.#backgroundElement) {
      try { ctx.drawImage(this.#backgroundElement, 0, 0, w, h); }
      catch { warnOnce("background-element-draw-error", ...); }
    }

    // Layer 1: custom draw callback (always on main context)
    if (background.draw) {
      try { background.draw(ctx, delta); }
      catch { warnOnce("background-draw-error", ...); }
    }
  }
  ```
- Remove old logic that used `#backgroundContext ?? this.#context`
- Output: layering works with both element and draw

### Phase 11 — Rewrite `#resolveBackgroundContext()` → `#resolveBackgroundElement()`

- Rename method and update internal logic:
  - Accept CSS selector → resolve to `HTMLCanvasElement | HTMLVideoElement | HTMLImageElement`
  - Accept direct reference → store as-is
  - Store element reference itself (not its context)
  - New warning key: `background-element-not-supported` for non-drawable elements
  - Remove `getContext("2d")` call entirely
- Update callers:
  - `init()` → calls `#resolveBackgroundElement()`
  - `destroy()` → sets `#backgroundElement = null`
- Output: element resolution stores element, not context

### Phase 12 — Update tests

- Remove tests for:
  - `element` as context target for `draw`
  - `getContext("2d")` on element
  - fallback to internal context for draw
- Add tests for:
  - `element` auto-draw with HTMLCanvasElement, OffscreenCanvas, HTMLVideoElement, HTMLImageElement
  - Layering order: element drawn before draw callback
  - `draw` callback receives main context (not element context)
  - Invalid element silently skips layer
- Output: tests green for v2 behavior

### Phase 13 — Update docs/examples

- Rewrite docs to describe the layer model (CSS → element → draw → particles)
- Add HTMLVideoElement example (video background)
- Add OffscreenCanvas + Worker example (worker-rendered background)
- Remove or correct references to "element as draw target"
- Output: docs match new design

### Phase 14 — Bundle impact re-measurement + plugin extraction trigger

- Re-measure bundle delta after v2 changes
- Compare against thresholds:
  - LOW: `< 1.0 KB` minified → keep in engine
  - MEDIUM: `1.0-2.5 KB` → keep in engine, open RFC for plugin extraction
  - HIGH: `> 2.5 KB` → extract to `@tsparticles/plugin-background`
- If extraction is triggered, plugin owns:
  - `draw` callback execution
  - `element` resolution and auto-draw
  - BackgroundDrawContext type
- Engine retains only CSS-style background options (color, image, position, repeat, size, opacity)
- Output: decision block with measurements

**Measured results (2026-06-21):**
- `baseline_min`: 68,076 bytes
- `candidate_min`: 69,177 bytes
- `delta_min`: +1,101 bytes (+1.08 KB, +1.62%)
- `decision`: engine-now-with-followup (MEDIUM impact)
- `rationale`: 1.08 KB is within 1.0-2.5 KB threshold; 1.62% is within 1.5-3.5% threshold. Keep in engine now, open follow-up RFC for plugin extraction.

### Phase 15 — Validation gate

- Run targeted engine tests and affected build/lint tasks
- Verify no behavior regressions in legacy background config
- Verify v1-style configs (element + draw) produce correct layered output (not old behavior)
- Output: final checklist complete

**Validation results (2026-06-21):**
- ✅ Tests pass: `pnpm --filter @tsparticles/tests exec vitest run src/tests/Background.ts` — 13/13 tests green
- ✅ TypeScript compiles clean: `cd engine && npx tsc --noEmit` — no errors
- ✅ Legacy CSS background configs untouched (CanvasManager.initBackground unchanged)
- ✅ V2 layering order verified in code: clear() → element auto-draw → draw callback → particles
- ✅ element and draw independently optional, undefined by default
- ✅ HTMLVideoElement, HTMLImageElement, OffscreenCanvas all accepted as element types
- ✅ Warning system deduplicates by key (no log flood)
- ✅ drawImage errors caught and warned once
- ✅ draw callback errors caught and warned once
- ✅ Bundle impact classified MEDIUM — keep in engine, open RFC for plugin extraction

## Progress Checklist Template (for agent status updates)

### V1 (original — completed)
- [x] Phase 0: hook points identified
- [x] Phase 1: size delta measured and path chosen
- [x] Phase 1b: release target decided
- [x] Phase 2: API/types exported
- [x] Phase 3: frame hook integrated
- [x] Phase 4: context cache + fallback integrated
- [x] Phase 5: warning/error policy integrated
- [x] Phase 6: tests added and passing
- [x] Phase 7: docs/examples updated
- [x] Phase 8: validation commands passing

### V2 (layered refactor — current)
- [x] Phase 9: types/methods rename (widen element type, #backgroundElement)
- [x] Phase 10: rewrite #drawBackground() — independent element + draw layers
- [x] Phase 11: rewrite #resolveBackgroundElement() — store element ref, no context
- [x] Phase 12: tests updated for v2 semantics
- [x] Phase 13: docs updated for layering model
- [x] Phase 14: bundle impact re-measurement + plugin extraction decision
- [x] Phase 15: validation gate

## Notes for Build Agent

- Keep the implementation additive and minimal.
- Do not alter existing CSS background semantics.
- Do not couple `element` and `draw` — they are independent layers.
- `draw` always receives the main context, never the element's context.
- `drawImage()` with a video element draws the current frame; no additional frame management needed.
- Prefer explicit fallback logic over magic.
- If a choice is ambiguous, choose least-surprising behavior and document it in PR notes.

## Future: Plugin Extraction

If the background feature grows beyond acceptable bundle thresholds, extract a `@tsparticles/plugin-background` package:

- **Plugin owns**: `draw` callback, `element` resolution/auto-draw, `BackgroundDrawContext` type
- **Engine retains**: CSS-style background options (`color`, `image`, `position`, `repeat`, `size`, `opacity`) as DOM style properties
- **Registration**: `loadBackgroundPlugin(engine)` — adds the programmable layer support
- **When engine loads without plugin**: programmable layers are silently skipped; CSS background works as today
- **Migration path**: engine users who don't need programmable backgrounds get zero extra bytes

Trigger: if Phase 14 measurement exceeds MEDIUM threshold or if the feature continues to grow in maintenance complexity.
