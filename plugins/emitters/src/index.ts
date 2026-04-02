import type { EmittersEngine } from "./EmittersEngine.js";
import { loadEmittersInteraction } from "./interaction.js";
import { loadEmittersPluginSimple } from "./plugin.js";

declare const __VERSION__: string;

/**
 * @param engine - The [[EmittersEngine]] instance to load the plugin into
 */
export async function loadEmittersPlugin(engine: EmittersEngine): Promise<void> {
  await loadEmittersPluginSimple(engine);
  await loadEmittersInteraction(engine);
}

export * from "./ensureEmittersPluginLoaded.js";
export type * from "./EmitterContainer.js";
export * from "./EmitterShapeBase.js";
export type * from "./EmittersEngine.js";
export type * from "./IEmitterShape.js";
export type * from "./IEmitterShapeGenerator.js";
export * from "./Enums/EmitterClickMode.js";
export type * from "./IRandomPositionData.js";
