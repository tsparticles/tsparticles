import type { Engine } from "@tsparticles/engine";
import { loadBasic } from "@tsparticles/basic";
import { loadEmittersPluginSimple } from "@tsparticles/plugin-emitters/plugin";
import { loadEmittersShapeSquare } from "@tsparticles/plugin-emitters-shape-square";
import { loadTrailEffect } from "@tsparticles/effect-trail";
import { options } from "./options.js";

const presetName = "meteors";

/**
 * @param engine -
 */
export async function loadMeteorsPreset(engine: Engine): Promise<void> {
  await engine.pluginManager.register(async e => {
    const loadEmittersCustom = async (eng: Engine): Promise<void> => {
      await loadEmittersPluginSimple(eng);
      await loadEmittersShapeSquare(eng);
    };

    await Promise.all([
      loadBasic(e),
      loadEmittersCustom(e),
      loadTrailEffect(e),
    ]);

    e.pluginManager.addPreset(presetName, options);
  });
}
