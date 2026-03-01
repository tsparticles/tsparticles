import { type Engine } from "@tsparticles/engine";
import { type MoveEngine } from "@tsparticles/plugin-move";

declare const __VERSION__: string;

export const curlNoisePathName = "curlNoise";

/**
 * @param engine -
 */
export async function loadCurlNoisePath(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.register(async (e: MoveEngine) => {
    const { ensureBaseMoverLoaded } = await import("@tsparticles/plugin-move");

    ensureBaseMoverLoaded(e);

    e.addPathGenerator?.(curlNoisePathName, async container => {
      const { CurlNoiseGenerator } = await import("./CurlNoiseGenerator.js");

      return new CurlNoiseGenerator(container);
    });
  });
}
