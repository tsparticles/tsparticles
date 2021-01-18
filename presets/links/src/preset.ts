import { Main } from "tsparticles-core";

export function loadPreset(tsParticles: Main) {
    tsParticles.addPreset("basic", {
        particles: {
            lineLinked: {
                enable: true
            },
            move: {
                enable: true
            }
        }
    });
}
