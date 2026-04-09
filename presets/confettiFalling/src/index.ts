import type { Engine } from "@tsparticles/engine";

const presetNames = ["confettiFalling", "confetti-falling"];

/**
 * @param engine -
 */
export async function loadConfettiFallingPreset(engine: Engine): Promise<void> {
  await engine.pluginManager.register(async e => {
    const [
      { loadBasic },
      { loadMotionPlugin },
      { loadRotateUpdater },
      { loadSquareShape },
      { loadTiltUpdater },
      { loadWobbleUpdater },
      { loadRollUpdater },
      { loadConfettiPalette },
      { options },
    ] = await Promise.all([
      import("@tsparticles/basic"),
      import("@tsparticles/plugin-motion"),
      import("@tsparticles/updater-rotate"),
      import("@tsparticles/shape-square"),
      import("@tsparticles/updater-tilt"),
      import("@tsparticles/updater-wobble"),
      import("@tsparticles/updater-roll"),
      import("@tsparticles/palette-confetti"),
      import("./options.js"),
    ]);

    await Promise.all([
      loadBasic(e),
      loadConfettiPalette(e),
      loadSquareShape(e),
      loadMotionPlugin(e),
      loadWobbleUpdater(e),
      loadRollUpdater(e),
      loadRotateUpdater(e),
      loadTiltUpdater(e),
    ]);

    presetNames.forEach(name => {
      e.pluginManager.addPreset(name, options, false);
    });
  });
}
