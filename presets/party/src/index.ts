import type { Engine } from "@tsparticles/engine";
import { loadBasic } from "@tsparticles/basic";
import { loadConfettiPalette } from "@tsparticles/palette-confetti";
import { loadEmittersPluginSimple } from "@tsparticles/plugin-emitters/plugin";
import { loadEmittersShapeSquare } from "@tsparticles/plugin-emitters-shape-square";
import { loadPolygonShape } from "@tsparticles/shape-polygon";
import { loadRibbonShape } from "@tsparticles/shape-ribbon";
import { loadRollUpdater } from "@tsparticles/updater-roll";
import { loadRotateUpdater } from "@tsparticles/updater-rotate";
import { loadSquareShape } from "@tsparticles/shape-square";
import { loadTiltUpdater } from "@tsparticles/updater-tilt";
import { loadWobbleUpdater } from "@tsparticles/updater-wobble";
import { options } from "./options.js";

const presetName = "party";

/**
 * @param engine - The engine to load the shape in
 */
export async function loadPartyPreset(engine: Engine): Promise<void> {
  await engine.pluginManager.register(async e => {
    const loadEmittersCustom = async (eng: Engine): Promise<void> => {
      await loadEmittersPluginSimple(eng);
      await loadEmittersShapeSquare(eng);
    };

    await Promise.all([
      loadBasic(e),
      loadConfettiPalette(e),
      loadEmittersCustom(e),
      loadPolygonShape(e),
      loadRibbonShape(e),
      loadSquareShape(e),
      loadRollUpdater(e),
      loadRotateUpdater(e),
      loadTiltUpdater(e),
      loadWobbleUpdater(e),
    ]);

    e.pluginManager.addPreset(presetName, options);
  });
}
