import { Main } from "tsparticles-core";
import { loadShape as loadCircleShape } from "tsparticles-shape-circle";
import { loadInteraction as loadParticlesLinksInteraction } from "tsparticles-interaction-particles-links";
import { loadInteraction as loadParticlesMoveInteraction } from "tsparticles-interaction-particles-move";
import { loadUpdater as loadOutModesUpdater } from "tsparticles-updater-out-modes";

export function loadPreset(tsParticles: Main) {
    loadCircleShape(tsParticles);
    loadParticlesLinksInteraction(tsParticles);
    loadParticlesMoveInteraction(tsParticles);
    loadOutModesUpdater(tsParticles);

    tsParticles.addPreset("basic", {
        particles: {
            links: {
                enable: true,
            },
            move: {
                enable: true,
            },
            shape: {
                type: "circle",
            },
        },
    });
}
