import type { Main } from "tsparticles";

export function loadBasicPreset(tsParticles: Main): void {
    tsParticles.addPreset("basic", {
        particles: {
            lineLinked: {
                enable: true,
            },
            move: {
                enable: true,
            },
        },
    });
}