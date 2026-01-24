import { type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

/**
 * @param engine -
 */
export async function loadTrailEffect(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.register(async e => {
    const { TrailDrawer } = await import("./TrailDrawer.js");

    e.addEffect("trail", new TrailDrawer());
  });
}
