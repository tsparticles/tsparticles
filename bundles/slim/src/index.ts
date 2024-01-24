import type { Engine } from "@tsparticles/engine";

/**
 * Loads the slime bundle with all plugins needed for running the tsParticles Slim package.
 * This function must be called to make tsParticles Slim work.
 * This function is not mandatory, the plugins can be loaded manually, or using other plugin bundles.
 * If this function is not called, the \@tsparticles/slim package/dependency can be safely removed.
 * This function is called automatically using CDN bundle files.
 * @param engine - the engine to use for loading all plugins
 * @param refresh -
 */
export async function loadSlim(engine: Engine, refresh = true): Promise<void> {
    const { loadParallaxMover } = await import("@tsparticles/move-parallax"),
        { loadExternalAttractInteraction } = await import("@tsparticles/interaction-external-attract"),
        { loadExternalBounceInteraction } = await import("@tsparticles/interaction-external-bounce"),
        { loadExternalBubbleInteraction } = await import("@tsparticles/interaction-external-bubble"),
        { loadExternalConnectInteraction } = await import("@tsparticles/interaction-external-connect"),
        { loadExternalGrabInteraction } = await import("@tsparticles/interaction-external-grab"),
        { loadExternalPauseInteraction } = await import("@tsparticles/interaction-external-pause"),
        { loadExternalPushInteraction } = await import("@tsparticles/interaction-external-push"),
        { loadExternalRemoveInteraction } = await import("@tsparticles/interaction-external-remove"),
        { loadExternalRepulseInteraction } = await import("@tsparticles/interaction-external-repulse"),
        { loadExternalSlowInteraction } = await import("@tsparticles/interaction-external-slow"),
        { loadParticlesAttractInteraction } = await import("@tsparticles/interaction-particles-attract"),
        { loadParticlesCollisionsInteraction } = await import("@tsparticles/interaction-particles-collisions"),
        { loadParticlesLinksInteraction } = await import("@tsparticles/interaction-particles-links"),
        { loadEasingQuadPlugin } = await import("@tsparticles/plugin-easing-quad"),
        { loadEmojiShape } = await import("@tsparticles/shape-emoji"),
        { loadImageShape } = await import("@tsparticles/shape-image"),
        { loadLineShape } = await import("@tsparticles/shape-line"),
        { loadPolygonShape } = await import("@tsparticles/shape-polygon"),
        { loadSquareShape } = await import("@tsparticles/shape-square"),
        { loadStarShape } = await import("@tsparticles/shape-star"),
        { loadLifeUpdater } = await import("@tsparticles/updater-life"),
        { loadRotateUpdater } = await import("@tsparticles/updater-rotate"),
        { loadStrokeColorUpdater } = await import("@tsparticles/updater-stroke-color"),
        { loadBasic } = await import("@tsparticles/basic");

    await loadParallaxMover(engine, false);

    await loadExternalAttractInteraction(engine, false);
    await loadExternalBounceInteraction(engine, false);
    await loadExternalBubbleInteraction(engine, false);
    await loadExternalConnectInteraction(engine, false);
    await loadExternalGrabInteraction(engine, false);
    await loadExternalPauseInteraction(engine, false);
    await loadExternalPushInteraction(engine, false);
    await loadExternalRemoveInteraction(engine, false);
    await loadExternalRepulseInteraction(engine, false);
    await loadExternalSlowInteraction(engine, false);

    await loadParticlesAttractInteraction(engine, false);
    await loadParticlesCollisionsInteraction(engine, false);
    await loadParticlesLinksInteraction(engine, false);

    await loadEasingQuadPlugin();

    await loadEmojiShape(engine, false);
    await loadImageShape(engine, false);
    await loadLineShape(engine, false);
    await loadPolygonShape(engine, false);
    await loadSquareShape(engine, false);
    await loadStarShape(engine, false);

    await loadLifeUpdater(engine, false);
    await loadRotateUpdater(engine, false);
    await loadStrokeColorUpdater(engine, false);

    await loadBasic(engine, refresh);
}
