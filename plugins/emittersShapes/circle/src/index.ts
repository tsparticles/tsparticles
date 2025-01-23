import { EmittersCircleShapeGenerator } from "./EmittersCircleShapeGenerator.js";
import type { EmittersEngine } from "@tsparticles/plugin-emitters";
import { type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

/**
 * @param engine -
 * @param refresh -
 */
export async function loadEmittersShapeCircle(engine: Engine, refresh = true): Promise<void> {
    const emittersEngine = engine as EmittersEngine;

    emittersEngine.checkVersion(__VERSION__);

    emittersEngine.addEmitterShapeGenerator?.("circle", new EmittersCircleShapeGenerator());

    await emittersEngine.refresh(refresh);
}
