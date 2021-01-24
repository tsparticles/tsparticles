import type { Main } from "tsparticles-core";
import { Linker } from "./Linker";

export function loadInteraction(tsParticles: Main): void {
    tsParticles.addInteractor((container) => new Linker(container));
}
