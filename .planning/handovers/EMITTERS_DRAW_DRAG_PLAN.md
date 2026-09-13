# Plan: Draw & Drag for Emitters

Status: Planned for v4.5.0
Scope: `@tsparticles/plugin-emitters` (+ emitter shape packages)
Current base: v4.4.0

## Goal

Give emitters two independent capabilities, mirroring what absorbers already support:

1. **Draw** — render the emitter (its shape) on the canvas.
2. **Drag & drop** — move an emitter with the mouse while it keeps emitting.

The two features have no coupling: drawing is purely visual, dragging is an interactivity behavior.

## Current state analysis

### Absorbers (reference, already implemented)

| Feature | Where | How |
| --- | --- | --- |
| Draw | `AbsorberInstance.draw(context)` (`plugins/absorbers/src/AbsorberInstance.ts:231`) | Fill a circle using `color` + `opacity`; always on (no toggle). Invoked by `AbsorbersPluginInstance.draw(context)` (`AbsorbersPluginInstance.ts:24`) via the engine's `IContainerPlugin.draw`. |
| Drag | `Absorber.draggable` option (`Options/Classes/Absorber.ts:29`, default `false`, loaded via `loadProperty`) | `AbsorbersInteractor.interact()` (`AbsorbersInteractor.ts:95-125`): when `mouse.clicking && mouse.downPosition` within `absorber.size`, start dragging, then set `absorber.position` to `mouse.position`. |

Both features are fully present in absorbers – nothing missing to plan for them.

### Emitters (to be built)

| Feature | Current state |
| --- | --- |
| Draw | Missing. `EmitterInstance` has no `draw`; `EmittersPluginInstance` doesn't implement `IContainerPlugin.draw`; the shape interface (`IEmitterShape`) has no `draw`. |
| Drag | Missing. No `draggable` option. `EmittersInteractor.interact()` only calls `emitter.update(delta)` (`EmittersInteractor.ts:123-127`). |

### Key emitter details to account for

- `EmitterInstance.position` is an `ICoordinates` center point; `EmitterInstance.size` is already resolved to canvas pixels.
- Each emitter holds an optional shape instance (`#shape?: IEmitterShape`) generated from `options.shape.type`. Shape position/size are synced only via `EmitterShapeBase.resize()`.
- Emitters may be linked to a DOM element via `options.domId`; in that case `position` is derived from the element and must not be dragged (guarded).
- Colors for emitted particles already live in `spawn.fill` / `spawn.stroke` (`EmitterSpawn`). The resolved values are stored on the instance as `spawnFillColor` / `spawnStrokeColor` (`IHsl`). These are the natural source for the emitter's own draw colors, so no new color options are needed.

## Feature 1 — Draw

An `options.draw` toggle (default `true`, so new behavior matches absorbers; set `false` to keep the legacy invisible emitter) plus rendering of the emitter shape geometry using `spawn.fill` / `spawn.stroke`.

### 1.1 Options

**`plugins/emitters/src/Options/Interfaces/IEmitter.ts`**
- Add `draw: boolean`.

**`plugins/emitters/src/Options/Classes/Emitter.ts`**
- Add field `draw = true`.
- Load in `load()`: `loadProperty(this, "draw", data.draw)`.

### 1.2 Shape interface — add `draw`

**`plugins/emitters/src/IEmitterShape.ts`**
- Add `draw(context: OffscreenCanvasRenderingContext2D): void;`.

**`plugins/emitters/src/EmitterShapeBase.ts`**
- Add `abstract draw(context: OffscreenCanvasRenderingContext2D): void;`.

### 1.3 Per-shape `draw` implementation

Shapes draw their own geometry centered on `position` with `size` (they already know it):

