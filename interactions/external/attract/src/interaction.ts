import type { Main } from "tsparticles-core";
import { Attractor } from "./Attractor";

export function loadInteraction(tsParticles: Main): void {
    tsParticles.addInteractor((container) => new Attractor(container));
}
