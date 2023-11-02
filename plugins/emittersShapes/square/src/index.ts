import type { EmittersEngine } from "@tsparticles/plugin-emitters";
import type { Engine } from "@tsparticles/engine";
import { SquareShape } from "./SquareShape.js";

/**
 *
 * @param engine -
 */
export function loadEmittersShapeSquare(engine: Engine): void {
    const emittersEngine = engine as EmittersEngine;

    emittersEngine.addEmitterShape && emittersEngine.addEmitterShape("square", new SquareShape());
}
