import type { Engine } from "tsparticles";
import { options } from "./options";

export function loadBigCirclesPreset(engine: Engine): void {
    engine.addPreset("bigCircles", options);
    engine.addPreset("big-circles", options);
}
