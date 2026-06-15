import type { Engine } from "@tsparticles/engine/lazy";

const presetNames = ["confettiFalling", "confetti-falling"];

/**
 * @param engine - The engine to load the shape in
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
      import("@tsparticles/basic/lazy"),
      import("@tsparticles/plugin-motion/lazy"),
      import("@tsparticles/updater-rotate/lazy"),
      import("@tsparticles/shape-square/lazy"),
      import("@tsparticles/updater-tilt/lazy"),
      import("@tsparticles/updater-wobble/lazy"),
      import("@tsparticles/updater-roll/lazy"),
      import("@tsparticles/palette-confetti/lazy"),
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
