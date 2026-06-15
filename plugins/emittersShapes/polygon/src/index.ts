import { type EmittersEngine, ensureEmittersPluginLoaded } from "@tsparticles/plugin-emitters";
import { EmittersPolygonShapeGenerator } from "./EmittersPolygonShapeGenerator.js";
import type { Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

/**
 * @param engine - The engine to load the shape in
 */
export async function loadEmittersShapePolygon(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.pluginManager.register((e: EmittersEngine) => {
    ensureEmittersPluginLoaded(e);

    e.pluginManager.addEmitterShapeGenerator?.("polygon", new EmittersPolygonShapeGenerator());
  });
}
