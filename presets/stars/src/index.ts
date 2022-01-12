import type { Engine } from "tsparticles";
import { options } from "./options";

export function loadStarsPreset(engine: Engine): void {
    engine.addPreset("stars", options);
}
