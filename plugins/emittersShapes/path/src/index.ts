import type { EmittersEngine } from "@tsparticles/plugin-emitters";
import type { Engine } from "@tsparticles/engine";

/**
 *
 * @param engine -
 * @param refresh -
 */
export async function loadEmittersShapePath(engine: Engine, refresh = true): Promise<void> {
    const emittersEngine = engine as EmittersEngine,
        { EmittersPathShapeGenerator } = await import("./EmittersPathShapeGenerator.js");

    emittersEngine.addEmitterShapeGenerator?.("path", new EmittersPathShapeGenerator());

    await emittersEngine.refresh(refresh);
}
