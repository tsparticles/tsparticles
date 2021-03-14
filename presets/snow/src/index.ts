import { MoveDirection, Main } from "tsparticles-engine";
import { loadParticlesMoveInteraction } from "tsparticles-interaction-particles-move";
import { loadOutModesUpdater } from "tsparticles-updater-out-modes";
import { loadCircleShape } from "tsparticles-shape-circle";

export function loadSnowPreset(tsParticles: Main): void {
    loadParticlesMoveInteraction(tsParticles);
    loadOutModesUpdater(tsParticles);
    loadCircleShape(tsParticles);

    tsParticles.addPreset("snow", {
        background: {
            color: "#333",
        },
        fullScreen: {
            enable: true,
        },
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
