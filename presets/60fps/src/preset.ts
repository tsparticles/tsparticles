import type { Main } from "tsparticles";

export function load60fpsPreset(tsParticles: Main): void {
    tsParticles.addPreset("60fps", {
        fpsLimit: 60,
    });
}
