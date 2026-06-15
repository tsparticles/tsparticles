import type { Engine } from "@tsparticles/engine/lazy";
import type { MoveEngine } from "@tsparticles/plugin-move/lazy";

declare const __VERSION__: string;

export const brownianPathName = "brownianPathGenerator";

/**
 * @param engine - The engine to load the shape in
 */
export async function loadBrownianPath(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.pluginManager.register(async (e: MoveEngine) => {
    const { ensureBaseMoverLoaded } = await import("@tsparticles/plugin-move/lazy");

    ensureBaseMoverLoaded(e);

    e.pluginManager.addPathGenerator?.(brownianPathName, async container => {
      const { BrownianPathGenerator } = await import("./BrownianPathGenerator.js");

      return new BrownianPathGenerator(container);
    });
  });
}
