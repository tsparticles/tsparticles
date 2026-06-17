import { type Engine } from "@tsparticles/engine/lazy";

declare const __VERSION__: string;

/**
 * @param engine - The engine to load the shape in
 */
export async function loadArrowShape(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.pluginManager.register(async e => {
    const { ArrowDrawer } = await import("./ArrowDrawer.js");

    e.pluginManager.addShape(["arrow"], () => Promise.resolve(new ArrowDrawer()));
  });
}
