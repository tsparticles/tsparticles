import type { Main } from "tsparticles-core";
import { Repulser } from "./Repulser";

export function loadInteraction(tsParticles: Main): void {
    tsParticles.addInteractor((container) => new Repulser(container));
}
