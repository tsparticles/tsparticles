import type { EmittersEngine } from "@tsparticles/plugin-emitters/lazy";
import type { Engine } from "@tsparticles/engine/lazy";

declare const __VERSION__: string;

/**
 * @param engine - The engine to load the shape in
 */
export async function loadEmittersShapePolygon(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.pluginManager.register(async (e: EmittersEngine) => {
    const { ensureEmittersPluginLoaded } = await import("@tsparticles/plugin-emitters/lazy");

    ensureEmittersPluginLoaded(e);

    const { EmittersPolygonShapeGenerator } = await import("./EmittersPolygonShapeGenerator.js");

    e.pluginManager.addEmitterShapeGenerator?.("polygon", new EmittersPolygonShapeGenerator());
  });
}
