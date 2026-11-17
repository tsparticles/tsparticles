import type { Engine } from "@tsparticles/engine/lazy";

declare const __VERSION__: string;

/**
 * @param engine - The engine to load the updater in
 */
export async function loadColorTransitionsUpdater(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.pluginManager.register(e => {
    e.pluginManager.addParticleUpdater("colorTransitions", async container => {
      const { ColorTransitionsUpdater } = await import("./ColorTransitionsUpdater.js");

      return new ColorTransitionsUpdater(e.pluginManager, container);
    });
  });
}
