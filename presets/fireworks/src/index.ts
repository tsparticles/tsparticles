import type { Engine } from "@tsparticles/engine";
import { initOptions } from "./options.js";
import { loadBasic } from "@tsparticles/basic";
import { loadDestroyUpdater } from "@tsparticles/updater-destroy";
import { loadEmittersPluginSimple } from "@tsparticles/plugin-emitters/plugin";
import { loadEmittersShapeSquare } from "@tsparticles/plugin-emitters-shape-square";
import { loadLifeUpdater } from "@tsparticles/updater-life";
import { loadLineShape } from "@tsparticles/shape-line";
import { loadRotateUpdater } from "@tsparticles/updater-rotate";
import { loadSoundsPlugin } from "@tsparticles/plugin-sounds";
import { loadTrailEffect } from "@tsparticles/effect-trail";

const presetName = "fireworks";

/**
 * @param engine - The engine to load the shape in
 */
export async function loadFireworksPreset(engine: Engine): Promise<void> {
  await engine.pluginManager.register(async e => {
    const loadEmittersForFireworks = async (e: Engine): Promise<void> => {
      await loadEmittersPluginSimple(e);

      await loadEmittersShapeSquare(e);
    };

    await Promise.all([
      loadBasic(e),
      loadEmittersForFireworks(e),
      loadTrailEffect(e),
      loadSoundsPlugin(e),
      loadLineShape(e),
      loadRotateUpdater(e),
      loadDestroyUpdater(e),
      loadLifeUpdater(e),
    ]);

    e.pluginManager.addPreset(presetName, initOptions(), false);
  });
}
