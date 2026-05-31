import type { EmittersEngine } from "./EmittersEngine.js";

/**
 * @param engine - The [[EmittersEngine]] instance to load the plugin into
 */
export async function loadEmittersPlugin(engine: EmittersEngine): Promise<void> {
  const [{ loadEmittersInteraction }, { loadEmittersPluginSimple }] = await Promise.all([
    import("./interaction.lazy.js"),
    import("./plugin.lazy.js"),
  ]);

  await Promise.all([loadEmittersPluginSimple(engine), loadEmittersInteraction(engine)]);
}

export * from "./ensureEmittersPluginLoaded.js";
export type * from "./EmitterContainer.js";
export * from "./EmitterShapeBase.js";
export type * from "./EmittersEngine.js";
export type * from "./IEmitterShape.js";
export type * from "./IEmitterShapeGenerator.js";
export * from "./Enums/EmitterClickMode.js";
export type * from "./IRandomPositionData.js";
