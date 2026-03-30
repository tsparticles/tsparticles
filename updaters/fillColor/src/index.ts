import { type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

/**
 * @param engine -
 */
export async function loadFillColorUpdater(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.pluginManager.register(e => {
    e.pluginManager.addParticleUpdater("color", async container => {
      const { FillColorUpdater } = await import("./FillColorUpdater.js");

      return new FillColorUpdater(e.pluginManager, container);
    });
  });
}
