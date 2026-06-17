import { type Engine } from "@tsparticles/engine/lazy";

declare const __VERSION__: string;

/**
 * @param engine - The engine to load the shape in
 */
export async function loadRoundedRectShape(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.pluginManager.register(e => {
    e.pluginManager.addShape(["rounded-rect"], async () => {
      const { RoundedRectDrawer } = await import("./RoundedRectDrawer.js");

      return new RoundedRectDrawer();
    });
  });
}
