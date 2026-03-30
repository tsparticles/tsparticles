import { type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

/**
 * @param engine -
 */
export async function loadGradientUpdater(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.pluginManager.register(e => {
    e.pluginManager.addParticleUpdater("gradient", async container => {
      const { GradientUpdater } = await import("./GradientUpdater.js");

      return new GradientUpdater(e.pluginManager, container);
    });
  });
}
