import type { Engine } from "@tsparticles/engine";
import type { MoveEngine } from "@tsparticles/move-base";

declare const __VERSION__: string;

export const spiralPathName = "spiralPathGenerator";

/**
 * @param engine -
 */
export async function loadSpiralPath(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.register(async (e: MoveEngine) => {
    const { ensureBaseMoverLoaded } = await import("@tsparticles/move-base");

    ensureBaseMoverLoaded(e);

    e.addPathGenerator?.(spiralPathName, async container => {
      const { SpiralPathGenerator } = await import("./SpiralPathGenerator.js");

      return new SpiralPathGenerator(container);
    });
  });
}
