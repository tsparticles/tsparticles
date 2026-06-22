# Feature E: Draw Layer System

**Target:** `@tsparticles/engine`

## Design

Replace the current 11 separate plugin arrays in `RenderManager` with a unified **layer-based rendering pipeline** using a fixed set of named layers. Each layer has a fixed ordinal position that determines drawing order.

This makes the render order explicit, simplifies adding new rendering phases, and makes extracting background into a plugin trivial (the plugin just registers on the corresponding layer).

### Layer Definition (8 layers, back-to-front)

```typescript
export enum DrawLayer {
  BackgroundElement = 0,  // background.element auto-draw (ctx.drawImage)
  BackgroundDraw = 1,      // background.draw callback
  BackgroundMask = 2,      // background mask overlay (canvasPaint equivalent)
  CanvasSetup = 3,         // plugin drawSettingsSetup
  PluginContent = 4,       // plugin draw (behind particles)
  Particles = 5,           // particle rendering (z-bucketed)
  CanvasCleanup = 6,       // plugin clearDraw + drawSettingsCleanup
  Foreground = 7,          // overlay/fx on top of everything
}
```

### Architecture Changes

**IContainerPlugin** — add optional `layer: DrawLayer` property. A plugin that implements `canvasPaint()` or `draw()` etc. declares which layer it belongs to.

**RenderManager** — replace these 11 arrays:
```
#canvasClearPlugins, #canvasPaintPlugins, #drawPlugins,
#drawParticlePlugins, #drawParticlesCleanupPlugins, #drawParticlesSetupPlugins,
#drawSettingsSetupPlugins, #drawSettingsCleanupPlugins, #clearDrawPlugins,
#colorPlugins, #reusablePluginColors
```

With:
```
#layers: IContainerPlugin[][]  // fixed array of 8 (one per DrawLayer)
```

Plus a separate `#colorPlugins` array still needed for `particleFillColor`/`particleStrokeColor` (these are not layer-specific, they run per-particle during draw).

**initPlugins()** — iterate `this.#container.plugins`, push each into `#layers[layer]` based on `plugin.layer` (default: derive from which interface methods are implemented, fallback to `PluginContent`).

**drawParticles()** — iterate `DrawLayer` enum in ordinal order, execute appropriate call for each layer:

```
BackgroundElement:
  - if background.element is set → ctx.drawImage(element, 0, 0, w, h)  [moved from #drawBackground]

BackgroundDraw:
  - if background.draw is set → background.draw(ctx, delta)             [moved from #drawBackground]

BackgroundMask:
  - for plugin in layers[BackgroundMask]: plugin.canvasPaint?.()

CanvasSetup:
  - for plugin in layers[CanvasSetup]: plugin.drawSettingsSetup?.(ctx, delta)

PluginContent:
  - for plugin in layers[PluginContent]: plugin.draw?.(ctx, delta)

Particles:
  - particles.drawParticles(delta)

CanvasCleanup:
  - for plugin in layers[CanvasCleanup]:
      plugin.clearDraw?.(ctx, delta)
      plugin.drawSettingsCleanup?.(ctx, delta)

Foreground:
  - (reserved, no default behavior)
```

The `clear()` method:
- Stays as a single `ctx.clearRect(0, 0, w, h)` at the start
- But is **layer-aware**: skips clear if `actualOptions.clear === false`
- For background mask: the plugin handles its own persistence via canvasClear hook
- The current delegate-to-plugin-first pattern is preserved (a plugin can intercept clear)

Background as internal pseudo-plugin:
- `#drawBackground` is split into two internal handlers registered on `BackgroundElement` and `BackgroundDraw` layers
- These are created in `initPlugins()` based on `<canvas>.actualOptions.background`
- This makes extracting them to `@tsparticles/plugin-background` trivial (just move the handler code, keep the layer registration)

### Migration Path for Existing Plugins

Plugins that currently implement specific `IContainerPlugin` methods need to declare their `layer`. Default mapping:

| IContainerPlugin method | Default DrawLayer |
|------------------------|-------------------|
| `canvasPaint()` | `BackgroundMask` |
| `drawSettingsSetup()` | `CanvasSetup` |
| `draw()` | `PluginContent` |
| `drawParticle()` / `drawParticleSetup()` / `drawParticleCleanup()` | `Particles` (handled via particle-specific hooks, not layer iteration) |
| `clearDraw()` | `CanvasCleanup` |
| `drawSettingsCleanup()` | `CanvasCleanup` |
| `canvasClear()` | Special — stays as separate `#canvasClearPlugins` array for now |

### Backward Compatibility

- Plugins that do NOT set `layer` get their layer auto-detected from implemented methods (see table above)
- The old arrays are removed, but all `IContainerPlugin` interface methods remain (no breaking changes to plugin API)
- The `clear()` delegation pattern is preserved — plugins can still intercept clear

---

## Implementation Phases

### Phase 0: Enum + Types ✅ (2026-06-22)
- [x] Create `DrawLayer` enum in `engine/src/Enums/DrawLayer.ts`
- [x] Add `layer?: DrawLayer` to `IContainerPlugin`
- [x] Export `DrawLayer` from `exports.ts` + `export-types.ts`