- **square** (`plugins/emittersShapes/square/src/EmittersSquareShape.ts`): `context.rect(position.x - width/2, position.y - height/2, width, height)`.
- **circle** (`plugins/emittersShapes/circle/src/EmittersCircleShape.ts`): `context.ellipse(position.x, position.y, width/2, height/2, 0, 0, doublePI)` (ellipse handles width ≠ height; fall back to `arc` for square sizes).
- **polygon** (`plugins/emittersShapes/polygon/src/EmittersPolygonShape.ts`): `beginPath → moveTo/lineTo` over `this.polygon` points → `closePath`.
- **path** (`plugins/emittersShapes/path/src/EmittersPathShape.ts`): `context.fill(this.path)` / `context.stroke(this.path)`.
- **canvas** (`plugins/emittersShapes/canvas/src/EmittersCanvasShape.ts`): optional in first iteration. The shape is pixel-data based; drawing would require keeping a reference to the source image/element in `init()`. If skipped, `draw()` is a no-op (fall back to documented behavior). Can be added later without breaking API.

### 1.4 `EmitterInstance.draw(context)`

**`plugins/emitters/src/EmitterInstance.ts`**
- Add:
  ```ts
  draw(context: OffscreenCanvasRenderingContext2D): void {
    if (!this.options.draw || !this.#shape) {
      return;
    }
    context.save();
    // fill: use spawnFillColor (IHsl → getStyleFromHsl), default black like absorbers
    context.fillStyle = this.spawnFillColor
      ? getStyleFromHsl(this.spawnFillColor, container.hdr, fillOpacity, container.peakNits, container.hdrMode)
      : getStyleFromRgb({ r: 0, g: 0, b: 0 }, container.hdr, this.spawnFillOpacity ?? 1, ...);
    if (this.spawnStrokeColor) context.strokeStyle = ...;  // strokeLineWidth from spawnStrokeWidth
    this.#shape.draw(context);
    context.restore();
  }
  ```
  (Reorder: set styles, call `#shape.draw`, always wrap in save/restore.) Collect per-instance `fillOpacity` / `strokeWidth` values already computed in `#emitParticles` so draw matches particle appearance.
- New imports (all from `@tsparticles/engine`): `getStyleFromHsl`, `getStyleFromRgb`, `doublePI`.

### 1.5 `EmittersPluginInstance.draw`

**`plugins/emitters/src/EmittersPluginInstance.ts`**
- Implement `draw(context: OffscreenCanvasRenderingContext2D, _delta: IDelta): void`:
  ```ts
  for (const emitter of this.#instancesManager.getArray(this.#container)) {
    emitter.draw(context);
  }
  ```
- This makes the engine (`RenderManager` layer `PluginContent`, `RenderManager.ts:352`) render emitters behind particles, exactly like absorbers (`AbsorbersPluginInstance.draw`).

## Feature 2 — Drag & drop

Option + mouse handling copied from the absorber pattern.

### 2.1 Options

**`plugins/emitters/src/Options/Interfaces/IEmitter.ts`**
- Add `draggable: boolean`.

**`plugins/emitters/src/Options/Classes/Emitter.ts`**
- Add field `draggable = false` (absorber default).
- Load in `load()`: `loadProperty(this, "draggable", data.draggable)`.

### 2.2 `EmitterInstance.setPosition(position)`

**`plugins/emitters/src/EmitterInstance.ts`**
- Add public method to keep position + shape in sync without triggering `resize()` (which recomputes position/size from options):
  ```ts
  setPosition(position: ICoordinates): void {
    this.position = { ...position };
    this.#shape?.resize(this.position, this.size);
  }
  ```

### 2.3 `EmittersInteractor` dragging

**`plugins/emitters/src/EmittersInteractor.ts`**
- Add fields `#dragging = false` and `#draggingEmitter: EmitterInstance | undefined`.
- In `interact(interactivityData, delta)`, per emitter, before `emitter.update(delta)`:
  ```ts
  if (emitter.options.draggable && !emitter.options.domId) {
    const mouse = interactivityData.mouse;
    if (mouse.clicking && mouse.downPosition) {
      const inside = Math.abs(mouse.downPosition.x - emitter.position.x) <= emitter.size.width / 2 &&
        Math.abs(mouse.downPosition.y - emitter.position.y) <= emitter.size.height / 2;
      if (inside) {
        this.#dragging = true;
        this.#draggingEmitter = emitter;
      }
    } else {
      this.#dragging = false;
      this.#draggingEmitter = undefined;
    }
    if (this.#dragging && this.#draggingEmitter === emitter && mouse.position) {
      emitter.setPosition(mouse.position);
    }
  }
  emitter.update(delta);
  ```
