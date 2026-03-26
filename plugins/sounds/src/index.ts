import { type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

/**
 * @param engine -
 */
export async function loadSoundsPlugin(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.pluginManager.register(async e => {
    const { SoundsPlugin } = await import("./SoundsPlugin.js");

    e.pluginManager.addPlugin(new SoundsPlugin(engine));
  });
}
