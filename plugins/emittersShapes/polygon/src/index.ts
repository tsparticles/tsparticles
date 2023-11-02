import type { EmittersEngine } from "@tsparticles/plugin-emitters";
import type { Engine } from "@tsparticles/engine";
import { PolygonShape } from "./PolygonShape.js";

/**
 *
 * @param engine -
 */
export function loadEmittersShapePolygon(engine: Engine): void {
    const emittersEngine = engine as EmittersEngine;

    emittersEngine.addEmitterShape && emittersEngine.addEmitterShape("polygon", new PolygonShape());
}
