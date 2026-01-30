import type { Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

export const brownianPathName = "brownianPathGenerator";

/**
 * @param engine -
 */
export async function loadBrownianPath(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.register(e => {
    e.addPathGenerator(brownianPathName, async container => {
      const { BrownianPathGenerator } = await import("./BrownianPathGenerator.js");

      return new BrownianPathGenerator(container);
    });
  });
}
