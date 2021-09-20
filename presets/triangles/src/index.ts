import type { Main } from "tsparticles-engine";
import { options } from "./options";

export function loadTrianglesPreset(tsParticles: Main): void {
    tsParticles.addPreset("triangles", options);
}
