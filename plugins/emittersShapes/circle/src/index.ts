import type { EmittersEngine } from "@tsparticles/plugin-emitters";

declare const __VERSION__: string;

/**
 * @param emittersEngine -
 */
export async function loadEmittersShapeCircle(emittersEngine: EmittersEngine): Promise<void> {
    emittersEngine.checkVersion(__VERSION__);

    if (!emittersEngine.addEmitterShapeGenerator) {
        return;
    }

    const { EmittersCircleShapeGenerator } = await import("./EmittersCircleShapeGenerator.js");

    emittersEngine.addEmitterShapeGenerator("circle", new EmittersCircleShapeGenerator());
}
