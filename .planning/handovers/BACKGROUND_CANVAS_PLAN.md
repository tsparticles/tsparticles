# Background Canvas Plan (v5.0 Agent-Ready)

## Summary

| | |
|---|---|
| **Target** | `@tsparticles/engine` |
| **Phases** | 8 (0–8) |
| **Type** | Engine enhancement |
| **Load function** | N/A (built into engine) |
| **Key decision gate** | Phase 1: bundle impact → engine vs plugin; Phase 1b: 4.2.0 vs 4.3.0 |

### Progress

- [ ] Phase 0: Baseline scan
- [ ] Phase 1: Bundle impact + decision
- [ ] Phase 1b: Release target decision
- [ ] Phase 2: Type contract
- [ ] Phase 3: Runtime hook
- [ ] Phase 4: Target resolution/cache
- [ ] Phase 5: Error/warning handling
- [ ] Phase 6: Tests
- [ ] Phase 7: Docs/examples
- [ ] Phase 8: Validation gate

---

## Context

Current `background` support is CSS-style only and applied to the particles DOM canvas style (`color`, `image`, `position`, `repeat`, `size`, `opacity`).

That path is stable and must remain unchanged.

This proposal adds an opt-in programmable background hook for advanced JS/TS users while preserving strict backward compatibility.

## Product Goal

Add two optional fields under `background`:

- `background.element`: optional target canvas (`string` selector or `HTMLCanvasElement`)
- `background.draw`: optional callback called each frame with drawing context + delta

The goal is custom background rendering (procedural, animated, layered) without rewriting the existing rendering pipeline.

## Hard Product Constraints (non-negotiable)

1. Use `background.element` only. Do not introduce `background.canvas`.
2. Both new options are optional and `undefined` by default.
3. Explicit precedence:
   - highest: `background.draw`
   - fallback target: `background.element`
4. Existing CSS `background.color` (and style background options) must continue working exactly as today.
5. If `draw` exists, do not add any automatic compose/copy step between external and internal canvases.

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

- Type: `string | HTMLCanvasElement`
- Optional: yes
- Default: `undefined`
- Semantics:
  - `string`: CSS selector resolved in DOM-capable environments
  - `HTMLCanvasElement`: direct reference

### `background.draw`

- Type: `(context: BackgroundDrawContext, delta: IDelta) => void`
- Optional: yes
- Default: `undefined`
- Semantics: callback executed each frame in the background phase

### Supporting exported type

Introduce and export a type alias for clarity and Offscreen support:

- `type BackgroundDrawContext = OffscreenCanvasRenderingContext2D | CanvasRenderingContext2D`

Reason: internal engine rendering uses Offscreen contexts in many environments; callback typing must reflect runtime reality.

### Serialization note

- `element` can be expressed in JSON (selector string)
- `draw` is function-only and therefore JS/TS runtime config only

## Behavior and Precedence

1. No `draw`, no `element`
   - unchanged behavior only (CSS background + standard particles rendering)

2. `element` only
   - no background callback execution
   - no implicit rendering/compositing
   - CSS background behavior unchanged

3. `draw` only
   - callback runs on internal render context
   - CSS background behavior unchanged

4. `draw` + `element`
   - callback runs on resolved `element` context if valid
   - otherwise callback falls back to internal render context
   - no extra copy/composition between contexts
   - CSS background behavior unchanged

### Key interpretation

`element` is only target selection. `draw` is rendering logic. There is no hidden strategy beyond that.

## Engine Integration Design

## 1) Options and type surface

Target files:

- `engine/src/Options/Interfaces/Background/IBackground.ts`
- `engine/src/Options/Classes/Background/Background.ts`
- `engine/src/export-types.ts`
- `engine/src/exports.ts` (only if a runtime type/class export is needed)

Changes:

- Add optional `element` and `draw` to `IBackground`
- Keep both undefined by default in class implementation
- Add exported callback context alias + callback type (or inline signature with alias)

