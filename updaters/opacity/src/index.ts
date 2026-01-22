import { type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

/**
 * @param engine - The engine instance to load the updater for
 */
export async function loadOpacityUpdater(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.register(e => {
    e.addParticleUpdater("opacity", async container => {
      const { OpacityUpdater } = await import("./OpacityUpdater.js");

      return new OpacityUpdater(container);
    });
  });
}
