import { MoveDirection } from "tsparticles";
import type { Main } from "tsparticles";

export function loadSnowPreset(tsParticles: Main): void {
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
