import { type Engine } from "@tsparticles/engine/lazy";

declare const __VERSION__: string;

/**
 * @param engine - The engine to load the shape in
 */
export async function loadRoundedPolygonShape(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.pluginManager.register(async e => {
    const { RoundedPolygonDrawer } = await import("./RoundedPolygonDrawer.js");

    e.pluginManager.addShape(["rounded-polygon"], () => Promise.resolve(new RoundedPolygonDrawer()));
  });
}
