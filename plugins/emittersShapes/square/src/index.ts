import { type Engine, assertValidVersion } from "@tsparticles/engine";
import type { EmittersEngine } from "@tsparticles/plugin-emitters";
import { EmittersSquareShapeGenerator } from "./EmittersSquareShapeGenerator.js";

declare const __VERSION__: string;

/**
 *
 * @param engine -
 * @param refresh -
 */
export async function loadEmittersShapeSquare(engine: Engine, refresh = true): Promise<void> {
    const emittersEngine = engine as EmittersEngine;

    assertValidVersion(emittersEngine, __VERSION__);

    emittersEngine.addEmitterShapeGenerator?.("square", new EmittersSquareShapeGenerator());

    await emittersEngine.refresh(refresh);
}
