import { type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

/**
 * @param engine -
 */
export async function loadShadowEffect(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.register(e => {
    e.addEffect("shadow", async () => {
      const { ShadowDrawer } = await import("./ShadowDrawer.js");

      return new ShadowDrawer(e);
    });
  });
}
