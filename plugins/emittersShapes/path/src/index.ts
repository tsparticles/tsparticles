import { type EmittersEngine, ensureEmittersPluginLoaded } from "@tsparticles/plugin-emitters";
import { EmittersPathShapeGenerator } from "./EmittersPathShapeGenerator.js";
import type { Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

/**
 *
 * @param engine - The engine to load the shape in
 */
export async function loadEmittersShapePath(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.pluginManager.register((e: EmittersEngine) => {
    ensureEmittersPluginLoaded(e);

    e.pluginManager.addEmitterShapeGenerator?.("path", new EmittersPathShapeGenerator());
  });
}
