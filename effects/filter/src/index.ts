import { type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

/**
 * @param engine -
 */
export async function loadFilterEffect(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.pluginManager.register(e => {
    e.pluginManager.addEffect("filter", async () => {
      const { FilterDrawer } = await import("./FilterDrawer.js");

      return new FilterDrawer();
    });
  });
}
