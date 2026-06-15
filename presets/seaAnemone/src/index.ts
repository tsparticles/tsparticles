import type { Engine } from "@tsparticles/engine";
import { loadBasic } from "@tsparticles/basic";
import { loadCurvesPath } from "@tsparticles/path-curves";
import { loadEmittersPluginSimple } from "@tsparticles/plugin-emitters/plugin";
import { loadTrailPlugin } from "@tsparticles/plugin-trail";
import { options } from "./options.js";

const presetName = "seaAnemone";

/**
 * @param engine - The engine to load the shape in
 */
export async function loadSeaAnemonePreset(engine: Engine): Promise<void> {
  await engine.pluginManager.register(async e => {
    await Promise.all([
      (async (): Promise<void> => {
        await loadBasic(e);

        await loadCurvesPath(e);
      })(),
      loadEmittersPluginSimple(e),
      loadTrailPlugin(e),
    ]);

    e.pluginManager.addPreset(presetName, options);
  });
}
