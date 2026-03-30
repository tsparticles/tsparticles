import { type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

/**
 * @param engine - The engine instance
 */
export async function loadBackgroundMaskPlugin(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.pluginManager.register(async e => {
    const { BackgroundMaskPlugin } = await import("./BackgroundMaskPlugin.js");

    e.pluginManager.addPlugin(new BackgroundMaskPlugin(e.pluginManager));
  });
}
