import type { EmittersEngine } from "@tsparticles/plugin-emitters";
import { EmittersPathShapeGenerator } from "./EmittersPathShapeGenerator.js";
import { type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

/**
 *
 * @param engine -
 * @param refresh -
 */
export async function loadEmittersShapePath(engine: Engine, refresh = true): Promise<void> {
    const emittersEngine = engine as EmittersEngine;

    emittersEngine.checkVersion(__VERSION__);

    emittersEngine.addEmitterShapeGenerator?.("path", new EmittersPathShapeGenerator());

    await emittersEngine.refresh(refresh);
}
