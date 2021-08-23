import type { Main } from "tsparticles";
import { options } from "./options";

export function loadTrianglesPreset(tsParticles: Main): void {
    tsParticles.addPreset("triangles", options);
}
