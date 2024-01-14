import { EmittersCircleShapeGenerator } from "./EmittersCircleShapeGenerator.js";
import type { EmittersEngine } from "@tsparticles/plugin-emitters";
import type { Engine } from "@tsparticles/engine";

/**
 *
 * @param engine -
 * @param refresh -
 */
export async function loadEmittersShapeCircle(engine: Engine, refresh = true): Promise<void> {
    const emittersEngine = engine as EmittersEngine;

    emittersEngine.addEmitterShapeGenerator?.("circle", new EmittersCircleShapeGenerator());

    await emittersEngine.refresh(refresh);
}
