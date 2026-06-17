import { type Engine } from "@tsparticles/engine/lazy";

declare const __VERSION__: string;

/**
 * @param engine - The engine to load the shape in
 */
export async function loadTwinkleUpdater(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.pluginManager.register(e => {
    e.pluginManager.addParticleUpdater("twinkle", async container => {
      const { TwinkleUpdater } = await import("./TwinkleUpdater.js");

      return new TwinkleUpdater(e.pluginManager, container);
    });
  });
}
