import type { Engine } from "@tsparticles/engine/lazy";

const presetName = "party";

/**
 * @param engine -
 */
export async function loadPartyPreset(engine: Engine): Promise<void> {
  await engine.pluginManager.register(async e => {
    const [
        { loadBasic },
        { loadConfettiPalette },
        { loadEmittersPluginSimple },
        { loadEmittersShapeSquare },
        { loadPolygonShape },
        { loadRibbonShape },
        { loadSquareShape },
        { loadRollUpdater },
        { loadRotateUpdater },
        { loadTiltUpdater },
        { loadWobbleUpdater },
        { options },
      ] = await Promise.all([
        import("@tsparticles/basic/lazy"),
        import("@tsparticles/palette-confetti/lazy"),
        import("@tsparticles/plugin-emitters/plugin/lazy"),
        import("@tsparticles/plugin-emitters-shape-square/lazy"),
        import("@tsparticles/shape-polygon/lazy"),
        import("@tsparticles/shape-ribbon/lazy"),
        import("@tsparticles/shape-square/lazy"),
        import("@tsparticles/updater-roll/lazy"),
        import("@tsparticles/updater-rotate/lazy"),
        import("@tsparticles/updater-tilt/lazy"),
        import("@tsparticles/updater-wobble/lazy"),
        import("./options.js"),
      ]),
      loadEmittersCustom = async (eng: Engine): Promise<void> => {
        await loadEmittersPluginSimple(eng);
        await loadEmittersShapeSquare(eng);
      };

    await Promise.all([
      loadBasic(e),
      loadConfettiPalette(e),
      loadEmittersCustom(e),
      loadPolygonShape(e),
      loadRibbonShape(e),
      loadSquareShape(e),
      loadRollUpdater(e),
      loadRotateUpdater(e),
      loadTiltUpdater(e),
      loadWobbleUpdater(e),
    ]);

    e.pluginManager.addPreset(presetName, options);
  });
}
