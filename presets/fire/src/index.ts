import type { Engine } from "@tsparticles/engine";
import { loadBasic } from "@tsparticles/basic";
import { loadExternalPushInteraction } from "@tsparticles/interaction-external-push";
import { loadInteractivityPlugin } from "@tsparticles/plugin-interactivity";
import { options } from "./options.js";

const presetName = "fire";

/**
 * @param engine - The engine to load the shape in
 */
export async function loadFirePreset(engine: Engine): Promise<void> {
  await engine.pluginManager.register(async e => {
    await Promise.all([
      loadBasic(e),
      (async (): Promise<void> => {
        await loadInteractivityPlugin(e);

        await loadExternalPushInteraction(e);
      })(),
    ]);

    e.pluginManager.addPreset(presetName, options);
  });
}
