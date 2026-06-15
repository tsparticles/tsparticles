import type { Engine } from "@tsparticles/engine/lazy";
import type { MoveEngine } from "@tsparticles/plugin-move/lazy";

declare const __VERSION__: string;

export const levyPathName = "levyPathGenerator";

/**
 * @param engine - The engine to load the shape in
 */
export async function loadLevyPath(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.pluginManager.register(async (e: MoveEngine) => {
    const { ensureBaseMoverLoaded } = await import("@tsparticles/plugin-move/lazy");

    ensureBaseMoverLoaded(e);

    e.pluginManager.addPathGenerator?.(levyPathName, async container => {
      const { LevyPathGenerator } = await import("./LevyPathGenerator.js");

      return new LevyPathGenerator(container);
    });
  });
}
