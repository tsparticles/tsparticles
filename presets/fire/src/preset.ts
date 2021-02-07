import { ClickMode } from "tsparticles-core";
import type { Main } from "tsparticles-core";
import { loadInteraction as loadParticlesMoveInteraction } from "tsparticles-interaction-particles-move";
import { loadShape as loadCircleShape } from "tsparticles-shape-circle";
import { loadUpdater as loadOutModesUpdater } from "tsparticles-updater-out-modes";

export function loadPreset(tsParticles: Main): void {
    loadCircleShape(tsParticles);
    loadOutModesUpdater(tsParticles);
    loadParticlesMoveInteraction(tsParticles);

    tsParticles.addPreset("fire", {
        fpsLimit: 40,
        particles: {
            number: {
                value: 80,
                density: {
                    enable: true,
                    area: 800,
                },
            },
            color: {
                value: ["#fdcf58", "#757676", "#f27d0c", "#800909", "#f07f13"],
            },
            opacity: {
                value: 0.5,
                random: true,
            },
            size: {
                value: 3,
                random: true,
            },
            move: {
                enable: true,
                speed: 6,
                random: false,
            },
        },
        interactivity: {
            events: {
                onClick: {
                    enable: true,
                    mode: ClickMode.push,
                },
                resize: true,
            },
        },
        background: {
            image: "radial-gradient(#4a0000, #000)",
        },
    });
}
