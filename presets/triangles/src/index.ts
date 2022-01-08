import type { Engine } from "tsparticles";
import { options } from "./options";

export function loadTrianglesPreset(tsParticles: Engine): void {
    tsParticles.addPreset("triangles", options);
}
