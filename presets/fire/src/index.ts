import type { Engine } from "@tsparticles/engine";

const presetName = "fire";

/**
 * @param engine -
 */
export async function loadFirePreset(engine: Engine): Promise<void> {
  await engine.register(async e => {
    const { loadBasic } = await import("@tsparticles/basic"),
      { loadExternalPushInteraction } = await import("@tsparticles/interaction-external-push"),
      { options } = await import("./options.js");

    await loadBasic(e);
    await loadExternalPushInteraction(e);

    e.addPreset(presetName, options);
  });
}
