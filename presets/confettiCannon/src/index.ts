import type { Engine } from "@tsparticles/engine";

const presetNames = ["confettiCannon", "confetti-cannon"];

/**
 * @param engine -
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
      import("@tsparticles/basic"),
      import("@tsparticles/interaction-external-cannon"),
      import("@tsparticles/plugin-interactivity"),
      import("@tsparticles/plugin-motion"),
      import("@tsparticles/updater-rotate"),
      import("@tsparticles/shape-square"),
      import("@tsparticles/updater-tilt"),
      import("@tsparticles/updater-wobble"),
      import("@tsparticles/updater-life"),
      import("@tsparticles/updater-roll"),
      import("@tsparticles/palette-confetti"),
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
