/**
 * Fixed ordinal layer positions for the RenderManager layer-based rendering pipeline.
 *
 * Each layer has a fixed position that determines drawing order (0 = back, 7 = front).
 * Plugins declare their layer via {@link IContainerPlugin.layer} or get assigned to all
 * applicable layers based on which hook methods they implement.
 *
 * The pipeline in {@link RenderManager.drawParticles} iterates these layers in order:
 * 0 BackgroundElement → 1 BackgroundDraw → 2 BackgroundMask → 3 CanvasSetup →
 * 4 PluginContent → 5 Particles → 6 CanvasCleanup → 7 Foreground
 */
export enum DrawLayer {
  /**
   * Auto-draw the CSS background element (`background.element`) via `ctx.drawImage`.
   * Handled inline by RenderManager, not by plugins.
   */
  BackgroundElement = 0,
  /**
   * Execute the `background.draw(ctx, delta)` callback on the main canvas context.
   * Handled inline by RenderManager, not by plugins.
   */
  BackgroundDraw = 1,
  /**
   * Background mask overlay: calls `plugin.canvasPaint()` on all plugins in this layer.
   * Used by {@link BackgroundMaskPluginInstance} to draw the mask before particle compositing.
   * @see BackgroundMaskPluginInstance.canvasPaint
   */
  BackgroundMask = 2,
  /**
   * Plugin draw setup: calls `plugin.drawSettingsSetup(ctx, delta)` on all plugins in this layer.
   * Used by zoom, blend, and backgroundMask plugins to configure canvas state (composite mode, transforms)
   * before particles are drawn.
   * @see IContainerPlugin.drawSettingsSetup
   */
  CanvasSetup = 3,
  /**
   * Plugin content drawn behind particles: calls `plugin.draw(ctx, delta)` on all plugins in this layer.
   * @see IContainerPlugin.draw
   */
  PluginContent = 4,
  /**
   * Particle rendering (z-bucketed). Calls `particles.drawParticles(delta)` — this is the core
   * particle rendering step, not a plugin hook.
   */
  Particles = 5,
  /**
   * Plugin draw cleanup: calls `plugin.clearDraw(ctx, delta)` then `plugin.drawSettingsCleanup(ctx, delta)`
   * on all plugins in this layer. Restores canvas state after particle rendering.
   * @see IContainerPlugin.clearDraw
   * @see IContainerPlugin.drawSettingsCleanup
   */
  CanvasCleanup = 6,
  /**
   * Reserved for overlay/fx on top of everything. No default behavior — available for future
   * plugins that need to render above particles.
   */
  Foreground = 7,
}
