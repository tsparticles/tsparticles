import type { Engine } from "@tsparticles/engine/lazy";

const presetName = "links";

/**
 * @param engine - The engine to load the shape in
 */
export async function loadLinksPreset(engine: Engine): Promise<void> {
  await engine.pluginManager.register(async e => {
    const [{ loadBasic }, { loadParticlesLinksInteraction }, { loadInteractivityPlugin }, { options }] =
      await Promise.all([
        import("@tsparticles/basic/lazy"),
        import("@tsparticles/interaction-particles-links/lazy"),
        import("@tsparticles/plugin-interactivity/lazy"),
        import("./options.js"),
      ]);

    await Promise.all([
      loadBasic(e),
      (async (): Promise<void> => {
        await loadInteractivityPlugin(e);

        await loadParticlesLinksInteraction(e);
      })(),
    ]);

    e.pluginManager.addPreset(presetName, options);
  });
}
