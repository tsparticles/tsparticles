import type { Engine } from "@tsparticles/engine";

const presetName = "triangles";

/**
 * @param engine -
 */
export async function loadTrianglesPreset(engine: Engine): Promise<void> {
  await engine.pluginManager.register(async e => {
    const [{ loadBasic }, { loadParticlesLinksInteraction }, { loadInteractivityPlugin }, { options }] =
      await Promise.all([
        import("@tsparticles/basic"),
        import("@tsparticles/interaction-particles-links"),
        import("@tsparticles/plugin-interactivity"),
        import("./options.js"),
      ]);

    await loadBasic(e);
    await loadInteractivityPlugin(e);
    await loadParticlesLinksInteraction(e);

    e.pluginManager.addPreset(presetName, options);
  });
}
