import type { EmittersEngine } from "./EmittersEngine.js";
import type { IEmitterShapeGenerator } from "./IEmitterShapeGenerator.js";

declare const __VERSION__: string;

/**
 * @param engine - The [[EmittersEngine]] instance to load the plugin into
 */
export function loadEmittersPlugin(engine: EmittersEngine): void {
    engine.checkVersion(__VERSION__);

    engine.register(async (e: EmittersEngine) => {
        const { ShapeManager } = await import("./ShapeManager.js"),
            { EmittersPlugin } = await import("./EmittersPlugin.js");

        e.emitterShapeManager ??= new ShapeManager();
        e.addEmitterShapeGenerator ??= (name: string, generator: IEmitterShapeGenerator): void => {
            e.emitterShapeManager?.addShapeGenerator(name, generator);
        };

        const plugin = new EmittersPlugin(e);

        e.addPlugin(plugin);
    });
}

export type * from "./EmitterContainer.js";
export * from "./EmitterShapeBase.js";
export type * from "./EmittersEngine.js";
export type * from "./IEmitterShape.js";
export type * from "./IEmitterShapeGenerator.js";
export * from "./Enums/EmitterClickMode.js";
export type * from "./IRandomPositionData.js";
