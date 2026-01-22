import { type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

/**
 * @param engine -
 */
export async function loadWobbleUpdater(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.register(e => {
    e.addParticleUpdater("wobble", async container => {
      const { WobbleUpdater } = await import("./WobbleUpdater.js");

      return new WobbleUpdater(container);
    });
  });
}
