import { type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

/**
 * This function is used to load the HSL color plugin
 * @param engine - The engine that will use the plugin
 */
export async function loadHslColorPlugin(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.pluginManager.register(async e => {
    const { HslColorManager } = await import("./HslColorManager.js");

    e.pluginManager.addColorManager("hsl", new HslColorManager());
  });
}