### Phase 1: RenderManager internal refactor ✅ (2026-06-22)
- [x] Replace 11 arrays with `#layers: { [key in DrawLayer]: IContainerPlugin[] }` (mapped type)
- [x] Rewrite `initPlugins()` with auto-detect via `#detectPluginLayer()` + explicit `plugin.layer`
- [x] Rewrite `drawParticles()` to iterate 8 layers in ordinal order
- [x] Split `#drawBackground()` inline into BackgroundElement + BackgroundDraw layer handlers
- [x] Update `paint()` to use `#layers[BackgroundMask]`
- [x] Added `#getLayerPlugins()` helper for type-safe access (avoids `noUncheckedIndexedAccess`)
- [x] Clean up: remove unused arrays (`#canvasPaintPlugins`, `#clearDrawPlugins`, `#drawPlugins`, `#drawSettingsSetupPlugins`, `#drawSettingsCleanupPlugins`), simplify `destroy()`
- [x] Build passes, all 152 tests pass

### Phase 2: Clear integration ✅ (2026-06-22)
- [x] Refactor `clear()` to be layer-aware — checks `#canvasClearPlugins` array first (for plugins with only `canvasClear`, e.g. trail), then iterates layers in ordinal order
- [x] Keep the plugin-can-intercept pattern (first plugin that handles clear wins)
- [x] Background mask plugin's `canvasClear()` stays as an override, found via both `#canvasClearPlugins` and layer iteration

### Phase 3: Plugin migration ✅ (2026-06-22)
- [x] Fixed `initPlugins()` to push plugins to ALL applicable layers based on hooks (multi-layer registration)
- [x] Removed `#detectPluginLayer()` — no longer needed
- [x] Set explicit `layer` on backgroundMask (`BackgroundMask`), trail (`PluginContent`), zoom (`CanvasSetup`), blend (`CanvasSetup`)
- [x] All 4 plugins build successfully

### Phase 4: Tests + docs ✅ (2026-06-22)
- [x] 152/152 tests pass (no regressions)
- [x] Background.ts (13 tests) still passes
- [x] Plugin backward compat verified — plugins without explicit `layer` are assigned via hooks
- [x] JSDoc comments on DrawLayer enum members (8 layers documented with rendering order, links to IContainerPlugin)
- [x] JSDoc comments on IContainerPlugin.layer (explains multi-layer registration, links to DrawLayer)
- [x] JSDoc on RenderManager.#layers, clear(), drawParticles(), initPlugins() — full layer pipeline documented

---

## Files to Modify

| File | Change |
|------|--------|
| `engine/src/Enums/DrawLayer.ts` | **New** — `DrawLayer` enum (✅ Phase 0) |
| `engine/src/exports.ts` | Added `export * from "./Enums/DrawLayer.js"` (✅ Phase 0) |
| `engine/src/export-types.ts` | Added `export type * from "./Enums/DrawLayer.js"` (✅ Phase 0) |
| `engine/src/Core/Interfaces/IContainerPlugin.ts` | Added `layer?: DrawLayer` (✅ Phase 0) |
| `engine/src/Core/RenderManager.ts` | Major refactor: layers, initPlugins, drawParticles, clear (✅ Phase 1, 2, 3) |
| `plugins/backgroundMask/src/BackgroundMaskPluginInstance.ts` | Set explicit `layer: DrawLayer.BackgroundMask` (✅ Phase 3) |
| `plugins/trail/src/TrailPluginInstance.ts` | Set explicit `layer: DrawLayer.PluginContent` (✅ Phase 3) |
| `plugins/zoom/src/ZoomPluginInstance.ts` | Set explicit `layer: DrawLayer.CanvasSetup` (✅ Phase 3) |
| `plugins/blend/src/BlendPluginInstance.ts` | Set explicit `layer: DrawLayer.CanvasSetup` (✅ Phase 3) |

## Verification

- [x] `pnpm exec vitest run` passes (152/152 ✅)
- [x] `pnpm run build:ci` passes
- [x] `clear()` is layer-aware — iterates plugins via layer system instead of separate array
- [x] Multi-layer registration — backgroundMask is on 3 layers (BackgroundMask, CanvasSetup, CanvasCleanup)
- [x] Zoom and blend on 2 layers each (CanvasSetup, CanvasCleanup)
- [x] Explicit `layer` on 4 plugins (backgroundMask, trail, zoom, blend)
- [x] `clear: false` still works (trails/accumulation) — `canvasClear()` still checks `actualOptions.clear`
- [x] JSDoc documented: DrawLayer enum (8 layers with back-to-front order), IContainerPlugin.layer (multi-layer semantics), RenderManager.#layers/clear/drawParticles/initPlugins (layer pipeline)
- [x] `#detectPluginLayer()` removed — replaced by multi-layer hook-based assignment in `initPlugins()`
- [x] `#canvasClearPlugins` removed — clear now iterates layer plugins in ordinal order
- [ ] Layer rendering order visually matches pre-layer order (manual smoke test)
- [ ] Background element and draw callback still render correctly (manual smoke test)
- [ ] Background mask plugin still works (canvasPaint called at right time, manual smoke test)
