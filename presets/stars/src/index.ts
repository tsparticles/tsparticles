import { MoveDirection, OutMode, ShapeType } from "tsparticles";
import type { Main } from "tsparticles";

export function loadStarsPreset(tsParticles: Main): void {
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
