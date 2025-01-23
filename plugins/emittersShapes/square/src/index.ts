import type { EmittersEngine } from "@tsparticles/plugin-emitters";
import { EmittersSquareShapeGenerator } from "./EmittersSquareShapeGenerator.js";
import { type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

/**
 *
 * @param engine -
 * @param refresh -
 */
export async function loadEmittersShapeSquare(engine: Engine, refresh = true): Promise<void> {
    const emittersEngine = engine as EmittersEngine;

    emittersEngine.checkVersion(__VERSION__);

    emittersEngine.addEmitterShapeGenerator?.("square", new EmittersSquareShapeGenerator());

    await emittersEngine.refresh(refresh);
}
