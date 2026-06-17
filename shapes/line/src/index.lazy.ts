import { type Engine } from "@tsparticles/engine/lazy";

declare const __VERSION__: string;

/**
 * @param engine - The engine to load the shape in
 */
export async function loadLineShape(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.pluginManager.register(async e => {
    const { LineDrawer } = await import("./LineDrawer.js");

    e.pluginManager.addShape(["line"], () => Promise.resolve(new LineDrawer()));
  });
}
