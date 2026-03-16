# Phase 01: External Interaction: Drag & Drop Particle - Context

**Gathered:** auto
**Status:** Ready for planning

<domain>
## Phase Boundary

Provide an external interaction that allows users to drag-and-drop single particles from an external palette into the canvas and interact with them (select, move, drop). This phase focuses only on the interaction; adding other interaction types or multi-particle drag is out of scope.

</domain>

<decisions>
## Implementation Decisions

### Interaction model

- Single-particle drag-and-drop only (no multi-select drags).
- Drag originates from an external palette element (DOM element outside canvas) and translates to particle spawn on drop.

### Selection & movement

- Dropped particle enters 'interactive' state: select on click, move via pointer drag, deselect on outside click or `Esc` key.

### Events & API

- Emit `drag-start`, `drag-end`, `drop`, `particle-select`, `particle-move` events.
- Events payload: `{ id: string, x: number, y: number, meta?: Record<string, any> }`.

### Accessibility

- For keyboard users: support keyboard-triggered 'place particle at cursor' and arrow-key nudging while particle selected.

### Claude's Discretion

- Exact DOM-to-canvas coordinate translation strategy
- Particle visual style on drag-preview

</decisions>

<code_context>

## Existing Code Insights

### Reusable Assets

- `engine/src/CanvasUtils.ts`: contains coordinate helpers and canvas utils — use for DOM-to-canvas mapping.
- `plugins/themes/src/` shows plugin registration patterns — follow same registration style for new interaction plugin.

### Established Patterns

- Engine exposes plugin interface and event dispatching (`EventDispatcher.ts`) — hook into existing event system for emitted events.

### Integration Points

- Interaction plugin should register with the Engine as `ExternalInteractionPlugin` and expose a `register`/`unregister` API.
- Demo integration: `demo/vanilla` can include a palette element and example usage.

</code_context>

<specifics>
## Specific Ideas

- Drag preview: show a translucent particle following cursor during drag (Claude decides exact style).
- API example in demo: `engine.on('particle-drop', (e) => console.log(e.id, e.x, e.y))`.

</specifics>

<deferred>
## Deferred Ideas

- Multi-particle drag-and-drop (Phase X)
- Particle snapping to grid

</deferred>

---

_Phase: 01-external-drag-drop_
_Context gathered: auto_
