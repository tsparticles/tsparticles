import { type Engine } from "@tsparticles/engine/lazy";

declare const __VERSION__: string;

/**
 * @param engine - The engine to load the shape in
 */
export async function loadMatrixShape(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.pluginManager.register(async e => {
    const { MatrixDrawer } = await import("./MatrixDrawer.js");

    e.pluginManager.addShape(["matrix"], () => Promise.resolve(new MatrixDrawer()));
  });
}
