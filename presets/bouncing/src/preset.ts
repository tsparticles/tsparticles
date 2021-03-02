import { OutMode } from "tsparticles";
import type { Main } from "tsparticles";

export function loadBouncingParticles(tsParticles: Main): void {
    tsParticles.addPreset("bouncing", {
        particles: {
            move: {
                outMode: OutMode.bounce,
            },
        },
    });
}