Rule: do not change existing background fields defaults or semantics.

## 2) Runtime placement in frame loop (critical)

Implement background callback in `RenderManager.drawParticles(delta)` with this order:

1. `clear()`
2. Execute background callback phase (new)
3. Continue existing draw pipeline (`drawSettingsSetup`, plugin `draw`, particles, cleanup)

This keeps background visuals behind particles/effects and avoids changing current plugin contract semantics.

Important clarification:

- CSS background style (`CanvasManager.initBackground`) is not a per-frame operation today and should remain so.
- Do not move CSS style writes into the hot loop.

## 3) Context resolution and caching

Resolve target context once and cache it; do not resolve selectors per frame.

Resolution rules:

1. If `element` is `HTMLCanvasElement`, try `getContext("2d")`
2. If `element` is `string` and DOM is available, resolve `document.querySelector`
3. If selected node is not a canvas, treat as invalid target
4. On any invalid/missing target, fallback to internal render context

Cache invalidation events:

- container init/start
- options reload/reset/refresh
- explicit background options change path (if applicable)

No per-frame allocations from this feature.

## 4) Safety and diagnostics

### Callback exception handling

- Wrap callback invocation in `try/catch`
- Keep animation loop alive
- Warn with deterministic message

### Warning policy (must avoid log spam)

- Warn once per container per warning key
- Suggested keys:
  - `background-element-selector-not-found`
  - `background-element-not-canvas`
  - `background-element-context-unavailable`
  - `background-draw-error`

Implementation can use a small `Set<string>` attached to container/render state.

## 5) Environment constraints

- In non-DOM environments, selector resolution is skipped safely.
- If an external canvas context cannot be obtained, fallback to internal context.
- No assumptions that external canvas size or DPR match internal canvas.
- External canvas sizing remains user responsibility (document this clearly).

## Compatibility Model

## Backward compatibility guarantees

- Existing configs remain behavior-identical when new options are not used.
- Existing background style path remains unchanged.
- Feature is fully opt-in.

## Wrapper compatibility

- Engine type exports must include new types/options.
- No required runtime wrapper changes for baseline JS object configs.

## JSON vs JS/TS expectations

- JSON: `element` only
- JS/TS: `element` and `draw`
- Docs/examples must show both to avoid false expectations.

## Test Plan

## Unit tests

1. Options loading
   - new fields accepted
   - defaults remain `undefined`
   - legacy fields unchanged

2. Resolution logic
   - valid selector -> canvas context
   - selector missing -> fallback + once warning
   - non-canvas match -> fallback + once warning
   - direct canvas without context -> fallback + once warning

3. Precedence logic
   - no `draw` -> callback never runs (even if `element` exists)
   - `draw` only -> internal context used
   - `draw` + valid `element` -> external context used
   - `draw` + invalid `element` -> internal fallback

4. Error resilience
   - throwing callback does not break next frame
   - warning is throttled (once-key behavior)

5. Performance guard
   - feature disabled path adds no measurable overhead in smoke benchmark

## Integration/manual smoke

1. Legacy style-only background visually unchanged
2. JS `draw` only renders animated background on internal canvas
3. JS `draw` + external `element` renders on external target
4. Invalid selector + `draw` safely falls back
5. Large particle count + lightweight callback remains stable

## Acceptance Criteria (Definition of Done)

1. API
   - `background.element` and `background.draw` available and optional
   - no `background.canvas` alias

2. Behavior
   - `draw` is the only trigger for custom background rendering
   - `element` only selects callback target context
   - no implicit compose/copy between canvases
   - CSS style background path remains active and unchanged

3. Stability
   - invalid target gracefully falls back
   - callback exceptions do not stop rendering
   - warnings are deterministic and non-spammy

4. Performance/compatibility
   - unchanged behavior for legacy configs
   - no meaningful overhead when callback is disabled

