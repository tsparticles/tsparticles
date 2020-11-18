import { Main } from "tsparticles";

export function loadPreset(tsParticles: Main) {
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
