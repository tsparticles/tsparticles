import type { Main } from "./main";

export async function loadSlim(tsParticles: Main): Promise<void> {
    const { loadExternalAttractInteraction } = await import(
        /* webpackChunkName: "tsparticles.interaction.external.attract" */
        /* webpackMode: "lazy" */
        "./Interactions/External/Attract"
    );
    const { loadExternalBounceInteraction } = await import(
        /* webpackChunkName: "tsparticles.interaction.external.bounce" */
        /* webpackMode: "lazy" */
        "./Interactions/External/Bounce"
    );
    const { loadExternalBubbleInteraction } = await import(
        /* webpackChunkName: "tsparticles.interaction.external.bubble" */
        /* webpackMode: "lazy" */
        "./Interactions/External/Bubble"
    );
    const { loadExternalConnectInteraction } = await import(
        /* webpackChunkName: "tsparticles.interaction.external.connect" */
        /* webpackMode: "lazy" */
        "./Interactions/External/Connect"
    );
    const { loadExternalGrabInteraction } = await import(
        /* webpackChunkName: "tsparticles.interaction.external.grab" */
        /* webpackMode: "lazy" */
        "./Interactions/External/Grab"
    );
    const { loadExternalRepulseInteraction } = await import(
        /* webpackChunkName: "tsparticles.interaction.external.repulse" */
        /* webpackMode: "lazy" */
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
        /* webpackMode: "lazy" */
        "./Interactions/Particles/Attract"
    );
    const { loadParticlesCollisionsInteraction } = await import(
        /* webpackChunkName: "tsparticles.interaction.particles.collisions" */
        /* webpackMode: "lazy" */
        "./Interactions/Particles/Collisions"
    );
    const { loadParticlesLinksInteraction } = await import(
        /* webpackChunkName: "tsparticles.interaction.particles.links" */
        /* webpackMode: "lazy" */
        "./Interactions/Particles/Links"
    );

    loadParticlesAttractInteraction(tsParticles);
    loadParticlesCollisionsInteraction(tsParticles);
    loadParticlesLinksInteraction(tsParticles);

    const { loadCircleShape } = await import(
        /* webpackChunkName: "tsparticles.shape.circle" */
        /* webpackMode: "lazy" */
        "./Shapes/Circle"
    );
    const { loadImageShape } = await import(
        /* webpackChunkName: "tsparticles.shape.image" */
        /* webpackMode: "lazy" */
        "./Shapes/Image"
    );
    const { loadLineShape } = await import(
        /* webpackChunkName: "tsparticles.shape.line" */
        /* webpackMode: "lazy" */
        "./Shapes/Line"
    );
    const { loadPolygonShape } = await import(
        /* webpackChunkName: "tsparticles.shape.polygon" */
        /* webpackMode: "lazy" */
        "./Shapes/Polygon"
    );
    const { loadSquareShape } = await import(
        /* webpackChunkName: "tsparticles.shape.square" */
        /* webpackMode: "lazy" */
        "./Shapes/Square"
    );
    const { loadStarShape } = await import(
        /* webpackChunkName: "tsparticles.shape.star" */
        /* webpackMode: "lazy" */
        "./Shapes/Star"
    );
    const { loadTextShape } = await import(
        /* webpackChunkName: "tsparticles.shape.text" */
        /* webpackMode: "lazy" */
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
        /* webpackMode: "lazy" */
        "./Updaters/Angle"
    );
    const { loadColorUpdater } = await import(
        /* webpackChunkName: "tsparticles.updater.color" */
        /* webpackMode: "lazy" */
        "./Updaters/Color"
    );
    const { loadLifeUpdater } = await import(
        /* webpackChunkName: "tsparticles.updater.life" */
        /* webpackMode: "lazy" */
        "./Updaters/Life"
    );
    const { loadOpacityUpdater } = await import(
        /* webpackChunkName: "tsparticles.updater.opacity" */
        /* webpackMode: "lazy" */
        "./Updaters/Opacity"
    );
    const { loadSizeUpdater } = await import(
        /* webpackChunkName: "tsparticles.updater.size" */
        /* webpackMode: "lazy" */
        "./Updaters/Size"
    );
    const { loadStrokeColorUpdater } = await import(
        /* webpackChunkName: "tsparticles.updater.stroke.color" */
        /* webpackMode: "lazy" */
        "./Updaters/StrokeColor"
    );
    const { loadOutModesUpdater } = await import(
        /* webpackChunkName: "tsparticles.updater.out.modes" */
        /* webpackMode: "lazy" */
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
