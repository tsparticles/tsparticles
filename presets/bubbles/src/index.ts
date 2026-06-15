import type { Engine } from "@tsparticles/engine";
import { loadBasic } from "@tsparticles/basic";
import { loadEmittersPluginSimple } from "@tsparticles/plugin-emitters/plugin";
import { options } from "./options.js";

const presetName = "bubbles";

/**
 * @param engine - The engine to load the shape in
 */
export async function loadBubblesPreset(engine: Engine): Promise<void> {
  await engine.pluginManager.register(async e => {
    await Promise.all([
      loadBasic(e),
      loadEmittersPluginSimple(e),
    ]);

    e.pluginManager.addPreset(presetName, options);
  });
}
