import type { EmittersEngine } from "@tsparticles/plugin-emitters";
import type { Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

/**
 * @param engine -
 */
export function loadEmittersShapeCircle(engine: Engine): void {
    engine.checkVersion(__VERSION__);

    engine.register(async (e: EmittersEngine) => {
        if (!e.addEmitterShapeGenerator) {
            throw new Error("tsParticles emitters plugin missing or initialized after shapes");
        }

        const { EmittersCircleShapeGenerator } = await import("./EmittersCircleShapeGenerator.js");

        e.addEmitterShapeGenerator("circle", new EmittersCircleShapeGenerator());
    });
}
