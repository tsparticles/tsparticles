import { type Engine } from "@tsparticles/engine/lazy";

declare const __VERSION__: string;

/**
 * @param engine - The engine to load the shape in
 */
export async function loadCircleShape(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.pluginManager.register(e => {
    e.pluginManager.addShape(["circle"], async () => {
      const { CircleDrawer } = await import("./CircleDrawer.js");

      return new CircleDrawer();
    });
  });
}
