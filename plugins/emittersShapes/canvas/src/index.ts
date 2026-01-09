import type { EmittersEngine } from "@tsparticles/plugin-emitters";

declare const __VERSION__: string;

/**
 *
 * @param emittersEngine -
 */
export async function loadEmittersShapeCanvas(emittersEngine: EmittersEngine): Promise<void> {
    emittersEngine.checkVersion(__VERSION__);

    if (!emittersEngine.addEmitterShapeGenerator) {
        return;
    }

    const { EmittersCanvasShapeGenerator } = await import("./EmittersCanvasShapeGenerator.js");

    emittersEngine.addEmitterShapeGenerator("canvas", new EmittersCanvasShapeGenerator());
}
