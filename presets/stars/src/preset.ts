import { MoveDirection, OutMode, Main } from "tsparticles-core";
import { loadShape as loadCircleShape } from "tsparticles-shape-circle";
import { loadUpdater as loadOpacityUpdater } from "tsparticles-updater-opacity";
import { loadUpdater as loadOutModesUpdater } from "tsparticles-updater-out-modes";
import { loadInteraction as loadMoveInteraction } from "tsparticles-interaction-particles-move";

export function loadPreset(tsParticles: Main): void {
    loadCircleShape(tsParticles);
    loadOpacityUpdater(tsParticles);
    loadOutModesUpdater(tsParticles);
    loadMoveInteraction(tsParticles);

    tsParticles.addPreset("stars", {
        background: {
            color: "#000",
        },
        fullScreen: {
            enable: true,
        },
        particles: {
            color: {
                value: "#ffffff",
            },
            lineLinked: {
                enable: false,
            },
            move: {
                bounce: false,
                direction: MoveDirection.none,
                enable: true,
                outMode: OutMode.out,
                random: true,
                speed: 0.1,
                straight: false,
            },
            opacity: {
                animation: {
                    enable: true,
                    minimumValue: 0,
                    speed: 1,
                    sync: false,
                },
                random: true,
                value: 1,
            },
            shape: {
                type: "circle",
            },
            size: {
                random: true,
                value: 3,
            },
        },
    });
}
