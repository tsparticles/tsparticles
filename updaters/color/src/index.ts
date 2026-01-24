import { type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

/**
 * @param engine -
 */
export async function loadColorUpdater(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.register(e => {
    e.addParticleUpdater("color", async container => {
      const { ColorUpdater } = await import("./ColorUpdater.js");

      return new ColorUpdater(e, container);
    });
  });
}
