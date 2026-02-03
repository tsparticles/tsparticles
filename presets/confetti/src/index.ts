import type { Engine } from "@tsparticles/engine";

const presetName = "confetti";

/**
 * @param engine -
 */
export async function loadConfettiPreset(engine: Engine): Promise<void> {
  await engine.register(async e => {
    const { loadBasic } = await import("@tsparticles/basic"),
      { loadEmittersPlugin } = await import("@tsparticles/plugin-emitters"),
      { loadMotionPlugin } = await import("@tsparticles/plugin-motion"),
      { loadRotateUpdater } = await import("@tsparticles/updater-rotate"),
      { loadSquareShape } = await import("@tsparticles/shape-square"),
      { loadTiltUpdater } = await import("@tsparticles/updater-tilt"),
      { loadWobbleUpdater } = await import("@tsparticles/updater-wobble"),
      { loadLifeUpdater } = await import("@tsparticles/updater-life"),
      { loadRollUpdater } = await import("@tsparticles/updater-roll"),
      { options } = await import("./options.js");

    await loadBasic(e);
    await loadSquareShape(e);
    await loadEmittersPlugin(e);
    await loadMotionPlugin(e);
    await loadWobbleUpdater(e);
    await loadRollUpdater(e);
    await loadRotateUpdater(e);
    await loadTiltUpdater(e);
    await loadLifeUpdater(e);

    e.addPreset(presetName, options, false);
  });
}
