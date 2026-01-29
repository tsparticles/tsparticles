import { type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

/**
 * @param engine -
 */
export async function loadTrailEffect(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.register(e => {
    e.addEffect("trail", async () => {
      const { TrailDrawer } = await import("./TrailDrawer.js");

      return new TrailDrawer();
    });
  });
}
