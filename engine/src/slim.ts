import type { Main } from "./main";

export async function loadSlim(tsParticles: Main): Promise<void> {
    const { loadExternalAttractInteraction } = await import(
        /* webpackChunkName: "tsparticles.interaction.external.attract" */
        /* webpackMode: "lazy-once" */
        "./Interactions/External/Attract"
    );
    const { loadExternalBounceInteraction } = await import(
        /* webpackChunkName: "tsparticles.interaction.external.bounce" */
        /* webpackMode: "lazy-once" */
        "./Interactions/External/Bounce"
    );
    const { loadExternalBubbleInteraction } = await import(
        /* webpackChunkName: "tsparticles.interaction.external.bubble" */
        /* webpackMode: "lazy-once" */
        "./Interactions/External/Bubble"
    );
    const { loadExternalConnectInteraction } = await import(
        /* webpackChunkName: "tsparticles.interaction.external.connect" */
        /* webpackMode: "lazy-once" */
        "./Interactions/External/Connect"
    );
    const { loadExternalGrabInteraction } = await import(
        /* webpackChunkName: "tsparticles.interaction.external.grab" */
        /* webpackMode: "lazy-once" */
        "./Interactions/External/Grab"
    );
    const { loadExternalRepulseInteraction } = await import(
        /* webpackChunkName: "tsparticles.interaction.external.repulse" */
        /* webpackMode: "lazy-once" */
        "./Interactions/External/Repulse"
    );

    loadExternalAttractInteraction(tsParticles);
    loadExternalBounceInteraction(tsParticles);
    loadExternalBubbleInteraction(tsParticles);
    loadExternalConnectInteraction(tsParticles);
    loadExternalGrabInteraction(tsParticles);
    loadExternalRepulseInteraction(tsParticles);

    const { loadParticlesAttractInteraction } = await import(
        /* webpackChunkName: "tsparticles.interaction.particles.repulse" */
        /* webpackMode: "lazy-once" */
        "./Interactions/Particles/Attract"
    );
    const { loadParticlesCollisionsInteraction } = await import(
        /* webpackChunkName: "tsparticles.interaction.particles.collisions" */
        /* webpackMode: "lazy-once" */
        "./Interactions/Particles/Collisions"
    );
    const { loadParticlesLinksInteraction } = await import(
        /* webpackChunkName: "tsparticles.interaction.particles.links" */
        /* webpackMode: "lazy-once" */
        "./Interactions/Particles/Links"
    );

    loadParticlesAttractInteraction(tsParticles);
    loadParticlesCollisionsInteraction(tsParticles);
    loadParticlesLinksInteraction(tsParticles);

    const { loadCircleShape } = await import(
        /* webpackChunkName: "tsparticles.shape.circle" */
        /* webpackMode: "lazy-once" */
        "./Shapes/Circle"
    );
    const { loadImageShape } = await import(
        /* webpackChunkName: "tsparticles.shape.image" */
        /* webpackMode: "lazy-once" */
        "./Shapes/Image"
    );
    const { loadLineShape } = await import(
        /* webpackChunkName: "tsparticles.shape.line" */
        /* webpackMode: "lazy-once" */
        "./Shapes/Line"
    );
    const { loadPolygonShape } = await import(
        /* webpackChunkName: "tsparticles.shape.polygon" */
        /* webpackMode: "lazy-once" */
        "./Shapes/Polygon"
    );
    const { loadSquareShape } = await import(
        /* webpackChunkName: "tsparticles.shape.square" */
        /* webpackMode: "lazy-once" */
        "./Shapes/Square"
    );
    const { loadStarShape } = await import(
        /* webpackChunkName: "tsparticles.shape.star" */
        /* webpackMode: "lazy-once" */
        "./Shapes/Star"
    );
    const { loadTextShape } = await import(
        /* webpackChunkName: "tsparticles.shape.text" */
        /* webpackMode: "lazy-once" */
        "./Shapes/Text"
    );

    loadCircleShape(tsParticles);
    loadImageShape(tsParticles);
    loadLineShape(tsParticles);
    loadPolygonShape(tsParticles);
    loadSquareShape(tsParticles);
    loadStarShape(tsParticles);
    loadTextShape(tsParticles);

    const { loadAngleUpdater } = await import(
        /* webpackChunkName: "tsparticles.updater.angle" */
        /* webpackMode: "lazy-once" */
        "./Updaters/Angle"
    );
    const { loadColorUpdater } = await import(
        /* webpackChunkName: "tsparticles.updater.color" */
        /* webpackMode: "lazy-once" */
        "./Updaters/Color"
    );
    const { loadLifeUpdater } = await import(
        /* webpackChunkName: "tsparticles.updater.life" */
        /* webpackMode: "lazy-once" */
        "./Updaters/Life"
    );
    const { loadOpacityUpdater } = await import(
        /* webpackChunkName: "tsparticles.updater.opacity" */
        /* webpackMode: "lazy-once" */
        "./Updaters/Opacity"
    );
    const { loadSizeUpdater } = await import(
        /* webpackChunkName: "tsparticles.updater.size" */
        /* webpackMode: "lazy-once" */
        "./Updaters/Size"
    );
    const { loadStrokeColorUpdater } = await import(
        /* webpackChunkName: "tsparticles.updater.stroke.color" */
        /* webpackMode: "lazy-once" */
        "./Updaters/StrokeColor"
    );
    const { loadOutModesUpdater } = await import(
        /* webpackChunkName: "tsparticles.updater.out.modes" */
        /* webpackMode: "lazy-once" */
        "./Updaters/OutModes"
    );

    loadLifeUpdater(tsParticles);
    loadOpacityUpdater(tsParticles);
    loadSizeUpdater(tsParticles);
    loadAngleUpdater(tsParticles);
    loadColorUpdater(tsParticles);
    loadStrokeColorUpdater(tsParticles);
    loadOutModesUpdater(tsParticles);
}
