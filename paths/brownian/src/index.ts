import type { Engine } from "@tsparticles/engine";
import type { MoveEngine } from "@tsparticles/plugin-move";

declare const __VERSION__: string;

export const brownianPathName = "brownianPathGenerator";

/**
 * @param engine -
 */
export async function loadBrownianPath(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.register(async (e: MoveEngine) => {
    const { ensureBaseMoverLoaded } = await import("@tsparticles/plugin-move");

    ensureBaseMoverLoaded(e);

    e.addPathGenerator?.(brownianPathName, async container => {
      const { BrownianPathGenerator } = await import("./BrownianPathGenerator.js");

      return new BrownianPathGenerator(container);
    });
  });
}
