import { type Engine } from "@tsparticles/engine";
import { type MoveEngine } from "@tsparticles/move-base";

declare const __VERSION__: string;

export const perlinNoisePathName = "perlinNoise";

/**
 * @param engine -
 */
export async function loadPerlinNoisePath(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.register(async (e: MoveEngine) => {
    const { ensureBaseMoverLoaded } = await import("@tsparticles/move-base");

    ensureBaseMoverLoaded(e);

    e.addPathGenerator?.(perlinNoisePathName, async container => {
      const { PerlinNoiseGenerator } = await import("./PerlinNoiseGenerator.js");

      return new PerlinNoiseGenerator(container);
    });
  });
}
