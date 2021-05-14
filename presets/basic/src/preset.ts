import type { Main } from "tsparticles";

export function loadBasicPreset(tsParticles: Main): void {
    tsParticles.addPreset("basic", {
        particles: {
            links: {
                enable: true,
            },
            move: {
                enable: true,
            },
        },
    });
}
