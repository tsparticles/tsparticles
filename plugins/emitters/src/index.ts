import type { EmittersEngine } from "./EmittersEngine.js";
import { EmittersPlugin } from "./EmittersPlugin.js";
import type { IEmitterShapeGenerator } from "./IEmitterShapeGenerator.js";
import { ShapeManager } from "./ShapeManager.js";

declare const __VERSION__: string;

/**
 * @param engine - The [[EmittersEngine]] instance to load the plugin into
 * @param refresh -
 */
export async function loadEmittersPlugin(engine: EmittersEngine, refresh = true): Promise<void> {
    engine.checkVersion(__VERSION__);

    engine.emitterShapeManager ??= new ShapeManager(engine);
    engine.addEmitterShapeGenerator ??= (name: string, generator: IEmitterShapeGenerator): void => {
        engine.emitterShapeManager?.addShapeGenerator(name, generator);
    };

    const plugin = new EmittersPlugin(engine);

    await engine.addPlugin(plugin, refresh);
}

export type * from "./EmitterContainer.js";
export * from "./EmitterShapeBase.js";
export type * from "./EmittersEngine.js";
export type * from "./IEmitterShape.js";
export type * from "./IEmitterShapeGenerator.js";
export * from "./Enums/EmitterClickMode.js";
export type * from "./IRandomPositionData.js";
