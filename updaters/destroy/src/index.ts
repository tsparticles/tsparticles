import { type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

/**
 * @param engine -
 */
export async function loadDestroyUpdater(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.pluginManager.register(e => {
    e.pluginManager.addParticleUpdater("destroy", async container => {
      const { DestroyUpdater } = await import("./DestroyUpdater.js");

      return new DestroyUpdater(e.pluginManager, container);
    });
  });
}
