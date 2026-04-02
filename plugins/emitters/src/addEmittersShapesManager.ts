import type { EmittersEngine } from "./EmittersEngine.js";
import type { IEmitterShapeGenerator } from "./IEmitterShapeGenerator.js";

/**
 *
 * @param e
 */
export async function addEmittersShapesManager(e: EmittersEngine): Promise<void> {
  const { ShapeManager } = await import("./ShapeManager.js"),
    pluginManager = e.pluginManager;

  pluginManager.emitterShapeManager ??= new ShapeManager();

  pluginManager.addEmitterShapeGenerator ??= (name: string, generator: IEmitterShapeGenerator): void => {
    pluginManager.emitterShapeManager?.addShapeGenerator(name, generator);
  };
}
