import type { Engine } from "@tsparticles/engine/lazy";

const presetNames = ["confettiCannon", "confetti-cannon"];

/**
 * @param engine - The engine to load the shape in
 */
export async function loadConfettiCannonPreset(engine: Engine): Promise<void> {
  await engine.pluginManager.register(async e => {
    const [
      { loadBasic },
      { loadExternalCannonInteraction },
      { loadInteractivityPlugin },
      { loadMotionPlugin },
      { loadRotateUpdater },
      { loadSquareShape },
      { loadTiltUpdater },
      { loadWobbleUpdater },
      { loadLifeUpdater },
      { loadRollUpdater },
      { loadConfettiPalette },
      { options },
    ] = await Promise.all([
      import("@tsparticles/basic/lazy"),
      import("@tsparticles/interaction-external-cannon/lazy"),
      import("@tsparticles/plugin-interactivity/lazy"),
      import("@tsparticles/plugin-motion/lazy"),
      import("@tsparticles/updater-rotate/lazy"),
      import("@tsparticles/shape-square/lazy"),
      import("@tsparticles/updater-tilt/lazy"),
      import("@tsparticles/updater-wobble/lazy"),
      import("@tsparticles/updater-life/lazy"),
      import("@tsparticles/updater-roll/lazy"),
      import("@tsparticles/palette-confetti/lazy"),
      import("./options.js"),
    ]);

    await Promise.all([
      loadBasic(e),
      loadConfettiPalette(e),
      (async (): Promise<void> => {
        await loadInteractivityPlugin(e);
        await loadExternalCannonInteraction(e);
      })(),
      loadSquareShape(e),
      loadMotionPlugin(e),
      loadWobbleUpdater(e),
      loadRollUpdater(e),
      loadRotateUpdater(e),
      loadTiltUpdater(e),
      loadLifeUpdater(e),
    ]);

    presetNames.forEach(name => {
      e.pluginManager.addPreset(name, options, false);
    });
  });
}
