import { type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

/**
 * @param engine -
 */
export async function loadShadowEffect(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.pluginManager.register(e => {
    e.pluginManager.addEffect("shadow", async () => {
      const { ShadowDrawer } = await import("./ShadowDrawer.js");

      return new ShadowDrawer(e.pluginManager);
    });
  });
}
