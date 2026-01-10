import type { EmittersEngine } from "@tsparticles/plugin-emitters";
import type { Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

/**
 *
 * @param engine -
 */
export function loadEmittersShapePath(engine: Engine): void {
    engine.checkVersion(__VERSION__);

    engine.register(async (e: EmittersEngine) => {
        if (!e.addEmitterShapeGenerator) {
            throw new Error("tsParticles emitters plugin missing or initialized after shapes");
        }

        const { EmittersPathShapeGenerator } = await import("./EmittersPathShapeGenerator.js");

        e.addEmitterShapeGenerator("path", new EmittersPathShapeGenerator());
    });
}
