import { type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

/**
 * @param engine -
 */
export async function loadShadowEffect(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.register(async e => {
    const { ShadowDrawer } = await import("./ShadowDrawer.js");

    e.addEffect("shadow", new ShadowDrawer(e));
  });
}
