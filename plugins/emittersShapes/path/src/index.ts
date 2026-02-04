import type { EmittersEngine } from "@tsparticles/plugin-emitters";
import type { Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

/**
 *
 * @param engine -
 */
export async function loadEmittersShapePath(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.register(async (e: EmittersEngine) => {
    const { ensureEmittersPluginLoaded } = await import("@tsparticles/plugin-emitters");

    ensureEmittersPluginLoaded(e);

    const { EmittersPathShapeGenerator } = await import("./EmittersPathShapeGenerator.js");

    e.addEmitterShapeGenerator?.("path", new EmittersPathShapeGenerator());
  });
}
