import type { EmittersEngine } from "@tsparticles/plugin-emitters";
import { EmittersPathShapeGenerator } from "./EmittersPathShapeGenerator.js";
import type { Engine } from "@tsparticles/engine";

/**
 *
 * @param engine -
 */
export function loadEmittersShapePath(engine: Engine): void {
    const emittersEngine = engine as EmittersEngine;

    emittersEngine.addEmitterShapeGenerator &&
        emittersEngine.addEmitterShapeGenerator("path", new EmittersPathShapeGenerator());
}
