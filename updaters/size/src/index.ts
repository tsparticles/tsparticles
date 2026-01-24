import { type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

/**
 * @param engine -
 */
export async function loadSizeUpdater(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.register(e => {
    e.addParticleUpdater("size", async () => {
      const { SizeUpdater } = await import("./SizeUpdater.js");

      return new SizeUpdater();
    });
  });
}
