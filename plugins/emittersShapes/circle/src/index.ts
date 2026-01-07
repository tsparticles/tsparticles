import type { EmittersEngine } from "@tsparticles/plugin-emitters";
import type { Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

/**
 * @param engine -
 */
export function loadEmittersShapeCircle(engine: Engine): void {
    engine.checkVersion(__VERSION__);

    engine.register(async (emittersEngine: EmittersEngine) => {
        const { EmittersCircleShapeGenerator } = await import("./EmittersCircleShapeGenerator.js");

        emittersEngine.addEmitterShapeGenerator?.("circle", new EmittersCircleShapeGenerator());
    });
}
