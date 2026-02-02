import type { Engine } from "@tsparticles/engine";

const presetName = "seaAnemone";

/**
 * @param engine -
 */
export async function loadSeaAnemonePreset(engine: Engine): Promise<void> {
  await engine.register(async e => {
    const { loadBasic } = await import("@tsparticles/basic"),
      { loadEmittersPlugin } = await import("@tsparticles/plugin-emitters"),
      { loadTrailPlugin } = await import("@tsparticles/plugin-trail"),
      { loadCurvesPath } = await import("@tsparticles/path-curves"),
      { options } = await import("./options.js");

    await loadBasic(e);
    await loadEmittersPlugin(e);
    await loadTrailPlugin(e);
    await loadCurvesPath(e);

    e.addPreset(presetName, options);
  });
}
