import { type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

/**
 * @param engine -
 */
export async function loadStrokeColorUpdater(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.pluginManager.register(e => {
    e.pluginManager.addParticleUpdater("strokeColor", async container => {
      const { StrokeColorUpdater } = await import("./StrokeColorUpdater.js");

      return new StrokeColorUpdater(e.pluginManager, container);
    });
  });
}
