import type { Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

export const levyPathName = "levyPathGenerator";

/**
 * @param engine -
 */
export async function loadLevyPath(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.register(e => {
    e.addPathGenerator(levyPathName, async container => {
      const { LevyPathGenerator } = await import("./LevyPathGenerator.js");

      return new LevyPathGenerator(container);
    });
  });
}
