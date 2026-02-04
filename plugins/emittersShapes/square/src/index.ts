import type { EmittersEngine } from "@tsparticles/plugin-emitters";
import type { Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

/**
 * @param engine -
 */
export async function loadEmittersShapeSquare(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.register(async (e: EmittersEngine) => {
    const { ensureEmittersPluginLoaded } = await import("@tsparticles/plugin-emitters");

    ensureEmittersPluginLoaded(e);

    const { EmittersSquareShapeGenerator } = await import("./EmittersSquareShapeGenerator.js");

    e.addEmitterShapeGenerator?.("square", new EmittersSquareShapeGenerator());
  });
}
