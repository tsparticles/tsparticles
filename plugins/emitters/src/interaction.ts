import type { EmitterContainer } from "./EmitterContainer.js";
import type { EmittersEngine } from "./EmittersEngine.js";

declare const __VERSION__: string;

/**
 * @param engine - The [[EmittersEngine]] instance to load the plugin into
 */
export async function loadEmittersInteraction(engine: EmittersEngine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.pluginManager.register(async (e: EmittersEngine) => {
    const [
        { ensureInteractivityPluginLoaded },
        { addEmittersShapesManager },
        { getEmittersInstancesManager },
      ] = await Promise.all([
        import("@tsparticles/plugin-interactivity"),
        import("./addEmittersShapesManager.js"),
        import("./getEmittersInstancesManager.js"),
      ]),
      instancesManager = await getEmittersInstancesManager(e);

    ensureInteractivityPluginLoaded(e);

    await addEmittersShapesManager(e);

    e.pluginManager.addInteractor?.("externalEmitters", async container => {
      const { EmittersInteractor } = await import("./EmittersInteractor.js");

      return new EmittersInteractor(instancesManager, container as EmitterContainer);
    });
  });
}

export type * from "./EmitterContainer.js";
export * from "./EmitterShapeBase.js";
export type * from "./EmittersEngine.js";
export type * from "./IEmitterShape.js";
export type * from "./IEmitterShapeGenerator.js";
export * from "./Enums/EmitterClickMode.js";
export type * from "./IRandomPositionData.js";
