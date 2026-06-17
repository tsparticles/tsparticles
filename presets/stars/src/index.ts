import type { Engine } from "@tsparticles/engine";
import { loadBasic } from "@tsparticles/basic";
import { options } from "./options.js";

const presetName = "stars";

/**
 * @param engine - The engine to load the shape in
 */
export async function loadStarsPreset(engine: Engine): Promise<void> {
  await engine.pluginManager.register(async e => {
    await loadBasic(e);

    e.pluginManager.addPreset(presetName, options);
  });
}
