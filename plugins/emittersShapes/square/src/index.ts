import type { EmittersEngine } from "@tsparticles/plugin-emitters";
import { EmittersSquareShapeGenerator } from "./EmittersSquareShapeGenerator.js";
import type { Engine } from "@tsparticles/engine";

/**
 *
 * @param engine -
 */
export function loadEmittersShapeSquare(engine: Engine): void {
    const emittersEngine = engine as EmittersEngine;

    emittersEngine.addEmitterShapeGenerator &&
        emittersEngine.addEmitterShapeGenerator("square", new EmittersSquareShapeGenerator());
}
