import type { EmittersEngine } from "@tsparticles/plugin-emitters";
import { type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

/**
 *
 * @param engine -
 */
export function loadEmittersShapeSquare(engine: Engine): void {
    engine.checkVersion(__VERSION__);

    engine.register(async (emittersEngine: EmittersEngine) => {
        const { EmittersSquareShapeGenerator } = await import("./EmittersSquareShapeGenerator.js");

        emittersEngine.addEmitterShapeGenerator?.("square", new EmittersSquareShapeGenerator());
    });
}
