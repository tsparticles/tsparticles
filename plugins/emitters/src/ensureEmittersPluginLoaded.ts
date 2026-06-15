import type { EmittersEngine } from "./EmittersEngine.js";

/**
 * @param e - The event object
 */
export function ensureEmittersPluginLoaded(e: EmittersEngine): void {
  if (!e.pluginManager.addEmitterShapeGenerator) {
    throw new Error("tsParticles Emitters Plugin is not loaded");
  }
}
