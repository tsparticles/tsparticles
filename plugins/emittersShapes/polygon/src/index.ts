import type { EmittersEngine } from "@tsparticles/plugin-emitters";
import type { Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

/**
 *
 * @param engine -
 */
export function loadEmittersShapePolygon(engine: Engine): void {
    engine.checkVersion(__VERSION__);

    engine.register(async (emittersEngine: EmittersEngine) => {
        const { EmittersPolygonShapeGenerator } = await import("./EmittersPolygonShapeGenerator.js");

        emittersEngine.addEmitterShapeGenerator?.("polygon", new EmittersPolygonShapeGenerator());
    });
}
