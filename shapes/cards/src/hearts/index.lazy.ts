import { type Engine } from "@tsparticles/engine/lazy";

declare const __VERSION__: string;

/**
 * @param engine - The engine to load the shape in
 */
export async function loadHeartsSuitShape(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.pluginManager.register(e => {
    e.pluginManager.addShape(["heart", "hearts"], async () => {
      const { HeartDrawer } = await import("./HeartDrawer.js");

      return new HeartDrawer();
    });
  });
}
