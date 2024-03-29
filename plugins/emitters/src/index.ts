import type { EmittersEngine } from "./EmittersEngine.js";
import { EmittersPlugin } from "./EmittersPlugin.js";
import type { IEmitterShapeGenerator } from "./IEmitterShapeGenerator.js";
import { ShapeManager } from "./ShapeManager.js";

/**
 * @param engine - The [[EmittersEngine]] instance to load the plugin into
 * @param refresh -
 */
export async function loadEmittersPlugin(engine: EmittersEngine, refresh = true): Promise<void> {
    if (!engine.emitterShapeManager) {
        engine.emitterShapeManager = new ShapeManager(engine);
    }

    if (!engine.addEmitterShapeGenerator) {
        engine.addEmitterShapeGenerator = (name: string, generator: IEmitterShapeGenerator): void => {
            engine.emitterShapeManager?.addShapeGenerator(name, generator);
        };
    }

    const plugin = new EmittersPlugin(engine);

    await engine.addPlugin(plugin, refresh);
}

export * from "./EmitterContainer.js";
export * from "./EmitterShapeBase.js";
export * from "./EmittersEngine.js";
export * from "./IEmitterShape.js";
export * from "./IEmitterShapeGenerator.js";
export * from "./Enums/EmitterClickMode.js";
export * from "./IRandomPositionData.js";
