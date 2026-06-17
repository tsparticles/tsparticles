import { type Engine } from "@tsparticles/engine/lazy";

declare const __VERSION__: string;

/**
 * @param engine - The engine to load the shape in
 */
export async function loadHeartShape(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.pluginManager.register(async e => {
    const { HeartDrawer } = await import("./HeartDrawer.js");

    e.pluginManager.addShape(["heart"], () => Promise.resolve(new HeartDrawer()));
  });
}
