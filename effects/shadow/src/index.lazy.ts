import { type Engine } from "@tsparticles/engine/lazy";

declare const __VERSION__: string;

/**
 * @param engine - The engine to load the shape in
 */
export async function loadShadowEffect(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.pluginManager.register(e => {
    e.pluginManager.addEffect("shadow", async container => {
      const { ShadowDrawer } = await import("./ShadowDrawer.js");

      return new ShadowDrawer(e.pluginManager, container);
    });
  });
}
