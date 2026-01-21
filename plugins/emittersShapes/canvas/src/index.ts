import type { EmittersEngine } from "@tsparticles/plugin-emitters";
import type { Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

/**
 * @param engine -
 */
export async function loadEmittersShapeCanvas(engine: Engine): Promise<void> {
    engine.checkVersion(__VERSION__);

    await engine.register(async (e: EmittersEngine) => {
        if (!e.addEmitterShapeGenerator) {
            throw new Error("tsParticles emitters plugin missing or initialized after shapes");
        }

        const { EmittersCanvasShapeGenerator } = await import("./EmittersCanvasShapeGenerator.js");

        e.addEmitterShapeGenerator("canvas", new EmittersCanvasShapeGenerator());
    });
}
