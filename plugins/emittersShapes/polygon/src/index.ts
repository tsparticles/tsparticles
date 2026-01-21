import type { EmittersEngine } from "@tsparticles/plugin-emitters";
import type { Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

/**
 * @param engine -
 */
export async function loadEmittersShapePolygon(engine: Engine): Promise<void> {
    engine.checkVersion(__VERSION__);

    await engine.register(async (e: EmittersEngine) => {
        if (!e.addEmitterShapeGenerator) {
            throw new Error("tsParticles emitters plugin missing or initialized after shapes");
        }

        const { EmittersPolygonShapeGenerator } = await import("./EmittersPolygonShapeGenerator.js");

        e.addEmitterShapeGenerator("polygon", new EmittersPolygonShapeGenerator());
    });
}
