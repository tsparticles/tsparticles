import type { EmittersEngine } from "./EmittersEngine.js";

/**
 * @param e -
 */
export function ensureEmittersPluginLoaded(e: EmittersEngine): void {
  if (!e.pluginManager.addEmitterShapeGenerator) {
    throw new Error("tsParticles Emitters Plugin is not loaded");
  }
}
