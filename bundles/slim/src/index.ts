import { type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

/**
 * Loads the slime bundle with all plugins needed for running the tsParticles Slim package.
 * This function must be called to make tsParticles Slim work.
 * This function is not mandatory, the plugins can be loaded manually, or using other plugin bundles.
 * If this function is not called, the \@tsparticles/slim package/dependency can be safely removed.
 * This function is called automatically using CDN bundle files.
 * @param engine - the engine to use for loading all plugins
 */
export async function loadSlim(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.register(async e => {
    const [
      { loadExternalParallaxInteraction },
      { loadExternalAttractInteraction },
      { loadExternalBounceInteraction },
      { loadExternalBubbleInteraction },
      { loadExternalConnectInteraction },
      { loadExternalGrabInteraction },
      { loadExternalPauseInteraction },
      { loadExternalPushInteraction },
      { loadExternalRemoveInteraction },
      { loadExternalRepulseInteraction },
      { loadExternalSlowInteraction },
      { loadParticlesAttractInteraction },
      { loadParticlesCollisionsInteraction },
      { loadParticlesLinksInteraction },
      { loadEasingQuadPlugin },
      { loadEmojiShape },
      { loadImageShape },
      { loadLineShape },
      { loadPolygonShape },
      { loadSquareShape },
      { loadStarShape },
      { loadLifeUpdater },
      { loadRotateUpdater },
      { loadStrokeColorUpdater },
      { loadBasic },
      { loadInteractivityPlugin },
    ] = await Promise.all([
      import("@tsparticles/interaction-external-parallax"),
      import("@tsparticles/interaction-external-attract"),
      import("@tsparticles/interaction-external-bounce"),
      import("@tsparticles/interaction-external-bubble"),
      import("@tsparticles/interaction-external-connect"),
      import("@tsparticles/interaction-external-grab"),
      import("@tsparticles/interaction-external-pause"),
      import("@tsparticles/interaction-external-push"),
      import("@tsparticles/interaction-external-remove"),
      import("@tsparticles/interaction-external-repulse"),
      import("@tsparticles/interaction-external-slow"),
      import("@tsparticles/interaction-particles-attract"),
      import("@tsparticles/interaction-particles-collisions"),
      import("@tsparticles/interaction-particles-links"),
      import("@tsparticles/plugin-easing-quad"),
      import("@tsparticles/shape-emoji"),
      import("@tsparticles/shape-image"),
      import("@tsparticles/shape-line"),
      import("@tsparticles/shape-polygon"),
      import("@tsparticles/shape-square"),
      import("@tsparticles/shape-star"),
      import("@tsparticles/updater-life"),
      import("@tsparticles/updater-rotate"),
      import("@tsparticles/updater-stroke-color"),
      import("@tsparticles/basic"),
      import("@tsparticles/plugin-interactivity"),
    ]);

    await loadBasic(e);

    await loadInteractivityPlugin(e);

    await Promise.all([
      loadExternalParallaxInteraction(e),
      loadExternalAttractInteraction(e),
      loadExternalBounceInteraction(e),
      loadExternalBubbleInteraction(e),
      loadExternalConnectInteraction(e),
      loadExternalGrabInteraction(e),
      loadExternalPauseInteraction(e),
      loadExternalPushInteraction(e),
      loadExternalRemoveInteraction(e),
      loadExternalRepulseInteraction(e),
      loadExternalSlowInteraction(e),

      loadParticlesAttractInteraction(e),
      loadParticlesCollisionsInteraction(e),
      loadParticlesLinksInteraction(e),

      loadEasingQuadPlugin(e),

      loadEmojiShape(e),
      loadImageShape(e),
      loadLineShape(e),
      loadPolygonShape(e),
      loadSquareShape(e),
      loadStarShape(e),

      loadLifeUpdater(e),
      loadRotateUpdater(e),
      loadStrokeColorUpdater(e),
    ]);
  });
}
