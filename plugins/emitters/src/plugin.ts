import type { EmittersEngine } from "./EmittersEngine.js";

declare const __VERSION__: string;

/**
 * @param engine - The [[EmittersEngine]] instance to load the plugin into
 */
export async function loadEmittersPluginSimple(engine: EmittersEngine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.pluginManager.register(async (e: EmittersEngine) => {
    const [
        { addEmittersShapesManager },
        { getEmittersInstancesManager },
        { EmittersPlugin },
      ] = await Promise.all([
        import("./addEmittersShapesManager.js"),
        import("./getEmittersInstancesManager.js"),
        import("./EmittersPlugin.js"),
      ]),
      instancesManager = await getEmittersInstancesManager(e);

    await addEmittersShapesManager(e);

    e.pluginManager.addPlugin(new EmittersPlugin(instancesManager));
  });
}

export type * from "./EmitterContainer.js";
export * from "./EmitterShapeBase.js";
export type * from "./EmittersEngine.js";
export type * from "./IEmitterShape.js";
export type * from "./IEmitterShapeGenerator.js";
export * from "./Enums/EmitterClickMode.js";
export type * from "./IRandomPositionData.js";
