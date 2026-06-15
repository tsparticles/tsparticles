import type { Engine } from "@tsparticles/engine/lazy";

const presetName = "triangles";

/**
 * @param engine - The engine to load the shape in
 */
export async function loadTrianglesPreset(engine: Engine): Promise<void> {
  await engine.pluginManager.register(async e => {
    const [{ loadBasic }, { loadParticlesLinksInteraction }, { loadInteractivityPlugin }, { options }] =
        await Promise.all([
          import("@tsparticles/basic/lazy"),
          import("@tsparticles/interaction-particles-links/lazy"),
          import("@tsparticles/plugin-interactivity/lazy"),
          import("./options.js"),
        ]),
      loadInteractivityForTriangles = async (e: Engine): Promise<void> => {
        await loadInteractivityPlugin(e);

        await loadParticlesLinksInteraction(e);
      };

    await Promise.all([
      loadBasic(e),
      loadInteractivityForTriangles(e),
    ]);

    e.pluginManager.addPreset(presetName, options);
  });
}
