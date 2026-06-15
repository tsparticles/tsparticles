import { type Engine } from "@tsparticles/engine/lazy";

declare const __VERSION__: string;

/**
 * @param engine - The engine to load the shape in
 */
export async function loadOrbitUpdater(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.pluginManager.register(e => {
    e.pluginManager.addParticleUpdater("orbit", async container => {
      const { OrbitUpdater } = await import("./OrbitUpdater.js");

      return new OrbitUpdater(e.pluginManager, container);
    });
  });
}
