import type { EmittersEngine } from "@tsparticles/plugin-emitters";

declare const __VERSION__: string;

/**
 *
 * @param emittersEngine -
 */
export async function loadEmittersShapePolygon(emittersEngine: EmittersEngine): Promise<void> {
    emittersEngine.checkVersion(__VERSION__);

    if (!emittersEngine.addEmitterShapeGenerator) {
        return;
    }

    const { EmittersPolygonShapeGenerator } = await import("./EmittersPolygonShapeGenerator.js");

    emittersEngine.addEmitterShapeGenerator("polygon", new EmittersPolygonShapeGenerator());
}
