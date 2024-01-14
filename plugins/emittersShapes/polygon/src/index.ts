import type { EmittersEngine } from "@tsparticles/plugin-emitters";
import { EmittersPolygonShapeGenerator } from "./EmittersPolygonShapeGenerator.js";
import type { Engine } from "@tsparticles/engine";

/**
 *
 * @param engine -
 * @param refresh -
 */
export async function loadEmittersShapePolygon(engine: Engine, refresh = true): Promise<void> {
    const emittersEngine = engine as EmittersEngine;

    emittersEngine.addEmitterShapeGenerator?.("polygon", new EmittersPolygonShapeGenerator());

    await emittersEngine.refresh(refresh);
}
