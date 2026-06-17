import type { Engine } from "@tsparticles/engine/lazy";
import type { MoveEngine } from "@tsparticles/plugin-move/lazy";

declare const __VERSION__: string;

export const spiralPathName = "spiralPathGenerator";

/**
 * @param engine - The engine to load the shape in
 */
export async function loadSpiralPath(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.pluginManager.register(async (e: MoveEngine) => {
    const { ensureBaseMoverLoaded } = await import("@tsparticles/plugin-move/lazy");

    ensureBaseMoverLoaded(e);

    e.pluginManager.addPathGenerator?.(spiralPathName, async container => {
      const { SpiralPathGenerator } = await import("./SpiralPathGenerator.js");

      return new SpiralPathGenerator(container);
    });
  });
}
