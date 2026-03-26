import { type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

/**
 * This function is used to load the hex color plugin
 * @param engine - The engine that will use the plugin
 */
export async function loadHexColorPlugin(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.pluginManager.register(async e => {
    const { HexColorManager } = await import("./HexColorManager.js");

    e.pluginManager.addColorManager("hex", new HexColorManager());
  });
}
