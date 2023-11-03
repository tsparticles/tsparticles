import type { EmittersEngine } from "@tsparticles/plugin-emitters";
import { EmittersPolygonShapeGenerator } from "./EmittersPolygonShapeGenerator.js";
import type { Engine } from "@tsparticles/engine";

/**
 *
 * @param engine -
 */
export function loadEmittersShapePolygon(engine: Engine): void {
    const emittersEngine = engine as EmittersEngine;

    emittersEngine.addEmitterShapeGenerator &&
        emittersEngine.addEmitterShapeGenerator("polygon", new EmittersPolygonShapeGenerator());
}
