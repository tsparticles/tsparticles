import type { EmittersEngine } from "@tsparticles/plugin-emitters";
import type { Engine } from "@tsparticles/engine";

/**
 *
 * @param engine -
 * @param refresh -
 */
export async function loadEmittersShapeCircle(engine: Engine, refresh = true): Promise<void> {
    const emittersEngine = engine as EmittersEngine,
        { EmittersCircleShapeGenerator } = await import("./EmittersCircleShapeGenerator.js");

    emittersEngine.addEmitterShapeGenerator?.("circle", new EmittersCircleShapeGenerator());

    await emittersEngine.refresh(refresh);
}
