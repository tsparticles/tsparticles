import { type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

/**
 * @param engine -
 */
export async function loadParticlesEffect(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.register(e => {
    e.addEffect("particles", async () => {
      const { ParticlesDrawer } = await import("./ParticlesDrawer.js");

      return new ParticlesDrawer();
    });
  });
}
