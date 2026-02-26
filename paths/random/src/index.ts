import { type Engine } from "@tsparticles/engine";
import { type MoveEngine } from "@tsparticles/move-base";

declare const __VERSION__: string;

export const randomPathName = "randomPathGenerator";

/**
 * @param engine -
 */
export async function loadRandomPath(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.register(async (e: MoveEngine) => {
    const { ensureBaseMoverLoaded } = await import("@tsparticles/move-base");

    ensureBaseMoverLoaded(e);

    e.addPathGenerator?.(randomPathName, async () => {
      const { RandomPathGenerator } = await import("./RandomPathGenerator.js");

      return new RandomPathGenerator();
    });
  });
}
