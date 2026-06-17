import { type Engine } from "@tsparticles/engine";
import { loadBasic } from "@tsparticles/basic";
import { options } from "./options.js";

const presetName = "ambient";

/**
 * @param engine - The engine to load the shape in
 */
export async function loadAmbientPreset(engine: Engine): Promise<void> {
  await engine.pluginManager.register(async e => {
    await loadBasic(e);

    e.pluginManager.addPreset(presetName, options);
  });
}
