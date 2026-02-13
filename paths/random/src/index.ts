import { type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

export const randomPathName = "randomPathGenerator";

/**
 * @param engine -
 */
export async function loadRandomPath(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.register(e => {
    e.addPathGenerator(randomPathName, async () => {
      const { RandomPathGenerator } = await import("./RandomPathGenerator.js");

      return new RandomPathGenerator();
    });
  });
}
