import { type Engine } from "@tsparticles/engine";
import { type MoveEngine } from "@tsparticles/move-base";

declare const __VERSION__: string;

export const fractalNoisePathName = "fractalNoise";

/**
 * @param engine -
 */
export async function loadFractalNoisePath(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.register(async (e: MoveEngine) => {
    const { ensureBaseMoverLoaded } = await import("@tsparticles/move-base");

    ensureBaseMoverLoaded(e);

    e.addPathGenerator?.(fractalNoisePathName, async container => {
      const { FractalNoiseGenerator } = await import("./FractalNoiseGenerator.js");

      return new FractalNoiseGenerator(container);
    });
  });
}
