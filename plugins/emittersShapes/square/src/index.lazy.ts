import type { EmittersEngine } from "@tsparticles/plugin-emitters/lazy";
import type { Engine } from "@tsparticles/engine/lazy";

declare const __VERSION__: string;

/**
 * @param engine - The engine to load the shape in
 */
export async function loadEmittersShapeSquare(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.pluginManager.register(async (e: EmittersEngine) => {
    const { ensureEmittersPluginLoaded } = await import("@tsparticles/plugin-emitters/lazy");

    ensureEmittersPluginLoaded(e);

    const { EmittersSquareShapeGenerator } = await import("./EmittersSquareShapeGenerator.js");

    e.pluginManager.addEmitterShapeGenerator?.("square", new EmittersSquareShapeGenerator());
  });
}
