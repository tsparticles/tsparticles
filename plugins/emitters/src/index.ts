import type { EmitterContainer } from "./EmitterContainer.js";
import type { EmittersEngine } from "./EmittersEngine.js";
import type { IEmitterShapeGenerator } from "./IEmitterShapeGenerator.js";

declare const __VERSION__: string;

/**
 * @param engine - The [[EmittersEngine]] instance to load the plugin into
 */
export async function loadEmittersPlugin(engine: EmittersEngine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.pluginManager.register(async (e: EmittersEngine) => {
    const [
        { ensureInteractivityPluginLoaded },
        { ShapeManager },
        { EmittersInstancesManager },
        { EmittersPlugin },
      ] = await Promise.all([
        import("@tsparticles/plugin-interactivity"),
        import("./ShapeManager.js"),
        import("./EmittersInstancesManager.js"),
        import("./EmittersPlugin.js"),
      ]),
      instancesManager = new EmittersInstancesManager(e.pluginManager);

    ensureInteractivityPluginLoaded(e);

    e.pluginManager.emitterShapeManager ??= new ShapeManager();
    e.pluginManager.addEmitterShapeGenerator ??= (name: string, generator: IEmitterShapeGenerator): void => {
      e.pluginManager.emitterShapeManager?.addShapeGenerator(name, generator);
    };

    e.pluginManager.addPlugin(new EmittersPlugin(instancesManager));

    e.pluginManager.addInteractor?.("externalEmitters", async container => {
      const { EmittersInteractor } = await import("./EmittersInteractor.js");

      return new EmittersInteractor(instancesManager, container as EmitterContainer);
    });
  });
}

/**
 * @param e -
 */
export function ensureEmittersPluginLoaded(e: EmittersEngine): void {
  if (!e.pluginManager.addEmitterShapeGenerator) {
    throw new Error("tsParticles Emitters Plugin is not loaded");
  }
}

export type * from "./EmitterContainer.js";
export * from "./EmitterShapeBase.js";
export type * from "./EmittersEngine.js";
export type * from "./IEmitterShape.js";
export type * from "./IEmitterShapeGenerator.js";
export * from "./Enums/EmitterClickMode.js";
export type * from "./IRandomPositionData.js";
