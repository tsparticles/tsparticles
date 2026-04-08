import { type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

/**
 * @param engine -
 */
export async function loadPaintUpdater(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.pluginManager.register(e => {
    e.pluginManager.addParticleUpdater("paint", async container => {
      const { PaintUpdater } = await import("./PaintUpdater.js");

      return new PaintUpdater(e.pluginManager, container);
    });
  });
}
