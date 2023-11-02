import { CircleShape } from "./CircleShape.js";
import type { EmittersEngine } from "@tsparticles/plugin-emitters";
import type { Engine } from "@tsparticles/engine";

/**
 *
 * @param engine -
 */
export function loadEmittersShapeCircle(engine: Engine): void {
    const emittersEngine = engine as EmittersEngine;

    emittersEngine.addEmitterShape && emittersEngine.addEmitterShape("circle", new CircleShape());
}
