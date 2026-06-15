import { type Engine } from "@tsparticles/engine/lazy";

declare const __VERSION__: string;

/**
 * @param engine - The engine to load the shape in
 */
export async function loadWobbleUpdater(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.pluginManager.register(e => {
    e.pluginManager.addParticleUpdater("wobble", async container => {
      const { WobbleUpdater } = await import("./WobbleUpdater.js");

      return new WobbleUpdater(container);
    });
  });
}
