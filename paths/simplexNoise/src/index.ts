import { type Engine } from "@tsparticles/engine";
import { type MoveEngine } from "@tsparticles/move-base";

declare const __VERSION__: string;

export const simplexNoisePathName = "simplexNoise";

/**
 * @param engine -
 */
export async function loadSimplexNoisePath(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.register(async (e: MoveEngine) => {
    const { ensureBaseMoverLoaded } = await import("@tsparticles/move-base");

    ensureBaseMoverLoaded(e);

    e.addPathGenerator?.(simplexNoisePathName, async container => {
      const { SimplexNoiseGenerator } = await import("./SimplexNoiseGenerator.js");

      return new SimplexNoiseGenerator(container);
    });
  });
}
