import type { Main } from "tsparticles";

export function loadLinksPreset(tsParticles: Main): void {
    tsParticles.addPreset("links", {
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
