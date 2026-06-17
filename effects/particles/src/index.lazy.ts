import { type Engine } from "@tsparticles/engine/lazy";

declare const __VERSION__: string;

/**
 * @param engine - The engine to load the shape in
 */
export async function loadParticlesEffect(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.pluginManager.register(e => {
    e.pluginManager.addEffect("particles", async container => {
      const { ParticlesDrawer } = await import("./ParticlesDrawer.js");

      return new ParticlesDrawer(container);
    });
  });
}
