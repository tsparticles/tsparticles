import { type Engine } from "@tsparticles/engine";
import { loadBasic } from "@tsparticles/basic";
import { loadExternalTrailInteraction } from "@tsparticles/interaction-external-trail";
import { loadInteractivityPlugin } from "@tsparticles/plugin-interactivity";
import { loadLifeUpdater } from "@tsparticles/updater-life";
import { options } from "./options.js";

const presetName = "firefly";

/**
 * @param engine - The engine to load the shape in
 */
export async function loadFireflyPreset(engine: Engine): Promise<void> {
  await engine.pluginManager.register(async e => {
    await Promise.all([
      loadBasic(e),
      loadLifeUpdater(e),
      (async (): Promise<void> => {
        await loadInteractivityPlugin(e);

        await loadExternalTrailInteraction(e);
      })(),
    ]);

    e.pluginManager.addPreset(presetName, options);
  });
}
