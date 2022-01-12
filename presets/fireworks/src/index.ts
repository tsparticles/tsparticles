import type { Engine } from "tsparticles";
import { options } from "./options";

export function loadFireworksPreset(engine: Engine): void {
    engine.addPreset("fireworks", options);
}
