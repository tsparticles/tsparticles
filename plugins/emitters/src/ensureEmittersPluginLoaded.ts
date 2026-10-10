import type { EmittersEngine } from "./EmittersEngine.js";
import { ErrorCodes } from "./ErrorCodes.js";
import { getErrorMessage } from "@tsparticles/engine";

/**
 * @param e - The event object
 */
export function ensureEmittersPluginLoaded(e: EmittersEngine): void {
  if (!e.pluginManager.addEmitterShapeGenerator) {
    throw new Error(getErrorMessage(ErrorCodes.emittersPluginNotLoaded));
  }
}
