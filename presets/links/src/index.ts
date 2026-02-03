import type { Engine } from "@tsparticles/engine";

const presetName = "links";

/**
 * @param engine -
 */
export async function loadLinksPreset(engine: Engine): Promise<void> {
  await engine.register(async e => {
    const { loadBasic } = await import("@tsparticles/basic"),
      { loadParticlesLinksInteraction } = await import("@tsparticles/interaction-particles-links"),
      { options } = await import("./options.js");

    await loadBasic(e);
    await loadParticlesLinksInteraction(e);

    e.addPreset(presetName, options);
  });
}
