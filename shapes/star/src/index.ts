import { type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

/**
 * @param engine -
 */
export async function loadStarShape(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.pluginManager.register(e => {
    e.pluginManager.addShape(["star"], async () => {
      const { StarDrawer } = await import("./StarDrawer.js");

      return new StarDrawer();
    });
  });
}
