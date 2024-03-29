import type { EmittersEngine } from "@tsparticles/plugin-emitters";
import { EmittersSquareShapeGenerator } from "./EmittersSquareShapeGenerator.js";
import type { Engine } from "@tsparticles/engine";

/**
 *
 * @param engine -
 * @param refresh -
 */
export async function loadEmittersShapeSquare(engine: Engine, refresh = true): Promise<void> {
    const emittersEngine = engine as EmittersEngine;

    emittersEngine.addEmitterShapeGenerator?.("square", new EmittersSquareShapeGenerator());

    await emittersEngine.refresh(refresh);
}
