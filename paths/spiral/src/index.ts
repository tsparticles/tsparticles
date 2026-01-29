import type { Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

export const spiralPathName = "spiralPathGenerator";

/**
 * @param engine -
 */
export async function loadSpiralPath(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.register(e => {
    e.addPathGenerator(spiralPathName, async container => {
      const { SpiralPathGenerator } = await import("./SpiralPathGenerator.js");

      return new SpiralPathGenerator(container);
    });
  });
}
