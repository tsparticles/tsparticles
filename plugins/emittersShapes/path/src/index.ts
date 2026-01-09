import type { EmittersEngine } from "@tsparticles/plugin-emitters";

declare const __VERSION__: string;

/**
 *
 * @param emittersEngine -
 */
export async function loadEmittersShapePath(emittersEngine: EmittersEngine): Promise<void> {
    emittersEngine.checkVersion(__VERSION__);

    if (!emittersEngine.addEmitterShapeGenerator) {
        return;
    }

    const { EmittersPathShapeGenerator } = await import("./EmittersPathShapeGenerator.js");

    emittersEngine.addEmitterShapeGenerator("path", new EmittersPathShapeGenerator());
}
