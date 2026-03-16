---
phase: 01-external-drag-drop
plan: 01
type: execute
wave: 1
depends_on: []
files_modified:
  - plugins/external-interaction/src/ExternalInteractionPlugin.ts
  - plugins/external-interaction/src/index.ts
  - engine/src/exports.ts
autonomous: true
requirements: [UI-01, UI-02, API-01]
user_setup: []
must_haves:
  truths:
    - "An ExternalInteraction plugin skeleton exists in the repo that registers with the engine's plugin system"
    - "The plugin exposes hook points to listen for DOM drag events and emits engine events: drag-start, drag-end, drop, particle-select, particle-move"
  artifacts:
    - path: "plugins/external-interaction/src/ExternalInteractionPlugin.ts"
      provides: "Plugin skeleton and registration entry"
    - path: "engine/src/exports.ts"
      provides: "Public export so demos can import the plugin"
  key_links:
    - from: "plugins/external-interaction/src/ExternalInteractionPlugin.ts"
      to: "engine/src/CanvasUtils.ts"
      via: "Use canvas coordinate helpers to map DOM->canvas positions"
      pattern: "CanvasUtils"
---

<objective>
Create the External Interaction plugin skeleton that integrates with the engine plugin registration and emits the required events (drag-start, drag-end, drop, particle-select, particle-move). This is the implementation contract other plans depend on.

Purpose: provide a concrete, testable plugin surface so demo and tests can be implemented against a known API.
Output: plugin files under `plugins/external-interaction/src/` and an export in `engine/src/exports.ts`.
</objective>

<context>
Uses decisions from `.planning/phases/01-external-drag-drop/01-CONTEXT.md` (interaction model, events payload, Claude's discretion on preview and DOM->canvas coord translation).
Executor should create only files listed under `files_modified` and keep changes minimal.
</context>

<tasks>

<task type="auto">
  <name>Task 1: Create plugin skeleton</name>
  <files>plugins/external-interaction/src/ExternalInteractionPlugin.ts, plugins/external-interaction/src/index.ts</files>
  <action>
    - Create `plugins/external-interaction/src/ExternalInteractionPlugin.ts` exporting a class `ExternalInteractionPlugin` with `register(engine)` and `unregister()` methods. Include typed JSDoc for emitted events: `drag-start`, `drag-end`, `drop`, `particle-select`, `particle-move` with payload `{id, x, y, meta}`.
    - Create `plugins/external-interaction/src/index.ts` that exports the plugin as default and as a named `ExternalInteractionPlugin` export.
    Rationale: Downstream demo and tests rely on these exports. Keep implementation minimal (no heavy logic) — real behavior filled in by later plan tasks.
  </action>
  <verify>
    <automated>node -e "process.exit(require('fs').existsSync('plugins/external-interaction/src/ExternalInteractionPlugin.ts')&&require('fs').existsSync('plugins/external-interaction/src/index.ts')?0:1)"</automated>
  </verify>
  <done>Plugin files exist and export `ExternalInteractionPlugin` in `index.ts`</done>
</task>

<task type="auto">
  <name>Task 2: Wire plugin into engine exports</name>
  <files>engine/src/exports.ts</files>
  <action>
    - Add an export line to `engine/src/exports.ts` to re-export the plugin: `export { ExternalInteractionPlugin } from "../../plugins/external-interaction/src";` or similar relative path depending on repo layout.
    - Do NOT modify other engine internals in this task. The goal is to make the plugin importable by demos/tests.
  </action>
  <verify>
    <automated>node -e "const s=require('fs').readFileSync('engine/src/exports.ts','utf8'); process.exit(s.includes('ExternalInteractionPlugin')?0:1)"</automated>
  </verify>
  <done>`engine/src/exports.ts` re-exports `ExternalInteractionPlugin` so consumers can import it</done>
</task>

</tasks>

<verification>
Verify both files exist and exports reference is present. Commands above are the automated checks.
</verification>

<success_criteria>

- Plugin skeleton present and importable from engine exports.
- Event types documented in plugin file header.
- Downstream plans can reference plugin exports without modifying engine internals.
  </success_criteria>

<output>
After completion, create `.planning/phases/01-external-drag-drop/01-PLAN-SUMMARY.md`
</output>