5. Architecture decision
   - bundle-size delta has been measured and documented
   - decision (engine vs plugin path) follows defined thresholds
   - final implementation matches recorded decision

6. Release target decision
   - feature-level minor-safety checklist completed
   - release-train gate explicitly evaluated (`4.2.0` vs `4.3.0`)
   - final target version documented with rationale

## Execution Plan for Build Agent (phase-based)

### Phase 0 - Baseline scan

- Identify exact insertion points in `IBackground`, `Background`, `RenderManager`
- Confirm current draw order and options load flow
- Output: short notes with chosen hook points

### Phase 1 - Bundle impact baseline and decision gate

- Capture baseline engine artifact sizes
- Implement minimal spike (or use completed implementation) and capture candidate sizes
- Compute delta bytes/% and classify LOW/MEDIUM/HIGH
- Choose path:
  - Path A: engine implementation (LOW/MEDIUM)
  - Path B: plugin extraction (HIGH)
- Output: decision block with measurements and rationale

### Phase 1b - Release-target gate (`4.2.0` vs `4.3.0`)

- Evaluate feature-level semver safety checklist
- Evaluate branch/release-train risk (aggregate churn, open regressions, pending risky work)
- Propose target:
  - `4.2.0` if both gates pass
  - `4.3.0` if release-train gate fails
- Output: short release recommendation block with evidence

### Phase 2 - Type contract

- Add `element` + `draw` options types
- Add and export `BackgroundDrawContext` alias (and callback type if introduced)
- Output: compile passes for type surface

Path note:

- Path A (engine): change engine option surface directly.
- Path B (plugin): keep engine base types stable, add plugin options/types and plugin registration API.

### Phase 3 - Runtime hook

- Add background callback execution method in `RenderManager`
- Invoke it in `drawParticles` immediately after `clear()`
- Keep existing draw flow unchanged otherwise
- Output: callback runs in intended order

Path note:

- Path A: implement in engine render loop.
- Path B: implement via plugin container hooks (`canvasPaint`/`draw` strategy) without breaking existing plugin contracts.

### Phase 4 - Target resolution/cache

- Implement resolver + cached target context
- Implement fallback to internal context
- Hook cache refresh in init/refresh-reload paths
- Output: deterministic context selection without per-frame selector calls

### Phase 5 - Error/warning handling

- Add once-per-key warning mechanism
- Guard callback invocation
- Output: safe loop on callback errors, no log flood

### Phase 6 - Tests

- Add/update tests for load, precedence, fallback, warnings, resilience
- Output: tests green for new behavior and no regressions

Path note:

- Path B must include plugin integration tests and plugin-not-loaded behavior tests.

### Phase 7 - Docs/examples

- Update docs for API semantics, JSON limits, JS callback usage
- Add minimal examples for each mode
- Output: no ambiguity around `element` vs `draw`

Path note:

- Path B docs must clearly explain plugin installation/registration requirement.

### Phase 8 - Validation gate

- Run targeted engine tests and affected build/lint tasks
- Verify no behavior regressions in legacy background config
- Output: final checklist complete

## Progress Checklist Template (for agent status updates)

- [ ] Phase 0 complete: hook points identified
- [ ] Phase 1 complete: size delta measured and path chosen
- [ ] Phase 1b complete: release target (`4.2.0`/`4.3.0`) decided
- [ ] Phase 2 complete: API/types exported
- [ ] Phase 3 complete: frame hook integrated
- [ ] Phase 4 complete: context cache + fallback integrated
- [ ] Phase 5 complete: warning/error policy integrated
- [ ] Phase 6 complete: tests added and passing
- [ ] Phase 7 complete: docs/examples updated
- [ ] Phase 8 complete: validation commands passing

## Notes for Build Agent

- Keep the implementation additive and minimal.
- Do not alter existing CSS background semantics.
- Do not add hidden auto-composition behavior.
- Prefer explicit fallback logic over magic.
- If a choice is ambiguous, choose least-surprising behavior and document it in PR notes.
