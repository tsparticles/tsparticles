import type { Engine } from "@tsparticles/engine";
import { loadBasic } from "@tsparticles/basic";
import { loadConfettiPalette } from "@tsparticles/palette-confetti";
import { loadEmittersPluginSimple } from "@tsparticles/plugin-emitters/plugin";
import { loadLifeUpdater } from "@tsparticles/updater-life";
import { loadMotionPlugin } from "@tsparticles/plugin-motion";
import { loadRollUpdater } from "@tsparticles/updater-roll";
import { loadRotateUpdater } from "@tsparticles/updater-rotate";
import { loadSquareShape } from "@tsparticles/shape-square";
import { loadTiltUpdater } from "@tsparticles/updater-tilt";
import { loadWobbleUpdater } from "@tsparticles/updater-wobble";
import { options } from "./options.js";

const presetName = "confetti";

/**
 * @param engine - The engine to load the shape in
 */
export async function loadConfettiPreset(engine: Engine): Promise<void> {
  await engine.pluginManager.register(async e => {
    await Promise.all([
      loadBasic(e),
      loadConfettiPalette(e),
      loadEmittersPluginSimple(e),
      loadSquareShape(e),
      loadMotionPlugin(e),
      loadWobbleUpdater(e),
      loadRollUpdater(e),
      loadRotateUpdater(e),
      loadTiltUpdater(e),
      loadLifeUpdater(e),
    ]);

    e.pluginManager.addPreset(presetName, options, false);
  });
}
