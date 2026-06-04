import type { Engine } from "@tsparticles/engine/lazy";

const presetName = "meteors";

/**
 *
 * @param engine
 */
export async function loadMeteorsPreset(engine: Engine): Promise<void> {
  await engine.pluginManager.register(async e => {
    const [
        { loadBasic },
        { loadEmittersPluginSimple },
        { loadEmittersShapeSquare },
        { loadTrailEffect },
        { options },
      ] = await Promise.all([
        import("@tsparticles/basic/lazy"),
        import("@tsparticles/plugin-emitters/plugin/lazy"),
        import("@tsparticles/plugin-emitters-shape-square/lazy"),
        import("@tsparticles/effect-trail/lazy"),
        import("./options.js"),
      ]),
      loadEmittersCustom = async (eng: Engine): Promise<void> => {
        await loadEmittersPluginSimple(eng);
        await loadEmittersShapeSquare(eng);
      };

    await Promise.all([
      loadBasic(e),
      loadEmittersCustom(e),
      loadTrailEffect(e),
    ]);

    e.pluginManager.addPreset(presetName, options);
  });
}
