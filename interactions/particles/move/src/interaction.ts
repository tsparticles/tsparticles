import type { Main } from "tsparticles-core";
import { Mover } from "./Mover";

export function loadInteraction(tsParticles: Main): void {
    tsParticles.addInteractor((container) => new Mover(container));
}
