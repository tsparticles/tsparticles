import { type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

/**
 * @param engine -
 */
export async function loadRotateUpdater(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.register(e => {
    e.addParticleUpdater("rotate", async container => {
      const { RotateUpdater } = await import("./RotateUpdater.js");

      return new RotateUpdater(container);
    });
  });
}