- Notes vs absorber:
  - Absorbers are circular → hit test is `getDistance <= size`. Emitters are rectangular → half-width/half-height bounds test.
  - Dragging only runs when the emitter mode is active in the interactivity config (same `isEnabled` gate that powers click-to-add); this matches how the absorber drag is reachable.
  - `domId`-linked emitters are excluded from dragging (position is DOM-derived, `#calcPosition`/`resize` would fight the drag).

## Shared / cross-cutting tasks

- **Exports**: No new classes/types are introduced – `IEmitter`, `Emitter`, `EmitterInstance`, `EmittersPluginInstance`, `EmittersInteractor`, `IEmitterShape`, `EmitterShapeBase` are all already exported. Verify nothing else re-exports them after signature changes (`IEmitterShape` gains `draw`).
- **Docs**: update `markdown/Options/Plugins/Emitters.md` table and quick example; add `draw` (default `true`) and `draggable` (default `false`) rows + a short drag/draw usage snippet.
- **Tests**: colocate with existing conventions under `utils/tests/src/tests/` (there are currently no per-plugin emitter tests; add minimal ones if the team prefers, otherwise at least build + lint). Cover: option loading of `draw`/`draggable`, `setPosition` syncing shape, draw guard (`draw: false` → no-op), draggable hit test in interactor.

## Verification

```bash
# lint + build per affected package
pnpm --filter @tsparticles/plugin-emitters run lint
pnpm --filter @tsparticles/plugin-emitters run build
pnpm --filter @tsparticles/plugin-emittersShapes-square run build
pnpm --filter @tsparticles/plugin-emittersShapes-circle run build
pnpm --filter @tsparticles/plugin-emittersShapes-polygon run build
pnpm --filter @tsparticles/plugin-emittersShapes-path run build
pnpm --filter @tsparticles/plugin-emittersShapes-canvas run build

# full test suite
pnpm exec vitest

# docs formatting (markdown changed)
pnpm run prettify:readme
```

After engine-signature changes, rebuild downstream packages (see `AGENTS.md` → "Cross-package impact awareness").

## Release tasks (v4.5.0)

- **Version bumps**: aligned by the release tooling across packages (`@tsparticles/plugin-emitters`, `@tsparticles/plugin-emittersShapes/*`), plus bundles that ship emitters (`bundles/basic`, `bundles/slim`, `bundles/all`, `bundles/confetti`, etc.) and `engine` if its public API changes.
- **CHANGELOG.md**: add concrete (non-generated) entries under a "v4.5.0" heading for every touched package:
  - `plugins/emitters/CHANGELOG.md` — new `draw` and `draggable` emitter options.
  - `plugins/emittersShapes/*/CHANGELOG.md` — new `draw()` on each shape.
  - Existing `packages` have no "4.5.0" section yet; one must be created (current base is 4.4.0, released 2026-08-30).
- **Commits**: one Conventional Commit per logical change, e.g.:
  - `feat(emitters): add draw option to emitters`
  - `feat(emitters): add draggable option to emitters`
  - `feat(emittersShapes-*): implement shape drawing`
  - Follow-up `*: export types` / docs commits as needed. Do not bypass Husky hooks.
- **Docs endpoints**: `websites/website/docs/*/options/plugin-emitters.md` pull their canonical source from `markdown/Options/Plugins/Emitters.md` — no manual edits needed there beyond the source doc.

## Acceptance criteria

1. An emitter with `draw: true` (or unset) renders its shape on the canvas behind particles, filled with `spawn.fill.color` (default black) and stroked with `spawn.stroke.color` when provided.
2. `draw: false` keeps the emitter invisible (legacy behavior).
3. An emitter with `draggable: true` can be grabbed (mouse down inside shape bounds) and dragged; it keeps emitting while moved; releasing stops the drag.
4. `draggable: false` (default) and `domId`-based emitters are never draggable.
5. Options are loaded/validated for the config API (JSON string + object form) like all other `IOptionLoader` classes.