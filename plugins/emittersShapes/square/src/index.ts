import type { EmittersEngine } from "@tsparticles/plugin-emitters";

declare const __VERSION__: string;

/**
 *
 * @param emittersEngine -
 */
export async function loadEmittersShapeSquare(emittersEngine: EmittersEngine): Promise<void> {
    emittersEngine.checkVersion(__VERSION__);

    if (!emittersEngine.addEmitterShapeGenerator) {
        return;
    }

    const { EmittersSquareShapeGenerator } = await import("./EmittersSquareShapeGenerator.js");

    emittersEngine.addEmitterShapeGenerator("square", new EmittersSquareShapeGenerator());
}
