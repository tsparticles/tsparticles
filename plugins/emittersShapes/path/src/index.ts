import type { EmittersEngine } from "@tsparticles/plugin-emitters";
import type { Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

/**
 *
 * @param engine -
 */
export function loadEmittersShapePath(engine: Engine): void {
    engine.checkVersion(__VERSION__);

    engine.register(async (emittersEngine: EmittersEngine) => {
        const { EmittersPathShapeGenerator } = await import("./EmittersPathShapeGenerator.js");

        emittersEngine.addEmitterShapeGenerator?.("path", new EmittersPathShapeGenerator());
    });
}
