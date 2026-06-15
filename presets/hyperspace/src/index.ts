import type { Engine } from "@tsparticles/engine";
import { loadBasic } from "@tsparticles/basic";
import { loadEmittersPluginSimple } from "@tsparticles/plugin-emitters/plugin";
import { loadEmittersShapeSquare } from "@tsparticles/plugin-emitters-shape-square";
import { loadLifeUpdater } from "@tsparticles/updater-life";
import { loadTrailPlugin } from "@tsparticles/plugin-trail";
import { options } from "./options.js";

const presetName = "hyperspace";

/**
 * @param engine - The engine to load the shape in
 */
export async function loadHyperspacePreset(engine: Engine): Promise<void> {
  await engine.pluginManager.register(async e => {
    await Promise.all([
      loadBasic(e),
      (async (): Promise<void> => {
        await loadEmittersPluginSimple(e);

        await loadEmittersShapeSquare(e);
      })(),
      loadTrailPlugin(e),
      loadLifeUpdater(e),
    ]);

    e.pluginManager.addPreset(presetName, options);
  });
}
