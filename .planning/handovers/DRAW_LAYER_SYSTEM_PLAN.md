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

### Phase 0: Enum + Types
- Create `DrawLayer` enum in `engine/src/Core/Enums/DrawLayer.ts`
- Add `layer?: DrawLayer` to `IContainerPlugin`
- Add `DrawLayer` to `engine/src/export-types.ts`

### Phase 1: RenderManager internal refactor
- Replace 11 arrays with `#layers: IContainerPlugin[][]` (fixed size: 8)
- Rewrite `initPlugins()` to populate layers
- Rewrite `drawParticles()` to iterate layers
- Split `#drawBackground()` into BackgroundElement and BackgroundDraw handlers
- Register background element/draw as internal layer handlers
- Clean up: remove unused arrays, simplify `destroy()` 

### Phase 2: Clear integration
- Refactor `clear()` to be layer-aware (can skip for persistent layers if needed)
- Keep the plugin-can-intercept pattern
- Background mask plugin's `canvasClear()` stays as an override

### Phase 3: Plugin migration
- Update built-in engine plugins (backgroundMask, trail, etc.) to set explicit `layer`
- Ensure all existing plugins work with the new system

### Phase 4: Tests + docs
- Test that rendering order matches pre-layer order
- Test plugin backward compat (no `layer` set → auto-detected)
- Test background element/draw still render correctly

---

## Files to Modify

| File | Change |
|------|--------|
| `engine/src/Core/Enums/DrawLayer.ts` | **New** — `DrawLayer` enum |
| `engine/src/Core/RenderManager.ts` | Major refactor: layers, initPlugins, drawParticles, clear |
| `engine/src/Core/Interfaces/IContainerPlugin.ts` | Add `layer?: DrawLayer` |
| `engine/src/export-types.ts` | Export `DrawLayer` |
| `engine/src/Core/Constants.ts` | Remove any layer-related constants if added |
| `plugins/backgroundMask/src/BackgroundMaskPluginInstance.ts` | Set explicit `layer: DrawLayer.BackgroundMask` |
| `plugins/trail/src/TrailPluginInstance.ts` | Set explicit `layer` |

## Verification

- [ ] `pnpm exec vitest run` passes
- [ ] `pnpm run build:ci` passes
- [ ] Layer rendering order visually matches pre-layer order
- [ ] Background element and draw callback still render correctly
- [ ] Background mask plugin still works (canvasPaint called at right time)
- [ ] Plugin with no `layer` set is auto-detected to correct layer
- [ ] `clear: false` still works (trails/accumulation)
