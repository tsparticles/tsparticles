import { EmittersCanvasShapeGenerator } from "./EmittersCanvasShapeGenerator.js";
import type { EmittersEngine } from "@tsparticles/plugin-emitters";
import { type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

/**
 *
 * @param engine -
 * @param refresh -
 */
export async function loadEmittersShapeCanvas(engine: Engine, refresh = true): Promise<void> {
    const emittersEngine = engine as EmittersEngine;

    emittersEngine.checkVersion(__VERSION__);

    emittersEngine.addEmitterShapeGenerator?.("canvas", new EmittersCanvasShapeGenerator());

    await emittersEngine.refresh(refresh);
}
