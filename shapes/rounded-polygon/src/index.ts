import { type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

/**
 * @param engine -
 */
export async function loadRoundedPolygonShape(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.register(async e => {
    const { RoundedPolygonDrawer } = await import("./RoundedPolygonDrawer.js");

    e.addShape(new RoundedPolygonDrawer());
  });
}
