import type { Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

export const gridPathName = "gridPathGenerator";

/**
 * @param engine -
 */
export async function loadGridPathPath(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.register(e => {
    e.addPathGenerator(gridPathName, async container => {
      const { GridPathGenerator } = await import("./GridPathGenerator.js");

      return new GridPathGenerator(container);
    });
  });
}
