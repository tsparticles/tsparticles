import type { Engine } from "@tsparticles/engine";

const presetName = "confetti";

/**
 * @param engine -
 */
export async function loadConfettiPreset(engine: Engine): Promise<void> {
  await engine.register(async e => {
    const [
      { loadBasic },
      { loadEmittersPlugin },
      { loadInteractivityPlugin },
      { loadMotionPlugin },
      { loadRotateUpdater },
      { loadSquareShape },
      { loadTiltUpdater },
      { loadWobbleUpdater },
      { loadLifeUpdater },
      { loadRollUpdater },
      { options },
    ] = await Promise.all([
      import("@tsparticles/basic"),
      import("@tsparticles/plugin-emitters"),
      import("@tsparticles/plugin-interactivity"),
      import("@tsparticles/plugin-motion"),
      import("@tsparticles/updater-rotate"),
      import("@tsparticles/shape-square"),
      import("@tsparticles/updater-tilt"),
      import("@tsparticles/updater-wobble"),
      import("@tsparticles/updater-life"),
      import("@tsparticles/updater-roll"),
      import("./options.js"),
    ]);

    await loadBasic(e);
    await loadInteractivityPlugin(e);

    await Promise.all([
      loadSquareShape(e),
      loadEmittersPlugin(e),
      loadMotionPlugin(e),
      loadWobbleUpdater(e),
      loadRollUpdater(e),
      loadRotateUpdater(e),
      loadTiltUpdater(e),
      loadLifeUpdater(e),
    ]);

    e.addPreset(presetName, options, false);
  });
}
