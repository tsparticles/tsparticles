import type { Engine } from "@tsparticles/engine";

const presetName = "triangles";

/**
 * @param engine -
 */
export async function loadTrianglesPreset(engine: Engine): Promise<void> {
  await engine.register(async e => {
    const { loadBasic } = await import("@tsparticles/basic"),
      { loadParticlesLinksInteraction } = await import("@tsparticles/interaction-particles-links"),
      { options } = await import("./options.js");

    await loadBasic(e);
    await loadParticlesLinksInteraction(e);

    e.addPreset(presetName, options);
  });
}
