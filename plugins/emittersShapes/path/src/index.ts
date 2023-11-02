import type { EmittersEngine } from "@tsparticles/plugin-emitters";
import type { Engine } from "@tsparticles/engine";
import { PathShape } from "./PathShape.js";

/**
 *
 * @param engine -
 */
export function loadEmittersShapePath(engine: Engine): void {
    const emittersEngine = engine as EmittersEngine;

    emittersEngine.addEmitterShape && emittersEngine.addEmitterShape("path", new PathShape());
}
