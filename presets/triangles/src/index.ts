import type { Engine } from "tsparticles";
import { options } from "./options";

export function loadTrianglesPreset(engine: Engine): void {
    engine.addPreset("triangles", options);
}
