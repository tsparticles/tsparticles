import { type Engine } from "@tsparticles/engine/lazy";

declare const __VERSION__: string;

/**
 * @param engine - The engine to load the shape in
 */
export async function loadTrailEffect(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.pluginManager.register(e => {
    e.pluginManager.addEffect("trail", async container => {
      const { TrailDrawer } = await import("./TrailDrawer.js");

      return new TrailDrawer(container);
    });
  });
}
