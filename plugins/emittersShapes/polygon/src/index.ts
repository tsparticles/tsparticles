import type { EmittersEngine } from "@tsparticles/plugin-emitters";
import { EmittersPolygonShapeGenerator } from "./EmittersPolygonShapeGenerator.js";
import { type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

/**
 *
 * @param engine -
 * @param refresh -
 */
export async function loadEmittersShapePolygon(engine: Engine, refresh = true): Promise<void> {
    const emittersEngine = engine as EmittersEngine;

    emittersEngine.checkVersion(__VERSION__);

    emittersEngine.addEmitterShapeGenerator?.("polygon", new EmittersPolygonShapeGenerator());

    await emittersEngine.refresh(refresh);
}
