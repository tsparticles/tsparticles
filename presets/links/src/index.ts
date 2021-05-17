import type { Main } from "tsparticles";

export function loadLinksPreset(tsParticles: Main): void {
    tsParticles.addPreset("links", {
        background: {
            color: "#000000",
        },
        fullScreen: {
            enable: true,
        },
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
