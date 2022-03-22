import type { Engine } from "tsparticles";
import { options } from "./options";

export function loadFirePreset(engine: Engine): void {
    engine.addPreset("fire", options);
}
