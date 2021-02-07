import { MoveDirection, Main } from "tsparticles-core";
import { loadInteraction as loadParticlesMoveInteraction } from "tsparticles-interaction-particles-move";
import { loadUpdater as loadOutModesUpdater } from "tsparticles-updater-out-modes";
import { loadShape as loadCircleShape } from "tsparticles-shape-circle";

export function loadPreset(tsParticles: Main) {
    loadParticlesMoveInteraction(tsParticles);
    loadOutModesUpdater(tsParticles);
    loadCircleShape(tsParticles);

    tsParticles.addPreset("snow", {
        particles: {
            color: {
                value: "#fff",
            },
            move: {
                bounce: false,
                direction: MoveDirection.bottom,
                enable: true,
                random: false,
                straight: false,
            },
            opacity: {
                random: true,
                value: 0.5,
            },
            shape: {
                type: "circle",
            },
            size: {
                random: true,
                value: 10,
            },
        },
    });
}
