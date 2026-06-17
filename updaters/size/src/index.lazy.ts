import { type Engine } from "@tsparticles/engine/lazy";

declare const __VERSION__: string;

/**
 * @param engine - The engine to load the shape in
 */
export async function loadSizeUpdater(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.pluginManager.register(e => {
    e.pluginManager.addParticleUpdater("size", async container => {
      const { SizeUpdater } = await import("./SizeUpdater.js");

      return new SizeUpdater(container);
    });
  });
}
