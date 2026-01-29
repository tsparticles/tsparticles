import type { Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

export const spiralPathName = "spiralPathGenerator";

/**
 * @param engine -
 */
export async function loadSpiralPath(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.register(async e => {
    const { SpiralPathGenerator } = await import("./SpiralPathGenerator.js");

    e.addPathGenerator(spiralPathName, new SpiralPathGenerator());
  });
}
