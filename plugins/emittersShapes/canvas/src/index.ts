import type { EmittersEngine } from "@tsparticles/plugin-emitters";
import type { Engine } from "@tsparticles/engine";

/**
 *
 * @param engine -
 * @param refresh -
 */
export async function loadEmittersShapeCanvas(engine: Engine, refresh = true): Promise<void> {
    const emittersEngine = engine as EmittersEngine,
        { EmittersCanvasShapeGenerator } = await import("./EmittersCanvasShapeGenerator.js");

    emittersEngine.addEmitterShapeGenerator?.("canvas", new EmittersCanvasShapeGenerator());

    await emittersEngine.refresh(refresh);
}
