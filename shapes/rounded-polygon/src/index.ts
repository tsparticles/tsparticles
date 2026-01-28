import { type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

/**
 * @param engine -
 */
export async function loadRoundedPolygonShape(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.register(e => {
    e.addShape(["rounded-polygon"], async () => {
      const { RoundedPolygonDrawer } = await import("./RoundedPolygonDrawer.js");

      return new RoundedPolygonDrawer();
    });
  });
}
