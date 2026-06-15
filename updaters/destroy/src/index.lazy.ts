import { type Engine } from "@tsparticles/engine/lazy";

declare const __VERSION__: string;

/**
 * @param engine - The engine to load the shape in
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
